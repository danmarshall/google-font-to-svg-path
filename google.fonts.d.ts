declare namespace google.fonts {

    export interface WebfontList {
        kind: string;
        items: WebfontFamily[];
    }

    export interface WebfontFamily {
        category?: string;
        kind: string;
        family: string;
        subsets: string[];
        variants: string[];
        version: string;
        lastModified: string;
        files: WebfontFamilyFiles;
    }

    export interface WebfontFamilyFiles {
        [variant: string]: string;
    }
}
