import 'dom-testing-library/extend-expect'
import 'dom-testing-library/extend-expect'
import React from 'react'
import {render, Simulate, wait} from 'react-testing-library'
// this add custom expect matchers from dom-testing-library
import {Main} from '../components/main'

test('Main renders something',()=>{
  const rendered = render(<Main><p>hi</p></Main>)
  expect(rendered.container.firstChild).toMatchSnapshot()
})