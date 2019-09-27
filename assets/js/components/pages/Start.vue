<template>
    <div class="row flex-column">
        <title-block title="Стартовая" />

        <div class="payment a-bottom">
            <button-field  @click="startPayment" title='Выбросить мусор' />
        </div>
    </div>
</template>

<script>
    import Modal from "../ui/Modal";
    import TitleBlock from '../block/Title';
    import ButtonField from '../forms/Button';


    export default {
        name: 'Object',
        components: {
            TitleBlock,
            ButtonField,
            Modal,
        },
        data: () => ({
            showAddModal: false,
            showPaymentModal: false,
        }),
        computed: {
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
                this.$router.push({ name: 'map' });
            },
        },
        mounted() {
        },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .payment {
        padding: 25px 20px;
        margin: auto -20px 0;
        border-top: var(--border3);
        background: var(--bg-modal);
    }
</style>
