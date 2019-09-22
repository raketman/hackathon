<template>
    <div class="row">
        <title-block title="Оплата" />

        <form action="/login" method="post" @submit.prevent="payment">
            <text-field v-model="card" v-mask="'#### #### #### ####'"
                        name="code" placeholder="Номер карты" required pattern="\d{4} \d{4} \d{4} \d{4}" />
            <text-field v-model="valid" v-mask="'## / ##'"
                        name="valid" placeholder="Дата валидности" required pattern="\d\d / \d\d" />
            <text-field v-model="csv" v-mask="'###'"
                        type="password" name="csv" placeholder="CSV" required pattern="\d{3}" />
            <button-field class="btn-action" title="Оплатить" />
        </form>
        <button-field title="Назад" @click="back" />
    </div>
</template>

<script>
    import { mask } from 'vue-the-mask';
    import TextField from '../forms/Text';
    import ButtonField from '../forms/Button';
    import TitleBlock from '../block/Title';
    import PaymentSumResolver from '../../helper/payment-sum-resolver';

    export default {
        name: 'Login',
        components: {
            ButtonField,
            TextField,
            TitleBlock,
        },
        data: () => ({
            csv: '123',
            valid: '12/21',
            card: '1234567887654321',
        }),
        directives: {
            mask,
        },
        computed: {
            getCheckedObject() {
                return this.$store.getters.OBJECTS.filter( item => { return item.checked })
            }
        },
        created() {
            if  (this.getCheckedObject.length === 0) {
                this.$router.push({name: 'start'});
            }
        },
        methods: {
            back() {
                this.$router.push({name: 'start'});
            },
            payment() {
                // Для каждого объекта создадим платеж
                let promises = [];

                // Получим отмеченные документы
                let pays = [];
                for(var i in this.getCheckedObject) {
                    var object = this.getCheckedObject[i];
                    var counters =  this.$store.getters.COUNTERS.filter( item => { return item.object_id === object.id })

                    for(var c in counters) {
                        var counter = counters[c];
                        var sum = PaymentSumResolver.getCounterSum(counter);
                        if (sum === 0) {
                            continue;
                        }

                        pays.push({
                            "id": counter.id,
                            "objectId": object.id,
                            "value": sum
                        });
                    }
                }

                promises.push(this.$store.dispatch('CREATE_PAYMENT', {'pays': pays}));

                Promise.all(promises).then(() => {
                    this.$router.push({ name: 'start' });
                });

                // for(let i in this.$store.getters.OBJECTS) {
                //     var object = this.$store.getters.OBJECTS[i];
                //     promises.push(this.$store.dispatch('CREATE_PAYMENT', {
                //         'object': object,
                //         'sum': PaymentSumResolver.getSum(object),
                //     }));
                // }

                Promise.all(promises).then(() => {
                    this.$router.push({ name: 'start' });
                });
            },
        },
    }
</script>
