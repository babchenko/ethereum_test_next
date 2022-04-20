import { Citizen } from '../../types';
import { InitialState } from '../../state/types';


export const mockCitizens: Citizen[] = [
    {
        id: 'fake-id-1',
        age: 'fake-age-1',
        city: 'fake-city-1',
        name: 'fake-name-1',
    }, {
        id: 'fake-id-2',
        age: 'fake-age-2',
        city: 'fake-city-2',
        name: 'fake-name-2',
    }
]

export const mockNotes = {
    'fake-id-1': 'note-1',
    'fake-id-2': 'note-2',
}

export const initialStateMock: InitialState = {
    pageData: {
        '0': mockCitizens
    },
    total: 2,
    loading: false,
    notes: mockNotes
}
