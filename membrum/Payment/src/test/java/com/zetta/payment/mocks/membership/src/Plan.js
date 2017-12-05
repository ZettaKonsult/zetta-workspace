/* @flow */
import uuid from "uuid"

type validInterval = "month" | "year"

export default class Plan {
  id: string
  name: string
  amount: string
  interval: validInterval
  intervalCount: number
  labels: string[]
  group: string[]

  constructor(
    {
      id = uuid.v1(),
      name = "",
      amount = 0,
      interval = "month",
      intervalCount = 6,
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
    this.interval === "month" &&
    this.isEvenDivisableOnYear(this.intervalCount) &&
    this.isPositiveInterval()

  isPositiveInterval = () => this.intervalCount > 0
  isEvenDivisableOnYear = (number: number) => 12 % number === 0

  comparePlanInterval = (plan: Plan): boolean =>
    this.interval === plan.interval && this.intervalCount === plan.intervalCount
}
