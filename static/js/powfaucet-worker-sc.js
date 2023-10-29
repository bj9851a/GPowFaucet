/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/common/FaucetConfig.ts":
/*!************************************!*\
  !*** ./src/common/FaucetConfig.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PoWHashAlgo: function() { return /* binding */ PoWHashAlgo; }
/* harmony export */ });
var PoWHashAlgo = /*#__PURE__*/function (PoWHashAlgo) {
  PoWHashAlgo["SCRYPT"] = "scrypt";
  PoWHashAlgo["CRYPTONIGHT"] = "cryptonight";
  PoWHashAlgo["ARGON2"] = "argon2";
  return PoWHashAlgo;
}({});

/***/ }),

/***/ "./src/utils/ConvertHelpers.ts":
/*!*************************************!*\
  !*** ./src/utils/ConvertHelpers.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   base64ToHex: function() { return /* binding */ base64ToHex; },
/* harmony export */   toDecimalUnit: function() { return /* binding */ toDecimalUnit; },
/* harmony export */   toReadableAmount: function() { return /* binding */ toReadableAmount; }
/* harmony export */ });
function base64ToHex(str) {
  var raw = atob(str);
  var result = '';
  for (var i = 0; i < raw.length; i++) {
    var hex = raw.charCodeAt(i).toString(16);
    result += hex.length === 2 ? hex : '0' + hex;
  }
  return result;
}
function toDecimalUnit(amount, decimals) {
  var factor = Math.pow(10, decimals || 18);
  return amount / factor;
}
function toReadableAmount(amount, decimals, unit, precision) {
  if (!decimals) decimals = 18;
  if (!precision) precision = 3;
  if (!amount) return "0" + (unit ? " " + unit : "");
  if (typeof amount === "bigint") amount = Number(amount);
  var decimalAmount = toDecimalUnit(amount, decimals);
  var precisionFactor = Math.pow(10, precision);
  var amountStr = (Math.round(decimalAmount * precisionFactor) / precisionFactor).toString();
  return amountStr + (unit ? " " + unit : "");
}

/***/ }),

/***/ "./src/utils/PoWParamsHelper.ts":
/*!**************************************!*\
  !*** ./src/utils/PoWParamsHelper.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getPoWParamsStr: function() { return /* binding */ getPoWParamsStr; }
/* harmony export */ });
/* harmony import */ var _common_FaucetConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/FaucetConfig */ "./src/common/FaucetConfig.ts");

function getPoWParamsStr(params, difficulty) {
  switch (params.a) {
    case _common_FaucetConfig__WEBPACK_IMPORTED_MODULE_0__.PoWHashAlgo.SCRYPT:
      return params.a + "|" + params.n + "|" + params.r + "|" + params.p + "|" + params.l + "|" + difficulty;
    case _common_FaucetConfig__WEBPACK_IMPORTED_MODULE_0__.PoWHashAlgo.CRYPTONIGHT:
      return params.a + "|" + params.c + "|" + params.v + "|" + params.h + "|" + difficulty;
    case _common_FaucetConfig__WEBPACK_IMPORTED_MODULE_0__.PoWHashAlgo.ARGON2:
      return params.a + "|" + params.t + "|" + params.v + "|" + params.i + "|" + params.m + "|" + params.p + "|" + params.l + "|" + difficulty;
  }
}

/***/ }),

/***/ "./src/worker/PoWWorker.ts":
/*!*********************************!*\
  !*** ./src/worker/PoWWorker.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PoWWorker: function() { return /* binding */ PoWWorker; }
/* harmony export */ });
/* harmony import */ var _utils_PoWParamsHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/PoWParamsHelper */ "./src/utils/PoWParamsHelper.ts");
/* harmony import */ var _utils_ConvertHelpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/ConvertHelpers */ "./src/utils/ConvertHelpers.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


var PoWWorker = /*#__PURE__*/function () {
  function PoWWorker(options) {
    var _this = this;
    _classCallCheck(this, PoWWorker);
    _defineProperty(this, "options", void 0);
    _defineProperty(this, "workerId", void 0);
    _defineProperty(this, "powParams", void 0);
    _defineProperty(this, "powDifficulty", void 0);
    _defineProperty(this, "powPreImage", void 0);
    _defineProperty(this, "working", false);
    _defineProperty(this, "workNonce", void 0);
    _defineProperty(this, "nonceRanges", void 0);
    _defineProperty(this, "statsCount", void 0);
    _defineProperty(this, "statsPoll", void 0);
    this.options = options;
    addEventListener("message", function (evt) {
      return _this.onControlMessage(evt);
    });
    postMessage({
      action: "init"
    });
  }
  _createClass(PoWWorker, [{
    key: "onControlMessage",
    value: function onControlMessage(evt) {
      var msg = evt.data;
      if (!msg || _typeof(msg) !== "object") return;

      //console.log(evt);

      switch (msg.action) {
        case "setWork":
          this.onCtrlSetWork(msg.data);
          break;
        case "addRange":
          this.onCtrlAddRange(msg.data);
          break;
        case "setParams":
          this.onCtrlSetParams(msg.data);
          break;
        case "verify":
          this.onCtrlVerify(msg.data);
          break;
      }
    }
  }, {
    key: "onCtrlSetWork",
    value: function onCtrlSetWork(data) {
      this.workerId = data.workerid;
      this.powParams = this.getWorkerParams(data.params, data.difficulty);
      this.powPreImage = (0,_utils_ConvertHelpers__WEBPACK_IMPORTED_MODULE_1__.base64ToHex)(data.preimage);
      this.nonceRanges = [{
        first: data.nonceStart,
        last: data.nonceStart + data.nonceCount - 1,
        count: data.nonceCount
      }];
      this.workNonce = data.nonceStart;
      this.startWorkLoop();
    }
  }, {
    key: "onCtrlAddRange",
    value: function onCtrlAddRange(data) {
      this.nonceRanges.push({
        first: data.start,
        last: data.start + data.count - 1,
        count: data.count
      });
      if (this.nonceRanges.length === 1) this.workNonce = data.start;
    }
  }, {
    key: "onCtrlSetParams",
    value: function onCtrlSetParams(data) {
      this.powParams = this.getWorkerParams(data.params, data.difficulty);
    }
  }, {
    key: "onCtrlVerify",
    value: function onCtrlVerify(share) {
      var preimg = (0,_utils_ConvertHelpers__WEBPACK_IMPORTED_MODULE_1__.base64ToHex)(share.preimage);
      var isValid = share.nonces.length > 0;
      for (var i = 0; i < share.nonces.length && isValid; i++) {
        if (!this.checkHash(share.nonces[i], preimg)) {
          isValid = false;
          break;
        }
      }
      postMessage({
        action: "verifyResult",
        data: {
          shareId: share.shareId,
          isValid: isValid
        }
      });
    }
  }, {
    key: "getWorkerParams",
    value: function getWorkerParams(params, difficulty) {
      var workerParams = {
        params: params,
        difficulty: difficulty,
        dmask: this.getDifficultyMask(difficulty),
        pstr: (0,_utils_PoWParamsHelper__WEBPACK_IMPORTED_MODULE_0__.getPoWParamsStr)(params, difficulty)
      };
      return workerParams;
    }
  }, {
    key: "getDifficultyMask",
    value: function getDifficultyMask(difficulty) {
      var byteCount = Math.floor(difficulty / 8) + 1;
      var bitCount = difficulty - (byteCount - 1) * 8;
      var maxValue = Math.pow(2, 8 - bitCount);
      var mask = maxValue.toString(16);
      while (mask.length < byteCount * 2) {
        mask = "0" + mask;
      }
      return mask;
    }
  }, {
    key: "startWorkLoop",
    value: function startWorkLoop() {
      var _this2 = this;
      if (this.working) return;
      this.statsCount = 0;
      this.statsPoll = new Date().getTime();
      setInterval(function () {
        return _this2.collectStats();
      }, 2000);
      this.working = true;
      this.workLoop();
    }
  }, {
    key: "collectStats",
    value: function collectStats() {
      var now = new Date().getTime();
      var nonces = 0;
      if (this.nonceRanges.length > 0) {
        nonces += this.nonceRanges[0].last - this.workNonce;
        for (var i = 1; i < this.nonceRanges.length; i++) {
          nonces += this.nonceRanges[i].count;
        }
      }
      postMessage({
        action: "stats",
        data: {
          shares: this.statsCount,
          time: now - this.statsPoll,
          last: this.workNonce,
          nonces: nonces
        }
      });
      this.statsCount = 0;
      this.statsPoll = now;
    }
  }, {
    key: "workLoop",
    value: function workLoop() {
      var _this3 = this;
      if (!this.working) return;
      for (var i = 0; i < 8; i++) {
        this.work();
      }
      var tout = this.nonceRanges.length === 0 ? 20 : 0;
      setTimeout(function () {
        return _this3.workLoop();
      }, tout);
    }
  }, {
    key: "work",
    value: function work() {
      var rangeCount = this.nonceRanges.length;
      if (rangeCount === 0) return;
      var nonce = this.workNonce++;
      if (nonce >= this.nonceRanges[0].last) {
        this.nonceRanges.splice(0, 1);
        if (rangeCount !== 1) {
          this.workNonce = this.nonceRanges[0].first;
        }
      }
      var hash;
      if (hash = this.checkHash(nonce, this.powPreImage)) {
        // found a nonce! :>
        postMessage({
          action: "nonce",
          data: {
            nonce: nonce,
            params: this.powParams.pstr
          }
        });
      }
    }
  }, {
    key: "checkHash",
    value: function checkHash(nonce, preimg) {
      var nonceHex = nonce.toString(16);
      // pad hex to 64bit (16 hex characters) to prevent re-hashing the same nonce multiple times
      if (nonceHex.length < 16) {
        nonceHex = "0000000000000000".substring(0, 16 - nonceHex.length) + nonceHex;
      }
      this.statsCount++;
      var hashHex = this.options.hashFn(nonceHex, preimg, this.powParams.params);
      var startOfHash = hashHex.substring(0, this.powParams.dmask.length);
      return startOfHash <= this.powParams.dmask ? hashHex : null;
    }
  }]);
  return PoWWorker;
}();

/***/ }),

