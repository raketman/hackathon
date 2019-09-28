<template>
    <div class="container main-app">
        <error v-if="this.$store.getters.GET_ERROR" />
        <router-view v-if="showRouter"></router-view>
    </div>
</template>

<script>
import Error from './components/block/Error';


export default {
    name: 'App',
    components: {
        Error
    },
    computed: {
        showRouter() {
            // Показываем, если неавторизованы или загрузили метаинфыу о пользователе
            return this.$store.getters.IS_AUTHORIZED ? this.$store.getters.USER : true;
        },
    },
    created() {
        // Запросим пользователя, если авторизованы
        if (this.$store.getters.IS_AUTHORIZED) {
            this.$store.dispatch('SET_USER', this.$store.getters.GET_TOKEN);
        }

        // ПОдпишемся на изменение токена
        this.$store.subscribe( (mutation) => {
            if (mutation.type === 'AUTHORIZED') {
                this.$store.dispatch('SET_USER', this.$store.getters.GET_TOKEN);
            }
        });

        // Стартанем проверку цели
        this.$store.dispatch('INIT_TARGET');
    },
}
</script>

<style>
    /* todo: delele */
    body {
        margin: 0;
        display: flex;
        min-height: 100vh;
        background: #E5E5E5;
        align-items: center;
        justify-content: center;
    }


    :root {
        --radius: 4px;
        --big-radius: 5px;
        --small-radius: 3px;

        --bg-modal: #fff;
        --text-color: #5B6375;
        --action-color: #7B1EF5;
        --bit-title-color: #343434;

        --color-danger: #FF612F;
        --color-warning: #FBC955;
        --color-success: #00CC9C;

        --border: 1px solid var(--action-color);
        --border2: 2px solid var(--action-color);
        --border3: 1px solid #E5E5E5;
        --border-dotted: 1px dashed var(--text-color);
        --shadow: 0 4px 10px rgba(91, 99, 117, .05);

        --text-caps: .2em;
        --base-ffamily: SF Compact Display, sans-serif;

        --text: 12px/15px var(--base-ffamily);
        --bold-text: bold 12px/15px var(--base-ffamily);
        --big-text: bold 14px/17px var(--base-ffamily);
        --title: 17px/20px var(--base-ffamily);
        --big-title: bold 22px/27px var(--base-ffamily);
    }

    * {
        box-sizing: border-box;
    }
    body {
        color: var(--text-color);
        font: var(--text);
/*
         -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
*/
    }
    .main-app {
        width: 414px;
        display: flex;
        min-height: 100vh;
        position: relative;
        background: #F8F8F8;
        justify-content: stretch;
    }

    .row {
        width: 100%;
    }
    .flex-column {
        display: flex;
        flex-direction: column;
    }
    .col {
        display: flex;
    }
    .a-center {
        align-items: center;
    }

    .text {
        font: var(--text);
    }
    .bold-text {
        font: var(--bold-text);
    }
    .big-text {
        font: var(--big-text);
    }
    .title {
        padding: 0;
        color: var(--bg-modal);
        text-align: center;
        font: var(--title);
    }
    .big-title {
        padding: 0;
        margin: 15px 0;
        text-align: center;
        font: var(--big-title);
        color: var(--bit-title-color);
    }

    .text-success {
        color: var(--color-success);
    }

    .btn,
    .form-ctrl {
        width: 100%;
        padding: 10px 15px;
        border-radius: var(--radius);
    }

    .btn {
        border: none;
        margin: 5px 0;
        cursor: pointer;
        text-align: center;
        font: var(--big-text);
    }
    .btn-action {
        color: var(--bg-modal);
        background: var(--action-color);
    }
    .btn-dotted {
        color: var(--big-text);
        background: transparent;
        border: var(--border-dotted);
    }
    .btn-action-hollow {
        color: var(--action-color);
        background: var(--bg-modal);
        border: var(--border2);
    }
    .btn-link {
        background: transparent;
        color: var(--action-color);
    }

    .btn-logout {
        display: flex;
        font: var(--text);
        align-items: center;
        color: var(--bg-modal);
    }
    .btn-logout:before {
        margin-right: 5px;
        content: url('./assets/logout.svg');
    }

    .btn-dots {
        right: 0;
        margin: 0;
        width: auto;
        z-index: 10;
        display: flex;
        cursor: pointer;
        position: absolute;
        align-items: center;
        justify-content: center;
    }
    .btn-dots:after {
        content: url('./assets/dots.svg');
    }

    .btn-block {
        margin: 0;
        width: 150px;
        padding: 15px 0;
        border-radius: 0;
        font: var(--bold-text);
    }

    .btn-grp {
        display: flex;
        overflow: hidden;
        justify-content: stretch;

        border: var(--border);
        background: var(--bg-modal);
        border-radius: var(--small-radius);
    }
    .btn-grp .btn {
        padding: 5px 0;
        font: var(--text);
        color: var(--action-color);
        border-left: var(--border);
        background: var(--bg-modal);
    }
    .btn-grp .btn:first-child {
        border-left: none;
    }
    .btn-grp .btn.active {
        color: var(--bg-modal);
        background: var(--action-color);
    }

    .form-ctrl {
        margin: 0 0 15px;
        color: var(--text-color);
        background: var(--bg-modal);
        border: 1px solid rgba(91, 99, 117, .2);
    }
    ::placeholder {
        opacity: .7;
    }
</style>
