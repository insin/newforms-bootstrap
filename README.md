# newforms-bootstrap

[![build status](https://secure.travis-ci.org/insin/newforms-bootstrap.png)](http://travis-ci.org/insin/newforms-bootstrap)

Components for rendering a [newforms](https://github.com/insin/newforms)
Form using Bootstrap 3 CSS classes and conventions for layout.

## Demos

* [The Form of Death](http://insin.github.io/newforms-bootstrap/index.html) - a
  form with a range of validation defined, including async field validation and
  whole-form validation, rendered with the `<BootstrapForm>` component.
* [Grid Components](http://insin.github.io/newforms-bootstrap/grid.html) - a
  form layout making use of the the Bootstrap grid, with the provided
  `<Container>`, `<Row>`, `<Col>` and `<Field>` components.
* [All Default Fields](http://insin.github.io/newforms-bootstrap/allfields.html) -
  a form usiong all the default newforms Fields and Widgets, rendered with the
  `<BootstrapForm>` component.

## Install

### Node.js

newforms-bootstrap can be used on the server, or bundled for the client using an
npm-compatible packaging system such as [Browserify](http://browserify.org/) or
[webpack](http://webpack.github.io/).

```
npm install newforms-bootstrap
```

By default, newforms-bootstrap will be in development mode. To use it in
production mode, set the environment variable `NODE_ENV` to `'production'` when
bundling. To completely remove all development mode code, use a minifier that
performs dead-code elimination, such as
[UglifyJS](https://github.com/mishoo/UglifyJS2).

### Browser bundle

The browser bundle exposes a global `BootstrapForm` variable and expects to
find global `React` ([React](http://facebook.github.io/react/)) and `forms`
([newforms](https://github.com/insin/newforms)) variables to work with.

The uncompressed bundle is in development mode, so will log warnings about
potential mistakes.

You can find it in the [/dist directory](https://github.com/insin/newforms-bootstrap/tree/master/dist).

## Usage

### Basic Form

Pass `BootstrapForm` a Form instance as a `form` prop.

Any component which accepts a `form` prop can be used as a custom renderer for
newforms' `RenderForm` component, which can also handle creation of a form
instance for you:

```javascript
var forms = require('newforms')
var BootstrapForm = require('newforms-bootstrap')

var SignupForm = forms.Form.extend({
  username: forms.CharField({maxLength: 20}),
  // ...
})

var Signup = React.createClass({
  _onSubmit() {
    var form = this.refs.signupForm.getForm()
    if (form.validate()) {
      // ...
    }
  },

  render() {
    return <form onSubmit={this._onSubmit}>
      <forms.RenderForm form={SignupForm} ref="signupForm">
        <BootstrapForm/>
      </forms.RenderForm>
      <button>Sign Up</button>
    </form>
  }
})
```

### Grid Form

To render a form as a Bootstrap grid, you can use the provided grid components:

```javascript
var {Col, Container, Row, Field} = BootstrapForm
```
```html
<forms.RenderForm form={ProductForm} ref="productForm">
  <Container>
    <Row>
      <Field name="productName" md="8"/>
      <Field name="tags" md="4"/>
    </Row>
    <Row>
      <Field name="vendor" md="6"/>
      <Field name="productType" md="6"/>
    </Row>
    <Row>
      <Field name="productDescription" md="12"/>
    </Row>
    <Row>
      <Col md="2">
        I'm just a regular column.
      </Col>
      <Field name="sku" md="2"/>
      <Field name="initialStockLevel" md="2"/>
      <Field name="costPrice" md="2"/>
      <Field name="wholesalePrice" md="2"/>
      <Field name="retailPrice" md="2"/>
    </Row>
  </Container>
</forms.RenderForm>
```

To automatically split the 12 available Bootstrap grid units among columns, pass
an `autoColumns` prop to a `Container` or `Row` component. For example, the
following rows would render identically:

```html
<Row>
  <Field name="vendor" md="6"/>
  <Field name="productType" md="6"/>
</Row>

<Row autoColumns="md">
  <Field name="vendor"/>
  <Field name="productType"/>
</Row>
```

This takes into account any column widths and offsets which have been provided
for the specified size unit, so this grid layout would render identically to the
first grid layout example above:

```html
<forms.RenderForm form={ProductForm} ref="productForm">
  <Container autoColumns="md">
    <Row>
      <Field name="productName" md="8"/>
      <Field name="tags"/>
    </Row>
    <Row>
      <Field name="vendor"/>
      <Field name="productType"/>
    </Row>
    <Row>
      <Field name="productDescription"/>
    </Row>
    <Row>
      <Col>
        I'm just a regular column.
      </Col>
      <Field name="sku"/>
      <Field name="initialStockLevel"/>
      <Field name="costPrice"/>
      <Field name="wholesalePrice"/>
      <Field name="retailPrice"/>
    </Row>
  </Container>
</forms.RenderForm>
```

## API

### `BootstrapForm` props

* `form` - a `Form` instance.

* `spinner` - the URL or [data URI](http://en.wikipedia.org/wiki/Data_URI_scheme)
  for an image to be displayed when async validation is pending for a field or
  the whole form.

  This defaults to a data URI for a 14x14 circular grey spinner with a
  transparent background:

  ![spinner](https://github.com/insin/newforms-bootstrap/raw/master/spinner.gif "Default async validation spinner")

* `static` - set to `true` to render fields using a static display control: `<p className="form-control-static">{value}</p>`
  
  This is useful if you want to have readonly forms, and switch to editable given a flag:
  
  ```html
    <BootstrapForm static={!this.props.editable} />
  ```

  Provide a `widgetAttrs.convertStatic` function on a field to convert the value when displaying statically.  The following
  would render a cost value with a dollar sign in front when `static=true`, but would otherwise just render an integer field:
  
  ```javascript
  var ProductForm = forms.Form.extend({
    cost: forms.IntegerField({
      widgetAttrs: {
        convertStatic: (value) => '$' + value
      }
    })
  })
  ```

* `horizontal` - An object for specifying `form-horizontal` classes.  Keys are one of the bootstrap
  sizes (xs, sm, md, lg), and values are the number given to the form control.
  
  So for example:
  
  ```html
    <BootstrapForm horizontal={{sm: 10}}/>
  ```
  
  This would produce fields such as:
  
  ```html
    <div class="form-group">
      <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
      <div class="col-sm-10">
        <input type="password" class="form-control" id="inputPassword3" placeholder="Password">
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <div class="checkbox">
          <label>
            <input type="checkbox"> Remember me
          </label>
        </div>
      </div>
    </div>
  ```

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
var StuffForm = forms.Form.extend({
  stuff: forms.MultipleChoiceField({
    choices: [1, 2, 3, 4, 5],
    widget: forms.CheckboxSelectMultiple({renderer: BootstrapForm.CheckboxInlineRenderer})
  })
})
```

## Grid Components

### `Container`

Renders a `.container` or `.container-fluid`.

#### `Container` props

* `form`: `Form` - the `Form` instance to be rendered. Will be passed as a prop
  to all children.

* `autoColumns`: `String` - a Bootstrap grid size unit (`xs`, `sm`, `md` or `lg`). If
  provided, will be passed to all children.

* `fluid`: `Boolean` (default: `false`) - if `true`, the container will have the
  `.container-fluid` class, otherwise it will be a `.container`

* `className`: `String` - an additional class for the container element.

* `spinner`: `String` - as per `BootstrapForm`, see above.

### `Row`

Renders a `.row`.

These should be nested directly under `Container` components.

#### `Row` props

* `form`: `Form` - the `Form` instance to be rendered. Will be passed as a prop
  to all children.

* `autoColumns`: `String` - a Bootstrap grid size unit (`xs`, `sm`, `md` or `lg`).

  If provided, the Row will ensure that all its children have a column width set
  for the specified size. If any of them do not, the number of available column
  units left (out of the 12 unit available in Bootstrap's grid system) after
  considering any widths and offsets which *have* been provided for the unit
  provided will be distibuted equally among children which need a width set.

  If the remaining units cannot be split equally among the children, the initial
  children in the row will have the leftover units divided amongst them.

* `className`: `String` - an additional class for the container element.

### `Field`

Renders a column containing a named form field.

These should be nested directly under `Row` components.

#### `Field` props

`Field` is a specialisation of `Col`, so it accepts all the sizing/offset props
described below plus the following:

* `form`: `Form` - the `Form` instance to be rendered.

* `name`: `String` - the name of the field to be rendered.

### `Col`

Renders a column, with contents manually provided as its children.

*Note that `Field` components generates their own column container, you do not
need to and should not wrap a `Field` with a `Col`*

#### `Col` props

Column sizing props can be passed as a `String` or `Number`.

At least one of the following sizing props must be give to define the column's
width:

* `xs`
* `sm`
* `md`
* `lg`

Additionally, the column's offset can be specified with the following props:

* `xsOffset`
* `smOffset`
* `mdOffset`
* `lgOffset`

* `className`: `String` - an additional class for the column element.

## Field / Widget Patching

`BootstrapForm` and `Container` will automatically patch the widgets of certain
fields for Bootstrap-compatible output.

These changes will be made the first time they renders a form - patching will
only affect the form instance it was given.

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

* `BootstrapForm` configuration
  * Make use of `has-error`/`has-success` highlighting configurable
  * Horizontal layout with configuratble breakpoints

## MIT Licensed
