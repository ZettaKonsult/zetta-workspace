import { v4 } from 'uuid'

export const addReport = report => ({
  type: 'ADD_REPORT',
  id: v4(),
  report
})
