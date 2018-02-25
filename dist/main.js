(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Xethya", [], factory);
	else if(typeof exports === 'object')
		exports["Xethya"] = factory();
	else
		root["Xethya"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const assertion_error_1 = __importDefault(__webpack_require__(12));
function assert(condition, message) {
    if (!condition) {
        throw new assertion_error_1.default(message);
    }
}
exports.default = assert;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Default constant value for setting up the BBS PRNG.
 * P must be a prime number.
 *
 * @public
 * @type {Number}
 * @const P
 * @static
 */
exports.P = 87566873;
/**
 * Default constant value for setting up the BBS PRNG.
 * Q must be a prime number.
 *
 * @public
 * @const Q
 * @static
 * @type {Number}
 */
exports.Q = 5631179;
/**
 * A list of default seed values, tested to be evenly distributed.

 * @public
 * @const DefaultSeeds
 * @static
 * @type {Array.<Number>}
 * @see  http://wiki.fib.upc.es/sim/index.php/Blum_Blum_Shub#Tests
 */
exports.DefaultSeeds = [193945, 740191, 191];
/**
 * Instantiates a Blum Blum Shub PRNG.
 *
 * @public
 * @class BlumBlumShubAlgorithm
 */
class BlumBlumShubAlgorithm {
    /**
     * Initializes the generator.
     *
     * @param  {Number} p    A prime value (defaults to P).
     * @param  {Number} q    A prime value (defaults to Q).
     * @param  {Number} seedNumber A seed number to feed the generator (defaults to any value
     *                       in DefaultSeeds).
     * @constructor
     */
    constructor(settings) {
        this.settings = settings;
        const defaults = {
            p: exports.P,
            q: exports.Q,
            seedNumber: null,
        };
        this.settings = Object.assign({}, defaults, settings);
        let seedNumber = this.settings.seedNumber;
        const p = this.settings.p;
        const q = this.settings.q;
        if (seedNumber) {
            seedNumber = Math.abs(seedNumber);
        }
        else {
            seedNumber = exports.DefaultSeeds[Math.floor(Math.random() * (exports.DefaultSeeds.length))];
        }
        this.seedNumber = seedNumber;
        this.randomIndex = seedNumber;
        this.M = p * q;
        this.P = p;
        this.Q = q;
    }
    /**
     * Determines if the generator works better by being reinstantiated after
     * every generated number.
     *
     * @public
     * @static
     * @function recommendsToReinstantiate
     * @memberof BlumBlumShubAlgorithm
     * @return {Boolean}
     */
    static recommendsToReinstantiate() {
        return true;
    }
    recommendsToReinstantiate() {
        return BlumBlumShubAlgorithm.recommendsToReinstantiate();
    }
    /**
     * Generates a pseudo-random number and updates the seed for a next roll.
     * Number is always between 0 and 1.
     *
     * @public
     * @function generateRandom
     * @memberof BlumBlumShubAlgorithm
     * @instance
     * @return {Number}
     */
    generateRandom() {
        const r = this.randomIndex * this.randomIndex % this.M;
        this.randomIndex = r;
        return Math.abs(r / this.M);
    }
    /**
     * Same as `generateRandom()`, but converts the number to an Integer.
     *
     * @public
     * @function generateRandomInteger
     * @memberof BlumBlumShubAlgorithm
     * @instance
     * @return {Number}
     */
    generateRandomInteger() {
        return Number(this.generateRandom().toString().replace(/\./, ''));
    }
}
exports.BlumBlumShubAlgorithm = BlumBlumShubAlgorithm;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * The core class of the package. The Dice class allows to configure a single,
 * positive, integer random throw.
 *
 * By default, the chance throw uses the Blum Blum Shub algorithm contained in
 * `xethya-extension-random-bbs`, which provides a randomizer with an equal chance
 * of rolling numbers in all of the range.
 *
 * You can use the `xethya-extension-random-mtw` package to use the chance throw
 * with the Mersenne-Twister algorithm, which provides an average distribution
 * of 65-35-0 (you'll never get numbers larger than 66).
 *
 * @example
 * ```js
 * // Roll a single d6.
 * const d6 = new Dice();
 * d6.roll(); // A number between 1 and 6.
 *
 * // Roll a single d4.
 * const d4 = new Dice({ faces: 4 });
 * d4.roll();
 *
 * // Alternative, static syntax. Will always use Blum Blum Shub.
 * Dice.rollD(4);
 *
 * // Create a dice, roll it, then change its size.
 * const mutantDice = new Dice({ faces: 10 });
 * mutantDice.roll(); // A number between 1 and 10.
 * mutantDice.faces = 4;
 * mutantDice.roll(); // A number between 1 and 4.
 * ```
 *
 * @class Dice
 * @extends {XethyaObject}
 *
 * @param {Object} settings - A configuration object.
 * @param {Number} [settings.number = 6] - How many faces the dice has, or
 *                 the maximum number the roll can be.
 * @param {Class}  [settings.randomStrategy = BlumBlumShubAlgorithm] - The strategy to use
 *                 to generate the numbers. Must be a class that implements a `generateRandom()`
 *                 method.
 * @param {Object} [settings.randomStrategySettings = {}] - Specific configuration for the
 *                 randomizer. Most strategies should have default settings so you don't need
 *                 to use this, usually.
 *
 * @property {Number} faces - Gets or sets how many faces the dice has. Must be at least 2.
 * @property {Class} randomStrategy - Contains the reference to the pRNG used by the dice.
 * @property {Object} randomStrategySettings - Contains the pRNG's settings.
 *
 * @uses BlumBlumShubAlgorithm
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const randomizer_1 = __importDefault(__webpack_require__(6));
const blum_blum_shub_1 = __webpack_require__(1);
const object_1 = __importDefault(__webpack_require__(4));
const assert_1 = __importDefault(__webpack_require__(0));
class Dice extends object_1.default {
    constructor({ faces = 6, randomStrategy = blum_blum_shub_1.BlumBlumShubAlgorithm, randomStrategySettings = {} } = {}) {
        super();
        this._faces = 6;
        this.faces = faces;
        this.setRandomStrategy(randomStrategy, randomStrategySettings);
        this._mustPreservePrng = randomStrategy.recommendsToReinstantiate();
    }
    /**
     * Reinitializes the randomizer according to the strategy's recommendation.
     *
     * @private
     * @method _regenerateRandomStrategyIfNeeded
     */
    _regenerateRandomStrategyIfNeeded() {
        if (!this._mustPreservePrng) {
            this._initializeRandomizer();
        }
    }
    /**
     * Instantiates the randomizer.
     *
     * @private
     * @method _initializeRandomizer
     */
    _initializeRandomizer() {
        this._randomizer = new randomizer_1.default(this.randomStrategy).create(this.randomStrategySettings);
    }
    roll() {
        this.emit('before:roll');
        const random = this._randomizer.generateRandom();
        const result = Math.ceil(random * this.faces);
        this._regenerateRandomStrategyIfNeeded();
        this.emit('roll', result);
        return result;
    }
    /**
     * Sets a new random strategy for the dice.
     *
     * @public
     * @method
     * @param {Class}  randomStrategy - The strategy to use to generate the numbers.
     *                 Must be a class that implements a `generateRandom()` method.
     * @param {Object} [randomStrategySettings = {}] - Specific configuration for the
     *                 randomizer. Most strategies should have default settings so you don't need
     *                 to use this, usually.
     */
    setRandomStrategy(randomStrategy, randomStrategySettings = {}) {
        this.randomStrategy = randomStrategy;
        this.randomStrategySettings = randomStrategySettings;
        this._initializeRandomizer();
    }
    get faces() {
        return this._faces;
    }
    /**
     * @throws {Error} if faces isn't a Number or it's less than 2.
     */
    set faces(faces) {
        assert_1.default(faces >= 2, 'Dice#setFaces: a dice must have at least two faces');
        this._faces = faces;
    }
    get randomStrategy() {
        return this._randomStrategy;
    }
    set randomStrategy(randomStrategy) {
        this._randomStrategy = randomStrategy;
    }
    get randomStrategySettings() {
        return this._randomStrategySettings;
    }
    set randomStrategySettings(randomStrategySettings) {
        this._randomStrategySettings = randomStrategySettings;
    }
    static rollD(faces) {
        return new Dice({ faces }).roll();
    }
}
exports.Dice = Dice;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const eventemitter3_1 = __webpack_require__(11);
class Eventable extends eventemitter3_1.EventEmitter {
    constructor() {
        super();
    }
}
exports.default = Eventable;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const eventable_1 = __importDefault(__webpack_require__(3));
class XethyaObject extends eventable_1.default {
    constructor() {
        super();
    }
}
exports.default = XethyaObject;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(__webpack_require__(0));
class Range {
    constructor(lowerBound, upperBound) {
        assert_1.default(lowerBound !== upperBound, 'Range#constructor: lowerBound and upperBound cannot be equal');
        this.lowerBound = Math.min(lowerBound, upperBound);
        this.upperBound = Math.max(lowerBound, upperBound);
    }
    /**
     * Checks if a value is in the defined range.
     *
     * @public
     * @function
     * @param  {Number} value - Value to compare.
     * @return {Boolean} true if in range, false otherwise.
     */
    includes(value) {
        return this.lowerBound <= value && value <= this.upperBound;
    }
    /**
     * Converts the Range object to a string representation.
     *
     * @public
     * @function
     * @return {String}
     */
    toString() {
        return `${this.lowerBound.toString()} ~ ${this.upperBound.toString()}`;
    }
    /**
     * Creates a Range from an array of two numbers.
     *
     * @public
     * @static
     * @function
     * @param  {Array.<Number>} values - Boundaries of the range.
     * @return {Range}
     */
    static fromArray(values) {
        const errorMessage = 'Range#fromArray: values must be an Array of 2 numerical elements';
        assert_1.default(values.length === 2, errorMessage);
        return new Range(values[0], values[1]);
    }
    /**
     * Creates a Range from a string-based notation.
     *
     * @public
     * @static
     * @function
     * @param  {String} notedRange - A string representation of a Range,
     *                  using delimiters. Accepted formats: x,y x;y x:y x~y.
     * @return {Range}
     */
    static fromNotation(notedRange) {
        const errorMessage = 'Range#fromNotation: notedRange must use one of these formats: x,y x;y x:y x~y';
        assert_1.default(notedRange !== undefined, errorMessage);
        assert_1.default(typeof notedRange === 'string', errorMessage);
        let range;
        const allowedDelimiters = [',', ';', ':', '~'];
        assert_1.default(allowedDelimiters.some(delimiter => notedRange.includes(delimiter)), errorMessage);
        let delimiterFound = false;
        while (!delimiterFound) {
            const delimiter = allowedDelimiters.shift();
            delimiterFound = notedRange.includes(delimiter);
            if (delimiterFound) {
                const data = notedRange.split(delimiter).map(d => d.trim());
                assert_1.default(data.length === 2, errorMessage);
                range = Range.fromArray(data.map(d => Number(d)));
            }
        }
        return range;
    }
}
exports.default = Range;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Randomizer {
    constructor(constructorFunction) {
        this.constructorFunction = constructorFunction;
    }
    create(randomizerSettings) {
        return new this.constructorFunction(randomizerSettings);
    }
}
exports.default = Randomizer;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * xethya-dice
 *
 * Copyright © 2016 Joel A. Villarreal Bertoldi. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
const dice_1 = __webpack_require__(2);
const dice_throw_result_1 = __importDefault(__webpack_require__(8));
const blum_blum_shub_1 = __webpack_require__(1);
const assert_1 = __importDefault(__webpack_require__(0));
;
class DiceThrow {
    constructor({ numberOfDices = 2, maxNumber = 6, randomStrategy = blum_blum_shub_1.BlumBlumShubAlgorithm, randomStrategySettings = {} } = {}) {
        assert_1.default(maxNumber >= 2, 'DiceThrow#constructor: expected `maxNumber` to be at least 2.');
        this.dices = [];
        for (let d = 0; d < numberOfDices; d += 1) {
            this.dices.push(new dice_1.Dice({
                faces: maxNumber,
                randomStrategy: randomStrategy,
                randomStrategySettings
            }));
        }
    }
    roll() {
        let dtr = new dice_throw_result_1.default();
        dtr.rolls = this.dices.map(d => d.roll());
        return dtr;
    }
}
exports.DiceThrow = DiceThrow;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class DiceThrowResult {
    constructor() {
        this.rolls = [];
    }
    getRollSum() {
        return this.rolls.reduce((m, n) => m + n);
    }
}
exports.default = DiceThrowResult;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const dice_throw_result_1 = __importDefault(__webpack_require__(8));
const allowedThrowTypes = [
    "failure" /* FAILURE */,
    "success" /* SUCCESS */,
    "criticalSuccess" /* CRITICAL_SUCCESS */
];
class ChanceThrowResult extends dice_throw_result_1.default {
    constructor(throwResult) {
        super();
        this.rolls = this.rolls.concat(throwResult.rolls);
    }
    get throwType() {
        return this._throwType;
    }
    set throwType(value) {
        this._throwType = value;
    }
}
exports.default = ChanceThrowResult;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
const eventable_1 = __importDefault(__webpack_require__(3));
exports.Eventable = eventable_1.default;
const object_1 = __importDefault(__webpack_require__(4));
exports.XethyaObject = object_1.default;
// ----------------------------------------------------------------------------
/**
 * @package Utils
 */
const assert_1 = __importDefault(__webpack_require__(0));
exports.assert = assert_1.default;
const range_1 = __importDefault(__webpack_require__(5));
exports.Range = range_1.default;
// ----------------------------------------------------------------------------
/**
 * @package Random
 */
const BlumBlumShub = __importStar(__webpack_require__(1));
exports.BlumBlumShub = BlumBlumShub;
const MersenneTwister = __importStar(__webpack_require__(13));
exports.MersenneTwister = MersenneTwister;
const randomizer_1 = __importDefault(__webpack_require__(6));
exports.Randomizer = randomizer_1.default;
// ----------------------------------------------------------------------------
/**
 * @package Dice
 */
const dice_1 = __webpack_require__(2);
exports.Dice = dice_1.Dice;
const dice_throw_1 = __webpack_require__(7);
exports.DiceThrow = dice_throw_1.DiceThrow;
const chance_throw_1 = __webpack_require__(14);
exports.ChanceThrow = chance_throw_1.ChanceThrow;
const chance_throw_result_1 = __importDefault(__webpack_require__(9));
exports.ChanceThrowResult = chance_throw_result_1.default;
const coin_flip_1 = __webpack_require__(15);
exports.CoinFlip = coin_flip_1.CoinFlip;
// ----------------------------------------------------------------------------


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class AssertionError extends Error {
    constructor(message) {
        super();
        this.message = `[AssertionError] An assertion has failed${message ? (': ' + message) : ''}`;
    }
}
exports.default = AssertionError;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(__webpack_require__(0));
/**
 * @ignore
 */
exports.N = 624;
/**
 * @ignore
 */
exports.M = 397;
/**
 * @ignore
 */
exports.MATRIX_A = 0x9908b0df;
/**
 * @ignore
 */
exports.UPPER_MASK = 0x80000000;
/**
 * @ignore
 */
exports.LOWER_MASK = 0x7fffffff;
/**
 * @ignore
 */
exports.INIT_BY_ARRAY_SEED = 19650218;
class MersenneTwisterAlgorithm {
    /**
     * Instantiates the Mersenne-Twister generator.
     *
     * @param  {Object} settings - Configuration for the generator:
     *         - seedNumber: The number for the seed.
     */
    constructor(settings) {
        this.settings = settings;
        let seedNumber;
        const defaults = {
            seedNumber: undefined,
        };
        this.settings = Object.assign({}, defaults, settings);
        const seed = this.settings.seedNumber;
        if (seed) {
            seedNumber = Math.abs(seed);
        }
        else {
            // Try seeding with a custom algorithm.
            seedNumber = Number(new Date().getTime().toString().split('')
                .sort(() => 0.5 - Math.random()).join(''));
        }
        this.MT = new Array(exports.N);
        this.MTI = exports.N + 1;
        this.seedNumber = seedNumber;
        this.initializeRandomGenerator(seedNumber);
    }
    /**
     * Determines if the generator works better by being reinstantiated after
     * every generated number.
     *
     * @public
     * @function recommendsToReinstantiate
     * @memberof MersenneTwisterAlgorithm
     * @static
     * @return {Boolean}
     */
    static recommendsToReinstantiate() {
        return false;
    }
    recommendsToReinstantiate() {
        return MersenneTwisterAlgorithm.recommendsToReinstantiate();
    }
    /**
     * Loads the initialization vector required for the algorithm,
     * according to a given seed.
     *
     * @public
     * @method initializeRandomGenerator
     * @memberof MersenneTwisterAlgorithm
     * @instance
     * @param  {Number} seedNumber - A seed can be any non-negative integer value.
     */
    initializeRandomGenerator(seedNumber) {
        let seed = Math.abs(Math.floor(seedNumber));
        this.MT[0] = seed >> 0;
        for (this.MTI = 1; this.MTI < exports.N; this.MTI += 1) {
            seed = this.MT[this.MTI - 1] ^ (this.MT[this.MTI - 1] >> 30);
            this.MT[this.MTI] = ((((seed & 0xffff0000) >> 16) * 1812433253) << 16)
                + ((seed & 0x0000ffff) * 1812433253)
                + this.MTI;
            this.MT[this.MTI] = this.MT[this.MTI] >> 0;
        }
    }
    /**
     * An alternative way to load the initialization vector for the algorithm.
     *
     * @public
     * @method initializeByArray
     * @memberof MersenneTwisterAlgorithm
     * @instance
     * @param  {Array.<Number>} initKeyArray - A list of non-negative integer values.
     */
    initializeByArray(initKeyArray) {
        let i = 1;
        let j = 0;
        const keyLength = initKeyArray.length;
        assert_1.default(keyLength > 0, 'MersenneTwister#initializeByArray: initKeyArray must be an Array of at least one non-negative number.');
        // Ensure positive, integer values.
        const initKey = initKeyArray.map(v => Math.abs(Math.floor(v)));
        this.initializeRandomGenerator(exports.INIT_BY_ARRAY_SEED);
        let k = exports.N > keyLength ? exports.N : keyLength;
        while (k > 0) {
            const s = this.MT[i - 1] ^ (this.MT[i - 1] >> 30);
            this.MT[i] = (this.MT[i] ^ (((((s & 0xffff0000) >> 16) * 1664525) << 16)
                + ((s & 0x0000ffff) * 1664525)))
                + initKey[j] + j;
            this.MT[i] = this.MT[i] >> 0;
            i += 1;
            j += 1;
            if (i >= exports.N) {
                this.MT[0] = this.MT[exports.N - 1];
                i = 1;
            }
            if (j >= keyLength) {
                j = 0;
            }
            k -= 1;
        }
        for (k = exports.N - 1; k > 0; k -= 1) {
            const s = this.MT[i - 1] ^ (this.MT[i - 1] >> 30);
            this.MT[i] = (this.MT[i] ^ (((((s & 0xffff0000) >> 16) * 1566083941) << 16)
                + ((s & 0x0000ffff) * 1566083941))) - i;
            this.MT[i] = this.MT[i] >> 0;
            i += 1;
            if (i >= exports.N) {
                this.MT[0] = this.MT[exports.N - 1];
                i = 1;
            }
        }
        this.MT[0] = 0x80000000;
    }
    /**
     * Returns a random non-negative integer value.
     *
     * @public
     * @function generateRandomInteger
     * @memberof MersenneTwisterAlgorithm
     * @instance
     * @return {Number}
     */
    generateRandomInteger() {
        let y;
        const mag01 = [0x0, exports.MATRIX_A];
        if (this.MTI >= exports.N) {
            let kk;
            if (this.MTI === exports.N + 1) {
                this.initializeRandomGenerator(5489);
            }
            for (kk = 0; kk < exports.N - exports.M; kk += 1) {
                y = (this.MT[kk] & exports.UPPER_MASK) | (this.MT[kk + 1] & exports.LOWER_MASK);
                this.MT[kk] = this.MT[kk + exports.M] ^ (y >> 1) ^ mag01[y & 0x1];
            }
            while (kk < exports.N - 1) {
                y = (this.MT[kk] & exports.UPPER_MASK) | (this.MT[kk + 1] & exports.LOWER_MASK);
                this.MT[kk] = this.MT[kk + exports.M - exports.N] ^ (y >> 1) ^ mag01[y & 0x1];
                kk += 1;
            }
            y = (this.MT[exports.N - 1] & exports.UPPER_MASK) | (this.MT[0] & exports.LOWER_MASK);
            this.MT[exports.N - 1] = this.MT[exports.M - 1] ^ (y >> 1) ^ mag01[y & 0x1];
            this.MTI = 0;
        }
        this.MTI += 1;
        y = this.MT[this.MTI];
        y ^= (y >> 11);
        y ^= (y << 7) & 0x9d2c5680;
        y ^= (y << 15) & 0xefc60000;
        y ^= (y >> 18);
        return y >> 0;
    }
    /**
     * Returns a non-negative random integer value, within
     * the range of Int31.
     *
     * @public
     * @function generateRandomInteger31
     * @memberof MersenneTwisterAlgorithm
     * @instance
     * @return {Number}
     */
    generateRandomInteger31() {
        return this.generateRandomInteger() >> 1;
    }
    /**
     * Returns a non-negative random real number between 0 and 1.
     *
     * @public
     * @function generateRandomReal
     * @memberof MersenneTwisterAlgorithm
     * @instance
     * @return {Number}
     */
    generateRandomReal() {
        return this.generateRandomInteger() * (1.0 / 4294967295.0);
    }
    /**
     * Returns a non-negative random number between 0 and 1.
     *
     * @public
     * @function generateRandom
     * @memberof MersenneTwisterAlgorithm
     * @instance
     * @return {Number}
     */
    generateRandom() {
        return this.generateRandomInteger() * (1.0 / 4294967296.0);
    }
    /**
     * Returns a non-negative random real number between 0 and 1.
     *
     * @public
     * @function generateRandomReal3
     * @memberof MersenneTwisterAlgorithm
     * @instance
     * @return {Number}
     */
    generateRandomReal3() {
        return (this.generateRandomInteger() + 0.5) * (1.0 / 4294967296.0);
    }
    /**
     * Returns a non-negative random rumber with a resolution
     * of 53 bits.
     *
     * @public
     * @function generateRandomReal53BitResolution
     * @memberof MersenneTwisterAlgorithm
     * @instance
     * @return {Number}
     */
    generateRandomReal53BitResolution() {
        const a = this.generateRandomInteger() >> 5;
        const b = this.generateRandomInteger() >> 6;
        return (a * 671084464.0 + b) * (1.0 / 9007199254740992.0);
    }
}
exports.MersenneTwisterAlgorithm = MersenneTwisterAlgorithm;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * A d100 thrower. Useful for probability calculation. A throw is classified
 * with a roll score map, where the defaults are:
 *
 * - 1-20: Failure
 * - 21-90: Success
 * - 91-100: Critical success
 *
 * You can move around these ranges in order to change the roll's difficulty.
 * For instance, a very difficult throw would be one like this:
 *
 * - 1-80: Failure
 * - 81-98: Success
 * - 99-100: Critical success
 *
 * Notice that the success rate ranges cannot overlap, as the result resolver
 * won't be able to distinguish between rates otherwise.
 *
 * As ChanceThrow is an extension of Dice, it's regulated by the same randomizer
 * rules.
 *
 * @example
 * ```js
 * // Default settings.
 * const d100 = new ChanceThrow();
 * d100.roll();
 *
 * // A very difficult throw.
 * const d100Hard = new ChanceThrow({
 *   rollScores: {
 *     failure: new Range(1, 80),
 *     success: new Range(81, 98),
 *     criticalSuccess: new Range(99, 100),
 *   }
 * });
 * d100Hard.roll();
 *
 * // A chance throw of d66. Useful for capping the success rate
 * // without changing the roll scores map.
 * import { MersenneTwisterAlgorithm } from 'xethya-extension-random-mtw';
 *
 * const d66 = new ChanceThrow({
 *   randomStrategy: MersenneTwisterAlgorithm,
 * });
 * d66.roll();
 * ```
 *
 * @class ChanceThrow
 * @extends DiceThrow
 *
 * @param {Object} [settings] - Configuration object for the throw.
 * @param {Object} [settings.rollScores] - A map of ranges to determine the success rate of
 *                 the chance throw's result.
 * @param {Range}  [settings.rollScores.failure = new Range(1, 20)] - A Range to describe a
 *                 failed throw. This range can be used to apply penalizations to the player.
 * @param {Range}  [settings.rollScores.success = new Range(21, 90)] - A Range to describe a
 *                 success throw. This range can be used to give the player a reward.
 * @param {Range}  [settings.rollScores.criticalSuccess = new Range(91, 100)] - A Range to
 *                 describe a critical success throw. This result means the throw went even
 *                 better than normal, so a major reward can be given.
 * @param {Class}  [settings.randomStrategy = BlumBlumShubAlgorithm] - The strategy to use
 *                 to generate the numbers. Must be a class that implements a `generateRandom()`
 *                 method.
 *
 * @see https://github.com/xethya/xethya-extension-random-bbs/wiki/Blum-Blum-Shub-distributions
 * @see https://github.com/xethya/xethya-extension-random-mtw
 *
 * @uses Range
 * @uses BlumBlumShubAlgorithm
 * @uses ChanceThrowResult
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const range_1 = __importDefault(__webpack_require__(5));
const blum_blum_shub_1 = __webpack_require__(1);
const dice_throw_1 = __webpack_require__(7);
const chance_throw_result_1 = __importDefault(__webpack_require__(9));
class ChanceThrow extends dice_throw_1.DiceThrow {
    constructor(settings = { randomStrategy: undefined }) {
        super({
            numberOfDices: 1,
            maxNumber: 100,
            randomStrategy: settings.randomStrategy || blum_blum_shub_1.BlumBlumShubAlgorithm,
            randomStrategySettings: {
                seedNumber: Number(Math.random().toString().replace(/\./, ''))
            }
        });
        const defaults = {
            rollScores: {
                failure: new range_1.default(1, 20),
                success: new range_1.default(21, 90),
                criticalSuccess: new range_1.default(91, 100)
            }
        };
        this.settings = Object.assign({}, settings, defaults);
    }
    /**
     * Returns the range for a success rate.
     *
     * @private
     * @function
     * @param {string} key - The success rate to lookup.
     * @return {Range}
     */
    _range(key) {
        return this.settings.rollScores[key];
    }
    /**
     * Determines the success rate of the throw.
     *
     * @private
     * @function
     * @param {Number} rollSum - The results of the throw.
     * @return {String}
     */
    _calculateThrowType(rollSum) {
        for (let throwType of Object.keys(this.settings.rollScores)) {
            if (this._range(throwType).includes(rollSum)) {
                return throwType;
            }
        }
    }
    /**
     * Rolls the dice.
     *
     * @public
     * @function roll
     * @override
     */
    roll() {
        const diceThrow = super.roll();
        const ctr = new chance_throw_result_1.default(diceThrow);
        const rollSum = diceThrow.getRollSum();
        ctr.throwType = this._calculateThrowType(rollSum);
        return ctr;
    }
}
exports.ChanceThrow = ChanceThrow;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const dice_1 = __webpack_require__(2);
;
class CoinFlip extends dice_1.Dice {
    constructor() {
        super({ faces: 2 });
    }
}
exports.CoinFlip = CoinFlip;


/***/ })
/******/ ]);
});
//# sourceMappingURL=main.js.map