'use strict';

var React = require('react')

var {
  BooleanField, BoundField, CheckboxChoiceInput, CheckboxFieldRenderer,
  CheckboxSelectMultiple, ChoiceFieldRenderer, FileField, Form,
  RadioChoiceInput, RadioFieldRenderer, RadioSelect
} = require('newforms')

var SPINNER = 'data:image/gif;base64,R0lGODlhDgAOANU%2FAJ2rtf39%2FfL09a65wvX2993i5qq2v9Ta35CgrLjCyuTo6%2Bfq7aGvub3Hzs7V2vX3%2BI6eq9rf47rEzOvu8NLZ3ens7u7w8sDJ0ODl6MfP1aazvYqbqNDX3Pr7%2FLW%2Fx4iZpomap%2BPn6vHz9Y2dqqSxu%2FT19%2Bjr7tfd4dvg5KOwuvj5%2BeLm6ae0vd%2Fk5%2Fj5%2BvHz9Nbc4Nbc4Y2dqff4%2Bebp7NXb3%2FDy9Iqbp%2BXp7Pv8%2FL%2FIz%2Fn6%2B7nDy%2FDy84%2Bfq%2F%2F%2F%2FyH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FwtYTVAgRGF0YVhNUDw%2FeHBhY2tldCBiZWdpbj0i77u%2FIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8%2BIDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyNzA4MjZFM0EyRUExMUUzQjE2OUQwNUQ1MzZBQ0M2NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyNzA4MjZFNEEyRUExMUUzQjE2OUQwNUQ1MzZBQ0M2NyI%2BIDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk2NDkzOTlDQTJBOTExRTNCMTY5RDA1RDUzNkFDQzY3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjI3MDgyNkUyQTJFQTExRTNCMTY5RDA1RDUzNkFDQzY3Ii8%2BIDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY%2BIDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8%2BAf%2F%2B%2Ffz7%2Bvn49%2Fb19PPy8fDv7u3s6%2Brp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M%2FOzczLysnIx8bFxMPCwcC%2Fvr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ%2BenZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8%2BPTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEBQMAPwAsAAAAAA4ADgAABhTAn3BILBqPyKRyyWw6n9CodGoMAgAh%2BQQFAwA%2FACwHAAAAAQADAAAGBcCOrRMEACH5BAUDAD8ALAcAAAABAAMAAAYFwNKhFAQAIfkEBQMAPwAsBwAAAAEAAwAABgXABQkXBAAh%2BQQFAwA%2FACwHAAAAAgADAAAGB8DQ7FOLPYIAIfkEBQMAPwAsBwAAAAMAAwAABgrAX%2Bn3%2B0xOmV8QACH5BAUDAD8ALAcAAAAEAAMAAAYLQMxvOCSJfjpNIAgAIfkEBQMAPwAsBwAAAAUABAAABg%2FA0G9I%2FCmGDR%2BoMiRQfkEAIfkEBQMAPwAsBwAAAAYABQAABhNAzG9IHIaGNcnQQXwwPotm7RcEACH5BAUDAD8ALAcAAAAHAAYAAAYVwNVvSCwSTw3ExzgECYkEBMOYMXSCACH5BAUDAD8ALAcAAAAHAAgAAAYcwNBvSCQqij8fiFMkDIXIFPLyERRRn1axl1gEAQAh%2BQQFAwA%2FACwLAAcAAwADAAAGCsDIB3P5CFCeXxAAIfkEBQMAPwAsCgAHAAQABQAABhHAn7Al%2FIkeiNTP8An9MA5hEAAh%2BQQFAwA%2FACwIAAMABgAKAAAGHMCf8LcaGo9II%2BpXOL6MDCGBASrWEKBhjRQaBgEAIfkEBQMAPwAsBgAAAAgADgAABirA3%2BRHLP4YxJCxYGw6i4%2BndEpsPQVGwi%2F1VE5ODd%2BPQxx8Pj9FsRIqNYMAIfkECQMAPwAsAwAAAAkADgAABiLAn%2FA3Gxp%2FjuNw8kMgldAhIUqtWq%2FKC692DLA%2BHyhhdQwCACH5BAkDAD8ALAAAAAAOAA4AAAZGwJ9wKOwQj0QGKYQ8XnwgR5NIYHymxAeCgR1efqLuDyUWkstfYgBJQBAdgPCwCiLWQBAJ7NSAco4VBh%2BDHyQKUw8KISVHQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGUcCfcEgsGn%2BBQehItCBADubwwQCtpMIHgoEVXj6vLupTEH9aP1OE%2BRX8DCORkYBICU0bgHtIqC6FNRsQEicnDT4gHEULGh%2BOHyQKTA8hISVFQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGVsCfcEgsGoe9Y1EBciiHDwYI8xSWEIyqUPexBVQBZeRTWHwoStSn5QIllJeP4GeQvYwEREpY2QBERARSIUMwGyMSMScNPiAcRSYsH5MfJApKDwohJUVBACH5BAkDAD8ALAAAAAAOAA4AAAZRwJ9wSCwaj8ghLTl0gFbMHwGR%2Bs0GCuTlI8B9DkjUp7X4UMJjFyih5f4MspdxWv1VNgARkcAAhYYwGyMSMScNPiAcRSYsH44fJFlHDwohJUVBACH5BAkDAD8ALAAAAAAOAA4AAAZVwJ9wSCwaj8gjIZBk%2FlgaZCb1m30kSN3HhvvUkJFPYfGhIFGflguUQF4%2Bgp9B9jISENRfZQMQEQkMICFDMBsjEjEnDT4gHEUmLB%2BSHyQKSA8KISVFQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGUcCfcEgsGo%2FCCZJo2nCWQsNIBHWBeEvLjvY5IAuf1uJDQaLC1gTy8hH8DLKXkYBICSsbAHVIYIBCQzAbIxIxJw0%2BIE9MLB%2BOHyQKSA8KISVFQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGU8CfcEgsCnNGYw3gSg5NG0DJKWSNetTf7JPI%2FhQfincRdgoUOReom7x8BD%2BD7GV8IBjCSlREJDA%2BIUMwGyMSMScNPiAORSYsH5AfKYFJDwohU0RBACH5BAkDAD8ALAAAAAAOAA4AAAZPwJ9wSCwKFyhjsXYDKIemDUDwFLJG1Orsw6sKcZ%2BD97f4UMYuUGL8M8hexkemI6xIRcQHA7QawjYjEjE1Ej4gDkUmLB%2BMHyQhTw8KGCVFQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGSsCfcEgsChcajJFY20BOS6FpAxBEhYaR6PqbfXjcH%2B5zCC8%2BlLALlAj%2FDLJXuELdDh%2BBImwzksRODQgNRiYsH4cfJCFRDworJUVBACH5BAkDAD8ALAAAAAAOAA4AAAZGwJ9Q2BkajQsN4nisbUaSAFNougEE06FhJMoKZyCeV0j7HMa%2FxYeCdoES6J9B9kJXNoDuGPaUxGA2WSYsH4UZYw8KGARHQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGPMCfUPhQDY%2FDBetzQB5rN4hk4hRWNgBBdWgYibZCFYgHFtKY5d%2B5WRaT091v%2BQqQg6HSV1n5MaV%2FDwFVQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGPMCfUPiwDI%2FDBetjQB5rG4ik5RSaNgBRdWgYabc%2FF4gHFtI%2Bh%2FIP96GoZ5%2BE%2Bsca9dQLrEBdA6HmRnNqQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGN8CfUPgwDY9DE%2BvjQx5jm5Ek4hSaNgBRdWiQvbZCF4gHFtI%2Bh%2FIPh1bPPmS1YURQmxzqvH4%2FDAIAIfkECQMAPwAsAAAAAA4ADgAABjXAn1D4UASGSKGJ9fmokkPYZiSJHaGmDUAERRpkr%2B7QBeKJh4sP5SzEfWrs38yziNvv%2BLw%2BCAAh%2BQQJAwA%2FACwAAAAADgAOAAAGL8CfUPhQBIZIoYn1%2BaiSQ9hmJIkdoaYNQARFGmTcrlAF4omHFhLqzG673%2FC4%2FBwEACH5BAkDAD8ALAAAAAAOAA4AAAYqwJ9Q%2BAgFhkjhQvP5qJLD2gYiOR2hpg1AAEUaRqIu8rESm8%2FotHrNbrODACH5BAkDAD8ALAAAAAAOAA4AAAYowJ9QSFgFhkghTfP5qJLD2g3Cqx2hOQDABk3uSt2weEwum8%2FotBoZBAAh%2BQQJAwA%2FACwAAAAADgAOAAAGI8CfUEgIBYZI4ULz%2BaiSwx1iJDkdoUKTCMvter%2FgsHhMLpeDACH5BAkDAD8ALAAAAAAOAA4AAAYgwJ9QSFgFhkihSvP5qJLJAe9whFqv2Kx2y%2B16v%2BDwMAgAIfkECQMAPwAsAAAAAA4ADgAABh7An1BICAWGyKHl81Eln5nT8UmtWq%2FYrHbL7Xq%2FwyAAIfkECQMAPwAsAAAAAA4ADgAABh3An1D4WAWGSCTno0o6S7Wjc0qtWq%2FYrHbL7XqHQQAh%2BQQFAwA%2FACwAAAAADgAOAAAGGsCfcIgLDI9IgArJ%2FBWb0Kh0Sq1ar9isVhoEACH5BAUDAD8ALAYAAAABAAMAAAYFQAFHEAQAIfkECQMAPwAsBgAAAAEAAwAABgXAnK0TBAAh%2BQQJAwA%2FACwAAAAADgAOAAAGFMCfcEgsGo%2FIpHLJbDqf0Kh0agwCACH5BAUDAD8ALAAAAAAOAA4AAAYUwJ9wSCwaj8ikcslsOp%2FQqHRqDAIAIfkEBQMAPwAsAAAAAAEAAQAABgPAXxAAIfkEBQMAPwAsAAAAAAEAAQAABgPAXxAAIfkEBQMAPwAsAAAAAAEAAQAABgPAXxAAIfkEBQMAPwAsAAAAAAEAAQAABgPAXxAAOw%3D%3D'

