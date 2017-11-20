module.exports = class YbarPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    // The main compilation instance all subsequent methods are derived from
    // compilation.plugin
    compiler.plugin("compilation", compilation => {
      // This is where all the modules are loaded one by one, no dependencies
      // are created yet
      compilation.plugin('normal-module-loader', (loaderContext, module) => {
      });

      // You are not accepting any more modules.  No arguments
      compilation.plugin('seal', () => {
      });

      // webpack is begining the optimization phase.  No arguments
      compilation.plugin('optimize', () => {
      });

      // Async optimization of the tree
      compilation.plugin('optimize-tree', (chunks, modules) => {
      });

      // Handle to the modules array during tree optimization
      compilation.plugin('optimize-modules', modules => {
      });

      // Optimize chunks may be run several times in a compilation
      compilation.plugin('optimize-chunks', chunks => {
        // Unless you've specified multiple entries in your config, there's only
        // one chunk at this point
        chunks.forEach(chunk => {
            // Chunks have circular references to their modules
            chunk.modules.forEach(module => {
                // module.loaders, module.rawRequest, module.dependencies, etc.
            });
        });
      });

      // Create additional assets for the compilation
      compilation.plugin('additional-assets', callback => {
        download('https://img.shields.io/npm/v/webpack.svg', response => {
          if (response.status === 200) {
            compilation.assets['webpack-version.svg'] = toAsset(response);
            callback();
          } else {
            callback(new Error('[webpack-example-plugin] Unable to download the image'));
          }
        })
      });

      // Optimize the assets for the chunks.
      // The assets are stored in this.assets, but not all of them are chunk
      // assets.  A Chunk has a property files which points to all files created
      // by this chunk.  The additional chunk assets are stored in
      // this.additionalChunkAssets.
      //
      // Here's an example that simply adds a banner to each chunk.
      compilation.plugin("optimize-chunk-assets", (chunks, callback) => {
        chunks.forEach(chunk => {
          chunk.files.forEach(file => {
            compilation.assets[file] =
                new ConcatSource("\/**Sweet Banner**\/", "\n", compilation.assets[file]);
          });
        });
        callback();
      });

      // Before a module build has started
      compilation.plugin('build-module', module => {
        console.log('About to build: ', module);
      });


      // A module has been built successfully
      compilation.plugin('succeed-module', module => {
        console.log('Successfully built: ', module);
      });

      // The module build has failed
      compilation.plugin('failed-module', module => {
        console.log('Failed to build: ', module);
      });
    });
  }
};
