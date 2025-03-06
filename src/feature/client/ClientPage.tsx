import { observer } from "mobx-react-lite";
import { Segment } from "semantic-ui-react";
import GenericTableComponent from "../../app/layout/component/table/GenericTableComponent";
import { ConfirmationModal } from "../../app/layout/modal/ConfirmationModal";
import { ClientFormModal } from "../../app/layout/modal/form/ClientFormModal";
import { useStore } from "../../app/store/store";

const ClientPage: React.FC = () => {
    const { clientStore, projectStore: { entityDropdownList } } = useStore();


    return (
        <Segment className="manage-page">
            <div className="content-page">
                <GenericTableComponent entityName={"Clientes"} store={clientStore} confirmationModalComponent={
                    <ConfirmationModal
                        open={false}
                        title={"Excluir"}
                        message={"Tem certeza que deseja excluir esse cliente? "}
                    />
                } formModalComponent={
                    <ClientFormModal
                        open={false}
                        title={"Formulário de Cliente"}
                        projectOptions={entityDropdownList}
                    />
                } />
            </div>
        </Segment >
    );
};

export default observer(ClientPage);