import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import Card from './'
import Footer from './Footer'
import Text from './Text'

describe('<Card />', function() {
  it('should render a Card', function() {
    const wrapper = shallow(<Card />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should render Text and Footer', function() {
    const wrapper = shallow(<Card />)
    expect(wrapper.containsAllMatchingElements([<Text />, <Footer />])).toEqual(
      true
    )
  })

  describe('Default values', function() {
    it('Should have a text', function() {
      const wrapper = mount(<Card />)
      expect(wrapper.prop('text')).toEqual('New Comments')
    })

    it('Should have a value', function() {
      const wrapper = mount(<Card />)
      expect(wrapper.prop('value')).toEqual('24')
    })

    it('Should have a icon', function() {
      const wrapper = mount(<Card />)
      expect(wrapper.prop('icon')).toEqual('comments')
    })
    it('Should have a type', function() {
      const wrapper = mount(<Card />)
      expect(wrapper.prop('type')).toEqual('primary')
    })
  })
})

describe('<Footer />', function() {
  it('Should render a Footer', function() {
    const wrapper = shallow(<Footer />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})

describe('<Text />', function() {
  it('Should render a Text', function() {
    const wrapper = shallow(<Text />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
