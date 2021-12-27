///<reference path="node_modules/makerjs/index.d.ts" />
////<reference path="node_modules/@jscad/stl-serializer/index.d.ts" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var makerjs = require('makerjs');
// const stlSerializer = require('@jscad/stl-serializer');
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.renderCurrent = function () {
            var size = _this.sizeInput.valueAsNumber;
            if (!size)
                size = parseFloat(_this.sizeInput.value);
            if (!size)
                size = 100;
            _this.render(_this.selectFamily.selectedIndex, _this.selectVariant.selectedIndex, _this.textInput.value, size, _this.unionCheckbox.checked, _this.filledCheckbox.checked, _this.kerningCheckbox.checked, _this.separateCheckbox.checked, parseFloat(_this.bezierAccuracy.value) || undefined, _this.selectUnits.value);
        };
        this.loadVariants = function () {
            _this.selectVariant.options.length = 0;
            var f = _this.fontList.items[_this.selectFamily.selectedIndex];
            var v = f.variants.forEach(function (v) { return _this.addOption(_this.selectVariant, v); });
            _this.renderCurrent();
        };
        this.downloadSvg = function () {
            var SvgFile = window.btoa(_this.outputTextarea.value);
            _this.downloadButton.href = 'data:image/svg+xml;base64,' + SvgFile;
            _this.downloadButton.download = _this.textInput.value;
        };
        this.downloadDxf = function () {
            var dxfFile = window.btoa(_this.renderDiv.getAttribute('data-dxf'));
            _this.dxfButton.href = 'data:application/dxf;base64,' + dxfFile;
            _this.dxfButton.download = _this.textInput.value + '.dxf';
        };
        this.copyToClipboard = function () {
            _this.outputTextarea.select();
            document.execCommand('copy');
            _this.copyToClipboardBtn.innerText = 'copied';
            setTimeout(function () {
                _this.copyToClipboardBtn.innerText = 'copy to clipboard';
            }, 2000);
        };
        this.updateUrl = function () {
            var urlSearchParams = new URLSearchParams(window.location.search);
            urlSearchParams.set('font-select', _this.selectFamily.value);
            urlSearchParams.set('font-variant', _this.selectVariant.value);
            urlSearchParams.set('input-union', String(_this.unionCheckbox.checked));
            urlSearchParams.set('input-filled', String(_this.filledCheckbox.checked));
            urlSearchParams.set('input-kerning', String(_this.kerningCheckbox.checked));
            urlSearchParams.set('input-separate', String(_this.separateCheckbox.checked));
            urlSearchParams.set('input-text', _this.textInput.value);
            urlSearchParams.set('input-bezier-accuracy', _this.bezierAccuracy.value);
            urlSearchParams.set('dxf-units', _this.selectUnits.value);
            urlSearchParams.set('input-size', _this.sizeInput.value);
            var url = window.location.protocol
                + "//" + window.location.host
                + window.location.pathname
                + "?"
                + urlSearchParams.toString();
            window.history.replaceState({ path: url }, "", url);
            _this.copyString(window.location.href);
            _this.createLinkButton.innerText = 'copied';
            setTimeout(function () {
                _this.createLinkButton.innerText = 'create link';
            }, 2000);
        };
        this.copyString = function (string) {
            _this.dummy.value = string;
            _this.dummy.type = 'text';
            _this.dummy.select();
            document.execCommand('copy');
            _this.dummy.type = 'hidden';
        };
        this.readUploadedFile = function (event) { return __awaiter(_this, void 0, void 0, function () {
            var element, files, buffer, font;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        element = event.currentTarget;
                        if (!(element.files.length === 0)) return [3 /*break*/, 1];
                        this.customFont = undefined;
                        return [3 /*break*/, 3];
                    case 1:
                        files = element.files[0];
                        return [4 /*yield*/, files.arrayBuffer()];
                    case 2:
                        buffer = _a.sent();
                        font = opentype.parse(buffer);
                        this.customFont = font;
                        _a.label = 3;
                    case 3:
                        this.renderCurrent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.removeUploadedFont = function () {
            _this.fileUpload.value = null;
            _this.customFont = undefined;
            _this.renderCurrent();
        };
    }
    App.prototype.init = function () {
        var _this = this;
        this.fileUpload = this.$('#font-upload');
        this.fileUploadRemove = this.$('#font-upload-remove');
        this.selectFamily = this.$('#font-select');
        this.selectVariant = this.$('#font-variant');
        this.unionCheckbox = this.$('#input-union');
        this.filledCheckbox = this.$('#input-filled');
        this.kerningCheckbox = this.$('#input-kerning');
        this.separateCheckbox = this.$('#input-separate');
        this.textInput = this.$('#input-text');
        this.bezierAccuracy = this.$('#input-bezier-accuracy');
        this.selectUnits = this.$('#dxf-units');
        this.sizeInput = this.$('#input-size');
        this.renderDiv = this.$('#svg-render');
        this.outputTextarea = this.$('#output-svg');
        this.downloadButton = this.$("#download-btn");
        this.dxfButton = this.$("#dxf-btn");
        this.createLinkButton = this.$("#create-link");
        this.copyToClipboardBtn = this.$("#copy-to-clipboard-btn");
        this.dummy = this.$('#dummy');
        // Init units select.
        Object.values(makerjs.unitType).forEach(function (unit) { return _this.addOption(_this.selectUnits, unit); });
    };
    App.prototype.readQueryParams = function () {
        var urlSearchParams = new URLSearchParams(window.location.search);
        var selectFamily = urlSearchParams.get('font-select');
        var selectVariant = urlSearchParams.get('font-variant');
        var unionCheckbox = urlSearchParams.get('input-union');
        var filledCheckbox = urlSearchParams.get('input-filled');
        var kerningCheckbox = urlSearchParams.get('input-kerning');
        var separateCheckbox = urlSearchParams.get('input-separate');
        var textInput = urlSearchParams.get('input-text');
        var bezierAccuracy = urlSearchParams.get('input-bezier-accuracy');
        var selectUnits = urlSearchParams.get('dxf-units');
        var sizeInput = urlSearchParams.get('input-size');
        if (selectFamily !== "" && selectFamily !== null)
            this.selectFamily.value = selectFamily;
        if (selectVariant !== "" && selectVariant !== null)
            this.selectVariant.value = selectVariant;
        if (selectUnits !== "" && selectUnits !== null)
            this.selectUnits.value = selectUnits;
        if (unionCheckbox !== "" && unionCheckbox !== null)
            this.unionCheckbox.checked = unionCheckbox === "true" ? true : false;
        if (filledCheckbox !== "" && filledCheckbox !== null)
            this.filledCheckbox.checked = filledCheckbox === "true" ? true : false;
        if (kerningCheckbox !== "" && kerningCheckbox !== null)
            this.kerningCheckbox.checked = kerningCheckbox === "true" ? true : false;
        if (separateCheckbox !== "" && separateCheckbox !== null)
            this.separateCheckbox.checked = separateCheckbox === "true" ? true : false;
        if (textInput !== "" && textInput !== null)
            this.textInput.value = textInput;
        if (bezierAccuracy !== "" && bezierAccuracy !== null)
            this.bezierAccuracy.value = bezierAccuracy;
        if (sizeInput !== "" && sizeInput !== null)
            this.sizeInput.value = sizeInput;
    };
    App.prototype.handleEvents = function () {
        this.fileUpload.onchange = this.readUploadedFile;
        this.fileUploadRemove.onclick = this.removeUploadedFont;
        this.selectFamily.onchange = this.loadVariants;
        this.selectVariant.onchange =
            this.textInput.onchange =
                this.textInput.onkeyup =
                    this.sizeInput.onkeyup =
                        this.unionCheckbox.onchange =
                            this.filledCheckbox.onchange =
                                this.kerningCheckbox.onchange =
                                    this.separateCheckbox.onchange =
                                        this.bezierAccuracy.onchange =
                                            this.bezierAccuracy.onkeyup =
                                                this.selectUnits.onchange =
                                                    this.renderCurrent;
        this.copyToClipboardBtn.onclick = this.copyToClipboard;
        this.downloadButton.onclick = this.downloadSvg;
        this.dxfButton.onclick = this.downloadDxf;
        this.createLinkButton.onclick = this.updateUrl;
    };
    App.prototype.$ = function (selector) {
        return document.querySelector(selector);
    };
    App.prototype.addOption = function (select, optionText) {
        var option = document.createElement('option');
        option.text = optionText;
        option.value = optionText;
        select.options.add(option);
    };
    App.prototype.getGoogleFonts = function (apiKey) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'https://www.googleapis.com/webfonts/v1/webfonts?key=' + apiKey, true);
        xhr.onloadend = function () {
            _this.fontList = JSON.parse(xhr.responseText);
            _this.fontList.items.forEach(function (font) { return _this.addOption(_this.selectFamily, font.family); });
            _this.loadVariants();
            _this.handleEvents();
            _this.readQueryParams();
            _this.renderCurrent();
        };
        xhr.send();
    };
    App.prototype.callMakerjs = function (font, text, size, union, filled, kerning, separate, bezierAccuracy, units) {
        //generate the text using a font
        var textModel = new makerjs.models.Text(font, text, size, union, false, bezierAccuracy, { kerning: kerning });
        if (separate) {
            for (var i in textModel.models) {
                textModel.models[i].layer = i;
            }
        }
        var svg = makerjs.exporter.toSVG(textModel, { fill: filled ? 'black' : undefined });
        var dxf = makerjs.exporter.toDXF(textModel, { units: units, usePOLYLINE: true });
        this.renderDiv.innerHTML = svg;
        this.renderDiv.setAttribute('data-dxf', dxf);
        this.outputTextarea.value = svg;
    };
    App.prototype.render = function (fontIndex, variantIndex, text, size, union, filled, kerning, separate, bezierAccuracy, units) {
        var _this = this;
        var f = this.fontList.items[fontIndex];
        var v = f.variants[variantIndex];
        var url = f.files[v].substring(5); //remove http:
        if (this.customFont !== undefined) {
            this.callMakerjs(this.customFont, text, size, union, filled, kerning, separate, bezierAccuracy, units);
        }
        else {
            opentype.load(url, function (err, font) {
                _this.callMakerjs(font, text, size, union, filled, kerning, separate, bezierAccuracy, units);
            });
        }
    };
    return App;
}());
var app = new App();
window.onload = function () {
    app.init();
    app.getGoogleFonts('AIzaSyAOES8EmKhuJEnsn9kS1XKBpxxp-TgN8Jc');
};
