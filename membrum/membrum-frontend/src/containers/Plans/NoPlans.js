import React from "react"

import Button from "../../components/Button"

const CreatePlan = ({ onClick }) => (
  <div>
    <h2>There are no created plans for this organisation yet</h2>
    <div style={{ marginBottom: "1em" }}>Start with creating one</div>
    <Button onClick={onClick} large>
      Create A Plan
    </Button>
  </div>
)

export default CreatePlan
