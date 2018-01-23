import React from 'react'

import { NavLink } from 'react-router-dom'

const Header = () => (
  <div className="AdminActionsHeader">
    <i className="AdminActionIcon fa fa-tasks" />Actions
  </div>
)
export default ({ match }) => (
  <div className="AdminActionsMenu">
    <Header />
    <NavLink to={`${match.path}/find`} className="AdminAction">
      Find Member
    </NavLink>

    <NavLink to="/" className="AdminAction">
      Create New Member
    </NavLink>

    <NavLink to="/" className="AdminAction">
      Check Statistics
    </NavLink>

    <NavLink to="/" className="AdminAction">
      Create/Edit Plans
    </NavLink>

    <NavLink to="/" className="AdminAction">
      Upload Ladok List
    </NavLink>

    <NavLink to="/" className="AdminAction">
      It's Some Kinds Of Magic
    </NavLink>
  </div>
)
