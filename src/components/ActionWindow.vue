<template>
  <div>
    <h2>{{ label }}</h2>
    {{ item?.label ? null : 'There is nothing...' }}
    <PrimeInput
      class="mb-3 w-full"
      v-if="itemLabel"
      :model-value="itemLabel"
      @update:model-value="$emit('changeItemLabel', $event)"
    />
    <div v-if="item?.index" class="list-group overflow-scroll">
      <ActionWindowItem
        class="list-group-item min-w-min"
        v-for="forItem in filteredItems"
        :key="forItem.index"
        :item="forItem"
        :connectedItems="item?.connectedItems"
        @changeConnection="$emit('changeConnection', $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { IItem } from '@/models/item.dto'
import type { PropType } from 'vue'
import ActionWindowItem from './ActionWindowItem.vue'

export default defineComponent({
  components: { ActionWindowItem },
  name: 'action-window',
  props: {
    label: String,
    item: Object as PropType<IItem>,
    items: Array as PropType<IItem[]>
  },
  computed: {
    itemLabel() {
      this.$emit('changeItemLabel', this.item?.label)
      return this.item?.label ? `${this.item.label}` : null
    },
    filteredItems() {
      return this.item && Object.keys(this.item).length
        ? this.items?.slice().filter((item) => item.index !== this.item?.index)
        : []
    }
  }
})
</script>

<style scoped>
.list-group {
  max-height: 70%;
  min-height: 310px;
}
</style>
