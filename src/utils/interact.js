import { ethers } from "ethers";

const contractABI = require('../contract-abi.json');
const contractAddress = "0x382aB9E07BB42549d04bd8Fd27D490b61BC81594";

export const mintNFT = async (url) => {
    if (url.trim() === "") { 
        return {
            success: false,
            status: "❗Please make sure you add the image before minting.",
        }
    }

    const provider = new ethers.providers.Web3Provider(
      window.ethereum
    );

    const signer = provider.getSigner();

    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
        const tx = await contract.safeMint(window.ethereum.selectedAddress, url);
        await tx.wait();

        return {
            success: true,
            status: "Check out your transaction on Etherscan: https://goerli.etherscan.io/tx/" + tx.hash
        }
    } catch (error) {
        return {
            success: false,
            status: "Something went wrong: " + error.message
        }
    }
}

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "Write a message in the text-field above.",
        };
      } else {
        return {
          address: "",
          status: "Connect to Metamask using the button at the top.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "" + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            {" "}
            <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};


export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "" + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            {" "}
            <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};