'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.bridge = exports.Promise = exports.cleanUpWindow = undefined;

var _public = require('./public');

Object.keys(_public).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _public[key];
        }
    });
});

var _clean = require('./clean');

Object.defineProperty(exports, 'cleanUpWindow', {
    enumerable: true,
    get: function get() {
        return _clean.cleanUpWindow;
    }
});

var _src = require('zalgo-promise/src');

Object.defineProperty(exports, 'Promise', {
    enumerable: true,
    get: function get() {
        return _src.ZalgoPromise;
    }
});
exports.init = init;

var _lib = require('./lib');

var _drivers = require('./drivers');

var _global = require('./global');

var _interface = require('./bridge/interface');

var popupBridge = _interopRequireWildcard(_interface);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var bridge = exports.bridge = __IE_POPUP_SUPPORT__ ? popupBridge : null;

function init() {
    if (!_global.global.initialized) {
        (0, _drivers.listenForMessages)();

        if (__IE_POPUP_SUPPORT__) {
            require('./bridge').openTunnelToOpener();
        }

        (0, _lib.initOnReady)();
        (0, _lib.listenForMethods)({ on: _public.on, send: _public.send });
    }

    _global.global.initialized = true;
}

init();