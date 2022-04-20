import { render } from '@testing-library/react'
import Home from 'pages/index'
import { mockCitizens } from './mock/mockData';
import { createMockRouter } from './mock/createRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context';

it('renders homepage unchanged', () => {
  const { container } = render(
      <RouterContext.Provider value={createMockRouter({ query: { page: '1' } })}>
        <Home citizens={mockCitizens} total={mockCitizens.length} page={1} />
      </RouterContext.Provider>
  )
  expect(container).toMatchSnapshot()
})
