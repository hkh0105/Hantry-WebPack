const fs = require("fs");
const path = require("path");

function getSourceMap(compiler) {
  if (!compiler.hooks || !compiler.hooks.make) {
    return;
  }

  compiler.hooks.done.tapAsync("HantryPlugin", (stats, callback) => {
    const sourceMapFileName = stats.compilation.outputOptions.sourceMapFilename;
    const bundledSourceFileName = stats.compilation.outputOptions.filename;
    const sourceMap = fs.readFileSync(
      path.join(stats.compilation.outputOptions.path, sourceMapFileName),
      "utf8",
    );
    const bundledSource = fs.readFileSync(
      path.join(stats.compilation.outputOptions.path, bundledSourceFileName),
      "utf8",
    );

    return { sourceMap, bundledSource };
  });
}

module.exports = { getSourceMap };
