'use strict';

var React = require('react')

var {
  BooleanField, BoundField, CheckboxChoiceInput, CheckboxFieldRenderer,
  CheckboxSelectMultiple, ChoiceFieldRenderer, FileField, Form,
  MultiValueField, MultiWidget, RadioChoiceInput, RadioFieldRenderer,
  RadioSelect, Widget
} = require('newforms')

var SPINNER = 'data:image/gif;base64,R0lGODlhDgAOANU%2FAJ2rtf39%2FfL09a65wvX2993i5qq2v9Ta35CgrLjCyuTo6%2Bfq7aGvub3Hzs7V2vX3%2BI6eq9rf47rEzOvu8NLZ3ens7u7w8sDJ0ODl6MfP1aazvYqbqNDX3Pr7%2FLW%2Fx4iZpomap%2BPn6vHz9Y2dqqSxu%2FT19%2Bjr7tfd4dvg5KOwuvj5%2BeLm6ae0vd%2Fk5%2Fj5%2BvHz9Nbc4Nbc4Y2dqff4%2Bebp7NXb3%2FDy9Iqbp%2BXp7Pv8%2FL%2FIz%2Fn6%2B7nDy%2FDy84%2Bfq%2F%2F%2F%2FyH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FwtYTVAgRGF0YVhNUDw%2FeHBhY2tldCBiZWdpbj0i77u%2FIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8%2BIDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyNzA4MjZFM0EyRUExMUUzQjE2OUQwNUQ1MzZBQ0M2NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyNzA4MjZFNEEyRUExMUUzQjE2OUQwNUQ1MzZBQ0M2NyI%2BIDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk2NDkzOTlDQTJBOTExRTNCMTY5RDA1RDUzNkFDQzY3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjI3MDgyNkUyQTJFQTExRTNCMTY5RDA1RDUzNkFDQzY3Ii8%2BIDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY%2BIDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8%2BAf%2F%2B%2Ffz7%2Bvn49%2Fb19PPy8fDv7u3s6%2Brp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M%2FOzczLysnIx8bFxMPCwcC%2Fvr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ%2BenZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8%2BPTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEBQMAPwAsAAAAAA4ADgAABhTAn3BILBqPyKRyyWw6n9CodGoMAgAh%2BQQFAwA%2FACwHAAAAAQADAAAGBcCOrRMEACH5BAUDAD8ALAcAAAABAAMAAAYFwNKhFAQAIfkEBQMAPwAsBwAAAAEAAwAABgXABQkXBAAh%2BQQFAwA%2FACwHAAAAAgADAAAGB8DQ7FOLPYIAIfkEBQMAPwAsBwAAAAMAAwAABgrAX%2Bn3%2B0xOmV8QACH5BAUDAD8ALAcAAAAEAAMAAAYLQMxvOCSJfjpNIAgAIfkEBQMAPwAsBwAAAAUABAAABg%2FA0G9I%2FCmGDR%2BoMiRQfkEAIfkEBQMAPwAsBwAAAAYABQAABhNAzG9IHIaGNcnQQXwwPotm7RcEACH5BAUDAD8ALAcAAAAHAAYAAAYVwNVvSCwSTw3ExzgECYkEBMOYMXSCACH5BAUDAD8ALAcAAAAHAAgAAAYcwNBvSCQqij8fiFMkDIXIFPLyERRRn1axl1gEAQAh%2BQQFAwA%2FACwLAAcAAwADAAAGCsDIB3P5CFCeXxAAIfkEBQMAPwAsCgAHAAQABQAABhHAn7Al%2FIkeiNTP8An9MA5hEAAh%2BQQFAwA%2FACwIAAMABgAKAAAGHMCf8LcaGo9II%2BpXOL6MDCGBASrWEKBhjRQaBgEAIfkEBQMAPwAsBgAAAAgADgAABirA3%2BRHLP4YxJCxYGw6i4%2BndEpsPQVGwi%2F1VE5ODd%2BPQxx8Pj9FsRIqNYMAIfkECQMAPwAsAwAAAAkADgAABiLAn%2FA3Gxp%2FjuNw8kMgldAhIUqtWq%2FKC692DLA%2BHyhhdQwCACH5BAkDAD8ALAAAAAAOAA4AAAZGwJ9wKOwQj0QGKYQ8XnwgR5NIYHymxAeCgR1efqLuDyUWkstfYgBJQBAdgPCwCiLWQBAJ7NSAco4VBh%2BDHyQKUw8KISVHQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGUcCfcEgsGn%2BBQehItCBADubwwQCtpMIHgoEVXj6vLupTEH9aP1OE%2BRX8DCORkYBICU0bgHtIqC6FNRsQEicnDT4gHEULGh%2BOHyQKTA8hISVFQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGVsCfcEgsGoe9Y1EBciiHDwYI8xSWEIyqUPexBVQBZeRTWHwoStSn5QIllJeP4GeQvYwEREpY2QBERARSIUMwGyMSMScNPiAcRSYsH5MfJApKDwohJUVBACH5BAkDAD8ALAAAAAAOAA4AAAZRwJ9wSCwaj8ghLTl0gFbMHwGR%2Bs0GCuTlI8B9DkjUp7X4UMJjFyih5f4MspdxWv1VNgARkcAAhYYwGyMSMScNPiAcRSYsH44fJFlHDwohJUVBACH5BAkDAD8ALAAAAAAOAA4AAAZVwJ9wSCwaj8gjIZBk%2FlgaZCb1m30kSN3HhvvUkJFPYfGhIFGflguUQF4%2Bgp9B9jISENRfZQMQEQkMICFDMBsjEjEnDT4gHEUmLB%2BSHyQKSA8KISVFQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGUcCfcEgsGo%2FCCZJo2nCWQsNIBHWBeEvLjvY5IAuf1uJDQaLC1gTy8hH8DLKXkYBICSsbAHVIYIBCQzAbIxIxJw0%2BIE9MLB%2BOHyQKSA8KISVFQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGU8CfcEgsCnNGYw3gSg5NG0DJKWSNetTf7JPI%2FhQfincRdgoUOReom7x8BD%2BD7GV8IBjCSlREJDA%2BIUMwGyMSMScNPiAORSYsH5AfKYFJDwohU0RBACH5BAkDAD8ALAAAAAAOAA4AAAZPwJ9wSCwKFyhjsXYDKIemDUDwFLJG1Orsw6sKcZ%2BD97f4UMYuUGL8M8hexkemI6xIRcQHA7QawjYjEjE1Ej4gDkUmLB%2BMHyQhTw8KGCVFQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGSsCfcEgsChcajJFY20BOS6FpAxBEhYaR6PqbfXjcH%2B5zCC8%2BlLALlAj%2FDLJXuELdDh%2BBImwzksRODQgNRiYsH4cfJCFRDworJUVBACH5BAkDAD8ALAAAAAAOAA4AAAZGwJ9Q2BkajQsN4nisbUaSAFNougEE06FhJMoKZyCeV0j7HMa%2FxYeCdoES6J9B9kJXNoDuGPaUxGA2WSYsH4UZYw8KGARHQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGPMCfUPhQDY%2FDBetzQB5rN4hk4hRWNgBBdWgYibZCFYgHFtKY5d%2B5WRaT091v%2BQqQg6HSV1n5MaV%2FDwFVQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGPMCfUPiwDI%2FDBetjQB5rG4ik5RSaNgBRdWgYabc%2FF4gHFtI%2Bh%2FIP96GoZ5%2BE%2Bsca9dQLrEBdA6HmRnNqQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGN8CfUPgwDY9DE%2BvjQx5jm5Ek4hSaNgBRdWiQvbZCF4gHFtI%2Bh%2FIPh1bPPmS1YURQmxzqvH4%2FDAIAIfkECQMAPwAsAAAAAA4ADgAABjXAn1D4UASGSKGJ9fmokkPYZiSJHaGmDUAERRpkr%2B7QBeKJh4sP5SzEfWrs38yziNvv%2BLw%2BCAAh%2BQQJAwA%2FACwAAAAADgAOAAAGL8CfUPhQBIZIoYn1%2BaiSQ9hmJIkdoaYNQARFGmTcrlAF4omHFhLqzG673%2FC4%2FBwEACH5BAkDAD8ALAAAAAAOAA4AAAYqwJ9Q%2BAgFhkjhQvP5qJLD2gYiOR2hpg1AAEUaRqIu8rESm8%2FotHrNbrODACH5BAkDAD8ALAAAAAAOAA4AAAYowJ9QSFgFhkghTfP5qJLD2g3Cqx2hOQDABk3uSt2weEwum8%2FotBoZBAAh%2BQQJAwA%2FACwAAAAADgAOAAAGI8CfUEgIBYZI4ULz%2BaiSwx1iJDkdoUKTCMvter%2FgsHhMLpeDACH5BAkDAD8ALAAAAAAOAA4AAAYgwJ9QSFgFhkihSvP5qJLJAe9whFqv2Kx2y%2B16v%2BDwMAgAIfkECQMAPwAsAAAAAA4ADgAABh7An1BICAWGyKHl81Eln5nT8UmtWq%2FYrHbL7Xq%2FwyAAIfkECQMAPwAsAAAAAA4ADgAABh3An1D4WAWGSCTno0o6S7Wjc0qtWq%2FYrHbL7XqHQQAh%2BQQFAwA%2FACwAAAAADgAOAAAGGsCfcIgLDI9IgArJ%2FBWb0Kh0Sq1ar9isVhoEACH5BAUDAD8ALAYAAAABAAMAAAYFQAFHEAQAIfkECQMAPwAsBgAAAAEAAwAABgXAnK0TBAAh%2BQQJAwA%2FACwAAAAADgAOAAAGFMCfcEgsGo%2FIpHLJbDqf0Kh0agwCACH5BAUDAD8ALAAAAAAOAA4AAAYUwJ9wSCwaj8ikcslsOp%2FQqHRqDAIAIfkEBQMAPwAsAAAAAAEAAQAABgPAXxAAIfkEBQMAPwAsAAAAAAEAAQAABgPAXxAAIfkEBQMAPwAsAAAAAAEAAQAABgPAXxAAIfkEBQMAPwAsAAAAAAEAAQAABgPAXxAAOw%3D%3D'

