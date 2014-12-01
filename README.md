# newforms-bootstrap

`BootstrapForm` for [newforms](https://guthub.com/insin/newforms), which renders
using Bootstrap 3 classes for form layout.

## Demos

* [The Form of Death](http://insin.github.io/newforms-bootstrap/index.html) - a
  form with a range of validation defined, including async field validation and
  whole-form validation.
* [All Default Fields](http://insin.github.io/newforms-bootstrap/allfields.html) -
  a form usiong all the default newforms Fields and Widgets.

## Install

### Node.js (not available yet!)

newforms-bootstrap can be used on the server, or bundled for the client using an
npm-compatible packaging system such as [Browserify](http://browserify.org/) or
[webpack](http://webpack.github.io/).

```
npm install newforms-bootstrap
```

### Browser bundle (not available yet!)

The browser bundle exposes a global `BootstrapForm` variable and expects to
find global `React` ([React](http://facebook.github.io/react/)) and `forms`
([newforms](https://github.com/insin/newforms)) variables to work with.

You can find it in the [/dist directory](https://github.com/insin/newforms-bootstrap/tree/master/dist).

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

  This defaults to a data URI for a 14x14 circular grey spinner with a
  transparent background:

  ![spinner](https://github.com/insin/newforms-bootstrap/raw/master/spinner.gif "Default async validation spinner")

### `BootstrapForm.render(form)`

Renders any form instance using Bootstrap 3 structures and CSS classes for
layout.

The additional properties documented for `BootstrapForm` can also be added to
your form if you need to configure rendering.

### Bootstrap-compatible choice field renderers

The following custom renderers are available for use. Note that the non-inline
renderers will be automatically applied for you if you're using certain
combinations of default fields and widgets.

* `BootstrapForm.CheckboxRenderer` - renders choices as a list of checkboxes;
   supports choice categories.
* `BootstrapForm.CheckboxInlineRenderer` - renders flat choices as inline
   checkboxes
* `BootstrapForm.RadioRenderer` - renders choices as a list of radio buttons;
   supports choice categories
* `BootstrapForm.RadioInlineRenderer` - renders flat choices as inline radio
   buttons

Use the inline renderers manually if you want to configure fields to render
inline checkbox or radio inputs using  Bootstrap 3's `checkbox-inline` and
`radio-inline` classes, respectively:

```javascript
var StuffForm = BootstrapForm.extend({
  stuff: forms.MultipleChoiceField({
    choices: [1, 2, 3, 4, 5],
    widget: forms.CheckboxSelectMultiple({renderer: BootstrapForm.CheckboxInlineRenderer})
  })
})
```

## Field / Widget Patching

`BootstrapForm` patches the widgets of certain fields for Bootstrap-compatible
output at instance construction time.

`BootstrapForm.render()` will make these changes the first time it renders a
form - patching will only affect the form instance it was given.

### `ChoiceField` with `RadioSelect`

If the widget is using the default renderer, it will be replaced with
`BootstrapForm.RadioRenderer`.

### `MultipleChoiceField` with `CheckboxSelectMultiple`

If the widget is using the default renderer, it will be replaced with
`BootstrapForm.CheckboxRenderer`.

### `MultiValueField`

If the field has fewer than 5 sub-fields and its widget is using the default
implementation of `MultiWidget.prototype.formatOutput()`, the widget will be
given a Bootstrap-specific version of `formatOutput()` which wraps the rendered
widgets as equally-distributed columns in a Bootstrap grid row.

## TODO

* `BootstrapForm.layout` configuration
  * Make use of `has-error`/`has-success` highlighting configurable
  * Horizontal layout with configuratble breakpoints
  * Configurable grid layout similar to
    [Custom Form Layour from newforms-examples](https://github.com/insin/newforms-examples#custom-form-layout-source)

## MIT Licensed
