import { observer } from "mobx-react-lite";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button, Dropdown, Segment } from "semantic-ui-react";
import { TaskFormModal } from "../../app/layout/modal/form/TaskFormModal";
import { useStore } from "../../app/store/store";
import KanbanBoard from "./KanbanBoard";

const KanbanPage: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const { kanbanStore, projectStore: { entityDropdownList } } = useStore();

    const handleProjectChange = (_e: React.SyntheticEvent<HTMLElement, Event>, data: any) => {
        kanbanStore.setSelectedProject(data.value);
    };

    const projects = entityDropdownList ? entityDropdownList.data.map(option => ({
        key: option.id,
        value: option.id,
        text: option.description,
    })) : [];

    return (
        <Segment className="kanban-page">
            <Segment className="kanban-header">
                <Dropdown
                    fluid
                    selection
                    options={projects}
                    onChange={handleProjectChange}
                    placeholder="Selecione um projeto"
                    value={kanbanStore.selectedProject}
                    style={{ width: "30%", marginRight: "2vw" }}
                />
                <Button
                    color="vk"
                    icon='plus'
                    content='Adicionar Tarefa'
                    onClick={(() => setModalOpen(true))}
                    disabled={!kanbanStore.selectedProject}
                />
            </Segment>

            <DndProvider backend={HTML5Backend}>
                <KanbanBoard />
            </DndProvider>

            <TaskFormModal
                open={modalOpen}
                task={undefined}
                title="Criar Nova Tarefa"
                closeModal={(() => setModalOpen(false))}
            />
        </Segment>
    );
};

export default observer(KanbanPage);