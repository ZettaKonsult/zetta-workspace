export default class Database {
  constructor() {
    this.data = []
  }

  getItems() {
    return this.data
  }

  findItemIndex(id) {
    return this.data.findIndex(item => item.id === id)
  }

  saveItem(newPlan) {
    const planIndex = this.data.findIndex(plan => plan.id === newPlan.id)
    if (planIndex === -1) {
      this.data = [...this.data, newPlan]
      return this.data
    }

    this.data = [
      ...this.data.slice(0, planIndex),
      newPlan,
      ...this.data.slice(planIndex + 1)
    ]

    return this.data
  }

  removeItem(id) {
    const itemIndex = this.findItemIndex(id)
    this.data = [
      ...this.data.slice(0, itemIndex),
      ...this.data.slice(itemIndex + 1)
    ]
    return this.data
  }

  getItem(id) {
    return this.data.find(plan => plan.id === id)
  }

  getItemsByAttribute(attribute, data) {
    return this.data.filter(plan => plan[attribute] === data)
  }
}
