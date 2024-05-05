<template>
  <div class="flex justify-content-between">
    <PrimeCheckbox
      :modelValue="isConnected"
      :binary="true"
      @update:modelValue="$emit('changeConnection', [$event, item?.index])"
    ></PrimeCheckbox>
    {{ item?.label }}
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { IItem } from '@/models/item.dto'
export default defineComponent({
  name: 'sidebar-item',
  props: {
    item: Object as PropType<IItem>,
    connectedItems: Array<number | undefined>
  },
  computed: {
    isConnected() {
      return this.connectedItems?.includes(this.item?.index) || false
    }
  }
})
</script>

<style scoped></style>
