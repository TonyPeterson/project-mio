var ProjectMio = window.ProjectMio = window.ProjectMio || {};

var app = {
    json: {},
    controls: {},
    levels: {},
    states: {},
    utils: {},
    scale: function(value) {
        // utility method for scaling assets in case we ever need
        // to support multiple resolutions
        return Math.round(value * 1);
    },
    exports: ProjectMio
};
