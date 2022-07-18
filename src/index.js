const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { getSourceMap, parseErrorStack } = require("./utils");

function sendErrorApi(dsn, error) {
  return axios
    .post(`http://localhost:8000/users/project/${dsn}/error`, error)
    .then(res => {
      console.log("Hantry: error recorded");
    });
}

function getError(compiler, dsn) {
  compiler.hooks.emit.tap("HantryPlugin", (compilation, callback) => {
    console.log("first");
    if (!compilation.errors.length) {
      return;
    }

    const errorCollection = compilation.errors.map(err => {
      let targetError = err.error.stack ? err.error : err;
      const stack = parseErrorStack(targetError.stack.split("\n"));
      return {
        type: targetError.name,
        message: targetError.message.split("\n")[0],
        stack: targetError.stack.split("\n"),
        location: {
          lineno: targetError.loc && targetError.loc.line,
          colno: targetError.loc && targetError.loc.column,
        },
        source: err.module.resource,
        created_at: new Date(),
      };
    });
    errorCollection.map(error => {
      return sendErrorApi(dsn, error);
    });
  });
}

class HantryPlugin {
  constructor(options, dsn) {
    this.options = options;
    this.serverUrl = `http://localhost:8000/users`;
    this.dsn = dsn;
  }

  apply(compiler) {
    const compilerOptions = compiler.options;
    compilerOptions.module =
      typeof compilerOptions.module !== "undefined"
        ? compilerOptions.module
        : factory();
    getError(compiler, this.dsn);

    compiler.hooks.done.tapAsync("HantryPlugin", (stats, callback) => {
      console.log("second");
      const sourceMapFileName =
        stats.compilation.outputOptions.sourceMapFilename;
      const bundledSourceFileName = stats.compilation.outputOptions.filename;
      const sourceMap = fs.readFileSync(
        path.join(stats.compilation.outputOptions.path, sourceMapFileName),
        "utf8",
      );
      const bundledSource = fs.readFileSync(
        path.join(stats.compilation.outputOptions.path, bundledSourceFileName),
        "utf8",
      );

      this.sendSourceMapApi(sourceMap, bundledSource, this.dsn);
      callback();
    });
  }

  sendSourceMapApi(sourceMap, bundledSource, dsn) {
    return axios
      .post(`${this.serverUrl}/project/${dsn}/sourceMap`, {
        sourceMap,
        bundledSource,
      })
      .then(res => {
        console.log("Hantry: error recorded");
      });
  }
}

module.exports = HantryPlugin;
