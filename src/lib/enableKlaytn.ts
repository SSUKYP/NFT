export default async function enableKlaytn(): Promise<string> {
  try {
    await klaytn.enable();
  } catch (err) {
    return;
  }
  return new Promise(resolve => {
    if (klaytn.selectedAddress) {
      resolve(klaytn.selectedAddress);
    } else {
      klaytn.once('accountsChanged', () => resolve(klaytn.selectedAddress));
    }
  });
}
