import { ParsedUrlQuery } from 'querystring';

declare module '*module.css' {
  const styles: {
    [className: string]: string
  }
  export default styles
}


export type Citizen = {
  id: string;
  age: string;
  city: string;
  name: string
}

export type HomePageTestProps = {
  initialState: InitialState;
  routerQuery: { query: ParsedUrlQuery };
  mockCitizens: Citizen[];
  total: number;
  page: number;
}

export type NewPageTestProps = {
  initialState: InitialState;
}

export type CitizensPageProps = {
  citizens: Citizen[],
  total: number,
  page: number,
}

export type NewCitizen = {
  age: number;
  city: string;
  name: string;
  note: string;
}
