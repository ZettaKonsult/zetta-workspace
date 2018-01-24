import Subscription from './Subscription';
import Plan from './Plan';

let sub;
let monthPlan = new Plan({ amount: 100, interval: 'month', intervalCount: 6 });
let monthPlanCopy = new Plan({
  amount: 100,
  interval: 'month',
  intervalCount: 6,
});
let yearPlan = new Plan({ amount: 200, interval: 'year', intervalCount: 4 });

beforeEach(() => {
  sub = new Subscription();
});

describe('Subscription', () => {
  describe('addPlan()', () => {
    it('Plan is added', () => {
      expect(sub.addPlan(monthPlan)).toBeTruthy();
      expect(sub.getNumberOfPlans()).toBe(1);
    });

    it('Plan is not added when interval is different', () => {
      sub.addPlan(monthPlan);

      expect(sub.addPlan(yearPlan)).toBeFalsy();
      expect(sub.getNumberOfPlans()).toBe(1);
    });

    it('Plan is added when interval is same', () => {
      sub.addPlan(monthPlan);
      expect(sub.addPlan(monthPlanCopy)).toBeTruthy();
      expect(sub.getNumberOfPlans()).toBe(2);
    });
  });

  describe('updatePlan()', () => {
    it('Returns false if plan is not in subscription', () => {
      sub.addPlan(monthPlan);
      expect(sub.updatePlan(yearPlan, monthPlanCopy)).toBeFalsy();
      expect(sub.getNumberOfPlans()).toBe(1);
    });

    it('Should swap plan if only one is present', () => {
      sub.addPlan(monthPlan);
      expect(sub.updatePlan(monthPlan, yearPlan)).toBeTruthy();
      expect(sub.getNumberOfPlans()).toBe(1);
    });

    it('Should not swap plan in multiplan subscription if interval || intervalCount are different', () => {
      sub.addPlan(monthPlan);
      sub.addPlan(monthPlanCopy);
      expect(sub.updatePlan(monthPlan, yearPlan)).toBeFalsy();
      expect(sub.getNumberOfPlans()).toBe(2);
    });
  });

  describe('getTotalPlanCost()', () => {
    it('returns the total cost for one plan', () => {
      sub.addPlan(monthPlan);
      expect(sub.getTotalPlanCost()).toEqual(100);
    });

    it('returns the total cost for multiple plans', () => {
      sub.addPlan(monthPlan);
      sub.addPlan(monthPlanCopy);
      expect(sub.getTotalPlanCost()).toEqual(200);
    });
  });

  describe('isBillable()', () => {
    const lastPaid = Date.UTC(2017, 2);
    const timeToPay = Date.UTC(2017, 11);
    const notPayDate = Date.UTC(2017, 3);

    describe('not periodical', () => {
      it('true if the payment date + intervalCount has passed', () => {
        sub = new Subscription([monthPlan], false, [lastPaid]);
        expect(sub.isBillable(timeToPay)).toBeTruthy();
      });
      it('false if the payment date + intervalCount has not passed', () => {
        sub = new Subscription([monthPlan], false, [lastPaid]);
        expect(sub.isBillable(notPayDate)).toBeFalsy();
      });
    });

    describe('periodical', () => {
      it('true if the payment date has passed the upperBound of the plan intervalCount', () => {
        sub = new Subscription([monthPlan], true, [lastPaid]);
        expect(sub.isBillable(timeToPay)).toBeTruthy();
      });
      it('false if the payment has not passed upperBound of the plan intervalCount', () => {
        sub = new Subscription([monthPlan], true, [lastPaid]);
        expect(sub.isBillable(notPayDate)).toBeFalsy();
      });
    });
  });

  describe('getNextPeriodicalPayDate()', () => {
    const paidDate = Date.UTC(2017, 1, 1);

    it('returns the upperbound for the subscription based on interval and intervalConut', () => {
      sub = new Subscription([monthPlan], true, [paidDate]);
      expect(sub.getNextPayDate()).toBe(Date.UTC(2017, 6, 1));
    });

    it('returns the upperbound for the subscription based on interval and intervalConut', () => {
      const plan = new Plan({ interval: 'month', intervalCount: 4 });
      sub = new Subscription([plan], true, [paidDate]);
      expect(sub.getNextPayDate()).toBe(Date.UTC(2017, 4, 1));
    });

    it('returns the upperbound for the subscription based on interval and intervalConut', () => {
      const plan = new Plan({ interval: 'month', intervalCount: 3 });
      sub = new Subscription([plan], true, [paidDate]);
      expect(sub.getNextPayDate()).toBe(Date.UTC(2017, 3, 1));
    });

    it('returns the upperbound for the subscription based on interval and intervalConut', () => {
      const plan = new Plan({ interval: 'month', intervalCount: 2 });
      sub = new Subscription([plan], true, [paidDate]);
      expect(sub.getNextPayDate()).toBe(Date.UTC(2017, 2, 1));
    });

    it('returns the upperbound for the subscription based on interval and intervalConut', () => {
      const plan = new Plan({ interval: 'month', intervalCount: 1 });
      sub = new Subscription([plan], true, [paidDate]);
      expect(sub.getNextPayDate()).toBe(Date.UTC(2017, 2, 1));
    });

    it('Throws error for none implemented intervals', () => {
      sub = new Subscription([yearPlan], true, [paidDate]);
      expect(() => sub.getNextPayDate()).toThrowError(/Not yet implemented/);
    });
  });

  describe('getNextSequentialPayDate()', () => {
    const paidDate = Date.UTC(2017, 1, 1);

    it('get epoxTime + 1 day', () => {
      const plan = new Plan({ interval: 'day', intervalCount: 1 });
      sub = new Subscription([plan], false, [paidDate]);
      expect(sub.getNextSequentialPayDate()).toBe(Date.UTC(2017, 1, 2));
    });

    it('get epoxTime + 1 month', () => {
      const plan = new Plan({ interval: 'month', intervalCount: 1 });
      sub = new Subscription([plan], false, [paidDate]);
      expect(sub.getNextSequentialPayDate()).toBe(Date.UTC(2017, 2, 1));
    });
    it('get epoxTime + 1 year', () => {
      const plan = new Plan({ interval: 'year', intervalCount: 1 });
      sub = new Subscription([plan], false, [paidDate]);
      expect(sub.getNextSequentialPayDate()).toBe(Date.UTC(2018, 1, 1));
    });
  });
});
