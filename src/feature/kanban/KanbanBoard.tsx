import React from "react";
import { Segment } from "semantic-ui-react";
import { useStore } from "../../app/store/store";
import KanbanColumn from "./KanbanColumn";
import { observer } from "mobx-react-lite";

const KanbanBoard: React.FC = () => {
    const { kanbanStore } = useStore();

    const moveTask = (taskId: number, newStatus: string) => {
        kanbanStore.tasks = kanbanStore.tasks.map(task =>
            task.id === taskId
                ? { ...task, status: newStatus }
                : task
        );
    };

    return (
        <Segment className="kanban-board">
            {kanbanStore.STATUS.map(status => (
                <KanbanColumn
                    key={status}
                    status={status}
                    moveTask={moveTask}
                    tasks={kanbanStore.tasks}
                />
            ))}
        </Segment>
    );
};

export default observer(KanbanBoard);