var cx = function(staticClasses, conditionalClasses) {
  var classNames = []
  if (typeof conditionalClasses == 'undefined') {
    conditionalClasses = staticClasses
  }
  else {
    classNames.push(staticClasses)
  }
  Object.keys(conditionalClasses).forEach(className => {
    if (!!conditionalClasses[className]) {
      classNames.push(className)
    }
  })
  return classNames.join(' ')
}

function extend(dest, src) {
  var props = Object.keys(src)
  for (var i = 0, l = props.length; i < l ; i++) {
    dest[props[i]] = src[props[i]]
  }
  return dest
}

function errorMessage(message) {
  return <span className="help-block">
    <span className="glyphicon glyphicon-exclamation-sign"></span> {message}
  </span>
}

var BootstrapField = React.createClass({
  propTypes: {
    field: React.PropTypes.instanceOf(BoundField).isRequired
  , spinner: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      spinner: SPINNER
    }
  },

  render() {
    var field = this.props.field
    var status = field.status()
    var isBooleanField = field.field.constructor === BooleanField

    // Always show help text for empty fields, regardless of status
    var showHelpText = field.helpText && (field.isEmpty() || status == 'default')
    var containerClasses = cx({
      'checkbox': isBooleanField
    , 'form-group': !isBooleanField
    , 'has-error': status == 'error'
    , 'has-success': status == 'valid'
    })

    return <div className={containerClasses}>
      {!isBooleanField && field.labelTag({attrs: {className: 'control-label'}})}
      {!isBooleanField && field.asWidget({attrs: {className: cx({
        'form-control': !(field.field instanceof FileField) &&
                        !(field.field.widget instanceof RadioSelect) &&
                        !(field.field.widget instanceof CheckboxSelectMultiple)
      })}})}
      {isBooleanField && <label htmlFor={field.idForLabel()}>
        {field.asWidget()} {field.label}
      </label>}
      {showHelpText && field.helpTextTag({attrs: {className: 'help-block'}})}
      {status == 'pending' && <span className="help-block">
        <img src={this.props.spinner}/> Validating&hellip;
      </span>}
      {status == 'error' && field.errors().messages().map(errorMessage)}
    </div>
  }
})

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

