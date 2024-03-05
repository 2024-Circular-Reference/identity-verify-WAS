use halo2_proofs::{
    arithmetic::Field,
    circuit::{Layouter, Region, SimpleFloorPlanner, Value},
    pasta::{group::ff::PrimeField, EqAffine, Fp},
    plonk::{
        create_proof, keygen_pk, keygen_vk, verify_proof, Advice, Circuit, Column,
        ConstraintSystem, Error, Instance, SingleVerifier,
    },
    poly::{commitment::Params, Rotation},
    transcript::{Blake2bRead, Blake2bWrite, Challenge255},
};
use rand_core::OsRng;

#[derive(Clone, Copy)]
struct MyCircuit<F: Field> {
    a: Value<F>,
    b: Value<F>,
}

impl<F: Field> Circuit<F> for MyCircuit<F> {
    type Config = (Column<Advice>, Column<Advice>, Column<Instance>);
    type FloorPlanner = SimpleFloorPlanner;

    fn without_witnesses(&self) -> Self {
        *self
    }

    fn configure(meta: &mut ConstraintSystem<F>) -> Self::Config {
        let a = meta.advice_column();
        let b = meta.advice_column();
        let c = meta.instance_column();

        meta.create_gate("a + b = c", |cells| {
            let a = cells.query_advice(a, Rotation::cur());
            let b = cells.query_advice(b, Rotation::cur());
            let c = cells.query_instance(c, Rotation::cur());

            vec![a + b - c]
        });

        (a, b, c)
    }

    fn synthesize(
        &self,
        config: Self::Config,
        mut layouter: impl Layouter<F>,
    ) -> Result<(), Error> {
        let (a_col, b_col, c_col) = config;

        layouter.assign_region(
            || "assign_values",
            |mut region: Region<'_, F>| {
                // let a_val = match self.a {
                //     Some(v) => Assigned::from(v),
                //     None => Assigned::from(Fp::zero()),
                // };

                // let b_val = match self.b {
                //     Some(v) => Value::known(v),
                //     None => Value::unknown(),
                // };

                let a_val = self.a;
                let b_val = self.b;

                region.assign_advice(|| "a", a_col, 0, || a_val)?;
                region.assign_advice(|| "b", b_col, 0, || b_val)?;

                Ok(())
            },
        )?;

        Ok(())
    }
}

fn main() {
    let circuit = MyCircuit {
        b: Value::known(Fp::from_u128(2)),
        a: Value::known(Fp::from_u128(10)),
    };

    let instance = vec![Fp::from(12)];

    let k = 4;
    let params: Params<EqAffine> = Params::new(k);

    let vk = keygen_vk(&params, &circuit).expect("keygen_vk should not fail");
    let pk = keygen_pk(&params, vk.clone(), &circuit).expect("keygen_pk should not fail");
    let mut transcript = Blake2bWrite::<_, _, Challenge255<_>>::init(vec![1]);

    create_proof(
        &params,
        &pk,
        &[circuit],
        &[&[&instance.clone()]],
        OsRng,
        &mut transcript,
    )
    .expect("proof generation should not fail");

    let proof = transcript.finalize();
    println!("ZKP Proof: {:?}", proof);

    // VERIFYING
    let mut proof = &proof[..];

    let mut transcript = Blake2bRead::<_, _, Challenge255<_>>::init(&mut proof);
    let strategy = SingleVerifier::new(&params);

    let verifier = verify_proof(
        &params,
        &vk,
        strategy,
        &[&[&instance.clone()]],
        &mut transcript,
    )
    .unwrap();
}
