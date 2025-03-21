'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var hooks = require('primereact/hooks');
var api = require('primereact/api');
var utils = require('primereact/utils');
var button = require('primereact/button');
var ripple = require('primereact/ripple');

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

var OrderListControls = /*#__PURE__*/React__namespace.memo(function (props) {
  var moveUp = function moveUp(event) {
    if (props.selection) {
      var value = _toConsumableArray(props.value);
      for (var i = 0; i < props.selection.length; i++) {
        var selectedItem = props.selection[i];
        var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, value, props.dataKey);
        if (selectedItemIndex !== 0) {
          var movedItem = value[selectedItemIndex];
          var temp = value[selectedItemIndex - 1];
          value[selectedItemIndex - 1] = movedItem;
          value[selectedItemIndex] = temp;
        } else {
          break;
        }
      }
      if (props.onReorder) {
        props.onReorder({
          originalEvent: event,
          value: value,
          direction: 'up'
        });
      }
    }
  };
  var moveTop = function moveTop(event) {
    if (props.selection) {
      var value = _toConsumableArray(props.value);
      for (var i = 0; i < props.selection.length; i++) {
        var selectedItem = props.selection[i];
        var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, value, props.dataKey);
        if (selectedItemIndex !== 0) {
          var movedItem = value.splice(selectedItemIndex, 1)[0];
          value.unshift(movedItem);
        } else {
          break;
        }
      }
      if (props.onReorder) {
        props.onReorder({
          originalEvent: event,
          value: value,
          direction: 'top'
        });
      }
    }
  };
  var moveDown = function moveDown(event) {
    if (props.selection) {
      var value = _toConsumableArray(props.value);
      for (var i = props.selection.length - 1; i >= 0; i--) {
        var selectedItem = props.selection[i];
        var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, value, props.dataKey);
        if (selectedItemIndex !== value.length - 1) {
          var movedItem = value[selectedItemIndex];
          var temp = value[selectedItemIndex + 1];
          value[selectedItemIndex + 1] = movedItem;
          value[selectedItemIndex] = temp;
        } else {
          break;
        }
      }
      if (props.onReorder) {
        props.onReorder({
          originalEvent: event,
          value: value,
          direction: 'down'
        });
      }
    }
  };
  var moveBottom = function moveBottom(event) {
    if (props.selection) {
      var value = _toConsumableArray(props.value);
      for (var i = props.selection.length - 1; i >= 0; i--) {
        var selectedItem = props.selection[i];
        var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, value, props.dataKey);
        if (selectedItemIndex !== value.length - 1) {
          var movedItem = value.splice(selectedItemIndex, 1)[0];
          value.push(movedItem);
        } else {
          break;
        }
      }
      if (props.onReorder) {
        props.onReorder({
          originalEvent: event,
          value: value,
          direction: 'bottom'
        });
      }
    }
  };
  return /*#__PURE__*/React__namespace.createElement("div", {
    className: "p-orderlist-controls"
  }, /*#__PURE__*/React__namespace.createElement(button.Button, {
    type: "button",
    icon: "pi pi-angle-up",
    onClick: moveUp
  }), /*#__PURE__*/React__namespace.createElement(button.Button, {
    type: "button",
    icon: "pi pi-angle-double-up",
    onClick: moveTop
  }), /*#__PURE__*/React__namespace.createElement(button.Button, {
    type: "button",
    icon: "pi pi-angle-down",
    onClick: moveDown
  }), /*#__PURE__*/React__namespace.createElement(button.Button, {
    type: "button",
    icon: "pi pi-angle-double-down",
    onClick: moveBottom
  }));
});
OrderListControls.displayName = 'OrderListControls';

