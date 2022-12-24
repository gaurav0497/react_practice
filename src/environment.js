const RELEASE_VERSION = "1.0.0";

var _Environments = {
    staging: {
        env: "staging",
        USER_URL: "https://nodeapi-evwz.onrender.com",
        LOGS: true,
        RELEASE: RELEASE_VERSION,
    },
    development: {
        env: "development",
        USER_URL: "https://nodeapi-evwz.onrender.com",
        LOGS: true,
        RELEASE: RELEASE_VERSION,
    },
    local: {
        env: "localhost",
        USER_URL: "https://nodeapi-evwz.onrender.com",
        LOGS: true,
        RELEASE: RELEASE_VERSION,
    },
    production: {
        env: "production",
        USER_URL: "https://nodeapi-evwz.onrender.com",
        LOGS: true,
        RELEASE: RELEASE_VERSION,
    },
};

function getEnvironment() {
    var env = "development";
    if (window.location.href.includes("localhost")) {
        env = "local";
    } else if (window.location.href.includes("development")) {
        env = "development";
    } else if (window.location.href.includes("staging")) {
        env = "staging";
    } else {
        env = "production";
    }
    return _Environments[env];
}
var Environment = getEnvironment();
module.exports = Environment;
