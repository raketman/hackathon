<template>
    <div class="row">
        <title-block title="Оставить заявку на подключение" />

        <div v-if="isSended">
            Мы с вами свяжемся

        </div>
        <form v-if="!isSended" action="/statement" method="post" @submit.prevent="load">
            <text-field v-model="name"
                        name="name" placeholder="Имя" required />
            <text-field v-model="contact"
                        name="contact" placeholder="Контакты" required  />
            <button-field class="btn-action" title="Отправить" />
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
        name: 'Statement',
        components: {
            ButtonField,
            TextField,
            TitleBlock,
        },
        data: () => ({
            isSended: false,
            name: '',
            contact: ''
        }),
        directives: {
            mask,
        },
        computed: {
        },
        created() {
        },
        methods: {
            back() {
                this.$router.push({name: 'start'});
            },
            load() {
                // Для каждого объекта создадим платеж
                let promises = [];

                this.$store.dispatch('CREATE_STATEMENT', {name: this.name, contact: this.contact}).then( ()=> {
                    this.isSended = true;
                });
            },
        },
    }
</script>
