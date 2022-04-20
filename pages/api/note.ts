import { NextApiRequest, NextApiResponse } from 'next';
import contractInstance from 'ethereum/contract';

type Data = {
    note: number
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const {id} = req.query;

    if (!id) {
        return res.status(404);
    }

    const note = await contractInstance.methods.getNoteByCitizenId(id).call();
    return res.status(200).json({note})
}