export default async function enableKlaytn(): Promise<string> {
  return new Promise(resolve => {
    klaytn
      .enable()
      .then(() => {
        if (klaytn.selectedAddress) {
          resolve(klaytn.selectedAddress);
        } else {
          location.reload();
        }
      })
      .catch(err => console.log(err.message));
  });
}
