// KanbanCard.tsx
import React, { useRef, useState } from "react";
import { Header, Icon } from "semantic-ui-react";
import { useDrag } from "react-dnd";
import { TaskResponse } from "../../app/model/Task";
import { observer } from "mobx-react-lite";
import { TaskFormModal } from "../../app/layout/modal/form/TaskFormModal";

interface KanbanCardProps {
  task: TaskResponse;
  status: string;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ task, status }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task.id, currentStatus: task.status, projectId: task.projectId },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(ref);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      <div
        ref={ref}
        className={`kanban-card ${isDragging ? "dragging" : ""}`}
        data-status={status}
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: "pointer",
          position: "relative",
        }}
        onClick={handleOpenModal}
      >
        <Header as="h4" className="card-title">{task.name}</Header>
        <div className="client-info">
          <Icon name="user" />
          <span>{task.client ? task.client.description : "Sem responsável"}</span>
        </div>
        <Icon
          name="edit"
          style={{
            position: "absolute",
            top: 5,
            right: 5,
            cursor: "pointer",
          }}
          onClick={(e: { stopPropagation: () => void; }) => {
            e.stopPropagation();
            handleOpenModal();
          }}
        />
      </div>
      <TaskFormModal open={modalOpen} title="Editar Tarefa" task={task} closeModal={handleCloseModal} />
    </>
  );
};

export default observer(KanbanCard);