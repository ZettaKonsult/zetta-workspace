export default class Plan {
  constructor(
    {
      id,
      name = '',
      amount = 0,
      interval = 'day',
      intervalCount = '6',
      labels = [],
      group = []
    } = {}
  ) {
    this.id = id
    this.name = name
    this.amount = amount
    this.interval = interval
    this.intervalCount = intervalCount
    this.labels = labels
    this.group = group
  }

  verifyMonthInterval = () =>
    this.interval === 'month' &&
    this.intervalCount < '7' &&
    this.intervalCount !== '5' &&
    this.isPositiveInterval()

  isPositiveInterval = () => this.intervalCount > 0

  comparePlanInterval = plan =>
    this.interval === plan.interval && this.intervalCount === plan.intervalCount
}
