import React from 'react'

import NavLink from '../components/NavLink'

export default () => (
  <div className="AdminActionsMenu">
    <div className="AdminActionsHeader">
      <i className="AdminActionIcon fa fa-tasks" />Actions
    </div>

    <NavLink label="Find Member" className="AdminAction" />
    <NavLink to="/signup" label="Create New Member" className="AdminAction" />
    <NavLink
      to="/statistics"
      label="Check Statistics"
      className="AdminAction"
    />
    <NavLink label="Create/Edit Plans" to="/plans" className="AdminAction" />
    <NavLink
      to="/uploadmembers"
      className="AdminAction"
      label="Upload Ladok List"
    />
    <NavLink className="AdminAction" label="It's Some Kinds Of Magic" />
  </div>
)
