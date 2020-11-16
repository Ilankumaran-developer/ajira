module.exports = {
    "A1": {
        "name": "A1",
        "type": "COMPUTER",
        "strength": 5,
        "messages": [],
        "adj": [
            "A2",
            "A3"
        ]
    },
    "A2": {
        "name": "A2",
        "type": "COMPUTER",
        "strength": 5,
        "messages": [],
        "adj": [
            "A1",
            "A10"
        ]
    },
    "A3": {
        "name": "A3",
        "type": "BRIDGE",
        "strength": 5,
        "messages": [],
        "adj": [
            "A1",
            "A4"
        ],
        "bridgeOp": "UPPER"
    },
    "A4": {
        "name": "A4",
        "type": "COMPUTER",
        "strength": 5,
        "messages": [],
        "adj": [
            "A3",
            "R1"
        ]
    },
    "R1": {
        "name": "R1",
        "type": "REPEATER",
        "strength": 5,
        "messages": [],
        "adj": [
            "A4",
            "A5"
        ]
    },
    "A5": {
        "name": "A5",
        "type": "COMPUTER",
        "strength": 5,
        "messages": [],
        "adj": [
            "R1"
        ]
    }, "A10": {
        "name": "A10",
        "type": "COMPUTER",
        "strength": 5,
        "messages": [],
        "adj": [
            "A2",
            "A11"
        ]
    },
    "A11": {
        "name": "A11",
        "type": "COMPUTER",
        "strength": 5,
        "messages": [],
        "adj": [
            "A10",
            "A12"
        ]
    },
    "A12": {
        "name": "A12",
        "type": "COMPUTER",
        "strength": 5,
        "messages": [],
        "adj": [
            "A11",
            "A13"
        ]
    },
    "A13": {
        "name": "A13",
        "type": "BRIDGE",
        "strength": 5,
        "messages": [],
        "adj": [
            "A12",
            "A14"
        ],
        "bridgeOp": "UPPER"
    },
    "A14": {
        "name": "A14",
        "type": "BRIDGE",
        "strength": 5,
        "messages": [
            {
                "from": "A1",
                "to": "A14",
                "message": "HELLO"
            }
        ],
        "adj": [
            "A13",
            "A15"
        ],
        "bridgeOp": "LOWER"
    },
    "A15": {
        "name": "A15",
        "type": "COMPUTER",
        "strength": 5,
        "messages": [
            {
                "from": "A1",
                "to": "A15",
                "message": "HELLO"
            }
        ],
        "adj": [
            "A14"
        ]
    }
}