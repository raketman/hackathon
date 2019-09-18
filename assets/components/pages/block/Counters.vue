<template>
    <div class="row">
        <div v-for="counter in getCounters" :key="counter.id" class="counter">
            <div class="counter-num">
                <span :class="'counter-type type_'+ counter.values[9][0]">{{ counter.values.payment_value }}{{ getCounterTariffType(counter) }}</span>
            </div>
            <div v-if="1" class="counter-info">
                <div class="counter-meter">{{ getValueToPay(counter) }}{{ getCounterTariffType(counter) }}</div>
                <div class="counter-sum">{{ getSumToPay(counter) }} ₽</div>
            </div>
            <button-field v-else class="btn-action btn-block" @click="startChangeValue(counter)" title="Ввести показания" />
        </div>

        <button-field class="btn-link" @click="startAdd" :counter="currentCounter" title="Добавить счетчик" />
        <modal v-if="showAddModal" :close="stopAdd" title="Добавление нового счетчика">
            <div class="body" slot="body">
                <counter-add :callback="stopAdd" :object="object"></counter-add>
            </div>
        </modal>

        <modal v-if="showChangeModal" :close="stoptChangeValue" :title="counterTitle">
            <div class="body" slot="body">
                <counter-value :callback="stoptChangeValue" :counter="currentCounter"></counter-value>
            </div>
        </modal>
    </div>
</template>

<script>
    import Modal from "../../ui/Modal";
    import CounterAdd from './CounterAdd';
    import CounterValue from './CounterValue';
    import ButtonField from "../../forms/Button";
    import CounterTypes from '../../../enums/counter-types';
    import PaymentSumResolver from '../../../helper/payment-sum-resolver';

    export default {
        name: 'Counters',
        components: {
            Modal,
            ButtonField,
            CounterAdd,
            CounterValue,
        },
        data: () => ({
            showAddModal: false,
            showChangeModal: false,
            currentCounter: null,
        }),
        props: {
            counters: { },
            object: { },
        },
        computed: {
            getCounters() {
                return this.counters.filter( item => { return item.object_id === this.object.id })
            },
            counterTitle() {
                return CounterTypes.getTitle(this.currentCounter.values.type[0]);
            },
        },
        methods: {
            getCounterTariffType(counter) {
                return counter.values.tariff ? (counter.values.tariff[0] ? counter.values.tariff[0].recordValues[6]  : '') : '';
            },
            getValueToPay(counter) {
                return PaymentSumResolver.getCounterValue(counter);
            },
            getSumToPay(counter) {
                return PaymentSumResolver.getCounterSum(counter);
            },
            startAdd() {
                this.showAddModal = true;
            },
            stopAdd() {
                this.showAddModal = false;
            },
            startChangeValue(counter) {
                this.currentCounter =  counter;
                this.showChangeModal = true;
            },
            stoptChangeValue() {
                this.showChangeModal = false;
            },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .counter {
        margin: 5px 0;
        display: flex;
        background: #F8F8F8;
        justify-content: space-between;
    }
    .counter-num {
        padding: 15px;
        letter-spacing: var(--text-caps);
    }
    .counter-info {
        width: 150px;
        padding: 15px;
        display: flex;
        justify-content: space-between;
    }
    .counter-meter {
        letter-spacing: var(--text-caps);
    }
    .counter-sum {
        font: var(--bold-text);
    }

    .counter-type {
        display: flex;
    }
    .counter-type:before {
        margin-right: 5px;
        vertical-align: middle;
    }

    .type_1:before,
    .type_2:before {
        content: url('./../../../assets/voda.svg');
    }
    .type_3:before {
        content: url('./../../../assets/gaz.svg');
    }
    .type_4:before {
        content: url('./../../../assets/svet.svg');
    }
</style>
