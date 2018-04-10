import React from 'react'
import {render, Simulate, wait} from 'react-testing-library'
// this add custom expect matchers from dom-testing-library
import 'dom-testing-library/extend-expect'
import {Main} from '../components/main'

test('Main renders something',()=>{
  let rendered = render(<Main><p>hi</p></Main>)
  expect(rendered.container.firstChild).toMatchSnapshot()
})