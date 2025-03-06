import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Container, Menu, Segment } from "semantic-ui-react";

const NavBar = () => {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState<string>(location.pathname.substring(location.pathname.lastIndexOf('/') + 1));

    const handleItemClick = async (name: string) => {
        setActiveItem(name);
    };

    const menuItems = [
        { key: 'client', label: 'Clientes' },
        { key: 'project', label: 'Projetos' },
        { key: 'task', label: 'Quadro de Tarefas' },
    ];

    return (
        <Segment inverted className='navbar'>
            <Container>
                <Menu pointing secondary inverted style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className='nav-icon'>
                        Kanban
                    </div>
                    <div style={{ display: 'flex', flex: 1, justifyContent: 'center', marginRight: '2vw' }}>
                        {menuItems.map(({ key, label }) => (
                            <Menu.Item
                                key={key}
                                name={label}
                                active={activeItem === key}
                                as={NavLink} to={`/${key}`}
                                onClick={() => {
                                    handleItemClick(key);
                                }}
                            />
                        ))}
                    </div>
                </Menu>
            </Container>
        </Segment>
    );
};

export default observer(NavBar);