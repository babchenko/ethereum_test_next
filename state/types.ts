import { Citizen } from 'types';

export type InitialState = {
    pageData: { [key: string]: Citizen[] },
    total: number,
    loading: boolean,
    notes: { [key: number]: string },
}

export enum ActionType {
    SET_CITIZEN_PAGE = 'SET_CITIZEN_PAGE',
    IS_LOADING = 'IS_LOADING',
    SET_TOTAL = 'SET_TOTAL',
    SET_NOTE = 'SET_NOTE',
    ADD_CITIZEN = 'ADD_CITIZEN',
};


export type Action =
    | { type: ActionType.SET_CITIZEN_PAGE, payload: { page: number, items: Citizen[] } }
    | { type: ActionType.ADD_CITIZEN, payload: Citizen }
    | { type: ActionType.IS_LOADING, payload: boolean }
    | { type: ActionType.SET_TOTAL, payload: number }
    | { type: ActionType.SET_NOTE, payload: { id: number, note: string } }

