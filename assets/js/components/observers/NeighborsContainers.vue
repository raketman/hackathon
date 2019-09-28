<template>
    <div v-if="isHaveTarget" class="neighbors">
        Выбрано:
        <div v-html="this.$store.getters.GET_TARGET.title"></div>


        <div class="payment a-bottom" v-if="!processing">
            <button-field :class="{'btn-action': inArea}" @click="start" title="Открыть" />
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
            ButtonField
        },
        props: {
        },
        data: () => ({
            inArea: null,
            processing: false,
            bonusProcessing: false,
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

                if (event.values && parseInt(event.values.status) === 2 && !this.bonusProcessing) {
                    this.bonusProcessing = true;
                    clearInterval(this.interval);
                    // Начислим балы
                    this.$store.dispatch('ADD_BONUS').then(() => {
                        this.$store.commit('RESET_TARGET');
                        this.$router.push({name: 'bonus'});
                    });

                }

            });
        },
        computed: {
            isHaveTarget() {
                return this.$store.getters.IS_TARGET;
            },
            container() {
                return this.$store.getters.GET_TARGET;
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
            },
            stop() {
                this.$store.commit('RESET_TARGET');
            },
            state() {
                navigator.geolocation.getCurrentPosition( (position) => {
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
    .neighbors {
        flex: 0 0 192px;
        background: #fff;
    }
</style>
