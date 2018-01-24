import React from 'react';
import renderer from 'react-test-renderer';

import Input from './Input';

it('should render a Input', function() {
  const tree = renderer.create(<Input onChange={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});
