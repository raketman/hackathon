<template>
    <div class="datepicker-wrapper">
		<div class="datepicker reestr">
			<datepicker
				:language="ru"
				:format="format"
				:name="name"
				:input-class="inputClass"
				:value="value"
				@selected="onSelected"
			></datepicker>
			<div class="calendar_icon ">
				<img src="../assets/images/calendar.svg" alt="">
			</div>
		</div>
    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker'
	import { ru } from 'vuejs-datepicker/dist/locale'

    export default {
        props: {
            value: {},
            name: {
                type: String,
                required: false
            },
            format: {
                type: String,
                default: 'dd.MM.yyyy'
            },
            inputClass: {
                type: String,
                default: ''
            },
            valueProcessor: {
                type: Function,
                default: (date) => date
            }
        },

		data: () => ({
			ru: ru
		}),

        components: {
            Datepicker
		},
        methods: {
            onSelected(date) {
                this.$emit('input', this.valueProcessor(date))
            }
        }
    }
</script>

<style scoped>
    .filter-form .datepicker-wrapper .calendar_icon {
        top: -8px;
    }
    
    .vdp-datepicker__calendar {
          right: 0;
    }
</style>