use near_sdk::{log, near_bindgen, env};

use crate::{DidContract, IssuerDID};
use crate::DidContractExt;
use std::collections::HashSet;

pub type HashedVC = String;

// #[derive(BorshDeserialize, BorshSerialize, Serialize, Debug, Default)]
// #[serde(crate = "near_sdk::serde")]
// pub enum StudentState {
//     #[default]
//     Active, // 재학
//     Break, // 휴학
// }

// #[derive(BorshDeserialize, BorshSerialize, Serialize, Debug, Default)]
// #[serde(crate = "near_sdk::serde")]
// pub struct StudentInfo {
//     // Holder DID
//     pub school_did: IssuerDID,

//     // data
//     pub major: String,

//     // data
//     pub state: StudentState,
// }

// #[derive(BorshDeserialize, BorshSerialize, Serialize, Debug, Default)]
// #[serde(crate = "near_sdk::serde")]
// pub struct CredentialSubject {
//     // Holder DID
//     pub id: HolderDID,

//     // Holder Subject
//     pub subject: StudentInfo,
// }

// #[derive(BorshDeserialize, BorshSerialize, Serialize, Debug, Default)]
// #[serde(crate = "near_sdk::serde")]
// pub struct VerifiableCredential {
//     // VC context
//     pub context: Vec<String>,

//     // Holder DID
//     pub id: HolderDID,

//     // VerifiableCredential, PNU_credential
//     pub credential_type: Vec<String>,

//     // PNU DID
//     pub issuer: IssuerDID,

//     // credential issue date
//     pub validFrom: String,

//     // credential contents
//     pub credentialSubject: CredentialSubject,
// }

#[near_bindgen]
impl DidContract {
    pub fn load_hashed_vc(&mut self, issuer_did: IssuerDID, hashed_vc: HashedVC) {
        if self.set_issuer_did.contains(&issuer_did) {

            let mut vcs: HashSet<String> = match self.map_issuer_did_to_hashed_vcs.remove(&issuer_did){
                Some(hs) => hs,
                None => {
                    HashSet::new()
                }
            };

            log!(format!("<log111> vcs: {:?}", vcs));

            vcs.insert(hashed_vc);

            log!(format!("<log222> vcs: {:?}", vcs));

            self.map_issuer_did_to_hashed_vcs.insert(&issuer_did, &vcs);

            log!(format!("<log333> hashed_vcs: {:?}", self.map_issuer_did_to_hashed_vcs.get(&issuer_did)));

            log!(format!("<log444> issuer_did: {:?}", issuer_did));
        } else {
            env::panic_str("Not a registered issuer");
        }
    }

    // issuing VC is on ServiceAPI side
    // VC should not be an on-chain data
    // pub fn issue_vc(&self, issuer: AccountId) -> VerifiableCredential {

    //     // issuer check
    //     if self.issuer_list.contains(&issuer) {
    //         let student_info: StudentInfo = StudentInfo {
    //             school_did: issuer.to_string(),

    //             major: String::from("test major"),

    //             state: StudentState::Active,
    //         };

    //         let credential_subject: CredentialSubject = CredentialSubject {
    //             id: env::predecessor_account_id().to_string(),
    //             subject: student_info,
    //         };

    //         return VerifiableCredential {
    //             context: vec![String::from("https://www.w3.org/ns/credentials/v2")],

    //             id: String::from("UNIQUE IDENTIFIER"),

    //             credential_type: vec![String::from("VerifiableCredential"), String::from("MajorCredential")],

    //             issuer: issuer.to_string(),

    //             validFrom: get_current_time(),

    //             credentialSubject: credential_subject,
    //         };
    //     } else {
    //         env::panic_str("Not a registered issuer");
    //     }
    // }
}
