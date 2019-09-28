export default {
    all() {
        return [
            // neig_containers
            {
                catalog: 14,
                id: 2,
                code: 'code'
            },
            {
                catalog: 14,
                id: 3,
                code: 'title'
            },
            {
                catalog: 14,
                id: 4,
                code: 'latitude'
            },
            {
                catalog: 14,
                id: 5,
                code: 'longitude'
            },
            {
                catalog: 14,
                id: 6,
                code: 'location'
            },
            {
                catalog: 14,
                id: 7,
                code: 'status'
            },
            {
                catalog: 14,
                id: 8,
                code: 'volume'
            },
            {
                catalog: 14,
                id: 9,
                code: 'size'
            },

            // event
            {
                catalog: 15,
                id: 4,
                code: 'status'
            },
            {
                catalog: 15,
                id: 5,
                code: 'created'
            },

            // bonuse
            {
                catalog: 18,
                id: 3,
                code: 'datetime'
            },
            {
                catalog: 18,
                id: 4,
                code: 'value'
            },
        ]
    },
    getCode(id, catalog) {
        let item = this.all().filter((item) => item.id == id && item.catalog == catalog).pop();
        return item ? item.code : null;
    }

}
