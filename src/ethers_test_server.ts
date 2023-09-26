import express from 'express';
import { ethers } from 'ethers';
import dotenv from 'dotenv';
import * as process from "process";

dotenv.config();
const app = express();
const port = 3000;
const alchemy = process.env.alchemy
let rpcPool: string[] = ["https://1rpc.io/eth"];

app.use(express.json());

app.post("/rpc", (req, res) => {
    // Choose a random Ethereum node from the pool
    const randomProviderURL = rpcPool[Math.floor(Math.random() * rpcPool.length)];
    console.log(randomProviderURL)
    // Create a new provider with the chosen node, forward the request to it,
    // and then send the response back to the client
    const provider = new ethers.providers.JsonRpcProvider(randomProviderURL);
    console.log("req.body.method=", req.body.method)
    console.log("req.body.params=", req.body.params)
    provider.send(req.body.method, req.body.params)
        .then((response) => {
            console.log(`response is ${response}`)
            res.json(response);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('There was an error processing your request.');
        });
            // provider.send(req.body.method, req.body.params)
        // .then((response) => {
        //     res.json(response);
        // })
        // .catch((err) => {
        //     console.error(err);
        //     res.status(500).send('There was an error processing your request.');
        // });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});