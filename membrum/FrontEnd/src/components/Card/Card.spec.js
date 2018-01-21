import React from 'react'
import renderer from 'react-test-renderer'
import { StaticRouter } from 'react-router'

import Card from './'
import Footer from './Footer'

describe('<Card />', function() {
  it('should render a Card', function() {
    const tree = renderer.create(<Card />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
