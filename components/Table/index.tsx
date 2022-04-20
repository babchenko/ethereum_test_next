// @ts-nocheck
import React from 'react';
import { TableProps } from './table.types';
import { Loader, Table, Dimmer } from 'semantic-ui-react';

const TableComponent: React.FC<TableProps> = ({
                                                  items,
                                                  children,
                                                  onClickItem,
                                                  loading = true,
                                              }) => {

    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Age</Table.HeaderCell>
                    <Table.HeaderCell>City</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                { !loading && items.map((item) => {
                    return (
                        <Table.Row key={ item.id }
                                   onClick={() => onClickItem(item.id, item.name) }
                                   style={{ cursor: 'pointer' }}>
                            <Table.Cell data-testid='id'>{ item.id }</Table.Cell>
                            <Table.Cell data-testid='name'>{ item.name }</Table.Cell>
                            <Table.Cell data-testid='age'>{ item.age }</Table.Cell>
                            <Table.Cell data-testid='city'>{ item.city }</Table.Cell>
                        </Table.Row>
                    );
                }) }
                { loading && <Table.Row>
                                <Table.Cell>
                                    <Dimmer active>
                                        <Loader size='massive'>Loading</Loader>
                                    </Dimmer>
                                </Table.Cell>
                </Table.Row> }
            </Table.Body>
            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='4'>
                        { children }
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    );
}

export default TableComponent;