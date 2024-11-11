// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"AdminAccess.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var AdminAccess = function AdminAccess() {
  // console.log('From adminlogin.js');
  var openSignup = document.querySelector('.open-signup');
  var openSignin = document.querySelector('.open-signin');
  var signupForm = document.querySelector('.signup-form');
  var signinForm = document.querySelector('.signin-form');

  if (openSignup !== null && signupForm !== null) {
    openSignup.onclick = function () {
      signupForm.classList.remove('display-none');
      signinForm.classList.add('display-none');
    };
  } else {// console.log('opensignup and signupForm are null');
  }

  if (openSignin !== null && signinForm !== null) {
    openSignin.onclick = function () {
      signinForm.classList.remove('display-none');
      signupForm.classList.add('display-none');
    };
  } else {// console.log('openSignin and signinForm are both null');
  }
};

var _default = AdminAccess;
exports.default = _default;
},{}],"MobileNav.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var MobileNav = function MobileNav() {
  var menuBtn = document.querySelector('.menu-btn');
  var menuBtnIcon = document.querySelector('.menu-btn i');
  var menuNavBg = document.querySelector('.menu-nav-bg');
  var header = document.querySelector('.header');
  menuBtn.addEventListener('click', function (e) {
    if (header.classList.contains('open-mobile-nav')) {
      header.classList.remove('open-mobile-nav');
      menuBtnIcon.classList.remove('fa-times');
      menuBtnIcon.classList.add('fa-bars');
      menuNavBg.classList.remove('show-modal-bg');
    } else {
      header.classList.add('open-mobile-nav');
      menuBtnIcon.classList.add('fa-times');
      menuBtnIcon.classList.remove('fa-bars');
      menuNavBg.classList.add('show-modal-bg');
    }
  });
};

var _default = MobileNav;
exports.default = _default;
},{}],"UserComment.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var UserComment = function UserComment() {
  var focusCommentBtn = document.querySelector('.focus-comment-btn');
  var commentAuthorField = document.getElementById('comment-author'); // console.log(focusCommentBtn, commentAuthorField);

  if (focusCommentBtn !== null && commentAuthorField !== null) {
    focusCommentBtn.addEventListener('click', function (e) {
      commentAuthorField.focus();
    });
  }
};

var _default = UserComment;
exports.default = _default;
},{}],"script.js":[function(require,module,exports) {
"use strict";

var _AdminAccess = _interopRequireDefault(require("./AdminAccess"));

var _MobileNav = _interopRequireDefault(require("./MobileNav"));

var _UserComment = _interopRequireDefault(require("./UserComment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log("SIRIMAZONE");
(0, _AdminAccess.default)();
(0, _MobileNav.default)();
(0, _UserComment.default)();
},{"./AdminAccess":"AdminAccess.js","./MobileNav":"MobileNav.js","./UserComment":"UserComment.js"}]},{},["script.js"], null)