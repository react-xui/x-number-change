'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @Author: 田想兵
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @Date: 2020-10-27 17:58:35
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @LastEditTime: 2020-10-30 15:00:31
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @github: https://github.com/tianxiangbing
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @Contact: 55342775@qq.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */

exports.default = NumberChange;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getNumber(value) {
  if (!isNaN(value)) {
    return Number(value);
  } else {
    return 0;
  }
}
/**
 * @description: 两个数值比较
 * @param {*}
 * @return {*}
 */
function compare(a, b) {
  if (typeof a === 'undefined' || typeof b === 'undefined') {
    return 0;
  }
  var av = Number(String(a).replace(/\,/g, ''));
  var bv = Number(String(b).replace(/\,/g, ''));
  if (av > bv) {
    return 1;
  }
  if (av < bv) {
    return -1;
  }
  return 2;
}
/**
 * @description: 针对数字的变化而变化,
 * @param {value} 传入值
 * @param {defaultValue} 如果传入的是非数字的话，展示的默认值
 * @param {timer} 传入值则定时展示显示效果
 * @return {*}
 */
function NumberChange(props) {
  var _useState = (0, _react.useState)(props.value),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var _useState3 = (0, _react.useState)([props.className]),
      _useState4 = _slicedToArray(_useState3, 2),
      cls = _useState4[0],
      setCls = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      timer = _useState6[0],
      setTimer = _useState6[1];

  (0, _react.useEffect)(function () {
    var compareValue = compare(props.value, value);
    if (compareValue === 1) {
      //上涨
      cls[1] = 'x-up';
      props.onChange && props.onChange('up', props.value, value);
    }
    if (compareValue === -1) {
      //下跌
      cls[1] = 'x-down';
      props.onChange && props.onChange('down', props.value, value);
    }
    if (compareValue === 0 || compareValue == 2) {
      cls[1] = '';
    }
    if (props.timer) {
      if (timer) {
        clearTimeout(timer);
        setTimer(null);
      }
      timer = setTimeout(function () {
        cls[1] = '';
        setCls(cls);
        clearTimeout(timer);
        setTimer(null);
      }, props.timer);
      setTimer(timer);
    }
    setCls(cls);
    setValue(props.value);
  }, [props.value]);
  (0, _react.useEffect)(function () {
    return function () {
      // console.log('unmount')
      if (timer) {
        clearTimeout(timer);
        setTimer(null);
      }
    };
  }, []);
  var clss = cls.join(' ');
  return _react2.default.createElement(
    'div',
    { className: clss },
    _react2.default.createElement('i', null),
    value
  );
}