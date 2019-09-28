import axios from "./axios";
import Catalog from "../helper/catalog"
import moment from 'moment'
import Injection from '../helper/injection'
import store from "./index";

export default {
    actions: {
        CREATE_STATEMENT: (context, payload) => {
            let catalog = Catalog.getStatementOwnerCatalog();

            var promises = [];

            let data = {
                2: payload.name,
                3: payload.contact
            };

            return axios({
                method: 'post',
                url: '/proxy/api/v1/catalogs/' + Catalog.getStatementOwnerCatalog() + '/records?timezoneOffset=180',
                data: {
                    values: data
                }
            })
                .then((resp) => {
                    // Вставим саму заявку

                    let data = {
                        2: moment().format('YYYY:MM DD HH:mm:ss'),
                        3: [1],
                        4: [{
                            sectionId: Catalog.getStatementSection(),
                            catalogId: Catalog.getStatementOwnerCatalog(),
                            catalogTitle: "Владельцы",
                            recordId: resp.data.id
                        }]
                    };


                    axios({
                            method: 'post',
                            url: '/proxy/api/v1/catalogs/' + Catalog.getStatementCatalog() + '/records?timezoneOffset=180',
                            data: {
                                values: data
                            }
                        })
                            .catch(err => {
                                // eslint-disable-next-line
                                console.warn(err);
                            });
                })
                .catch(err => {
                    // eslint-disable-next-line
                    console.warn(err);
                });


        }
    },
};
