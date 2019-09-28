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
    },

    getUserFilter(key, id) {
        return 'filters[' + key + '][fieldId]=' + Catalog.getUserLoginField() + '&filters[' + key + '][value][0][recordId]=' + (id ? id :store.getters.GET_TOKEN) + '&filters[' + key + '][value][0][catalogId]=' + Catalog.getUserCatalog();
    },

    getEvent(id) {
        return {
            sectionId: Catalog.getStorageSection(),
            catalogId: Catalog.getObjectEventCatalog(),
            catalogTitle: "Выброс мусора",
            recordId: id
        }
    }
}
