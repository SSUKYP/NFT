export default function hasKaikas() {
  return typeof klaytn !== 'undefined' && klaytn.isKaikas;
}
