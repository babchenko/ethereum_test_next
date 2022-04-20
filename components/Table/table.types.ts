import { ReactElement } from 'react';

export type TableProps = {
    items: any[],
    children?: ReactElement,
    loading?: boolean,
    onClickItem: Function
}