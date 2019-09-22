<template>
    <input type="tel" class="form-ctrl" placeholder="Введите номер телефона"
           v-mask="'+7 (###) ###-##-##'" :value="value" @input="$emit('input', $event.target.value)"
    />
</template>

<script>
    import { mask } from 'vue-the-mask';

    export default {
        name : "Phone",
        props: {
            value: String,
        },
        directives: {
            mask,
        },
    }
</script>