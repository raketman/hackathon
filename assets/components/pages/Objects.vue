<template>
    <div class="row flex-column">
        <title-block title="Моя недвижимость" />

        <div v-for="object in getObjects" :key="object.id" class="object-item">
            <button-field class="btn-link btn-dots"/>

            <div class="object-head">
                <label>
                <div class="checkbox-block">
                    <input type="checkbox" class="object-checkbox" v-on:click="selectObject(object)" :checked="object.checked">
                </div>
                <div class="object-name big-text">{{ object.values.title }}</div>
                <div class="object-contract bold-text">ЛС - {{ object.values.account }}</div>
                </label>
            </div>

            <counters class="object-body" :counters="getCounters" :object="object" />
        </div>

        <button-field class="btn-dotted" @click="startAdd" title="Добавить объект" />
        <modal v-if="showAddModal" :close="closeAddModal" title="">
            <div class="body" slot="body">
                <object-add :callback="closeAddModal">

                </object-add>
            </div>
        </modal>

        <div class="payment a-bottom">
            <button-field :class="{'btn-action': getPaymentSum > 0}" @click="startPayment" :title="'Оплатить '+ getPaymentSum +' ₽'" />
        </div>
    </div>
</template>

<script>
    import Modal from "../ui/Modal";
    import TitleBlock from '../block/Title';
    import Counters from './block/Counters';
    import ButtonField from '../forms/Button';
    import ObjectAdd from './block/ObjectAdd';
    import PaymentSumResolver from '../../helper/payment-sum-resolver';

    export default {
        name: 'Object',
        components: {
            TitleBlock,
            ObjectAdd,
            Counters,
            ButtonField,
            Modal,
        },
        data: () => ({
            showAddModal: false,
            showPaymentModal: false,
        }),
        computed: {
            getPaymentSum() {
                return PaymentSumResolver.getAllSum(this.getSelectedObject);
            },
            getSelectedObject() {
                return this.getObjects.filter( item => {return item.checked})
            },
            getObjects() {
                return this.$store.getters.OBJECTS;
            },
            getCounters() {
                return this.$store.getters.COUNTERS;
            },
        },
        methods: {
            selectObject(object) {
                this.$store.commit('CHANGE_SELECTED_OBJECT', object);
            },
            deleteObject(object) {
                this.$store.dispatch('DELETE_OBJECT', object);
            },
            startPayment() {
                if (parseInt(this.getPaymentSum)  === 0) {
                    return;
                }
                this.$router.push({ name: 'payment' });
            },
            startAdd() {
                this.showAddModal = true;
            },
            closeAddModal() {
                this.showAddModal = false;
            },
            loadObject() {
                this.$store.commit('RESET_OBJECTS');

                this.$store.dispatch('SET_OBJECTS').then(() => {
                    // Сбросим все счетчики
                    this.$store.commit('RESET_COUNTERS');

                    // Загрузим счетчики
                    for(let i in this.$store.getters.OBJECTS) {
                        this.$store.dispatch('SET_COUNTERS', this.$store.getters.OBJECTS[i].id);
                    }
                });
            },
        },
        mounted() {
           this.loadObject();
        },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .checkbox-block {
        position: absolute;
    }
    .object-checkbox {

        height: 15px;
        width: 15px;
    }
    .object-item {
        margin: 0 0 15px;
        position: relative;
        box-shadow: var(--shadow);
        background: var(--bg-modal);
        border-radius: var(--radius);
    }
    .object-head {
        padding: 15px;
    }
    .object-name {
        margin: 0 20px 5px;
    }
    .object-contract {
        opacity: .5;
    }
    .object-body {
        margin: 5px 0 0;
    }

    .payment {
        padding: 25px 20px;
        margin: auto -20px 0;
        border-top: var(--border3);
        background: var(--bg-modal);
    }
</style>
