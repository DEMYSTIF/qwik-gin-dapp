import { component$, $, useStore } from '@builder.io/qwik';
import '../icons/metamask.svg';

export const NavBar = component$(() => {
  const connection = useStore({
    account: '',
    status: false,
  });

  const connectToMetaMask = $(async () => {
    const ethereum = window.ethereum;
    if (ethereum) {
      const wallet = await ethereum.request({ method: 'eth_requestAccounts' });
      connection.account = wallet[0];
      connection.status = true;
    }
  });

  return (
    <>
      <nav class="flex items-center justify-between flex-wrap bg-rose-800 p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <img class="h-8 w-8 mx-2" src="/logo.svg" alt="logo" />
          <span class="font-semibold text-xl tracking-tight">
            Certificate DApp
          </span>
        </div>
        <div class="flex justify-end w-auto">
          <div>
            <button
              class="flex items-center text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-rose-600 hover:bg-white"
              onClick$={connectToMetaMask}
            >
              {connection.status ? (
                <>
                  <img
                    class="h-6 w-6 mr-2"
                    src="/metamask.svg"
                    alt="metamask"
                  />
                  <span>
                    {connection.account.slice(0, 5)}...
                    {connection.account.slice(-4)}
                  </span>
                </>
              ) : (
                <>
                  <span>Connect</span>
                  <img
                    class="h-6 w-6 ml-2"
                    src="/metamask.svg"
                    alt="metamask"
                  />
                </>
              )}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
});
