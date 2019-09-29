<template>
    <div class="row bonus-page">
        <div class="trash-container" v-if="!showWin">
            <div class="trash">
                <div class="trash-empty"></div>
                <div class="trash-full" v-bind:style="{height: getHeight}"></div>
                <!--
                <div class="bonus-count">
                    <div v-html="getBonusValue"></div> бонусов
                </div>
                -->
            </div>
            <div class="trash-title">Все супер!</div>
            <div class="trash-text">
                Выбросите мусор еще <span v-html="getCount"></span> раз<br/>и получите подарок
            </div>

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
            bonusLimit: 4000
        }),
        computed: {
            getHeight() {
                return (Math.ceil(((this.getNewBonusValue + this.getBonusValue) / this.bonusLimit) * 75) + 16) + 'px';
            },
            getCount() {
                return Math.floor((this.bonusLimit - (this.getNewBonusValue + this.getBonusValue)) / 300);
            },
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
    .trash-title,
    .bonus-title {
        color: #0F1827;
        font-size: 24px;
        line-height: 28px;
        text-align: center;
    }
    .trash-text,
    .bonus-text {
        opacity: .8;
        margin: 12px 0;
        color: #0F1827;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
    }
    .trash-container .btn,
    .bonus-container .btn {
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
        margin: 0 0 28px;
    }

    .trash-container {
        height: 220px;
        margin: auto;
    }
    .trash {
        z-index: 5;
        width: 128px;
        height: 128px;
        display: flex;
        position: relative;
        margin: 0 auto 12px;
    }
    .trash-full,
    .trash-empty {
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        content: '';
        display: flex;
        position: absolute;
        background: url('./../../assets/trash-empty.svg') no-repeat 50% 100% / cover;
    }
    .trash-empty {
        top: 0;
    }
    .trash-full {
        z-index: 4;
        background-image: url('./../../assets/trash-full.svg');
    }
    .trash .bonus-count {
        color: #000;
        margin: auto;
        font-size: 16px;
        text-align: center;
    }
</style>
