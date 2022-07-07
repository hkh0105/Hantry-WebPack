const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { getSourceMap } = require("./utils");

function attachAfterCodeGenerationHook(compiler) {
  if (!compiler.hooks || !compiler.hooks.make) {
    return;
  }

  let sourceMap;
  let bundledSource;

  compiler.hooks.done.tapAsync("HantryPlugin", (stats, callback) => {
    const sourceMapFileName = stats.compilation.outputOptions.sourceMapFilename;
    const bundledSourceFileName = stats.compilation.outputOptions.filename;
    sourceMap = fs.readFileSync(
      path.join(stats.compilation.outputOptions.path, sourceMapFileName),
      "utf8",
    );
    bundledSource = fs.readFileSync(
      path.join(stats.compilation.outputOptions.path, bundledSourceFileName),
      "utf8",
    );
  });
  return { sourceMap, bundledSource };
}

class HantryPlugin {
  constructor(options, dsn) {
    this.options = options;
    this.serverUrl = `http://localhost:8000/users`;
    this.dsn = dsn;
    this.options.ignore = ["node_modules"];
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      "HantryPlugin",
      async (compilation, callback) => {
        if (!compilation.errors.length) {
          return callback();
        }

        const errorCollection = compilation.errors.map(err => {
          let targetError = err.error.stack ? err.error : err;
          return {
            name: targetError.name,
            message: targetError.message.split("\n")[0],
            stack: targetError.stack,
            lineno: targetError.loc && targetError.loc.line,
            colno: targetError.loc && targetError.loc.column,
            filename: err.module.resource,
            duplicate_count: 1,
            created_at: new Date(),
          };
        });

        const errorList = { errorInfo: errorCollection };

        await this.sendErrorApi(this.dsn, errorList);
        callback();
      },
    );
  }

  apply(compiler) {
    const compilerOptions = compiler.options;
    compilerOptions.module =
      typeof compilerOptions.module !== "undefined"
        ? compilerOptions.module
        : factory();

    compiler.hooks.done.tapAsync("HantryPlugin", (stats, callback) => {
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
    });
    // const { sourceMap, bundledSource } =
    //   attachAfterCodeGenerationHook(compiler);
  }

  sendErrorApi(dsn, errorList) {
    return axios
      .post(`${this.serverUrl}/project/${dsn}/error`, errorList)
      .then(res => {
        console.log(res.data);
        console.log("Hantry: error recorded");
      });
  }

  sendSourceMapApi(sourceMap, bundledSource, dsn) {
    return axios
      .post(
        `${this.serverUrl}/project/${dsn}/sourceMap`,
        {
          sourceMap,
          bundledSource,
        },
        {
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        },
      )
      .then(res => {
        console.log(res.data);
        console.log("Hantry: error recorded");
      });
  }
}

module.exports = HantryPlugin;
