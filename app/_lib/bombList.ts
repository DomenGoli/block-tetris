export const bombList = [
    // {
    //     name: "grenade",
    //     template: [
    //         [1]
    //     ],
    //     bonus: "uniceni 2 vrstici skupaj"
    // },
    {
        name: "grenade",
        template: [
            [1,0],
            [0,1]
        ],
        capacity: 3,
        bonus: "uniceni v vrstici krizno"
    },
    {
        name: "shell",
        template: [
            [0,1,0],
            [1,0,1]
        ],
        capacity: 3,
        bonus: "unicene 3 vrstice skupaj"
    },
    {
        name: "rocket",
        template: [
            [0,1,0],
            [1,0,1],
            [0,1,0]
        ],
        capacity: 2,
        bonus: "unicene 4 vrstice skupaj"
    },
    {
        name: "cluster",
        template: [
            [1,0,1],
            [0,1,0],
            [1,0,1]
        ],
        capacity: 1,
        bonus: "unicene 3 vrstice skupaj + 1 krizno"
    },
    {
        name: "nuke",
        template: [
            [1,0,1,0,1],
            [0,1,0,1,0],
            [1,0,1,0,1],
            [0,1,0,1,0],
            [1,0,1,0,1],
        ],
        capacity: 1,
        bonus: "unicene 3 vrstice skupaj + 2 krizno"
    },

]


// if (y === 0) {
//                         if (x === 0) return isShapeBlock(0, 0, y, x);
//                         if (x === 1) return isShapeBlock(0, 1, y, x);
//                         if (x === 2) return isShapeBlock(0, 2, y, x);
//                         if (x === 3) return isShapeBlock(0, 3, y, x);
//                         if (x === 4) return isShapeBlock(0, 4, y, x);
//                         else return isCommitedBoardOccupied(y, x);
//                     }
//                     if (y === 1) {
//                         if (x === 0) return isShapeBlock(1, 0, y, x);
//                         if (x === 1) return isShapeBlock(1, 1, y, x);
//                         if (x === 2) return isShapeBlock(1, 2, y, x);
//                         if (x === 3) return isShapeBlock(1, 3, y, x);
//                         if (x === 4) return isShapeBlock(1, 4, y, x);
//                         else return isCommitedBoardOccupied(y, x);
//                     }
//                     if (y === 2) {
//                         if (x === 0) return isShapeBlock(2, 0, y, x);
//                         if (x === 1) return isShapeBlock(2, 1, y, x);
//                         if (x === 2) return isShapeBlock(2, 2, y, x);
//                         if (x === 3) return isShapeBlock(2, 3, y, x);
//                         if (x === 4) return isShapeBlock(2, 4, y, x);
//                         else return isCommitedBoardOccupied(y, x);
//                     }
//                     if (y === 3) {
//                         if (x === 0) return isShapeBlock(3, 0, y, x);
//                         if (x === 1) return isShapeBlock(3, 1, y, x);
//                         if (x === 2) return isShapeBlock(3, 2, y, x);
//                         if (x === 3) return isShapeBlock(3, 3, y, x);
//                         if (x === 4) return isShapeBlock(3, 4, y, x);
//                         else return isCommitedBoardOccupied(y, x);
//                     }
//                     if (y === 4) {
//                         if (x === 0) return isShapeBlock(4, 0, y, x);
//                         if (x === 1) return isShapeBlock(4, 1, y, x);
//                         if (x === 2) return isShapeBlock(4, 2, y, x);
//                         if (x === 3) return isShapeBlock(4, 3, y, x);
//                         if (x === 4) return isShapeBlock(4, 4, y, x);
//                         else return isCommitedBoardOccupied(y, x);
//                     }