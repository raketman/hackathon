<template>
    <div v-if="isHaveTarget" class="modal" tabindex="-1" role="dialog">
        !!!!
    </div>
</template>

<script>
    import CoordsHelper from '../../helper/coordinate-helper';

    export default {
        name: 'NeighborsContainers',
        components: {
            CoordsHelper
        },
        props: {
        },
        data: () => ({
            container: null
        }),
        created() {
            setInterval(this.state, 3000);
        },
        computed: {
            isHaveTarget() {
                return this.$store.getters.IS_TARGET;
            }
        },
        methods: {
            state() {
                navigator.geolocation.getCurrentPosition( (position) => {
                    var user = this.$store.getters.USER;

                    if (!this.$store.getters.IS_TARGET) {
                        this.container = null;
                        return;
                    }

                    if (!CoordsHelper.inAreaContainer(user, this.$store.getters.GET_TARGET)) {
                        this.container = null;
                        return;
                    }

                    this.container = this.$store.getters.GET_TARGET;

                });
            }
        }
    }
</script>

<style scoped>
</style>