var BOOTSTRAP_COLUMN_SIZES = ['xs', 'sm', 'md', 'lg']

// =================================================================== Utils ===

var noobj = {}

var warn = () => {}

if ("production" !== process.env.NODE_ENV) {
  warn = function(message, ...args) {
    var index = 0
    console.warn('[newforms-bootstrap] Warning: ' + message.replace(/%s/g, () => args[index++]))
  }
}

var toString = Object.prototype.toString

function cx(/*[...staticClasses: (string|falsy)[, conditionalClasses: Object.<string, booleanish>]]*/) {
  var classNames = []
  var staticClassCount = arguments.length
  var conditionalClasses = null
  if (toString.call(arguments[arguments.length - 1]) == '[object Object]') {
    conditionalClasses = arguments[arguments.length - 1]
    staticClassCount -= 1
  }
  for (var i = 0, l = staticClassCount; i < l; i++) {
    if (arguments[i]) {
      classNames.push(arguments[i])
    }
  }
  if (conditionalClasses != null) {
    Object.keys(conditionalClasses).forEach(className => {
      if (!!conditionalClasses[className]) {
        classNames.push(className)
      }
    })
  }
  return classNames.join(' ')
}

function extend(dest, src) {
  if (src) {
    var props = Object.keys(src)
    for (var i = 0, l = props.length; i < l ; i++) {
      dest[props[i]] = src[props[i]]
    }
  }
  return dest
}

