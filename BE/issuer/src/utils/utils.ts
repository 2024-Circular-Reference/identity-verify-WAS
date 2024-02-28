export function createVC(
  uuid: string,
  stMajorCode: string,
  holderPubKey: string,
) {
  const timeStamp = getTimeStamp();
  return {
    context: ['https://www.w3.org/ns/credentials/v2'],
    id: `url:uuid:${uuid}`,
    credential_type: ['VerifiableCredential', 'MajorCredential'],
    issuer: 'pnu.testnet',
    validFrom: timeStamp,
    credentialSubject: {
      id: `${holderPubKey}.testnet`,
      subject: {
        school_did: 'pnu.testnet',
        major: stMajorCode,
      },
    },
  };
}

function getTimeStamp() {
  const now = new Date();

  const y = now.getFullYear();
  const m = ('0' + (now.getMonth() + 1)).slice(-2);
  const d = ('0' + now.getDate()).slice(-2);

  const h = ('0' + now.getHours()).slice(-2);
  const min = ('0' + now.getMinutes()).slice(-2);
  const sec = ('0' + now.getSeconds()).slice(-2);

  return `${y}-${m}-${d}T${h}:${min}:${sec}Z`;
}
