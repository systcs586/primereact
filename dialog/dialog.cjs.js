'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PrimeReact = require('primereact/api');
var csstransition = require('primereact/csstransition');
var hooks = require('primereact/hooks');
var portal = require('primereact/portal');
var ripple = require('primereact/ripple');
var utils = require('primereact/utils');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);
var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);

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

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {
        ;
      }
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var Dialog = /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
  var _React$useState = React__namespace.useState(props.id),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    idState = _React$useState2[0],
    setIdState = _React$useState2[1];
  var _React$useState3 = React__namespace.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    maskVisibleState = _React$useState4[0],
    setMaskVisibleState = _React$useState4[1];
  var _React$useState5 = React__namespace.useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    visibleState = _React$useState6[0],
    setVisibleState = _React$useState6[1];
  var _React$useState7 = React__namespace.useState(props.maximized),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    maximizedState = _React$useState8[0],
    setMaximizedState = _React$useState8[1];
  var dialogRef = React__namespace.useRef(null);
  var maskRef = React__namespace.useRef(null);
  var contentRef = React__namespace.useRef(null);
  var headerRef = React__namespace.useRef(null);
  var footerRef = React__namespace.useRef(null);
  var closeRef = React__namespace.useRef(null);
  var dragging = React__namespace.useRef(false);
  var resizing = React__namespace.useRef(false);
  var lastPageX = React__namespace.useRef(null);
  var lastPageY = React__namespace.useRef(null);
  var styleElement = React__namespace.useRef(null);
  var attributeSelector = React__namespace.useRef('');
  var maximized = props.onMaximize ? props.maximized : maximizedState;
  var _useEventListener = hooks.useEventListener({
      type: 'keydown',
      listener: function listener(event) {
        return onKeyDown(event);
      }
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 2),
    bindDocumentKeyDownListener = _useEventListener2[0],
    unbindDocumentKeyDownListener = _useEventListener2[1];
  var _useEventListener3 = hooks.useEventListener({
      type: 'mousemove',
      target: function target() {
        return window.document;
      },
      listener: function listener(event) {
        return onResize(event);
      }
    }),
    _useEventListener4 = _slicedToArray(_useEventListener3, 2),
    bindDocumentResizeListener = _useEventListener4[0],
    unbindDocumentResizeListener = _useEventListener4[1];
  var _useEventListener5 = hooks.useEventListener({
      type: 'mouseup',
      target: function target() {
        return window.document;
      },
      listener: function listener(event) {
        return onResizeEnd(event);
      }
    }),
    _useEventListener6 = _slicedToArray(_useEventListener5, 2),
    bindDocumentResizeEndListener = _useEventListener6[0],
    unbindDocumentResizEndListener = _useEventListener6[1];
  var _useEventListener7 = hooks.useEventListener({
      type: 'mousemove',
      target: function target() {
        return window.document;
      },
      listener: function listener(event) {
        return onDrag(event);
      }
    }),
    _useEventListener8 = _slicedToArray(_useEventListener7, 2),
    bindDocumentDragListener = _useEventListener8[0],
    unbindDocumentDragListener = _useEventListener8[1];
  var _useEventListener9 = hooks.useEventListener({
      type: 'mouseup',
      target: function target() {
        return window.document;
      },
      listener: function listener(event) {
        return onDragEnd(event);
      }
    }),
    _useEventListener10 = _slicedToArray(_useEventListener9, 2),
    bindDocumentDragEndListener = _useEventListener10[0],
    unbindDocumentDragEndListener = _useEventListener10[1];
  var onClose = function onClose(event) {
    props.onHide();
    event.preventDefault();
  };
  var focus = function focus() {
    var activeElement = document.activeElement;
    var isActiveElementInDialog = activeElement && dialogRef.current && dialogRef.current.contains(activeElement);
    if (!isActiveElementInDialog && props.closable && props.showHeader) {
      closeRef.current.focus();
    }
  };
  var onMaskClick = function onMaskClick(event) {
    if (props.dismissableMask && props.modal && maskRef.current === event.target) {
      onClose(event);
    }
    props.onMaskClick && props.onMaskClick(event);
  };
  var toggleMaximize = function toggleMaximize(event) {
    if (props.onMaximize) {
      props.onMaximize({
        originalEvent: event,
        maximized: !maximized
      });
    } else {
      setMaximizedState(function (prevMaximized) {
        return !prevMaximized;
      });
    }
    event.preventDefault();
  };
  var onKeyDown = function onKeyDown(event) {
    var currentTarget = event.currentTarget;
    if (!currentTarget || !currentTarget.primeDialogParams) {
      return;
    }
    var params = currentTarget.primeDialogParams;
    var paramLength = params.length;
    var dialogId = params[paramLength - 1] ? params[paramLength - 1].id : undefined;
    if (dialogId !== idState) {
      return;
    }
    var dialog = document.getElementById(dialogId);
    if (props.closable && props.closeOnEscape && event.key === 'Escape') {
      onClose(event);
      event.stopImmediatePropagation();
      params.splice(paramLength - 1, 1);
    } else if (event.key === 'Tab') {
      event.preventDefault();
      var focusableElements = utils.DomHandler.getFocusableElements(dialog);
      if (focusableElements && focusableElements.length > 0) {
        if (!document.activeElement) {
          focusableElements[0].focus();
        } else {
          var focusedIndex = focusableElements.indexOf(document.activeElement);
          if (event.shiftKey) {
            if (focusedIndex === -1 || focusedIndex === 0) focusableElements[focusableElements.length - 1].focus();else focusableElements[focusedIndex - 1].focus();
          } else {
            if (focusedIndex === -1 || focusedIndex === focusableElements.length - 1) focusableElements[0].focus();else focusableElements[focusedIndex + 1].focus();
          }
        }
      }
    }
  };
  var onDragStart = function onDragStart(event) {
    if (utils.DomHandler.hasClass(event.target, 'p-dialog-header-icon') || utils.DomHandler.hasClass(event.target.parentElement, 'p-dialog-header-icon')) {
      return;
    }
    if (props.draggable) {
      dragging.current = true;
      lastPageX.current = event.pageX;
      lastPageY.current = event.pageY;
      dialogRef.current.style.margin = '0';
      utils.DomHandler.addClass(document.body, 'p-unselectable-text');
      props.onDragStart && props.onDragStart(event);
    }
  };
  var onDrag = function onDrag(event) {
    if (dragging.current) {
      var width = utils.DomHandler.getOuterWidth(dialogRef.current);
      var height = utils.DomHandler.getOuterHeight(dialogRef.current);
      var deltaX = event.pageX - lastPageX.current;
      var deltaY = event.pageY - lastPageY.current;
      var offset = dialogRef.current.getBoundingClientRect();
      var leftPos = offset.left + deltaX;
      var topPos = offset.top + deltaY;
      var viewport = utils.DomHandler.getViewport();
      dialogRef.current.style.position = 'fixed';
      if (props.keepInViewport) {
        if (leftPos >= props.minX && leftPos + width < viewport.width) {
          lastPageX.current = event.pageX;
          dialogRef.current.style.left = leftPos + 'px';
        }
        if (topPos >= props.minY && topPos + height < viewport.height) {
          lastPageY.current = event.pageY;
          dialogRef.current.style.top = topPos + 'px';
        }
      } else {
        lastPageX.current = event.pageX;
        dialogRef.current.style.left = leftPos + 'px';
        lastPageY.current = event.pageY;
        dialogRef.current.style.top = topPos + 'px';
      }
      props.onDrag && props.onDrag(event);
    }
  };
  var onDragEnd = function onDragEnd(event) {
    if (dragging.current) {
      dragging.current = false;
      utils.DomHandler.removeClass(document.body, 'p-unselectable-text');
      props.onDragEnd && props.onDragEnd(event);
    }
  };
  var onResizeStart = function onResizeStart(event) {
    if (props.resizable) {
      resizing.current = true;
      lastPageX.current = event.pageX;
      lastPageY.current = event.pageY;
      utils.DomHandler.addClass(document.body, 'p-unselectable-text');
      props.onResizeStart && props.onResizeStart(event);
    }
  };
  var convertToPx = function convertToPx(value, property, viewport) {
    !viewport && (viewport = utils.DomHandler.getViewport());
    var val = parseInt(value);
    if (/^(\d+|(\.\d+))(\.\d+)?%$/.test(value)) {
      return val * (viewport[property] / 100);
    }
    return val;
  };
  var onResize = function onResize(event) {
    if (resizing.current) {
      var deltaX = event.pageX - lastPageX.current;
      var deltaY = event.pageY - lastPageY.current;
      var width = utils.DomHandler.getOuterWidth(dialogRef.current);
      var height = utils.DomHandler.getOuterHeight(dialogRef.current);
      var offset = dialogRef.current.getBoundingClientRect();
      var viewport = utils.DomHandler.getViewport();
      var hasBeenDragged = !parseInt(dialogRef.current.style.top) || !parseInt(dialogRef.current.style.left);
      var minWidth = convertToPx(dialogRef.current.style.minWidth, 'width', viewport);
      var minHeight = convertToPx(dialogRef.current.style.minHeight, 'height', viewport);
      var newWidth = width + deltaX;
      var newHeight = height + deltaY;
      if (hasBeenDragged) {
        newWidth += deltaX;
        newHeight += deltaY;
      }
      if ((!minWidth || newWidth > minWidth) && offset.left + newWidth < viewport.width) {
        dialogRef.current.style.width = newWidth + 'px';
      }
      if ((!minHeight || newHeight > minHeight) && offset.top + newHeight < viewport.height) {
        dialogRef.current.style.height = newHeight + 'px';
      }
      lastPageX.current = event.pageX;
      lastPageY.current = event.pageY;
      props.onResize && props.onResize(event);
    }
  };
  var onResizeEnd = function onResizeEnd(event) {
    if (resizing.current) {
      resizing.current = false;
      utils.DomHandler.removeClass(document.body, 'p-unselectable-text');
      props.onResizeEnd && props.onResizeEnd(event);
    }
  };
  var resetPosition = function resetPosition() {
    dialogRef.current.style.position = '';
    dialogRef.current.style.left = '';
    dialogRef.current.style.top = '';
    dialogRef.current.style.margin = '';
  };
  var getPositionClass = function getPositionClass() {
    var positions = ['center', 'left', 'right', 'top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right'];
    var pos = positions.find(function (item) {
      return item === props.position || item.replace('-', '') === props.position;
    });
    return pos ? "p-dialog-".concat(pos) : '';
  };
  var onEnter = function onEnter() {
    dialogRef.current.setAttribute(attributeSelector.current, '');
  };
  var onEntered = function onEntered() {
    props.onShow && props.onShow();
    if (props.focusOnShow) {
      focus();
    }
    enableDocumentSettings();
  };
  var onExiting = function onExiting() {
    if (props.modal) {
      utils.DomHandler.addClass(maskRef.current, 'p-component-overlay-leave');
    }
    if (props.blockScroll) {
      utils.DomHandler.removeClass(document.body, 'p-overflow-hidden');
    }
  };
  var onExited = function onExited() {
    dragging.current = false;
    utils.ZIndexUtils.clear(maskRef.current);
    setMaskVisibleState(false);
    disableDocumentSettings();
  };
  var enableDocumentSettings = function enableDocumentSettings() {
    bindGlobalListeners();
    if (props.blockScroll || props.maximizable && maximized) {
      utils.DomHandler.addClass(document.body, 'p-overflow-hidden');
    }
  };
  var disableDocumentSettings = function disableDocumentSettings() {
    unbindGlobalListeners();
    var isMaximized = props.maximizable && maximized;
    if (props.modal) {
      var hasBlockScroll = document.primeDialogParams && document.primeDialogParams.some(function (param) {
        return param.hasBlockScroll;
      });
      if (hasBlockScroll || isMaximized) {
        utils.DomHandler.removeClass(document.body, 'p-overflow-hidden');
      }
    } else if (props.blockScroll || isMaximized) {
      utils.DomHandler.removeClass(document.body, 'p-overflow-hidden');
    }
  };
  var bindGlobalListeners = function bindGlobalListeners() {
    if (props.draggable) {
      bindDocumentDragListener();
      bindDocumentDragEndListener();
    }
    if (props.resizable) {
      bindDocumentResizeListener();
      bindDocumentResizeEndListener();
    }
    bindDocumentKeyDownListener();
    var newParam = {
      id: idState,
      hasBlockScroll: props.blockScroll
    };
    document.primeDialogParams = document.primeDialogParams ? [].concat(_toConsumableArray(document.primeDialogParams), [newParam]) : [newParam];
  };
  var unbindGlobalListeners = function unbindGlobalListeners() {
    unbindDocumentDragListener();
    unbindDocumentDragEndListener();
    unbindDocumentResizeListener();
    unbindDocumentResizEndListener();
    unbindDocumentKeyDownListener();
    document.primeDialogParams = document.primeDialogParams && document.primeDialogParams.filter(function (param) {
      return param.id !== idState;
    });
  };
  var createStyle = function createStyle() {
    if (!styleElement.current) {
      styleElement.current = utils.DomHandler.createInlineStyle(PrimeReact__default["default"].nonce);
      var innerHTML = '';
      for (var breakpoint in props.breakpoints) {
        innerHTML += "\n                    @media screen and (max-width: ".concat(breakpoint, ") {\n                        .p-dialog[").concat(attributeSelector.current, "] {\n                            width: ").concat(props.breakpoints[breakpoint], " !important;\n                        }\n                    }\n                ");
      }
      styleElement.current.innerHTML = innerHTML;
    }
  };
  var changeScrollOnMaximizable = function changeScrollOnMaximizable() {
    if (!props.blockScroll) {
      var funcName = maximized ? 'addClass' : 'removeClass';
      utils.DomHandler[funcName](document.body, 'p-overflow-hidden');
    }
  };
  hooks.useMountEffect(function () {
    var unqiueId = utils.UniqueComponentId();
    if (!idState) {
      setIdState(unqiueId);
    }
    if (!attributeSelector.current) {
      attributeSelector.current = unqiueId;
    }
    if (props.visible) {
      setMaskVisibleState(true);
    }
    if (props.breakpoints) {
      createStyle();
    }
  });
  hooks.useUpdateEffect(function () {
    if (props.visible && !maskVisibleState) {
      setMaskVisibleState(true);
    }
    if (props.visible !== visibleState && maskVisibleState) {
      setVisibleState(props.visible);
    }
  });
  hooks.useUpdateEffect(function () {
    if (maskVisibleState) {
      utils.ZIndexUtils.set('modal', maskRef.current, PrimeReact__default["default"].autoZIndex, props.baseZIndex || PrimeReact__default["default"].zIndex['modal']);
      setVisibleState(true);
    }
  }, [maskVisibleState]);
  hooks.useUpdateEffect(function () {
    changeScrollOnMaximizable();
  }, [props.maximized, maximizedState]);
  hooks.useUnmountEffect(function () {
    disableDocumentSettings();
    utils.DomHandler.removeInlineStyle(styleElement.current);
    utils.ZIndexUtils.clear(maskRef.current);
  });
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      resetPosition: resetPosition,
      getElement: function getElement() {
        return dialogRef.current;
      },
      getMask: function getMask() {
        return maskRef.current;
      },
      getContent: function getContent() {
        return contentRef.current;
      },
      getHeader: function getHeader() {
        return headerRef.current;
      },
      getFooter: function getFooter() {
        return footerRef.current;
      },
      getCloseButton: function getCloseButton() {
        return closeRef.current;
      }
    };
  });
  var createCloseIcon = function createCloseIcon() {
    if (props.closable) {
      var ariaLabel = props.ariaCloseIconLabel || PrimeReact.localeOption('close');
      return /*#__PURE__*/React__namespace.createElement("button", {
        ref: closeRef,
        type: "button",
        className: "p-dialog-header-icon p-dialog-header-close p-link",
        "aria-label": ariaLabel,
        onClick: onClose
      }, /*#__PURE__*/React__namespace.createElement("span", {
        className: "p-dialog-header-close-icon pi pi-times",
        "aria-hidden": "true"
      }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    }
    return null;
  };
  var createMaximizeIcon = function createMaximizeIcon() {
    var iconClassName = utils.classNames('p-dialog-header-maximize-icon pi', {
      'pi-window-maximize': !maximized,
      'pi-window-minimize': maximized
    });
    if (props.maximizable) {
      return /*#__PURE__*/React__namespace.createElement("button", {
        type: "button",
        className: "p-dialog-header-icon p-dialog-header-maximize p-link",
        onClick: toggleMaximize
      }, /*#__PURE__*/React__namespace.createElement("span", {
        className: iconClassName
      }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    }
    return null;
  };
  var createHeader = function createHeader() {
    if (props.showHeader) {
      var closeIcon = createCloseIcon();
      var maximizeIcon = createMaximizeIcon();
      var icons = utils.ObjectUtils.getJSXElement(props.icons, props);
      var header = utils.ObjectUtils.getJSXElement(props.header, props);
      var headerId = idState + '_header';
      var headerClassName = utils.classNames('p-dialog-header', props.headerClassName);
      return /*#__PURE__*/React__namespace.createElement("div", {
        ref: headerRef,
        style: props.headerStyle,
        className: headerClassName,
        onMouseDown: onDragStart
      }, /*#__PURE__*/React__namespace.createElement("div", {
        id: headerId,
        className: "p-dialog-title"
      }, header), /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-dialog-header-icons"
      }, icons, maximizeIcon, closeIcon));
    }
    return null;
  };
  var createContent = function createContent() {
    var className = utils.classNames('p-dialog-content', props.contentClassName);
    var contentId = idState + '_content';
    return /*#__PURE__*/React__namespace.createElement("div", {
      id: contentId,
      ref: contentRef,
      className: className,
      style: props.contentStyle
    }, props.children);
  };
  var createFooter = function createFooter() {
    var footer = utils.ObjectUtils.getJSXElement(props.footer, props);
    return footer && /*#__PURE__*/React__namespace.createElement("div", {
      ref: footerRef,
      className: "p-dialog-footer"
    }, footer);
  };
  var createResizer = function createResizer() {
    if (props.resizable) {
      return /*#__PURE__*/React__namespace.createElement("span", {
        className: "p-resizable-handle",
        style: {
          zIndex: 90
        },
        onMouseDown: onResizeStart
      });
    }
    return null;
  };
  var createElement = function createElement() {
    var otherProps = utils.ObjectUtils.findDiffKeys(props, Dialog.defaultProps);
    var className = utils.classNames('p-dialog p-component', props.className, {
      'p-dialog-rtl': props.rtl,
      'p-dialog-maximized': maximized,
      'p-dialog-default': !maximized
    });
    var maskClassName = utils.classNames('p-dialog-mask', getPositionClass(), {
      'p-component-overlay p-component-overlay-enter': props.modal,
      'p-dialog-visible': maskVisibleState,
      'p-dialog-draggable': props.draggable,
      'p-dialog-resizable': props.resizable
    }, props.maskClassName);
    var header = createHeader();
    var content = createContent();
    var footer = createFooter();
    var resizer = createResizer();
    var headerId = idState + '_header';
    var contentId = idState + '_content';
    var transitionTimeout = {
      enter: props.position === 'center' ? 150 : 300,
      exit: props.position === 'center' ? 150 : 300
    };
    return /*#__PURE__*/React__namespace.createElement("div", {
      ref: maskRef,
      style: props.maskStyle,
      className: maskClassName,
      onClick: onMaskClick
    }, /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, {
      nodeRef: dialogRef,
      classNames: "p-dialog",
      timeout: transitionTimeout,
      "in": visibleState,
      options: props.transitionOptions,
      unmountOnExit: true,
      onEnter: onEnter,
      onEntered: onEntered,
      onExiting: onExiting,
      onExited: onExited
    }, /*#__PURE__*/React__namespace.createElement("div", _extends({
      ref: dialogRef,
      id: idState,
      className: className,
      style: props.style,
      onClick: props.onClick,
      role: "dialog"
    }, otherProps, {
      "aria-labelledby": headerId,
      "aria-describedby": contentId,
      "aria-modal": props.modal
    }), header, content, footer, resizer)));
  };
  var createDialog = function createDialog() {
    var element = createElement();
    return /*#__PURE__*/React__namespace.createElement(portal.Portal, {
      element: element,
      appendTo: props.appendTo,
      visible: true
    });
  };
  return maskVisibleState && createDialog();
});
Dialog.displayName = 'Dialog';
Dialog.defaultProps = {
  __TYPE: 'Dialog',
  appendTo: null,
  ariaCloseIconLabel: null,
  baseZIndex: 0,
  blockScroll: false,
  breakpoints: null,
  className: null,
  closable: true,
  closeOnEscape: true,
  contentClassName: null,
  contentStyle: null,
  dismissableMask: false,
  draggable: true,
  focusOnShow: true,
  footer: null,
  header: null,
  headerClassName: null,
  headerStyle: null,
  icons: null,
  id: null,
  keepInViewport: true,
  maskClassName: null,
  maskStyle: null,
  maximizable: false,
  maximized: false,
  minX: 0,
  minY: 0,
  modal: true,
  onClick: null,
  onDrag: null,
  onDragEnd: null,
  onDragStart: null,
  onHide: null,
  onMaskClick: null,
  onMaximize: null,
  onResize: null,
  onResizeEnd: null,
  onResizeStart: null,
  onShow: null,
  position: 'center',
  resizable: true,
  rtl: false,
  showHeader: true,
  style: null,
  transitionOptions: null,
  visible: false
};

exports.Dialog = Dialog;