function errorMessage(message) {
  return <span className="help-block">
    <span className="glyphicon glyphicon-exclamation-sign"></span> {message}
  </span>
}

// ============================================== Bootstrap Newforms Objects ===

function patchForm(form) {
  if (!form.__patchedByBootstrapForm) {
    BootstrapForm.patchFields(form)
    form.__patchedByBootstrapForm = true
  }
}

var BootstrapChoiceFieldRenderer = ChoiceFieldRenderer.extend({
  className: null,

  constructor(name, value, attrs, controlled, choices) {
    if (!(this instanceof BootstrapChoiceFieldRenderer)) {
      return new BootstrapChoiceFieldRenderer(name, value, attrs, controlled, choices)
    }
    ChoiceFieldRenderer.call(this, name, value, attrs, controlled, choices)
  },

  render() {
    var id = this.attrs.id || null
    var key = this.attrs.key || null
    if (key) {
      delete this.attrs.key
    }
    var items = []
    for (var i = 0, l = this.choices.length; i < l; i++) {
      var choice = this.choices[i]
      var [choiceValue, choiceLabel] = choice
      if (Array.isArray(choiceLabel)) {
        var attrsPlus = extend({}, this.attrs)
        if (id) { attrsPlus.id +='_' + i }
        if (key) { attrsPlus.key += '_' + i }
        var subRenderer = BootstrapChoiceFieldRenderer(
          this.name, this.value, attrsPlus, this.controlled, choiceLabel)
        subRenderer.choiceInputConstructor = this.choiceInputConstructor
        subRenderer.className = this.className
        items.push(<li><em className="help-block">{choiceValue}</em>{subRenderer.render()}</li>)
      }
      else {
        var w = this.choiceInputConstructor(
          this.name, this.value, extend({}, this.attrs), this.controlled, choice, i)
        items.push(<li className={this.className}>{w.render()}</li>)
      }
    }
    var listAttrs = {className: 'list-unstyled'}
    if (id) {
      listAttrs.id = id
    }
    return <ul {...listAttrs}>{items}</ul>
  }
})

