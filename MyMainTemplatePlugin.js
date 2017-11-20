// require function shortcuts:
//
// __webpack_require__.s = the module id of the entry point
// __webpack_require__.c = the module cache
// __webpack_require__.m = the module functions
// __webpack_require__.p = the bundle public path
// __webpack_require__.i = the identity function used for harmony imports
// __webpack_require__.e = the chunk ensure function
// __webpack_require__.d = the exported propery define getter function
// __webpack_require__.o = Object.prototype.hasOwnProperty.call
// __webpack_require__.n = compatibility get default export
// __webpack_require__.h = the webpack hash
// __webpack_require__.oe = the uncatched error handler for the webpack runtime
// __webpack_require__.nc = the script nonce

module.exports = class MyMainTemplatePlugin {
  apply(mainTemplate) {
    // mainTemplate.plugin('render', (bootstrapSource, chunk, hash, moduleTemplate, dependencyTemplates) => {
    //   const source = new ConcatSource();
    //   return `(function(modules) {     // webpackBootstrap\n${bootstrapSource.source()}\n})`;
    //   source.add("(function(modules) {     // webpackBootstrap\n");
    //   source.add(bootstrapSource);
    //   source.add("})\n");
    //   source.add("/************************************************************************/\n");
    //   source.add("/******/ (");
    //   const modules = this.renderChunkModules(chunk, moduleTemplate, dependencyTemplates, "/******/ ");
    //   source.add(this.applyPluginsWaterfall("modules", modules, chunk, hash, moduleTemplate, dependencyTemplates));
    //   source.add(")");
    //   return source;
    // });

    mainTemplate.plugin("bootstrap", (source, chunk, hash) => {
      return 'hello';
    });

    // mainTemplate.plugin("hot-bootstrap", (source, chunk, hash) => {
    // });

    // mainTemplate.plugin("modules", (source, chunk, hash) => {
    // });

    mainTemplate.plugin("local-vars", (source, chunk) => {
      console.log(`source: ${source}`);
      // return '//////////////// foo bar foo bar foo bar foo bar ///////////////';
    });

    // mainTemplate.plugin("require", (source, chunk, hash) => {
    //   console.log(source, chunk, hash);
    // });

    // mainTemplate.plugin("module-obj", (source, chunk, hash, varModuleId) => {
    //   console.log(source, chunk, hash);
    // });

    // mainTemplate.plugin("require-extensions", (source, chunk, hash) => {
    // });

    // mainTemplate.plugin("require-ensure", (source, chunk, hash) => {
    //   console.log(source, chunk, hash);
    // });

    // mainTemplate.plugin("render-with-entry", (source, chunk, hash) => {
    //   console.log(source, chunk, hash);
    // });

    mainTemplate.plugin('startup', (source, module, hash) => {
      if (!module.chunks.length && source.indexOf('__ReactStyle__') === -1) {
        const originName = module.origins && module.origins.length ? module.origins[0].name : 'main';
        return [
          'if (typeof window !== "undefined") {',
          '  window.__ReactStyle__ = ' + JSON.stringify(classNames[originName]) + ';',
          '}'
        ].join('\n') + source;
      }
      return source;
    });

    // mainTemplate.plugin("module-require", (requireFn, chunk, hash, varModuleId) => {
    //   console.log(source, chunk, hash);
    // });

    // mainTemplate.plugin("add-module", (source, chunk, hash, varModuleId, varModule) => {
    //   console.log(source, chunk, hash);
    // });

    // mainTemplate.plugin("current-hash", (hash, length) => {
    //   console.log(source, chunk, hash);
    // });

    // mainTemplate.plugin("asset-path", (path, options) => {
    //   console.log(source, chunk, hash);
    // });

    // mainTemplate.plugin("hash", hash => {
    //   console.log(source, chunk, hash);
    // });

    // mainTemplate.plugin("hash-for-chunk", (hash, chunk) => {
    //   console.log(source, chunk, hash);
    // });

    // mainTemplate.plugin("global-hash", (chunk, paths) => {
    //   console.log(source, chunk, hash);
    // });
  }
};
