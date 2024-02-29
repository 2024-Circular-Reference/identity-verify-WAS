use halo2_proofs::{
    arithmetic::Field,
    circuit::SimpleFloorPlanner,
    pasta::EqAffine,
    plonk::{
        create_proof, keygen_pk, keygen_vk, verify_proof, Circuit, ConstraintSystem, Error,
        VerifyingKey,
    },
    poly::commitment::Params,
    transcript::{Blake2bWrite, Challenge255},
};
use rand_core::OsRng;

#[derive(Clone, Copy)]
struct MyCircuit;

impl<F: Field> Circuit<F> for MyCircuit {
    type Config = ();

    type FloorPlanner = SimpleFloorPlanner;

    fn without_witnesses(&self) -> Self {
        *self
    }

    fn configure(_meta: &mut ConstraintSystem<F>) -> Self::Config {}

    fn synthesize(
        &self,
        _config: Self::Config,
        _layouter: impl halo2_proofs::circuit::Layouter<F>,
    ) -> Result<(), Error> {
        Ok(())
    }
}

fn main() {
    // Set up circuit parameters
    let params: Params<EqAffine> = Params::new(3);

    // Generate verification key
    let vk = keygen_vk(&params, &MyCircuit).expect("keygen_vk should not fail");

    // Generate proving key
    let pk = keygen_pk(&params, vk, &MyCircuit).expect("keygen_pk should not fail");

    // Create instances for the circuit
    // let instances: Vec<Vec<EqAffine::Scalar>> = vec![
    //     // Instance 1
    //     vec![
    //         EqAffine::Scalar::from(1u64),
    //         EqAffine::Scalar::from(2u64),
    //         EqAffine::Scalar::from(3u64),
    //     ],
    //     // Instance 2
    //     vec![
    //         EqAffine::Scalar::from(4u64),
    //         EqAffine::Scalar::from(5u64),
    //         EqAffine::Scalar::from(6u64),
    //     ],
    // ];

    // Create proving transcript
    let mut transcript = Blake2bWrite::<_, _, Challenge255<_>>::init(vec![]);

    // Generate proof
    create_proof(
        &params,
        &pk,
        &[MyCircuit, MyCircuit], // Circuits
        // &instances,
        &[&[], &[]],
        OsRng,
        &mut transcript,
    )
    .expect("proof generation should not fail");

    let proof = transcript.finalize();

    println!("ZKP Proof: {:?}", proof);

    // // Verify proof
    // verify_proof(&params, &vk, &instances, transcript.into_inner())
    //     .expect("proof verification should not fail");
}
