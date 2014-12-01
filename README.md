# newforms-bootstrap

Provides `BootstrapForm`, which uses Bootstrap 3 classes for form layout.

## Install

(coming soon)

## Usage

Either extend `BootstrapForm` instead of the default newforms `Form` and use the
form as usual...

```javascript
var forms = require('newforms')
var BootstrapForm = require('newforms-bootstrap')

var SignupForm = BootstrapForm.extend({
  username: forms.CharField({maxLength: 20}),
  // ...
})
```

...or just call BootstrapForm.render() on any Form instance:

```javascript
var SignupForm = forms.Form.extend({
  username: forms.CharField({maxLength: 20}),
  // ...
})

var Signup = React.createClass({
  getInitialState() {
    return {
      form: new SignupForm()
    }
  },

  // ...

  render() {
    return <form onSubmit={this._onSubmit}>
      {BootstrapForm.render(this.state.form)}
      <button>Sign Up</button>
    </form>
  }
})
```

## API

### `BootstrapForm.extend(...)`

Creates a new `Form` constructor whose prototype has a default `render()` method
which uses Bootstrap 3 structures and CSS classes for layout. This is otherwise
ths same as newforms' `Form.extend()`, but `BootstrapForm` supports the following
additional properties:

* `spinner` - the URL or [data URI](http://en.wikipedia.org/wiki/Data_URI_scheme)
  for an image to be displayed when async validation is pending for a field or
  the whole form.

  This defaults to a data URI displaying a 14x14 circular grey
  spinner on a transparent background.

### `BootstrapForm.render(form)`

Renders any form instance using Bootstrap 3 structures and CSS classes for
layout.

The additional properties documented for `BootstrapForm` can also be added to
your form if you need to configure rendering.

The field changes described below are applied to the form's fields the first
time it is rendered this way.

### Choice field renderers

If your form has a `ChoiceField` or `MultipleChoiceField` which uses the default
`RadioSelect` or `CheckboxSelectMultiple` widget, `BootstrapForm` will
automatically replace its choice renderer with a Bootstrap-compatible renderer.

THe following renderers are also available if you want to configure these fields
to render checkbox or radio inputs which use Bootstrap 3's `checkbox-inline` and
`radio-inline` classes, respectively:

* `BootstrapForm.CheckboxInlineRenderer`
* `BootstrapForm.RadioInlineRenderer`

## MIT Licensed