/***/ "../libs/scrypt_wasm.js":
/*!******************************!*\
  !*** ../libs/scrypt_wasm.js ***!
  \******************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// THIS FILE IS GENERATED AUTOMATICALLY
// Don't edit this file by hand. 
// Edit the build located in the faucet-wasm folder.

var scrypt;
var scryptPromise;
module.exports = {
  getScrypt: function getScrypt() {
    return scrypt;
  },
  getScryptReadyPromise: function getScryptReadyPromise() {
    return scryptPromise;
  }
};
var base32768 = function (exports) {
  'use strict';

  /**
    Base32768 is a binary-to-text encoding optimised for UTF-16-encoded text.
    (e.g. Windows, Java, JavaScript)
  */

  // Z is a number, usually a uint15 but sometimes a uint7
  var BITS_PER_CHAR = 15; // Base32768 is a 15-bit encoding
  var BITS_PER_BYTE = 8;

  // Base32768 uses blocks of 32 characters.
  var blockSize = 1 << 5;
  var repertoires = ['ҠԀڀڠݠހ߀ကႠᄀᄠᅀᆀᇠሀሠበዠጠᎠᏀᐠᑀᑠᒀᒠᓀᓠᔀᔠᕀᕠᖀᖠᗀᗠᘀᘠᙀᚠᛀកᠠᡀᣀᦀ᧠ᨠᯀᰀᴀ⇠⋀⍀⍠⎀⎠⏀␀─┠╀╠▀■◀◠☀☠♀♠⚀⚠⛀⛠✀✠❀➀➠⠀⠠⡀⡠⢀⢠⣀⣠⤀⤠⥀⥠⦠⨠⩀⪀⪠⫠⬀⬠⭀ⰀⲀⲠⳀⴀⵀ⺠⻀㇀㐀㐠㑀㑠㒀㒠㓀㓠㔀㔠㕀㕠㖀㖠㗀㗠㘀㘠㙀㙠㚀㚠㛀㛠㜀㜠㝀㝠㞀㞠㟀㟠㠀㠠㡀㡠㢀㢠㣀㣠㤀㤠㥀㥠㦀㦠㧀㧠㨀㨠㩀㩠㪀㪠㫀㫠㬀㬠㭀㭠㮀㮠㯀㯠㰀㰠㱀㱠㲀㲠㳀㳠㴀㴠㵀㵠㶀㶠㷀㷠㸀㸠㹀㹠㺀㺠㻀㻠㼀㼠㽀㽠㾀㾠㿀㿠䀀䀠䁀䁠䂀䂠䃀䃠䄀䄠䅀䅠䆀䆠䇀䇠䈀䈠䉀䉠䊀䊠䋀䋠䌀䌠䍀䍠䎀䎠䏀䏠䐀䐠䑀䑠䒀䒠䓀䓠䔀䔠䕀䕠䖀䖠䗀䗠䘀䘠䙀䙠䚀䚠䛀䛠䜀䜠䝀䝠䞀䞠䟀䟠䠀䠠䡀䡠䢀䢠䣀䣠䤀䤠䥀䥠䦀䦠䧀䧠䨀䨠䩀䩠䪀䪠䫀䫠䬀䬠䭀䭠䮀䮠䯀䯠䰀䰠䱀䱠䲀䲠䳀䳠䴀䴠䵀䵠䶀䷀䷠一丠乀习亀亠什仠伀传佀你侀侠俀俠倀倠偀偠傀傠僀僠儀儠兀兠冀冠净几刀删剀剠劀加勀勠匀匠區占厀厠叀叠吀吠呀呠咀咠哀哠唀唠啀啠喀喠嗀嗠嘀嘠噀噠嚀嚠囀因圀圠址坠垀垠埀埠堀堠塀塠墀墠壀壠夀夠奀奠妀妠姀姠娀娠婀婠媀媠嫀嫠嬀嬠孀孠宀宠寀寠尀尠局屠岀岠峀峠崀崠嵀嵠嶀嶠巀巠帀帠幀幠庀庠廀廠开张彀彠往徠忀忠怀怠恀恠悀悠惀惠愀愠慀慠憀憠懀懠戀戠所扠技抠拀拠挀挠捀捠掀掠揀揠搀搠摀摠撀撠擀擠攀攠敀敠斀斠旀无昀映晀晠暀暠曀曠最朠杀杠枀枠柀柠栀栠桀桠梀梠检棠椀椠楀楠榀榠槀槠樀樠橀橠檀檠櫀櫠欀欠歀歠殀殠毀毠氀氠汀池沀沠泀泠洀洠浀浠涀涠淀淠渀渠湀湠満溠滀滠漀漠潀潠澀澠激濠瀀瀠灀灠炀炠烀烠焀焠煀煠熀熠燀燠爀爠牀牠犀犠狀狠猀猠獀獠玀玠珀珠琀琠瑀瑠璀璠瓀瓠甀甠畀畠疀疠痀痠瘀瘠癀癠皀皠盀盠眀眠着睠瞀瞠矀矠砀砠础硠碀碠磀磠礀礠祀祠禀禠秀秠稀稠穀穠窀窠竀章笀笠筀筠简箠節篠簀簠籀籠粀粠糀糠紀素絀絠綀綠緀締縀縠繀繠纀纠绀绠缀缠罀罠羀羠翀翠耀耠聀聠肀肠胀胠脀脠腀腠膀膠臀臠舀舠艀艠芀芠苀苠茀茠荀荠莀莠菀菠萀萠葀葠蒀蒠蓀蓠蔀蔠蕀蕠薀薠藀藠蘀蘠虀虠蚀蚠蛀蛠蜀蜠蝀蝠螀螠蟀蟠蠀蠠血衠袀袠裀裠褀褠襀襠覀覠觀觠言訠詀詠誀誠諀諠謀謠譀譠讀讠诀诠谀谠豀豠貀負賀賠贀贠赀赠趀趠跀跠踀踠蹀蹠躀躠軀軠輀輠轀轠辀辠迀迠退造遀遠邀邠郀郠鄀鄠酀酠醀醠釀釠鈀鈠鉀鉠銀銠鋀鋠錀錠鍀鍠鎀鎠鏀鏠鐀鐠鑀鑠钀钠铀铠销锠镀镠門閠闀闠阀阠陀陠隀隠雀雠需霠靀靠鞀鞠韀韠頀頠顀顠颀颠飀飠餀餠饀饠馀馠駀駠騀騠驀驠骀骠髀髠鬀鬠魀魠鮀鮠鯀鯠鰀鰠鱀鱠鲀鲠鳀鳠鴀鴠鵀鵠鶀鶠鷀鷠鸀鸠鹀鹠麀麠黀黠鼀鼠齀齠龀龠ꀀꀠꁀꁠꂀꂠꃀꃠꄀꄠꅀꅠꆀꆠꇀꇠꈀꈠꉀꉠꊀꊠꋀꋠꌀꌠꍀꍠꎀꎠꏀꏠꐀꐠꑀꑠ꒠ꔀꔠꕀꕠꖀꖠꗀꗠꙀꚠꛀ꜀꜠ꝀꞀꡀ',
  // length = 1 << 10
  'ƀɀɠʀ' // length = 1 << 2
  ];

  var lookupE = {};
  repertoires.forEach(function (repertoire, r) {
    var numZBits = BITS_PER_CHAR - BITS_PER_BYTE * r; // 0 -> 15, 1 -> 7
    var encodeRepertoire = [];
    for (var i = 0; i < repertoire.length; i++) {
      var charCode = repertoire.charCodeAt(i);
      for (var offset = 0; offset < blockSize; offset++) {
        encodeRepertoire.push(String.fromCharCode(charCode + offset));
      }
    }
    lookupE[numZBits] = encodeRepertoire;
  });
  var lookupD = {};
  Object.entries(lookupE).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      numZBits = _ref2[0],
      encodeRepertoire = _ref2[1];
    encodeRepertoire.forEach(function (chr, z) {
      lookupD[chr] = [Number(numZBits), z];
    });
  });
  var encode = function encode(uint8Array) {
    var length = uint8Array.length;
    var str = '';
    var z = 0;
    var numZBits = 0;
    for (var i = 0; i < length; i++) {
      var uint8 = uint8Array[i];

      // Take most significant bit first
      for (var j = BITS_PER_BYTE - 1; j >= 0; j--) {
        var bit = uint8 >> j & 1;
        z = (z << 1) + bit;
        numZBits++;
        if (numZBits === BITS_PER_CHAR) {
          str += lookupE[numZBits][z];
          z = 0;
          numZBits = 0;
        }
      }
    }
    if (numZBits !== 0) {
      // Final bits require special treatment.

      // z = bbbbbbcccccccc, numZBits = 14, padBits = 1
      // z = bbbbbcccccccc, numZBits = 13, padBits = 2
      // z = bbbbcccccccc, numZBits = 12, padBits = 3
      // z = bbbcccccccc, numZBits = 11, padBits = 4
      // z = bbcccccccc, numZBits = 10, padBits = 5
      // z = bcccccccc, numZBits = 9, padBits = 6
      // z = cccccccc, numZBits = 8, padBits = 7
      // => Pad `z` out to 15 bits using 1s, then encode as normal (r = 0)

      // z = ccccccc, numZBits = 7, padBits = 0
      // z = cccccc, numZBits = 6, padBits = 1
      // z = ccccc, numZBits = 5, padBits = 2
      // z = cccc, numZBits = 4, padBits = 3
      // z = ccc, numZBits = 3, padBits = 4
      // z = cc, numZBits = 2, padBits = 5
      // z = c, numZBits = 1, padBits = 6
      // => Pad `z` out to 7 bits using 1s, then encode specially (r = 1)

      while (!(numZBits in lookupE)) {
        z = (z << 1) + 1;
        numZBits++;
      }
      str += lookupE[numZBits][z];
    }
    return str;
  };
  var decode = function decode(str) {
    var length = str.length;

    // This length is a guess. There's a chance we allocate one more byte here
    // than we actually need. But we can count and slice it off later
    var uint8Array = new Uint8Array(Math.floor(length * BITS_PER_CHAR / BITS_PER_BYTE));
    var numUint8s = 0;
    var uint8 = 0;
    var numUint8Bits = 0;
    for (var i = 0; i < length; i++) {
      var chr = str.charAt(i);
      if (!(chr in lookupD)) {
        throw new Error("Unrecognised Base32768 character: ".concat(chr));
      }
      var _lookupD$chr = _slicedToArray(lookupD[chr], 2),
        numZBits = _lookupD$chr[0],
        z = _lookupD$chr[1];
      if (numZBits !== BITS_PER_CHAR && i !== length - 1) {
        throw new Error('Secondary character found before end of input at position ' + String(i));
      }

      // Take most significant bit first
      for (var j = numZBits - 1; j >= 0; j--) {
        var bit = z >> j & 1;
        uint8 = (uint8 << 1) + bit;
        numUint8Bits++;
        if (numUint8Bits === BITS_PER_BYTE) {
          uint8Array[numUint8s] = uint8;
          numUint8s++;
          uint8 = 0;
          numUint8Bits = 0;
        }
      }
    }

    // Final padding bits! Requires special consideration!
    // Remember how we always pad with 1s?
    // Note: there could be 0 such bits, check still works though
    if (uint8 !== (1 << numUint8Bits) - 1) {
      throw new Error('Padding mismatch');
    }
    return new Uint8Array(uint8Array.buffer, 0, numUint8s);
  };
  exports.decode = decode;
  exports.encode = encode;
  return exports;
}({});
var base32768WASM = "Ԑ茻䙠Ҡҫ⫽晤ꜟޟ繠癏陦ҫꊥꗀᓿ星暿鉠幗ꊘᆀᑾڠዿ蘿陀ᯀ⪘ᨹ晪ꜟ星蘠噌ڧꊛ꒽ꗾڠᘿ蘿陏鹗ꊛꊡ晠ᅟ噢蘿陏鹐ᒀҡ晨ꜟ星暿蛋ᡐ▰䩘Ҫ⠈ᆀ暠Ԁڐ◸㙄▨ᖌᒃځ䛀晰噠Ҩ▦ⳁᖀ曠Ԁ皐䙈㩈ᖂҮݡҠڀ㙠Ұ▤ᖀᖄበݠڀ䙠㙈⪠Ҡቢᔃ校䛀癷Ҩ軈⠆Ⴀ☣ጠ噀㩘ᖆҠ㱎陦ᒶ羻呎䷰㙀䀍浄ꀐ恠ᆇ鉋鷖㦋忱甪钿園㽗铭鱗䇣ᣍ紞雏嬗䍙咠ᗡ⣺ꑽ欲铄娒臷鐌㴆觛⪠的薿我䂛独鲶饛濵椸鋏埠⤃鉋鷖㦋忱甪钿妙㾙䙆盱鹨Ⴄቶ㾖䧫⡑䧪袐轙掱䲖㡙㣝㮐䴧桥夈兞ᯄ縳䕀矿詠በ⛠က橦杸恰ߐ䝎橸ᖇ陽襄䙃䛄䏐噿蚗⚠Ⳅ坌飒㝁湠䭀ᕂ㙢ᗡ躠ᗁᖺ㚠㙟曗⦱ұተ鲡曟ߜ䩀橱樓瀨橨杹懰Ⴐ䠎鶒Ԃᖍ鍆邀ݴҩᗀ穱樁ҵተ骡暠敡钎䡀偨䠙ᒁꔃ廰ᄰ䥎趇㝐軠ጰҠ㝂皦㓄ڔ◣睦Ⴁꊧ弙□亁┄⪧鹭袠ᠡ⫻䋜檡衠⛠Ұ橪杸恰ᄰ䝎橸ᖇ陽襄䙅䛄䏐噿蚗⚠㭄坌飒㝅㚆啄ބ☓萬晴杣憙胺橠婰ꉙҭቺ鷓㙁皢甮崂㙩Ҥ癠䉢ᄀ汽ᖀ䩐樂ᯂሸ┑彰ݰ䝎詸▐㐄晤杸憙䋈棄Ҳ晡ݨᘂ㺴㙁㚂㓈㹈▀䐅誠ጡᖻ㚠䘀嵲Ҳᗡ鍄颂⠠沽詢橰騛狠仢ᓶ怕䃈ԅҡ䝐⚤坈䙂䛄䍐噰㘀懫滠ᘂ☖䜀无钄Ԅ♣耩誤㵠ݴҦᗀ䩑樁ҩተ骡暠敡钎䡀㡈䠙ᒁꔃ廰ݰ䥎趇㝑潤奎䙲䛇䐜試䩐䇳琈晦邀ݴҬᗀ䩑樁ҩተ骡暠敡钎䡀㡈䠙ᒁꔃ廰ݰ䥎趇㝐鋠ጰҬ㝁㚆㓄Ԅ◣睦Ⴁꊧ弙■溁┄⪧鹭袠ጡ⫻䋜檡塠⛠ڀ橤杸恰ݰ䝎橸ᖇ陽襄䙂䛄䏐噿蚗⚠⚤坌飒㝆㚆啄߄☓萬晸杣憙胺橠㣀ᄡ▩ደ骀ᄀ桽◐▯蚛氨晤杨憀蚟曎㡀㡈蠹譄䡯㙀灠Ⴄ䙤♣盠ᘂ☔䜀䙿ဎ㵢Ҳᖡ鋣သᇸ湠溃┇㧑◕ዲ鶀⍀槽铄ߔ▻耬晴郊㙂㚃镄ڄ☋萬晨杪憙胨暨㜷彠⚤䄮馀ᄀ棽瓍䡠恨搼普杭戙湡躁䷇䆑▹ቾ鶀ᒠ榽铄ڤ◳耭窤✊㙀灠⋄䛄♣盠㛂☔䜀䙿ဎ㵢ڂᖡ鋣သᇸ湢◃┇㧑♭ዲ鶀㿠槽铄ᒴ▻耬暖邀ᒵ■䭀ᑂ㙊ᗡ躠ᄡᖺ㚠㙟曗⦱ҥተ鲡曟ߜ䩀㩑樓瀨櫀杹懰⪰䠎鶒ᆂᖍ鍆䙯孰ሚ橣䩑爙کቼ鷓㙍㚀键塡䦑ҩ窠㦁Ⱋ湤躁跗㽀獤⎌馀㽵□ⵄᅔ♫苠哢㒷忰᧰䚮趒ڣ仠贴䙋䛌萨ᅈ㜧懹ԍቦ鳓㙆胨ᯍ䡀偨搼晪杭戙湡亁䷇䆑◁ቾ鶀ᖠ榽铄ݤ◳耭窤㖁╛湣躁緗㽀捤㬬駊㝈㚃镄Ⴄ☋萬暀杪憙胨梈㜷彠此䄮馀♀棽瓍䡡㡈搼暄杭戙湤溁䷇䆑◵ቾ鶀⢠榽铄ᄴ◳耭窤㲁Ⱋ湥溁跗㽀罤⎌馀ᇠ沽詠婰騛狠⋂ᓶ忰Ⲛ橢⍂ߚᗥ钠䆁⏛茨ᓨ㙷姹߁窠㖪㙗皦啄ᑴ☓萬暾杣憙湦玤ݦ睠䭄䔮䙉䛆萼詡㩐稓琈檐杯懰ᯐ䟮鶒߂ᖩ鍆邂Ⰰ樽詣㩐鈛狠壢⡶怕☧ⵄڔ♫苠⢂㒷忰ᄰ䚮趒ԃ仠䤔䙜䛇萨ᔈ㜗懹ڱቴ鳓孱␈ᄈ㟗彠䭄䌮馀ᘠ朽瓄Ⴆ禱ҹዲ鶀ᒠ槽铄ڤ▻耬晾邀㑵□躃㶲Ԛᖹ镆䙇䛁菼詡⍂ߋ仠ᘂ㾷㙁㚃畎塠㡈㐙負ᡊ㙌䃈ᑈ㜷彠罤䄮馀⤠棽瓍䡡顨搼暜杭戙湧溁䷇䆑☝ቾ鶀㗠榽铄ሴ◳耭窤䚁╛湨◁緗㽁Ⴄ㬬駊㝐胨ᐨ㟗彠筤䌮馀⢠朽瓄ᆖ睡ᇨ暄杹懰ᘐ䠎鶒ݲᖍ鍆䙘孰╺橢㩑爙څቼ鷓㙈皠键塠熱ڹ窠㚁Ⱋ湤◁跗㽀杤⎌馀ᒵ▥玤န♫苠䓂㒷忰ᕐ䚮趒ԛ仠儴䙈䛌萨Ⴈ㜧懹ԁቦ鳓㙁䃈ጭ䡁遨搼暚杭戙湧亁䷇䆑☩ቾ鶀㝠榽铄ዤ◳耭窤䦁╛湨躁緗㽁Ⳅ㬬駊㝒㚃镄ጤ☋萬暨杪憙胨欈㜷彡㭄䄮馀㣠棽瓍䡢塨搼暬杭戙湩溁䷇䆑☽ቾ鶀㧠榽铄Ꮄ◳耭窤亡Ⱋ湪◁跗㽁䝄⎌馀㑠沽詣橰騛狠廢ᓶ忰ᠺ橤洂ߊᗥ钠㾁⏛茨ᒨ㙷姹ډ窠䦪㙌㚆啄ᆄ☓萬暐杣憙湤厤ዦ睡ᛄ䔮䙡䛆萼詤㩐稓琈檲杯懰⡐䟮鶒ᄪᖩ鍆邂㭠樽詥䩐鈛狠竢⡶怕☪鎤ሔ♫苠惢㒷忰␐䚮趒ޓ仠焴䙫䛇萨ᡈ㜗懹ލቴ鳓孱⤈ᖨ㟗彡ᛄ䌮馀㛠朽瓄ጦ禱ݡዲ鶀㙠槽铄ቤ▻耬暦邀㯵▧躃㶲ယᖹ镆䙟䛁菼詤䳢ᄳ仠拢㾷㙏㚃畎塡顨㐙負䎪㙔胨ᛈ㜷彡䝄䄮馀㩠棽瓍䡢遨搼暺杭戙湫亁䷇䆑♱ቾ鶀䁠榽铄ᓄ◳耭窤审╛湭亁緗㽁筤㬬駊㝛䃈ᚨ㟗彡䍄䌮馀㧠朽瓄ᐦ睡簈暬杹懰✰䠎鶒ᄒᖍ鍆䙩孰Ⳛ橤穱爙ݵቼ鷓㙒皠键塢⥑ޕ窠䪁Ⱋ湩◁跗㽁㝄⎌馀㙵▪ⵄዴ♫苠波㒷忰♰䚮趒ရ仠甴䙢䛌萨ᗈ㜧懹ݩቦ鳓㙏䃈ᙍ䡂表搼暸杭戙湫◁䷇䆑♥ቾ鶀㻠榽铄ᒔ◳耭窤嶡╛湭躁緗㽁荤㬬駊㝜㚃镄ᔄ☋萬曐杪憙胨消㜷彡譤䄮馀䋠棽瓍䡣硨搼曔杭戙湮溁䷇䆑⚕ቾ鶀䓠榽铄ᕔ◳耭窤撀䍐㑈ᰄᐲᄩݠ暜䙕㙈湣詠硡罠盠㺀ԈႮ☱䩁衠ᄠ◠檼杺懰⦰䣮鶒ᅒᖝ镆郊㙀⠀楤䨲ҡ䙈交懓㙗䊈▎崄Ⲇꖢ乨邂⎰Ҫځ梄妱▥窠⤠㵵▣䩇崂ڑဝ窠ᄀ㵐㔜钄ᔷ䆑ҥዴ鶀ހ殽铄Ҵ◛萭竣㟉锤栺檨በᄠ◀櫢邂ᛐڈ᧮嵲ᅓ琈晴杺懰Ꮠ䣮鶒ڒᖝ镆邡缤斔䛍墄㝀ހᖈ䡼孱ᑈԄއ䇉ҥ贴䙋䛍䐈ᅈ㞗懹ԍቮ鷓宀鵒㭖䙖署⭀ڐበ㝀胨柤ނڛ琤晴駊㙆㚆畄߄♋萬晸杧戙胰懐琜登仩◠技䛸湠䩇浲㡹Ҥ曢韓忰ڐ䨎顠⠈琽負ᄡល茺橡贂㚫仨䌔䙌㙉胨ᅄᒦ睠仠唴䙎㙅湣㒮㡀臻仠䋂䂷㙇㚅啎塠顨䐝贴桑硂娡厤䥢ڪᗹ钠ⵁ❛茨ᇨ㛧懹Ԕ晢䙼怘湱铍䡄ᓑ◉窤㥠ᯐᔜ钄߇䆑ڍዴ鶀❀殽铄ᄔ◛萭竣荚杗ᆚ誨በ⚠値晴䙍廱ᑈԄߗ⦻狠㫂䒷㙅㚄镎塠硨倽贴䚂孱ᒚ檢桠靠琭袠㒳孰ᛐ䦎顡䡈簽負㪁ᔻ茺溕抈鮘㯬櫤䙌䛏䐈ᆈ㝷懹ԑቴ鷓㙆▢橡綗⚠吭窠槊㝅胨栄ᄒރ琤暆駊㙆皦畄ߔ♋萬智杧戙胰捵呻鹳勩ᴀ檀ᛐᑜ䩁塠觩⚰晴䙌弙茨ᅈ㠧彠卤䴮馀ᦀ棽铍䳢㚳仨唴䙍㙘䃈Ꮔᑶ睠狠嬴䙗㙆湥㒮㡁䧛仠哢䂷㙋皥啎塡恨䐝贴柡膦譠厤䟢ڲᗹ钠㒁❛茨ለ㛧懹Ԙ晶䙌怘湱㒭䡃㦑◉窤⫠⋐᧼钄ߗ䆑ԑዴ鶀ᰀ殽铄߄◛萭竣擫覰曺檣塠睠吤晴䙎廱ᛈᅄဇ⦻狠㫂䒷㙅㚄镎塠硨倽贴䚀孱ᓚ檢塠蝠萭袠㶳孰ᙐ䦎顡䁈簽負㦁ᔻ茺溘昛ⵀ㯨檎䙍䛏䐈ᇨ㝷懹ԕቴ鷓㙆湢橡趗⚠砭窠棊㝅胨栤߂ݻ琤晸駊㙇㚆畄င♋萬晼杧戙胰擷嗹些仨蒠⠠ᦘ湢詡絲㟁Ԉ智韓忰ᑐ䨎顠聨琽負⥁ល茺橨崂㚓仨伴䙄㙇䃈ڤᄖ睠因贴䙔㙇▤铎㡁䇛仠仢䂷㙊㚅啎塡䡈䐝贴柢璢ꕁ鏄䝲ڒᗹ钠⡁❛茨ᄨ㛧懹Ԉ晶䙍怘湬㒭䡁禱▭窤ក⎰ᛜ钄ဇ䆑ҵዴ鶀ᐠ殽铄ڔ◛萭竣聒渰柺誣䡀㽀吤晦䙊廱Ⴈᄤޗ⦻狠⋂䒷㙁皤镎塠䁈倽贴䙛孱ᑚ檡桠你砭袠㪳孰ᒐ䦎顠表簽負⬁ᔻ茺溑瀹┸㇌檈䙋䛏䐈ᅈ㝷懹ԍቴ鷓㙅湠詡䵷⚠㠍窠㶪㝂䃈枤ڒڣ琤晪駊㙅㚆畄ބ♋萬晴杧戙胰幕澍繫勨咠ᒠዸ湡ᖁ嵲㜙Ҭ晶韓忰Ⴐ䨎顠䡈琽負ᗁល茺橥鴂㚫仨䌔䙇㙅䃈Ⴄ߆睠☠⣔䙎㙅▣㒮㡀觻仠䋂䂷㙇㚅啎塠顨䐝贴桚麣䛀叄䜂ڪᗹ钠ⵁ❛茨ᇨ㛧懹Ԕ晨䙋怘湦铍䡁䆑▭窤កᛐᔜ钄އ䆑ҵዴ鶀ᐠ殽铄ڔ◛萭竣洛槟Һ檡塠㽀㠄晦䙍廱ቨݤߗ⦻狠⋂䒷㙁皤镎塠䁈倽贴䙚孱ݺ檠顠你怭袠㒳孰ሐ䦎顠恨簽負␁ᔻ茺溙犛㭀❈橼䙂䛏䐈ڈ㝷懹ҩቴ鷓㙁■詡綗⚠䠍窠㪪㝂䃈杤ڒԛ琤晪駊㙄㚆畄ݤ♋萬晰杧戙胰摛⡎鹳仨䂀ᒠዸ湠橠浲㛙Ҩ晦韓忰Ⴐ䨎顠䡈琽負ᗁល茺橢鴂㚻仨㬔䙈㙄胨ငႦ睠㫀Ⲕ䙊㙃湢㒮㡀懻仠㫂䂷㙅㚅啎塠硨䐝贴栊歉嬡ⵄ䝂ںᗹ钠㖁❛茨ረ㛧懹Ԝ晤䙄怘湤铍䡀覱▭窤កᖐᏜ钄ݧ䆑ҵዴ鶀ᐠ殽铄ڔ◛萭竣茳蟒枺檢㡀㽀㠄晦䙏廱ᆈݤဗ⦻狠⋂䒷㙁皤镎塠䁈倽贴䙋孱ݺ檠顠你倭袠⡳孰ሐ䦎顠恨簽負␁ᔻ茺溛佾尘䏨橴䙂䛏䐈ڈ㝷懹ҩቴ鷓㙁■詡鶗⚠䀍窠㒪㝂䃈朤ڒԛ琤晪駊㙃㚆畄ڤ♋萬晬杧戙胰尻绋隓勨䒀ᒠዸ湠橠浲㚙Ҩ晦韓忰Ⴐ䨎顠䡈琽負ᗁល茺橡紂㚋仨㜔䙆㙌胨ငᄆ睠㫀圴䙈㙃□铎㡀懻仠㛂䂷㙄㚅啎塠桨䐝贴柳ꁼ嗡叄䝢ڊᗹ钠⛡❛茨ᄈ㛧懹Ԅ晤䙄怘湢铍䡁ᓑ▭窤កᒐቼ钄ڧ䆑ҵዴ鶀ᐠ殽铄ڔ◛萭竣弐ꂟ杺誢በ㽀㠄晦䙉廱ᆈݤݷ⦻狠⋂䒷㙁皤镎塠䁈倽贴䙑孱ݺ檠顠你䠍袠☓孰ሐ䦎顠恨簽負␁ᔻ茺溗㹉窈㟬檂䙂䛏䐈ڈ㝷懹ҩቴ鷓㙁■詡㵷⚠䀍窠⡪㝂䃈朤ڒԛ琤晪駊㙃㚆畄ڤ♋萬晬杧戙胰堝㘼晻勨傠㕠ᆐႼ䩀䡀䧉◜晤䙃弙茨ݨ㠧彠㝄䴮馀ዠ棽铍䳢㚋仨㜔䙆㙎胨ငᅆ睠㫀弴䙈㙃□铎㡀懻仠㛂䂷㙄㚅啎塠桨䐝贴栙镐髠珄䞢ڊᗹ钠⛡❛茨ᄈ㛧懹Ԅ晤䙄怘湣铍䡁㦑▭窤កᒐቼ钄ڧ䆑ҵዴ鶀ᐠ殽铄ڔ◛萭竣砦竻䃈桄Ԓԃ櫠ᴀ✑㝃□ᖁ㵗䇙ҭዼ鶀ᇠ欽铄Ԕ◳萭窠㚪㝁䃈杄ڒڃ琤晰駊㙃皦畄ڴ♋萬普杧戙胰捚傪▫仨䚀ጡ㕻湠溂巗㽀⚤㬮馀Ⴐ߈ᄎ嵲ԓ琈暂邂ድ☡橠硠懻櫠⣦邀ᒠ泽詠話创狠⭂┗怕㚡夛爰㦑◤晦䙄廰ݨݮ㡡㝀☠⎂駓㙂㚇畄ڄ☻萬晨杪戙胨ᐭ䡠熱◁窠ᰀ㟵□詣鴂ԉݩ窠◀ᒐሜ钄ڷ䆑ԁዴ鶀ᖠ殽铄ݤ◛萭竣弢鳘ݺ檢硠灨ꁼ晲杳戙湢亁䷗㽀䫀ᗀᗳ廰ᘜ鎤ᅆ睰㇈橪䙆㙄䌜䩀趖睠㭄孎䙅䛊萼詠穰戛琉ᕹ舑髢䃈梤Ԓԃ櫠ᴀ✑㝃□ᖁ㵗䇙ҭዼ鶀ᇠ欽铄Ԕ◳萭窠㖪㝁䃈杄ڒڃ琤晰駊㙃皦畄ڴ♋萬普杧戙胰壓呩溋仨䒀ጡ㕻湠溂巗㽀⚤㬮馀Ⴐ߈ᄎ嵲ԓ琈暀邂ድ☡橠硠懻櫠⣦邀ᒠ泽詠話创狠⭂┗怕㚵䌕䃀妱◠暂䙃㙂䊈ڄڇ⚰櫠ᗀᓱ怙湡◃跒Ԃᗍ镆䙄䛅䐜鎭䡠熱◁窠ᰀ㣵□詤㳢ԉݱ窠◀ᒐሜ钄ڷ䆑ԁዴ鶀ᖠ殽铄ݤ◛萭竣懵窹栺檢衠灨ꁼ晲杳戙湢亁䷗㽀䫀ᗀᗳ廰ᗜ鎤ᄶ睰㇈橪䙆㙄䌜䩀趖睠㭄孎䙅䛊萼詠穰戛琉ᔥ鑔黣脨梄Ԓԃ櫠ᴀ✑㝃□ᖁ㵗䇙ҭዼ鶀ᇠ欽铄Ԕ◳萭窠㢪㝁䃈杄ڒڃ琤晰駊㙃皦畄ڴ♋萬普杧戙胰旔釞蚓勨䪀ጡ㕻湠溂巗㽀⚤㬮馀Ⴐ߈ᄎ嵲ԓ琈晾邂ድ☡橠硠懻櫠⣦邀ᒠ泽詠話创狠⭂┗怕㚷鰰㓠冹◜暀䙃㙂䊈ڄڇ⚰曠ᗀᓱ怙湡◃跒Ԃᗍ镆䙄䛅䐜鎭䡠熱◁窠ᰀ㧵□詥䳢ԉݹ窠◀ᒐሜ钄ڷ䆑ԁዴ鶀ᖠ殽铄ݤ◛萭竣尓熿枺誢硠灨ꁼ晲杳戙湢亁䷗㽀䫀ᗀᗳ廰ᖜ鎤ᅆ睰㇈橪䙆㙄䌜䩀趖睠㭄孎䙅䛊萼詠穰戛琉ᒡ週鳡脨桤Ԓԃ櫠ᴀ✑㝃□ᖁ㵗䇙ҭዼ鶀ᇠ欽铄Ԕ◳萭窠㞪㝁䃈杄ڒڃ琤晰駊㙃皦畄ڴ♋萬普杧戙胰戛獌䙛勨䢀ጡ㕻湠溂巗㽀⚤㬮馀Ⴐ߈ᄎ嵲ԓ琈暄邂ድ☡橠硠懻櫠⣦邀ᒠ泽詠話创狠⭂┗怕㚹鱖疐㦙◨晾䙃㙂䊈ڄڇ⚰拠ᗀᓱ怙湡◃跒Ԃᗍ镆䙄䛅䐜鎭䡠熱◁窠ᰀ㳵□詥洂ԉށ窠◀ᒐሜ钄ڷ䆑ԁዴ鶀ᖠ殽铄ݤ◛萭竣荓瑅曺誢衠灨ꁼ晲杳戙湢亁䷗㽀䫀ᗀᗳ廰ᕜ鎤ᄶ睰㇈橪䙆㙄䌜䩀趖睠㭄孎䙅䛊萼詠穰戛琉ᕷ㬇闠䄈桄Ԓԃ櫠ᴀ✑㝃□ᖁ㵗䇙ҭዼ鶀ᇠ欽铄Ԕ◳萭窠㚪㝁䃈杄ڒڃ琤晰駊㙃皦畄ڴ♋萬普杧戙胰摸⢨㹋仨䚀ጡ㕻湠溂巗㽀⚤㬮馀Ⴐ߈ᄎ嵲ԓ琈暂邂ድ☡橠硠懻櫠⣦邀ᒠ泽詠話创狠⭂┗怕㚥皲挰⥑◤暄䙃㙂䊈ڄڇ⚰滠ᗀᓱ怙湡◃跒Ԃᗍ镆䙄䛅䐜鎭䡠熱◁窠ᰀ䃵□試鴂ԉߑ窠◀ᒐሜ钄ڷ䆑ԁዴ鶀ᖠ殽铄ݤ◛萭竣♸镘暺檢硠灨ꁼ晲杳戙湢亁䷗㽀䫀ᗀᗳ廰ᘜ鎤ᅆ睰㇈橪䙆㙄䌜䩀趖睠㭄孎䙅䛊萼詠穰戛琉ᔙ锁荡䃈梤Ԓԃ櫠ᴀ✑㝃□ᖁ㵗䇙ҭዼ鶀ᇠ欽铄Ԕ◳萭窠㖪㝁䃈杄ڒڃ琤晰駊㙃皦畄ڴ♋萬普杧戙胰崟䉪乻仨加ጡ㕻湠溂巗㽀⚤㬮馀Ⴐ߈ᄎ嵲ԓ琈暀邂ድ☡橠硠懻櫠⣦邀ᒠ泽詠話创狠⭂┗怕㚬馞⭀䆑◠暂䙃㙂䊈ڄڇ⚰櫠ᗀᓱ怙湡◃跒Ԃᗍ镆䙄䛅䐜鎭䡠熱◁窠価Ⱋ湪亁跗㽁䭄⎌馀㣵▬厤ᓤ☛苠鋢⺷忰⻐䞎趖睰拠Ⲕ䙇㙜胨ބᓦ睠䛀⬀┓廰ሜ鎤ݤ♳苠㛂㮷忰ተ䜮鶖确决汌ᗪ㝌▢亃跒ڊᗍ镆䙉䛅䐜詡㡀㝀㠍袠㞳孰ᠺ檠崂㙩Ҹ晰駑㙃䌚橠穱稙ҵዪ鷓㙂皡镎崄㒼稯幪邂☰߈ݮ㡀㽀䰄橬䙄㙄芼铄Ԕ⚓苠⋂㦷忰ߐ䞎鶖睠瀈橤邂ᔐᄨႮ嵲ڃ琈普杺懰ሐ䣮鶒Ԛᖝ镆邡ꂏ铐䜍䡡㝀⚤捎䙂䛉萼詠䩐稛狠ᗀᒠᘹ芨ߎ崂ޓ仨♴䡆㙂湡铎㡀击仠⭂䂷㙃㚅啎塠塨䐝贴桎椿佡鎤䞒ҹұ袠ዠዸ滥橠䡀䇋琬晨松懰Ⴐ䢮鶒Ԃᖩ镆邀◕☢厤䛆睡卤奎䙫䛇䐜詥婰䇳狠甴䙸孰⢐䥮顢硨怽負傡ᇻ䌈ᙍ䡃憱ԝቾ鶀╀榽铄န◳耭窤ᓁ╛湠躁緗㽀Ⳅ㬬駊㝈□玤ڲራ仠ᴀᡊ㙄□橠鶗⚠䐍窠◡ⴛ湢◂緗㽀䝄㔮駊䜷項开鴂㜉ԅዼ鶀ᘠ欽铄ݴ◳萬晲䙂㙂䌜䩂趖睠蠈橦邂ᏐᆈႮ嵲ԓ琈晪杺懰ᄰ䣮鶒Ԋᖝ镆邡鲧鸖䜭墁坠⭀⚂䙃㙄芨朤ڂڋ氭負ᓁ㕻湠躂巗㽀Ⳅ㬮駊㙈胨暭䡠彠㫀㜦鞀ᖹ胨ဈ㟧彠䍄兎馀ᔠ栽铍䩟渿㒤㔖䡑㙁㚇畄Ԅ☻萬晤杪戙湠橠塠燻櫠Ⲧ邀⛕☡ⵄ䚢ԉҽ赂䙅怕□溃䷒Ԓᗕ镆䙆䛃萼鎨㺨ᖧ蹹粤㡠⢐߈ݮ㡀㝀㠄檊䙂㙁芼铄ڄ⚓苠☢㦷忰Ⴐ䞎鶖禱◅窤◀䣵⻀槤Ңዱڄ晲松懰ጰ䢮鶒ڊᖩ镆䙉㙁□㒮㡁击仠头䡃㙄芨梄ڂڋ氬晦䙄弙湠躃跒Һᗍ镆䙃䛅䐜鎤ᅆ睰⚤捎䙂䛉萼詠䩐稛狠ᗀᒠᘹ芨ዮ崆睰㛀ᚢ䡑㙁■钎塠㽀㠅負ᗁ㕻湡◂巗㽀㝄㬮駊㙉䃈枍䦠㚡Ҡ曞䙃㙖㚆啄ᑄ☓萬暸杣憙湪ⵄᔖ睠杤䔮䙐䛆萼詢ᖐ稓琈檀䙅孰ቨ߄ڷ䇉ҽ贴䙈䛍䐈Ⴈ㞗懹ԁቮ鷓宀诉縻皶罰㇈橪邖Ⴌ■ᖈ㡀灨ꁼ晲杳戙湢亁䷗㽀䫀ᗀᗳ廰ᗜ鎤Ԗ睰㇈鉤◀Ұ㔈ᣄᑔ♫苠胢㒷忰⥐䚮趖睠搈曜杯懰㗐䟮鶒ሲᖩ鍆邀ᔵ□䩀衠槻櫠Ⲧ邀ᐠ泽詠穱创狠⢂┗怕㚢嵳㻀䦙▼晤邂ᄕ⻀棤ҢሡҬ晨鞀ᆐጼ䪁顠䝀䰅赆䙃䛏䐈ڨ㝷懹ҭቴ鷓孰ሚ檠鴃噰㛀ڀ厀㻠沽試㩐騛狠裢ᓶ怕▮玤Ⴄ☛苠䛂⺷忰ᖐ䞎趖睠㿨晤䙅㙄䌜䩁⏖睠⚤孎䙂䛊萼詠䩐戛琉ᒝ㓺象脨朄ڂᅓ倈鉤㙠ҰڈငԒڋ琤晾駊㙃皧畄ڴ☻萬普杪戙胨ލ䦠㙀噐晤㖿ޟ♠◂⍒㚙㙀ᘀጠᄀݰڈԄႠႧ遢畤䙠桰䝂ᒲ◒ᗑተ㙳㛂皤◁Ⴃ㽈ᛄݢ㚁ᖈⲐ䚎洒㙒ᯂဘ䙁㙂湡玭䳴⨻此⍶䡁㙀湠濃塠Ꭸ婸晠杤宀桤⇤㚄Ⲥ絠ڐበ䣆枰䙄چ罨⪩ꖂԀዠ虠澁癡硨ꌠ☣ꡟꜣ礣䙃䡀䡈㻀☢☖姱Һ锨㙗⚠Ⴄᑨ醡䕵ᑈ木㙧䡌ጫҠ邈Ⴀ☠䟠㩐ႨႤڂᛌႥ皤ᖀᖐ䦒ᗁተ㙳䛂脨ҩ堔◠本桨ጠᄀݰڏ隄ҲႦ型晠㩁Ҩ暄ڄ▻绨ဌ䡂䛁花䛈በ䡍ጷҠ乢Ԇ榢詠䜐⠌颷Ҡ乢ұұ䟡塠ݡ鰁ቤ骡暩噠ⵅԀႰᗁ㚀ᗫ㛁湠䡆ዠԂҭڀҰ䩐Ⴚ誠䡀㽀☠⋒䡂⻐木ҤҲҰ鋤ጠҰ㹑ң䙁園ҩҰ䛞䝅㙀橣溂ᖐ曡狠⋖ⳅ㙀湡ቧ顠你⬀諣䛕虠⠀晤䙄仈㛀ݢ黑䜈䬰ҭ䡐恭䢗Ҡ乢Ұ柰奲艠ᄠ■橤条㙀㚀键梀ᔊ㩴ᗀ⏈Ⴄᒀ蟀䩂Ҳᨽ賢ᅑ㙀䃈曈㙷䝐Ⴆ垇晠孴ݠᗀ穰榱䙈ڄዠԀ誄鹠⍂㙂䉑ڀዠһݣᖀበ㟰◀㹂⥁犪陠ᖀ㩗靠㐝裌በᣐᄨڨ㙷䛁廠⠠瞁ᆆᑂ蚨ᖐ⚠Ⴄ敂䡀恨⻈ڄҧ䧈杕皤ጡᇺ☠◓⛜ң伀ᖀ䡃䛄䃊ڀዠ⚠Ⴆ䝧晠孱ұ蛨በ⚠ߘᖘ䙀㙀珠条晰聬袷Ҡ柸煀Ҫڀᖗ靠➝裌በᣐ߈ݢᕲҹҰ䛞䡅㙁㚀铤چ罰◠諣䛕虠⠀晤䙀䡁ҡᑰ鞡溩陠ⵄ㚴ⵄ絠ڐበ㛃ݿ躓⛼ҡ䙈ڄᄡݰҰ䚮趢㙃橱ڀ⏈Ⴄᒀ䞨㿉呠ݠڀᅒ䅁Ҩခ塰Ⴀ䋀⬬ቨ㙀□洠䜂ԑҼ鉤⫠ᒐҭ暡ޔⵄ絠ڀពႠ㚨㣸Ңұ繨ڀᒐ仰朣ᄡ婹欎Ҡ晠䙂彻ݠᖀ霒□Ҽ晬屢ᖐҨ߆蚀蝠㻀㒬ቬ㙃■⍠䛀聭䢗Ҡ䙅䅁Ұ婲艠ႠⲘᖀ⪡ᣐڈڤچ盡庌晢㚑㝁榡䟀朒ԁҸ䚢骁ᔠ晨䙈㙂◈Ⳁᘀ䙁◄☠橠櫰蹡Ҩ晨醂Ⴐߓ蠀በ⚨㫀ᗄᒍԀ晨䚤Ҳ■噬㲀ᄡ⠵⠀晤䙢ҡҨ晢䙇䛎菰䛎㳤☣伀ᖀ䡁䧍湠ᖀ䟲□ҽቢ骁ᔐڃ䙁園ҡҵ諪ᗀ䛀◡亀㡀娀朹ᒹ㰀Ҵݠ㑤䙄仈⭀Ԁ揈䛁䍐噲剠ᓑ䙈ڂҫ㙀㞃䙡嚔Ⴀݠ⡀Ұ䩑ڈݩ顠⚠㟬橤䙃䫸滠䦤㚒ұҬ晢䅡ᆐҤᯄ䙀蹠劌晪歭ҰႰ婲艠ᄠ■橠玀ᆐҨݭ字☈ݠ⡀ᖐ䷰柨ނက㡂ᗁተ㙳㙁禡▤ڒԀ杜晬䙃▹■躐Ԅ麂ݠ⬀ᒐ┦ݢ詠婷槪ᴂ䷠ڪ㛁ݿ躓⛼ҡ䙈ڄᄡݰߐ䚮趢㙃橱ڀየႤᒀ䞨㿉呠ݠڀᅒ䅁Ҩځ塰Ⴀ☠⬬ቨ㙀□洠䜂ԑҨ鉤⫠ᒐҭ暡߀◹Ҵ晦䙄孨⦢詠睥⚰⫴ቶጠᄀݰڈԄҲҩڀᗁ皪陠ᛀ䙂㙂剱ݣ䫕虠⠀晤䙂Ԃ劔ᘂ◡ᖈⲈݭ䩑䡈䚀贴杰䛄ᖌ鎨㹈Ԁ本橠杰憀Ҩ䙤ޔ□繨㚀⥁ҰҰ噰╧⚠ᛅꖌ䡀⻛ݡᖁ婰Ⴀᛄ䜨䙀⻛ݠᖁ壠㙁◀䁂杠㛁楢ᅈ䃉呠ހᖀ䝂䛈㚂ቦ塠Ⴀ㟬橢煤䙠邅幠ᖐᇰ□ᓁ㰀Ҵݠᖠᖚᘮҡበ屢ҰݨҢᑢҰ枤桦⪨ᣐݨݢᚲ▢⋂几Ԁݻݠ◕⛼ҡҠ鉤ԀҰڄᴄԂԀ杜晤㚑㛁楡蟄ޒ晰䛄㻃囵虠▢譠䚂㚒⍢几ԈႠ䃈暆蚀ቭ碷Ҡ栔煀ҪڀዠႠᘀڀᄫ⻛ݠڈԄҲႦ羋晠㩁ҡ▨㹉䑀ݤҦ暀Ҩ㙈Ⴈ蜰㝀ހᖐ䡀⋀ᑃځ婻謎Ҡ癤ԂԂ湠ᖁᘷ㚨㩰㑖䙀◅ᓀᖀႤ罠坼䁀䙀㩁Ҩ暨䄉呠ހᖀ䡁䳂䘈ڄҢ晰㟨晢煥䛀ᑃ䙡婻謎ҡᓹ㰀Ҵݠᗀበ杠ݠ㛒䅶Ⴀ▢ᖁ䳢▪ᯂ䷠ԁҡ㙀湠婢ҩҠ癤ڇዠ■ᛀ䛂㙀婤㹄⤋㙀ᖒ栀በݢ勠㻌ⳁᦀ醅幠Ꮐ㙁ᖥᒁ㨀Ұ晠湠婢ډҠ癤ڏዠ■ቨበ炸婨㲀ԈႤ☠ᇠޔ□ᖀ㲀⛀Ҩ㙈木㞄◠本橾醡⨵滠䡊㡠ቨ䚀負ګ㙀胨晤Ҥ☢ᖠ䚦䙉宄洨栂ᛒ☑Ԕ晾㚏㛀㚂◁Ⴃ㽈Ⳅ仢▰㿐枰䡈㛁ᆙᖉᓙ㰀ҰቨႢᛒ㙊ᖠ䚦䙁寱ڄ➤䚳噰Ⴆ澋晠㙅㚂ⵄԂҹҵ笴䙁宕滠贠䙂ԙҭቢ颖Ⴂ㚂◁Ⴃ㽈㭄仢▰㿐曰䡈㛁ᆙᖄ普䙃◇湠䩀䡀偨䟭笴屢ዠ钅幠ᖘᖄҤ鉤Ԁ⋐ᕄ█㹉䑀ބᖀ䝐㙇㚂ⵈ㻉䑀ބᖀ嵢Ұᔈቦ隀ቬ墯Ҡ䙌䅁Ұ囲扠Ⴀ伸ᖀ柠灀ҨႦ蚀ቬ䢏Ҡ䙎䅁Ҡ蹤Ҥ◀果晠杧䅁Ⴈ晨㚆睠㽤䁀⤠ᘐᓑ栀顠潠嫠㤖䡀㙄湠ቩ面轠ႦҤ畤䙐ጨҢတ蚠勠ݢ黑䜈䬰ҭ䡐㙓ꎦ型晠㩁Ҩ暈㙒Ңᖍ鍈䡀廢㙈څԀ曀ᖭᒱ㰀ҰҨԎ䦠㙁Ҩ㲂ԀႰጭ暡በႠ䬘ᖘ䙉㙁⻀柤ݲҡ繨㙘⎫㙀⠀晤㙲ҡԀ鉤ԀҰҪڀ桠禱繨◠▰仱ᄰ䝂ᒲ▱Ҭ䛢䡁䛄ᖌ誀በ杠☠⣖邂ᒐႤ➤㚲ԑҰ䚾䙃㙀■反䡠Ⴀ㛀Ⲕ醁ዠ醅幠Ꮐ㙁ҡ㑈暀Ԁ邅幠Ꮐ㙂㹴ᴀԈႢ㚀针㙔廈㩉ڀҰ䩑ᄰ噠䬰䡁Ҡ䙜⪡ᣐҰ䟍䣀㙁▨晠杨孴ݠᗀ㪰䡁Ҥ晤屢ᯐݨԆ蚀曀ᖭᒱ㰀Ԁ貅幠Ꮐ㙂ᨸ晪杣憛芭暠ޒԁҵ窢ᖠҰᄤ➤㙀蚈卦羋晠㙃珠晨䂉呠Ⴆ澋晠㩁Ҩݭ䡠ᇰ■普䙀䛀苭暠桠团櫤ᯘ⎫㙀■ᛀ䚂ړ伸ᖈ栄煀Ҫڀበ禱ᖅᓙ㰀Ҵݠᗀበݢ櫨ݢ▰㿐Һ誠Ⴄ齨Ⳇ澋晠㙀湠⺤䚓噰Ⴆ羋晠㙁珠晤ԒԊᖅ諌ቤ䛄㚂ቦ塰㡈睤㙠妁ހ橰䝂ᒲ□Ҭ晪㚏㙀■䩀䩐榻倈鉤ᗁ芪陠◐▨ҩ繨Ҹᛋ䜒䮰ҤҢԃ勨Ꭼበ䜖䮰Ҩ䄉呠ހᖀ䡂㙂ᖓ誠ᓠ㙁Ҡ晢条彻ݡᖀ䡀䛁ꌠᖠ瞁ᆆᄢ躕⛼ҡҼ鉤ځ皪陠◔⛼ҡ䙈ڀᗪ㝀⻀晤ڲҠ木晬㚑㛁楡ᅈ䈉呠ݠ㚬በᯀ椨ငڂҠ朔晨柠ᄇ杰ᖀ顠䛀拠⫠瞁ᆆ߂詠橷槪ᴂ䷠ڪ㛁ݿ躓⛼ҡ䙈ڄᄡݰႰ䚮趢㙃橱ڀየႤᒀ䞨㿉呠ݠڀᅒ䅁Ҩځ塰Ⴀ☠㒬ቨ㙀□贠䜂ԙҨ鉤⫠ᔐҭ暡በ团櫤ᯘቫ䜠䮰Ҩ䘱ꁐ□ᒙ㨀Ұᒍ暠ᖘ䫞Ҡ晴屢Ԁ蚄鹠በ栐□ᒹ㨀Ԁ誄鹠ᓠ㙂⋒䷠ځ犩陠⍠䙄Ⲅ畠ݣ㛓虠⻀晨䄉䑀Ⴆ枇晠䅁Ұ婲扠ቬ袯Ҡ屢Ԁ鎄鹠ᖚ櫾Ҡ鉤ځ窩陠◔⛜ҡ繨ݣ拳虠㚬㢸ң噰Ⴆ螇晠䜔䬰Ҧ蚀ቮ㢏Ҡ栘灀ҭ暠ᖛ櫾ҡᓡ㨀һݠ◙澜Ң⎢䷠ԖႠ㚰㢸Ҥ㐄畠ڬበ䜪䬰Ҩ䋉䑀ߘᖀ栨灀Ұ干扠ᇰ□ᔹ㨀Ԁ骄鹠ᓠ㙂␂䷠ځ誩陠⍠䙄㔄畠ݣ盳虠⻀晨䒉䑀Ⴇ垇晠䅁Ұ扲扠ቮ袯Ҡ屢Ԁꇄ鹠ᖞᘞҠ鉤ځ骩陠◜⛜ҡ繨ݣ髳虠㚺㢸ң噰Ⴇ螇晠䜴䬰Ҧ蚀ቯ颯Ҡ桐灀ҭ暠ᖟ櫾ҡᕡ㨀һݠ◐澬Ң▂䷠ԖႠ㚠㣘Ҥ㘄畠ڬበ䜆䭰Ҩ㹉䱀ߘᖀ柨烀Ұ噲牠ᇰ□ᒩ㬀Ԁ袅㹀ᓠ㙂ᴂ俠ځ檪噠⍠䙄Ⲥ祠ݣ㛔虠⻀晨䂉䱀Ⴆ垉晠䅁Ұ奲牠ቬ梳Ҡ屢Ԁ醅㹀ᖚᘦҠ鉤ځ皪噠◓⛬ҡ繨ݣ嫴虠㚪㣘ң噰Ⴆ瞉晠䜐䭰Ҧ蚀ቭ颳Ҡ栐烀ҭ暠ᖛᘦҡᓑ㬀һݠ◘澬Ң⎂俠ԖႠ㚮㣘Ҥ⻄祠ڬበ䜦䭰Ҩ䉉䱀ߘᖀ栠烀Ұ嵲牠ᇰ□ᔩ㬀Ԁ颅㹀ᓠ㙂⏂俠ځ蚪噠⍠䙄㔤祠ݣ直虠⻀晨䍉䱀Ⴇ㝩晠䅁Ұ拲牠ቮ袳Ҡ屢Ԁ鲅㹀ᖝᘦҠ鉤ځ鲪噠◜⛬ҡ繨ݣ蛴虠㚶㣘ң噰Ⴇ辉晠䜴䭰Ҧ蚀ቯ䢓Ҡ桀烀ҭ暠ᖟ謆ҡᕡ㬀һݠ◞⛬Ң╂俠ԖႠ㚡㣸Ҥ㘄祠ڬበ䜼䭰Ҩ䕉䱀ߘᖀ柬煀Ұ噲艠ᇰ□ᒁ㰀Ԁꔥ㹀ᓠ㙂ᴒ几ځ檪陠⍠䙄⬄絠ݣݵ虠⻀晨㽉呠Ⴆ㝫晠䅁Ұ䝈㛁ᆙᖕየ杨▹溠溂ᖐ曡狤Ꮓ勵虠▢ᖁႥ⚰Ⴄ㙠妀ԕ滠ቩ颀㿰□ᓉ㰀ҰᏐ䝍䡀⚠☠⣔邀ԕ䄈朆蚀Ⴀ⭀⢂ᅒ䅁Ⴐ䝈㛁ᆙᖉየ杨▹溠亂ᖐ曡狤ڀᒠᏈ㨈ҤҲҲᖡ紴邖Ⴂ㚮㣸Ҥ⪤በᎬበᦀ晨䚨䂉呠ހᖀ䡀㙂㦃䙈䂉呠ݠڀᗫ㝀珠晨䄉呠Ⴆ羋晠㩁Ҩ暤ځᎹ■鉤ԀҰڐ䙮䦠㙡Ҩ晨㙿㙁ᖔ䩠園ښᗁ窨Ԁᆅ除暤乐䈱⪡ᓀ☋㝃⚠ᖀ詻ҳ仨㑠䁠ᒠ鉡厤䛡ߑҹᔀᗪ㙃盜ҢᙒԒ⎀♴椖鳌勘鼱耓堘⪠晬栐ድ㛭菻⤞䑴峌鋎ᒀ㙃㚪ݭ䩫巆褧淭⻛䅛朠ᖀ詺ԃ佪鐹缑顃䦦账隐Ⴀ㽆器邢臖岌拘輹耑艬ڀᴁ湢䃐紽珫㕞䁶峌嵣Ұᆐ坠洄㯷姂訧泭珻㐀虤ڤ㯷姂訧泭珻㐀陠桠塮虹童茘齑埂饕鐠ᇸ⪠晬栰ᒵ㛷㵞䑬劼蔛幠嵣Ұᆐ彠贄㴥訧毫⦷緎ҭ蛀በ塮ҹ童茘齑埂饕鐠ᇸ⪠晬栘ᒵ㛷㵞䑬劼蔛幠嵣Ұᆐ屠贄㴥訧毫⦷緎ҭ蛀በ塭䙙童茘齑埂饕鐠ᇸ⪠晬椼苘鼑埒ꆍ虡艮晬ጠ㙀盐䙉隤Ⴀ㽆虮邂ᔈ⋈ငҢҨ暬晬栐ᄕ☠ᖀ驿Ҡ枔媠ᴁ穠胨Ң߄□ᖜ⋀䙆䜀Ⴚ橠鴂㙁ҹᓐᅊ㙃胨来癠Ⴐ䫀ښҠ忽Ҡᖀ詺ԓ仠㔔䡁㙄湠䯠ҧ䀐Ҡ晠条孱ҨႨ㙖矈Ҡ橰䙀㳀Ҽ趠ҢҪᖅ窤Ԁᖐҫ䙀⏓癠ݠ㓂Ꭺ㝃皨⚁癠绀ᖬ晢歭Ԁ晨䜤Ҵ▪䉑ڀᄡ斘溣䚨በ塬ұ窠┊㝄■ᖀ鴂㚙婠ڄ㑠ᖖ晠㒧䙀Ⴀ㽆晬邀ᔵ☢䩁衠濈ҡ賔Ҡ㙄㚀厤䛂ښᖅ窺Ҡ㝅湢ᦀҧ䀐Ҡ晲条孱ቨᅄݢ蹠ሌ驠Ԁ⋐ሐ䚍䡠悘婠㲀Ԁᔵ◠ᅄҴ▫歴䁀䙆䜀Ⴚ橠鴂㙉Ҡ聠ԂҰڋ䙀⏓癠ݠ⭃䙆孰ሚ檠㡀ႠᘴҠ馚Ҡᑈ߈㹀䦑□ᔀҰ✰Ꮘ߈䁀妲⎠Ԁ㥠ᒠ遠厤Ҥ㕀ځ䁴䙆䜸Һ檢硠塯晱窲ᒀ䇁晨߈䗀ᓑ◸晬桘ድ⡀虦隐Ⴀ㽆Ң邂⦰ᆐ噠紂湸ߜᯀ䙆䜄ښ檣በ塬䙕窲ᒀ䇁晨߈㽀⥑☄晬柰ᐵ⡀虦隐Ⴀ㽆噢邂Ⳑᆐ奠紂湸ߜᯀ䙆䜐ښ檣塠塭ҵ窲ᒀ䇁晨߈䋀ᓑҹᓨᡊ㫁ҭ蛀በ塮晡窠ᴁ葢胪䚀ᓰ㹁ҹᔰڪ㙃㚱ލ䣐㙁艬ڀᴁ陠䃈߈䌀冱䙈ڬበ㙃□殀擠䟸㇀晬䙆㫁兡䴠婢ԑ䩏晨䝨㙃⠀筠硱蝠㽄㜔䡝㙃㚸ލ䣐㹁艬ڀᴁ◕☧橠詾暋伄ᯀ嵣Ұᆐ䥍䡡齠㽇虪邉ᆀ㐀虤ڤ⚣仨暠ᴁꊢ胪䚠ᓰ㹁ҹጰ邂㛐ᆐ噠贂湸ߜᯀ䙆䛘䃈檤ڤ⬀㿨硦ԗᆀ□溇⍂㝙ҹᒠ⇪㫁晭蛀በ坠㻤═ភᆀ□䛈በ垨㖀⡂侀ᒔކ߄㢂Ԓ╠ᙔ䝥㙃㚲ߍ䡐杠㽇晦邁ᣐᆐ乭婰䧑ᖸ晬栐ᐵ◤䩀詽暋令ڀᴁ驠胨䢄ڤ㖀㟨桲䙆䜠Ⴚ檁䩐Ⴈ噭ڀᗁ㙐ᄨވ㡄鼹◔䛜䝓㙄皮ⵄᇲ湸ߜᯀ䙉䛘䃈ᓅ㙰ᇸ⪠晲枈孰ᴊ䚠ᓰ㹁ԅጠ邀⪴朠⎀噢ڊᗡ窠㵩ᆀ㐀虤ݴ☣仠劲ᒀ䇁晨ᄈ㛆睠笄ᯀ嵣Ұጨ߅㙶栘⪠晴䙒㫁晭蛀በ硨䟨暄杨孴朠⎀噢ڒᗁ窠㢁◕⡀虦隐Ⴀ佤圴䙒䛌䃊䚠ᓰ㹁ҹᒐᗪ㙃㚬ԍ䣐㹁艬ڀᴁ湢䃈߈䇀⥑䩌ڮᒀ㙃㚦ݭ䡀塮ҥ窲ᒀ䇁晨߈䁀䦑ҹᔐᅊ㫁晭蛀በ塭䙑窠ᴁ蹠胪䚠ᓰ㹁ҹᓠᗪ㙃㚶ԍ䣐㹁艬ڀᴁ艢䃈߈䑀⥑䩌ڮᒀ㙃▧⍠僠你㻀盎ᕠተᆈ߅㙺晩艮Ҩ䙀䛜䃈暄ዲ湸ߜᯀ䙀䛘䃈曤ዢ湸ߜᯀ䙀䛔䃈杄ቲ湸ߜᯀ䙀䛐䃈桄ቢ湸ߜᯀ䙀䛌䃈棤ሲ湸ߜᯀ䙀䛈䃈桤ሢ湸ߜᯀ䙀䛄䃈欤ሒ湸ߜᯀ䙀㙃⡀虦隐Ⴀ此圴䙎䛌䃊䚀ᓰ㙁څዠ邀⏀橺殀䙃幰ݠ䣂☊㙇㚂ⵅ㙠ᇸ■暂䙎㫁ҭ蚠በ坡㜘ថᰀᒐ⡍蛚ڒڑҨ晦㙓㙃▣◀㳢㚢ᗡ躠⬁ᖺ㚠㙟曗⦱ԑተ鲡曟ߜ䩁橱樓瀨鉥⪢㙅□溑暆硨㚀䲀ᴁ繡䃈߈㹀䦒␀ዠ獺㙃⡀ꂠ硲睠㻠ថᰁ㧐ተ䵍䡀⛨⪠鑦Ԁᖠ牺橠棰㹁艬ڀ◡㩵□讀噣幸ݠ㛂䚪㙇炠虦隐Ⴀ䝄圴䙔㫁晭蛀በ桨栈暀佣һ朠ᖁᖐ榱ݸ硦ԗᆀ▢ᖀᏐ㹁艬ڀᴁ穣䃈ᅈ㛆瞨⪠鑦Ԁᒠ鉡玤ޔ☣伄ᯀ嵣Ұᆐ嵠贂ښᗡ窲ᒀ䇁晨߄ޒ湸ߜ␀ᰀᒐ➍暱ڲԑވ鑧晦㙃㚬ဍ䡠⚡㭇虠㚍Ⳑᆐ塠鴂㙡Ҥ䙘䙆䜐ᆚ檠顠䡉ڀ䲀ᄀᔠꊠቩ砂ڪᖍ袢ᖠᒠ詠玤ұڢᖀ桢䙍䛀脰䚩隤Ⴀ孤齂䝔ᇠ■䩂崂㙹Ҽ聠Ԁᒠ詠玤Ҷ睰挔Ҡ馚Ҡ□躀㳢㛁ڀ聠Ԁ╀暺氀ҧ䀐Ҡ普杢孱ᖈብ癠Ⴀ捤ᙔ占ԙ瓠Ҥڴ▻仨㒀⏍Ҡ▣躀崂蹠ሌ驠Ԁ⠐ڐ䛍䡠⠸婠㱖䙅㙆脨䛤ڀ䡁Ҥ暆邁ᔐᆐ塠䳢ҫ令ቦ暀ᔐላ䙀በ✈ҡ賔Ҡ㙃皠厤㚲Ҫᖅ窢ᄀዠ暺誠朰ژ勠䂀㦪㛂□䟠ސ罠㽆晰還ҥ跢暅鹒㹂ᯀᑖ䡄㡀■予⍂◈⚠ᘀ䙁䛟礡▤ڄ➃仨媠Ԁᐵ☡亇⍂湠ߜᯀ䙄䛘䃈槄ڔ✣伄Ҡ嵣ҰႰ䭍䡡蝠㭄眴你һ朠ᖀ橲ᓑ☔晪枀孴晠⎀噢Ԃᗡ窤䑠ᐠ決殀ң幸ݠ☢㚪㝏湡亂⍂湠ߜᯀ䙄䛄䃈橤ڔ◣伄Ҡ嵣ҰႨޅ㙀ᇸ⪠晨桘ԕ㛀⎀噢Ԃ╠ߔ桠䇁晨ݨ䓀ᓒ■鑦Ԁዠ鹠ⵈ䙃幸ݠ☣繠宁ҭ蛀በ䡎晡竤ԗᆀ□◙Ҧ硰ߜᯀ䙄䝀㐀蹤Ҵ▫绤桦暡虠■䩀㩜Ң拌橬条开晨䛤ڤ▪䉑ڀᴁꙀ䊈䞀婢Ԃᛁ粠ᡊ㝄■ᖀ紂㚙婠ڀᖠᐵ☢䯠ҧ䀐Ҡ晰条孰ᑐ䙭䤐ҡԅቢ邍Ҡ䌎晠በ睠㭄ᙔ䡅䧆晢蟀橢Ԃᛁ粠ᡊ㙀□厥癠Ⴀ㛀⣔占ԙ瓠ҡ塠⚠㿬桢䙀㙃䃈䙈㚂♙Ұ癤暂㝐枨ݥԇႱ⭄⬀ᖨᄈ☩ᖡ硠䞀✠檪䝑㙂⠀烤䢢◙Ұ癤檂㧐棨ݥԆ䝑䛄亠ᖨᄚ☪䩢塠䞀❀檴䝈㙂⠀煤䣲◹Ұ癤麂㱐殨ݥԄ東嫤䊀ᖨᄞ☫檁㡀䞀❐檾䝌㙂⠀濤䥂☙Ұ癤节㻐橠蹤ڲړ佤㔮䙔忱ᣈဍ䩐爙ڍ貤㹠Ꮠᆚ満鷒ګ狨䂀ᡊ䛄萨ዮ墁潠尉ቺ鶀ᒹ滬橡㡀覲ᖝ钠㖳㝇湢厨㛗彠栬檀䙏宀榽詡涒㛉ځ竢㢷㙄茨构ݢڛ佤㔮䙕忱ᒚ満鷗㽐㻀㤔杩戙滤詠贄☋苠㼦䡕㙉胰䢎顠燹ᖤ晸䙈㙆䃐䝮顠駹◙竢⺷㙅茨柄ဆ硨瀼晰馂ᖐᣚ満鷒ݫ狨㺀☊䛄萨ᒮ墁⚠堉ቺ鶀⤹滥ᖂ㳤☳苠㜦䝈㙌▥橣⍄☋苠㬦䡊宀櫽詠鶒㙹ԕ竢┗㙅茨柄ڶ硨䰜暀馂▰ᑚ溁緒ګ狨䂀㚪䛉䐈ဎ塰彠拠墠壊䛉䐈ގ墀冲ᖝ钠⡳㝅□厨㛗彠怬橼䙊宀榽詡鶒㚹ԙ竢㢷㙂茨䛤ᅔ▫勨呺ҫ㙂▢䩅贃噱雠◠㭠㱵⻀浤ڂݹޅ竌ዴ㙂□橤崃噱曠◠⫠㷵⻀毤ڂځމ竌የ㙂▥ᖅ⍃噱㛀◠㝠㣵⻀橤ڂݡ߅竌ቼ㙂▢詥崃噰蛠◠⏀㥵⻀棤ڂکݱ竌ተ㙂▣試⍃噰因◠㑠㳵⻀杤ڂڑݽ竌ቤ㙂□䩄䳣噰Ⴄڀ㢁ޘ脨ᖮ㡁㡈㰑Ꮐ韊㝂皰⺤㚢Ԋ⎝ꖖⳂ㙁湡澁皒ұҵ窤កቴ朠⎀ҢԊᚡ窠䁩ᆀ㐀Ҥڔ✣仠岲ᒀ䇀Ҩވ㣆睠霄ᯀ嵠Ұᄰ䩍䡁辨⪠鑠Ԁᐠ決橣裰㹁艠ڀᠡ◕▧讀噣幠ݠ⢂☊㙐⡀虦陠Ⴀ潤ᑔ䝒㙀榠ᅄڄ⪠ᦈ湠㕋㙂湠亐溼Ҡ杨Ҷ䙅㙃㚪㜘ҡዠԌ晬䙃䜔䟰Ңᖰڟ晼ተꙂ䙁㙈Ҩ㙶硫頤橤䙀寱ᄨԉ塠偨㝭詺Ԁݰᄺ誠驰䢈婠普杣廰桰䙄㙐㡁Ҡ晤汭Ұᄰ䚮㡐㹒ݠᗀځ昙胰䚩㚄ႠݤᖘႫ㙂皿㑤㚢ҡᖈ⋀䙁㙁⤀Ҩ䈷ꃳ仠ᗘҡ䜟蘲玤Ԃ虠⚦ꗾ烊㙁⤀ڨ䈷ꃳ令ጠጡድ◠橠詰䦙▸䁀⤋㙁瞣䙀婢ҩҨ繠ځ蘟磺檀㡀㡈ᦈ桤䙃䛀脨曁癠纹Ҡ晪邁ҡ㙈Ⴈ眰Ⴀݠ㓂ꌑ孱ݫҠᖛꊚ令◠◡ރᓀᖀ桠㞠ҥᓾꛊ孰杨Ⴈ㙤囈ݠ◠ዬҡ㚯陉䳢◀勠㓂Ꮆ㛂湠䩀洂▸Ⳁ晠䝁㙂瞣䚈䉀⚠㫀⢃晡䷭满◀嵲◑ұቤ骁ᖁ㙈ݨ䘀⦩▽⠈暡Ұ曣ԁ塠⚠䍄ᚨ邁ᘠ晨䚀婢Ң㩴ጠዠҴݠᗀ䩗ꈺᖝ銠ጡᒻ䋐嚐亠槫仠ݢᗪ㩁Ҩ暨㸷䁈䐘晤杦憙㚠嚰曧⥑ҡተ邈Ⴀ☠溏鶔◛绠ᘂ⇶往蛀盡⎶睠Ⴄ㼔乢ұݰ噎婰我ҩቬ鳒䜀蜁Ⴎ㳢▱ҡዠ邂Ұጱ蠀ސ罠㫀♶䝅㙀湢ⵄ㙂Ҳᖡ鋣꜡ꔃ芨ڈ䘸㘠䐅竣ᆀዶ㚄㔄Ԗ睨⭀⭊Ⳁᣁ㙈Ԉ皤ቨݤᖘႫ㙀湡躀䶆睨ݠ⭂ᅋ䜿ꡟꡀ嵲㙒ᖅ窤ᗁᇸ溠䚈በ㡈ⴄ☠杠㛁ᒀ䞤ڄ㘧ꡟꔎ鞁ᒠ晨䚀婢ұҠ癤Ԃᄀ蘼躀鷂Ҳᖙ鍄柡枢ቼ厤Ҥ◃伀ᖀ䡂䛿茰䜮衠㡈䀙諣ᆂ桤䊚橠ᖐ榱䙈ڄጡ昙皡锤Ԅ◓耩ᒃᏄᖸ胨Ҩ㜆瞠■橤柟怀栽橠䩐娓潦ᒅᖈ引◠橠ᖑᓑᖀ晬杤寱ᆃ䙁園Ҫ㩴Ҧ暀ႰҪڀዠ㡋ꑭቮ鲀ᄀ柽璨㹘㩠䠅窢ዠԀ杺檀በ⠈ᦌ橢Ⳁᣅ湠溁┄㘼▐㔢䙂䜿蛟ဎ㳤⪬ұ绢㚶㙁胣蟄Ҵ亂ႤҾ⤠ހ朼䩠䙤Ⴀᛄᑖ杣䫂㙃ԁ塠⠋頤桢ᓀ㙁湠ᣀҤ㐻ꏉ窠ԌҠ盏陉䳢ҡ噠ᘃ旟䭵■ᣀԔ㐻ꏉ窢ᒠԀ杺檀በ⠈㟬橢Ⳁᣅ湠漁癠䁁Ҭ晠剠Ԁ阿辭䡐㽀Ⴄᑔ䝀㙁㚀叄䙠蹠劌晦⪜ᒀ枿詠Ⴅ㝐ݠԀ溂Ⴈ㨈䙠䩀㡀⚠晠㚉⋀■ᛀ䙂▸⚠晠㙾䣂㙈ڄԖ睨☠ڀᒐ乱Ұ孲艠ᄠ□㑚ᄀݴݡ◀嵴►䉴ᘃ䛕虠■洠䙂ҡҨ晢㙭┥湠橠崄☣令Ҹቫ㙁盀ډ隤Ⴀڀ䉘Ⴋ㙀㚃ⵅԀႰ㛀ݢ☊㩁Ҩ月隤Ⴀ㫀☌ቬ㙂□䴀䛀虨卦型晠䜌䮰ҥԀቫ黠⋂ᓶ战珠晡嚄Ⴀᗀ鱨暀ҰݨԂᑐ虨剩Ҥ晢䙠醅幠Ꮐ㙁ҥ㑈暀ހ邅幠Ꮐ㙂䉴Ꮓ仵虠■⍠䙄Ⳅ絠ݣ䛕虠⠀晤Ԇ睰ᙘᖀ䙀㙀橬桁婺謎Ҡ晠屢Ԁ辅幠ᖚ䫮Ҡ癤Ԁᄕ☠䴀䙂ҡҥቢ颖Ⴂ■◕⛼ҡ䙈ݬⳁᯁᑈԂᘂ㙙ҩ窢ቢ䙐ߐ噠䬰䡁Ҥ䙜⪡ᣐڐ䟍䣀㙁▰晢杨孴ݠᗀ㪰䡁Ҥ晨屢ᯐႨԆ蚀曀ᖭᒱ㰀Ԁ貅幠Ꮐ㙂ᨸ晦杣憛芭暠ޒҡҨ䚤䙀䜔䮰ҥԀዸ婩ᓁ㰀Ұݭ暠߀㺚⋂几ځһݠ◕⛼Ңᖀ鉤ҫ䜜䮰ҥԀႠវ䁂杨䛄ᖌ誀ᖑ䡈䚀貢ᄡ◀桤⇤㙴▢ᗁተ㙳䛁䍚誠䩘ᖃ雠ᴀԀޕ䃚躎鵴▻勨ڀԀᄅ洱䟠㩚謎Ҡ癤څ⋀皢◁Ⴃ㽈Ⴄ仢▰㿐暰䡈㛁ᆙᖉበጠ䜒䮰ҥԀႰ㛀ᗀᄀԀ桺鎭䡠㢨婡ᓙ㰀Ҵݠᖠ㩘ᘞҠ桠ጠᇠ■䩀Ꮐ㙂扱ڀҰ䙐ڒ蠀䛲ҡ䙈㚄ҭҥ皠ᖠޒҠ枈䁀䙀䛆䃊ڀᇠ虠卤Ԁ㚫䧆暰嫲艠ᄠ□ᓱ㰀Ҵݠ❁癴㐄絠ݢꚶႠᕂ詠䩘Ҳ䩴ጠԀႨᕐ干艠ቮጷҠ乢Ԁ暺誠ᓠ㙁Ҡ䁀㙐ⳇ椣蟄Ԅ⩃武䝧晠孰暠癈㿉呠ހᖀ䡃䛀湠満巇䝐➄☠䙁㩁ባԁ婹欎Ҡ晤䙃彻ݠᖀ㛲▹Ҥ晠屢ᖐ߈Ҧ蚀蝠ݠᎬቬ㙀■贠䛀菐繨慞ᅞ㟀㚐ⵄ䛒䙀➼ᘀጠᄀݰڈԄҲႤ㳂Ⴐ䉑ᙁ▤ᄔ◛佦Ⴃ晠㩀ҭ晠ቡ䁏豣Ҡ你һ晠◃顠军勨㫃ꙁ廰ᆐ䛎歐䡂ᖥቢ㙸㝃㞃䚄ڤ⫤⎠ڒҠ䇀Ҩ߈㛆硬塧Ҡ占ҽҠᆁސ㡁Ҹ☠䙇紁嚟ꡟꡐ㽀䃵ᖏ⋀剦暰䝨㙑ሁ▹⠚ᖠᒠ飀幠Ꮠҡ艠ڀᴁᖵ㚴嚘Ң蹠ဈҠ⪩ᦀ銀幠ᖑ灬衧Ҡ㙢ҥ曰ᖁᗐ䡂ᖄ梊⪡ᣐተ䙉ߐ䝀䝄ዠ庂⢢榡䩂硠曢廈㲀⛡㩵☡䚏驰⚠㽔晴桟ޘ滣溃鬗㝀䍔晬桟ꡟ樼䩀諗㧐婠嫢ᄀᒠ栽㯤䢤▩ԙ辺ꕂ㚄倨ᙄں鉒☢㞎颀ᒠ杽ᖁ謲ԑҽ绣ꡟꡟ朲钮䜐ߑҴ晬屢ተᄰ䟍䡀砰Ҡ晪杨孰ል暠ᖐڙ繨Ҥ暀ᘔݪ♀橢ڊᖡ窠⛡䁵⠀晦蚀Ⴀ䫀㢒ዬ䇁晠湤Ԅ▫檔ڀ⛡枠坠⍠䞂ڊᖈ鉤媀ᘐݭ暦በ潠ᙘᗘ䙉䛀⻀此ݲڊᗁ竌ዸ㙄皦ⵄݴ⛣亠㪀⛈Ⴊ㚠癸晤囈☠㢐ቸ䣆晨ᄅԁ蛠㩬晲䙓䅁⎨ᄈ㛳噰蚐㙖䙉䛅珠橤ݲݹ繨庠⛡ᣛݦᆀ霒ډ䙈庢㵠ᘔݦᖣ䙤Ҳݠ☢ᅑ⋀▢䭀䡂♹ԅᒅ߄һݥᖁ㩐㟰♰晲䙄䅁⪨ᄄԓ噱因㣂ԖႴ▢䩁㩑ᓑ繨隠⛡⫵▢亅⍁ڑԄ癤㪁枠坠♡癲ډ䙈囪Ⳁ㙄灠槢ڐ罠䭄㲬ቸ㙍㞃䜤ᅑԈ噼㲀⛈Ⴌ▢䭀䠂㜹ᖨ晲乢㙐槨虨㡆罰曰Ҥ暀ᖢ榠ᖁ㤐ځᖙቢ䝇ᄀݰڈԄႠ䫠ᖀ杧恱ᕈᄅԀ䦡▴☠䙅䛀㡃䙤ڑሉ▽⠚ቫ㙋湦詡䡀靠䋀⠠ጡݰ櫨ሤڧ䝐幱ڀ㒁Ԅᓀ䩁蝣潰潴䁆⤂䙐ᕁ▤န▢䙴ᗀ㕐䋑ᣃ䙤န▨析Ҷ䙐䛀⻀曤Ⴄ□繨庠㚁銣噠⍠䟂ݢᖄ鉤㩠◀蚁鹠ᓠ㛁ځበ屢ᖐᖐ䛍䩝檖Ҡ暀杨宀鲁鹠Ⴁ陠勠⢊ᗀ䛀◡柠朔▩ҹ躢䙠ᔐ椨ބ㚠䁁ݠ梈杠㛌♠◄⍒㛉㙀暂䙆㙇湡橡髱罰嬸ᖈጠᄀݰᖁ皤ҲҩҤ晢䙁㙈ሀ橢ڱᖨ暄䝌ᇠ▢橡竰蹱Ԑ晶䙍◆滣ᖁ硠罠媠ᴀ⫠⍕◣ᖁ䡀醹◈䁀⤋㙊㞃䛄ߔ➣勨㪀ⵁ䙵☣⛁癲ڪᚱ㡚ዠ⠠暺誃桠罠堈梚䙏㙆湣䩁鬑罰誔ᯆ暀㓔Ҡᖃ浲㚢ᖅ窠⺬㝅▣ᖁ索㚢䩴㒀⠠⏅榢ᖂ衠齠勠䁠ᒠ⠠暺誢朰ژ噰㳃㫅虠㚊◓☌Ҡ曨Ҷ䙌㙅㚲㜘ҡዠԌ晴䙍䜤䟰Ңᖰڙڥᑼ鞁㛐ᴐ䙮㡒㙚ݠ悰Ҡ㙎䊈柨㙖睠尐橴䙌㙆腨柩㜐㽀仠䋖Ⳅ㙆▤玤㜄□ᖨ暒条䧂㙀蹤ނޓ仨沠⠠ᰕ☩ᦀҢڑԍ窤䭭Ҡ䌎晠ቢ䁈ᦈ暨条孶晠ᖄ穰⥑婠ဆ恠Ұ◨ᄨ㙦睰佼䁀⤋㙌㚀厤㟂Ⴐ㝀晴䙖孰Ꮘᆍ䤐ҡԈ晶邍Ҡ䌎晠ޒޑԜ晶䙍□湥ᖃᗰ蹠劌暂枀孲ңڡ塡⠈ߘᖸ䙑䜎䜰Ҧ蚁杠此Ꭼቴ㙈监㚸ң噰曠䣂ԖႤ▤亀洄Ⲥ㕀ڀ㞁ᖵ㚧㛘ҡတԌ晸䙊䜜䟰ҢᗀڙԈ晼栘槀Ҥ☀ޒڙԕ窢⤠ᒐᓚ誠蜰ڙҴ桬⪣ᣈ⚠ᅄڔ▨析Ҷ䙎䛀橳ҡ塡彠鋠㒀ᰀ⢐ቤڄᅁԉԘ☠䙒▢椨ވ眰Ⴀ䊀⠖䙐䛐䃉Ҥݤ仈㫀㢀◖Ⴘ▢䩂秀㞡Ԅ晰屢㩑晰䩍墀枀ݠ㣂今㝇㚁ⵅԀႰ盤⡀㒁ᖵ⠀晤㚢ڂᯂᆈԖႦ▢◑◌ҡ繨㚀◀Ꮫݡᖁበ你㿨鉤Ԁᖠ決橡ᖐ榱䩌ڮᒀ㙄▢ក噣幸曬ݢ囋㝂潠ᖁ㩑榱▹በ屢ᖐᆐ癰▨ݡ艨ڀᠡ◕☢詡ᖑᓑ▽ተ邉Ⴀ㐀虤ڒԙ䩈ڮᒈ㙂皦ⵄ䚴▩繨◠␁ᖵ□亁⍂㚑䙈ڀ⠨Ⴂ䄐䙮桠瞠◑ᒁ߄ԃ苨枦蚀Ⴀ䋀㪬በ㙂灠楤䚰䡁ҹበ䙇▪ᑈވ㡆睠匄ᯀ嵣Ұᄨޅ㙰栘⬠晪杸孨◨杈㹈ᰀႼ☠ᓀᄀݿ蚨በ恬ҥ䑈暀ᐠ晭暥桠恬ځ䑚ᄀᏐሐ乎㩘ҫ潈ښ䙅㙃皡用䉀⦱蹠绢ቬႥ湡歠䛂㚙Ҹ癤چዿ漠◄⍒㚑㙀ᘀጠ㙅皠厤䛴仈Ⴄ㚀ᰈႠ☣◀㶂㛑Ԍ晶䙒䫍滢詡婰棈鋨㳂꜓䛏菨䢀䩂ڠ㝀晴条䅁ᯈᄤ߃噰盠㪀ᴁድ⠀晦蚁ڠᖬ晴杠䅁ᯂ詡䡀罠滠㫂㚪▫湢歠䚂☁Ԉ癤څዠ□橡姀㙁ҹቨ邀ᯛݠᆀ䛲ڒᖡ窰በ㝅盀噰▧梐婤晶歭Ұᒈᅂᙀژ曰Ҷ䙊䛐䃉Ҥڢ晰䙔晶⤠ᒔݡⵄڳ癠ݠ⬀ᰈႤ㚀厦蚀曀◌普柠晢㨁▤ڒԚᚽ裣ҡ彽ҫ詠硠恨瀹ᕠᅒ䍀⤈ބڴ◓罤ꗢ柠ޙ㓀᧤ڒԚᖱ鋢旑䜀ڜ涠ᑔ◀噤㲀កᔠ瘼亐ҷ㠐ޘ晪䙇䛆䏐扠㵣癡因⡀␁ᒻ㚏针㹀⦱蹠胢ᒋ㛃湡詠裠㙁Ҹ癤◂ផ礡▤ڢڑҼ䙨䙆㩁ቨ䞁塠垠▰晴邀ᐠ煺橠靤輱Ҹ普䙊孻ݢᅄڔ♣亠梤␁暠坠⚁癠纹ҵᎠ還ҰᔊڀڄႠ皠⠖䙈䛐䃉Ҡ橢ဘ晴㲀䁄䙐᧤ށ塡㻀㫀㢐ዠ㛂湢䭀䠂◑Ԅ癤㹌ᖅ皢躀㝄虠卤㣂Ⴐ䱀ᑐ䝨㙑ᎠԌ䚈ҫ㙄㚀䡉晠罸Ⴅߔ䡀㡀■◂觀㚡ҡᔥሀһݢᖀᖞ橮Ҡ鉤㩠Ұጰ䭍䦠㛁ҡጨ邡Ⴛݠᖀᖒ覲ᖈ鉤ԀԀ畺溂秀㙁ҡᓉ㔀һݨᖀᖐᇰ☀晠杶䅁ⳈҤҤ✣伸ᗐ䙀㙀㚄ⵆ蚃杠ݠݢ☊䅁⪨Ҩ㟆硯衧Ҡ㙧ҥ皢誀硠暂ݠ傀ᛋ㙉溡溁圠◹Ԅ晬屢㑐ጰ䝦蚁桨䫄⡀⛡ᘛݨᖂ坠偨䩬桮䙄ዠ■衠眒Ұ㝀晢㙅ᣁ㙀湤ڒԚ扱ڀᰁႦڂ詠窰䡂ᖄ桤䙆▢楠䞤ڢԚᖄ晪㙴㝁㞃䙡塠Ⴀ㬘ᖈ䙀㙁⻀晤ݴ⠃勰Ҿ⤠ᐠ暤✠ޝ㹨ᖡꖂ冡暠坠ᖀᏀ㜁◉ቢ鞂Ꮝ溢詠桠冱ᖘᘀ䙊䛂䊑䛈ᖐႨᖰቶጠ㙁㚄➠橢ҩҨ䙈䝈ᯀ椨ڈ眰Ⴀ⚤⎂䝉ᄀ■満㳴►䩑ڀᄁᏆڂ詠䩗觩ᖜ晢䝅ᇠ▢ᖀ礠Ң⎝ꖔ邀ᏖҠ亗鹔禱Ҵ繠ጡ蘟磺橠礠Һ⎝ꖔ邁ᖐᄰ䛍䡐你䍄♶䡇⋀ᑂ詡㪐蹠Ⳁ晰䙅㱀Ұ幏鬆睨䛀⢂ᅊ㛂湢亀㳲㚈婠㱖䙆㙄䃈䜁嚄Ҳݠڐቨ䣂㙐䙤㚒ҡ䙈ڄ⏀Ԁ杺歠䙂㙁Ԍ晢䙂△ᓀ䟀䛰㡀⚠ᘀጠ㙃■◁洂晰ݨ㓒ᗀ㙅㚂㑡皢ԙҹ粤ᰁᔠ暨ҥ癢Ⴐ㫀⢂ᓆ㇀朼䪀穰⥘幨ቤᒋ䛀溡䩀Ꮐ㙁▼晠杤孴ݠᗀበ罠ᘀᖠ䱍ቦᄢ躀ተ彠㻄⠘Ⴋ㙃㚀唤㚒Ԓᖅ竢ᅖ㛃椨ވ㙖睨㫀ݢᗪ㩁Ҩ䜄Ң晰雤㚀ԈႠ◠ڈԔႠ㭄ᑖ䡅䣆暨Ҥݢԑ䙈䙢Ҡ䣆晢躀㜰聨ᘄ⡀◡暠坠♡癲ҡҸ晶䙁㙁ᖉ栀㡀Ⴀ⭀◠ᰈႦᗀ虡癴□ᖔᚾᓀ㙃湡䩀髀蹨軠⢂ᅊ㛂湠ᖁበ垠◠䡀څ⋀ᑈވ㙖纹ҽ㢂ᛌݥ湠ᛀ䠂◱ҡᎠ屢㑐ҫ䙄ተ表ᘄ⡀ځݽҨᖀᏀ㙁◀晠杤孴ݠᗁ㡀罠ᘀᖠ䱍Ұለߍ婰⥑ᖔᘀᓀ㙂皠叄䚔仈ᘀ㛂嚀ᘔݤዠҤ仈ԍቢ㕋䛀溡䩁በ㽀㛀㢐ቬ☡晣䙄Ңڡ蹠暠Ԁᛛݧ◀တ罠㩼㲀⏀ᆐႨҥԀ蛨⪠㸮ᖁស漠◆⍒㙙㙀晦杣䍀⠈ڨ乨ᖄበ☎ᒠ㙁皠⍠䟂Һᖀ鉤㙠ᆐڍ暡桠㽀ߘᖐᎿᄀݰᖀ䣀㙁◉⠈暀ᄀ歺歠䙂㙂㩴ጠየႨ◠䩀ᖐ䇡ᖔ晠条尀ꡟꡟ陷⠈ᦈ桮䙂㩁ቨ䙀婢Ңᖑ窰በ㝂Ⴐᖀ壠㚁Ҡ癤Ԁተߊځ棠㚠橬Һᖋ㙀灠晤Ԕ◣仠Ꮒᗪ㩁Ҥ䙀ߐ㽀ᛄ㜔䝁㙀㚂ⵄ㙂Ԋᖡ粤ᛍҥ楠䞤Ԃ晰㛈ݪⳀ㙀㚁哤㛲Ңᖅ糣ꡟꜿ芰䙭䡐彠♀ᖐ䝀ᇠ■◀洂晰ݨቨ暀ᆔݢᖀᏀ㙁Ҥ晦乢ᯔݣዠ噠蹸勠ᴀកផ☡◃洂蹠ဈڐ䙃㙂㚅ⵅ㙠ᇸ⭀晨杰孴ݠᖠ衠㞀◠桰杠㛄皠ᖠ㙤Ҳҩڀᗁᰕ⠀晨㙖绐■ᖂ⤠ᒠ朽ᖁ⍂㚢ᖑ窰በ䛊㠃䙤߂晰ހᖀ䝆ᦀ暨䙡塠㽀㼘ᖨ䙃㙀珠桤ڄ◣伀ᖀ䝁ᄀݰڈበ䡈㟨癤ځޕ槠晠䙐罠ᛄ⎈䙈孱ᆐ䛍䣀㙂ᗑ㑚ᄀᒔݠᛀ䙂▨卤ጢ⚫㙁湠䴀䠂ҹԄ鉤㹠ᖐႪڀᖐ䇣仨ጰበ㙁皢ⵄҲ晰㚄ҠⳂ㙀㚂ⵄ㙂ڙҵጠ邂ᐣ榠ᅁ塠㡈堈癤Ԁᔥ杰ᖀ壠㚁Ҩ癤◀ᔠ朽ⵄ䙂晰ݠڐቤ㙁灠查Ԁ蛨⪠䁂⥁Ҧڂ躀㛲Һᙁ窨ҫ询ځ㘤ҢҨ果桤ጠᄀݰᖀႤ滈ݠڐበ㛁曰ᖀႣ颈㝀晢䙃孰暨ҤԑᏁ□ᓑ㰀Ҵݠ⚁癲ұ䙈☢ᓱ䛁砣䚈䁉呠ݠᎬበ㙀■䩀䝂軘勠ጠᓪ䛈䃈䙁暀罠ⳆҤ畤䙐Ҥሁ晰罠Ⴄ㼔乢ұႨҨ㛆瞠■橪浤䙐ᄨݦ蚀蝠㛀⡬ቨᯀ椰奲艠ቬ袷Ҡ乢Ԁ藨ڨ㙷娛欸ᖀ⤠Ⴈ㔁▤ҢҩҨ䚚⪢ᣁ㙐寲艠ᄠ■晤浤䙐ݰ孲艠ᄠ□㑚ᄡ窪陠ᖀᓠ㙂⋂几ځ皪陠ᛀ䙂ҫ仨Ꭼበ㙀■䡆䜰聭墷Ҡ䙀䅁Ұ嫲艠ቭ㢗Ҡ乢Ұښ檠㦠㙁Ҡ晢条彻ݡᖀᖚ欎Ҡ癤ڇ⋀盈㣸Ҥ□繨ݣ仵虠㚀⍠䙀麹Ҩ䛐䡃㙀胨䙠䩂Һᯀᘞᗀ㙁ᖃ柠㛲Ҳᖱ窰በ㝂■溁⍂晰ݨᘎᗀ㙁□⍠䜂ԁҨ鉤▬ݥ盆㣸ҤⲄ絠ڐበ䛿■躀巇懩繨Ҷ䙀㙀橬橠ᖚ欎Ҡ癤ڇ⋀盈㣸Ңҩ繨Ҷ㕋㙀盀ډ隤Ⴀݠዠ㕏ᣐڐ啮㩙ᘞҡ窢ቢ昀貅幠Ꮐ㙁▭ቢ䙁䛁菽ᗀ㵐䡁Ҩ癤▬ݥ盆㣸Ңҩҭ諌በ㙁ᑈ䙤Ԃҡ繨㚀ᄀһݣᖀበ㟰◐晠䙁䅁ቢꗠ噰䨹⪡ᕀګ㝁⚠ᖀ䩒榱ҥዠ邈Ⴀ☠贠䙂Ҳᘁ窠ᄡᖵ⡀晦隐Ⴀ☠ጲበ䇁汨ڈ㝆睠⚤圴䙃▨曰ڈԄႠ♔Ԁ䡁䛁㠈Ԉ㙗⦪㩑ڀځһݢᖀᖨᖄበ䚮በᯀ椨څ癡⚨ᖉڀየႴ⠀曨㹨ᰀႼ䁀䙂㩁▱䟠በ㞀☱⠚ᒋ䛄㚀䡇ዠ䁨婤晦䙁䍀Ҩڄԓ噱盠ᘂᄖႼ■溁ᓠ㟁ҩᔠڪ㙁㚊ⵅԀႰᙘᖀ䙂䜤Һ橠䩒ᓑ䩌ڮᒀ㙁■殀埣幺ݠᘂ☊㙁㚐⺤ұݨ⚠晤占ᖑڐ䚈衠⠈᧥⣤Ⳁ㙁⥀ᄄ㚄▩ᖄ⋀ጠ㙀湠歠䥄廈ҩҤ暀Ⴔݴᛀ䚄⪴ᒐݮⳀ㙁⠀潨眰Ⴀ♀ᘘ歭ݥ湠溆⍂Ҫᖄ䙨䙂㩁Ⳉ䚡晰聯ባҠ杹䜨䙰ҢዠڙҤ晦邀ችҠᖀ䡀⠈ᦈ橢屢䉐ݨڈ㩆罠♀ᘠ㙑㙁⥀Ҥ䚔▲㹴ጠይҠ溡ᖀ穰⦨婠㱖䙀㙁⡀豦隀ႠႤ㜔䙂䛜䃊ڀᓠ㙀勠ᘃ虠孲ң蟈㛄▨析Ҷ桀曀Ұ䥨䍈ᯀڀ橠⪗Ⴀ枿蚨ԄҲҩڀᄡᘧ杰◂ᖐ曡狠ᏖⳁᯁᑈҢҲ◀器㳂㚁ᖈⲈ䙡婰桨䚀貢ᓁ⠠桤⇤㙤☢ᖠ䚦䝅䛀㚄◁Ⴃ䁈➑粤ᴁ暠䕈ބԂһ倉糢鷑䛁脨曄ԒԒ勌晢醀Ԇ榠ᖀ㩑ႠႤ♴杰䛄ᖌ躀紒Ң勍ተ㙳㝁胰䡈㛁ᆛ佤♶㙁㝁㞃䙄ԁᏑᖀᘀ䙁䛀脨曤ԇ⠨㝀晠䝁ᯀ椨ڄچ硨ݠᑖ靰佰曰䡈㛁ᆙᖐ晠㚈㙁■亀በ㝀ᇬ晨獻孱ڈҭ墀㦙ᖐ晠㙾䣂㙈ԄځᄱҠ晤㙪㙀■桡㜀◹Ҡ癤ԁҰڈݦ蚀䝀ᘀڀᎪ䅁Ң詠㝃雈ᘀዠ溂ᄀ橰䝂ᒲһ侔䁂䙁㙁橳誀በ⚠⬀窠ԀႰߚ誠坢睠ݠᰀ⚬ݥ湡ሡ塠☢櫠ዠ摺᧯ᄠ曏陷靠ᛄ眴䝂㙀炠詤㚐㡁ҥᕐڪ㩁Ҩ曈䉀ዸ㝀晦栠Ԅ榠䩀婼Ң╲㟀Ұ㑀ᑈԄԁҢᖀ桦䙁䛀⻀獡塠㝀㇉ᒀᄚҠ■䩀㣀㦁▱ቢ邂ᆛݺڈԄႠⳇበ潤䙐ݨڭ䩓齠㟬䛜䁠ݴݺ◇㳴◢䩑ڀᄀႨҨԅԆ杰ⳇበ畭Ⴐݨڢᚡ皹ҥᕀڪ㙂盪㜈乨ᖄቢᆁꙀ柰ᄰ浰躢Ԋ☂⭅ݠ暠䙸▐塠偰䡙ᛁݠ曘▀雰桠偰䡡ᛁݠꊧ蜨ވ䟈桴ባ鹯ᔄ㙂盪㝈乯陼⭀⢄廨梢䝍蛀በ⚠◠ڀᄡһݺᆀ䛲Һ⎠ݣᘉ虠ᖐ晡塠䁎ҡᒩ➀Ҩ㜀ᅄҢҩ䙈ڄጡ⫺■溁␄⪤ᕰ㔢颀ᄀ桽源㘠䇉ҩደ鳒彻Ҡᖀበ⛠▰橤杸恰ݰ䝎橸ᖇ陽襄䙂䛄䏐噿蚗⚠⚤坌飒䅀ႨҤҲ晰䛈ᘂ㺴㙁㚂㓈㹈▀䐅誠ጡᖻ㚠䘀嵲Ҳᗡ鍄颖Ҥ■ᖀ㣀㚡▩ደ骀ᄀ桽◐▯蚛氨晤杨憀蚟曎㡀㡈蠹譄屠ᯐҨԅԁႰ⚤坈䙂䛄䍐噰㘀懫滠ᘂ☖䜀无钄Ԅ♣耩諌Ұ㙀■䭀䞂㙒ᗡ躠ጡᖺ㚠㙟曗⦱ҩተ鲡曟ߜ䩀䩑樓瀨鉠㩠Ұڊڃዠ㡈蠰晤杨悀蚀䗀鵷㝀⚤㜬柠ꙁ芨ڈ㟇姳漸Ԑ䙀㙀灠槤䙄♣盠ݢ☔䜀䙿ဎ㵢Ңᖡ鋣သᇸ湠◃┇㧑繠幷㕄ݢ蘨虨㝆罰⭐ڀԈႠ◠ڈԇ鹲ݠᏃҡ䷢㙈ڨ㙃噰因ᏃҰ䷦暨ڤҴ➻武Ң颚Ҧ湠詠㩐娒⎠ᑤ恠ᰀ曣ځ塠ᄠ◀橤䙀㩁ұ曨ደቩᇬ橨䩀ᄀݰᖀ䩐⥑▩⠚ځᖐҪڀዠ偨᧰橬䙂㙁□澃墀㝀⚤㛚䅢ᄀ蘼躃鷂◐⚠晪ᗀ㙂㚀䴀䟂ԁҴ鉤㩠ተҰ䛍䣀㙁繨䙘Ⴋ㙂㚀⍠䟀罠㛀ᗀᰀዠ橺档በ䞀▰桪䙄㩁ұ䛈በႠ♸ᖀ䙀㙂珠曡暀罠㝄㜔乢ұݰ嚐▨ᕂ㹴ጠጥ⋀□䩀䝄虠加湠⤠ዠ湺櫠በᄠ◀桤⤠Ұݰ䙭䦠㚁Ҡ癤ᖠᄕ■䶀Ҡ虰勠Ꮓݠዧ杰ᖀ塠⠉ꑥᒀᅒ䍀ᕈڤҴ◓罤ꗢ柠ޙ㓀ሄԒҪᖱ鋢旑䜀ڜ涠ߒҹҥዤ鲡ᔸ盜Ԏ䧠ڢᖐ㹂⤠ᆐڐ乎㩘ҫ潈Ҽ䙃㙀皣㔈䑀⦱蹠㺀ᒠހ柽溇鵴⪠᧨驠ⵁᆅ溠䩀㡀ᄠ■晠乢ᖑݺ迀橢ҡҨ晢㙕㙀⠀杤㙠罠ހᖈ䙂孰ߐ䟍䡀☢嫈晠䙁㙁䃍暡ޒҺᗁ窨ځҥ镠暀繒ҡ䙈嚢ᒂ䙁㙈ҤҢ晰坸☠䙀䛊㚄ᖀᖑ䦑▤癤Ԃቭ胪ڀዠ㚨ᛄڂႬႥ湠ᛀ䛂㙑Ҡ癤⫢ݻݣᖀ㡀㟰◀㹂⤠ݰҰ䡍䡀䜙ᖐ⋀䙄㛂湠檠㩑䦑▨晢杰孰ݪڀዠ㜙ᖐ晢杴䛈■槍䣀㙁▨䁀⤠ᐠ晭暠ސ㡁ҭ⠚Ң䙐Ҩҥԁ表➑ᒁ㤀ԕ☠歠䙄庂ݠ⋂㚁⠐ߊڂበደ鐈晢屢Ұڑ䟠䜀◹Ҩ晢屢Ұڃ䙈䀉呠Ⴆ律晠㩁Ұ嘤Ң晰頽裌በ┥湠䩀姀㜁Ҡ癤㙢Ⴂ㙈Ԅԃ噰曠ᗀᄖႬᑈҨ㞆瞠■橠歭Ұڐ䣍䡀ᇰ■晠䙁䅁ᯂ蟔Ԁ◃ꌠݤԗႨ■ڏ驰ႠᛆҤ潭ҭ㚇詠㩟ꡟꊽ㱚Һ㙀皡橠㩐樓䋈ᙖ鲡ޘ湠満㶆聩ꁈ㲄ᒶႮ■躀䶄⪤煠ߔ䝂ᄀݰڈԄቬ颷Ҡ乢ұႰ䙤ԗ䝐㰄☠䙂㩁Ҩ䚄ԑᆉᖌ晤㚈㙀砣䙤Ԃ▸器㳃䋕虠□ᖀ綃噰ݠᗀԖႠᒀ蟄Ҳһ盤▦暀ႰႰ䧮詰䧋佤䜔䡅㩁Ҩ曈眰㝀㝄ᑨ䝄㙁滠桩በ⠸婠㱖䙃㩁ቨ暄ң噰因ᴀԖႤ■ᖀ姀㚡Ҡ晢屢ᖐҰ䙆蚁曘勠⡀ԖႠᑈҤԃ噰蛠ڀԖႤ■ᖀᓠ㚠叠ቸꛁ檩陠ᛀ䙂㙐㝁ᒁ㨀Ұ柠蹤Ԃ㙉䙈㚂ዠݴݡᖠ塠⛠■桨䙁䛆䃊ڀᇢҩᖘ晪条孰枨ځ癠纺⎢几ځꜯ湡䩀穿齚嫌鉤Ԁᖅ豠暀鹒㹂ᗁ粤ងҡ㙈Ԉ㛆瞠■橦此䙠曨䚡晰罠ᘀᴀᒠހ楺歠䙂㙡Ҭ晨潻㝂䄍暡በ⚠ᘠᖈ䡆㙂䃍暠暄Ҳҩڀᖄ䙐ᄰ䝍䡀埈Ҡ晢乢ұተ䙮梀滠鋠⡐ቬ㝃盀癸晤囈ᖰᖖ杠䛀㚻㚘ҡကԌ晨杢䷢㙈ޅ癠杨㝄ጢᒠᐠ桺橠褰ҩԅቢ顰⻐ᄪځ梀恬⠃■浭ݰᄫ䙁በ䡈㠑誢ᖌႥ皠亀㩟詶Ҡ䙸ҫ㙂灠杤㙲ұҼ鉤ᖠႰߍ暠ᖐႨ⫬晢䙈䛀胭暠ޒҡҰ驠ᄀҰߎ晠በ偨栈湠⦩Ⴁߟ蚏袐ቩ栌橤䩀㙀灠曨皤Ⴀᘠᖘ䝃㙁㚄ⵄ䚄□繨ڀጢ暠䙠ቦ隐杠☠ᘂ☊䅁ᛈڈ㣆睠Ⳅ䜔佢һ朠ᖀ䩒ᓑҭተ邉Ⴀ㐀虤Ԃҹ䩈ڮᒘ㙁㚅ⵈ䊈瑠ݠᘂ㺪▤⋈Ԉ㛆睠㛠ᖀ屢Ұڈڅ㙰栘■㲀ᄉႠ◡䩀㩨ᖄበ䚮በ㙁㚈ⵄ䙲Ҫᖡ窤ᄈႠ⻀晤Ҵ□繨ڀዠᏛ朦◁橰䛁蛨Ꮚᗀ䛆㚁ቩ晠罠ᘀᗒᒘ䇁ҨԈ㛆睠Ⰰᖀ屢ҰҰ婱扠ᇰ▰晠䙁䅁Ҩڈ㥆瞀ԏ繢Ⴃ旰Ҩҥ㙲Ⴀ⢵ᖇ⇼䇁湨Ҩ㣆睨㩉ڀځ驠䃊ڀዠ䁨婡ᔀԀᇵ满ᖀ䫰蹡ҭᔂډዠ■詠紂ҩҰ䛚䁠Ԁ晭暭በႠ㪀ڀᄀድ◠䩀䡀䦙ᖈ㹂⤠ᇠ陠◔滼Ҡ杨Ҷ䙂䜠ҳ蛨ԔႠݠዠԀހ発誀㡀㡊ᇨ橤枟䯆晢蟄Ң晳䛈ᴀᎪ㝂■遀橢Ԃ⎠ݶᗀ㙂㚰Ҩ䆈瑠ځᯀ⤠ᆐᄺ橠㡀㛂嫈晠䙀㩁䁈ڍ䦠㦀抌晦䙄䜚䢰Ңᗀڞ噤ቤꚣԀ湺誠墠Ҳҩڀᄀݰݺ檠㫰蹢ᖠ晠乢ұݰ䙮梀䝀ᘀጠᗉ⻑ڈԈ㛄輹▥ᑾ馡㗻◡ڈበ㙢ݠ⋂ᄖႬ■詠䦠㛡Ҭ晠杤孴ݠ⍠䝀虨勠⋂ԖႬᑈڤҲԁҭዠ遰⦰ߊڀ桰㝀Ⰰᖀ此䙐ҨԆ蚀ႠႤ♴䙂䅁ңځ塠䁈䟨癤ԂԀ蛀㙐┤囈ᘀݪⳀ㙁■ቩ晠绡㙀㲀ᓁ㙵⚠ᅙ㙐△ꌬݢ䚫㝁潠ڈԄႠᘀጠᎪ㝀礣䙈㛂ҡ䙈ڄጡޚ☡ᖀ㡀⚠㝤岤ᄀހ桳䦤䙔⪛獤敌䝄ᄀ■曨በ䁈ᙘᖰ䙃㙁⻀棤ԒҢᖑ窰በ䅁ᖃԁ塠䁈ߘᖰ⤠ᆐڈݤԔ☣亠嚠ᒨႢ◠橠壠㙂㩑ڀԀݻݠᖀበ㟰▰㹄⤠ᇠ桺歠䙂㙂ᯆႡڸ䥆暨Ҩ眰Ⴀ☠Ԁ牠ᣈ⚠ᅄԔ⚣仰ҷ▢ݡ䘈虨㡆罰㫐ݣꌱ虠㚿㡸Ң晰ݨ⭂ᅊ䅁Ҡ湠䩂Ԓᖁ㙚ځ袪陠◘澼ҡ䙈ݢᅊ㝃⻀晤ڤ▲劔ڀកችҦᖀ硠㿰◰晪䙂䅁ᖈވ䓈葠ߘᖘ䙅䜮䢰Ҧ蚀桯墧Ҡ乢ұݰ䙉ߐቯ墧Ҡ䙂䛀胨暦蚀ቯ墧Ҡ桔潀Ҫڀڇ齠㫀ڀᄈႨᗀ䙄ڒԉ䩌ڮᒈ䜺䪰ҥԀႠ㭄㜔桘潀ҪڀᏀ㛠橤ݣ鋱虠⠀晠硠㚚ᖅ糌በ㙃㚀俁癢Ԁ婤㱀⤣Ԁ橺誠䢀Ⴀ☠Ꭼቬ㙁■⍠䛀ڝ艤Ҥ暀Ⴂ㙀湠䩀㨸⚠ᘀ䙁䛀㧁▤Ԓ晰䙴ጠႭᄀ暨䚁暠绀㹬晦乢ቱݱ䛈በ⠨㝁ቢ䝂ᯂᑈԈ㙑ሀ器㲀ᒨႠ■満㡀☡皐ቶ䙁䛀橮ᅄ䙤仈ᖬ晠䙂䅁ႨҨ㛆睠ᙘᖀ䙀䛀⻀晡霒ҡҤ鉤ᖠԀ桺満㦠㙁ҡቢ屢ҧ椨Ҥҳ噰㙬晠杨宀晭暠በቨᙘᖀ⨫ݠ暿蚨በ㙢ҩꔄ晢䙁㙈Ԉ㙄隂ݠᴐቨ䣆曨ڥԀ䝐㙴ጠႭᆐݣݡ塠ቨ䟩በ屢Ҧᄢ詠壠㙁Ұ晤䙁►ᒀ柄Ұ蹡Ҩ㹂⤠ݰݤ⎡墀㹢ݠڀᒶႢ■◁⍂ҩ繨ڀځһݠሡ塠Ⴀᙘᖈ䙀䛄䃈چ蚀ڠᖬ晠䙁䅁ႨҨ㛆硨ߘᖀ⤠Ԁ暭暠ޚ湨ᖍꕆځ㹵滠櫠በ⛠▱⠈暀ݴݣᖠ塠㡈栈橨杠䅁Ҩڈ乨ᖄڀ鑦◀Ⴐݰ䝍䦠㛡ҩጰ邀ᇠ橺殀䙃幸ݠᘂ䚪㙁皢ⵅ㙠ᇸ⪠晤䙃㫁ҭ蛃በ㡈砉ᔉ➀Ұݰ䥍䝀朱ҥተ邀ቴݠ⍠䙂ҩҨ硦◗ႠᑈҨ䁈葠ߘᖈ䙀㙀珠晤Ԅ✣仰ҷ䑁ҰҰ晦隒杠ႤڬᎨ㙀㛀⎀塢Ң┠ߔ桠䇁晨Ҩ䏀ᓒ■鑦ԀԀ驠ⵈ䙃幸ݠݣ湠宁ҭ蛀በቪᇭᖀ嵣ҰҰ䵍䩠ᇸ⪠晠析宁ҭ蛀በቯ衿Ҡ佢һ曠ᖀᖐ榲ᯂ㟀ԉႠ㐀晤Ҥ☣佦㝑晠㫁ҭ蚠በቨ蠉ᒡ♠Ҵ曠⎀䙀芠ᖄᑾጠᄀ■亘㙆聯ꊥ裢ᴏዠ■亜㙆聯ꊥ裢ᴉ⋀湠了⍒㙚▜ᑢ杪䫆曨Ҥԃ噰ݠڀᄡ꜠芭暠材罠Ⴆᛁ橠䅁ႨҤҴ❛午Ҡ㕋㙀㚠癸晣噰㛀ڀᄡ釠䄎晠တ罠Ⴆᛁ橠䅁ႨҤԓ癠ԍ鉢ᅟ㟀㚌⺤䙲䙁Ҭ晢屢ተ߈Ҧ蚀ႠⳄ伴杢䅁Ҩڨ㠆硨♸ᖀ䙃䛖䃐䛦蚀Ⴀⳇ轹晠䅁ᖈڨ㙃噰䛀⋂ពႲ■詠婲ᓑ繨嚠ᒠᆛݪᖀ塠䁈㟨鉤䙠ᇠ桺橠䝂幠吤چځ㹵滠䫀ᖜ䫎Ҡ聠Ҥ䙐ڐ䣍䩐㟰■晢杼宀暭暠በ⠍墋Ҡ屢▰ڐ䙆蚀杠ᛄ⡬ዤ㙀湠⍠䤂ҩҥጠ邖Ⴌ■䩀㩒覱繨暠ᄡᖵ㚵㞘ҡᄘԌ晢析孲Ң駠噰⪙⪡ጠ醂ቲҨݤҳ噰㛀◠ԖႠ□◃⍂Ҳᗁ窲በ䇁晨ݨ㝆睠⚤㜔佢һ朠ᖀ桠㞈■鑦◃Ԁꊠ⺤䙂䙁ҡᒙᕀһݣᖀበ䟰◀晠柬桀ҭ暢桠Ⴀ㝄♴屢▰Ұ姑艠ᇰ☀晠杢䅁⎠湤ڄ◣仨ጰቨ䣂㙈Ҩ䌀ᓒᗔ鉤ԀԀ靠ⵈ㞓噰ݠݣ詠宀杭暠በቯ噡竢ᒶႠ■◐⚌ҡ繩暠ځһݶᖀᖑ堐⚐晠䙀䛜䃍暭߀◹ҡᎠ邀ހ橺殀䙃幸ݠݢ今㙀皢ⵅ㙠ᇸ⪠晠䙁㫁ҭ蛄በቯ㙁竢ᖶႠ■◝晦硨㜘ᖀ䙀䜪Һ溂駀㙁ҡᔘڪ䛊珠晤Ҥ㑠ᇩዪ屢ҰҰ懱艠ᇰ✠晠杠䅁㱈Ҩ㞣噱雠ڀځ䉵⻀獤ҢҢᘁ竌ጰᣐҨҨ㝆砐⛀晠䙀䛄䃍暨በႠႤ圴屢䉐Ұ慠⍂Ҹ曼Ҷ罡ޟ漠◄⍒㙑㙀晤䙀㩁ҭ暠桠㡈蠈晢杰孴曠⎀噢Ҳᗁ窠ᄡᖵ⡀晦隐Ⴀ☠ጲበ䇁桨ڈ㚆确㡧Ҡ䙂䛄䃄ႤԄ⚣仰Ҷ祡ᄟ漠◄⍒㙑㙀晢乢ተ木ԅԀႠ⚤圴䙀䛈䃊䚀ᓰ㹁ҩዠ邀Ԁ桺殀䙃幸ݠᗀԉႠ㐀蝤ԒҲᖡ窀◀ᄀ湺櫠ޖ繨➼晠乢ᯐ暨Ҩ㹈ᰀߘᖘጠ㙀盀㙘晤廈ႦႡ橠㛀湠ᛀ䚂㙑Ҡ癤چ⋀■ᖀ䩐⥑繨◠ԀҴݢᗀበ㞨Ҡ橢杯引⥀Ҧ蚀蝠ݠᏂᗶ孶晠ᖠ㛲Ҩ厤ቢꚣԀ湺誠墠ႠⳄ㼔条䅁Ҩڨ㞆硨ߘᖀ䙃䜠䥰Ҧ蚁ႠⳄڬበ㙁湠䴀䠂ҹҠ鉤㹠ᆐߐ䥍䦠㚁Ҭ晤㙧ҥ矠䙯顠㝀ހᖀ䡀㩁ҨҥԀ杰㇍㱈暀Ұ߈ڂᄲҡ䙈㚂ᒋ㙀⠀曤Ԗ睠ᘀᖠ獺㙀■橠崃噰䝄Ҷ潡ޟ漠◄⍒㙁㙀晠杴宀暭暠በቨ頉በ屢ҰҰ孱牠ᇰ◠晠桘汀ҭ暣በቨߘᖐ䙀䛄䃐山牠ݡ䉀㳈Ⴂ旰ڊڀ桰㝀ᘠᖀ䝃䛄㚁ቧዠ⠨㝁ተ杤◆Ң詠㡀㟰▰晢䙃䅁ҨҨ䅈葠ߘᖈ䙀㙀珠晡姰Ҳҩꕀጡ暠坠⚀橤▩Ҡ晤䙁㩁ᖄ䙀ߐ♰勠ᯚᄡҥ樢詠በ㽀㛀ጰቬ☡晢ꊠ䙐㨹⪡ጠ醂ႲҨڈ㙓癠蛠ᗀᄖႪ■橠ᓠ㛁ҩᒉ㐀һݣᖀ䩜ᗦҠ鉤◃Ԁ橺誠㢀Ҳݠᘂ☊㝀⠀柤䙠䡁Ҡ癤◂ᇢ榠䩀㡀㟰◀晢䙀䅁ႨԄԓ噰ݬݢ㚫㝀⚠ᖀᖐ榱ҥተ邈Ⴀ⻀晤Ңҩ䩈ڮᒀ㟀㚄⺤䙒䙁Ҡ癤Ԃᄀ歺歠䙂▸⚠ᚾጠᄀ■溁洂晰ԘᖀႣᣐ߃䚈㙂▲┒㧀Ҭݥ湠蠀㡀㞀◀橦乢ተ曨ڥԀڙᖌ晢䙂䅁ႨԄԓ噰ݠᏃ竫虠■ᛀ䚂㙉䙈㚀ԈႤ■䯠ႡސԌ晢杠䅁ႨԄԃ噰因Ꮓ曫虠■ᛀ䚂㙉䙈㚀ԈႤ■䯠Ⴁސԍᔹ➀Ԁ焰塱扠ݡ■㳃苩虠㚊躐♜Ҡ曨Ҷ塠ᄀ■◟癟ꡘ䍬䁀䙀䣂㙐䛁霒ҡҡᕻꡟꜣ碰䚎杣杰Ⴔ䁀䙀┥晢麠䙐䈹Ҡ癤ԁႰڋ䙃ᖑᔊᖑ鋪ᗀ㙀熠ᒈ㡇⠈㰙⠈暀Ⴐڄ♁霔□ᖀ池柠ޕ滠諠በ㞀■桤ᓀ㙀■鎨䘰ᓒᙁᎮ䙂䛇芨曨㛤漹ұ竔Ҡ㙀㚀叄㙂Ҳᖽ㲀ጡዻ◠栀ޒҢᯀᑔ䡂䜀暳蛨በ㡌ҥᔡ㔀Ҩ㛀ᅄҴ㕄慠ݢዠҰߚ源Ҷ硨ݠߖ㙇㙁盀ԍ䢀ڸ卤ڂԃԀ虠叄䙲䙁Ҩ癤ԁႡ癨ҤԖ硯ꊡ竢嚡釠■溁鵲㙢ᖩ㡶䙄孽Ҡᖀᖐ⥙ᖀ晤杯䯐ݰ䛎衰㚨Ԍ晠柠ޕ☠源㙔麂ݠᘃҡ䜨䧰Ңᖠڙҥᕁ㔀Ԁ曨ҤԖ硬ҥ竢Ԁԕ橡詠婸ҫ仰Ҷ䵀㙀■ᛀ䚄▫櫠ᑤ杢彻ݡᖀበ⥑■晠乢ዠ暼洠䚀罠ᖅꔄ暀Ԁ杺歠䙂㙊㩴ڀԈႠ㞃䙄ұԈ劌橠ጠ㙀盟䘿ꡐ惈㝀晠䙁䛂■桦梀ڨᖬҶ䙀ᣑ晨ڄԂ晰㝅ꎂ屢ተҨԈ㙗㟰▰晠䙁孰ڍ暠ޑ陡Ҡ晢杣彻ݡᖀበ⥑■晠乢ዠ暼洠䚀缀ݠڐበዠ■◀洂晰ڀ⠖⤙ݠ蘨ҥԁႰᖑꕀႥ㙀㚅ⵅԀژ动ݢ㽠Ԁ暽珈㙂Ңᗽ㑶⤖ҰҨԈ㙗㟰▰晠䙁孰ڍ暠ޑҡҠ晢邡ޕ皠ᖀ㳷◿乴ቬꙂ旰Ҩ䛠䩀㡀⚠晤杩䷢㙈ڤԁڙ▼䁂杠ᯂᑐ䝈㛁ᆙᖁየ杨▹溠亂ᖐ曡狤ᘂځ◀桤⇨㙧䦙▱ᒁڼ㙁■ᖀ㳦禺᧽裢ᓫ㝀■ᖀ欑罠ⴔ䁂杰㙁皡ⵈ㝄◠札ቪ醀ᇥ洰䝂ᒲ▱Ҵ䛤䡀㙀ᖒᗀ杤齨ᖉҤ晢䙁㙀湠䩀㡁Ҡ䚼此䙐ݨݩ眰⚠ᛆ羋晠㩁ұ栀䡀⠍䢗Ҡ乢ԃᓀ詠㝃终䋀ዠ溂ᒐႺ檡በ㢈婼晰䙂寰杨߈㹀㢈婰晢㙎ᯂ椨Ңᘂ▩ҩᒀጩ⋃■䩀䳴⪬ԁ㢀ጡድ■倎㜐你ᘀڐበ㝀胰䡍䡐䝀⚤攴柠晢ᖌ誀䜀嚺ᗁተ㙳㙂■珄䙔终㛀ڀተ䷰杨ҤԁᄱҰ晢㙪㙂■䡁㜀䚚⋒几ԈႠ□ⵄ䚂Ҳ媔◠ԀႨ㨈䙤ҢҰ月晢䙄㙁䄈暨㙗㟰▱ᓉ㰀Ұݭ暠ᖚ謎Ҡ晢屢Ҧ߂躔⛼ҡ䙈ڀᗪ㝂■澁皐㡂ᗁተ㙳㙂■珄䙔纂ݠڀᖐ㭠晨䙨㙂◀噤㲀ԀႨ㨈曤ұᎹᖘ晠䙂▵□ᖀ㝃㝀㻀⬐ቤ䛿䊍暠朔ⵄ絠ڀᖶႠ㚨㣸Ңҩ繨Ҹቫ㙀皣ⵅԀႰ䫀Ꮒ☊㩁Ҩ暈隤Ⴀᘀ㢬ቬ㙄湠䴀䛀虨卦型晠䜌䮰ҥԀቫ黠⭂ᓶ战珠晡婱ቨ䚀負ᗍዠ■ᖀ䝄齨ᘀڀተ㭐ڈݢᐢҩҰ䙒⪡ᣐҨႢᐠ罠Ԕᯖ䙃■滠企癲ҩҴ晠㚈䛼㚟ᖀႣ霻仨ڀᒠҰߒ䦢ᙒԈ晴㹆⤠ᔐᄨԄԒҩҭ㡶㚍Ⳑᄤށ塠廀ᖬ晠㙾ⳐҤ⠡圐繡Ҥ☠䙀▢椢血በቨ᧰橠杠㙀䄜柂晢ҡ䙈ڀᄀҴݡᛀ䜁■Ԍ㙀䙀㙀橢蟄噰⪘⚠晠条▥滠企癢Ҩ枨䚼Ⳁ㙀湠ቩ蠀罠ᖬ䱀䙀䜘䤰Ҧ蚀䝀ݠᎬበᣆ晨ҥ癠䡈➅ቢ鱫狣暢噀乒ҡ䙈ڂកҴݡᖠ嚄ҲݠጤᖨႤ☢満㪲ҩ䙈䚄ځރ花䛈ԄႠႤᏎⳀ㙁湡厤㛒Ԃᗑ窰በ䛀胨䜤ڒ▨Ⳁᘀ䙁㛀□躀㳲㙺㩴ڀԀᘣᓀ暯顠ᅀҠ橢杠䵂㙈Ԉ䘰⦩ᖈ晠条学ڂ詠ᑐҪᚽ袢◀ހ渼䩠䡀⠊ꏔ☠䙂䛃䍈Ⴎ䡐㝀Ⴄᙔ⪡ᣐҫ䙀䩓ꈩԁቬ髒㛄■于ᘐ䡁Ԁ晤杬悙◠橠ᖐ䆐噤㲀ጡ⛚㚠㙞ҧ⚠ޔҦ枟廰ተ䜎涇㝐⚦Ⴁ橠䥆木Ҩ㚆皹▤晬䙀尕◡橠䩘ᖆ㙁㑚ႬႥ椨Ҥݴ囈ݠژҠ㝀皠➄Ҵ⤂䰈晢某䫹㞁▤Ҵ㘸᧥ዤ骡暠扠㑤Ң蹠Ⳅꗢ䙀㳀ݰ乎㩐威Ҡ聠ᄡ䗸皣㓎䵧㡌ባ■汭ݥ曰ڈበ墈婠晦䙆䳂㙐䙄㙂ҹҹ⪺ႬႥ皠ᖠበ你㿨繠ځ䙤ᓀ䞤ڒ■勠⬀ᒠҭ溠詠በ你ڬ桪⤠គ榠橠橰覱䙈ڂᯂ䙐ߐ䡉隤Ⴀ㫀ᰀᖡݦڂ詠媰䡂ᖀ桢⪡ᣐߐ䚮㡐㙒ݠ⋂ᅋ䛁碡▨㙂▩Ҵ桠⪡ᣐߐ嗮㡐恨ݤጠខҡ癨ԄҢ虠Ⴆꗾ烊㙀⤀Ԉ䈷ꃳ仠ژҢ䜟蘲玤Ң虠Ⳇꗾ烊㛀湠◀洂□ҽቨ醂ᔆ晢蟄Ԅ仈ҭڀᄀҶҠ◗鹔禱ᖄ晠条孰晨ڈ㙖罰◔Ҷ⤠ݰᆒ䛈በ坠ᦌ橢䝇ᄀݰڈበ䞨ݠ橠杠㙀㚀轃婰䇉□ቢ酮Ⴀڀ柈㙂◙Ҥ桠⪡ᣐڐ䙮衰Ⴀᛄᑔ条慰栢詠ᖐ⥑ᖀ晨杤孴ݠᖠ㡀䞀☐桤䙄㩁Ҩ䛀䩀䁁ҡቢ醂Ԃ榠䩀桠㝀ᘠᖠ㝀Ԃ榠ᅈ㙐蚈卤ጢԀᄀ蚀㻀ᗠ蹱Ұ晪䙃㙀灠柢㙰ڨ⚤ڂң䙠晨Ҥڴ囈㪨晠条孰晨ݤԂҩ䙈䙢Ҡ䣆晢詠ᖐ⥙ҽ㡘ᖋᯁᑈݥԀႠ㫀ᴀᖨႢ⠀柢㙰ႨԌ晠⪡ᣐႪڀበ你⭀◰ቤ㩁ᒄ䚠ސ纰Ⴄڀګ㙀䊂蟀በᅈұቦ鞥ᣆҨҤҴ▻漸ᖈ⤍ҰҪڀበᄠ▱究㑀㙀⠀晣䙴ڠԌҶ鱡ޟ漠◆⍒㙙㙀晦䙁䅁Ⴈڤң噰ݠ⋂㪪䛁⻀晤Ԕ⚃佤ᗬበ㙁皫ⵈ㚓噰ݠ⋃蛰虠⻀桤Ԕ□繨㚀ᓁᏛݩᖀ塠䁉ᇨ鉤㹠ᆐߐ䛍䦠㞁Ҭ晦屢㙐ߐ䝍䡀㛁䉀㴬Ⴁ旱晰䱍墀㽠ݠᴀᄖႢ■詠ᓠ㙁ҭየ邡Ⴛݠᖀ婱覲ᖈ鉤Ԁᇠ煺満秀㙁ҭᒁ㠀һݤᖀ婰ᇰ◀晦来䅁⚨ڤԔ⚣伸ᖰ䙃㙁皡ⵆ蚂杠⭀⇬ዠ㙁皢ⵄԁᄘԍ鉢ᅟ㟀㚌⺤䙲䙁Ҭ晢屢ተ߈Ҧ蚀ႠⳄ伴杢䅁Ҩڨ㠆硨♸ᖀ䙃䛖䃐䛦蚀ႠⳆ较晠䅁ᖈڨ㙃噰䛀⋂ពႲ■詠婲ᓑ繨嚠ᒠᇠ杺洠䣂ҹҬ鉤䙠ᇠ桺橠䝂幠啴ᖄᗿᄟ■⍀䙂◑⪡Ꭰ醂ᆒҰ䬤㙀㡁ҹខ瑠偢㙈߄㚰虨剭ڀᓁᘵ■ⵄ䙤◃勠⬀ᴂ滇Ԁᗀ骉⇰ሹꇮ䡄䜿Ꞁ针䒀ᓱ▵ቢ骡鞧噠ⵅ陠መҠ晤杢寰Ⴈވ䒀ᓣ卧ꡞᓱ䛀荰抱鉠ᓑ扠ڶҠ㙀㚁⺤㙂Ԓ⪟ᔮ営㙃溡栀ސ罠䓜橤桃ԅ杰ᖀᖐ㦙■晦杩宕□魄䙢Ҳ▟ꔆ鞡顠䇈暨䒀ᓣ卧ꡞᓱ䛀荰抱鉠ᓑ扠ڶҠᣁ㙈ڈ㛤麂ݠݢᎫ㝀■躁㳦睠⚤ᑨ桂淀Һ汀ң繠Ԑቶ䙀䛀脨晤Ԕ◫倈晤析孽ҠᅄҴ㑄奠ݢԀᇠ梺橠⍄⛙ҡ粀⏀ᇠ牺櫠ސ繡Ҡ池還ұ晢覀በ⛠□ᕑ╠Ԁ橨ԅԀ䞀◐䡆ҫᛀ■ᛀ䚄⩃檌㩀䙀㩁Ⴐ䙮㛰癡Ҡ癤⬁ޘ椢晤Ң晰坤ᑬ⤙ҰҨԈ䓉㑀ހᖀ䡀䛃■ᓢ㙐Ҡ唬ᖂ┟ᄀ■檠橰ꄈ㝀晠䝂ᯀ椨Ҩ㙂ң卤⎂䡃孰枨ڠ橢ҡᖈ晢䝆ᇠ■橠褰ҡ蹠ڀᴁޕ◡橠䩐⥑▨晪潭ҥ椨ބڂһ勨㛂ꌑ㝃胨䚀䩂ҩҭ窤ᓁᇸ满ݨበ恨ᄐ䁂䙃䛾䊈木㚆睨ᛄڀᗁᇺ☢又㟇⚨㛀⬐በ㛃ߐᖀ硠坠䰘晢乢ұᆈݮ涃噰ݠᏂᗪ㛀湡亀洂㙩ҩ㡚ҫᯀ椨ဈ㙄蛈ݠᴂႣ䙐ᄨԅԀᇰ■晢杤孰暨ވ㚆睰㫀ᘒⳀᣅ湢◀嵲◁Ҭ普邁ݥ湡ݨበ㝀㟨桦ᓀ㙁■䯠ң癠ݠᏂᅊ㛀湠満㳢㙑ҭ㡚ҫᣐҢ驀㙐䈸⚠晢䡂䛇禡▤Ң▨噤㲀ځҰҺ躀嵲㙣令ᴀᖄ䙐Ҩ䙠婢Ҫᖀ驠Ԁހ暺檠㡀䂈婠㱖䙃㙁□⺤䙤⪃櫨♴䝁㙂㚀⛠橠䁁ҭበ屢Ұߐ䛍䡠㽀ង䁀⤋㙁㚀钄㙠罠▱ڀᄀᄕ◠曈በ⠈ဈҠ䙁䛀胨暄Ԅ滈Ԍ㲀ҫᔀ■ᖀ㳠纘ݠڀᅋᣃ晨Ҩ㛆皸䉀晠杨寥榠◹⥞⇾偻帇✟ᣆ晰癳♏骬䆎怼ҫ⋀㛹箲♋㩬瓂㜾⤃Ҡ椢龂㙠ቬባҠ⨥ݷ苽哎沒ꀳⲡ洦妔㿙ⲍ銧⇣憁篤账妗㹙羬銇ᓶ埳㯈謦宔囻獫鏭㱧㥋灄蔦闒壷茼狅鶖覫⻔蔲髅彷䋜虠ҠݠᄘҠ߉Ꮐҥ䙀Ҧ⨣矵腀骀悗湹ⴎ賶䥩ᆉ颠ꄅ得肻瑮綢ያ瀩蕄濎憐腺勤⏇䇓Ⱍ缲袎徙暃䙂Ҡ癠Ҡ䑀Ҡ✠㚬㙸Ҡ苨查轈词庚▽㐤ᴆ爓䯑炠裙㙽㾜瑉㴧奫堅溠隥徙䈜橬緦养簱礼趀怑苾呮晰ҠҠҠҡҠҠ晠Ҩ蹠晠㩀Ҡ㗀Ҡ␀Ҡᆁ欨賈宖䇜㒘劬岦冑搁蔺讏墒菽哌綂ꀓ⻅謮閏徒耺哎涇濛琩沾跉悔䎘氬嵖迉毵洦岒䋜罸涌粓柱猝眪麍㹗ⳋ泅鶗㥙搑礤哒忠ҦԂҥ㙀ң㑀Ҡ㣀Ҡᒀ㝀ᏐҠᆎҠԀ晠Ҡ噠Ҡ㙀ҠᖀҠႠҠҠҠᆍ睊铋忰㼘吭赗䝃䟅錪䚡㙹肾猄⎖坣迵謾ҠڐڄҤ㙀ҡ搩酆髃㷙㼎⬬妓䟙漬锤廆䇲ⵘ䲬妓忡珴财店她㾘沬妳䥉茰蔸迂徐苾䰬嵗㥩搭謦嗓岔缹䰭絖䞳瀬Ҡߌݨҳ䙀ҧ▸Ҡ㡀Ҡ㷴䈛包鲦刓簭煄喎堐苹鑅鶆军䰍轄龏怙㼋鍍㶆樋♙派鎍㻲缸账䧓熃⚅焦庒㿗茸钯㵇䞩朘誼嚏怙㼋钭鴶爡怩豠剢■㰀ҠᘠҠڈҠڡ怙羼瓭㴶靣㿅礸评䍐㽜铥账凑䛤曜掀怙㼋珬終枩搁蔺讏墒菽哌綂ꀓ⻅謮閏徒耺哎涇濛琩沾跉悔䎘氬嵖迉毵洦岒䋜罸涌粓柱猝歒髅㳺䈛鏮夳ᅑ猘袾駒執腺劥趇㹀Ң鹤㙀勠ҠᄀҠԈҠژተԋ晠Ҫ䙀Ҡ鹠Ҡ剢■㰀Ҡ⎐ҠڄҠԌႨҵ虠Ҧ㙀Ҡ葠ҠҠҠ⬭␖馻狡洢铎帚►⫮貲ᒉል祔讀帓▾猎䴰ҠᅐᰀԁҠҫ钮綗䥙挩泐觃㿚Ⲍ泆鲃榑菰鄢姃㿛牬錆屳栛㼉焤壃䃚㺍賥鴦煳濥譒嗃帙㾋铎䱲ꈻ堅洪嗍帒⦼瓀Ҡᗀ⬀ݺҠԘ朠ҡ㙀Ң䯹錢鋉墇莽㑎綤見忿牲郥經锼蓍訣縊擵ꖤ㒑沔ᅆ鯛㹱鼮巡岾軏崒爹Ⰾ趷䅫漜茦蟒娗爼猌鳷䇣灄蕆飃㷳肽Ⳏ粂饻搔胂诃埻⭎䵬沃熋Ⲡ諆嗂岗缺谌䶖妓㰈胀咗㵙爼钬奖覫♙譆ҸቨҶ虠Ҩ习Ҡ㡀Ҡ⪢ᖀ⥠ҠᗀҠԆҠҬႤҫ噠Ҥ噠Ҡ㵀ҠᯁበᦐҠހҠҭҠҦݢҥ繠Ҡ鉠ҠᘀҠကҠԀҠҨҠҤҠҡ㙀Ҡ习Ҡ见岖㾙ᖌᚷᔣ䯽苔惕嶛苸呥ᏖႣ搘朢䚠䵷臹剤┆⥣篵脪鏏徜湸叭浖䅋砅蔼䚯奰▸疎沷㽃㿅礸评Ҡҡ蜂ҡ习Ҡ幪㙀⋀Ҡ⻍㱧㥋灄蕆髄㷹苸豌㴆觛Ⱉ譆扥■ᯀҠᠰ■ԄҠڬ嬑䋘咯㤷䇣㛽资規庐臺勍島香怩质ᛐҮҠҧ蚀Ҡ鹠Ҡ詥■⎠Ҡᕐ㙀ڼҠҫҠңҠҠ䙀Ҡ㹀ҠᔀҠႠҠԀҠҺҠҧҠҢҠҠ㙀Ҡ㕀ҠᖀҠڰҠԀҠҤҠҤ䙀ҡ㙀Ҡ㑀ҠҠҠԀҠݸҠߘ迂徐苾䰬㴆觛Ⱍ资規徐萷锬粒駳班楀蟃嬚䒈㐮買㥳堝鑠Ҡ⠃ᖀዠҠ╠㪀ԘҠңݠҠ癠ң䯹漪麀帚荨㐬衦㦻簙潆悀悔㾈⻌終ᓋ狠朤鯔㙺䁙䩍㴦䥫蛡祆䙀ԀᆄҤҠңҸ䙀㡀ҠᯀҠҠҠҤҠҹҠһ劎沖榋狤ꄚ揁怙羼瓭㴶靣㿅礸评䍐㹊⻌糇䝁ሉ礮軔㫰Ꮘᖍ沶威軡朠剪㙹䂙鍮樂ᒃဈ晠Ҡ痣ᖀᒠҠ᧠㺀ԄҠڥᆄҡ晠Ҧ繸䙀ᒀҠ㹀Ҡ➰因ڤҠޘᒈҤ晠Ҭ皐晠㹀ҠꔃᖀԀҠሑҠݠᯐҠҠҤڱҠ■Ҡ鋉垙㺜疅鲖ꈳ㫽资規妖荫鐮紲駳牠蹮㙀⻀ҠⰀҠހҠڠ麐㹘⬌ᴆᒳᇡ朴蛌嚗㹜⪮䱦ᒓ✩漤賂媑䃘珬䴦㧃➉漠諂墒㽙狭ᴆ禃埱茨雄従㹙犬貦妓㿡猴賌妗㿜Ⲏ䳆ᓃ❁漰賈媔䃚⻍⎆槣䠉笠郂宒䃙玭⍆禳堉茴雊徖㹛⬍沦覓堁缴鋌岗䅜⻎䴦ᓳ❙漼賎媗䃛班赆駣怩蜠雂庒䉙瑭⎦秣堡荀雐徙㹜犮䲇㥳瀁謴飌得䋜㒎咬㴦憉ል輢飔㙴臹Ⰿቢᓻ簰朾貀徐臹錄⇦ꈱል缲觅㙷翨⻌絆戃䛀Ҡ偨■ᘀҠᕀ曠ݨҠڲ圗䀙䩌絆䝃䯹漪麀幤ᖀበҠሠ䚀ڄҠԙ腺勌硦燓㟕隠駔圙䍜詬㶂Ⴃ➕躠诎墙湸哤ҩڀ晠剠Ҡ祤ᖀᇠ═燣瀝潊觅徙曢⻌㴦戋ᣝ灢ᗒ愙荠ᆎ⏆ꆻ㰍贪認垜朡咮綗䥘鬤苌庎㹐⠌狇ᰖ㿙眬誠墐㽙熬⇥祣垨䀝椸飕忣⪫沇㤣ڣ菥贺参嬗㽙錍螃ᅑ漘雈䙨堒纮⬬妖䟑ɇ";
var wasmBinary = base32768.decode(base32768WASM);
scryptPromise = WebAssembly.instantiate(wasmBinary, {}).then(function (instantiatedModule) {
  var wasm;
  function __wbg_set_wasm(val) {
    wasm = val;
  }
  var WASM_VECTOR_LEN = 0;
  var cachedUint8Memory0 = null;
  function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
      cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
  }
  var lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;
  var cachedTextEncoder = new lTextEncoder('utf-8');
  var encodeString = typeof cachedTextEncoder.encodeInto === 'function' ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
  } : function (arg, view) {
    var buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
      read: arg.length,
      written: buf.length
    };
  };
  function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
      var buf = cachedTextEncoder.encode(arg);
      var _ptr = malloc(buf.length);
      getUint8Memory0().subarray(_ptr, _ptr + buf.length).set(buf);
      WASM_VECTOR_LEN = buf.length;
      return _ptr;
    }
    var len = arg.length;
    var ptr = malloc(len);
    var mem = getUint8Memory0();
    var offset = 0;
    for (; offset < len; offset++) {
      var code = arg.charCodeAt(offset);
      if (code > 0x7F) break;
      mem[ptr + offset] = code;
    }
    if (offset !== len) {
      if (offset !== 0) {
        arg = arg.slice(offset);
      }
      ptr = realloc(ptr, len, len = offset + arg.length * 3);
      var view = getUint8Memory0().subarray(ptr + offset, ptr + len);
      var ret = encodeString(arg, view);
      offset += ret.written;
    }
    WASM_VECTOR_LEN = offset;
    return ptr;
  }
  var cachedInt32Memory0 = null;
  function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
      cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
  }
  var lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;
  var cachedTextDecoder = new lTextDecoder('utf-8', {
    ignoreBOM: true,
    fatal: true
  });
  cachedTextDecoder.decode();
  function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
  }
  /**
  * @param {string} password
  * @param {string} salt
  * @param {number} n
  * @param {number} r
  * @param {number} p
  * @param {number} dklen
  * @returns {string}
  */
  scrypt = function scrypt(password, salt, n, r, p, dklen) {
    try {
      var retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      var ptr0 = passStringToWasm0(password, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      var len0 = WASM_VECTOR_LEN;
      var ptr1 = passStringToWasm0(salt, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      var len1 = WASM_VECTOR_LEN;
      wasm.scrypt(retptr, ptr0, len0, ptr1, len1, n, r, p, dklen);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_free(r0, r1);
    }
  };
  __wbg_set_wasm(instantiatedModule.instance.exports);
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.nmd = function(module) {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!*************************************!*\
  !*** ./src/worker/worker-scrypt.ts ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PoWWorker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PoWWorker */ "./src/worker/PoWWorker.ts");
/* harmony import */ var _libs_scrypt_wasm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../libs/scrypt_wasm */ "../libs/scrypt_wasm.js");
/* harmony import */ var _libs_scrypt_wasm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_libs_scrypt_wasm__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_FaucetConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/FaucetConfig */ "./src/common/FaucetConfig.ts");



(function () {
  (0,_libs_scrypt_wasm__WEBPACK_IMPORTED_MODULE_1__.getScryptReadyPromise)().then(function () {
    var scrypt = (0,_libs_scrypt_wasm__WEBPACK_IMPORTED_MODULE_1__.getScrypt)();
    new _PoWWorker__WEBPACK_IMPORTED_MODULE_0__.PoWWorker({
      hashFn: function hashFn(nonce, preimg, params) {
        if (params.a !== _common_FaucetConfig__WEBPACK_IMPORTED_MODULE_2__.PoWHashAlgo.SCRYPT) return null;
        return scrypt(nonce, preimg, params.n, params.r, params.p, params.l);
      }
    });
  });
})();
}();
/******/ })()
;
//# sourceMappingURL=powfaucet-worker-sc.js.map