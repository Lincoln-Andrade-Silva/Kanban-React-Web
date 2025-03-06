import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Menu, MenuItem } from 'semantic-ui-react';
import { IBaseStore } from '../../../store/IBaseStore';
import HeaderComponent from './HeaderComponent';
import TableComponent from './TableComponent';

interface StoreMapItem<T> {
    columns: string[];
    activeItem: string;
    store: IBaseStore<T> | undefined;
}

interface GenericTableComponentProps<T> {
    entityName: string;
    store?: IBaseStore<T>;
    handleEditClick?: any;
    storeMap?: StoreMapItem<T>[];
    formModalComponent?: React.ReactElement<any>;
    confirmationModalComponent?: React.ReactElement<any>;
}

const GenericTableComponent = <T,>({
    store,
    storeMap,
    entityName,
    formModalComponent,
    confirmationModalComponent,
}: GenericTableComponentProps<T>) => {
    const menuItems = storeMap?.map(item => item.activeItem) || [];
    const [activeItem, setActiveItem] = useState(menuItems[0] || undefined);

    const handleItemClick = (_e: any, { name }: any) => {
        setActiveItem(name);
    };

    const currentStore = storeMap ? storeMap.find(item => item.activeItem === activeItem)?.store : store;
    const {
        columns,
        renderCell,
        list = () => { },
        entityList = null,
        editEntity = () => { },
        deleteEntity = () => { },
        createEntity = () => { },
    } = currentStore || {};

    return (
        <>
            <HeaderComponent
                entityName={entityName}
                createEntity={createEntity}
                modalComponent={formModalComponent}
            />
            {menuItems.length > 0 && (
                <>
                    <Menu pointing secondary>
                        {menuItems.map(item => (
                            <MenuItem
                                key={item}
                                name={item}
                                content={item}
                                onClick={handleItemClick}
                                active={activeItem === item}
                            />
                        ))}
                    </Menu>
                </>
            )}
            <TableComponent
                list={list}
                columns={columns || []}
                entityList={entityList}
                renderCell={renderCell}
                editEntity={editEntity}
                deleteEntity={deleteEntity}
                formModalComponent={formModalComponent}
                confirmationModalComponent={confirmationModalComponent}
            />
        </>
    );
};

export default observer(GenericTableComponent);