<template>
    <div class="row">
        <form action="#/" method="post" @submit.prevent="counterChange">
            <text-field v-model="value" type="number" placeholder='Введите значение' required />
            <button-field class="btn-action" title="Сохранить" />
        </form>
    </div>
</template>

<script>
    import TextField from '../../forms/Text';
    import ButtonField from '../../forms/Button';

    export default {
        components: {
            TextField,
            ButtonField,
        },
        props: {
            counter: {
                type : Object,
            },
            callback: {
                type: Function,
            },
        },
        data: () => ({
            value: '',
        }),
        methods: {
            counterChange() {
                console.log(this.counter);

                this.callback();
                // TODO: событие добавление
                // this.$store.dispatch('ADD_COUNTER_VALUE', {counter_id: this.counter.id})
                //     .then(() => {
                //         this.callback();
                //     });
            },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
