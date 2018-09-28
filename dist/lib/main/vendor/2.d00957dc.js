(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./src/modules/Display/index.js":
/*!**************************************!*\
  !*** ./src/modules/Display/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "./node_modules/_react@16.5.2@react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactGridLayout = __webpack_require__(/*! react-grid-layout */ "./node_modules/_react-grid-layout@0.16.6@react-grid-layout/index.js");

var _reactGridLayout2 = _interopRequireDefault(_reactGridLayout);

__webpack_require__(/*! react-grid-layout/css/styles.css */ "./node_modules/_react-grid-layout@0.16.6@react-grid-layout/css/styles.css");

__webpack_require__(/*! react-resizable/css/styles.css */ "./node_modules/_react-resizable@1.7.5@react-resizable/css/styles.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Author: zy9@github.com/zy410419243
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Date: 2018-09-28 09:01:44
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Last Modified by: zy9
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Last Modified time: 2018-09-28 15:45:53
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Display = function (_Component) {
    _inherits(Display, _Component);

    function Display(props) {
        _classCallCheck(this, Display);

        var _this = _possibleConstructorReturn(this, (Display.__proto__ || Object.getPrototypeOf(Display)).call(this, props));

        _this.componentDidMount = function () {
            _this.loadLayout(function () {
                var layout = _this.state.layout;

                var pathArr = [];

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = layout[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var item = _step.value;
                        var path = item.path,
                            type = item.type;


                        type != 'iframe' && pathArr.push('import(\'' + path + '\')');
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                pathArr = '[' + pathArr.toString() + ']';

                /* eslint-disable no-eval */
                Promise.all(eval('' + pathArr)).then(function (modules) {
                    for (var i = 0; i < modules.length; i++) {
                        var TestModule = modules[i].TestModule;
                        var key = layout[i].i;

                        var testModule = new TestModule(_this[key]);
                        var _moduleOnMount = testModule._moduleOnMount;


                        _moduleOnMount && _moduleOnMount.call(testModule);
                    }
                });
            });
        };

        _this.transStaticDatas = function (dataSource) {
            var result = [];

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = dataSource[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var item = _step2.value;

                    result.push(Object.assign({}, item, { static: true }));
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return result;
        };

        _this.loadLayout = function (callback) {
            fetch('../../../mock/layoutDatas.json').then(function (result) {
                return result.json();
            }).then(function (result) {
                var layout = result.layout;


                _this.setState({ layout: _this.transStaticDatas(layout) }, function () {
                    return callback && callback();
                });
            });
        };

        _this.render = function () {
            var layout = _this.state.layout;


            var layoutProps = {
                className: 'layout',
                // layout,
                cols: 12,
                rowHeight: 30,
                width: document.documentElement.clientWidth || document.body.clientWidth,
                margin: [10, 10]
            };

            return _react2.default.createElement(
                'div',
                { className: 'Display' },
                _react2.default.createElement(
                    _reactGridLayout2.default,
                    layoutProps,
                    layout.map(function (item) {
                        var i = item.i,
                            type = item.type,
                            path = item.path;


                        return type == 'iframe' ? _react2.default.createElement(
                            'div',
                            { key: i, 'data-grid': item },
                            _react2.default.createElement('iframe', { src: path, style: { border: 'none', width: '100%', height: '100%', overflow: 'auto' } })
                        ) : _react2.default.createElement('div', { key: i, 'data-grid': item, style: { background: '#ccc' }, ref: function ref(_ref) {
                                return _this[i] = _ref;
                            } });
                    })
                )
            );
        };

        _this.state = {
            layout: []
        };
        return _this;
    }

    return Display;
}(_react.Component);

exports.default = Display;

/***/ })

}]);
//# sourceMappingURL=2.d00957dc.js.map