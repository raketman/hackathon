<template>
    <div class="row flex-column">
        <title-block title="Стартовая" />

        <div class="payment a-bottom">
            <button-field  @click="startGarbage" title='Выбросить мусор' />
        </div>

    </div>
</template>

<script>
    import TitleBlock from '../block/Title';
    import ButtonField from '../forms/Button';

    export default {
        name: 'Object',
        components: {
            TitleBlock,
            ButtonField,
        },
        data: () => ({
            showAddModal: false,
            showPaymentModal: false,
        }),
        computed: {
        },
        methods: {
            startGarbage() {
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
