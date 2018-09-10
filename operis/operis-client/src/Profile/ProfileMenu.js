import React from 'react';
import { Link } from 'react-router-dom';

class ProfileHome extends React.PureComponent {
  render() {
    const { match } = this.props;

    return (
      <ul>
        <li>
          <Link to={`${match.path}/profile`}>Update your settings</Link>
        </li>
        <li>
          <Link to={`${match.path}/invoicegroup`}>
            Manage your invoice groups
          </Link>
        </li>
      </ul>
    );
  }
}

export default ProfileHome;
