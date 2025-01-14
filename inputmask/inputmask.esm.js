import * as React from 'react';
import { useMountEffect, useUpdateEffect } from 'primereact/hooks';
import { InputText } from 'primereact/inputtext';
import { ObjectUtils, classNames, DomHandler } from 'primereact/utils';

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

var InputMask = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var elementRef = React.useRef(ref);
  var firstNonMaskPos = React.useRef(null);
  var lastRequiredNonMaskPos = React.useRef(0);
  var tests = React.useRef([]);
  var buffer = React.useRef([]);
  var len = React.useRef(0);
  var oldVal = React.useRef(null);
  var focus = React.useRef(false);
  var focusText = React.useRef(null);
  var isValueChecked = React.useRef(null);
  var partialPosition = React.useRef(null);
  var defaultBuffer = React.useRef(null);
  var caretTimeoutId = React.useRef(null);
  var androidChrome = React.useRef(false);
  var caret = function caret(first, last) {
    var range, begin, end;
    var inputEl = elementRef.current;
    if (!inputEl || !inputEl.offsetParent || inputEl !== document.activeElement) {
      return;
    }
    if (typeof first === 'number') {
      begin = first;
      end = typeof last === 'number' ? last : begin;
      if (inputEl.setSelectionRange) {
        inputEl.setSelectionRange(begin, end);
      } else if (inputEl['createTextRange']) {
        range = inputEl['createTextRange']();
        range.collapse(true);
        range.moveEnd('character', end);
        range.moveStart('character', begin);
        range.select();
      }
    } else {
      if (inputEl.setSelectionRange) {
        begin = inputEl.selectionStart;
        end = inputEl.selectionEnd;
      } else if (document['selection'] && document['selection'].createRange) {
        range = document['selection'].createRange();
        begin = 0 - range.duplicate().moveStart('character', -100000);
        end = begin + range.text.length;
      }
      return {
        begin: begin,
        end: end
      };
    }
  };
  var isCompleted = function isCompleted() {
    for (var i = firstNonMaskPos.current; i <= lastRequiredNonMaskPos.current; i++) {
      if (tests.current[i] && buffer.current[i] === getPlaceholder(i)) {
        return false;
      }
    }
    return true;
  };
  var getPlaceholder = React.useCallback(function (i) {
    if (i < props.slotChar.length) {
      return props.slotChar.charAt(i);
    }
    return props.slotChar.charAt(0);
  }, [props.slotChar]);
  var getValue = function getValue() {
    return props.unmask ? getUnmaskedValue() : elementRef.current && elementRef.current.value;
  };
  var seekNext = function seekNext(pos) {
    while (++pos < len.current && !tests.current[pos]) {
    }
    return pos;
  };
  var seekPrev = function seekPrev(pos) {
    while (--pos >= 0 && !tests.current[pos]) {
    }
    return pos;
  };
  var shiftL = function shiftL(begin, end) {
    var i, j;
    if (begin < 0) {
      return;
    }
    for (i = begin, j = seekNext(end); i < len.current; i++) {
      if (tests.current[i]) {
        if (j < len.current && tests.current[i].test(buffer.current[j])) {
          buffer.current[i] = buffer.current[j];
          buffer.current[j] = getPlaceholder(j);
        } else {
          break;
        }
        j = seekNext(j);
      }
    }
    writeBuffer();
    caret(Math.max(firstNonMaskPos.current, begin));
  };
  var shiftR = function shiftR(pos) {
    var i, c, j, t;
    for (i = pos, c = getPlaceholder(pos); i < len.current; i++) {
      if (tests.current[i]) {
        j = seekNext(i);
        t = buffer.current[i];
        buffer.current[i] = c;
        if (j < len.current && tests.current[j].test(t)) {
          c = t;
        } else {
          break;
        }
      }
    }
  };
  var handleAndroidInput = function handleAndroidInput(e) {
    var curVal = elementRef.current.value;
    var pos = caret();
    if (oldVal.current.length && oldVal.current.length > curVal.length) {
      // a deletion or backspace happened
      checkVal(true);
      while (pos.begin > 0 && !tests.current[pos.begin - 1]) {
        pos.begin--;
      }
      if (pos.begin === 0) {
        while (pos.begin < firstNonMaskPos.current && !tests.current[pos.begin]) {
          pos.begin++;
        }
      }
      caret(pos.begin, pos.begin);
    } else {
      checkVal(true);
      while (pos.begin < len.current && !tests.current[pos.begin]) {
        pos.begin++;
      }
      caret(pos.begin, pos.begin);
    }
    if (props.onComplete && isCompleted()) {
      props.onComplete({
        originalEvent: e,
        value: getValue()
      });
    }
    updateModel(e);
  };
  var onBlur = function onBlur(e) {
    focus.current = false;
    checkVal();
    updateModel(e);
    updateFilledState();
    props.onBlur && props.onBlur(e);
    if (elementRef.current.value !== focusText.current) {
      var event = document.createEvent('HTMLEvents');
      event.initEvent('change', true, false);
      elementRef.current.dispatchEvent(event);
    }
  };
  var onKeyDown = function onKeyDown(e) {
    if (props.readOnly) {
      return;
    }
    var k = e.which || e.keyCode,
      pos,
      begin,
      end;
    var iPhone = /iphone/i.test(DomHandler.getUserAgent());
    oldVal.current = elementRef.current.value;

    //backspace, delete, and escape get special treatment
    if (k === 8 || k === 46 || iPhone && k === 127) {
      pos = caret();
      begin = pos.begin;
      end = pos.end;
      if (end - begin === 0) {
        begin = k !== 46 ? seekPrev(begin) : end = seekNext(begin - 1);
        end = k === 46 ? seekNext(end) : end;
      }
      clearBuffer(begin, end);
      shiftL(begin, end - 1);
      updateModel(e);
      e.preventDefault();
    } else if (k === 13) {
      // enter
      onBlur(e);
      updateModel(e);
    } else if (k === 27) {
      // escape
      elementRef.current.value = focusText.current;
      caret(0, checkVal());
      updateModel(e);
      e.preventDefault();
    }
  };
  var onKeyPress = function onKeyPress(e) {
    if (props.readOnly) {
      return;
    }
    var k = e.which || e.keyCode,
      pos = caret(),
      p,
      c,
      next,
      completed;
    if (e.ctrlKey || e.altKey || e.metaKey || k < 32) {
      //Ignore
      return;
    } else if (k && k !== 13) {
      if (pos.end - pos.begin !== 0) {
        clearBuffer(pos.begin, pos.end);
        shiftL(pos.begin, pos.end - 1);
      }
      p = seekNext(pos.begin - 1);
      if (p < len.current) {
        c = String.fromCharCode(k);
        if (tests.current[p].test(c)) {
          shiftR(p);
          buffer.current[p] = c;
          writeBuffer();
          next = seekNext(p);
          if (/android/i.test(DomHandler.getUserAgent())) {
            //Path for CSP Violation on FireFox OS 1.1
            var proxy = function proxy() {
              caret(next);
            };
            setTimeout(proxy, 0);
          } else {
            caret(next);
          }
          if (pos.begin <= lastRequiredNonMaskPos.current) {
            completed = isCompleted();
          }
        }
      }
      e.preventDefault();
    }
    updateModel(e);
    if (props.onComplete && completed) {
      props.onComplete({
        originalEvent: e,
        value: getValue()
      });
    }
  };
  var clearBuffer = function clearBuffer(start, end) {
    var i;
    for (i = start; i < end && i < len.current; i++) {
      if (tests.current[i]) {
        buffer.current[i] = getPlaceholder(i);
      }
    }
  };
  var writeBuffer = function writeBuffer() {
    elementRef.current.value = buffer.current.join('');
  };
  var checkVal = function checkVal(allow) {
    isValueChecked.current = true;
    //try to place characters where they belong
    var test = elementRef.current.value,
      lastMatch = -1,
      i,
      c,
      pos;
    for (i = 0, pos = 0; i < len.current; i++) {
      if (tests.current[i]) {
        buffer.current[i] = getPlaceholder(i);
        while (pos++ < test.length) {
          c = test.charAt(pos - 1);
          if (tests.current[i].test(c)) {
            buffer.current[i] = c;
            lastMatch = i;
            break;
          }
        }
        if (pos > test.length) {
          clearBuffer(i + 1, len.current);
          break;
        }
      } else {
        if (buffer.current[i] === test.charAt(pos)) {
          pos++;
        }
        if (i < partialPosition.current) {
          lastMatch = i;
        }
      }
    }
    if (allow) {
      writeBuffer();
    } else if (lastMatch + 1 < partialPosition.current) {
      if (props.autoClear || buffer.current.join('') === defaultBuffer.current) {
        // Invalid value. Remove it and replace it with the
        // mask, which is the default behavior.
        if (elementRef.current.value) elementRef.current.value = '';
        clearBuffer(0, len.current);
      } else {
        // Invalid value, but we opt to show the value to the
        // user and allow them to correct their mistake.
        writeBuffer();
      }
    } else {
      writeBuffer();
      elementRef.current.value = elementRef.current.value.substring(0, lastMatch + 1);
    }
    return partialPosition.current ? i : firstNonMaskPos.current;
  };
  var onFocus = function onFocus(e) {
    if (props.readOnly) {
      return;
    }
    focus.current = true;
    clearTimeout(caretTimeoutId.current);
    var pos;
    focusText.current = elementRef.current.value;
    pos = checkVal();
    caretTimeoutId.current = setTimeout(function () {
      if (elementRef.current !== document.activeElement) {
        return;
      }
      writeBuffer();
      if (pos === props.mask.replace('?', '').length) {
        caret(0, pos);
      } else {
        caret(pos);
      }
      updateFilledState();
    }, 10);
    props.onFocus && props.onFocus(e);
  };
  var onInput = function onInput(event) {
    androidChrome.current ? handleAndroidInput(event) : handleInputChange(event);
  };
  var handleInputChange = function handleInputChange(e) {
    if (props.readOnly) {
      return;
    }
    var pos = checkVal(true);
    caret(pos);
    updateModel(e);
    if (props.onComplete && isCompleted()) {
      props.onComplete({
        originalEvent: e,
        value: getValue()
      });
    }
  };
  var getUnmaskedValue = React.useCallback(function () {
    var unmaskedBuffer = [];
    for (var i = 0; i < buffer.current.length; i++) {
      var c = buffer.current[i];
      if (tests.current[i] && c !== getPlaceholder(i)) {
        unmaskedBuffer.push(c);
      }
    }
    return unmaskedBuffer.join('');
  }, [getPlaceholder]);
  var updateModel = function updateModel(e) {
    if (props.onChange) {
      var val = props.unmask ? getUnmaskedValue() : e && e.target.value;
      props.onChange({
        originalEvent: e,
        value: defaultBuffer.current !== val ? val : '',
        stopPropagation: function stopPropagation() {},
        preventDefault: function preventDefault() {},
        target: {
          name: props.name,
          id: props.id,
          value: defaultBuffer.current !== val ? val : ''
        }
      });
    }
  };
  var updateFilledState = function updateFilledState() {
    if (elementRef.current && elementRef.current.value && elementRef.current.value.length > 0) DomHandler.addClass(elementRef.current, 'p-filled');else DomHandler.removeClass(elementRef.current, 'p-filled');
  };
  var updateValue = function updateValue(allow) {
    var pos;
    if (elementRef.current) {
      if (props.value == null) {
        elementRef.current.value = '';
      } else {
        elementRef.current.value = props.value;
        pos = checkVal(allow);
        setTimeout(function () {
          if (elementRef.current) {
            writeBuffer();
            return checkVal(allow);
          }
        }, 10);
      }
      focusText.current = elementRef.current.value;
    }
    updateFilledState();
    return pos;
  };
  var isValueUpdated = React.useCallback(function () {
    return props.unmask ? props.value !== getUnmaskedValue() : defaultBuffer.current !== elementRef.current.value && elementRef.current.value !== props.value;
  }, [props.unmask, props.value, getUnmaskedValue]);
  var init = function init() {
    if (props.mask) {
      tests.current = [];
      partialPosition.current = props.mask.length;
      len.current = props.mask.length;
      firstNonMaskPos.current = null;
      var defs = {
        9: '[0-9]',
        a: '[A-Za-z]',
        '*': '[A-Za-z0-9]'
      };
      var ua = DomHandler.getUserAgent();
      androidChrome.current = /chrome/i.test(ua) && /android/i.test(ua);
      var maskTokens = props.mask.split('');
      for (var i = 0; i < maskTokens.length; i++) {
        var c = maskTokens[i];
        if (c === '?') {
          len.current--;
          partialPosition.current = i;
        } else if (defs[c]) {
          tests.current.push(new RegExp(defs[c]));
          if (firstNonMaskPos.current === null) {
            firstNonMaskPos.current = tests.current.length - 1;
          }
          if (i < partialPosition.current) {
            lastRequiredNonMaskPos.current = tests.current.length - 1;
          }
        } else {
          tests.current.push(null);
        }
      }
      buffer.current = [];
      for (var _i = 0; _i < maskTokens.length; _i++) {
        var _c = maskTokens[_i];
        if (_c !== '?') {
          if (defs[_c]) buffer.current.push(getPlaceholder(_i));else buffer.current.push(_c);
        }
      }
      defaultBuffer.current = buffer.current.join('');
    }
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  React.useEffect(function () {
    ObjectUtils.combinedRefs(elementRef, ref);
  }, [elementRef, ref]);
  useMountEffect(function () {
    init();
    updateValue();
  });
  useUpdateEffect(function () {
    init();
    caret(updateValue(true));
    if (props.unmask) {
      updateModel();
    }
  }, [props.mask]);
  useUpdateEffect(function () {
    if (isValueUpdated()) {
      updateValue();
    }
  }, [isValueUpdated]);
  var otherProps = ObjectUtils.findDiffKeys(props, InputMask.defaultProps);
  var className = classNames('p-inputmask', props.className);
  return /*#__PURE__*/React.createElement(InputText, _extends({
    ref: elementRef,
    id: props.id,
    type: props.type,
    name: props.name,
    style: props.style,
    className: className
  }, otherProps, {
    placeholder: props.placeholder,
    size: props.size,
    maxLength: props.maxLength,
    tabIndex: props.tabIndex,
    disabled: props.disabled,
    readOnly: props.readOnly,
    onFocus: onFocus,
    onBlur: onBlur,
    onKeyDown: onKeyDown,
    onKeyPress: onKeyPress,
    onInput: onInput,
    onPaste: handleInputChange,
    required: props.required,
    tooltip: props.tooltip,
    tooltipOptions: props.tooltipOptions
  }));
}));
InputMask.displayName = 'InputMask';
InputMask.defaultProps = {
  __TYPE: 'InputMask',
  id: null,
  value: null,
  type: 'text',
  mask: null,
  slotChar: '_',
  autoClear: true,
  unmask: false,
  style: null,
  className: null,
  placeholder: null,
  size: null,
  maxLength: null,
  tabIndex: null,
  disabled: false,
  readOnly: false,
  name: null,
  required: false,
  tooltip: null,
  tooltipOptions: null,
  onComplete: null,
  onChange: null,
  onFocus: null,
  onBlur: null
};

export { InputMask };
