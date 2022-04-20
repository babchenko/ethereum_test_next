import New from 'pages/new';
import { createMockRouter } from './mock/createRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { AppContext } from 'context/AppContext';
import { NewPageTestProps } from '../types';
import { initialStateMock } from './mock/mockData';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount, configure } from 'enzyme';
import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import * as ReackHookForm from 'react-hook-form';
import web3 from '../ethereum/web3';
import contract from '../ethereum/contract';
import { createClickEvent, sleep } from '../utils/test';

configure({adapter: new Adapter()});

jest.mock("next/link", () => {
    const Link: React.FC<{ children: React.ReactElement }> = ({children}) => {
        return children;
    }
    return Link;
});

describe('New', () => {
    const dispatch = jest.fn();

    const TEST_NAME = 'fake-name';
    const TEST_AGE = "20";
    const TEST_CITY = 'fake-city';
    const TEST_NOTE = 'fake-note';
    const TEST_ETH_ACCOUNT = 'fake-eth-account';

    const Container: React.FC<NewPageTestProps> = ({initialState}) => (
        <AppContext.Provider value={ {state: initialState, dispatch} }>
            <RouterContext.Provider value={ createMockRouter({}) }>
                <New />
            </RouterContext.Provider>
        </AppContext.Provider>
    );

    it('Should match snapshot', () => {
        const { container } = render(<Container initialState={initialStateMock} />);
        expect(container).toMatchSnapshot();
    });

    it('Should display errors when form not valid', () => {
        jest.spyOn(ReackHookForm, 'useForm').mockReturnValueOnce({
            register: jest.fn(),
            handleSubmit: jest.fn(),
            // @ts-ignore
            formState: {
                errors: {
                    name: {
                        type: 'required'
                    },
                    age: {
                        type: 'required'
                    }
                }
            },
            reset: jest.fn()
        });

        const wrapper = mount(<Container initialState={initialStateMock} />);

        wrapper.find(`button[type="submit"]`).simulate('click');

        const errors = wrapper.find('.error.message');

        expect(errors.length).toBe(2);
    });

    it ('Fill form and check call to web3', async () => {

        await act(async () => {
            jest.spyOn(web3.eth, 'getAccounts').mockReturnValueOnce(Promise.resolve([TEST_ETH_ACCOUNT]))
            jest.spyOn(contract.methods, 'addCitizen').mockImplementationOnce(jest.fn());

            const { getByTestId } = render(<Container initialState={initialStateMock} />);

            const name = getByTestId('name');
            const age = getByTestId('age');
            const city = getByTestId('city');
            const note = getByTestId('note');
            const button = getByTestId('submit')

            fireEvent.change(name, { target: { value: TEST_NAME } })
            fireEvent.change(age, { target: { value: TEST_AGE } })
            fireEvent.change(city, { target: { value: TEST_CITY } })
            fireEvent.change(note, { target: { value: TEST_NOTE } })


            fireEvent(button, createClickEvent());

            await sleep(100);

            expect(contract.methods.addCitizen).toBeCalledWith(TEST_AGE, TEST_CITY, TEST_NAME, TEST_NOTE);
        })


    })
})
