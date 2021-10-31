export default async function hasMetamask() {
  return window.ethereum && window.ethereum.isMetaMask;
}
