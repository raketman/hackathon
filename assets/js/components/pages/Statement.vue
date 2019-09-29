<template>
    <div class="row statement-page">
        <title-block title="Оставить заявку" :back="back" :showBack="showBack" />

        <div class="statement-wrap">
            <form v-if="isSended">
                <div v-if="isSended" class="statement-success">Спасибо! Мы с вами свяжемся.</div>
                <button-field class="btn-action" title="На главную" @click="back" />
            </form>

            <form v-if="!isSended" action="/statement" method="post" @submit.prevent="load">
                <text-field v-model="name" name="name" placeholder="Имя" required />
                <text-field v-model="contact" name="contact" placeholder="Контакты" required  />
                <button-field class="btn-action" title="Отправить" />
            </form>
        </div>
    </div>
</template>

<script>
    import { mask } from 'vue-the-mask';
    import TextField from '../forms/Text';
    import ButtonField from '../forms/Button';
    import TitleBlock from '../block/Title';

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
            contact: '',
            showBack: true,
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
                this.$store.dispatch('CREATE_STATEMENT', {name: this.name, contact: this.contact}).then( ()=> {
                    this.isSended = true;
                });
            },
        },
    }
</script>

<style>
    .statement-page {
        z-index: 1;
        overflow: hidden;
        position: relative;
    }
    .statement-page:after {
        content: '';
        z-index: -1;
        top: -50px;
        left: -85px;
        width: 570px;
        height: 452px;
        display: block;
        position: absolute;

        background: #7B1EF5;
        border-radius: 30px;
        transform: rotate(-30deg);
    }
    .statement-wrap {
        padding: 16px;
    }
    .statement-success {
        color: #FFBB44;
        font-size: 20px;
        margin: 30px 17px;
        text-align: center;
        font-weight: normal;
    }
    .statement-wrap form {
        background: #fff;
        border-radius: 8px;
        padding: 22px 12px 7px;
    }
</style>