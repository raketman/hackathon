<template>
    <div class="row">
        <form action="#/" method="post" @submit.prevent="createNewCounter">
            <select-field
                name="type"
                v-model="type"
                :options="getTypes"
                label="Тип счетчика"
            />
            <text-field v-model="number" placeholder="Номер счетчика" required />
            <p>
                После добавления счетчика с вами свяжется специалист
                для назначения даты для поверки прибора
            </p>
            <button-field class="btn-action" title="Добавить счетчик" />
        </form>
    </div>
</template>

<script>
    import ButtonField from '../../forms/Button';
    import TextField from '../../forms/Text';
    import SelectField from '../../forms/Select';
    import CounterTypes from '../../../enums/counter-types'

    export default {
        components: {
            ButtonField,
            SelectField,
            TextField
        },
        props: {
            callback: {
                type: Function,
            },
            object: {
                type: Object,
            },
        },
        data: () => ({
            type: '',
            number: '',
        }),
        computed: {
            getTypes() {
                return CounterTypes.all();
            },
        },
        methods: {
            createNewCounter() {
                this.$store.dispatch('ADD_COUNTER', {
                    object_id: this.object.id,
                    type: this.type,
                    number: this.number,
                })
                    .then(() => {
                        this.callback();
                    });
            },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
