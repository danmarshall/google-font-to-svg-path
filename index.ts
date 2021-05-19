///<reference path="node_modules/makerjs/index.d.ts" />

var makerjs = require('makerjs') as typeof MakerJs;

class App {

    public fontList: google.fonts.WebfontList;
    private selectFamily: HTMLSelectElement;
    private selectVariant: HTMLSelectElement;
    private unionCheckbox: HTMLInputElement;
    private kerningCheckbox: HTMLInputElement;
    private separateCheckbox: HTMLInputElement;
    private textInput: HTMLInputElement;
    private bezierAccuracy: HTMLInputElement;
    private sizeInput: HTMLInputElement;
    private renderDiv: HTMLDivElement;
    private outputTextarea: HTMLTextAreaElement;
    private copyToClipboardBtn: HTMLButtonElement;
    private downloadButton: HTMLAnchorElement;
    private renderCurrent = () => {
        var size = this.sizeInput.valueAsNumber;
        if (!size) size = parseFloat(this.sizeInput.value);
        if (!size) size = 100;
        this.render(
            this.selectFamily.selectedIndex,
            this.selectVariant.selectedIndex,
            this.textInput.value,
            size,
            this.unionCheckbox.checked,
            this.kerningCheckbox.checked,
            this.separateCheckbox.checked,
            parseFloat(this.bezierAccuracy.value) || undefined
        );
    };

    private loadVariants = () => {
        this.selectVariant.options.length = 0;
        var f = this.fontList.items[this.selectFamily.selectedIndex];
        var v = f.variants.forEach(v => this.addOption(this.selectVariant, v));
        this.renderCurrent();
    };
    private downloadSvg = () => {
        var SvgFile = window.btoa(this.outputTextarea.value);
        this.downloadButton.href = 'data:image/svg+xml;base64,' + SvgFile;
        this.downloadButton.download = this.textInput.value;
    };
    private copyToClipboard = () => {
        this.outputTextarea.select();
        document.execCommand('copy');
        this.copyToClipboardBtn.innerText = 'copied';
        setTimeout(() => {
            this.copyToClipboardBtn.innerText = 'copy to clipboard';
        }, 2000)
    };
    constructor() {

    }

    init() {
        this.selectFamily = this.$('#font-select') as HTMLSelectElement;
        this.selectVariant = this.$('#font-variant') as HTMLSelectElement;
        this.unionCheckbox = this.$('#input-union') as HTMLInputElement;
        this.kerningCheckbox = this.$('#input-kerning') as HTMLInputElement;
        this.separateCheckbox = this.$('#input-separate') as HTMLInputElement;
        this.textInput = this.$('#input-text') as HTMLInputElement;
        this.bezierAccuracy = this.$('#input-bezier-accuracy') as HTMLInputElement;
        this.sizeInput = this.$('#input-size') as HTMLInputElement;
        this.renderDiv = this.$('#svg-render') as HTMLDivElement;
        this.outputTextarea = this.$('#output-svg') as HTMLTextAreaElement;
        this.downloadButton = this.$("#download-btn") as HTMLAnchorElement;
        this.copyToClipboardBtn = this.$("#copy-to-clipboard-btn") as HTMLButtonElement;
    }

    handleEvents() {
        this.selectFamily.onchange = this.loadVariants;
        this.selectVariant.onchange =
            this.textInput.onchange =
            this.textInput.onkeyup =
            this.sizeInput.onkeyup =
            this.unionCheckbox.onchange =
            this.kerningCheckbox.onchange =
            this.separateCheckbox.onchange =
            this.bezierAccuracy.onchange =
            this.renderCurrent
            ;
        this.copyToClipboardBtn.onclick = this.copyToClipboard;
        this.downloadButton.onclick = this.downloadSvg;
    }

    $(selector: string) {
        return document.querySelector(selector);
    }

    addOption(select: HTMLSelectElement, optionText: string) {
        var option = document.createElement('option');
        option.text = optionText;
        select.options.add(option);
    }

    getGoogleFonts(apiKey: string) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'https://www.googleapis.com/webfonts/v1/webfonts?key=' + apiKey, true);
        xhr.onloadend = () => {
            this.fontList = JSON.parse(xhr.responseText);
            this.fontList.items.forEach(font => this.addOption(this.selectFamily, font.family));
            this.loadVariants();
            this.handleEvents();
        };
        xhr.send();
    }

    render(
        fontIndex: number,
        variantIndex: number,
        text: string,
        size: number,
        union: boolean,
        kerning: boolean,
        separate: boolean,
        bezierAccuracy: number
    ) {

        var f = this.fontList.items[fontIndex];
        var v = f.variants[variantIndex];
        var url = f.files[v].substring(5);  //remove http:

        opentype.load(url, (err, font) => {

            //generate the text using a font
            var textModel = new makerjs.models.Text(font, text, size, union, false, bezierAccuracy, { kerning });

            if (separate) {
                for (var i in textModel.models) {
                    textModel.models[i].layer = i;
                }
            }

            var svg = makerjs.exporter.toSVG(textModel);

            this.renderDiv.innerHTML = svg;
            this.outputTextarea.value = svg;
        });

    }
}

var app = new App();

window.onload = () => {
    app.init();
    app.getGoogleFonts('AIzaSyAOES8EmKhuJEnsn9kS1XKBpxxp-TgN8Jc');
};
