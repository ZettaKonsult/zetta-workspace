import React, {Component} from 'react'
import {connect} from 'react-redux'
import {membershipFetchRequest, fetchAllPlans} from './membershipActions'
import './membership.css'

class MembershipForm extends Component {
  componentDidMount() {
    this.props.fetchMembership()
    this.props.fetchAllPlans()
  }

  render() {
    const {isFetching, membership, plans} = this.props
    if (isFetching && !membership.length) {
      return <p>Loading...</p>
    }
    return (
      <div className="membership">
        {membership.map(plan => (
          <div key={plan.id} className="membershipGroup">
            <h3 className="GroupTitle">{plan.name}</h3>
            <select defaultValue={plan.id}>
              {plans.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        ))}

        <div className="ButtonGroup">
          <button onClick={this.editMembership}>Edit Membership</button>
          <button onClick={this.registerUndefined}>Register Undefined</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  plans: state.membershipReducer.allPlans,
  membership: state.membershipReducer.plans,
  isFetching: state.membershipReducer.isFetching
})

const mapDispatchToProps = dispatch => ({
  fetchMembership: () => dispatch(membershipFetchRequest),
  fetchAllPlans: () => dispatch(fetchAllPlans)
})

export default connect(mapStateToProps, mapDispatchToProps)(MembershipForm)
