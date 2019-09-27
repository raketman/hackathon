
export default {
    inAreaContainer(user, container) {
        // Проверим, что текущие координаты пользователя попадают в ареал контейнера
        console.log(user, container);
    },
    isCoordsChange(user, coordinate) {
        return false;
    }

}