var BootstrapCheckboxRenderer = BootstrapChoiceFieldRenderer.extend({
  choiceInputConstructor: CheckboxChoiceInput,
  className: 'checkbox'
})

var BootstrapRadioRenderer = BootstrapChoiceFieldRenderer.extend({
  choiceInputConstructor: RadioChoiceInput,
  className: 'radio'
})

var BootstrapCheckboxInlineRenderer = CheckboxFieldRenderer.extend({
  render() {
    return <div className="checkbox">
      {this.choiceInputs().map(input => <label className="checkbox-inline">
        {input.tag()} {input.choiceLabel}
      </label>)}
    </div>
  }
})

var BootstrapRadioInlineRenderer = RadioFieldRenderer.extend({
  render() {
    return <div className="radio">
      {this.choiceInputs().map(input => <label className="radio-inline">
        {input.tag()} {input.choiceLabel}
      </label>)}
    </div>
  }
})

var BootstrapStaticWidget = Widget.extend({
  constructor: function BootstrapStaticWidget(kwargs) {
    if (!(this instanceof BootstrapStaticWidget)) { return new BootstrapStaticWidget(kwargs) }
    this.convertStatic = kwargs && kwargs.convertStatic || ((value) => value);
    Widget.call(this, kwargs)
  },
  render(name, value, kwargs) {
    return (
        <p className="form-control-static">{this.convertStatic(value)}</p>
    )
  }
})

// ========================================================= Form Components ===

var HorizontalPropType = React.PropTypes.shape({
  xs: React.PropTypes.number,
  sm: React.PropTypes.number,
  md: React.PropTypes.number,
  lg: React.PropTypes.number
});

var BootstrapForm = React.createClass({
  statics: {
    patchFields(form) {
      if (form.__patchedByBootstrapForm) { return }
      var fieldNames = Object.keys(form.fields)
      for (var i = 0, l = fieldNames.length; i < l ; i++) {
        var field = form.fields[fieldNames[i]]
        if (field.widget instanceof CheckboxSelectMultiple) {
          if (field.widget.renderer === CheckboxFieldRenderer) {
            field.widget.renderer = BootstrapCheckboxRenderer
          }
        }
        else if (field.widget instanceof RadioSelect) {
          if (field.widget.renderer === RadioFieldRenderer) {
            field.widget.renderer = BootstrapRadioRenderer
          }
        }
        else if (field instanceof MultiValueField) {
          if (field.fields.length < 5 &&
              field.widget.formatOutput === MultiWidget.prototype.formatOutput) {
            var colClass = 'col-sm-' + (12 / field.fields.length)
            field.widget.formatOutput = function(widgets) {
              return <div className="row">
                {widgets.map(widget => <div className={colClass}>{widget}</div>)}
              </div>
            }
          }
        }
      }
    }
  },

  propTypes: {
    form: React.PropTypes.instanceOf(Form).isRequired,
    spinner: React.PropTypes.string,
    static: React.PropTypes.bool,
    horizontal: HorizontalPropType
  },

  getDefaultProps() {
    return {
      spinner: SPINNER
    }
  },

  render() {
    patchForm(this.props.form)
    return <div>
      {this.renderRows()}
    </div>
  },

  renderRows() {
    var rows = []
    var form = this.props.form
    var formErrors = form.nonFieldErrors()
    if (formErrors.isPopulated()) {
      rows.push(<div key={form.addPrefix('__all__')} className="alert alert-danger has-error">
        {formErrors.messages().map(errorMessage)}
      </div>)
    }
    rows.push.apply(rows, form.visibleFields().map(field =>
      <BootstrapField {...this.props} key={field.htmlName} field={field} />
    ))
    var hiddenFields = form.hiddenFields()
    if (hiddenFields.length > 0) {
      rows.push(<div key={form.addPrefix('__hiddenFields__')} style={{display: 'none'}}>
        {hiddenFields.map(field => field.render())}
      </div>)
    }
    if (form.nonFieldPending()) {
      rows.push(<span key={form.addPrefix('__pending__')} className="help-block">
        <img src={this.props.spinner}/> Validating&hellip;
      </span>)
    }
    return rows
  }
})