var BootstrapForm = Form.extend({
  constructor: function BootstrapForm(kwargs) {
    Form.call(this, kwargs)
    // Fields have now been deep-cloned, so we can make any customisations
    // necessary for Bootstrap without affecting other places the same Field
    // instance may be used.
    var fieldNames = Object.keys(this.fields)
    for (var i = 0, l = fieldNames.length; i < l ; i++) {
      var field = this.fields[fieldNames[i]]
      if (field.widget instanceof CheckboxSelectMultiple &&
          field.widget.renderer === CheckboxFieldRenderer) {
        field.widget.renderer = BootstrapCheckboxRenderer
      }
      else if (field.widget instanceof RadioSelect &&
               field.widget.renderer === RadioFieldRenderer) {
        field.widget.renderer = BootstrapRadioRenderer
      }
    }
  },

  render() {
    var rows = []
    var formErrors = this.nonFieldErrors()
    if (formErrors.isPopulated()) {
      rows.push(<div className="alert alert-danger has-error">
        {formErrors.messages().map(errorMessage)}
      </div>)
    }
    rows.push.apply(rows, this.boundFields().map(field => {
      return <BootstrapField key={field.htmlName} field={field}/>
    }))
    return rows
  }
})

extend(BootstrapForm, {
  CheckboxRenderer: BootstrapCheckboxRenderer
, CheckboxInlineRenderer: BootstrapCheckboxInlineRenderer
, RadioRenderer: BootstrapRadioRenderer
, RadioInlineRenderer: BootstrapRadioInlineRenderer
})

module.exports = BootstrapForm