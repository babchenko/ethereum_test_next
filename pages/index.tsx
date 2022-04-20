import { useCallback, useContext, useEffect, useState } from 'react';
import type { NextPage, GetServerSidePropsContext } from 'next'
import Layout from 'components/Layout';
import Table from 'components/Table';
import Pager from 'components/Pager';
import Modal from 'components/Modal';
import { AppContext } from 'context/AppContext';
import { ActionType } from 'state/types';
import { Citizen, CitizensPageProps } from 'types';
import axios from 'axios';


const Home: NextPage<CitizensPageProps> = ({citizens, total, page}) => {
    const {dispatch, state} = useContext(AppContext);

    const [items, setItems] = useState<Citizen[]>(citizens);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [note, setNote] = useState<string>('');
    const [modalTitle, setModalTitle] = useState<string>('');

    const perPage = process.env.NEXT_PUBLIC_PER_PAGE ? parseInt(process.env.NEXT_PUBLIC_PER_PAGE) : 10;

    useEffect(() => {
        dispatch({
            type: ActionType.SET_CITIZEN_PAGE,
            payload: {
                // @ts-ignore
                page: page || 0,
                items: citizens
            }
        });

        dispatch({
            type: ActionType.SET_TOTAL,
            payload: total
        });
    }, [citizens, total, page, dispatch]);

    const onChange = useCallback(async (activePage: number) => {
        const isLastPage = activePage === Math.ceil(state.total / perPage) - 1;

        /***
         * We can't retrieve last page from cache because new items may be added on backend
         */
        if (state.pageData[activePage] && !isLastPage) {
            return setItems(state.pageData[activePage]);
        }

        dispatch({
            type: ActionType.IS_LOADING,
            payload: true
        });

        const {data: {citizens, total}} = await axios.get('/api/citizens', {params: {page: activePage, perPage}})

        dispatch({
            type: ActionType.SET_CITIZEN_PAGE,
            payload: {
                page: activePage,
                items: citizens
            }
        });

        dispatch({
            type: ActionType.SET_TOTAL,
            payload: total
        });

        dispatch({
            type: ActionType.IS_LOADING,
            payload: false
        });

        setItems(citizens);
    }, [state.pageData, state.total, total, setItems, dispatch])

    const clickHandler = useCallback(async (id: number, name: string) => {

        if (state.notes[id]) {
            setNote(state.notes[id])
            setModalTitle(`Note for ${ name }`);
            return setShowModal(true);
        }

        setShowModal(true);
        setModalTitle(`Note for ${ name }`);

        const {data: {note}} = await axios.get('/api/note', {params: {id}});

        setNote(note);

        dispatch({
            type: ActionType.SET_NOTE,
            payload: {
                note,
                id
            }
        });
    }, [state.notes, setNote, setShowModal, setModalTitle, dispatch]);

    const onClose = useCallback(() => {
        setNote('');
        setModalTitle('');
        setShowModal(false);
    }, [setShowModal, setNote, setModalTitle]);

    return (
        <Layout>
            <>
                <Table items={ items } loading={ state.loading } onClickItem={ clickHandler }>
                    <Pager total={ state.total } onChange={ onChange }/>
                </Table>
                <Modal content={ note } isOpen={ showModal } onClose={ onClose } title={ modalTitle }/>
            </>
        </Layout>
    );
}

export const getServerSideProps = async ({req, query}: GetServerSidePropsContext) => {
    const protocol =
        req.headers["x-forwarded-proto"]
            ? "https"
            : "http";

    let {page} = query;

    if (page) {
        page = Array.isArray(page) ? page[0] : page;
        // @ts-ignore
        page = parseInt(page) - 1 || 0;
    } else {
        // @ts-ignore
        page = 0;
    }

    const url = `${ protocol }://${ req.headers.host }/api/citizens`;
    const {data} = await axios.get(url, {params: {page, perPage: process.env.NEXT_PUBLIC_PER_PAGE}});

    return {
        props: {
            ...data,
            page,
        }
    }
};

export default Home
