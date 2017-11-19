(function() {
  if ($ybar in window) {
    return;
  }
  window['$ybar'] = {
    define: function(moduleId, fn) {
      var module = modules[moduleId] = {
        id: moduleId,
        loaded: false,
        exports: {}
      };
      modules[moduleId].call(module.exports, module, module.exports, require);
    },
    require: function(module) {},
    run: function(module) {}
  };
})()
