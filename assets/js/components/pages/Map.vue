<template>
    <div class="row flex-column">
        <title-block title="Карта" :back="back" :showBack="showBack" />
        <yandex-map-ui v-if="showMap"></yandex-map-ui>
    </div>
</template>

<script>
    import YandexMapUi from '../ui/YandexMapUi';
    import TitleBlock from '../block/Title'

    export default {
        name: 'Map',
        components: {
            YandexMapUi, TitleBlock
        },
        data: () => ({
            showMap: false
        }),
        computed: {
            showBack: function(){
                return this.$store.getters.IS_TARGET;
            }
        },
        methods: {
            loadObject() {
                this.$store.commit('RESET_OBJECTS');

                this.$store.dispatch('SET_OBJECTS').then(() => {

                });
            },
            back: function(){
                if (this.$store.getters.IS_TARGET) {
                    this.$store.commit('RESET_TARGET');
                } else {
                    this.$router.push({name: 'start'});
                }
            },

        },
        created() {
        },
        mounted() {
            this.showMap = true;
            this.loadObject();
        },
    }
</script>

<style scoped>
</style>
