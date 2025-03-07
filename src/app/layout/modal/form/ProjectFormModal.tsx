import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "semantic-ui-react";
import { DataListResponse } from "../../../model/DataListResponse";
import { DropdownOption } from "../../../model/DropdownOption";
import { Project, ProjectRequest } from "../../../model/Project";

interface ProjectFormModalProps {
    open: boolean;
    title: string;
    entity?: Project;
    closeModal?: () => void;
    editEntity?: (data: ProjectRequest) => void;
    createEntity?: (data: ProjectRequest) => void;
    clienteOptions: DataListResponse<DropdownOption> | null;
    statusOptions: { key: string; text: string; value: string }[];
}

const ProjectFormModalComponent = ({
    open,
    title,
    entity,
    closeModal,
    editEntity,
    createEntity,
    statusOptions,
    clienteOptions,
}: ProjectFormModalProps) => {
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [clientIds, setClients] = useState<{ id: number, description: string }[]>([]);
    const [dropdownClientOptions, setDropdownClientOptions] = useState<Array<{ key: number, text: string, value: number }>>([]);

    useEffect(() => {
        if (entity) {
            setName(entity.name);
            setStatus(entity.status);
            setClients(entity.clients || []);
        }
    }, [entity]);

    useEffect(() => {
        if (clienteOptions && clienteOptions.data) {
            setDropdownClientOptions(
                clienteOptions.data.map((client) => ({
                    key: client.id,
                    text: client.description,
                    value: client.id,
                }))
            );
        } else {
            setDropdownClientOptions([]);
        }
    }, [clienteOptions]);

    const handleSubmit = async () => {
        const data: ProjectRequest = { id: entity?.id, name, clientIds: clientIds.map(client => client.id), status };

        if (entity && editEntity) {
            await editEntity(data);
        } else if (createEntity) {
            await createEntity(data);
        }

        setName('');
        setStatus('');
        setClients([]);

        if (closeModal) {
            closeModal();
        }
    };

    const handleClientChange = (_e: any, { value }: any) => {
        if (value && value.length === 0) {
            setClients([]);
        } else {
            const selectedClients = dropdownClientOptions.filter(option => value.includes(option.value));
            setClients(selectedClients.map(option => ({
                id: option.value,
                description: option.text,
            })));
        }
    };

    const handleStatusChange = (_e: any, { value }: any) => {
        setStatus(value);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && closeModal) {
            closeModal();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <Modal
            open={open}
            size='tiny'
            dimmer='blurring'
            onClose={closeModal}
            className="confirmation-modal"
        >
            <Modal.Header className="confirmation-modal-title">{title}</Modal.Header>
            <Modal.Content className="confirmation-modal-content">
                <Form>
                    <Form.Field>
                        <label style={{ color: 'white' }}>Nome do Projeto</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Digite o nome do projeto"
                        />
                    </Form.Field>

                    <Form.Field>
                        <label style={{ color: 'white' }}>Clientes</label>
                        <Dropdown
                            fluid
                            search
                            multiple
                            selection
                            clearable
                            onChange={handleClientChange}
                            options={dropdownClientOptions}
                            placeholder="Selecione os clientes"
                            value={clientIds.map(client => client.id)}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label style={{ color: 'white' }}>Status</label>
                        <Dropdown
                            fluid
                            search
                            selection
                            value={status}
                            options={statusOptions}
                            onChange={handleStatusChange}
                            placeholder="Selecione o status"
                        />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions className="confirmation-modal-actions">
                <Button negative onClick={closeModal} className='create-entity-button-border'>
                    {'Cancelar'}
                </Button>
                <Button positive onClick={handleSubmit} className='create-entity-button' disabled={!status || !name}>
                    {'Salvar'}
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export const ProjectFormModal = observer(ProjectFormModalComponent);