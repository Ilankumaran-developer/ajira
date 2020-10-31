const NetworkRouteHandler = require('./network-route-handler')

module.exports = (dependencies) => {
    return {
    network : new NetworkRouteHandler(dependencies)
    }
}