var BootstrapField = React.createClass({
  propTypes: {
    field: React.PropTypes.instanceOf(BoundField).isRequired,
    spinner: React.PropTypes.string,
    static: React.PropTypes.bool,
    horizontal: HorizontalPropType
  },

  getDefaultProps() {
    return {
      spinner: SPINNER,
      horizontal: {}
    };
  },

  render() {
    var field = this.props.field;
    var status = field.status();

    return (
      <div className={this.getContainerClasses(field, status)}>
        {this.getControlWithLabel(field, status)}
        {this.getHelpText(field, status)}
        {this.getSpinner(status)}
        {this.getError(field, status)}
      </div>
    );
  },

  getContainerClasses(field, status) {
    var isBooleanField = this.isBooleanField(field);
    var isHorizontal = this.isHorizontalForm();
    return cx({
      'checkbox': !isHorizontal && isBooleanField,
      'form-group': isHorizontal || !isBooleanField,
      'has-error': status == 'error',
      'has-success': status == 'valid'
    });
  },

  isBooleanField(field) {
    return field.field.constructor === BooleanField;
  },

  isFileField(field) {
    return field.field instanceof FileField;
  },

  isRadioSelect(field) {
    return field.field.widget instanceof RadioSelect;
  },

  isCheckboxSelectMultipleField(field) {
    return field.field.widget instanceof CheckboxSelectMultiple;
  },

  getControlWithLabel(field) {

    if (this.isBooleanField(field)) {
      var checkbox = (
          <label>
            {field.asWidget()} {field.label}
          </label>
      );

      if (!this.isHorizontalForm()) {
        return checkbox;
      }

      return (
        <div className={this.getHorizontalControlClasses(field)}>
          <div className="checkbox">
            {checkbox}
          </div>
        </div>
      );
    }

    if (this.isFileField(field)) {
      return (
        <div>
          {field.labelTag({attrs: {className: 'control-label ' + this.getHorizontalLabelClasses()}})}
          <div className={this.getHorizontalControlClasses(field)}>
            {field.asWidget(this.getWidgetAttrs(field))}
          </div>
        </div>
      );
    }

    return (
      <div>
        {field.labelTag({attrs: {className: 'control-label ' + this.getHorizontalLabelClasses()}})}
        <div className={this.getHorizontalControlClasses(field)}>
          {field.asWidget(this.getWidgetAttrs(field))}
        </div>
      </div>
    );
  },

  getWidgetAttrs(field) {
    var widgetAttrs = {
      attrs: {
        className: cx({
          'form-control': !this.isFileField(field)
          && !this.isRadioSelect(field)
          && !this.isCheckboxSelectMultipleField(field)
        })
      }
    };

    if (this.props.static) {
      widgetAttrs.widget = field.field.widgetAttrs.staticWidget || BootstrapStaticWidget(field.field.widgetAttrs)
    }

    return widgetAttrs;
  },

  getHelpText(field, status) {

    // Always show help text for empty fields, regardless of status
    var showHelpText = field.helpText && (field.isEmpty() || status == 'default');

    return showHelpText && field.helpTextTag({attrs: {className: 'help-block'}});
  },

  getSpinner(status) {
    if (status == 'pending') {
      return (
        <span className="help-block">
          <img src={this.props.spinner}/> Validating&hellip;
        </span>
      );
    }
  },

  getError(field, status) {
    if (status == 'error') {
      return field.errors().messages().map(errorMessage);
    }
  },

  isHorizontalForm() {
    return this.props.horizontal.length > 0;
  },

  getHorizontalLabelClasses() {
    var classes = [];
    var h = this.props.horizontal;

    for (var size in h) {
      if (h.hasOwnProperty(size)) {
        classes.push(`col-${size}-${12-h[size]}`);
      }
    }

    return classes.join(' ');
  },

  getHorizontalControlClasses(field) {
    var classes = [];
    var isBooleanField = this.isBooleanField(field);
    var h = this.props.horizontal;

    for (var size in h) {
      if (h.hasOwnProperty(size)) {
        classes.push(`col-${size}-${h[size]}`);
        if (isBooleanField) {
          classes.push(`col-${size}-offset-${12-h[size]}`);
        }
      }
    }

    return classes.join(' ');
  }

});

