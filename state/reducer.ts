import { Action, ActionType, InitialState } from './types';

export const reducer = (state: InitialState, action: Action ): InitialState => {
    switch (action.type) {
        case ActionType.SET_CITIZEN_PAGE:
                const { page, items } = action.payload;

                return {
                    ...state,
                    pageData: {
                        ...state.pageData,
                        [page]: items,
                    }
                }
            break;
        case ActionType.SET_TOTAL:
                return {
                    ...state,
                    total: action.payload
                };
            break;
        case ActionType.SET_NOTE:
            return {
                ...state,
                notes: {
                    ...state.notes,
                    [action.payload.id]: action.payload.note
                }
            }
        case ActionType.IS_LOADING:
            return {
                ...state,
                loading: action.payload
            }
            break;
        default:
            return state;
    }
};