var OrderListSubList = /*#__PURE__*/React__namespace.memo(function (props) {
  var dragging = React__namespace.useRef(null);
  var draggedItemIndex = React__namespace.useRef(null);
  var dragOverItemIndex = React__namespace.useRef(null);
  var listElementRef = React__namespace.useRef(null);
  var filterOptions = {
    filter: function filter(e) {
      return props.onFilterInputChange(e);
    },
    reset: function reset() {
      return props.resetFilter();
    }
  };
  var isSelected = function isSelected(item) {
    return utils.ObjectUtils.findIndexInList(item, props.selection, props.dataKey) !== -1;
  };
  var _onDragStart = function onDragStart(event, index) {
    dragging.current = true;
    draggedItemIndex.current = index;
    if (props.dragdropScope) {
      event.dataTransfer.setData('text', 'orderlist');
    }
  };
  var _onDragOver = function onDragOver(event, index) {
    if (draggedItemIndex.current !== index && draggedItemIndex.current + 1 !== index) {
      dragOverItemIndex.current = index;
      utils.DomHandler.addClass(event.target, 'p-orderlist-droppoint-highlight');
      event.preventDefault();
    }
  };
  var onDragLeave = function onDragLeave(event) {
    dragOverItemIndex.current = null;
    utils.DomHandler.removeClass(event.target, 'p-orderlist-droppoint-highlight');
  };
  var onDrop = function onDrop(event) {
    var dropIndex = draggedItemIndex.current > dragOverItemIndex.current ? dragOverItemIndex.current : dragOverItemIndex.current === 0 ? 0 : dragOverItemIndex.current - 1;
    var value = _toConsumableArray(props.value);
    utils.ObjectUtils.reorderArray(value, draggedItemIndex.current, dropIndex);
    dragOverItemIndex.current = null;
    utils.DomHandler.removeClass(event.target, 'p-orderlist-droppoint-highlight');
    if (props.onChange) {
      props.onChange({
        originalEvent: event,
        value: value
      });
    }
  };
  var onDragEnd = function onDragEnd(event) {
    dragging.current = false;
  };
  var onListMouseMove = function onListMouseMove(event) {
    if (dragging.current) {
      var offsetY = listElementRef.current.getBoundingClientRect().top + utils.DomHandler.getWindowScrollTop();
      var bottomDiff = offsetY + listElementRef.current.clientHeight - event.pageY;
      var topDiff = event.pageY - offsetY;
      if (bottomDiff < 25 && bottomDiff > 0) listElementRef.current.scrollTop += 15;else if (topDiff < 25 && topDiff > 0) listElementRef.current.scrollTop -= 15;
    }
  };
  var onFilterInputKeyDown = function onFilterInputKeyDown(event) {
    //enter
    if (event.which === 13) {
      event.preventDefault();
    }
  };
  var createDropPoint = function createDropPoint(index, key) {
    return /*#__PURE__*/React__namespace.createElement("li", {
      key: key,
      className: "p-orderlist-droppoint",
      onDragOver: function onDragOver(e) {
        return _onDragOver(e, index + 1);
      },
      onDragLeave: onDragLeave,
      onDrop: onDrop
    });
  };
  var createHeader = function createHeader() {
    return props.header ? /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-orderlist-header"
    }, props.header) : null;
  };
  var createItems = function createItems() {
    if (props.value) {
      return props.value.map(function (item, i) {
        var content = props.itemTemplate ? props.itemTemplate(item) : item;
        var itemClassName = utils.classNames('p-orderlist-item', {
          'p-highlight': isSelected(item)
        }, props.className);
        var key = JSON.stringify(item);
        if (props.dragdrop) {
          var items = [];
          if (i === 0) {
            items.push(createDropPoint(item, i));
          }
          items.push( /*#__PURE__*/React__namespace.createElement("li", {
            key: key,
            className: itemClassName,
            onClick: function onClick(e) {
              return props.onItemClick({
                originalEvent: e,
                value: item,
                index: i
              });
            },
            onKeyDown: function onKeyDown(e) {
              return props.onItemKeyDown({
                originalEvent: e,
                value: item,
                index: i
              });
            },
            role: "option",
            "aria-selected": isSelected(item),
            draggable: "true",
            onDragStart: function onDragStart(e) {
              return _onDragStart(e, i);
            },
            onDragEnd: onDragEnd,
            tabIndex: props.tabIndex
          }, content, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)));
          items.push(createDropPoint(i, key + '_droppoint'));
          return items;
        } else {
          return /*#__PURE__*/React__namespace.createElement("li", {
            key: key,
            className: itemClassName,
            role: "option",
            "aria-selected": isSelected(item),
            onClick: function onClick(e) {
              return props.onItemClick({
                originalEvent: e,
                value: item,
                index: i
              });
            },
            onKeyDown: function onKeyDown(e) {
              return props.onItemKeyDown({
                originalEvent: e,
                value: item,
                index: i
              });
            },
            tabIndex: props.tabIndex
          }, content);
        }
      });
    }
    return null;
  };
  var createList = function createList() {
    var items = createItems();
    return /*#__PURE__*/React__namespace.createElement("ul", {
      ref: listElementRef,
      className: "p-orderlist-list",
      style: props.listStyle,
      onDragOver: onListMouseMove,
      role: "listbox",
      "aria-multiselectable": true
    }, items);
  };
  var createFilter = function createFilter() {
    if (props.filter) {
      var content = /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-orderlist-filter"
      }, /*#__PURE__*/React__namespace.createElement("input", {
        type: "text",
        value: props.filterValue,
        onChange: props.onFilter,
        onKeyDown: onFilterInputKeyDown,
        placeholder: props.placeholder,
        className: "p-orderlist-filter-input p-inputtext p-component"
      }), /*#__PURE__*/React__namespace.createElement("span", {
        className: "p-orderlist-filter-icon pi pi-search"
      }));
      if (props.filterTemplate) {
        var defaultContentOptions = {
          className: 'p-orderlist-filter',
          inputProps: {
            inputClassName: 'p-orderlist-filter-input p-inputtext p-component',
            onChange: props.onFilter,
            onKeyDown: onFilterInputKeyDown
          },
          filterOptions: filterOptions,
          iconClassName: 'p-orderlist-filter-icon pi pi-search',
          element: content,
          props: props
        };
        content = utils.ObjectUtils.getJSXElement(props.filterTemplate, defaultContentOptions);
      }
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-orderlist-filter-container"
      }, content);
    }
    return null;
  };
  var header = createHeader();
  var filter = createFilter();
  var list = createList();
  return /*#__PURE__*/React__namespace.createElement("div", {
    className: "p-orderlist-list-container"
  }, header, filter, list);
});
OrderListSubList.displayName = 'OrderListSubList';

