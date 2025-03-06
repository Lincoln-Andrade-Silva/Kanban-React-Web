import { observer } from "mobx-react-lite";
import React, { useReducer, useState } from "react";
import { Icon, Pagination, Popup, Table, TableFooter, TableHeaderCell } from "semantic-ui-react";
import { DataListResponse } from "../../../model/DataListResponse";

interface ModalState {
    dimmer: any;
    openFormModal: boolean;
    openConfirmationModal: boolean;
}

type Action =
    | { type: 'OPEN_CONFIRMATION_MODAL'; dimmer: any }
    | { type: 'CLOSE_CONFIRMATION_MODAL' }
    | { type: 'OPEN_FORM_MODAL'; dimmer: any }
    | { type: 'CLOSE_FORM_MODAL' };

const reducer = (state: ModalState, action: Action): ModalState => {
    switch (action.type) {
        case 'OPEN_CONFIRMATION_MODAL':
            return { ...state, openConfirmationModal: true, dimmer: action.dimmer };
        case 'CLOSE_CONFIRMATION_MODAL':
            return { ...state, openConfirmationModal: false };
        case 'OPEN_FORM_MODAL':
            return { ...state, openFormModal: true, dimmer: action.dimmer };
        case 'CLOSE_FORM_MODAL':
            return { ...state, openFormModal: false };
        default:
            throw new Error();
    }
};

interface TableProps<T> {
    list: any;
    columns: string[];
    editEntity: (data: any) => void;
    deleteEntity: (data: any) => void;
    entityList: DataListResponse<T> | null;
    formModalComponent?: React.ReactElement<any>;
    confirmationModalComponent?: React.ReactElement<any>;
    renderCell?: (entity: T, column: string) => React.ReactNode;
}

const TableComponent = <T,>({ entityList, deleteEntity, list, columns, renderCell, editEntity, confirmationModalComponent, formModalComponent }: TableProps<T>) => {
    const [activePage, setActivePage] = useState(1);

    const pages = entityList && entityList.totalPages ? entityList.totalPages : 1;
    const totalData = entityList && entityList.totalElements ? entityList.totalElements : 0;

    const [modalState, modalDispatch] = useReducer(reducer, {
        openConfirmationModal: false,
        openFormModal: false,
        dimmer: undefined,
    });

    const [selectedEditEntity, setSelectedEditEntity] = useState<T | null>(null);
    const [selectedDeleteEntity, setSelectedDeleteEntity] = useState<T | null>(null);

    const handlePaginationChange = (_e: React.MouseEvent, { activePage }: any) => {
        setActivePage(activePage);
        list(activePage, 10);
    };

    const handleDeleteClick = (entity: any) => {
        setSelectedDeleteEntity(entity);
        modalDispatch({ type: 'OPEN_CONFIRMATION_MODAL', dimmer: modalState.dimmer });
    };

    const handleEditClick = (entity: T) => {
        setSelectedEditEntity(entity);
        modalDispatch({ type: 'OPEN_FORM_MODAL', dimmer: modalState.dimmer });
    };

    const handleModalResult = (result: boolean) => {
        try {
            if (result) {
                deleteEntity(selectedDeleteEntity);
            }
        } finally {
            setSelectedDeleteEntity(null);
            modalDispatch({ type: 'CLOSE_CONFIRMATION_MODAL' });
        }
    };

    const handleFormModalEdit = (data: any) => {
        try {
            if (editEntity)
                editEntity(data)
        } finally {
            setSelectedEditEntity(null);
            modalDispatch({ type: 'CLOSE_FORM_MODAL' });
        }
    };

    return (
        <>
            <Table className="entity-table">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell></Table.HeaderCell>
                        {columns.map((column, index) => (
                            <Table.HeaderCell key={index}>{column}</Table.HeaderCell>
                        ))}
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {entityList && entityList.data && entityList.data.length > 0 ? (
                        entityList.data.map((entity, rowIndex) => (
                            <Table.Row key={rowIndex}>
                                <Table.Cell></Table.Cell>
                                {columns.map((column, columnIndex) => {
                                    return (
                                        <Table.Cell key={columnIndex}>
                                            {renderCell ? (
                                                typeof renderCell(entity, column) === "string" ? (
                                                    <Popup
                                                        on="hover"
                                                        hoverable
                                                        content={
                                                            <div
                                                                dangerouslySetInnerHTML={{
                                                                    __html: (renderCell(entity, column) as string).replace(/,/g, '<br />')
                                                                }}
                                                            />
                                                        }
                                                        trigger={
                                                            <span>
                                                                {(renderCell(entity, column) as string).substring(0, 24)}
                                                                {(renderCell(entity, column) as string).length > 24 ? "..." : ""}
                                                            </span>
                                                        }
                                                    />
                                                ) : (
                                                    renderCell(entity, column)
                                                )
                                            ) : null}
                                        </Table.Cell>
                                    );
                                })}
                                <Table.Cell>
                                    <Icon
                                        color="blue"
                                        title="Edit"
                                        name='pencil alternate'
                                        onClick={() => handleEditClick(entity)}
                                        style={{ cursor: 'pointer', marginRight: '10px' }}
                                    />
                                    <Icon
                                        color="red"
                                        title="Delete"
                                        name='trash alternate'
                                        onClick={() => handleDeleteClick(entity)}
                                        style={{ cursor: 'pointer', marginRight: '10px' }}
                                    />
                                </Table.Cell>
                            </Table.Row>

                        ))
                    ) : (
                        <Table.Row>
                            <Table.Cell colSpan={columns.length + 6} textAlign="center">
                                Nenhuma informação foi encontrada..
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
                <TableFooter>
                    <Table.Row>
                        <TableHeaderCell colSpan={columns.length + 6}>
                            <span className="table-footer-text">{'Registros encontrados: ' + totalData}</span>
                            <Pagination
                                size='tiny'
                                floated='right'
                                lastItem={null}
                                firstItem={null}
                                siblingRange={1}
                                boundaryRange={0}
                                totalPages={pages}
                                prevItem={undefined}
                                nextItem={undefined}
                                activePage={activePage}
                                ellipsisItem={undefined}
                                onPageChange={handlePaginationChange}
                            />
                        </TableHeaderCell>
                    </Table.Row>
                </TableFooter>
            </Table>

            <>
                {confirmationModalComponent && React.cloneElement(confirmationModalComponent, {
                    dimmer: modalState.dimmer,
                    onResult: handleModalResult,
                    open: modalState.openConfirmationModal,
                    closeModal: () => modalDispatch({ type: 'CLOSE_CONFIRMATION_MODAL' })
                })}

                {formModalComponent && React.cloneElement(formModalComponent, {
                    dimmer: modalState.dimmer,
                    entity: selectedEditEntity,
                    open: modalState.openFormModal,
                    editEntity: handleFormModalEdit,
                    closeModal: () => modalDispatch({ type: 'CLOSE_FORM_MODAL' })
                })}
            </>
        </>
    );
};

export default observer(TableComponent);