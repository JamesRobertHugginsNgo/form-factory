"use strict";

/* global HtmlFactory */
var FormFactory = function () {
  var _HtmlFactory = HtmlFactory,
      renderElement = _HtmlFactory.renderElement;
  var idCounter = 0;

  function getNextId() {
    return "form-factory-".concat(idCounter++);
  }

  function getFieldConfiguration(definition, inputConfiguration) {
    var id = definition.id,
        preHelpText = definition.preHelpText,
        postHelpText = definition.postHelpText,
        required = definition.required,
        title = definition.title;
    return [{
      name: 'label',
      attributes: {
        "class": 'form-label',
        "for": id,
        id: "".concat(id, "-title")
      },
      children: [title, required ? null : [' ', {
        name: 'span',
        attributes: {
          "class": 'form-text'
        },
        children: ['(Optional)']
      }]]
    }, !preHelpText ? null : {
      name: 'div',
      attributes: {
        "class": 'form-text mb-1 mt-0',
        id: "".concat(id, "-prehelptext")
      },
      children: [preHelpText]
    }, inputConfiguration, !postHelpText ? null : {
      name: 'div',
      attributes: {
        "class": 'form-text',
        id: "".concat(id, "-posthelptext")
      },
      children: [postHelpText]
    }];
  }

  var Factories = {
    form: {
      render: function render(definition) {
        var renderEl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : renderElement;

        var _Object$assign = Object.assign(definition, {
          id: definition.id || getNextId()
        }),
            className = _Object$assign.className,
            id = _Object$assign.id,
            _Object$assign$sectio = _Object$assign.sections,
            sections = _Object$assign$sectio === void 0 ? [] : _Object$assign$sectio,
            title = _Object$assign.title;

        return renderEl({
          name: 'form',
          attributes: {
            "class": className,
            id: id
          },
          children: [!title ? null : {
            name: 'h1',
            attributes: {
              id: "".concat(id, "-title")
            },
            children: [title]
          }, sections.map(function (section) {
            var _section$type = section.type,
                type = _section$type === void 0 ? 'section' : _section$type;
            return Factories[type].render(section, renderEl);
          }), {
            name: 'div',
            children: [{
              name: 'button',
              attributes: {
                "class": 'btn btn-primary',
                type: 'button'
              },
              children: ['Submit']
            }]
          }],
          functionCallers: [{
            name: 'Factories.form.initialize',
            args: [definition]
          }]
        });
      },
      initialize: function initialize(definition) {
        console.log('FORM', definition);
      }
    },
    section: {
      render: function render(definition) {
        var renderEl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : renderElement;

        var _Object$assign2 = Object.assign(definition, {
          id: definition.id || getNextId(),
          fields: definition.fields || []
        }),
            id = _Object$assign2.id,
            fields = _Object$assign2.fields,
            title = _Object$assign2.title;

        return renderEl({
          name: 'div',
          attributes: {
            "class": 'card mb-3',
            id: id
          },
          children: [!title ? null : {
            name: 'h2',
            attributes: {
              "class": 'card-header h5',
              id: "".concat(id, "-title")
            },
            children: [title]
          }, {
            name: 'div',
            attributes: {
              "class": 'card-body'
            },
            children: fields.map(function (field) {
              var _Object$assign3 = Object.assign(field, {
                type: field.type || 'text'
              }),
                  type = _Object$assign3.type;

              return Factories[type].render(field, renderEl);
            })
          }]
        });
      }
    },
    text: {
      render: function render(definition) {
        var renderEl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : renderElement;

        var _Object$assign4 = Object.assign(definition, {
          id: definition.id || getNextId(),
          title: definition.title || 'Unlabled'
        }),
            choices = _Object$assign4.choices,
            disabled = _Object$assign4.disabled,
            id = _Object$assign4.id,
            placeHolder = _Object$assign4.placeHolder,
            preHelpText = _Object$assign4.preHelpText,
            postHelpText = _Object$assign4.postHelpText,
            readOnly = _Object$assign4.readOnly,
            required = _Object$assign4.required;

        return renderEl({
          name: 'div',
          attributes: {
            "class": 'row'
          },
          children: [{
            name: 'div',
            attributes: {
              "class": 'col mb-3'
            },
            children: getFieldConfiguration(definition, [{
              name: 'input',
              attributes: {
                "class": 'form-control',
                disabled: !disabled ? null : '',
                id: id,
                list: !choices ? null : "".concat(id, "-list"),
                name: id,
                placeholder: placeHolder,
                readonly: !readOnly ? null : '',
                required: !required ? null : '',
                type: 'text',
                'aria-describedby': [preHelpText, postHelpText].every(function (value) {
                  return value == null;
                }) ? null : [!preHelpText ? null : "".concat(id, "-prehelptext"), !postHelpText ? null : "".concat(id, "-posthelptext")].filter(function (value) {
                  return value != null;
                }).join(' ')
              }
            }, !choices ? null : {
              name: 'datalist',
              attributes: {
                id: "".concat(id, "-list")
              },
              children: choices.map(function (choice) {
                return {
                  name: 'option',
                  attributes: {
                    value: choice
                  }
                };
              })
            }])
          }]
        });
      }
    },
    temp: {
      render: function render(definition) {
        var renderEl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : renderElement;
        return renderEl({
          name: 'div',
          children: []
        });
      }
    }
  };

  function render(definition) {
    var renderEl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : renderElement;
    var _definition$type = definition.type,
        type = _definition$type === void 0 ? 'form' : _definition$type;
    return Factories[type].render(definition, renderEl);
  }

  return {
    Factories: Factories,
    render: render
  };
}();
/* exported FormFactory */