exports.task03 = countTrees;

function countTrees(text, slope) {
    const grid = gridOf(text);
    return grid.countTrees(slope);
}

function countTreesForSlope(text, slope) {
}

function gridOf(text) {
    const rows = text.split("\n")
        .map(line => line.trim());
    return new Grid(rows);
}

class Grid {
    constructor(rows) {
        this.rows = rows
    }

    isTree(rowIndex, colIndex) {
        const col = this.rows[rowIndex];
        return col[colIndex % col.length] === "#";
    }

    countTrees(slope){
        let col = slope.right;
        let treeCount = 0;
        for (let row = slope.down; row < this.rows.length; row += slope.down){
            if(this.isTree(row, col))
                treeCount++;
            col += slope.right;
        }
        return treeCount;
    }
}