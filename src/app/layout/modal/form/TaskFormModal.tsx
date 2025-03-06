import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "semantic-ui-react";
import { TaskRequest, TaskResponse } from "../../../model/Task";
import { useStore } from "../../../store/store";

interface TaskFormModalProps {
    open: boolean;
    title: string;
    task?: TaskResponse;
    closeModal: () => void;
}

const TaskFormModalComponent: React.FC<TaskFormModalProps> = ({ open, title, task, closeModal }) => {
    const { kanbanStore, clientStore } = useStore();
    const [name, setName] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [selectedClientId, setSelectedClientId] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            if (task && open) {
                await clientStore.listByProject(task.projectId);
                setName(task.name);
                setSelectedStatus(task.status);
                setSelectedClientId(task.client ? task.client.id : 0);
            } else {
                setName('');
                setSelectedStatus('');
                setSelectedClientId(0);
            }
        };

        fetchData();
    }, [task, open]);

    const statusOptions = kanbanStore.STATUS.map(s => ({
        key: s,
        text: s.charAt(0).toUpperCase() + s.slice(1),
        value: s,
    }));

    const clientOptions = clientStore.entityDropdownListByProject
        ? clientStore.entityDropdownListByProject.data.map(client => ({
            key: client.id,
            text: client.description,
            value: client.id,
        }))
        : [];

    const handleSubmit = async () => {
        const taskRequest: TaskRequest = {
            id: task ? task.id : null,
            name,
            status: selectedStatus,
            clientId: selectedClientId,
            projectId: task ? task.projectId : kanbanStore.selectedProject,
        };

        if (task) {
            await kanbanStore.editTask(taskRequest);
        } else {
            await kanbanStore.createTask(taskRequest);
        }
        closeModal();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeModal();
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <Modal open={open} size="tiny" dimmer="blurring" onClose={closeModal} className="confirmation-modal">
            <Modal.Header className="confirmation-modal-title">{title}</Modal.Header>
            <Modal.Content className="confirmation-modal-content">
                <Form>
                    <Form.Field>
                        <label style={{ color: 'white' }}>Nome</label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Digite o nome da tarefa"
                        />
                    </Form.Field>
                    <Form.Field>
                        <label style={{ color: 'white' }}>Status</label>
                        <Dropdown
                            fluid
                            selection
                            options={statusOptions}
                            value={selectedStatus}
                            onChange={(_e, { value }) => setSelectedStatus(value as string)}
                            placeholder="Selecione o status"
                        />
                    </Form.Field>
                    <Form.Field>
                        <label style={{ color: 'white' }}>Cliente</label>
                        <Dropdown
                            fluid
                            selection
                            clearable
                            options={clientOptions}
                            value={selectedClientId || undefined}
                            onChange={(_e, { value }) => setSelectedClientId(value as number)}
                            placeholder="Selecione o cliente"
                        />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions className="confirmation-modal-actions">
                <Button positive onClick={async () => {
                    await kanbanStore.deleteTask(task!);
                    closeModal();
                }} className='create-entity-button-border'>
                    Deletar
                </Button>
                <Button positive onClick={handleSubmit} className='create-entity-button'>
                    Salvar
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export const TaskFormModal = observer(TaskFormModalComponent);