// ========================================================= Grid Components ===

/**
 * Validates that a prop is a String or a Number with a value between 1 and 12.
 */
function colSizeChecker(props, propName, componentName, location) {
  var originalValue = props[propName]
  var value = props[propName]
  var type = Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
  if (value != null) {
    if (type == 'string') {
      value = Number(value)
      type = 'number'
    }

    if (type == 'number' && !isNaN(value)) {
      if (value < 1 || value > 12) {
        return new Error(
          `Invalid ${location} \`${propName}\` of value \`${value}\` ` +
          `supplied to \`${componentName}\`, Bootstrap column sizes must be ` +
          `between 1 and 12.`
        )
      }
    }
    else {
      return new Error(
        `Invalid ${location} \`${propName}\` of value \`${originalValue}\` ` +
        `supplied to \`${componentName}\`, expected a String or a Number.`
      )
    }
  }
}

function calculateColumnProps(childProps, options) {
  // Final column sizing prop object for each child - existing props will be
  // copied to this object and missing props will be calculated.
  var colSizeProps = childProps.map(() => ({}))
  var {colProp, rowNum} = options

  var availableCols = 12
  var needColSizeIndexes = []
  var offsetProp = `${colProp}Offset`

  childProps.forEach((props, index) => {
    if (colProp in props) {
      var colSize = Number(props.md)
      availableCols -= colSize
      colSizeProps[index][colProp] = colSize
    }
    else {
      needColSizeIndexes.push(index)
    }

    if (offsetProp in props) {
      var offsetSize = Number(props[offsetProp])
      availableCols -= offsetSize
      colSizeProps[index][offsetProp] = offsetSize
    }
  })

  if (needColSizeIndexes.length === 0) {
    ("production" !== process.env.NODE_ENV ? warn(
      '[Row %s] All Cols/Fields already have %s column units specified, so ' +
      'you don\'t need to use autoColumns.',
      rowNum, colProp
    ) : null)
  }
  else if (availableCols < 0) {
    ("production" !== process.env.NODE_ENV ? warn(
      '[Row %s] Too many %s column units specified - widths and offsets ' +
      'added up to %s.',
      rowNum, colProp, 12 - availableCols
    ) : null)
  }
  else if (availableCols === 0) {
    ("production" !== process.env.NODE_ENV ? warn(
      '[Row %s] There are no %s column units left to distribute to the %s ' +
      'Cols/Fields which needthem.',
      rowNum, colProp, needColSizeIndexes.length
    ) : null)
  }
  else if (availableCols < needColSizeIndexes.length) {
    ("production" !== process.env.NODE_ENV ? warn(
      '[Row %s] There are more Cols/Fields needing column widths ' +
      '(%s) than there are %s column units remaining to distribute (%s).',
      rowNum, needColSizeIndexes.length, colProp, availableCols
    ) : null)
  }
  else {
    // Distribute remaining columns equally if possible. Otherwise, leftover
    // column width will be distributed among initial columns.
    var baseColSize = Math.floor(availableCols / needColSizeIndexes.length)
    var leftoverCols = availableCols % needColSizeIndexes.length
    needColSizeIndexes.forEach((colIndex, index) => {
      colSizeProps[colIndex][colProp] = baseColSize + (index < leftoverCols ? 1 : 0)
    })
  }

  return colSizeProps
}

