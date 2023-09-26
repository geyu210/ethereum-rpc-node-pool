import express, { Express, Request, Response } from 'express';
import axios from 'axios';

const app: Express = express();
// Define your RPC pool

import dotenv from 'dotenv';
import * as process from "process";
import {errors} from "ethers";

dotenv.config();
// const alchemy = process.env.alchemy
// if (!alchemy){
//     throw errors;
// }
const infura = process.env.infura
if (!infura){
    throw errors;
}
const rpcPool: string[] = [
    'https://1rpc.io/eth',
    // alchemy
    infura
    // add more as needed
];
app.use(express.json());
console.log(process.env.PORT)
app.post('/rpc', async (req: Request, res: Response) => {
    const rpcNodeUrl = rpcPool[Math.floor(Math.random() * rpcPool.length)];
    try {
        const rpcResponse = await axios.post(rpcNodeUrl, req.body, {
            headers: { 'Content-Type': 'application/json' },
        });

        res.json(rpcResponse.data);
    } catch (error) {
        console.error('Error forwarding the request:', error);
        res.status(500).json({ error: 'Error forwarding the request' });
    }
});

const PORT: string | number = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
