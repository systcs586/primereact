this.primereact = this.primereact || {};
this.primereact.avatar = (function (exports, React, utils) {
  'use strict';

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

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  var Avatar = /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var elementRef = React__namespace.useRef(null);
    var _React$useState = React__namespace.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      imageFailed = _React$useState2[0],
      setImageFailed = _React$useState2[1];
    var createContent = function createContent() {
      if (props.image && !imageFailed) {
        return /*#__PURE__*/React__namespace.createElement("img", {
          src: props.image,
          alt: props.imageAlt,
          onError: onImageError
        });
      } else if (props.label) {
        return /*#__PURE__*/React__namespace.createElement("span", {
          className: "p-avatar-text"
        }, props.label);
      } else if (props.icon) {
        return utils.IconUtils.getJSXIcon(props.icon, {
          className: 'p-avatar-icon'
        }, {
          props: props
        });
      }
      return null;
    };
    var onImageError = function onImageError(event) {
      if (props.imageFallback === 'default') {
        if (!props.onImageError) {
          // fallback to label or icon
          setImageFailed(true);
          event.target.src = null;
        }
      } else {
        // try fallback as an image
        event.target.src = props.imageFallback;
      }
      props.onImageError && props.onImageError(event);
    };
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    var otherProps = utils.ObjectUtils.findDiffKeys(props, Avatar.defaultProps);
    var containerClassName = utils.classNames('p-avatar p-component', {
      'p-avatar-image': props.image !== null && !imageFailed,
      'p-avatar-circle': props.shape === 'circle',
      'p-avatar-lg': props.size === 'large',
      'p-avatar-xl': props.size === 'xlarge',
      'p-avatar-clickable': !!props.onClick
    }, props.className);
    var content = props.template ? utils.ObjectUtils.getJSXElement(props.template, props) : createContent();
    return /*#__PURE__*/React__namespace.createElement("div", _extends({
      ref: elementRef,
      className: containerClassName,
      style: props.style
    }, otherProps), content, props.children);
  });
  Avatar.displayName = 'Avatar';
  Avatar.defaultProps = {
    __TYPE: 'Avatar',
    className: null,
    icon: null,
    image: null,
    imageAlt: 'avatar',
    imageFallback: 'default',
    label: null,
    onImageError: null,
    shape: 'square',
    size: 'normal',
    style: null,
    template: null
  };

  exports.Avatar = Avatar;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.utils);
