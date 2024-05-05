<template>
  <div class="flex justify-content-between">
    <PrimeCheckbox
      :modelValue="isChecked"
      :binary="true"
      @update:modelValue="$emit('invertCheck', item?.index)"
    ></PrimeCheckbox>
    {{ item?.label }}
    <PrimeButton
      style="height: 25px; border-radius: 10px"
      icon="pi pi-pencil"
      @click="$emit('changeItem', item?.index)"
    ></PrimeButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { IItem } from '@/models/item.dto'
export default defineComponent({
  name: 'sidebar-item',
  props: {
    item: Object as PropType<IItem>
  },
  computed: {
    isChecked() {
      return this.item?.isChecked || false
    }
  }
})
</script>

<style scoped></style>
