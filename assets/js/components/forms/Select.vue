<template>
    <select class="form-ctrl" @input="$emit('input', $event.target.value)">
        <option value="">{{ label }}</option>
        <option v-for="option in options" :key="option.id" :value="option.id">
            {{ option.title }}
        </option>
    </select>
</template>

<script>
    export default {
        name : "Select",
        props: [
            'label',
            'options',
        ],
    }
</script>

<style scoped>

</style>
