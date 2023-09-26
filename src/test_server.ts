import { ethers } from 'ethers';

async function getBlockNumber(provider: ethers.providers.JsonRpcProvider) {
    const blockNumber = await provider.getBlockNumber();
    console.log(`Current block number: ${blockNumber}`);
}

async function main() {
    const url = 'http://localhost:3000/rpc'; // change to your Ethereum RPC URL if needed
    // const url = 'https://1rpc.io/eth';  // change to your Ethereum RPC URL if needed
    const provider = new ethers.providers.JsonRpcProvider(url);

    const tasks = [];
    for (let i = 0; i < 100; i++) {
        console.log(`I = ${i}`);
        tasks.push(getBlockNumber(provider));
    }

    await Promise.all(tasks);
}

main();

