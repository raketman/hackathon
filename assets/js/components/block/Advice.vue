<template>
    <div class="advice">
        <div class="advice-ttl">Совет</div>
        <div class="advice-txt">
            Выключайте свет, выходя из комнаты.<br />
            <span class="text-success">Экономия электроэнергии до 20%</span>
        </div>
    </div>
</template>

<script>
    export default {
        name : "Advice"
    }
</script>

<style scoped>
    .advice {
        padding: 15px;
        margin-top: auto;
        position: relative;
        background: var(--bg-modal);
        border-radius: var(--radius);
    }
    .advice:after {
        top: 5px;
        right: 5px;
        content: url('../../assets/circle-info.svg');
        position: absolute;
    }
    .advice-ttl {
        opacity: .5;
    }
    .advice-txt {

    }
</style>