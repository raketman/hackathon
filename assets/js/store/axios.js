import Axios from 'axios';
import Qs from "qs";

let instance = Axios.create({
    'paramsSerializer': function (params) {
        return Qs.stringify(params, {arrayFormat: 'brackets'})
    },
    'baseURL':  process.env.VUE_APP_BASE_URL
});

instance.interceptors.request.use((config) => {
    if (config.params==null){
        config.params={}
    }

    return config;
});

export default instance