///<reference path="node_modules/makerjs/index.d.ts" />
////<reference path="node_modules/@jscad/stl-serializer/index.d.ts" />

var makerjs = require('makerjs') as typeof MakerJs;
// const stlSerializer = require('@jscad/stl-serializer');

class App {

    public fontList: google.fonts.WebfontList;
    private fileUpload: HTMLInputElement
    private fileUploadRemove: HTMLInputElement
    private customFont: opentype.Font;
    private selectFamily: HTMLSelectElement;
    private selectVariant: HTMLSelectElement;
    private unionCheckbox: HTMLInputElement;
    private filledCheckbox: HTMLInputElement;
    private kerningCheckbox: HTMLInputElement;
    private separateCheckbox: HTMLInputElement;
    private textInput: HTMLInputElement;
    private bezierAccuracy: HTMLInputElement;
    private selectUnits: HTMLSelectElement;
    private sizeInput: HTMLInputElement;
    private renderDiv: HTMLDivElement;
    private outputTextarea: HTMLTextAreaElement;
    private copyToClipboardBtn: HTMLButtonElement;
    private downloadButton: HTMLAnchorElement;
    private dxfButton: HTMLAnchorElement;
    private createLinkButton: HTMLAnchorElement;
    private dummy: HTMLInputElement;
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
            this.filledCheckbox.checked,
            this.kerningCheckbox.checked,
            this.separateCheckbox.checked,
            parseFloat(this.bezierAccuracy.value) || undefined,
            this.selectUnits.value
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
    private downloadDxf = () => {
        var dxfFile = window.btoa(this.renderDiv.getAttribute('data-dxf'));
        this.dxfButton.href = 'data:application/dxf;base64,' + dxfFile;
        this.dxfButton.download = this.textInput.value + '.dxf';
    }
    private copyToClipboard = () => {
        this.outputTextarea.select();
        document.execCommand('copy');
        this.copyToClipboardBtn.innerText = 'copied';
        setTimeout(() => {
            this.copyToClipboardBtn.innerText = 'copy to clipboard';
        }, 2000)
    };
    private updateUrl = () => {
        var urlSearchParams = new URLSearchParams(window.location.search);

        urlSearchParams.set('font-select', this.selectFamily.value);
        urlSearchParams.set('font-variant', this.selectVariant.value);
        urlSearchParams.set('input-union', String(this.unionCheckbox.checked));
        urlSearchParams.set('input-filled', String(this.filledCheckbox.checked));
        urlSearchParams.set('input-kerning', String(this.kerningCheckbox.checked));
        urlSearchParams.set('input-separate', String(this.separateCheckbox.checked));
        urlSearchParams.set('input-text', this.textInput.value);
        urlSearchParams.set('input-bezier-accuracy', this.bezierAccuracy.value);
        urlSearchParams.set('dxf-units', this.selectUnits.value);
        urlSearchParams.set('input-size', this.sizeInput.value);
        
        const url = window.location.protocol 
                    + "//" + window.location.host 
                    + window.location.pathname 
                    + "?" 
                    + urlSearchParams.toString();

        window.history.replaceState({path: url}, "", url)

        this.copyString(window.location.href)
        this.createLinkButton.innerText = 'copied';
        setTimeout(() => {
            this.createLinkButton.innerText = 'create link';
        }, 2000)
    }
    private copyString = (string: string) => {
        this.dummy.value = string;
        this.dummy.type = 'text';
        this.dummy.select();
        document.execCommand('copy');
        this.dummy.type = 'hidden';
    }
    private readUploadedFile = async (event: Event) => {
        const element = event.currentTarget as HTMLInputElement;

        if (element.files.length === 0) {
          this.customFont = undefined;
        } else {
          var files = element.files[0];

          var buffer = await files.arrayBuffer();

          var font = opentype.parse(buffer);

          this.customFont = font;
        }
        this.renderCurrent();
    }
    private removeUploadedFont = () => {
        this.fileUpload.value = null;
        this.customFont = undefined;
        this.renderCurrent();
    }
    constructor() {

    }

