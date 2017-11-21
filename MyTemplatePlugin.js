/**
 * A plugin for webpack consists of:
 *
 * - A named JavaScript function.
 * - Defines the apply() method in it's prototype.
 * - Specifies webpack's event hook to attach itself.
 * - Manipulates webpack internal instance specific data.
 * - Invokes webpack provided callback after functionality is complete.
 */
'use strict';

const MyMainTemplatePlugin = require("./MyMainTemplatePlugin");
const MyChunkTemplatePlugin = require("./MyChunkTemplatePlugin");
// const MyHotUpdateChunkTemplatePlugin = require("./MyHotUpdateChunkTemplatePlugin");

/**
 * Plugins are instantiated objects with an apply() method on their prototype.
 * This apply() method is called once by the webpack compiler while installing
 * the plugin.  The apply() method is given a reference to the underlying
 * webpack compiler, which grants access to compiler callbacks.
 */
module.exports = class MyTemplatePlugin {
  apply(compiler) {
    compiler.plugin("this-compilation", compilation => {
      compilation.mainTemplate.apply(new MyMainTemplatePlugin());
      compilation.chunkTemplate.apply(new MyChunkTemplatePlugin());
      // compilation.hotUpdateChunkTemplate.apply(new MyHotUpdateChunkTemplatePlugin());
    });
  }
};
