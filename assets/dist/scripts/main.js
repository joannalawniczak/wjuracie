(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("APP", [], factory);
	else if(typeof exports === 'object')
		exports["APP"] = factory();
	else
		root["APP"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _smoothScroll = __webpack_require__(1);

	var _smoothScroll2 = _interopRequireDefault(_smoothScroll);

	var _mobileNavigation = __webpack_require__(2);

	var _mobileNavigation2 = _interopRequireDefault(_mobileNavigation);

	var _animatedlabel = __webpack_require__(3);

	var _animatedlabel2 = _interopRequireDefault(_animatedlabel);

	var _contactform = __webpack_require__(4);

	var _contactform2 = _interopRequireDefault(_contactform);

	__webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _mobileNavigation2.default)(document.querySelector('.page-header'));
	(0, _animatedlabel2.default)(document.querySelectorAll('form .control'));
	(0, _contactform2.default)(document.querySelector('form'));
	_smoothScroll2.default.init({ speed: 700 });

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/*!
	 * smooth-scroll v10.2.1: Animate scrolling to anchor links
	 * (c) 2016 Chris Ferdinandi
	 * MIT License
	 * http://github.com/cferdinandi/smooth-scroll
	 */

	(function (root, factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory(root)), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
			module.exports = factory(root);
		} else {
			root.smoothScroll = factory(root);
		}
	})(typeof global !== 'undefined' ? global : undefined.window || undefined.global, function (root) {

		'use strict';

		//
		// Variables
		//

		var smoothScroll = {}; // Object for public APIs
		var supports = 'querySelector' in document && 'addEventListener' in root; // Feature test
		var settings, anchor, toggle, fixedHeader, headerHeight, eventTimeout, animationInterval;

		// Default settings
		var defaults = {
			selector: '[data-scroll]',
			selectorHeader: null,
			speed: 500,
			easing: 'easeInOutCubic',
			offset: 0,
			callback: function callback() {}
		};

		//
		// Methods
		//

		/**
	  * Merge two or more objects. Returns a new object.
	  * @private
	  * @param {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
	  * @param {Object}   objects  The objects to merge together
	  * @returns {Object}          Merged values of defaults and options
	  */
		var extend = function extend() {

			// Variables
			var extended = {};
			var deep = false;
			var i = 0;
			var length = arguments.length;

			// Check if a deep merge
			if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
				deep = arguments[0];
				i++;
			}

			// Merge the object into the extended object
			var merge = function merge(obj) {
				for (var prop in obj) {
					if (Object.prototype.hasOwnProperty.call(obj, prop)) {
						// If deep merge and property is an object, merge properties
						if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
							extended[prop] = extend(true, extended[prop], obj[prop]);
						} else {
							extended[prop] = obj[prop];
						}
					}
				}
			};

			// Loop through each object and conduct a merge
			for (; i < length; i++) {
				var obj = arguments[i];
				merge(obj);
			}

			return extended;
		};

		/**
	  * Get the height of an element.
	  * @private
	  * @param  {Node} elem The element to get the height of
	  * @return {Number}    The element's height in pixels
	  */
		var getHeight = function getHeight(elem) {
			return Math.max(elem.scrollHeight, elem.offsetHeight, elem.clientHeight);
		};

		/**
	  * Get the closest matching element up the DOM tree.
	  * @private
	  * @param  {Element} elem     Starting element
	  * @param  {String}  selector Selector to match against
	  * @return {Boolean|Element}  Returns null if not match found
	  */
		var getClosest = function getClosest(elem, selector) {

			// Element.matches() polyfill
			if (!Element.prototype.matches) {
				Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
					var matches = (this.document || this.ownerDocument).querySelectorAll(s),
					    i = matches.length;
					while (--i >= 0 && matches.item(i) !== this) {}
					return i > -1;
				};
			}

			// Get closest match
			for (; elem && elem !== document; elem = elem.parentNode) {
				if (elem.matches(selector)) return elem;
			}

			return null;
		};

		/**
	  * Escape special characters for use with querySelector
	  * @private
	  * @param {String} id The anchor ID to escape
	  * @author Mathias Bynens
	  * @link https://github.com/mathiasbynens/CSS.escape
	  */
		var escapeCharacters = function escapeCharacters(id) {

			// Remove leading hash
			if (id.charAt(0) === '#') {
				id = id.substr(1);
			}

			var string = String(id);
			var length = string.length;
			var index = -1;
			var codeUnit;
			var result = '';
			var firstCodeUnit = string.charCodeAt(0);
			while (++index < length) {
				codeUnit = string.charCodeAt(index);
				// Note: there’s no need to special-case astral symbols, surrogate
				// pairs, or lone surrogates.

				// If the character is NULL (U+0000), then throw an
				// `InvalidCharacterError` exception and terminate these steps.
				if (codeUnit === 0x0000) {
					throw new InvalidCharacterError('Invalid character: the input contains U+0000.');
				}

				if (
				// If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
				// U+007F, […]
				codeUnit >= 0x0001 && codeUnit <= 0x001F || codeUnit == 0x007F ||
				// If the character is the first character and is in the range [0-9]
				// (U+0030 to U+0039), […]
				index === 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039 ||
				// If the character is the second character and is in the range [0-9]
				// (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
				index === 1 && codeUnit >= 0x0030 && codeUnit <= 0x0039 && firstCodeUnit === 0x002D) {
					// http://dev.w3.org/csswg/cssom/#escape-a-character-as-code-point
					result += '\\' + codeUnit.toString(16) + ' ';
					continue;
				}

				// If the character is not handled by one of the above rules and is
				// greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
				// is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
				// U+005A), or [a-z] (U+0061 to U+007A), […]
				if (codeUnit >= 0x0080 || codeUnit === 0x002D || codeUnit === 0x005F || codeUnit >= 0x0030 && codeUnit <= 0x0039 || codeUnit >= 0x0041 && codeUnit <= 0x005A || codeUnit >= 0x0061 && codeUnit <= 0x007A) {
					// the character itself
					result += string.charAt(index);
					continue;
				}

				// Otherwise, the escaped character.
				// http://dev.w3.org/csswg/cssom/#escape-a-character
				result += '\\' + string.charAt(index);
			}

			return '#' + result;
		};

		/**
	  * Calculate the easing pattern
	  * @private
	  * @link https://gist.github.com/gre/1650294
	  * @param {String} type Easing pattern
	  * @param {Number} time Time animation should take to complete
	  * @returns {Number}
	  */
		var easingPattern = function easingPattern(type, time) {
			var pattern;
			if (type === 'easeInQuad') pattern = time * time; // accelerating from zero velocity
			if (type === 'easeOutQuad') pattern = time * (2 - time); // decelerating to zero velocity
			if (type === 'easeInOutQuad') pattern = time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time; // acceleration until halfway, then deceleration
			if (type === 'easeInCubic') pattern = time * time * time; // accelerating from zero velocity
			if (type === 'easeOutCubic') pattern = --time * time * time + 1; // decelerating to zero velocity
			if (type === 'easeInOutCubic') pattern = time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration
			if (type === 'easeInQuart') pattern = time * time * time * time; // accelerating from zero velocity
			if (type === 'easeOutQuart') pattern = 1 - --time * time * time * time; // decelerating to zero velocity
			if (type === 'easeInOutQuart') pattern = time < 0.5 ? 8 * time * time * time * time : 1 - 8 * --time * time * time * time; // acceleration until halfway, then deceleration
			if (type === 'easeInQuint') pattern = time * time * time * time * time; // accelerating from zero velocity
			if (type === 'easeOutQuint') pattern = 1 + --time * time * time * time * time; // decelerating to zero velocity
			if (type === 'easeInOutQuint') pattern = time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * --time * time * time * time * time; // acceleration until halfway, then deceleration
			return pattern || time; // no easing, no acceleration
		};

		/**
	  * Calculate how far to scroll
	  * @private
	  * @param {Element} anchor The anchor element to scroll to
	  * @param {Number} headerHeight Height of a fixed header, if any
	  * @param {Number} offset Number of pixels by which to offset scroll
	  * @returns {Number}
	  */
		var getEndLocation = function getEndLocation(anchor, headerHeight, offset) {
			var location = 0;
			if (anchor.offsetParent) {
				do {
					location += anchor.offsetTop;
					anchor = anchor.offsetParent;
				} while (anchor);
			}
			location = Math.max(location - headerHeight - offset, 0);
			return Math.min(location, getDocumentHeight() - getViewportHeight());
		};

		/**
	  * Determine the viewport's height
	  * @private
	  * @returns {Number}
	  */
		var getViewportHeight = function getViewportHeight() {
			return Math.max(document.documentElement.clientHeight, root.innerHeight || 0);
		};

		/**
	  * Determine the document's height
	  * @private
	  * @returns {Number}
	  */
		var getDocumentHeight = function getDocumentHeight() {
			return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
		};

		/**
	  * Convert data-options attribute into an object of key/value pairs
	  * @private
	  * @param {String} options Link-specific options as a data attribute string
	  * @returns {Object}
	  */
		var getDataOptions = function getDataOptions(options) {
			return !options || !((typeof JSON === 'undefined' ? 'undefined' : _typeof(JSON)) === 'object' && typeof JSON.parse === 'function') ? {} : JSON.parse(options);
		};

		/**
	  * Get the height of the fixed header
	  * @private
	  * @param  {Node}   header The header
	  * @return {Number}        The height of the header
	  */
		var getHeaderHeight = function getHeaderHeight(header) {
			return !header ? 0 : getHeight(header) + header.offsetTop;
		};

		/**
	  * Bring the anchored element into focus
	  * @private
	  */
		var adjustFocus = function adjustFocus(anchor, endLocation, isNum) {

			// Don't run if scrolling to a number on the page
			if (isNum) return;

			// Otherwise, bring anchor element into focus
			anchor.focus();
			if (document.activeElement.id !== anchor.id) {
				anchor.setAttribute('tabindex', '-1');
				anchor.focus();
				anchor.style.outline = 'none';
			}
			root.scrollTo(0, endLocation);
		};

		/**
	  * Start/stop the scrolling animation
	  * @public
	  * @param {Node|Number} anchor  The element or position to scroll to
	  * @param {Element}     toggle  The element that toggled the scroll event
	  * @param {Object}      options
	  */
		smoothScroll.animateScroll = function (anchor, toggle, options) {

			// Options and overrides
			var overrides = getDataOptions(toggle ? toggle.getAttribute('data-options') : null);
			var animateSettings = extend(settings || defaults, options || {}, overrides); // Merge user options with defaults

			// Selectors and variables
			var isNum = Object.prototype.toString.call(anchor) === '[object Number]' ? true : false;
			var anchorElem = isNum || !anchor.tagName ? null : anchor;
			if (!isNum && !anchorElem) return;
			var startLocation = root.pageYOffset; // Current location on the page
			if (animateSettings.selectorHeader && !fixedHeader) {
				// Get the fixed header if not already set
				fixedHeader = document.querySelector(animateSettings.selectorHeader);
			}
			if (!headerHeight) {
				// Get the height of a fixed header if one exists and not already set
				headerHeight = getHeaderHeight(fixedHeader);
			}
			var endLocation = isNum ? anchor : getEndLocation(anchorElem, headerHeight, parseInt(animateSettings.offset, 10)); // Location to scroll to
			var distance = endLocation - startLocation; // distance to travel
			var documentHeight = getDocumentHeight();
			var timeLapsed = 0;
			var percentage, position;

			/**
	   * Stop the scroll animation when it reaches its target (or the bottom/top of page)
	   * @private
	   * @param {Number} position Current position on the page
	   * @param {Number} endLocation Scroll to location
	   * @param {Number} animationInterval How much to scroll on this loop
	   */
			var stopAnimateScroll = function stopAnimateScroll(position, endLocation, animationInterval) {
				var currentLocation = root.pageYOffset;
				if (position == endLocation || currentLocation == endLocation || root.innerHeight + currentLocation >= documentHeight) {

					// Clear the animation timer
					clearInterval(animationInterval);

					// Bring the anchored element into focus
					adjustFocus(anchor, endLocation, isNum);

					// Run callback after animation complete
					animateSettings.callback(anchor, toggle);
				}
			};

			/**
	   * Loop scrolling animation
	   * @private
	   */
			var loopAnimateScroll = function loopAnimateScroll() {
				timeLapsed += 16;
				percentage = timeLapsed / parseInt(animateSettings.speed, 10);
				percentage = percentage > 1 ? 1 : percentage;
				position = startLocation + distance * easingPattern(animateSettings.easing, percentage);
				root.scrollTo(0, Math.floor(position));
				stopAnimateScroll(position, endLocation, animationInterval);
			};

			/**
	   * Set interval timer
	   * @private
	   */
			var startAnimateScroll = function startAnimateScroll() {
				clearInterval(animationInterval);
				animationInterval = setInterval(loopAnimateScroll, 16);
			};

			/**
	   * Reset position to fix weird iOS bug
	   * @link https://github.com/cferdinandi/smooth-scroll/issues/45
	   */
			if (root.pageYOffset === 0) {
				root.scrollTo(0, 0);
			}

			// Start scrolling animation
			startAnimateScroll();
		};

		/**
	  * Handle has change event
	  * @private
	  */
		var hashChangeHandler = function hashChangeHandler(event) {

			// Get hash from URL
			// var hash = decodeURIComponent( escapeCharacters( root.location.hash ) );
			var hash;
			try {
				hash = escapeCharacters(decodeURIComponent(root.location.hash));
			} catch (e) {
				hash = escapeCharacters(root.location.hash);
			}

			// Only run if there's an anchor element to scroll to
			if (!anchor) return;

			// Reset the anchor element's ID
			anchor.id = anchor.getAttribute('data-scroll-id');

			// Scroll to the anchored content
			smoothScroll.animateScroll(anchor, toggle);

			// Reset anchor and toggle
			anchor = null;
			toggle = null;
		};

		/**
	  * If smooth scroll element clicked, animate scroll
	  * @private
	  */
		var clickHandler = function clickHandler(event) {

			// Don't run if right-click or command/control + click
			if (event.button !== 0 || event.metaKey || event.ctrlKey) return;

			// Check if a smooth scroll link was clicked
			toggle = getClosest(event.target, settings.selector);
			if (!toggle || toggle.tagName.toLowerCase() !== 'a') return;

			// Only run if link is an anchor and points to the current page
			if (toggle.hostname !== root.location.hostname || toggle.pathname !== root.location.pathname || !/#/.test(toggle.href)) return;

			// Get the sanitized hash
			// var hash = decodeURIComponent( escapeCharacters( toggle.hash ) );
			// console.log(hash);
			var hash;
			try {
				hash = escapeCharacters(decodeURIComponent(toggle.hash));
			} catch (e) {
				hash = escapeCharacters(toggle.hash);
			}

			// If the hash is empty, scroll to the top of the page
			if (hash === '#') {

				// Prevent default link behavior
				event.preventDefault();

				// Set the anchored element
				anchor = document.body;

				// Save or create the ID as a data attribute and remove it (prevents scroll jump)
				var id = anchor.id ? anchor.id : 'smooth-scroll-top';
				anchor.setAttribute('data-scroll-id', id);
				anchor.id = '';

				// If no hash change event will happen, fire manually
				// Otherwise, update the hash
				if (root.location.hash.substring(1) === id) {
					hashChangeHandler();
				} else {
					root.location.hash = id;
				}

				return;
			}

			// Get the anchored element
			anchor = document.querySelector(hash);

			// If anchored element exists, save the ID as a data attribute and remove it (prevents scroll jump)
			if (!anchor) return;
			anchor.setAttribute('data-scroll-id', anchor.id);
			anchor.id = '';

			// If no hash change event will happen, fire manually
			if (toggle.hash === root.location.hash) {
				event.preventDefault();
				hashChangeHandler();
			}
		};

		/**
	  * On window scroll and resize, only run events at a rate of 15fps for better performance
	  * @private
	  * @param  {Function} eventTimeout Timeout function
	  * @param  {Object} settings
	  */
		var resizeThrottler = function resizeThrottler(event) {
			if (!eventTimeout) {
				eventTimeout = setTimeout(function () {
					eventTimeout = null; // Reset timeout
					headerHeight = getHeaderHeight(fixedHeader); // Get the height of a fixed header if one exists
				}, 66);
			}
		};

		/**
	  * Destroy the current initialization.
	  * @public
	  */
		smoothScroll.destroy = function () {

			// If plugin isn't already initialized, stop
			if (!settings) return;

			// Remove event listeners
			document.removeEventListener('click', clickHandler, false);
			root.removeEventListener('resize', resizeThrottler, false);

			// Reset varaibles
			settings = null;
			anchor = null;
			toggle = null;
			fixedHeader = null;
			headerHeight = null;
			eventTimeout = null;
			animationInterval = null;
		};

		/**
	  * Initialize Smooth Scroll
	  * @public
	  * @param {Object} options User settings
	  */
		smoothScroll.init = function (options) {

			// feature test
			if (!supports) return;

			// Destroy any existing initializations
			smoothScroll.destroy();

			// Selectors and variables
			settings = extend(defaults, options || {}); // Merge user options with defaults
			fixedHeader = settings.selectorHeader ? document.querySelector(settings.selectorHeader) : null; // Get the fixed header
			headerHeight = getHeaderHeight(fixedHeader);

			// When a toggle is clicked, run the click handler
			document.addEventListener('click', clickHandler, false);

			// Listen for hash changes
			root.addEventListener('hashchange', hashChangeHandler, false);

			// If window is resized and there's a fixed header, recalculate its size
			if (fixedHeader) {
				root.addEventListener('resize', resizeThrottler, false);
			}
		};

		//
		// Public APIs
		//

		return smoothScroll;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = mobileNavigation;
	/**
	 * Toggles mobile navigation after click on hamburger icon.
	 * Closes navigation after click on logo or navigation item.
	 *
	 * @param {HTMLElement} element Page header element.
	 */
	function mobileNavigation(element) {
	  element.querySelector('.page-nav-toggle').addEventListener('click', function () {
	    return element.classList.toggle('page-nav-active');
	  });

	  [].forEach.call(element.querySelectorAll('a:not(.page-nav-toggle)'), function (menuItem) {
	    menuItem.addEventListener('click', function () {
	      return element.classList.remove('page-nav-active');
	    });
	  });
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = animatedLabel;
	/**
	 * Adds class `focused` to form field parent when form field is focused.
	 * Toggles class `not-empty` on form field parent.
	 *
	 * @param {NodeList} elements Input elements.
	 */
	function animatedLabel(elements) {
		[].forEach.call(elements, function (form) {
			form.addEventListener('focus', function (evt) {
				return evt.target.parentNode.classList.add('focused');
			});

			form.addEventListener('blur', function (evt) {
				evt.target.parentNode.classList.remove('focused');
				evt.target.parentNode.classList.toggle('not-empty', evt.target.value.trim() != '');
			});
		});
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = contactForm;

	var _formValidator = __webpack_require__(5);

	var _formValidator2 = _interopRequireDefault(_formValidator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Validates contact form.
	 *
	 * @param {HTMLFormElement} formEl Form element.
	 */
	function contactForm(formEl) {
		var formValidator = new _formValidator2.default(formEl, {
			rules: {
				name: {
					required: 'Przedstaw się.'
				},
				email: {
					required: 'Podaj swój adres email.',
					email: 'Niepoprawny adres email.'
				},
				message: {
					required: 'Napisz wiadomość.'
				}
			},
			success: function success(e) {
				e.preventDefault();

				formValidator.reset();
				[].forEach.call(formEl.elements, function (el) {
					return el.classList.remove('not-empty');
				});
			}
		});
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formFieldsCollection = __webpack_require__(6);

	var _formFieldsCollection2 = _interopRequireDefault(_formFieldsCollection);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Form validator.
	 *
	 * @type FormValidator
	 */
	var FormValidator = function () {
		/**
	  * @param {HTMLFormElement} form Form node.
	  * @param {Object} [config={}] Validator configuration.
	  * @param {Object} [config.rules] Configuration rules
	  * 		{
	  *			formElementName: {
	  *				validator: 'Error message'
	  *			}
	  *		},
	  * 		{
	  *			email: {
	  *				email: 'Email is required.'
	  *				required: 'Email is invalid.',
	  *			}
	  *		}
	  * @param {Function} [config.success] Success callback.
	  */
		function FormValidator(form) {
			var _this = this;

			var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			_classCallCheck(this, FormValidator);

			/**
	   * Form element.
	   *
	   * @private
	   * @type {HTMLFormElement}
	   */
			this._formEl = form;

			/**
	   * Collection of form fields wrapped by {@link FormValidator.FormField}.
	   *
	   * @private
	   */
			this._formFields = new _formFieldsCollection2.default(form.elements, config.rules);

			/**
	   * Configuration.
	   *
	   * @private
	   * @type {Object}
	   */
			this._config = config;

			/**
	   * Reference to submit button. For optimization purpose.
	   *
	   * @private
	   * @type {HTMLElement}
	   */
			this._submitButton = form.querySelector('[type=submit]');

			// Remove default HTML validation.
			this._formEl.setAttribute('novalidate', 'novalidate');

			// Handler for submit event.
			this._formEl.addEventListener('submit', this._handleSubmit.bind(this));

			// Handler for validation event.
			// If form is invalid then disable submit button, or enable if form is valid.
			this._formFields.emitter.on('validate', function () {
				return _this._toggleDisableOnSubmit(!_this._formFields.isValid);
			});
		}

		/**
	  * Handle submit event on form element and validate all defined fields.
	  * If form is invalid then preventDefault submit event.
	  *
	  * @private
	  * @param {Event} event Submit event.
	  */


		_createClass(FormValidator, [{
			key: '_handleSubmit',
			value: function _handleSubmit(event) {
				var isValid = this._formFields.validate();

				if (isValid) {
					if (typeof this._config.success == 'function') {
						this._config.success(event);
					}
				} else {
					event.preventDefault();
					event.stopPropagation();
					return false;
				}
			}

			/**
	   * Disable or enable form submit button.
	   *
	   * @private
	   * @param {Boolean} isDisabled
	   */

		}, {
			key: '_toggleDisableOnSubmit',
			value: function _toggleDisableOnSubmit(isDisabled) {
				this._submitButton.disabled = isDisabled;
			}

			/**
	   * Disable each form field and submit button.
	   */

		}, {
			key: 'disable',
			value: function disable() {
				this._formFields.disable();
				this._toggleDisableOnSubmit(true);
			}

			/**
	   * Enable each form field and submit button.
	   */

		}, {
			key: 'enable',
			value: function enable() {
				this._formFields.enable();
				this._toggleDisableOnSubmit(false);
			}

			/**
	   * Reset each form field.
	   */

		}, {
			key: 'reset',
			value: function reset() {
				this._formEl.reset();
				this._formFields.reset();
				this.enable();
			}
		}]);

		return FormValidator;
	}();

	exports.default = FormValidator;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _emitterMixin = __webpack_require__(7);

	var _emitterMixin2 = _interopRequireDefault(_emitterMixin);

	var _formField = __webpack_require__(8);

	var _formField2 = _interopRequireDefault(_formField);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @memberOf FormValidator
	 */
	var FormFieldsCollection = function () {
		/**
	  * @param {HTMLCollection} elements Form fields.
	  * @param {Object} rules Validation configuration.
	  */
		function FormFieldsCollection(elements, rules) {
			var _this = this;

			_classCallCheck(this, FormFieldsCollection);

			/**
	   * @type {EventsEmitter}
	   */
			this.emitter = Object.create(_emitterMixin2.default);

			/**
	   * @private
	   * @type {Array.<FormField>}
	   */
			this._elements = [];

			// Create collection of each validable element.
			[].forEach.call(elements, function (element) {
				if (isElementValidable(element)) {
					_this.add(element, rules[element.name]);
				}
			});
		}

		/**
	  * Check if each validable form field is valid.
	  *
	  * @returns {Boolean}
	  */


		_createClass(FormFieldsCollection, [{
			key: 'add',


			/**
	   * Add form field to collection.
	   *
	   * @param {FormValidator.FormField} element FormField instance.
	   * @param {Object} rules Validation configuration.
	   */
			value: function add(element, rules) {
				if (!isElementValidable(element)) {
					throw new TypeError('Element is nod validable.');
				}

				this._elements.push(new _formField2.default(element, this.emitter, rules));
			}

			/**
	   * Validate each form field.
	   *
	   * @returns {Boolean}
	   */

		}, {
			key: 'validate',
			value: function validate() {
				var isValid = true;

				this._elements.forEach(function (element) {
					if (element.isValidable && !element.validate()) {
						isValid = false;
					}
				});

				return isValid;
			}

			/**
	   * Reset each form field.
	   */

		}, {
			key: 'reset',
			value: function reset() {
				this._elements.forEach(function (element) {
					return element.reset();
				});
			}

			/**
	   * Disable each form field.
	   */

		}, {
			key: 'disable',
			value: function disable() {
				this._elements.forEach(function (element) {
					return element.disabled = true;
				});
			}

			/**
	   * Enable each form field.
	   */

		}, {
			key: 'enable',
			value: function enable() {
				this._elements.forEach(function (element) {
					return element.disabled = false;
				});
			}
		}, {
			key: 'isValid',
			get: function get() {
				return this._elements.every(function (element) {
					return element.isValid;
				});
			}
		}]);

		return FormFieldsCollection;
	}();

	/**
	 * Checks if form field is validable.
	 *
	 * @param {HTMLElement} element
	 * @returns {boolean}
	 */


	exports.default = FormFieldsCollection;
	function isElementValidable(element) {
		return element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement;
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * Mixin that injects the events API into its host.
	 *
	 * @mixin FormValidator.EmitterMixin
	 * @memberOf FormValidator
	 */
	var EmitterMixin = {
		/**
	  * Store for attached events witch callbacks.
	  *
	  * @private
	  */
		_events: [],

		/**
	  * Registers a callback function to be executed when an event is emitted.
	  *
	  * @method utils.EmitterMixin#on
	  * @param {String} event The name of the event.
	  * @param {Function} callback The function to be called on event.
	  */
		on: function on(event, callback) {
			if (!Array.isArray(this._events[event])) {
				this._events[event] = [];
			}

			this._events[event].push(callback);
		},


		/**
	  * Stops executing the callback on the given event.
	  *
	  * @method utils.EmitterMixin#off
	  * @param {String} event The name of the event.
	  * @param {Function} callback The function to stop being called.
	  */
		off: function off(event, callback) {
			if (_typeof(this._events[event]) === 'object') {
				var index = this._events[event].indexOf(callback);

				if (index > -1) {
					this._events[event].splice(index, 1);
				}
			}
		},


		/**
	  * Fires an event, executing all callbacks registered for it.
	  *
	  * @method utils.EmitterMixin#emit
	  * @param {String} event The name of the event.
	  * @param {...*} [args] Additional arguments to be passed to the callbacks.
	  */
		emit: function emit(event) {
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			if (_typeof(this._events[event]) === 'object') {
				var callbacks = this._events[event].slice();
				var length = callbacks.length;

				args = [].slice.call(arguments, 1);

				for (var i = 0; i < length; i++) {
					callbacks[i].apply(this, args);
				}
			}
		}
	};

	exports.default = EmitterMixin;

	/**
	 * Interface representing classes which mix in {@link utils.EmitterMixin}.
	 *
	 * @interface utils.Emitter
	 */

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _validators = __webpack_require__(9);

	var validators = _interopRequireWildcard(_validators);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var errorClass = 'error';

	/**
	 * Wrapper for each form element.
	 *
	 * @memberOf FormValidator
	 */

	var FormField = function () {
		function FormField(element, collectionEmitter) {
			var rules = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

			_classCallCheck(this, FormField);

			/**
	   * Is field valid or invalid.
	   *
	   * @type {boolean}
	   */
			this.isValid = true;

			/**
	   * Reference to the DOM representation of this field.
	   *
	   * @private
	   * @type {HTMLElement}
	   */
			this._element = element;

			/**
	   * Is field touched by user or validation.
	   *
	   * @private
	   * @type {Boolean}
	   */
			this._isDirty = false;

			/**
	   * Validation rules.
	   *
	   * @private
	   * @type {Object}
	   */
			this._rules = rules;

			/**
	   * Emitter instance of {@link FormValidator.FormFieldsCollection}.
	   *
	   * @private
	   * @type {EventsEmitter}
	   */
			this._collectionEmitter = collectionEmitter;

			/**
	   * Message DOM element.
	   *
	   * @private
	   * @type {null|HTMLElement}
	   */
			this._messageElement = null;

			/**
	   * References to events listeners callbacks for `removeEventListener()`.
	   *
	   * @private
	   * @type {Object}
	   */
			this._eventRefs = {};

			// Attach blur event on element to detect when element become dirty.
			this._attachBlur();
		}

		/**
	  * Check if element is validable - has at east one defined validation rule.
	  *
	  * @returns {Boolean}
	  */


		_createClass(FormField, [{
			key: '_attachBlur',


			/**
	   * Attach blur event to {FormValidator#_element}.
	   *
	   * @private
	   */
			value: function _attachBlur() {
				var _this = this;

				if (!this.isValidable) {
					return;
				}

				this._eventRefs._handleBlur = function () {
					return _this._handleBlur();
				};
				this._element.addEventListener('blur', this._eventRefs._handleBlur);
			}

			/**
	   * Validate field on blur which also set field state as dirty.
	   * For better user experience form field is not validating during first typing (when is not dirty).
	   *
	   * @private
	   */

		}, {
			key: '_handleBlur',
			value: function _handleBlur() {
				this._element.removeEventListener('blur', this._eventRefs._handleBlur);
				this.validate();
			}

			/**
	   * Mark field as dirty and attach validation on `input`.
	   * For better user experience form field is not validate during first typing (when is not dirty).
	   *
	   * @private
	   */

		}, {
			key: '_setDirty',
			value: function _setDirty() {
				var _this2 = this;

				if (this._isDirty || !this.isValidable) {
					return;
				}

				this._eventRefs.validate = function () {
					return _this2.validate();
				};
				this._element.addEventListener('input', this._eventRefs.validate);
				this._isDirty = true;
			}

			/**
	   * Clear dirty state from form field and remove validation on input event.
	   *
	   * @private
	   */

		}, {
			key: '_clearDirty',
			value: function _clearDirty() {
				if (!this._isDirty || !this.isValidable) {
					return;
				}

				this._element.removeEventListener('input', this._eventRefs.validate);
				this._isDirty = false;
			}

			/**
	   * Validate form field by each rule defined for this form.
	   * Order of defined rules matters! First error stops validation for other rules.
	   *
	   * @returns {Boolean}
	   */

		}, {
			key: 'validate',
			value: function validate() {
				var _this3 = this;

				if (!this.isValidable) {
					return true;
				}

				var error = '';

				// Validates by rules order.
				// Breaks loop after finding first invalid rule.
				this.isValid = Object.keys(this._rules).every(function (rule) {
					if (!validators[rule](_this3._element.value)) {
						error = _this3._rules[rule];
						return false;
					}

					return true;
				});

				this._setDirty();
				this._toggleMessage(error);
				this._collectionEmitter.emit('validate');

				return this.isValid;
			}

			/**
	   * Mark field as disable.
	   */

		}, {
			key: 'disable',
			value: function disable() {
				this._element.disabled = true;
			}

			/**
	   * Mark field as enable.
	   */

		}, {
			key: 'enable',
			value: function enable() {
				this._element.disabled = false;
			}

			/**
	   * Reset field value and clear dirty state.
	   *
	   * @protected
	   */

		}, {
			key: 'reset',
			value: function reset() {
				this._clearDirty();
				this._attachBlur();
			}

			/**
	   * Toggle form field error message. If error message is empty then hide message element or show if error message
	   * is defined.
	   *
	   * @private
	   * @param {String} error Error message
	   */

		}, {
			key: '_toggleMessage',
			value: function _toggleMessage(error) {
				if (error) {
					this._showErrorMessage(error);
				} else {
					this._clearErrorMessage();
				}
			}

			/**
	   * Create if not exists and show node with error message. Node is append just after form element.
	   *
	   * @private
	   * @param {String} errorMessage
	   */

		}, {
			key: '_showErrorMessage',
			value: function _showErrorMessage(errorMessage) {
				var parent = this._element.parentNode;

				if (!this._messageElement) {
					this._messageElement = document.createElement('span');
					parent.appendChild(this._messageElement);
				}

				this._messageElement.textContent = errorMessage;
				parent.classList.add(errorClass);
			}

			/**
	   * clear and hide node with error message.
	   *
	   * @private
	   */

		}, {
			key: '_clearErrorMessage',
			value: function _clearErrorMessage() {
				if (!this._messageElement) {
					return;
				}

				this._element.parentNode.classList.remove(errorClass);
				this._messageElement.textContent = '';
			}
		}, {
			key: 'isValidable',
			get: function get() {
				return !!this._rules;
			}

			/**
	   * Disable or enable field.
	   *
	   * @param {Boolean} isDisabled
	      */

		}, {
			key: 'disabled',
			set: function set(isDisabled) {
				this._element.disabled = !!isDisabled;
			}
		}]);

		return FormField;
	}();

	exports.default = FormField;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.required = required;
	exports.email = email;
	/**
	 * Check if value is not empty.
	 *
	 * @param {String} value
	 * @returns {Boolean}
	 */
	function required(value) {
	  return value.trim() !== '';
	}

	/**
	 * Check if passed value is a valid email pattern.
	 *
	 * @param {String} value
	 * @returns {Boolean}
	 */
	function email(value) {
	  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	  return re.test(value);
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	/* global google */

	function mapInit() {
	    var map = new google.maps.Map(document.getElementById('map'), {
	        center: { lat: 54.676939, lng: 18.719794 },
	        zoom: 15,
	        scrollwheel: false,
	        streetViewControl: false,
	        styles: [{
	            'featureType': 'administrative',
	            'elementType': 'geometry.fill',
	            'stylers': [{
	                'color': '#ffffff'
	            }, {
	                'visibility': 'off'
	            }]
	        }, {
	            'featureType': 'administrative',
	            'elementType': 'labels.text.fill',
	            'stylers': [{
	                'color': '#000000'
	            }]
	        }, {
	            'featureType': 'administrative',
	            'elementType': 'labels.text.stroke',
	            'stylers': [{
	                'color': '#ffffff'
	            }]
	        }, {
	            'featureType': 'administrative.country',
	            'elementType': 'geometry.fill',
	            'stylers': [{
	                'color': '#ffffff'
	            }]
	        }, {
	            'featureType': 'administrative.locality',
	            'elementType': 'geometry.fill',
	            'stylers': [{
	                'color': '#ffffff'
	            }]
	        }, {
	            'featureType': 'administrative.locality',
	            'elementType': 'labels.text.fill',
	            'stylers': [{
	                'color': '#000000'
	            }]
	        }, {
	            'featureType': 'administrative.neighborhood',
	            'elementType': 'geometry.fill',
	            'stylers': [{
	                'color': '#ffffff'
	            }]
	        }, {
	            'featureType': 'landscape',
	            'elementType': 'geometry.fill',
	            'stylers': [{
	                'color': '#ffffff'
	            }]
	        }, {
	            'featureType': 'landscape',
	            'elementType': 'labels.text.fill',
	            'stylers': [{
	                'color': '#000000'
	            }]
	        }, {
	            'featureType': 'landscape',
	            'elementType': 'labels.text.stroke',
	            'stylers': [{
	                'color': '#ffffff'
	            }]
	        }, {
	            'featureType': 'landscape.man_made',
	            'elementType': 'geometry.fill',
	            'stylers': [{
	                'color': '#f3f3f3'
	            }]
	        }, {
	            'featureType': 'landscape.man_made',
	            'elementType': 'labels.text.fill',
	            'stylers': [{
	                'color': '#000000'
	            }]
	        }, {
	            'featureType': 'landscape.man_made',
	            'elementType': 'labels.text.stroke',
	            'stylers': [{
	                'color': '#ffffff'
	            }]
	        }, {
	            'featureType': 'landscape.natural.landcover',
	            'elementType': 'geometry.fill',
	            'stylers': [{
	                'visibility': 'off'
	            }, {
	                'color': '#ffffff'
	            }]
	        }, {
	            'featureType': 'landscape.natural.landcover',
	            'elementType': 'labels.text.fill',
	            'stylers': [{
	                'color': '#ffffff'
	            }]
	        }, {
	            'featureType': 'landscape.natural.terrain',
	            'elementType': 'geometry.fill',
	            'stylers': [{
	                'color': '#ffffff'
	            }]
	        }, {
	            'featureType': 'landscape.natural.terrain',
	            'elementType': 'labels.text.fill',
	            'stylers': [{
	                'color': '#000000'
	            }]
	        }, {
	            'featureType': 'landscape.natural.terrain',
	            'elementType': 'labels.text.stroke',
	            'stylers': [{
	                'color': '#ffffff'
	            }]
	        }, {
	            'featureType': 'poi',
	            'elementType': 'geometry.fill',
	            'stylers': [{
	                'color': '#ffffff'
	            }]
	        }, {
	            'featureType': 'poi',
	            'elementType': 'labels.text.fill',
	            'stylers': [{
	                'color': '#000000'
	            }]
	        }, {
	            'featureType': 'poi',
	            'elementType': 'labels.text.stroke',
	            'stylers': [{
	                'color': '#ffffff'
	            }]
	        }, {
	            'featureType': 'road',
	            'elementType': 'geometry.fill',
	            'stylers': [{
	                'color': '#d0d0db'
	            }]
	        }, {
	            'featureType': 'road',
	            'elementType': 'labels.text.fill',
	            'stylers': [{
	                'color': '#000000'
	            }]
	        }, {
	            'featureType': 'road',
	            'elementType': 'labels.text.stroke',
	            'stylers': [{
	                'color': '#ffffff'
	            }]
	        }, {
	            'featureType': 'transit',
	            'elementType': 'geometry.fill',
	            'stylers': [{
	                'color': '#afafaf'
	            }]
	        }, {
	            'featureType': 'transit',
	            'elementType': 'labels.text.fill',
	            'stylers': [{
	                'color': '#ffffff'
	            }]
	        }, {
	            'featureType': 'transit',
	            'elementType': 'labels.text.stroke',
	            'stylers': [{
	                'color': '#2c2776'
	            }]
	        }, {
	            'featureType': 'transit.station',
	            'elementType': 'labels.text.fill',
	            'stylers': [{
	                'color': '#000000'
	            }]
	        }, {
	            'featureType': 'transit.station',
	            'elementType': 'labels.text.stroke',
	            'stylers': [{
	                'color': '#ffffff'
	            }]
	        }, {
	            'featureType': 'water',
	            'elementType': 'geometry.fill',
	            'stylers': [{
	                'color': '#3634a3'
	            }]
	        }]
	    });

	    new google.maps.Marker({
	        position: { lat: 54.676964, lng: 18.719832 },
	        map: map,
	        animation: google.maps.Animation.DROP,
	        title: 'Domek letniskowy w Juracie',
	        icon: 'assets/dist/images/marker.png'
	    });
	}

	window.mapInit = mapInit;

/***/ }
/******/ ])
});
;