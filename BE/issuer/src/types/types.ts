import { Contract } from 'near-api-js';

export type NEARContract = Contract & {
  load_hashed_vc: (
    args: { issuer_did: string; hashed_vc: string },
    gas?: number,
    depositAmount?: number,
  ) => Promise<any>;
  get_hashed_vcs: (
    args: { issuer_did: string },
    gas?: number,
    depositAmount?: number,
  ) => Promise<Set<string>>;
};
