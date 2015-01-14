process.env.NODE_ENV = 'production'

var forms = require('newforms')
var React = require('react')
var test = require('tape')

var BootstrapForm = require('../lib')

test('BootstrapForm', function(t) {
  t.plan(1)

  var TestForm = forms.Form.extend({
    username: forms.CharField(),
    email: forms.EmailField(),
    password: forms.CharField({widget: forms.PasswordInput}),
    confirm: forms.CharField({widget: forms.PasswordInput}),

    clean: function() {
      var password = this.cleanedData.password
      var confirm = this.cleanedData.confirm
      if (password && confirm && password != 'confirm') {
        throw forms.ValidationError('Passwords do not match.')
      }
    }
  })

  var form = new TestForm({data: {
    username: 'valid'
  , email: 'invalid'
  , password: 'hunter1'
  , confirm: 'hunter2'
  }})

  t.equal(
    React.renderToStaticMarkup(React.createElement(BootstrapForm, {form: form}))
  , '<div>' +
      '<div class="alert alert-danger has-error">' +
        '<span class="help-block"><span class="glyphicon glyphicon-exclamation-sign"></span> Passwords do not match.</span>' +
      '</div>' +
      '<div class="form-group has-success">' +
        '<label class="control-label" for="id_username">Username:</label>' +
        '<input type="text" name="username" class="form-control" id="id_username" value="valid">' +
      '</div>' +
      '<div class="form-group has-error">' +
        '<label class="control-label" for="id_email">Email:</label>' +
        '<input type="email" name="email" class="form-control" id="id_email" value="invalid">' +
        '<span class="help-block"><span class="glyphicon glyphicon-exclamation-sign"></span> Enter a valid email address.</span>' +
      '</div>' +
      '<div class="form-group has-success">' +
        '<label class="control-label" for="id_password">Password:</label>' +
        '<input type="password" name="password" class="form-control" id="id_password">' +
      '</div>' +
      '<div class="form-group has-success">' +
        '<label class="control-label" for="id_confirm">Confirm:</label>' +
        '<input type="password" name="confirm" class="form-control" id="id_confirm">' +
      '</div>' +
    '</div>'
  , 'Basic rendering'
  )
})

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
  , 'Invalid prop `md` of value `blah` supplied to `Test`, expected a String or a Number.'
  , 'Non-numeric String'
  )
  t.equal(
    colSize({md: NaN}, 'md', 'Test', 'prop').message
  , 'Invalid prop `md` of value `NaN` supplied to `Test`, expected a String or a Number.'
  , 'NaN'
  )
})