import { observer } from "mobx-react-lite";
import React from "react";
import { useDrop } from "react-dnd";
import { Header } from "semantic-ui-react";
import { TaskRequest, TaskResponse } from "../../app/model/Task";
import { useStore } from "../../app/store/store";
import KanbanCard from "./KanbanCard";

interface KanbanColumnProps {
    status: string;
    tasks: TaskResponse[];
    moveTask: (taskId: number, newStatus: string) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ status, tasks, moveTask }) => {
    const { kanbanStore: { toTitleCase, editTask } } = useStore();

    const [{ isOver }, drop] = useDrop({
        accept: "TASK",
        drop: (item: { id: number; currentStatus: string; }) => {
            const task = tasks.find(t => t.id === item.id);
            if (task) {
                moveTask(item.id, status);
                const taskRequest: TaskRequest = {
                    id: task.id,
                    name: task.name,
                    status: status,
                    clientId: task.client.id,
                    projectId: task.projectId,
                };

                editTask(taskRequest);
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const dropRef = (node: HTMLDivElement | null) => {
        if (node) {
            drop(node);
        }
    };

    return (
        <div
            ref={dropRef}
            data-status={status}
            className={`kanban-column ${isOver ? "drop-over" : ""}`}
        >
            <Header as="h3" className="column-header">{toTitleCase(status)}</Header>
            <div className="cards-container">
                {tasks
                    .filter(task => task.status.toLowerCase() === status.toLowerCase())
                    .map(task => (
                        <KanbanCard key={task.id} task={task} status={status} />
                    ))}
            </div>
        </div>
    );
};

export default observer(KanbanColumn);