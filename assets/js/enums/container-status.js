export default {
    all() {
        return [
            {
                id: 1,
                title: 'Готов к приему мусора'
            },
            {
                id: 2,
                title: 'Заполнен'
            }
        ]
    },
    getTitle(id) {
        let item = this.all().filter((item) => item.id === parseInt(id)).pop();
        return item ? '<span class="counter-type type_'+ item.id +'">'+ item.title +'</span>' : null;
    }

}
