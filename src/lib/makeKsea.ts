import { AbiItem } from 'caver-js';
import ksea from '../contracts/KlaySea.json';

export default function makeContract() {
  return new window.caver.klay.Contract(
    ksea.abi as unknown as AbiItem[],
    process.env.KSEA_CONTRACT
  );
}
