<template>
    <div class="modal" tabindex="-1" role="dialog">
        <div :style="{ width: width }" class="modal-dialog" role="document">
            <button-field @click="close" class="btn-link modal-close" />
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="big-text" v-html="title"></h5>
                </div>
                <div class="modal-body">
                    <slot name="body" />
                </div>
                <div class="modal-footer">
                    <slot name="footer" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ButtonField from './../forms/Button';

    export default {
        name: 'Modal',
        components: {
            ButtonField,
        },
        props: {
            title: {
                type: String,
                required: false,
            },
            width: {
                type: String,
                required: false,
            },
            close: {
                type: Function,
            },
        },
    }
</script>

<style scoped>
    .modal {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 300;
        display: flex;
        position: fixed;
        background: rgba(0, 0, 0, .3);
    }
    .modal-dialog {
        width: 335px;
        margin: auto;
        display: flex;
        padding: 0 20px;
        position: relative;
        background: var(--bg-modal);
        border-radius: var(--big-radius);
    }
    .modal-body {
        overflow: hidden;
        overflow-y: auto;
        max-height: 400px;
    }
    .modal-footer {
        margin: 20px 0 0;
    }

    .modal-close {
        top: 0;
        margin: 0;
        right: -5px;
        width: auto;
        display: flex;
        cursor: pointer;
        position: absolute;
        align-items: center;
        justify-content: center;
    }
    .modal-close:after {
        content: url('./../../assets/circle-time.svg');
    }
    .modal-close:hover {
        opacity: .8;
    }
</style>
