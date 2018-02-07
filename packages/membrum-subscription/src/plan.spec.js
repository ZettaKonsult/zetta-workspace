import { createNewPlan } from './plan';

describe('createNewPlan()', () => {
  it('returns updated version of the old plan', () => {
    const oldValues = { id: 'a' };
    const newValues = { id: 'b' };
    const timeStamp = Date.now();

    const result = createNewPlan({ oldValues, newValues, timeStamp });

    expect(result.oldUpdatedValues.updatedAt).toBe(timeStamp);
  });

  it('new values override old values', () => {
    const oldValues = { id: 'a' };
    const newValues = { id: 'b' };

    const result = createNewPlan({ oldValues, newValues });

    expect(result.newPlan.id).toBe('b');
  });

  it('should have a pointer to itself as the newest version', () => {
    const oldValues = { id: 'a' };
    const newValues = { id: 'b' };

    const result = createNewPlan({ oldValues, newValues });

    expect(result.newPlan.updatedTo).toBe('b');
  });
});