var ColMixin = {
  propTypes: {
    className: React.PropTypes.string
  , xs: colSizeChecker
  , sm: colSizeChecker
  , md: colSizeChecker
  , lg: colSizeChecker
  , xsOffset: colSizeChecker
  , smOffset: colSizeChecker
  , mdOffset: colSizeChecker
  , lgOffset: colSizeChecker
  },

  getColClassName() {
    var props = this.props
    var classNames = {}
    classNames[`col-xs-${props.xs}`] = !!props.xs
    classNames[`col-sm-${props.sm}`] = !!props.sm
    classNames[`col-md-${props.md}`] = !!props.md
    classNames[`col-lg-${props.lg}`] = !!props.lg
    classNames[`col-xs-offset-${props.xsOffset}`] = !!props.xsOffset
    classNames[`col-sm-offset-${props.smOffset}`] = !!props.smOffset
    classNames[`col-md-offset-${props.mdOffset}`] = !!props.mdOffset
    classNames[`col-lg-offset-${props.lgOffset}`] = !!props.lgOffset
    return cx(props.className, classNames)
  }
}

var Container = React.createClass({
  propTypes: {
    autoColumns: React.PropTypes.oneOf(BOOTSTRAP_COLUMN_SIZES)
  , className: React.PropTypes.string
  , fluid: React.PropTypes.bool
  , spinner: React.PropTypes.string
  , static: React.PropTypes.bool
  , horizontal: HorizontalPropType
  },

  getDefaultProps() {
    return {
      spinner: SPINNER
    }
  },

  render() {
    var {form} = this.props
    patchForm(form)
    var formErrors = form.nonFieldErrors()
    return <div className={cx(this.props.className, {'container': !this.props.fluid, 'fluid': this.props.fluid})}>
      {formErrors.isPopulated() && <div key={form.addPrefix('__all__')} className="alert alert-danger has-error">
        {formErrors.messages().map(errorMessage)}
      </div>}
      {React.Children.map(this.props.children, (row, index) => React.cloneElement(row, {
      ...this.props
      , index: index
      , className: null // Don't propagate className
      }))}
      {form.nonFieldPending() && <span key={form.addPrefix('__pending__')} className="help-block">
        <img src={this.props.spinner}/> Validating&hellip;
      </span>}
    </div>
  }
})

var Row = React.createClass({
  propTypes: {
    autoColumns: React.PropTypes.oneOf(BOOTSTRAP_COLUMN_SIZES)
  , className: React.PropTypes.string
  , static: React.PropTypes.bool
  , horizontal: HorizontalPropType
  },

  render() {
    var columnProps = noobj
    if (this.props.autoColumns) {
      var childProps = []
      React.Children.forEach(this.props.children, (child) => {
        childProps.push(child.props)
      })
      columnProps = calculateColumnProps(childProps, {
        colProp: this.props.autoColumns
      , rowNum: this.props.index + 1
      })
    }
    return <div className={cx('row', this.props.className)}>
      {React.Children.map(this.props.children, (child, index) => {
        return React.cloneElement(child, extend({
        ...this.props
        ,  className: null // Don't propagate className
        }, columnProps[index]))
      })}
    </div>
  }
})

var Col = React.createClass({
  mixins: [ColMixin],

  render() {
    return <div className={this.getColClassName()}>
      {this.props.children}
    </div>
  }
})

var Field = React.createClass({
  mixins: [ColMixin],

  propTypes: {
    name: React.PropTypes.string.isRequired
  , static: React.PropTypes.bool
  , horizontal: HorizontalPropType
  },

  render() {
    var field = this.props.form.boundField(this.props.name)
    return <div className={this.getColClassName()}>
      <BootstrapField {...this.props} key={field.htmlName} field={field}/>
    </div>
  }
})

extend(BootstrapForm, {
  calculateColumnProps
, CheckboxInlineRenderer: BootstrapCheckboxInlineRenderer
, CheckboxRenderer: BootstrapCheckboxRenderer
, Col
, Container
, Field
, PropTypes: {
    colSize: colSizeChecker
  }
, RadioInlineRenderer: BootstrapRadioInlineRenderer
, RadioRenderer: BootstrapRadioRenderer
, Row
})

module.exports = BootstrapForm
