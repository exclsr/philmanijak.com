// force-https.js
//
// Express middleware to redirect from http:// to https://
//
module.exports = function (httpsServer) {
    return function (req, res, next) {
        // Don't do anything if we can't do anything.
        if (!httpsServer) {
            return next();
        }

        // Don't do anything if we're already https 
        // or if we're localhost.
        if(req.secure 
            || req.headers['x-forwarded-proto'] === 'https' 
            || req.hostname === "localhost") {
            return next();  
        }

        res.redirect('https://' + req.get('Host') + req.url);
    }; 
};