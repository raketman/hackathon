let radius = 30;

export default {
    inAreaContainer(coordinates, container) {
        var latitudeDiff = (parseFloat(coordinates.latitude) - parseFloat(container.values.latitude));
        var longitudeDiff = (parseFloat(coordinates.longitude) - parseFloat(container.values.longitude));
        console.log([
            latitudeDiff
            , longitudeDiff
        ]);
        // Проверим, что текущие координаты пользователя попадают в ареал контейнера
        return (Math.abs(Math.pow(latitudeDiff, 2))+ Math.abs(Math.pow(longitudeDiff, 2))) <= Math.pow(radius, 2);
    },
    isCoordsChange(user, coordinates) {
        return true;
    }

}
