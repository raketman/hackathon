<template>
    <div class="logout">
        <form action="" method="get" @submit.prevent="logout">
            <button-field class="btn-link btn-logout" title="Выход" />
        </form>
    </div>
</template>

<script>
    import ButtonField from '../forms/Button';

    export default {
        name: 'Logout',
        components: {
            ButtonField
        },
        methods: {
            logout() {
                this.$store.commit('RESET_OBJECTS');
                this.$store.dispatch('LOGOUT').then(() => {
                    this.$router.push({name: 'login'});
                });
            }
        }
    }
</script>

<style scoped>
.logout {
    display: flex;
    margin-left: auto;
}
</style>
