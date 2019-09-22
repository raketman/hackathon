<template>
    <div class="row">
        <form action="#/" method="post" @submit.prevent="createNewObject">
            <text-field v-model="title" placeholder='Название объекта' required />
            <text-field v-model="account" placeholder='Лицевой счет' required />
            <button-field class="btn-action" title="Создать объект" />
        </form>
    </div>
</template>

<script>
    import TextField from '../../forms/Text';
    import ButtonField from '../../forms/Button';

    export default {
        name: 'ObjectAdd',
        components: {
            TextField,
            ButtonField,
        },
        props: {
            callback: {
                type: Function,
            },
        },
        data: () => ({
            title: '',
            account: '',
        }),
        methods: {
            createNewObject() {
                this.callback();
                this.$store.dispatch('ADD_OBJECT', {
                    title: this.title,
                    account: this.account
                })
                    .then(() => {
                        this.callback();
                    });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
