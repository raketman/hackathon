<template>
    <div v-if="isHaveTarget" class="modal" tabindex="-1" role="dialog">
        Выбрано:
        <div v-html="this.$store.getters.GET_TARGET.title"></div>


        <div class="payment a-bottom" v-if="!processing">
            <button-field :class="{'btn-action': inArea}" @click="start"title="Открыть" />
        </div>

        <div class="payment a-bottom" v-if="!processing">
            <button-field  @click="stop" title="Отменить" />
        </div>

        <div class="payment a-bottom" v-if="processing">
            <button-field  @click="close" title="Закрыть" />
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
            processing: false,
            interval: false

        }),
        created() {
            setInterval(this.state, 3000);

            // Подпишемся на появления события выброс мусора
            this.$store.subscribe( (mutation, state) => {
                if (mutation.type !== 'SET_EVENT') {
                    return;
                }

                // Получим найденный документ
                let event = this.$store.getters.GET_EVENT;

                if (!this.interval) {
                    // Запустим инетрвал на проверку
                    this.interval = setInterval(() => {
                        // Мониторим выброс
                        this.$store.dispatch('CHECK_EVENT')
                    }, 1000);

                    // Через 5 секунд пометиv успешным
                    setTimeout(() => {
                        // Подтверждим выбор
                        this.close();
                    }, 5000);
                }

                if (event.values && parseInt(event.values.status) === 2) {
                    clearInterval(this.interval);
                    this.$store.commit('RESET_TARGET');
                    this.$router.push({name: 'bonus'});
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
            close() {
                // Подтверждим выбор
                this.$store.dispatch('APPROVED_EVENT')
            },
            start() {
                if (!this.inArea) {
                    return;
                }
                this.processing = true;
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
