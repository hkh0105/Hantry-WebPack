const axios = require("axios");

class HantryPlugin {
  constructor(options, name, dsn) {
    this.options = options;
    this.name = name;
    this.serverUrl = `http://localhost:8000/users`;
    this.dsn = dsn;
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
    compiler.hooks.afterEmit.tapAsync("HantryPlugin", async compilation => {
      console.log(this.name);
      if (compilation.emittedAssets.has(`${this.name}.js.map`)) {
        const sourceMap = fs.readFileSync(
          `./dist/${this.name}.js.map`,
          "utf-8",
        );
        const source = fs.readFileSync(`./dist/${this.name}.js`, "utf-8");
        sendSourceMapApi(source, source, this.dsn);
      }
    });
  }

  sendErrorApi(dsn, errorList) {
    return axios
      .post(`${this.serverUrl}/project/${dsn}/error`, errorList)
      .then(res => {
        console.log(res.data);
        console.log("Hantry: error recorded");
      });
  }

  sendSourceMapApi(sourceMap, source, dsn) {
    console.log(sourceMap, source);
    return axios
      .post(`${this.serverUrl}/project/${dsn}/sourceMap`, {
        sourceMap,
        source,
      })
      .then(res => {
        console.log(res.data);
        console.log("Hantry: error recorded");
      });
  }
}

module.exports = HantryPlugin;
