<template>
  <div>
    <h2>{{ label }}</h2>
    <PrimeButton class="mb-3" style="border-radius: 10px" @click="$emit('createNewItem')">
      Create new item
    </PrimeButton>
    <div v-if="items?.length" class="list-group overflow-scroll">
      <SidebarItem
        v-for="item in items"
        :key="item.index"
        :item="item"
        class="list-group-item min-w-min"
        @changeItem="$emit('changeItem', $event)"
        @invertCheck="$emit('invertCheck', $event)"
      ></SidebarItem>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SidebarItem from './CustomSidebarItem.vue'
import type { IItem } from '@/models/item.dto'
import type { PropType } from 'vue'

export default defineComponent({
  components: { SidebarItem },
  name: 'custom-side-bar',
  props: {
    label: String,
    items: Array as PropType<IItem[]>
  },
  emits: {
    createNewItem: () => true,
    changeItem: (event: number) => true,
    invertCheck: (event: number) => true
  }
})
</script>

<style scoped>
.list-group {
  max-height: 70%;
  min-height: 310px;
}
</style>
