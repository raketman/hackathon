<template>
    <modal :close="close">
        <div slot="body" v-html="this.$store.getters.GET_ERROR">

        </div>
    </modal>
</template>

<script>
    import modal from '../ui/Modal'

    export default {
        components: {
            modal
        },
        methods: {
            close() {
                this.$store.commit('FLUSH_ERROR');
            }
        }
    }
</script>

<style scoped>
</style>