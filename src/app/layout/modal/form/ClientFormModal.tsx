import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "semantic-ui-react";
import { DataListResponse } from "../../../model/DataListResponse";
import { DropdownOption } from "../../../model/DropdownOption";
import { Client, ClientRequest } from "../../../model/Client";

interface ClientFormModalProps {
    open: boolean;
    title: string;
    entity?: Client;
    closeModal?: () => void;
    editEntity?: (data: ClientRequest) => void;
    createEntity?: (data: ClientRequest) => void;
    projectOptions: DataListResponse<DropdownOption> | null;
}

const ClientFormModalComponent = ({
    open,
    title,
    entity,
    closeModal,
    editEntity,
    createEntity,
    projectOptions,
}: ClientFormModalProps) => {
    const [name, setName] = useState('');
    const [selectedProjectId, setSelectedProjectId] = useState<number>(0);
    const [dropdownProjectOptions, setDropdownProjectOptions] = useState<Array<{ key: number, text: string, value: number }>>([]);

    useEffect(() => {
        if (entity) {
            setName(entity.name);
            setSelectedProjectId(entity.project ? entity.project.id : 0);
        }
    }, [entity]);

    useEffect(() => {
        if (projectOptions && projectOptions.data) {
            setDropdownProjectOptions(
                projectOptions.data.map((project) => ({
                    key: project.id,
                    text: project.description,
                    value: project.id,
                }))
            );
        } else {
            setDropdownProjectOptions([]);
        }
    }, [projectOptions]);

    const handleSubmit = async () => {
        const data: ClientRequest = {
            id: entity?.id || null,
            name,
            projectId: selectedProjectId,
        };

        if (entity && editEntity) {
            await editEntity(data);
        } else if (createEntity) {
            await createEntity(data);
        }

        setName('');
        setSelectedProjectId(0);

        if (closeModal) {
            closeModal();
        }
    };

    const handleProjectChange = (_e: any, { value }: any) => {
        setSelectedProjectId(value || 0);
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
            size="tiny"
            dimmer={false}
            onClose={closeModal}
            className="confirmation-modal"
        >
            <Modal.Header className="confirmation-modal-title">{title}</Modal.Header>
            <Modal.Content className="confirmation-modal-content">
                <Form>
                    <Form.Field>
                        <label style={{ color: 'white' }}>Nome</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Digite o nome do cliente"
                        />
                    </Form.Field>
                    <Form.Field>
                        <label style={{ color: 'white' }}>Projeto</label>
                        <Dropdown
                            fluid
                            search
                            selection
                            clearable
                            onChange={handleProjectChange}
                            options={dropdownProjectOptions}
                            value={selectedProjectId || undefined}
                            placeholder="Selecione um projeto (opcional)"
                        />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions className="confirmation-modal-actions">
                <Button negative onClick={closeModal} className="create-entity-button-border">
                    Cancelar
                </Button>
                <Button positive onClick={handleSubmit} className="create-entity-button" disabled={!name}>
                    Salvar
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export const ClientFormModal = observer(ClientFormModalComponent);