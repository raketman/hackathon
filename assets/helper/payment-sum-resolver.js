import store from '../store/index';

export default {

    getSum(object) {
        let counters = store.getters.COUNTERS.filter( item => { return item.object_id === object.id });
        let sum = 0;
        for (var i in counters) {
            sum += parseFloat(this.getCounterSum(counters[i]));
        }

        return parseFloat(sum).toFixed(2);
    },

    getAllSum(objects) {
        let sum = 0;
        for (var i in objects) {
            sum += parseFloat(this.getSum(objects[i]));
        }

        return parseFloat(sum).toFixed(2);
    },

    getCounterValue(counter) {
        let sum = parseFloat(counter.values.current_value) - parseFloat(counter.values.payment_value);
        return sum > 0 ? parseFloat(sum).toFixed(2) : 0;
    },

    getCounterSum(counter) {
        let coef = counter.values.tariff ? (counter.values.tariff[0] ? counter.values.tariff[0].recordValues[3] : 0 ) : 0;
        let sum = this.getCounterValue(counter) * coef;

        return sum > 0 ? parseFloat(sum).toFixed(2) : 0;
    }
}
