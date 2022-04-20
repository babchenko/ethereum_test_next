import * as React from 'react';

export type PaginationProps = {
    defaultActivePage?: number;
    onChange: Function;
    total: number;
    defaultPerPage?: number;
}