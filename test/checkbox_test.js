import React from 'react'
import TestRenderer from 'react-test-renderer'
import ReactTestUtils from 'react-dom/test-utils'

import Checkbox from '../src/Checkbox'

// Returns a TestInstance#find() predicate that passes
// all test instance children (including text nodes) through
// the supplied predicate, and returns true if one of the
// children passes the predicate.
function findInChildren (predicate) {
  return testInstance => {
    const children = testInstance.children
    return Array.isArray(children)
      ? children.some(predicate)
      : predicate(children)
  }
}

describe('<Checkbox>', () => {
  it('renders the supplied text somewhere in the markup', () => {
    const text = 'a checkbox'
    const markup = TestRenderer.create(
      <Checkbox text={text} onChange={() => {}} checked={true} />
    )

    // Verify that the checkbox text appears somewhere in the rendered markup.
    markup.root.find(findInChildren(node =>
      typeof node === 'string' &&
      node.toLowerCase() === text
    ))
  });

  it('renders exactly one checked <input />', () => {
    const markup = TestRenderer.create(
      <Checkbox text="a checkbox" onChange={() => {}} checked={true} />
    )

    // testInstance.findByType()
    //    Finds the first element in the markup with the specified type.
    //    You can pass in strings (corresponding to "primitive" React elements, like input and div)
    //    and you can also pass in custom component classes.
    //
    //    Throws (and fails the test) if there are no elements of the specified type or if
    //    there are more than instances.

    // Find the actual <input /> element
    const inputElementByType = markup.root.findByType('input')
    expect(inputElementByType.props.checked).toBe(true)
    expect(inputElementByType.props.type).toBe('checkbox')

    // We access the props of the element using testInstance.props

    // The <Checkbox /> itself
    const checkboxClassElement = markup.root.findByType(Checkbox)
    expect(checkboxClassElement.props.checked).toBe(true)
    expect(checkboxClassElement.props.text).toBe('a checkbox')

    // We can also use testInstance.findByProps() to assert that a single element in the markup
    // matches some props.

    // testInstance.findByProps() does partial matching of props, so we don't need to supply
    // every prop.
    const inputElementByProps = markup.root.findByProps({
      checked: true,
      type: 'checkbox',
    })

    // We have access to the actual element and can make further assertions
    expect(inputElementByProps.props.onChange).toBeInstanceOf(Function)
  });

  it('renders the <input /> within a <label />', () => {
    const markup = TestRenderer.create(
      <Checkbox text="a checkbox" onChange={() => {}} checked={true} />
    )

    // The testInstance.find() variants return test instances, so we can do a restricted
    // search of the <label /> to write a test that makes sure the label is clickable.
    const labelElement = markup.root.findByType('label')
    labelElement.findByProps({
      checked: true,
      type: 'checkbox',
    })
  })

  it('responds to clicks', () => {
    const checked = false
    const changeHandler = jest.fn()

    // Fully render the element as a detached node.
    // Requires a DOM. jest includes jsdom by default, but you'll need to set up jsdom
    // yourself if you aren't using jest.
    const element = ReactTestUtils.renderIntoDocument(
      <Checkbox text="a checkbox" onChange={changeHandler} checked={checked} />
    )

    // Find the actual <input /> element.
    // ReactTestUtils will not propagate events, so we need to find the exact element to
    // trigger the event on.
    const input = ReactTestUtils.findRenderedDOMComponentWithTag(element, 'input')


    // Simulate the change event on the input (what would happen if we clicked the checkbox
    // in the real DOM).
    ReactTestUtils.Simulate.change(input)

    // Verify that the change handler was called, and that it was passed an actual
    // <input /> element that has the correct checked prop.
    expect(changeHandler).toHaveBeenCalledTimes(1)
    const eventArgument = changeHandler.mock.calls[0][0]
    expect(eventArgument.target.checked).toBe(checked)
  })

  test.skip('the behavior of .root and .getInstance()', () => {
    // Just a stateless functional component
    const SomeSFC = () => <p>hello world</p>

    const markup = TestRenderer.create(
      <Checkbox text="a checkbox" onChange={() => {}} checked={true} />
    )

    const sfcMarkup =  TestRenderer.create(<SomeSFC />)

    // .root will be a TestInstance for the SFC and the full-fledged Component
    console.log(markup.root)
    console.log(sfcMarkup.root)

    // For the Component, getInstance() returns the actual <Checkbox /> node
    console.log(markup.getInstance())

    // For the SFC, getInstance() returns null
    console.log(sfcMarkup.getInstance())
  })
});
