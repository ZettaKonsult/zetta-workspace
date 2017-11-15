import React from "react"

import Button from "../../components/Button"

export default ({ plans, readPlan, deletePlan, createPlan }) => {
  const groups = filterUniqueAttributes(plans, "group")

  let result = groups.map(group => {
    let filtered = plans.filter(item => item.group === group)

    return (
      <PlanGroup title={group} key={group}>
        {filtered.map(item => (
          <PlanRow
            key={item.id}
            plan={item}
            showPlan={readPlan}
            deletePlan={deletePlan}
          />
        ))}
      </PlanGroup>
    )
  })

  return (
    <div>
      <div className="ButtonGroup">
        <Button large onClick={createPlan}>
          Create Plan
        </Button>
      </div>
      <div className="PlansContainer">{result}</div>
    </div>
  )
}

const PlanGroup = props => (
  <div className="PlansShow">
    <h1>{props.title}</h1>
    {props.children}
  </div>
)

const PlanRow = ({ plan, showPlan, deletePlan }) => (
  <span className="PlanObject">
    <span className="PlanName" id={plan.id} onClick={showPlan}>
      {plan.name}
    </span>
    <DeleteCross id={plan.id} onClick={deletePlan} />
  </span>
)

const DeleteCross = ({ onClick, id }) => (
  <span id={id} className="deleteCross" onClick={onClick}>
    &times;
  </span>
)

function filterUniqueAttributes(array, attribute) {
  let f = []
  let result = array.filter(
    item => f.indexOf(item[attribute]) === -1 && f.push(item[attribute])
  )
  return result.map(item => item[attribute])
}
