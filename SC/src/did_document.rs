use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::Serialize;

use crate::utils;

// #[derive(BorshDeserialize, BorshSerialize, Serialize, Debug)]
// #[serde(crate = "near_sdk::serde")]
// pub enum DID {
//     Holder(String),
//     Issuer(String),
//     General(String),
// }
//
// impl Default for DID {
//     fn default() -> Self {
//         DID::General(String::from("default"))
//     }

// }

pub type DID = String;
pub type HolderDID = String;
pub type IssuerDID = String;



#[derive(BorshDeserialize, BorshSerialize, Serialize, Default, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct DidPublicKey {
    pub id: DID,
    pub auth_type: String,
    pub controller: DID,
    pub public_key_base_58: String,
}

#[derive(BorshDeserialize, BorshSerialize, Serialize, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct DidDocument {
    pub context: Vec<String>,
    pub id: DID,
    pub public_key: Vec<DidPublicKey>,
    pub created: String,
    pub updated: String,
}

impl Default for DidDocument {
    fn default() -> Self {
        let formatted_time: String = utils::get_current_time();

        Self {
            context: vec![String::from("")],
            id: DID::default(),
            public_key: vec![DidPublicKey::default()],
            created: formatted_time.clone(),
            updated: formatted_time.clone(),
        }
    }
}
