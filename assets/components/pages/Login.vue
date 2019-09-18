<template>
    <div class="row cover">
        <h2 class="big-title">Вход в систему</h2>
        <form v-if="isPhone" action="/login" method="post" @submit.prevent="authorized">
            <phone-field v-model="login" name="phone" required />
            <button-field class="btn-action" title="Отправить код" />
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
