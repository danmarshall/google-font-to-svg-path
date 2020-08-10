///<reference path="node_modules/makerjs/index.d.ts" />
var makerjs = require('makerjs');
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.renderCurrent = function () {
            var size = _this.sizeInput.valueAsNumber;
            if (!size)
                size = parseFloat(_this.sizeInput.value);
            if (!size)
                size = 100;
            _this.render(_this.selectFamily.selectedIndex, _this.selectVariant.selectedIndex, _this.textInput.value, size, _this.unionCheckbox.checked, _this.kerningCheckbox.checked, _this.separateCheckbox.checked, parseFloat(_this.bezierAccuracy.value) || undefined);
        };
        this.loadVariants = function () {
            _this.selectVariant.options.length = 0;
            var f = _this.fontList.items[_this.selectFamily.selectedIndex];
            var v = f.variants.forEach(function (v) { return _this.addOption(_this.selectVariant, v); });
            _this.renderCurrent();
        };
    }
    App.prototype.init = function () {
        this.selectFamily = this.$('#font-select');
        this.selectVariant = this.$('#font-variant');
        this.unionCheckbox = this.$('#input-union');
        this.kerningCheckbox = this.$('#input-kerning');
        this.separateCheckbox = this.$('#input-separate');
        this.textInput = this.$('#input-text');
        this.bezierAccuracy = this.$('#input-bezier-accuracy');
        this.sizeInput = this.$('#input-size');
        this.renderDiv = this.$('#svg-render');
        this.outputTextarea = this.$('#output-svg');
    };
    App.prototype.handleEvents = function () {
        this.selectFamily.onchange = this.loadVariants;
        this.selectVariant.onchange =
            this.textInput.onchange =
                this.textInput.onkeyup =
                    this.sizeInput.onchange =
                        this.unionCheckbox.onchange =
                            this.kerningCheckbox.onchange =
                                this.separateCheckbox.onchange =
                                    this.bezierAccuracy.onchange =
                                        this.renderCurrent;
    };
    App.prototype.$ = function (selector) {
        return document.querySelector(selector);
    };
    App.prototype.addOption = function (select, optionText) {
        var option = document.createElement('option');
        option.text = optionText;
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
        };
        xhr.send();
    };
    App.prototype.render = function (fontIndex, variantIndex, text, size, union, kerning, separate, bezierAccuracy) {
        var _this = this;
        var f = this.fontList.items[fontIndex];
        var v = f.variants[variantIndex];
        var url = f.files[v].substring(5); //remove http:
        opentype.load(url, function (err, font) {
            //generate the text using a font
            var textModel = new makerjs.models.Text(font, text, size, union, false, bezierAccuracy, { kerning: kerning });
            if (separate) {
                for (var i in textModel.models) {
                    textModel.models[i].layer = i;
                }
            }
            var svg = makerjs.exporter.toSVG(textModel);
            _this.renderDiv.innerHTML = svg;
            _this.outputTextarea.value = svg;
        });
    };
    return App;
}());
var app = new App();
window.onload = function () {
    app.init();
    app.getGoogleFonts('AIzaSyAOES8EmKhuJEnsn9kS1XKBpxxp-TgN8Jc');
};
