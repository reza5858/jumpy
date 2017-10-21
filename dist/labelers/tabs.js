"use strict";
'use babel';
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
function getVisibleColumnRange(editorView) {
    const charWidth = editorView.getDefaultCharacterWidth();
    // FYI: asserts:
    // numberOfVisibleColumns = editorView.getWidth() / charWidth
    const minColumn = (editorView.getScrollLeft() / charWidth) - 1;
    const maxColumn = editorView.getScrollRight() / charWidth;
    return [
        minColumn,
        maxColumn
    ];
}
const labeler = function (env) {
    const positions = [];
    const [minColumn, maxColumn] = getVisibleColumnRange(env.editorView);
    const rows = env.editor.getVisibleRowRange();
    if (!rows) {
        return [];
    }
    const [firstVisibleRow, lastVisibleRow] = rows;
    // TODO: Right now there are issues with lastVisbleRow
    for (const lineNumber of _.range(firstVisibleRow, lastVisibleRow) /*excludes end value*/) {
        const lineContents = env.editor.lineTextForScreenRow(lineNumber);
        if (env.editor.isFoldedAtScreenRow(lineNumber)) {
            if (!env.keys.length) {
                return;
            }
            const keyLabel = env.keys.shift();
            positions.push({ editor: env.editor, lineNumber, column: 0, keyLabel });
        }
        else {
            let word;
            while ((word = env.settings.wordsPattern.exec(lineContents)) != null && env.keys.length) {
                const keyLabel = env.keys.shift();
                const column = word.index;
                // Do not do anything... markers etc.
                // if the columns are out of bounds...
                if (column > minColumn && column < maxColumn) {
                    positions.push({ editor: env.editor, lineNumber, column, keyLabel });
                }
            }
        }
    }
    return positions;
};
exports.default = labeler;
//# sourceMappingURL=tabs.js.map