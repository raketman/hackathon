<template>
    <div class="row bonus-page">
        <div class="trash-container" v-if="!showWin">
            <div class="trash">
                <div class="bonus-count" v-html="getBonusValue"></div>
                <div v-html="getNewBonusValue"></div>
            </div>
            <div class="trash-title">Все супер!</div>
            <div class="trash-text">Выбросите мусор еще 5 раз<br/>и получите подарок</div>

            <button-field class="btn-action" @click="gotoStart" title="Закрыть" />
        </div>

        <div class="bonus-container" v-if="showWin">
            <img class="bonus-image" src="./../../assets/bonus.png" alt="Скидка на «Умный дом»" />
            <div class="bonus-title">Скидка на «Умный дом»</div>
            <div class="bonus-text">Вам доступна скидка 25% на установку<br>системы «Умный дом» от Ростелеком</div>

            <button-field class="btn-action" @click="gotoStart" title="Получить бонус" />
        </div>

    </div>
</template>

<script>
    import ButtonField from '../forms/Button';

    export default {
        name: 'Bonus',
        components: {
            ButtonField,
        },
        data: () => ({
            bonusLimit: 700
        }),
        computed: {
            getObjects() {
                return this.$store.getters.BONUSES_NEW;
            },
            getNewBonusValue() {
                var value = 0;
                // проходит по значениям
                for (let bonus of this.$store.getters.BONUSES_NEW) {
                    value += bonus.values.value;
                }
                return value;
            },
            getBonusValue() {
                var value = 0;
                // проходит по значениям
                for (let bonus of this.$store.getters.BONUSES) {
                    value += bonus.values.value;
                }
                return value;
            },
            showWin() {
                return this.bonusLimit < (this.getBonusValue + this.getNewBonusValue);
            }
        },
        created() {
        },
        methods: {
            gotoStart() {
                this.$router.push({name: 'start'});
            },
            loadObject() {
                this.$store.commit('RESET_BONUSES');

                this.$store.dispatch('SET_BONUSES').then(() => {

                });
            },
        },
        mounted() {
            this.loadObject();
        },
    }
</script>

<style>
    .bonus-page {
        margin: 28px;
        display: flex;
        position: relative;
        height: calc(100vh - 56px);
    }
    .trash-container {
        height: 220px;
        margin: auto;
    }
    .trash {
        width: 128px;
        height: 128px;
        position: relative;
        background: url('./../../assets/trash-empty.svg') no-repeat 50% 50% / 80%;
    }
    .trash:before {
        left: 0;
        bottom: 0;
        content: '';
        width: 128px;
        height: 78px;
        display: flex;
        position: absolute;
        background: url('./../../assets/trash-full.svg') no-repeat 50% 50% / 80%;
    }
    .trash-title {
        color: #0F1827;
        margin: 12px 0;
        font-size: 24px;
        line-height: 28px;
        text-align: center;
    }
    .trash-text {
        opacity: .8;
        color: #0F1827;
        font-size: 14px;
        max-width: 260px;
        line-height: 20px;
        text-align: center;
    }
    .trash-container .btn {
        left: 0;
        bottom: 0;
        position: absolute;
    }

    .bonus-container {
        margin: 90px auto 0;
    }
    .bonus-image {
        margin: auto;
        display: flex;
    }
    .bonus-title {
        color: #0F1827;
        font-size: 24px;
        line-height: 28px;
        text-align: center;
        margin: 28px 0 12px;
    }
    .bonus-text {
        opacity: .8;
        color: #0F1827;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
    }
    .bonus-container .btn {
        bottom: 0;
        position: absolute;
    }
</style>
