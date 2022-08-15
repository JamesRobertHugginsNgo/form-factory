"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* global HtmlFactory */
var FormFactory = function () {
  var _HtmlFactory = HtmlFactory,
      renderElement = _HtmlFactory.renderElement;
  var idCounter = 0;

  function filteredJoin() {
    for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
      items[_key] = arguments[_key];
    }

    return items.filter(function (item) {
      return item != null;
    }).join(' ');
  } // -----------------------------------------------------------------------------


  function makeField(definition, createInput) {
    var render = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : renderElement;
    var className = definition.className,
        _definition$id = definition.id,
        id = _definition$id === void 0 ? "form-factory-".concat(idCounter++) : _definition$id,
        postHelpText = definition.postHelpText,
        preHelpText = definition.preHelpText,
        required = definition.required,
        _definition$title = definition.title,
        title = _definition$title === void 0 ? 'Untitled' : _definition$title;
    var preHelpTextId = !preHelpText ? null : "".concat(id, "-pre-help-text");
    var postHelpTextId = !postHelpText ? null : "".concat(id, "-post-help-text");
    var ariaDescribedBy = !preHelpTextId && !postHelpTextId ? null : filteredJoin(preHelpTextId, postHelpTextId);
    console.log('REQUIRED', required);
    return render('div', {
      "class": filteredJoin('col-12 mb-3', className),
      id: "".concat(id, "-element")
    }, [render('label', {
      "for": id,
      "class": 'form-label',
      id: "".concat(id, "-label")
    }, [title, required ? null : [' ', render('span', {
      "class": 'form-text'
    }, '(Optional)')]]), !preHelpText ? null : render('div', {
      "class": 'form-text mb-1 mt-0',
      id: preHelpTextId
    }, preHelpText), createInput(_objectSpread({
      ariaDescribedBy: ariaDescribedBy,
      id: id,
      title: title
    }, definition), render), !postHelpText ? null : render('div', {
      "class": 'form-text',
      id: postHelpTextId
    }, postHelpText)]);
  } // -----------------------------------------------------------------------------


  function makeTextareaField(definition) {
    var render = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : renderElement;
    return makeField(definition, function (definitionArg, renderArg) {
      var ariaDescribedBy = definitionArg.ariaDescribedBy,
          disabled = definitionArg.disabled,
          id = definitionArg.id,
          placeHolder = definitionArg.placeHolder,
          readOnly = definitionArg.readOnly,
          required = definitionArg.required,
          rows = definitionArg.rows;
      return renderArg('textarea', {
        disabled: !disabled ? null : '',
        placeholder: placeHolder,
        readonly: !readOnly ? null : '',
        required: !required ? null : '',
        rows: rows,
        "class": 'form-control',
        id: id,
        'aria-describedby': ariaDescribedBy
      });
    }, render);
  } // -----------------------------------------------------------------------------


  function makeTextField(definition) {
    var render = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : renderElement;
    return makeField(definition, function (definitionArg, renderArg) {
      var ariaDescribedBy = definitionArg.ariaDescribedBy,
          disabled = definitionArg.disabled,
          id = definitionArg.id,
          placeHolder = definitionArg.placeHolder,
          readOnly = definitionArg.readOnly,
          required = definitionArg.required;
      return renderArg('input', {
        disabled: !disabled ? null : '',
        placeholder: placeHolder,
        readonly: !readOnly ? null : '',
        required: !required ? null : '',
        type: 'text',
        "class": 'form-control',
        id: id,
        'aria-describedby': ariaDescribedBy
      });
    }, render);
  } // -----------------------------------------------------------------------------


  function makeRow(definition) {
    var render = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : renderElement;
    var className = definition.className,
        factories = definition.factories,
        _definition$fields = definition.fields,
        fields = _definition$fields === void 0 ? [] : _definition$fields,
        id = definition.id;
    var finalFactories = Object.assign({}, defaultFactories, factories);
    return render('div', {
      "class": filteredJoin('row', className),
      id: id
    }, fields.map(function (field) {
      var _field$type = field.type,
          type = _field$type === void 0 ? 'text' : _field$type;
      return finalFactories[type](_objectSpread({
        factories: factories
      }, field), render);
    }));
  } // -----------------------------------------------------------------------------


  function makeSection(definition) {
    var render = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : renderElement;
    var className = definition.className,
        factories = definition.factories,
        _definition$id2 = definition.id,
        id = _definition$id2 === void 0 ? "form-factory-".concat(idCounter++) : _definition$id2,
        _definition$rows = definition.rows,
        rows = _definition$rows === void 0 ? [] : _definition$rows,
        title = definition.title;
    var finalFactories = Object.assign({}, defaultFactories, factories);
    return render('div', {
      "class": filteredJoin('card mb-3', className),
      id: id
    }, [!title ? null : render('h2', {
      "class": 'card-header h5',
      id: "".concat(id, "-heading")
    }, title), render('div', {
      "class": 'card-body'
    }, rows.map(function (row) {
      var _row$type = row.type,
          type = _row$type === void 0 ? 'row' : _row$type;
      return finalFactories[type](_objectSpread({
        factories: factories
      }, row), render);
    }))]);
  } // -----------------------------------------------------------------------------


  function makeForm(definition) {
    var render = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : renderElement;
    var className = definition.className,
        factories = definition.factories,
        _definition$id3 = definition.id,
        id = _definition$id3 === void 0 ? "form-factory-".concat(idCounter++) : _definition$id3,
        title = definition.title,
        _definition$sections = definition.sections,
        sections = _definition$sections === void 0 ? [] : _definition$sections;
    var finalFactories = Object.assign({}, defaultFactories, factories);
    return render('form', {
      "class": filteredJoin('mb-3', className),
      id: id
    }, [!title ? null : render('h1', {
      id: "".concat(id, "-heading")
    }, title), sections.map(function (section) {
      var _section$type = section.type,
          type = _section$type === void 0 ? 'section' : _section$type;
      return finalFactories[type](_objectSpread({
        factories: factories
      }, section), render);
    })]);
  } // -----------------------------------------------------------------------------


  function factory(definition) {
    var render = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : renderElement;
    var factories = definition.factories,
        _definition$type = definition.type,
        type = _definition$type === void 0 ? 'form' : _definition$type;
    var finalFactories = Object.assign({}, defaultFactories, factories);
    return finalFactories[type](_objectSpread({
      factories: factories
    }, definition), render);
  } // -----------------------------------------------------------------------------


  var defaultFactories = {
    form: makeForm,
    row: makeRow,
    section: makeSection,
    text: makeTextField,
    textarea: makeTextareaField
  };
  return {
    factory: factory
  };
}();
/* exported FormFactory */