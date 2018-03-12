import React from 'react';
import { Auth } from 'aws-amplify';

const Home = props => (
  <div className="Mypage">
    <input type="input" placeholder="email" />
    <input type="input" placeholder="password" />
    <button onClick={signUp}>Register</button>
    Welcome to Operis!
  </div>
);

// let user = await Auth.currentAuthenticatedUser();
// let result = await Auth.updateUserAttributes(user, {
//   'custom:companyCustomerId': 'cjdvmtzgd000104wgiubpx9ru',
// });
// await this.signUp();
const signUp = async () => {
  const result = await Auth.signUp({
    username: 'be.a.spectator@gmail.com',
    password: 'qwertyqwerty',
    attributes: {
      'custom:companyCustomerId': 'cjdvmtzgd000104wgiubpx9ru',
    },
  });
  console.log(result);
};

export default Home;
