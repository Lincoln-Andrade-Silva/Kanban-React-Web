import { makeAutoObservable } from "mobx";
import { store } from "../store";

export default class CommonStore {
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setLoading = async (loading: boolean) => {
        if (loading == false)
            await new Promise(resolve => setTimeout(resolve, 1000));
        this.loading = loading;
    }

    initApp = async () => {
        this.setLoading(true);
        await store.clientStore.list(1, 10);
        await store.clientStore.listForDropdown();
        await store.projectStore.list(1, 10);
        await store.projectStore.listForDropdown();
        this.setLoading(false);
    }
}