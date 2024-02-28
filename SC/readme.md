# NEAR DID contract
- NEAR 상에서 DID 를 구현한 컨트랙트입니다

## View Method
```bash
export NEAR_CTRT="cagey-mark.testnet"

# did 목록 확인
near view $NEAR_CTRT get_did_list

# did document 목록 확인
near view $NEAR_CTRT get_did_document_list

# issuer 목록 확인
near view $NEAR_CTRT get_issuer_list

# hash(vc) 목록 확인
near view $NEAR_CTRT get_hashed_vcs '{"issuer_did": "did:near:quixotic-debt.testnet"}'
```
