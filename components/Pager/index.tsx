import { Pagination } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import { PaginationProps } from './pager.types';
import { StrictPaginationProps } from 'semantic-ui-react';
import { useRouter } from 'next/router';


const Pager: React.FC<PaginationProps> = ({defaultActivePage, onChange, total, defaultPerPage = 10}) => {
    const [activePage, setActivePage] = useState<number | undefined | string>(defaultActivePage || 0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const router = useRouter();

    useEffect(() => {
        if (total) {
            const perPage = process.env.NEXT_PUBLIC_PER_PAGE ? parseInt(process.env.NEXT_PUBLIC_PER_PAGE) : defaultPerPage;
            setTotalPages(Math.ceil(total / perPage));
        }
    }, [total, setTotalPages])

    useEffect(() => {
        if (router.query.page) {
            const currentPage = Array.isArray(router.query.page) ? router.query.page[0]: router.query.page;
            setActivePage(parseInt(currentPage));
        }
    }, [router.query.page, setActivePage])

    const changeHandler = (_ :any, data: StrictPaginationProps) => {
        // @ts-ignore
        const currentPage = data.activePage - 1;

        setActivePage(data.activePage);

        onChange(currentPage);

        router.push({
            pathname: router.pathname,
            query: { page: data.activePage }
        }, undefined, { shallow: true });
    }

    return (
        <Pagination
            activePage={ activePage }
            onPageChange={ changeHandler }
            totalPages={ totalPages }
        />
    )
}

export default Pager;