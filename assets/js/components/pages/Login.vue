<template>
    <div class="row cover login-page">
        <h2 class="login-title">Эко</h2>
        <form v-if="isPhone" action="/login" method="post" @submit.prevent="authorized">
            <phone-field v-model="login" name="phone" required />
            <button-field class="btn-action" title="Получить код" />
        </form>

        <form v-if="isCode" action="/login" method="post" @submit.prevent="checkCode">
            <text-field v-model="code" v-mask="'#  #  #  #'" name="code" placeholder="Sms код" required />
            <button-field class="btn-action" title="Войти в систему" />
            <button-field class="btn-action-hollow" @click="showAnotherPhone" title="Указать другой номер" />
        </form>
    </div>
</template>

<script>
    import { mask } from 'vue-the-mask';
    import TextField from '../forms/Text';
    import PhoneField from '../forms/Phone';
    import ButtonField from '../forms/Button';

    export default {
        name: 'Login',
        components: {
            PhoneField,
            ButtonField,
            TextField,
        },
        directives: {
            mask,
        },
        data: () => ({
            code: '',
            login: '',
            step: 'phone',
            codeCheck: '1234',
            user_data: null
        }),
        computed: {
            isPhone() {
                return this.step == 'phone';
            },
            isCode() {
                return this.step == 'code';
            }
        },
        methods: {
            showAnotherPhone() {
                this.login = '';
                this.step = 'phone';
            },
            authorized() {
                if (this.login.replace(/\D/gi, '').length !== 11) {
                    this.$store.commit('ADD_ERROR', 'Номер телефона введен не верно!');
                } else {
                    // Проверим наличие юзера
                    this.$store.dispatch('AUTHORIZED', this.login)
                        .then((resp) => {
                            if (resp.data.length != 1) {
                                this.$store.commit('ADD_ERROR', 'Пользователь не найден');
                            } else {
                                this.user_data = resp.data[0];
                                this.step = 'code';
                            }
                        });
                }
            },
            checkCode() {
                if (this.code.replace(/\D/gi, '') !== this.codeCheck) {
                    this.$store.commit('ADD_ERROR', 'Не верный код!');
                } else {
                    this.$store.dispatch('AUTHORIZED', this.login)
                        .then(() => {
                            this.$store.commit('AUTHORIZED', this.user_data);
                            this.$router.push({ name : 'start' });
                        });
                }
            },
        },
    }
</script>

<style>
    .login-page {
        z-index: 1;
        padding: 16px;
        overflow: hidden;
        position: relative;
    }
    .login-page:after {
        content: '';
        z-index: -1;
        top: -100px;
        left: -85px;
        width: 570px;
        height: 452px;
        display: block;
        position: absolute;

        background: #7B1EF5;
        border-radius: 30px;
        transform: rotate(-30deg);
    }
    .login-title {
        font-size: 20px;
        margin: 20px 17px;
        font-weight: normal;
        color: var(--bg-modal);
    }
    .login-page form {
        background: #fff;
        border-radius: 8px;
        padding: 22px 12px 7px;
    }
</style>