<template>
<input v-model="inputValue" @input="inpu">
</template>

<script setup lang="ts">
import {ref} from "vue";
const props = defineProps<{
  modelValue: string,
}>()
const emits = defineEmits<{
  (event: 'update:model-value', value: string): void
}>()

const inputValue = ref(props.modelValue)

function inpu(e) {
  emits('update:model-value', e.target.value)
}


</script>

<style scoped>

</style>