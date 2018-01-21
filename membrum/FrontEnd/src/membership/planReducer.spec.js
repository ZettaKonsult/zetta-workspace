import { reducer, getPlanOptions, getAllPlans } from './planReducer'
import { planLoadSuccess } from './planActions'

describe('planReducer', () => {
  it('planLoadSuccess()', () => {
    let plans = [{ id: '1' }, { id: '2' }]
    expect(reducer(createState(), planLoadSuccess(plans))).toEqual(
      createState({
        byId: { '1': { id: '1' }, '2': { id: '2' } },
        allIds: ['1', '2']
      })
    )
  })

  describe('selector tests', () => {
    let state
    beforeEach(() => {
      state = createState({
        byId: {
          '1': { id: '1', labels: [1], group: ['x'] },
          '2': { id: '2', labels: [2], group: ['x'] },
          '3': { id: '3', labels: [3], group: ['y'] },
          '4': { id: '4', labels: [3], group: ['z'] },
          '5': { id: '5', labels: [3], group: ['z'], type: 'trail' }
        },
        allIds: ['1', '2', '3', '4', '5']
      })
    })

    describe('getPlanOptions()', () => {
      it('returns the plans which have the same group that are not trails', () => {
        expect(getPlanOptions(state)('1')).toEqual([
          { id: '1', labels: [1], group: ['x'] },
          { id: '2', labels: [2], group: ['x'] }
        ])
      })
      it('returns the plans which have the same label that are not trails', () => {
        expect(getPlanOptions(state)('3')).toEqual([
          { id: '3', labels: [3], group: ['y'] },
          { id: '4', labels: [3], group: ['z'] }
        ])
      })

      it('only returns when both label and group is all group and labels are matching', () => {
        expect(getPlanOptions(state)('5')).toEqual([
          { id: '4', labels: [3], group: ['z'] },
          { id: '5', labels: [3], group: ['z'], type: 'trail' }
        ])
      })
    })
    describe('getAllPlans()', () => {
      it('returns an array with all the ids', () => {
        expect(getAllPlans(state)).toEqual(state.allIds)
      })
    })
  })
})

const createState = state => ({
  byId: {},
  allIds: [],
  ...state
})
