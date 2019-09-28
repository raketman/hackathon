import idTransformator from "../enums/id-to-code-list";

export default {
    parseByCatalog(data, catalog, isArray) {
        if(isArray) {
            for(let i in data) {
                data[i] = this.parseByCatalog(data[i], catalog, 0);
            }
        } else {
            for (let j in data.values) {

                let code = idTransformator.getCode(j, catalog);
                if (!code) {
                    continue;
                }

                data.values[code] = data.values[j];
            }
        }

        return data;
    },

    getObjectCatalog() {
        return 14;
    },
    getUserCatalog() {
        return 13;
    },
    getUserLoginField() {
        return 2;
    },
    getObjectEventCatalog() {
        return 15;
    },
    getStorageSection() {
        return 3;
    },
    getUserSection() {
        return 2;
    },
    getBonusCatalog() {
        return 18;
    },
    getStatementSection() {
        return 5;
    },
    getStatementCatalog() {
        return 19;
    },
    getStatementOwnerCatalog() {
        return 20;
    }
}