var OrderList = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
  var _React$useState = React__namespace.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    selectionState = _React$useState2[0],
    setSelectionState = _React$useState2[1];
  var _React$useState3 = React__namespace.useState(''),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    filterValueState = _React$useState4[0],
    setFilterValueState = _React$useState4[1];
  var hasFilter = utils.ObjectUtils.isNotEmpty(filterValueState);
  var elementRef = React__namespace.useRef(null);
  var reorderDirection = React__namespace.useRef(null);
  var onItemClick = function onItemClick(event) {
    var metaKey = event.originalEvent.metaKey || event.originalEvent.ctrlKey;
    var index = utils.ObjectUtils.findIndexInList(event.value, selectionState, props.dataKey);
    var selected = index !== -1;
    var newSelection;
    if (selected) newSelection = metaKey ? selectionState.filter(function (_, i) {
      return i !== index;
    }) : [event.value];else newSelection = metaKey ? [].concat(_toConsumableArray(selectionState), [event.value]) : [event.value];
    setSelectionState(newSelection);
  };
  var onItemKeyDown = function onItemKeyDown(event) {
    var originalEvent = event.originalEvent;
    var listItem = originalEvent.currentTarget;
    switch (originalEvent.which) {
      //down
      case 40:
        var nextItem = findNextItem(listItem);
        nextItem && nextItem.focus();
        originalEvent.preventDefault();
        break;

      //up
      case 38:
        var prevItem = findPrevItem(listItem);
        prevItem && prevItem.focus();
        originalEvent.preventDefault();
        break;

      //enter
      case 13:
        onItemClick(event);
        originalEvent.preventDefault();
        break;
    }
  };
  var onFilter = function onFilter(event) {
    var _filterValue = event.target.value;
    setFilterValueState(_filterValue);
    if (props.onFilter) {
      props.onFilter({
        originalEvent: event,
        value: _filterValue
      });
    }
  };
  var resetFilter = function resetFilter() {
    setFilterValueState('');
    props.onFilter && props.onFilter({
      filter: ''
    });
  };
  var onFilterInputChange = function onFilterInputChange(event) {
    var filter = event.target.value;
    setFilterValueState(filter);
    if (props.onFilter) {
      props.onFilter({
        originalEvent: event,
        filter: filter
      });
    }
  };
  var getVisibleList = function getVisibleList() {
    if (hasFilter) {
      var filterValue = filterValueState.trim().toLocaleLowerCase(props.filterLocale);
      var searchFields = props.filterBy ? props.filterBy.split(',') : [];
      return api.FilterService.filter(props.value, searchFields, filterValue, props.filterMatchMode, props.filterLocale);
    }
    return props.value;
  };
  var findNextItem = function findNextItem(item) {
    var nextItem = item.nextElementSibling;
    return nextItem ? !utils.DomHandler.hasClass(nextItem, 'p-orderlist-item') ? findNextItem(nextItem) : nextItem : null;
  };
  var findPrevItem = function findPrevItem(item) {
    var prevItem = item.previousElementSibling;
    return prevItem ? !utils.DomHandler.hasClass(prevItem, 'p-orderlist-item') ? findPrevItem(prevItem) : prevItem : null;
  };
  var onReorder = function onReorder(event) {
    if (props.onChange) {
      props.onChange({
        event: event.originalEvent,
        value: event.value
      });
    }
    reorderDirection.current = event.direction;
  };
  var updateListScroll = function updateListScroll() {
    var list = utils.DomHandler.findSingle(elementRef.current, '.p-orderlist-list');
    var listItems = utils.DomHandler.find(list, '.p-orderlist-item.p-highlight');
    if (listItems && listItems.length) {
      switch (reorderDirection.current) {
        case 'up':
          utils.DomHandler.scrollInView(list, listItems[0]);
          break;
        case 'top':
          list.scrollTop = 0;
          break;
        case 'down':
          utils.DomHandler.scrollInView(list, listItems[listItems.length - 1]);
          break;
        case 'bottom':
          /* TODO: improve this code block */
          setTimeout(function () {
            return list.scrollTop = list.scrollHeight;
          }, 100);
          break;
      }
    }
  };
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  hooks.useUpdateEffect(function () {
    if (reorderDirection.current) {
      updateListScroll();
      reorderDirection.current = null;
    }
  });
  var otherProps = utils.ObjectUtils.findDiffKeys(props, OrderList.defaultProps);
  var className = utils.classNames('p-orderlist p-component', props.className);
  var visibleList = getVisibleList();
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    ref: elementRef,
    id: props.id,
    className: className,
    style: props.style
  }, otherProps), /*#__PURE__*/React__namespace.createElement(OrderListControls, {
    value: visibleList,
    selection: selectionState,
    onReorder: onReorder,
    dataKey: props.dataKey
  }), /*#__PURE__*/React__namespace.createElement(OrderListSubList, {
    value: visibleList,
    selection: selectionState,
    onItemClick: onItemClick,
    onItemKeyDown: onItemKeyDown,
    onFilterInputChange: onFilterInputChange,
    itemTemplate: props.itemTemplate,
    filter: props.filter,
    onFilter: onFilter,
    resetFilter: resetFilter,
    filterTemplate: props.filterTemplate,
    header: props.header,
    listStyle: props.listStyle,
    dataKey: props.dataKey,
    dragdrop: props.dragdrop,
    onChange: props.onChange,
    tabIndex: props.tabIndex
  }));
}));
OrderList.displayName = 'OrderList';
OrderList.defaultProps = {
  __TYPE: 'OrderList',
  id: null,
  value: null,
  header: null,
  style: null,
  className: null,
  listStyle: null,
  dragdrop: false,
  tabIndex: 0,
  dataKey: null,
  onChange: null,
  itemTemplate: null,
  filter: false,
  filterBy: null,
  filterMatchMode: 'contains',
  filterLocale: undefined,
  filterPlaceholder: null,
  filterTemplate: null,
  onFilter: null
};

exports.OrderList = OrderList;
