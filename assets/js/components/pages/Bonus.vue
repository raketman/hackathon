<template>
    <div class="row">
        <title-block title="Бонусы" />

        Новых
        <div v-html="getNewBonusValue"></div>
        Было
        <div v-html="getBonusValue"></div>



        <div v-if="showWin">Победа!</div>


    </div>
</template>

<script>
    import TitleBlock from '../block/Title'

    export default {
        name: 'Bonus',
        components: {
            TitleBlock
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
    .map{
        width: 100%;
        height: 300px;
    }
</style>
