

let provider = new ethers.providers.Web3Provider(window.ethereum)
let signer 

// Connecting to Metamask
async function ConnectMetamask() {
    //Metamask requires requesting permission to connect accounts
    await provider.send("eth_requestAccounts", []);

    signer = await provider.getSigner();
    console.log("Account Address : ", await signer.getAddress());
}

// Fetching Balance of the account
async function getBalance() {
    const balance = await signer.getBalance()
    const convertToEth = 1e18;
    console.log("account's balance in ethers:", balance.toString()/convertToEth);
}

// Read Data from Smart contract in Kovan Testnet
const usdtAddress = "0x13512979ADE267AB5100878E2e0f485B568328a4";

const usdtAbi = [
    // Some details about the token
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    "function balanceOf(address) view returns (uint)",
    "function totalSupply() view returns (uint256)",
    "function transfer(address to, uint amount)"
];

async function readDataFromSmartContract() {
    const usdtContract = new ethers.Contract(usdtAddress, usdtAbi, provider)

    const name = await usdtContract.name()
    const symbol = await usdtContract.symbol()
    const decimals = await usdtContract.decimals()
    const totalSupply = await usdtContract.totalSupply()
    const balanceOf = await usdtContract.balanceOf("0x13512979ADE267AB5100878E2e0f485B568328a4")

    console.log(`name = ${name}`)
    console.log(`symbol = ${symbol}`)
    console.log(`decimals = ${decimals}`)
    console.log(`totalSupply = ${totalSupply/1e6}`)
    console.log(`balanceOf = ${balanceOf/1e6}`)
    
}

async function sendUSDT() {
    const usdtContract = new ethers.Contract(usdtAddress, usdtAbi, provider)
    usdtContract.connect(signer).transfer("0x7C7945E06c7484530C090aDbF272150D05042161","1000000000")
    
}


