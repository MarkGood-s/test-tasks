<template>
  <div class="container pt-3">
    <div class="row">
      <div class="col-5">
        <CustomSideBar
          class="content-zone"
          :items="sortedItems"
          :label="'Its a sidebar'"
          @createNewItem="createNewItem()"
          @changeItem="selectItem($event)"
          @invertCheck="invertCheck($event)"
        />
      </div>
      <div class="col-7">
        <ActionWindow
          class="content-zone"
          :items="sortedItems"
          :label="'Its a window'"
          :item="selectedItem"
          @changeConnection="changeConnection($event)"
          @changeItemLabel="changeItemLabel($event)"
        />
        <PrimeButton style="bottom: 50px; left: 35%" @click="save()">Save item</PrimeButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CustomSideBar from './CustomSidebar.vue'
import ActionWindow from './ActionWindow.vue'
import type { IItem } from '@/models/item.dto'
import { Item } from '@/models/item.dto'

export default defineComponent({
  components: { CustomSideBar, ActionWindow },
  name: 'main-content',
  computed: {
    sortedItems() {
      return this.items.slice().sort((a, b) => b.index - a.index)
    }
  },
  data() {
    return {
      items: [] as IItem[],
      selectedItem: {} as IItem,
      changedItemLabel: '',
      changedConnections: [] as number[]
    }
  },
  methods: {
    createNewItem() {
      const nextIndex = this.items.length
        ? this.items.sort((a, b) => b.index - a.index)[0].index + 1
        : 1
      this.items.push(new Item(nextIndex))
    },
    selectItem(event: any) {
      this.selectedItem = Object.assign(
        this.selectedItem,
        this.items.find((item) => item.index === event)
      )
      this.changedConnections = this.selectedItem.connectedItems
    },
    changeConnection(event: [boolean, number]) {
      if (event[0]) {
        this.selectedItem.connectedItems.push(event[1])
        this.changedConnections.push(event[1])
      }
      if (!event[0]) {
        this.selectedItem.connectedItems = this.selectedItem.connectedItems.filter(
          (index) => index !== event[1]
        )
        this.changedConnections = this.changedConnections.filter((index) => index !== event[1])
      }
      this.items = this.items.filter((item) => item.index !== this.selectedItem.index)
      this.items.push(
        new Item(
          this.selectedItem.index,
          this.selectedItem.connectedItems,
          this.selectedItem.label,
          this.selectedItem.isChecked
        )
      )
    },
    invertCheck(event: number) {
      if (this.selectedItem.index === event) {
        this.selectedItem = new Item(
          this.selectedItem.index,
          this.selectedItem.connectedItems,
          this.selectedItem.label,
          !this.selectedItem.isChecked
        )
      }
      this.items = this.items.map((item) => {
        if (
          item.index === event ||
          this.items
            .find((secondItem) => secondItem.index === event)
            ?.connectedItems.includes(item.index)
        ) {
          return new Item(item.index, item.connectedItems, item.label, !item.isChecked)
        }
        return item
      })
    },
    changeItemLabel(event: string) {
      this.changedItemLabel = event || ''
    },
    save() {
      this.items = this.items.filter((item) => item.index !== this.selectedItem.index)
      this.selectedItem.label = this.changedItemLabel
      this.selectedItem.connectedItems = this.changedConnections
      this.items.push(
        new Item(
          this.selectedItem.index,
          this.selectedItem.connectedItems,
          this.selectedItem.label,
          this.selectedItem.isChecked
        )
      )
    }
  }
})
</script>

<style scoped>
.content-zone {
  border: 1px solid black;
  border-radius: 10px;
  height: 80vh;
  min-height: 500px;
  padding: 20px;
}
</style>
