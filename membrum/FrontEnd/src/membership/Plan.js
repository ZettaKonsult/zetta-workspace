import React from 'react'
import { connect } from 'react-redux'
import { Route, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { getAllPlans, getPlanById } from './membershipReducer'
import PlanForm from './PlanForm'

import Column from '../components/Column'
import Row from '../components/Row'

const Plan = styled.div`
  color: black;
  margin: 5px;
  text-decoration: none;
  font-size: 17px;
  user-select: none;

  &:hover {
    background-color: black;
    color: white;
  }
`

const PlanLink = ({ to, exact, label }) => (
  <NavLink to={to} exact={exact} style={{ textDecoration: 'none' }}>
    <Plan>{label}</Plan>
  </NavLink>
)

let PlanList = ({ plans, match, history }) => (
  <Column>
    {plans.map(plan => (
      <PlanLink
        key={plan.id}
        label={plan.name}
        to={`${match.path}/${plan.id}`}
        exact
      />
    ))}
  </Column>
)
const mapStateToProps = (state, { match, ...props }) => {
  return {
    plans: getAllPlans(state.membershipReducer).map(id =>
      getPlanById(state.membershipReducer, id)
    )
  }
}

PlanList = connect(mapStateToProps)(PlanList)

export default ({ match }) => (
  <Row>
    <Route path={match.path} component={PlanList} />
    <Route path={`${match.path}/:id?`} component={PlanForm} />
  </Row>
)
