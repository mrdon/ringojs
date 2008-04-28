/*
 * The app module can be used to control a web application from javascript.
 * Currently this isn't used by the helma command line server (server.jar),
 * but it can be used to start the application server from the shell using
 * the following command:
 *
 *   importModule('app');
 *   app.start();
 *
 * It takes care of the following things:
 *
 *  - Initializing native host objects
 *  - Setting interceptors or rules to automatically switch optimization
 *      mode on certain requests
 *  - Starting and configuring the web server
 *
 */

// import application and server module
importModuleAs('helma.rhino', 'rhino');
importModuleAs('helma.jetty', 'jetty');

// define native host classes used by helma web apps
rhino.addStandardHostObjects();

// The jetty module uses a jetty xml configuration as blueprint, allowing
// applications to override and add stuff via a config argument to startServer.
//
// Possible properties for the config argument (default values in parentheses):
// configFile ('jetty.xml'),  host (any), port (8080), mountpoint ('/'),
// staticDir (none), staticMountpoint ('/static'),
var jettyConfig = {
    staticDir: 'static'
};

/**
 * Start the jetty server.
 */
function start() {
    // register a request listener that automatically sets rhino optimization
    // level to -1 for requests that have a helma_continuation parameter.
    rhino.addRequestListener('continuation-support', function(req) {
        if (req && req.params.helma_continuation != null) {
            rhino.setRhinoOptimizationLevel(-1);
        }
    });
    // start jetty http server with configuration file modules/helma/jetty.xml
    jetty.startServer(jettyConfig);
}


/**
 * Stop the jetty server.
 */
function stop() {
    // remove request listener
    rhino.removeRequestListener('continuation-support');
    // stop jetty
    jetty.stopServer();
}