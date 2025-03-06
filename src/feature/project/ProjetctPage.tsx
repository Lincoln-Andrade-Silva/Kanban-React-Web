import { observer } from "mobx-react-lite";
import { Segment } from "semantic-ui-react";
import GenericTableComponent from "../../app/layout/component/table/GenericTableComponent";
import { ProjectFormModal } from "../../app/layout/modal/form/ProjectFormModal";
import { useStore } from "../../app/store/store";
import { ConfirmationModal } from "../../app/layout/modal/ConfirmationModal";

const ProjetctPage: React.FC = () => {
    const { projectStore, clientStore: { entityDropdownList } } = useStore();

    return (
        <Segment className="manage-page">
            <div className="content-page">
                <GenericTableComponent entityName={"Projetos"} store={projectStore} confirmationModalComponent={
                    <ConfirmationModal
                        open={false}

                        title={"Excluir"}
                        onResult={() => { }}
                        closeModal={() => { }}
                        message={"Tem certeza que deseja excluir esse projeto? "}
                    />}
                    formModalComponent={
                        <ProjectFormModal
                            open={false}
                            title={"Formulário de Projeto"}
                            clienteOptions={entityDropdownList}
                            statusOptions={projectStore.statusOptions}
                        />}
                />
            </div>
        </Segment >
    );
};

export default observer(ProjetctPage);