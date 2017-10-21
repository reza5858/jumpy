export interface LabelEnvironment {
    editor: any,
    editorView: any,
    keys: Array<string>,
    settings: any
}

export interface Labeler {
    (environment:LabelEnvironment):Array<any>;
}
