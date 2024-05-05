export interface IItem {
  label: string
  index: number
  isChecked: boolean
  connectedItems: number[]
}

export class Item {
  label: string
  index: number
  isChecked: boolean
  connectedItems: number[]
  constructor(id: number, connectedItems?: number[], label?: string, isChecked?: boolean) {
    this.label = label || `New Item ${id}`
    this.index = id
    this.isChecked = isChecked || false
    this.connectedItems = connectedItems || []
  }
}
