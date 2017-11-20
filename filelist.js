module.exports = class FileListPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.plugin('emit', function(compilation, notify) {
      // Create a header string for the generated file
      let filelist = ['In this build:\n'];

      // Loop through all compiled assets, adding a new line item for each
      // file
      for (const filename in compilation.assets) {
        filelist.push(`-  ${filename}`);
      }

      // Insert this list into the webpack build as a new file asset
      compilation.assets['filelist.md'] = {
        source() { return filelist.join('\n'); },
        size()   { return filelist.length; }
      };
      notify();
    });
  }
};
