export default {
    all() {
        return [
            {
                id: 1,
                title: 'Стекло'
            },
            {
                id: 2,
                title: 'Бумага'
            },
            {
                id: 3,
                title: 'Железо'
            },
            {
                id: 4,
                title: 'Пластик'
            },
            {
                id: 5,
                title: 'Батарейки'
            },
            {
                id: 6,
                title: 'Прочее'
            }
        ]
    },
    getTitle(id) {
        let item = this.all().filter((item) => item.id === parseInt(id)).pop();
        return item ?  item.title : null;
    }
}
