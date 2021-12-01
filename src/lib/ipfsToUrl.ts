export default function ipfsToUrl(ipfs: string) {
  const re = /^ipfs:\/\/(.*)$/i;
  if (re.test(ipfs)) {
    const hash = re.exec(ipfs)[1];
    return `https://ipfs.infura.io/ipfs/${hash}`;
  } else {
    return ipfs;
  }
}
