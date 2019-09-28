<template>
    <div class="col a-center top-block">
        <button-field class="btn-link btn-back" v-if="showBack" v-on:click="back" />
        <h3 class="title col">{{ title }}</h3>
        <logout v-if="this.$store.getters.IS_AUTHORIZED" />
    </div>
</template>

<script>
    import Logout from './Logout';
    import ButtonField from '../forms/Button';

    export default {
        name: "Title",
        components: {
            Logout,
            ButtonField,
        },
        props: [
            'back',
            'title',
            'showBack'
        ],
    }
</script>

<style scoped>
    .top-block {
        flex: 0 0 64px;
        padding: 0 5px;
        background: #7B1EF5;
        justify-content: stretch;
    }
    .top-block .title {
        flex: auto;
        padding: 0 15px;
        justify-content: center;
    }

    .btn-back {
        width: auto;
        display: flex;
        font: var(--text);
        align-items: center;
        color: var(--bg-modal);
    }
    .btn-back:before {
        content: url('./../../assets/back.svg');
    }
</style>