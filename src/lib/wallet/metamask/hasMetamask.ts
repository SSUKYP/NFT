export default function hasMetamask() {
  return window.ethereum && window.ethereum.isMetaMask;
}
