'use strict';

const MyMainTemplatePlugin = require("./MyMainTemplatePlugin");
const MyChunkTemplatePlugin = require("./MyChunkTemplatePlugin");
// const MyHotUpdateChunkTemplatePlugin = require("./MyHotUpdateChunkTemplatePlugin");

module.exports = class MyTemplatePlugin {
  apply(compiler) {
    compiler.plugin("this-compilation", compilation => {
      compilation.mainTemplate.apply(new MyMainTemplatePlugin());
      compilation.chunkTemplate.apply(new MyChunkTemplatePlugin());
      // compilation.hotUpdateChunkTemplate.apply(new MyHotUpdateChunkTemplatePlugin());
    });
  }
};
