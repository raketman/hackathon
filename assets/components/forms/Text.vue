<template>
    <input class="form-ctrl"
           :type="type"
           :value="value"
           @input="$emit('input', $event.target.value)"
    />
</template>

<script>
    export default {
        name : "TextField",
        props: {
            value: String,
            type: {
                type: String,
                default: 'text',
            },
        }
    }
</script>
