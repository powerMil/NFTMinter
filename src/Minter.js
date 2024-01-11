import { useEffect, useState } from "react";
import { connectWallet, getCurrentWalletConnected, mintNFT } from "./utils/interact.js";

    const Minter = (props) => {

        //State variables
        const [walletAddress, setWallet] = useState("");
        const [status, setStatus] = useState("");
        const [url, setURL] = useState("");
        
        useEffect( () => { //TODO: implement
            async function fetchData() {
                const {address, status} = await getCurrentWalletConnected();
                setWallet(address)
                setStatus(status);

                addWalletListener(); 
            }
            fetchData();
        }, []);

        function addWalletListener() {
            if (window.ethereum) {
                window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    setWallet(accounts[0]);
                    setStatus("Write a message in the text-field above.");
                } else {
                    setWallet("");
                    setStatus("Connect to Metamask using the top right button.");
                }
                });
            } else {
                setStatus(
                <p>
                    {" "}
                    {" "}
                    <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
                    You must install Metamask, a virtual Ethereum wallet, in your
                    browser.
                    </a>
                </p>
                );
            }
        }

        const connectWalletPressed = async () => {
            const walletResponse = await connectWallet();
            setStatus(walletResponse.status);
            setWallet(walletResponse.address);
        };

        const onMintPressed = async () => { //TODO: implement
            const { status } = await mintNFT(url);
            setStatus(status);
        };

  return (
    <div className="Minter">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <br></br>
      <h1 id="title"> NFT Minter</h1>
      <p>
        Simply add your asset's link, then press "Mint."
      </p>
      <form>
        <h2>Link to asset: </h2>
        <input
          type="text"
          placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
          onChange={(event) => setURL(event.target.value)}
        />
      </form>
      <button id="mintButton" onClick={onMintPressed}>
        Mint NFT
      </button>
      <p id="status">
        {status}
      </p>
    </div>
  );
};

export default Minter;