import { observer } from "mobx-react-lite";
import React, { ReactNode, useReducer } from "react";
import { Button, Header } from "semantic-ui-react";

type Action = { type: 'OPEN_MODAL', dimmer: any } | { type: 'CLOSE_MODAL' };

const reducer = (_state: any, action: Action) => {
    switch (action.type) {
        case 'OPEN_MODAL':
            return { open: true, dimmer: action.dimmer };
        case 'CLOSE_MODAL':
            return { open: false };
        default:
            throw new Error("Unexpected action type");
    }
};

export interface TableHeaderProps {
    entityName: string | null;
    modalComponent?: ReactNode;
    createEntity?: (data: any) => void;
}

const HeaderComponent: React.FC<TableHeaderProps> = ({ entityName, modalComponent, createEntity }) => {
    const [modalState, modalDispatch] = useReducer(reducer, { open: false });

    return (
        <div className="header-component-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Header>
                <span style={{ fontWeight: '800' }}>{entityName}</span>
            </Header>
            {modalComponent && <Button style={{ marginRight: 12 }} icon='plus' content='Adicionar' color="vk"
                onClick={() => modalDispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })} />}

            {modalComponent && React.cloneElement(modalComponent as React.ReactElement<any>, {
                open: modalState.open,
                dimmer: modalState.dimmer,
                createEntity: createEntity,
                closeModal: () => modalDispatch({ type: 'CLOSE_MODAL' })
            })}
        </div>
    )
}

export default observer(HeaderComponent);