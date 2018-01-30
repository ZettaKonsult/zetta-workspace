import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getAllPlans, getPlanById } from './membershipReducer';
import PlanForm from './PlanForm';
import { loadPlanForEdit } from './planActions';

import Column from '../components/Column';
import Row from '../components/Row';

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
`;

const PlanLink = ({ handleClick, label }) => (
  <Plan onClick={handleClick}>{label}</Plan>
);

let PlanList = ({ plans, match, history, planLoad }) => (
  <Column>
    {plans.map(plan => (
      <PlanLink
        key={plan.id}
        label={plan.name}
        handleClick={() => planLoad(plan.id)}
        exact
      />
    ))}
  </Column>
);
const mapStateToProps = (state, { match, ...props }) => {
  return {
    plans: getAllPlans(state.membershipReducer).map(id =>
      getPlanById(state.membershipReducer, id)
    ),
  };
};

const mapDispatchToProps = {
  planLoad: planId => loadPlanForEdit(planId),
};

PlanList = connect(mapStateToProps, mapDispatchToProps)(PlanList);

export default ({ match }) => (
  <Row>
    <PlanList />
    <PlanForm />
  </Row>
);
