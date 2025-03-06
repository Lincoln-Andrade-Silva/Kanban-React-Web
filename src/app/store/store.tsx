import { createContext, useContext } from "react";
import ClientStore from "./client/clientStore";
import CommonStore from "./common/commonStore";
import KanbanStore from "./kanban/kanbanStore";
import ProjetctStore from "./project/projetctStore";

export default interface Store {
    commonStore: CommonStore,
    kanbanStore: KanbanStore,
    clientStore: ClientStore,
    projectStore: ProjetctStore,
}

export const store: Store = {
    commonStore: new CommonStore(),
    kanbanStore: new KanbanStore(),
    clientStore: new ClientStore(),
    projectStore: new ProjetctStore(),
}

export const StoreContext = createContext(store)

export function useStore() { return useContext(StoreContext); }