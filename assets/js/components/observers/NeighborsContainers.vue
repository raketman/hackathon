<template>
    <div v-if="isHaveTarget" class="modal" tabindex="-1" role="dialog">



        <div class="payment a-bottom">
            <button-field :class="{'btn-action': inArea}" @click="start"title="Открыть" />
        </div>

        <div class="payment a-bottom">
            <button-field  @click="stop" title="Отменить" />
        </div>
    </div>
</template>

<script>
    import CoordsHelper from '../../helper/coordinate-helper';
    import ButtonField from '../forms/Button'

    export default {
        name: 'NeighborsContainers',
        components: {
            CoordsHelper, ButtonField
        },
        props: {
        },
        data: () => ({
            inArea: null,

        }),
        created() {
            setInterval(this.state, 3000);


            var interval;
            // Поодпишется на ищщзмеггегй
            this.$store.subscribe( (mutation, state) => {
                if (mutation.type !== 'SET_EVENT') {
                    return;
                }

                // Получим найденный документ
                let event = this.$store.getters.GET_EVENT;

                if (!interval) {
                    // Запустим инетрвал на проверку
                    interval = setInterval(() => {
                        // Мониторим выброс
                        this.$store.dispatch('CHECK_EVENT')
                    }, 1000);

                    // Через 5 секунд пометиv успешным
                    setTimeout(() => {
                        // Подтверждим выбор
                        this.$store.dispatch('APPROVED_EVENT')
                    }, 5000);
                }


                if (parseInt(event.values.status) === 2) {
                    clearInterval(interval);
                    this.$router.push({name: 'result'});
                }

            });
        },
        computed: {
            isHaveTarget() {
                return this.$store.getters.IS_TARGET;
            },
            container() {
                return thid.$store.getters.GET_TARGET;
            }
        },
        methods: {
            start() {
                this.$store.dispatch('ADD_EVENT');
            },
            stop() {
                this.$store.commit('RESET_TARGET');
            },
            state() {
                navigator.geolocation.getCurrentPosition( (position) => {
                    var user = this.$store.getters.USER;

                    if (!this.$store.getters.IS_TARGET) {
                        this.inArea = false;
                        return;
                    }

                    if (!CoordsHelper.inAreaContainer(position.coords, this.$store.getters.GET_TARGET)) {
                        this.inArea = false;
                        return;
                    }

                    this.inArea = true;

                });
            }
        }
    }
</script>

<style scoped>
</style>
