import React, { createContext, Dispatch, useReducer } from 'react';
import { initialState } from 'state/initialState';
import { Action, InitialState } from 'state/types';
import { reducer } from 'state/reducer';

export const AppContext = createContext<{
    state: InitialState;
    dispatch: Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => null
});

type AppProviderProps = {
    children: React.ReactNode
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;