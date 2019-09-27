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

            // objects
            {
                catalog: 11,
                id: 14,
                code: 'title'
            },
            {
                catalog: 11,
                id: 13,
                code: 'account'
            },
            // counters
            {
                catalog: 13,
                id: 8,
                code: 'number'
            },
            {
                catalog: 13,
                id: 9,
                code: 'type'
            },
            {
                catalog: 13,
                id: 13,
                code: 'status'
            },
            {
                catalog: 13,
                id: 8,
                code: 'number'
            },
            {
                catalog: 13,
                id: 11,
                code: 'valid'
            },
            {
                catalog: 13,
                id: 2,
                code: 'valid_until'
            },
            {
                catalog: 13,
                id: 6,
                code: 'current_value'
            },
            {
                catalog: 13,
                id: 18,
                code: 'payment_value'
            },
            {
                catalog: 13,
                id: 7,
                code: 'tariff'
            }
        ]
    },
    getCode(id, catalog) {
        let item = this.all().filter((item) => item.id == id && item.catalog == catalog).pop();
        return item ? item.code : null;
    }

}
