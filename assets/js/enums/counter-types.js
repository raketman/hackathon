export default {
    all() {
        return [
            {
                id: 1,
                title: 'вода'
            },
            {
                id: 2,
                title: 'вода горячая'
            },
            {
                id: 3,
                title: 'газ'
            },
            {
                id: 4,
                title: 'электричество'
            }
        ]
    },
    getTitle(id) {
        let item = this.all().filter((item) => item.id === parseInt(id)).pop();
        return item ? '<span class="counter-type type_'+ item.id +'">'+ item.title +'</span>' : null;
    }

}
