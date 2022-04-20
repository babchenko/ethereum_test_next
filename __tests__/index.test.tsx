import { render } from '@testing-library/react'
import Home from 'pages/index';
import { createMockRouter } from './mock/createRouter';
import { initialStateMock, mockCitizens, mockNotes } from './mock/mockData';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import axios from 'axios';
import { AppContext } from 'context/AppContext';
import { HomePageTestProps } from '../types';
import { createClickEvent, getTracer, sleep } from 'utils/test';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount, configure } from 'enzyme';
import React from 'react';

configure({adapter: new Adapter()});

jest.mock("next/link", () => {
    const Link: React.FC<{ children: React.ReactElement }> = ({children}) => {
        return children;
    }
    return Link;
});

describe('Home', () => {


    const dispatch = jest.fn();

    const Container: React.FC<HomePageTestProps> = ({initialState, routerQuery, mockCitizens, total, page}) => (
        <AppContext.Provider value={ {state: initialState, dispatch} }>
            <RouterContext.Provider value={ createMockRouter(routerQuery) }>
                <Home citizens={ mockCitizens } total={ total } page={ page }/>
            </RouterContext.Provider>
        </AppContext.Provider>
    );

    beforeEach(() => {
        jest.spyOn(axios, 'get').mockImplementation(jest.fn());
    });

    it('render mock data', () => {

        const {getByText} = render(<Container
            initialState={ initialStateMock }
            routerQuery={ {query: {page: '1'}} }
            mockCitizens={ mockCitizens }
            total={ mockCitizens.length }
            page={ 1 }
        />);

        const name1 = getByText(mockCitizens[0].name);
        const name2 = getByText(mockCitizens[1].name);

        expect(name1).toBeInTheDocument();
        expect(name2).toBeInTheDocument();
    })

    it('Should display loading', () => {
        const newInitialState = {...initialStateMock, loading: true};

        const {getByText} = render(<Container
            initialState={ newInitialState }
            routerQuery={ {query: {page: '1'}} }
            mockCitizens={ mockCitizens }
            total={ mockCitizens.length }
            page={ 1 }
        />);

        const loading = getByText('Loading');
        expect(loading).toBeInTheDocument();
    })

    it('Click on item should display modal and close when click on close button', async () => {
        const wrapper = mount(<Container
            initialState={ initialStateMock }
            routerQuery={ {query: {page: '1'}} }
            mockCitizens={ mockCitizens }
            total={ mockCitizens.length }
            page={ 1 }
        />);

        const names = wrapper.find(`td${ getTracer('name') }`);

        names.at(0).simulate('click');

        await sleep(100);

        expect(wrapper.find('.modal').exists()).toBeTruthy();

        const content = wrapper.find('.modal .content').text();

        // @ts-ignore
        expect(content).toBe(mockNotes[mockCitizens[0].id]);

        wrapper.find('.button').simulate('click');

        expect(wrapper.find('.modal .content').exists()).toBeFalsy();
    })

    it('Pager should trigger request to backend to retrieve new items', () => {
        jest.spyOn(axios, 'get').mockReturnValueOnce(Promise.resolve(
            {data: {citizens: mockCitizens, total: mockCitizens.length}}
        ))
        const newInitialState = {...initialStateMock, total: 300};

        const wrapper = mount(<Container
            initialState={ newInitialState }
            routerQuery={ {query: {page: '1'}} }
            mockCitizens={ mockCitizens }
            total={ 300 }
            page={ 1 }
        />);

        const pageItems = wrapper.find(`a[type="pageItem"]`);

        pageItems.at(1).simulate('click');

        expect(axios.get).toBeCalledWith( "/api/citizens", {
            params: {
                page: 1,
                // @ts-ignore
                perPage: parseInt(process.env.NEXT_PUBLIC_PER_PAGE)
            }
        });
    });
})
