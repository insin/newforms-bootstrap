var test = require('tape')

var BootstrapForm = require('../lib')

test('PropTypes.colSize', function(t) {
  t.plan(10)
  var colSize = BootstrapForm.PropTypes.colSize
  t.notOk(colSize({md: 1}, 'md', 'Test', 'prop'), 'Min value (Number)')
  t.notOk(colSize({md: 12}, 'md', 'Test', 'prop'), 'Max value (Number)')
  t.notOk(colSize({md: '1'}, 'md', 'Test', 'prop'), 'Min value (String)')
  t.notOk(colSize({md: '12'}, 'md', 'Test', 'prop'), 'Max value (String)')
  t.equal(
    colSize({md: 0}, 'md', 'Test', 'prop').message
  , 'Invalid prop `md` of value `0` supplied to `Test`, Bootstrap column sizes must be between 1 and 12.'
  , 'Under min value (Number)'
  )
  t.equal(
    colSize({md: 13}, 'md', 'Test', 'prop').message
  , 'Invalid prop `md` of value `13` supplied to `Test`, Bootstrap column sizes must be between 1 and 12.'
  , 'Over max value (Number)'
  )
  t.equal(
    colSize({md: '0'}, 'md', 'Test', 'prop').message
  , 'Invalid prop `md` of value `0` supplied to `Test`, Bootstrap column sizes must be between 1 and 12.'
  , 'Under min value (String)'
  )
  t.equal(
    colSize({md: '13'}, 'md', 'Test', 'prop').message
  , 'Invalid prop `md` of value `13` supplied to `Test`, Bootstrap column sizes must be between 1 and 12.'
  , 'Over max value (String)'
  )
  t.equal(
    colSize({md: 'blah'}, 'md', 'Test', 'prop').message
  , 'Invalid prop `md` of value `NaN` supplied to `Test`, expected a String or a Number.'
  , 'Non-numeric String'
  )
  t.equal(
    colSize({md: NaN}, 'md', 'Test', 'prop').message
  , 'Invalid prop `md` of value `NaN` supplied to `Test`, expected a String or a Number.'
  , 'NaN'
  )
})