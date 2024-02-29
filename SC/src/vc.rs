use near_sdk::{env, log, near_bindgen};

use crate::DidContractExt;
use crate::{DidContract, IssuerDID};
use std::collections::HashSet;

pub type HashedVC = String;

#[near_bindgen]
impl DidContract {
    pub fn load_hashed_vc(
        &mut self,
        issuer_did: IssuerDID,
        hashed_vc: HashedVC,
    ) {
        if self.set_issuer_did.contains(&issuer_did) {
            let mut vcs: HashSet<String> =
                match self.map_issuer_did_to_hashed_vcs.remove(&issuer_did) {
                    Some(hs) => hs,
                    None => HashSet::new(),
                };

            log!(format!("<log111> vcs: {:?}", vcs));

            vcs.insert(hashed_vc);

            log!(format!("<log222> vcs: {:?}", vcs));

            self.map_issuer_did_to_hashed_vcs.insert(&issuer_did, &vcs);

            log!(format!(
                "<log333> hashed_vcs: {:?}",
                self.map_issuer_did_to_hashed_vcs.get(&issuer_did)
            ));

            log!(format!("<log444> issuer_did: {:?}", issuer_did));
        } else {
            env::panic_str("Not a registered issuer");
        }
    }
}
