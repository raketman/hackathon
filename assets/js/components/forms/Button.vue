<template>
    <button type="submit" class="btn" @click="$emit('click')">{{ title }}</button>
</template>

<script>
    export default {
        name : "Button",
        props: [
            'title',
        ],
    }
</script>