///<reference path="node_modules/makerjs/index.d.ts" />
var makerjs = require('makerjs');
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.renderCurrent = function () {
            _this.updateUrl();
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
        this.downloadSvg = function () {
            var SvgFile = window.btoa(_this.outputTextarea.value);
            _this.downloadButton.href = 'data:image/svg+xml;base64,' + SvgFile;
            _this.downloadButton.download = _this.textInput.value;
        };
        this.copyToClipboard = function () {
            _this.outputTextarea.select();
            document.execCommand('copy');
            _this.copyToClipboardBtn.innerText = 'copied';
            setTimeout(function () {
                _this.copyToClipboardBtn.innerText = 'copy to clipboard';
            }, 2000);
        };
    }
    App.prototype.updateUrl = function () {
        var urlSearchParams = new URLSearchParams(window.location.search);
        urlSearchParams.set('font-select', this.selectFamily.value);
        urlSearchParams.set('font-variant', this.selectVariant.value);
        urlSearchParams.set('input-union', String(this.unionCheckbox.checked));
        urlSearchParams.set('input-kerning', String(this.kerningCheckbox.checked));
        urlSearchParams.set('input-separate', String(this.separateCheckbox.checked));
        urlSearchParams.set('input-text', this.textInput.value);
        urlSearchParams.set('input-bezier-accuracy', this.bezierAccuracy.value);
        urlSearchParams.set('input-size', this.sizeInput.value);
        var url = window.location.protocol
            + "//" + window.location.host
            + window.location.pathname
            + "?"
            + urlSearchParams.toString();
        window.history.replaceState({ path: url }, "", url);
    };
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
        this.downloadButton = this.$("#download-btn");
        this.copyToClipboardBtn = this.$("#copy-to-clipboard-btn");
        this.readQueryParams();
    };
    App.prototype.readQueryParams = function () {
        var urlSearchParams = new URLSearchParams(window.location.search);
        var selectFamily = urlSearchParams.get('font-select');
        var selectVariant = urlSearchParams.get('font-variant');
        var unionCheckbox = urlSearchParams.get('input-union');
        var kerningCheckbox = urlSearchParams.get('input-kerning');
        var separateCheckbox = urlSearchParams.get('input-separate');
        var textInput = urlSearchParams.get('input-text');
        var bezierAccuracy = urlSearchParams.get('input-bezier-accuracy');
        var sizeInput = urlSearchParams.get('input-size');
        console.log(unionCheckbox);
        if (selectFamily !== "")
            this.selectFamily.value = selectFamily;
        if (selectVariant !== "")
            this.selectVariant.value = selectVariant;
        if (unionCheckbox !== "")
            this.unionCheckbox.checked = unionCheckbox === "true" ? true : false;
        if (kerningCheckbox !== "")
            this.kerningCheckbox.checked = kerningCheckbox === "true" ? true : false;
        if (separateCheckbox !== "")
            this.separateCheckbox.checked = separateCheckbox === "true" ? true : false;
        if (textInput !== "" && textInput !== null)
            this.textInput.value = textInput;
        if (bezierAccuracy !== "")
            this.bezierAccuracy.value = bezierAccuracy;
        if (sizeInput !== "" && sizeInput !== null)
            this.sizeInput.value = sizeInput;
    };
    App.prototype.handleEvents = function () {
        this.selectFamily.onchange = this.loadVariants;
        this.selectVariant.onchange =
            this.textInput.onchange =
                this.textInput.onkeyup =
                    this.sizeInput.onkeyup =
                        this.unionCheckbox.onchange =
                            this.kerningCheckbox.onchange =
                                this.separateCheckbox.onchange =
                                    this.bezierAccuracy.onchange =
                                        this.bezierAccuracy.onkeyup =
                                            this.renderCurrent;
        this.copyToClipboardBtn.onclick = this.copyToClipboard;
        this.downloadButton.onclick = this.downloadSvg;
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
            console.log(_this.fontList);
            _this.fontList.items.forEach(function (font) { return _this.addOption(_this.selectFamily, font.family); });
            _this.loadVariants();
            _this.handleEvents();
            _this.readQueryParams();
        };
        xhr.send();
    };
    App.prototype.render = function (fontIndex, variantIndex, text, size, union, kerning, separate, bezierAccuracy) {
        var _this = this;
        // debugger;
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
