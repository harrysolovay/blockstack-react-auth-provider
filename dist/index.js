'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthProvider = exports.AuthConsumer = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _blockstack = require('blockstack');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INITIAL_STATE = {
  isLoading: true,
  loggedIn: false,
  username: null,
  name: null
};

var _createContext = (0, _react.createContext)(INITIAL_STATE),
    Provider = _createContext.Provider,
    Consumer = _createContext.Consumer;

var AuthConsumer = exports.AuthConsumer = function (_Component) {
  (0, _inherits3.default)(AuthConsumer, _Component);

  function AuthConsumer() {
    (0, _classCallCheck3.default)(this, AuthConsumer);
    return (0, _possibleConstructorReturn3.default)(this, (AuthConsumer.__proto__ || (0, _getPrototypeOf2.default)(AuthConsumer)).apply(this, arguments));
  }

  (0, _createClass3.default)(AuthConsumer, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return (0, _jsx3.default)(Consumer, {}, void 0, function (props) {
        return _this2.props.children((0, _extends3.default)({}, props));
      });
    }
  }]);
  return AuthConsumer;
}(_react.Component);

var AuthProvider = exports.AuthProvider = function (_Component2) {
  (0, _inherits3.default)(AuthProvider, _Component2);

  function AuthProvider() {
    var _ref;

    var _temp, _this3, _ret;

    (0, _classCallCheck3.default)(this, AuthProvider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this3 = (0, _possibleConstructorReturn3.default)(this, (_ref = AuthProvider.__proto__ || (0, _getPrototypeOf2.default)(AuthProvider)).call.apply(_ref, [this].concat(args))), _this3), _this3.state = INITIAL_STATE, _this3.info = function () {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _blockstack.loadUserData)(),
          username = _ref2.username,
          name = _ref2.profile.name;

      return {
        username: username,
        name: name,
        loggedIn: true
      };
    }, _this3.logIn = function () {
      _this3.setState(function (state) {
        return (0, _extends3.default)({}, state, {
          isLoading: true
        });
      });
      var origin = window.location.origin;
      (0, _blockstack.redirectToSignIn)(origin, origin + '/manifest.json', ['store_write', 'publish_data']);
    }, _this3.logOut = function () {
      (0, _blockstack.signUserOut)(window.location.origin);
      _this3.setState(function (state) {
        return (0, _extends3.default)({}, state, {
          INITIAL_STATE: INITIAL_STATE,
          isLoading: false
        });
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this3, _ret);
  }

  (0, _createClass3.default)(AuthProvider, [{
    key: 'render',
    value: function render() {
      var state = this.state,
          logIn = this.logIn,
          logOut = this.logOut;


      return _react2.default.createElement(Provider, (0, _extends3.default)({
        value: { state: state, logIn: logIn, logOut: logOut }
      }, this.props));
    }
  }, {
    key: 'componentDidMount',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _this4 = this;

        var user;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:

                this.setState(function (state) {
                  return (0, _extends3.default)({}, state, {
                    isLoading: true
                  });
                });

                if (!(0, _blockstack.isSignInPending)()) {
                  _context.next = 14;
                  break;
                }

                _context.prev = 2;
                _context.next = 5;
                return (0, _blockstack.handlePendingSignIn)();

              case 5:
                user = _context.sent;

                if (user) {
                  this.setState(function (state) {
                    return (0, _extends3.default)({}, state, _this4.info(user), {
                      isLoading: false
                    });
                  });
                }
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context['catch'](2);

                console.error('failed to handle pending sign-in: ' + _context.t0);

              case 12:
                _context.next = 15;
                break;

              case 14:
                if ((0, _blockstack.isUserSignedIn)()) {
                  this.setState(function (state) {
                    return (0, _extends3.default)({}, state, _this4.info(), {
                      isLoading: false
                    });
                  });
                } else {

                  if (window.location.pathname.indexOf('account') >= 0) {
                    window.location = window.location.protocol + '//' + window.location.host;
                  }

                  this.setState(function (state) {
                    return (0, _extends3.default)({}, state, {
                      INITIAL_STATE: INITIAL_STATE,
                      isLoading: false
                    });
                  });
                }

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 9]]);
      }));

      function componentDidMount() {
        return _ref3.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }]);
  return AuthProvider;
}(_react.Component);