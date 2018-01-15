/* @flow */

import db from "../../mocks/db.js"

type State = {
  readPlan: boolean,
  plan: Object
}
type Props = {}

const defaultPlan = {
  name: "",
  amount: "",
  interval: "month",
  intervalCount: "6",
  group: ""
}

export const fetchPlans = (): Object => ({ data: db.plans })

export function fetchOnePlan(id: String) {
  return { plan: fetchPlans().data.find(item => item.id === id) }
}

export const toggleReadMode = (id: String) => {
  return function(state: State, props: Props) {
    return {
      showPlans: false,
      ...fetchOnePlan(id)
    }
  }
}

export const toggleCreateMode = (state: State, props: Props) => {
  return { showPlans: false, plan: defaultPlan }
}

//TODO send state.plan to api
export const savePlan = (state: State, props: Props) => {
  return { showPlans: true, plan: defaultPlan }
}

export function changePlan(key: String, value: String) {
  return (state: State, props: Props) => ({
    ...state,
    plan: {
      ...state.plan,
      [key]: value
    }
  })
}

//TODO send id for plan to be deleted to api
export function deletePlan(id: String) {
  return function(state: State, props: Props) {
    const { data } = fetchPlans()
    const index = data.findIndex(item => item.id === id)
    if (index !== -1) {
      return { data: [...data.slice(0, index), ...data.slice(index + 1)] }
    }
    return { data: data }
  }
}
