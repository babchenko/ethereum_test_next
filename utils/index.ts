import { EventData } from 'web3-eth-contract';
import { Citizen } from 'types';

export const getCitizen = ({ returnValues }: EventData) => {
    const citizen: Citizen = {
        id: returnValues.id,
        age: returnValues.age,
        city: returnValues.city,
        name: returnValues.name
    }

    return citizen;
}