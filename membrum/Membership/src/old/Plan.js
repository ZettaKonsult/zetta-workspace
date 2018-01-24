/* @flow */
import uuid from 'uuid';

type validInterval = 'month' | 'year';

export default class Plan {
  id: string;
  name: string;
  amount: string;
  interval: validInterval;
  intervalCount: number;
  labels: string[];
  group: string[];

  constructor({
    id = uuid.v1(),
    name = '',
    amount = 0,
    interval = 'month',
    intervalCount = 6,
    labels = [],
    group = [],
  } = {}) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.interval = interval;
    this.intervalCount = intervalCount;
    this.labels = labels;
    this.group = group;
  }

  verifyMonthInterval() {
    return (
      this.interval === 'month' &&
      this.isEvenDivisableOnYear(this.intervalCount) &&
      this.isPositiveInterval()
    );
  }
  isPositiveInterval() {
    return this.intervalCount > 0;
  }
  isEvenDivisableOnYear(number: number) {
    return 12 % number === 0;
  }

  comparePlanInterval(plan: Plan): boolean {
    return (
      this.interval === plan.interval &&
      this.intervalCount === plan.intervalCount
    );
  }
}
