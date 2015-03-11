/*!
 * newforms-bootstrap 2.0.0 - https://github.com/insin/newforms-bootstrap
 * MIT Licensed
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.BootstrapForm = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null)

var $__0=
     
     
      
  (typeof window !== "undefined" ? window.forms : typeof global !== "undefined" ? global.forms : null),BooleanField=$__0.BooleanField,BoundField=$__0.BoundField,CheckboxChoiceInput=$__0.CheckboxChoiceInput,CheckboxFieldRenderer=$__0.CheckboxFieldRenderer,CheckboxSelectMultiple=$__0.CheckboxSelectMultiple,ChoiceFieldRenderer=$__0.ChoiceFieldRenderer,FileField=$__0.FileField,Form=$__0.Form,MultiValueField=$__0.MultiValueField,MultiWidget=$__0.MultiWidget,RadioChoiceInput=$__0.RadioChoiceInput,RadioFieldRenderer=$__0.RadioFieldRenderer,RadioSelect=$__0.RadioSelect

var SPINNER = 'data:image/gif;base64,R0lGODlhDgAOANU%2FAJ2rtf39%2FfL09a65wvX2993i5qq2v9Ta35CgrLjCyuTo6%2Bfq7aGvub3Hzs7V2vX3%2BI6eq9rf47rEzOvu8NLZ3ens7u7w8sDJ0ODl6MfP1aazvYqbqNDX3Pr7%2FLW%2Fx4iZpomap%2BPn6vHz9Y2dqqSxu%2FT19%2Bjr7tfd4dvg5KOwuvj5%2BeLm6ae0vd%2Fk5%2Fj5%2BvHz9Nbc4Nbc4Y2dqff4%2Bebp7NXb3%2FDy9Iqbp%2BXp7Pv8%2FL%2FIz%2Fn6%2B7nDy%2FDy84%2Bfq%2F%2F%2F%2FyH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FwtYTVAgRGF0YVhNUDw%2FeHBhY2tldCBiZWdpbj0i77u%2FIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8%2BIDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyNzA4MjZFM0EyRUExMUUzQjE2OUQwNUQ1MzZBQ0M2NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyNzA4MjZFNEEyRUExMUUzQjE2OUQwNUQ1MzZBQ0M2NyI%2BIDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk2NDkzOTlDQTJBOTExRTNCMTY5RDA1RDUzNkFDQzY3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjI3MDgyNkUyQTJFQTExRTNCMTY5RDA1RDUzNkFDQzY3Ii8%2BIDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY%2BIDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8%2BAf%2F%2B%2Ffz7%2Bvn49%2Fb19PPy8fDv7u3s6%2Brp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M%2FOzczLysnIx8bFxMPCwcC%2Fvr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ%2BenZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8%2BPTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEBQMAPwAsAAAAAA4ADgAABhTAn3BILBqPyKRyyWw6n9CodGoMAgAh%2BQQFAwA%2FACwHAAAAAQADAAAGBcCOrRMEACH5BAUDAD8ALAcAAAABAAMAAAYFwNKhFAQAIfkEBQMAPwAsBwAAAAEAAwAABgXABQkXBAAh%2BQQFAwA%2FACwHAAAAAgADAAAGB8DQ7FOLPYIAIfkEBQMAPwAsBwAAAAMAAwAABgrAX%2Bn3%2B0xOmV8QACH5BAUDAD8ALAcAAAAEAAMAAAYLQMxvOCSJfjpNIAgAIfkEBQMAPwAsBwAAAAUABAAABg%2FA0G9I%2FCmGDR%2BoMiRQfkEAIfkEBQMAPwAsBwAAAAYABQAABhNAzG9IHIaGNcnQQXwwPotm7RcEACH5BAUDAD8ALAcAAAAHAAYAAAYVwNVvSCwSTw3ExzgECYkEBMOYMXSCACH5BAUDAD8ALAcAAAAHAAgAAAYcwNBvSCQqij8fiFMkDIXIFPLyERRRn1axl1gEAQAh%2BQQFAwA%2FACwLAAcAAwADAAAGCsDIB3P5CFCeXxAAIfkEBQMAPwAsCgAHAAQABQAABhHAn7Al%2FIkeiNTP8An9MA5hEAAh%2BQQFAwA%2FACwIAAMABgAKAAAGHMCf8LcaGo9II%2BpXOL6MDCGBASrWEKBhjRQaBgEAIfkEBQMAPwAsBgAAAAgADgAABirA3%2BRHLP4YxJCxYGw6i4%2BndEpsPQVGwi%2F1VE5ODd%2BPQxx8Pj9FsRIqNYMAIfkECQMAPwAsAwAAAAkADgAABiLAn%2FA3Gxp%2FjuNw8kMgldAhIUqtWq%2FKC692DLA%2BHyhhdQwCACH5BAkDAD8ALAAAAAAOAA4AAAZGwJ9wKOwQj0QGKYQ8XnwgR5NIYHymxAeCgR1efqLuDyUWkstfYgBJQBAdgPCwCiLWQBAJ7NSAco4VBh%2BDHyQKUw8KISVHQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGUcCfcEgsGn%2BBQehItCBADubwwQCtpMIHgoEVXj6vLupTEH9aP1OE%2BRX8DCORkYBICU0bgHtIqC6FNRsQEicnDT4gHEULGh%2BOHyQKTA8hISVFQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGVsCfcEgsGoe9Y1EBciiHDwYI8xSWEIyqUPexBVQBZeRTWHwoStSn5QIllJeP4GeQvYwEREpY2QBERARSIUMwGyMSMScNPiAcRSYsH5MfJApKDwohJUVBACH5BAkDAD8ALAAAAAAOAA4AAAZRwJ9wSCwaj8ghLTl0gFbMHwGR%2Bs0GCuTlI8B9DkjUp7X4UMJjFyih5f4MspdxWv1VNgARkcAAhYYwGyMSMScNPiAcRSYsH44fJFlHDwohJUVBACH5BAkDAD8ALAAAAAAOAA4AAAZVwJ9wSCwaj8gjIZBk%2FlgaZCb1m30kSN3HhvvUkJFPYfGhIFGflguUQF4%2Bgp9B9jISENRfZQMQEQkMICFDMBsjEjEnDT4gHEUmLB%2BSHyQKSA8KISVFQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGUcCfcEgsGo%2FCCZJo2nCWQsNIBHWBeEvLjvY5IAuf1uJDQaLC1gTy8hH8DLKXkYBICSsbAHVIYIBCQzAbIxIxJw0%2BIE9MLB%2BOHyQKSA8KISVFQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGU8CfcEgsCnNGYw3gSg5NG0DJKWSNetTf7JPI%2FhQfincRdgoUOReom7x8BD%2BD7GV8IBjCSlREJDA%2BIUMwGyMSMScNPiAORSYsH5AfKYFJDwohU0RBACH5BAkDAD8ALAAAAAAOAA4AAAZPwJ9wSCwKFyhjsXYDKIemDUDwFLJG1Orsw6sKcZ%2BD97f4UMYuUGL8M8hexkemI6xIRcQHA7QawjYjEjE1Ej4gDkUmLB%2BMHyQhTw8KGCVFQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGSsCfcEgsChcajJFY20BOS6FpAxBEhYaR6PqbfXjcH%2B5zCC8%2BlLALlAj%2FDLJXuELdDh%2BBImwzksRODQgNRiYsH4cfJCFRDworJUVBACH5BAkDAD8ALAAAAAAOAA4AAAZGwJ9Q2BkajQsN4nisbUaSAFNougEE06FhJMoKZyCeV0j7HMa%2FxYeCdoES6J9B9kJXNoDuGPaUxGA2WSYsH4UZYw8KGARHQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGPMCfUPhQDY%2FDBetzQB5rN4hk4hRWNgBBdWgYibZCFYgHFtKY5d%2B5WRaT091v%2BQqQg6HSV1n5MaV%2FDwFVQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGPMCfUPiwDI%2FDBetjQB5rG4ik5RSaNgBRdWgYabc%2FF4gHFtI%2Bh%2FIP96GoZ5%2BE%2Bsca9dQLrEBdA6HmRnNqQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGN8CfUPgwDY9DE%2BvjQx5jm5Ek4hSaNgBRdWiQvbZCF4gHFtI%2Bh%2FIPh1bPPmS1YURQmxzqvH4%2FDAIAIfkECQMAPwAsAAAAAA4ADgAABjXAn1D4UASGSKGJ9fmokkPYZiSJHaGmDUAERRpkr%2B7QBeKJh4sP5SzEfWrs38yziNvv%2BLw%2BCAAh%2BQQJAwA%2FACwAAAAADgAOAAAGL8CfUPhQBIZIoYn1%2BaiSQ9hmJIkdoaYNQARFGmTcrlAF4omHFhLqzG673%2FC4%2FBwEACH5BAkDAD8ALAAAAAAOAA4AAAYqwJ9Q%2BAgFhkjhQvP5qJLD2gYiOR2hpg1AAEUaRqIu8rESm8%2FotHrNbrODACH5BAkDAD8ALAAAAAAOAA4AAAYowJ9QSFgFhkghTfP5qJLD2g3Cqx2hOQDABk3uSt2weEwum8%2FotBoZBAAh%2BQQJAwA%2FACwAAAAADgAOAAAGI8CfUEgIBYZI4ULz%2BaiSwx1iJDkdoUKTCMvter%2FgsHhMLpeDACH5BAkDAD8ALAAAAAAOAA4AAAYgwJ9QSFgFhkihSvP5qJLJAe9whFqv2Kx2y%2B16v%2BDwMAgAIfkECQMAPwAsAAAAAA4ADgAABh7An1BICAWGyKHl81Eln5nT8UmtWq%2FYrHbL7Xq%2FwyAAIfkECQMAPwAsAAAAAA4ADgAABh3An1D4WAWGSCTno0o6S7Wjc0qtWq%2FYrHbL7XqHQQAh%2BQQFAwA%2FACwAAAAADgAOAAAGGsCfcIgLDI9IgArJ%2FBWb0Kh0Sq1ar9isVhoEACH5BAUDAD8ALAYAAAABAAMAAAYFQAFHEAQAIfkECQMAPwAsBgAAAAEAAwAABgXAnK0TBAAh%2BQQJAwA%2FACwAAAAADgAOAAAGFMCfcEgsGo%2FIpHLJbDqf0Kh0agwCACH5BAUDAD8ALAAAAAAOAA4AAAYUwJ9wSCwaj8ikcslsOp%2FQqHRqDAIAIfkEBQMAPwAsAAAAAAEAAQAABgPAXxAAIfkEBQMAPwAsAAAAAAEAAQAABgPAXxAAIfkEBQMAPwAsAAAAAAEAAQAABgPAXxAAIfkEBQMAPwAsAAAAAAEAAQAABgPAXxAAOw%3D%3D'

var BOOTSTRAP_COLUMN_SIZES = ['xs', 'sm', 'md', 'lg']

// =================================================================== Utils ===

var noobj = {}

var warn = function()  {}

if ("production" !== "development") {
  warn = function(message ) {for (var args=[],$__0=1,$__1=arguments.length;$__0<$__1;$__0++) args.push(arguments[$__0]);
    var index = 0
    console.warn('[newforms-bootstrap] Warning: ' + message.replace(/%s/g, function()  {return args[index++];}))
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
    Object.keys(conditionalClasses).forEach(function(className)  {
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
  return React.createElement("span", {className: "help-block"}, 
    React.createElement("span", {className: "glyphicon glyphicon-exclamation-sign"}), " ", message
  )
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

  constructor:function(name, value, attrs, controlled, choices) {
    if (!(this instanceof BootstrapChoiceFieldRenderer)) {
      return new BootstrapChoiceFieldRenderer(name, value, attrs, controlled, choices)
    }
    ChoiceFieldRenderer.call(this, name, value, attrs, controlled, choices)
  },

  render:function() {
    var id = this.attrs.id || null
    var key = this.attrs.key || null
    if (key) {
      delete this.attrs.key
    }
    var items = []
    for (var i = 0, l = this.choices.length; i < l; i++) {
      var choice = this.choices[i]
      var $__0=   choice,choiceValue=$__0[0],choiceLabel=$__0[1]
      if (Array.isArray(choiceLabel)) {
        var attrsPlus = extend({}, this.attrs)
        if (id) { attrsPlus.id +='_' + i }
        if (key) { attrsPlus.key += '_' + i }
        var subRenderer = BootstrapChoiceFieldRenderer(
          this.name, this.value, attrsPlus, this.controlled, choiceLabel)
        subRenderer.choiceInputConstructor = this.choiceInputConstructor
        subRenderer.className = this.className
        items.push(React.createElement("li", null, React.createElement("em", {className: "help-block"}, choiceValue), subRenderer.render()))
      }
      else {
        var w = this.choiceInputConstructor(
          this.name, this.value, extend({}, this.attrs), this.controlled, choice, i)
        items.push(React.createElement("li", {className: this.className}, w.render()))
      }
    }
    var listAttrs = {className: 'list-unstyled'}
    if (id) {
      listAttrs.id = id
    }
    return React.createElement("ul", React.__spread({},  listAttrs), items)
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
  render:function() {
    return React.createElement("div", {className: "checkbox"}, 
      this.choiceInputs().map(function(input)  {return React.createElement("label", {className: "checkbox-inline"}, 
        input.tag(), " ", input.choiceLabel
      );})
    )
  }
})

var BootstrapRadioInlineRenderer = RadioFieldRenderer.extend({
  render:function() {
    return React.createElement("div", {className: "radio"}, 
      this.choiceInputs().map(function(input)  {return React.createElement("label", {className: "radio-inline"}, 
        input.tag(), " ", input.choiceLabel
      );})
    )
  }
})

// ========================================================= Form Components ===

var BootstrapForm = React.createClass({displayName: "BootstrapForm",
  statics: {
    patchFields:function(form) {
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
              return React.createElement("div", {className: "row"}, 
                widgets.map(function(widget)  {return React.createElement("div", {className: colClass}, widget);})
              )
            }
          }
        }
      }
    }
  },

  propTypes: {
    form: React.PropTypes.instanceOf(Form).isRequired,
    spinner: React.PropTypes.string
  },

  getDefaultProps:function() {
    return {
      spinner: SPINNER
    }
  },

  render:function() {
    patchForm(this.props.form)
    return React.createElement("div", null, 
      this.renderRows()
    )
  },

  renderRows:function() {
    var rows = []
    var form = this.props.form
    var formErrors = form.nonFieldErrors()
    if (formErrors.isPopulated()) {
      rows.push(React.createElement("div", {key: form.addPrefix('__all__'), className: "alert alert-danger has-error"}, 
        formErrors.messages().map(errorMessage)
      ))
    }
    rows.push.apply(rows, form.visibleFields().map(function(field) 
      {return React.createElement(BootstrapField, {key: field.htmlName, field: field, spinner: this.props.spinner});}.bind(this)
    ))
    var hiddenFields = form.hiddenFields()
    if (hiddenFields.length > 0) {
      rows.push(React.createElement("div", {key: form.addPrefix('__hiddenFields__'), style: {display: 'none'}}, 
        hiddenFields.map(function(field)  {return field.render();})
      ))
    }
    if (form.nonFieldPending()) {
      rows.push(React.createElement("span", {key: form.addPrefix('__pending__'), className: "help-block"}, 
        React.createElement("img", {src: this.props.spinner}), " Validating…"
      ))
    }
    return rows
  }
})

var BootstrapField = React.createClass({displayName: "BootstrapField",
  propTypes: {
    field: React.PropTypes.instanceOf(BoundField).isRequired
  , spinner: React.PropTypes.string
  },

  getDefaultProps:function() {
    return {
      spinner: SPINNER
    }
  },

  render:function() {
    var field = this.props.field
    var status = field.status()
    var isBooleanField = field.field.constructor === BooleanField
    var isFileField = field.field instanceof FileField
    var isSpecialCaseWidget = isBooleanField || isFileField
    var containerClasses = cx({
      'checkbox': isBooleanField
    , 'form-group': !isBooleanField
    , 'has-error': status == 'error'
    , 'has-success': status == 'valid'
    })
    var widgetAttrs = {attrs: {className: cx({
      'form-control': !isFileField  &&
                      !(field.field.widget instanceof RadioSelect) &&
                      !(field.field.widget instanceof CheckboxSelectMultiple)
    })}}
    // Always show help text for empty fields, regardless of status
    var showHelpText = field.helpText && (field.isEmpty() || status == 'default')

    return React.createElement("div", {className: containerClasses}, 
      !isBooleanField && field.labelTag({attrs: {className: 'control-label'}}), 
      !isSpecialCaseWidget && field.asWidget(widgetAttrs), 
      isBooleanField && React.createElement("label", {htmlFor: field.idForLabel()}, 
        field.asWidget(), " ", field.label
      ), 
      isFileField && React.createElement("div", null, 
        field.asWidget(widgetAttrs)
      ), 
      showHelpText && field.helpTextTag({attrs: {className: 'help-block'}}), 
      status == 'pending' && React.createElement("span", {className: "help-block"}, 
        React.createElement("img", {src: this.props.spinner}), " Validating…"
      ), 
      status == 'error' && field.errors().messages().map(errorMessage)
    )
  }
})

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
          ("Invalid " + location + " `" + propName + "` of value `" + value + "` ") +
          ("supplied to `" + componentName + "`, Bootstrap column sizes must be ") +
          ("between 1 and 12.")
        )
      }
    }
    else {
      return new Error(
        ("Invalid " + location + " `" + propName + "` of value `" + originalValue + "` ") +
        ("supplied to `" + componentName + "`, expected a String or a Number.")
      )
    }
  }
}

function calculateColumnProps(childProps, options) {
  // Final column sizing prop object for each child - existing props will be
  // copied to this object and missing props will be calculated.
  var colSizeProps = childProps.map(function()  {return {};})
  var $__0=   options,colProp=$__0.colProp,rowNum=$__0.rowNum

  var availableCols = 12
  var needColSizeIndexes = []
  var offsetProp = (colProp + "Offset")

  childProps.forEach(function(props, index)  {
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
    ("production" !== "development" ? warn(
      '[Row %s] All Cols/Fields already have %s column units specified, so ' +
      'you don\'t need to use autoColumns.',
      rowNum, colProp
    ) : null)
  }
  else if (availableCols < 0) {
    ("production" !== "development" ? warn(
      '[Row %s] Too many %s column units specified - widths and offsets ' +
      'added up to %s.',
      rowNum, colProp, 12 - availableCols
    ) : null)
  }
  else if (availableCols === 0) {
    ("production" !== "development" ? warn(
      '[Row %s] There are no %s column units left to distribute to the %s ' +
      'Cols/Fields which needthem.',
      rowNum, colProp, needColSizeIndexes.length
    ) : null)
  }
  else if (availableCols < needColSizeIndexes.length) {
    ("production" !== "development" ? warn(
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
    needColSizeIndexes.forEach(function(colIndex, index)  {
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

  getColClassName:function() {
    var props = this.props
    var classNames = {}
    classNames[("col-xs-" + props.xs)] = !!props.xs
    classNames[("col-sm-" + props.sm)] = !!props.sm
    classNames[("col-md-" + props.md)] = !!props.md
    classNames[("col-lg-" + props.lg)] = !!props.lg
    classNames[("col-xs-offset-" + props.xsOffset)] = !!props.xsOffset
    classNames[("col-sm-offset-" + props.smOffset)] = !!props.smOffset
    classNames[("col-md-offset-" + props.mdOffset)] = !!props.mdOffset
    classNames[("col-lg-offset-" + props.lgOffset)] = !!props.lgOffset
    return cx(props.className, classNames)
  }
}

var Container = React.createClass({displayName: "Container",
  propTypes: {
    autoColumns: React.PropTypes.oneOf(BOOTSTRAP_COLUMN_SIZES)
  , className: React.PropTypes.string
  , fluid: React.PropTypes.bool
  , spinner: React.PropTypes.string
  },

  getDefaultProps:function() {
    return {
      autoColumns: null
    , fluid: false
    , spinner: SPINNER
    }
  },

  render:function() {
    var $__0=  this.props,form=$__0.form
    patchForm(form)
    var formErrors = form.nonFieldErrors()
    return React.createElement("div", {className: cx(this.props.className, {'container': !this.props.fluid, 'fluid': this.props.fluid})}, 
      formErrors.isPopulated() && React.createElement("div", {key: form.addPrefix('__all__'), className: "alert alert-danger has-error"}, 
        formErrors.messages().map(errorMessage)
      ), 
      React.Children.map(this.props.children, function(row, index)  {return React.cloneElement(row, {
        autoColumns: this.props.autoColumns
      , form: this.props.form
      , index: index
      , spinner: this.props.spinner
      });}.bind(this)), 
      form.nonFieldPending() && React.createElement("span", {key: form.addPrefix('__pending__'), className: "help-block"}, 
        React.createElement("img", {src: this.props.spinner}), " Validating…"
      )
    )
  }
})

var Row = React.createClass({displayName: "Row",
  propTypes: {
    autoColumns: React.PropTypes.oneOf(BOOTSTRAP_COLUMN_SIZES)
  , className: React.PropTypes.string
  },

  render:function() {
    var columnProps = noobj
    if (this.props.autoColumns) {
      var childProps = []
      React.Children.forEach(this.props.children, function(child)  {
        childProps.push(child.props)
      })
      columnProps = calculateColumnProps(childProps, {
        colProp: this.props.autoColumns
      , rowNum: this.props.index + 1
      })
    }
    return React.createElement("div", {className: cx('row', this.props.className)}, 
      React.Children.map(this.props.children, function(child, index)  {
        return React.cloneElement(child, extend({
          form: this.props.form
        , spinner: this.props.spinner
        }, columnProps[index]))
      }.bind(this))
    )
  }
})

var Col = React.createClass({displayName: "Col",
  mixins: [ColMixin],

  render:function() {
    return React.createElement("div", {className: this.getColClassName()}, 
      this.props.children
    )
  }
})

var Field = React.createClass({displayName: "Field",
  mixins: [ColMixin],

  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  render:function() {
    var field = this.props.form.boundField(this.props.name)
    return React.createElement("div", {className: this.getColClassName()}, 
      React.createElement(BootstrapField, {key: field.htmlName, field: field})
    )
  }
})

extend(BootstrapForm, {
  calculateColumnProps:calculateColumnProps
, CheckboxInlineRenderer: BootstrapCheckboxInlineRenderer
, CheckboxRenderer: BootstrapCheckboxRenderer
, Col:Col
, Container:Container
, Field:Field
, PropTypes: {
    colSize: colSizeChecker
  }
, RadioInlineRenderer: BootstrapRadioInlineRenderer
, RadioRenderer: BootstrapRadioRenderer
, Row:Row
})

module.exports = BootstrapForm
},{}]},{},[1])(1)
});