import type { NextApiRequest, NextApiResponse } from 'next'
import { EventData } from 'web3-eth-contract';
import contractInstance from 'ethereum/contract';
import { getCitizen } from 'utils';
import { Citizen } from 'types';


type Data = {
  citizens: Citizen[],
  total: number
}

const citizensMap = new Map();

contractInstance.events
    .Citizen()
    .on('data', (event: EventData) => {
      const citizen = getCitizen(event);
      citizensMap.set(citizen.id, citizen);
    })
    .on('error', (error: any) => {
      console.log(error)
    });


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if (!req.query.page || !req.query.perPage) {
    return res.status(404)
  }

  // @ts-ignore
  const page = parseInt(req.query.page);
  // @ts-ignore
  const perPage = parseInt(req.query.perPage);

  const from = page * perPage;
  const to   = page * perPage + perPage;

  if (citizensMap.size) {
    const items = Array.from(citizensMap.values());
    return res.status(200).json({ citizens:  items.slice(from, to), total: citizensMap.size })
  }

  try {
    const citizens: EventData[] = await contractInstance.getPastEvents("Citizen", {  fromBlock: 0, toBlock: 'latest' });
    citizens.forEach((citizenEvent: EventData) => {
      const citizen = getCitizen(citizenEvent);
      citizensMap.set(citizen.id, citizen);
    });
  } catch (e: any) {
    console.log('Catch', e.message);
  }

  const items = Array.from(citizensMap.values());
  res.status(200).json({ citizens:  items.slice(from, to), total: citizensMap.size })
}
