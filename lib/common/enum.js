module.exports = {
    "errors":{
        "invalidBody" : {"message":"Invalid body Format"},
        "invalidCommand": {"message":"Invalid command is provided"},
        "sourceordestinationNotFound" : {"message":"Source or destination not found in network"},
        "invalidModification" : {"message": "The device you are trying to add strength either not found or a repeater. please try to update strength for a valid device"},
        "invalidStrength" : {"message" : "The strength you are trying to update is invalid"},
        "invalidDevices" : {"message":"The route you are trying to fetch for the deivces are not available in our network. please provide valid devices"},
        "invalidSourceOrDestination" : {"message": "The source or the destination you are trying to find the route cannot be REPEATER"},
        "routeNotFound" : {"message" : "The route you are trying to find between two devices does not exist"}
    },
    "type":{
        "COMPUTER" : "COMPUTER",
        "REPEATER" : "REPEATER"
    },
    "message":{
        "Welcome" : "Welcome to Ajira network"
    }
}