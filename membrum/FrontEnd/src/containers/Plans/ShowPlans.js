import React from 'react';

import Button from '../../components/Button';
import Dropdown from '../../components/Select';

export default ({
  plans,
  readPlan,
  deletePlan,
  createPlan,
  attributeToSort,
  changeSort,
}) => {
  const groups = filterUniqueAttributes(plans, attributeToSort);

  let result = groups.map(value => {
    let filtered = getItemsWithAttributeValue(plans, attributeToSort, value);

    return (
      <PlanGroup title={value} key={value}>
        {filtered.map(item => (
          <PlanRow
            key={item.id}
            plan={item}
            showPlan={readPlan}
            deletePlan={deletePlan}
          />
        ))}
      </PlanGroup>
    );
  });

  return (
    <div>
      <div className="ButtonGroup">
        <Dropdown
          onChange={e => changeSort(e.target.value)}
          option={Object.keys(plans[0])}
          value={attributeToSort}
        />
        <Button large onClick={createPlan}>
          Create Plan
        </Button>
      </div>
      <div className="PlansContainer">{result}</div>
    </div>
  );
};

const PlanGroup = props => (
  <div className="PlansShow">
    <h3 className="ShowPlansTitle">{props.title}</h3>
    {props.children}
  </div>
);

const PlanRow = ({ plan, showPlan, deletePlan }) => (
  <span className="PlanName" onClick={e => showPlan(plan.id)}>
    {plan.name}
  </span>
);

//TODO move to subscription, this is way to much insight into how the class/module works
function filterUniqueAttributes(array, attribute) {
  const flatten = array.reduce(
    (result, item) =>
      Array.isArray(item[attribute])
        ? result.concat(flattenArray(item[attribute]))
        : result.concat(item[attribute]),
    []
  );
  return flatten.filter((item, index, self) => self.indexOf(item) === index);
}

const flattenArray = array =>
  array.reduce(
    (result, item) =>
      result.concat(Array.isArray(item) ? flattenArray(item) : item),
    []
  );

const getItemsWithAttributeValue = (array, attribute, value) =>
  array.filter(
    item =>
      Array.isArray(item[attribute])
        ? item[attribute].findIndex(v => v === value) !== -1
        : item[attribute] === value
  );
