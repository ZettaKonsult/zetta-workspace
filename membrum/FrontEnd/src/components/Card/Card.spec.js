import React from 'react'
import renderer from 'react-test-renderer'

import Card from './'
import Footer from './Footer'

it('should render a Card', function() {
  const tree = renderer.create(<Card />).toJSON()
  expect(tree).toMatchSnapshot()
})