    init() {

        this.fileUpload = this.$('#font-upload') as HTMLInputElement;
        this.fileUploadRemove = this.$('#font-upload-remove') as HTMLInputElement;
        this.selectFamily = this.$('#font-select') as HTMLSelectElement;
        this.selectVariant = this.$('#font-variant') as HTMLSelectElement;
        this.unionCheckbox = this.$('#input-union') as HTMLInputElement;
        this.filledCheckbox = this.$('#input-filled') as HTMLInputElement;
        this.kerningCheckbox = this.$('#input-kerning') as HTMLInputElement;
        this.separateCheckbox = this.$('#input-separate') as HTMLInputElement;
        this.textInput = this.$('#input-text') as HTMLInputElement;
        this.bezierAccuracy = this.$('#input-bezier-accuracy') as HTMLInputElement;
        this.selectUnits = this.$('#dxf-units') as HTMLSelectElement;
        this.sizeInput = this.$('#input-size') as HTMLInputElement;
        this.renderDiv = this.$('#svg-render') as HTMLDivElement;
        this.outputTextarea = this.$('#output-svg') as HTMLTextAreaElement;
        this.downloadButton = this.$("#download-btn") as HTMLAnchorElement;
        this.dxfButton = this.$("#dxf-btn") as HTMLAnchorElement;
        this.createLinkButton = this.$("#create-link") as HTMLAnchorElement;
        this.copyToClipboardBtn = this.$("#copy-to-clipboard-btn") as HTMLButtonElement;
        this.dummy = this.$('#dummy') as HTMLInputElement;

        // Init units select.
        Object.values(makerjs.unitType).forEach(unit => this.addOption(this.selectUnits, unit));
    }

    readQueryParams() {
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

    }

    handleEvents() {
        this.fileUpload.onchange = this.readUploadedFile;
        this.fileUploadRemove.onclick = this.removeUploadedFont
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
            this.renderCurrent
            ;

        this.copyToClipboardBtn.onclick = this.copyToClipboard;
        this.downloadButton.onclick = this.downloadSvg;
        this.dxfButton.onclick = this.downloadDxf;
        this.createLinkButton.onclick = this.updateUrl;
    }

    $(selector: string) {
        return document.querySelector(selector);
    }

    addOption(select: HTMLSelectElement, optionText: string) {
        var option = document.createElement('option');
        option.text = optionText;
        option.value = optionText;
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

            this.readQueryParams();
            this.renderCurrent();
        };
        xhr.send();
    }

    callMakerjs(font: opentype.Font, text: string, size: number, union: boolean, filled: boolean, kerning: boolean, separate: boolean, bezierAccuracy: number, units: string) {
        //generate the text using a font
        var textModel = new makerjs.models.Text(font, text, size, union, false, bezierAccuracy, { kerning });

        if (separate) {
            for (var i in textModel.models) {
                textModel.models[i].layer = i;
            }
        }

        var svg = makerjs.exporter.toSVG(textModel, {fill: filled ? 'black' : undefined});
        var dxf = makerjs.exporter.toDXF(textModel, {units: units, usePOLYLINE: true});

        this.renderDiv.innerHTML = svg;
        this.renderDiv.setAttribute('data-dxf', dxf);
        this.outputTextarea.value = svg;
    }

    render(
        fontIndex: number,
        variantIndex: number,
        text: string,
        size: number,
        union: boolean,
        filled: boolean,
        kerning: boolean,
        separate: boolean,
        bezierAccuracy: number,
        units: string
    ) {
        
        var f = this.fontList.items[fontIndex];
        var v = f.variants[variantIndex];
        var url = f.files[v].substring(5);  //remove http:

        if (this.customFont !== undefined) {
            this.callMakerjs(this.customFont, text, size, union, filled, kerning, separate, bezierAccuracy, units);
        } else {
            opentype.load(url, (err, font) => {
                this.callMakerjs(font, text, size, union, filled, kerning, separate, bezierAccuracy, units);
            });
        }
    }
}

var app = new App();

window.onload = () => {
    app.init();
    app.getGoogleFonts('AIzaSyAOES8EmKhuJEnsn9kS1XKBpxxp-TgN8Jc');
};
