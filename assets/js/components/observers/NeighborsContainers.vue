<template>
    <div v-if="isHaveTarget" class="neighbors">
        <div class="close" @click="stop"></div>

        <div class="point-info">
            <img class="point-image" v-bind:src="getPhoto"
                 :alt="container.title" />
            <div class="point-wrp">
                <div class="point-name" v-html="container.title"></div>
                <div class="point-types" v-html="getType"></div>
            </div>
        </div>

        <div class="point-address" v-html="getAddress"></div>

        <button-field :class="{'btn-action': inArea}" v-if="!processing" @click="start" title="Сдать мусор" />
    </div>
</template>

<script>
    import ButtonField from '../forms/Button'
    import IntervalStore from '../../helper/intervals'
    import ContainerType from '../../enums/container-types'

    export default {
        name: 'NeighborsContainers',
        components: {
            ButtonField
        },
        props: {
            inArea: {
                type: Boolean,
                default: false,
            },
        },
        data: () => ({
            processing: false,
            bonusProcessing: false,
            interval: false,
            coords: null
        }),
        created() {
            IntervalStore.stop('check_event');

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
            },
            getPhoto() {
                return this.container.values.photo ? ( this.container.values.photo[0] ? this.container.values.photo[0].url : '') : '';
            },
            getAddress() {
                return this.container.values.address ? this.container.values.address :  this.container.values.longitude + ' ' + this.container.values.latitude;;
            },
            getType() {
                var types = [];
                for(var i in this.container.values.types) {
                    var type = this.container.values.types[i];

                    types.push(ContainerType.getTitle(type).toLowerCase())
                }

                return types.join(', ');
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

                    IntervalStore.save('check_event', this.interval);

                    // Через 5 секунд пометиv успешным
                    setTimeout(() => {
                        // Подтверждим выбор
                        this.close();
                    }, 5000);
                }
            },
            stop() {
                IntervalStore.stop('check_event');

                this.$store.commit('RESET_TARGET');
            }
        }
    }
</script>

<style scoped>
    .neighbors {
        color: #000;
        padding: 28px;
        flex: 0 0 192px;
        background: #fff;
        font: var(--text);
        position: relative;
        box-shadow: inset 0 1px 0 rgba(38, 59, 97, .2);
    }
    .neighbors:before {
        top: 8px;
        left: 50%;
        width: 28px;
        height: 4px;
        content: '';
        display: block;
        margin: 0 -14px;
        position: absolute;
        background: #DADADC;
        border-radius: 10px;
    }
    .neighbors .close {
        top: 12px;
        right: 12px;
        width: 24px;
        height: 24px;
        position: absolute;
        background: url('./../../assets/close.svg') no-repeat 80% 80% / cover;
    }
    .neighbors .point-info {
        display: flex;

    }
    .neighbors .point-image {
        width: 44px;
        height: 44px;
        border-radius: 4px;
        margin: 0 12px 0 0;
        background: #C4C4C4;
        transform: matrix(-1, 0, 0, 1, 0, 0);
    }
    .neighbors .point-info {

    }
    .neighbors .point-name {
        margin: 3px 0 4px;
        font: var(--title);
    }
    .neighbors .point-types {
        opacity: .4;
        color: #0F1827;
    }
    .neighbors .point-address {
        margin: 12px 0 15px;
    }
</style>
