export const shapesList = [
    {   
        name: "block4",
        id: 1,
        weight: 0.5,
        directions: [
            {
                name: "block4",
                id: 1,
                template: [
                    [1, 1],
                    [1, 1],
                ],
            },
        ],
    },

    {   name: "block9",
        weight: 0.5,
        id: 2,
        directions: [
            {
                name: "block9",
                id: 2,
                template: [
                    [1, 1, 1],
                    [1, 1, 1],
                    [1, 1, 1],
                ],
            },
        ],
    },

    {   name: "i2",
        id: 3,
        weight: 0.5,
        directions: [
            {
                name: "i2-vertical",
                id: 3,
                template: [[1], [1]],
            },
            {
                name: "i2-horizontal",
                template: [[1, 1]],
            },
        ],
    },
    
    {
        name: "i3",
        weight: 0.5,
        directions: [
            {
                name: "i3-vertical",
                template: [[1], [1], [1]],
            },
            {
                name: "i3-horizontal",
                template: [[1, 1, 1]],
            },
        ],
    },

    {
        name: "i4",
        weight: 0.5,
        directions: [
            {
                name: "i4-vertical",
                template: [[1], [1], [1], [1]],
            },
            {
                name: "i4-horizontal",
                template: [[1, 1, 1, 1]],
            },
        ],
    },

    {
        name: "i5",
        weight: 0.5,
        directions: [
            {
                name: "i5-vertical",
                template: [[1], [1], [1], [1], [1]],
            },
            {
                name: "i5-horizontal",
                template: [[1, 1, 1, 1, 1]],
            },
        ],
    },

    {   
        name: "S",
        weight: 0.5,
        directions: [
            {
                name: "S-horizontal",
                template: [
                    [0, 1, 1],
                    [1, 1, 0],
                ],
            },
            {
                name: "S-vertical",
                template: [
                    [1, 0],
                    [1, 1],
                    [0, 1],
                ],
            },
        ],
    },

    {
        name: "Z",
        weight: 0.5,
        directions: [
            {
                name: "Z-horizontal",
                template: [
                    [1, 1, 0],
                    [0, 1, 1],
                ],
            },
            {
                name: "Z-vertical",
                template: [
                    [0, 1],
                    [1, 1],
                    [1, 0],
                ],
            },
        ],
    },

    {
        name: "L",
        weight: 0.5,
        directions: [
            {
                name: "L-00",
                template: [
                    [1, 0],
                    [1, 0],
                    [1, 1],
                ],
            },
            {
                name: "L-90",
                template: [
                    [1, 1, 1],
                    [1, 0, 0],
                ],
            },
            {
                name: "L-180",
                template: [
                    [1, 1],
                    [0, 1],
                    [0, 1],
                ],
            },
            {
                name: "L-270",
                template: [
                    [0, 0, 1],
                    [1, 1, 1],
                ],
            },
        ],
    },

    {
        name: "Lsec",
        weight: 0.5,
        directions: [
            {
                name: "Lsec-00",
                template: [
                    [0, 1],
                    [0, 1],
                    [1, 1],
                ],
            },
            {
                name: "Lsec-180",
                template: [
                    [1, 1],
                    [1, 0],
                    [1, 0],
                ],
            },
            {
                name: "Lsec-270",
                template: [
                    [1, 1, 1],
                    [0, 0, 1],
                ],
            },
            {
                name: "Lsec-90",
                template: [
                    [1, 0, 0],
                    [1, 1, 1],
                ],
            },
        ],
    },

    {
        name: "block3",
        weight: 0.5,
        directions: [
            {
                name: "block3-00",
                template: [
                    [1, 0],
                    [1, 1],
                ],
            },
            {
                name: "block3-90",
                template: [
                    [1, 1],
                    [1, 0],
                ],
            },
            {
                name: "block3-180",
                template: [
                    [1, 1],
                    [0, 1],
                ],
            },
            {
                name: "block3-270",
                template: [
                    [0, 1],
                    [1, 1],
                ],
            },
        ],
    },

    {
        name: "K",
        weight: 0.5,
        directions: [
            {
                name: "K-right",
                template: [
                    [1, 0],
                    [1, 1],
                    [1, 0],
                ],
            },
            {
                name: "K-left",
                template: [
                    [0, 1],
                    [1, 1],
                    [0, 1],
                ],
            },
            {
                name: "K-down",
                template: [
                    [1, 1, 1],
                    [0, 1, 0],
                ],
            },
            {
                name: "K-up",
                template: [
                    [0, 1, 0],
                    [1, 1, 1],
                ],
            },
        ],
    },

    {   
        name: "Lbig",
        weight: 0.5,
        directions: [
            {
                name: "big-00",
                template: [
                    [0, 0, 1],
                    [0, 0, 1],
                    [1, 1, 1],
                ],
            },
            {
                name: "Lbig-90",
                template: [
                    [1, 0, 0],
                    [1, 0, 0],
                    [1, 1, 1],
                ],
            },
            {
                name: "Lbig-180",
                template: [
                    [1, 1, 1],
                    [1, 0, 0],
                    [1, 0, 0],
                ],
            },
            {
                name: "Lbig-270",
                template: [
                    [1, 1, 1],
                    [0, 0, 1],
                    [0, 0, 1],
                ],
            },
        ],
    },

    {   
        name: "block6",
        weight: 0.5,
        directions: [
            {
                name: "block6-vertical",
                template: [
                    [1, 1],
                    [1, 1],
                    [1, 1],
                ],
            },
            {
                name: "block6-horizontal",
                template: [
                    [1, 1, 1],
                    [1, 1, 1],
                ],
            },
        ],
    },
    {
        name: "dot",
        directions: [
            {
                name: "dot",
                template: [
                    [1]
                ]
            }
        ]
    },
    {
        name: "diagonal",
        directions: [
            {
                name: "diagonal-0",
                template: [
                    [1, 0, 0],
                    [0, 1, 0],
                    [0, 0, 1],
                ]
            },
            {
                name: "diagonal-90",
                template: [
                    [0, 0, 1],
                    [0, 1, 0],
                    [1, 0, 0],
                ]
            },
        ]
    }
];
