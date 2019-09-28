import store from "../store/index";
import Catalog from "./catalog";

export default {
    getUser(id) {
        return {
            sectionId: Catalog.getUserSection(),
            catalogId: Catalog.getUserCatalog(),
            catalogTitle: "Пользователи",
            recordId: id ? id :store.getters.GET_TOKEN
        };
    }
}
