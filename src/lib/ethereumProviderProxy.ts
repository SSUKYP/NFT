const methodProxyMap = new Map([
  ['klay_getBalance', 'eth_getBalance'],
  ['klay_accounts', 'eth_accounts'],
]);

export default function ethereumProviderProxy() {
  return new Proxy(window.ethereum, {
    get(...args) {
      if (args[1] === 'sendAsync') {
        const origMethod = args[0]['sendAsync'];
        return function (...args: [{ method: string }]) {
          const { method } = args[0];
          if ([...methodProxyMap.keys()].includes(method)) {
            args[0].method = methodProxyMap.get(method);
          }
          return origMethod.apply(this, args);
        };
      }
      return Reflect.get(...args);
    },
  });
}
