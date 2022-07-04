const axios = require("axios");

class HantryPlugin {
  constructor(options) {
    this.options = options;
    this.serverUrl = `http://localhost:8080/users`;
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

        await this.sendErrorApi(this.options.projectToken, errorList);
        callback();
      },
    );
  }

  sendErrorApi(projectToken, errorList) {
    return axios
      .post(`${this.serverUrl}/project/${projectToken}/error`, errorList)
      .then(res => {
        console.log(res.data);
        console.log("Hantry: error recorded");
      });
  }
}

module.exports = HantryPlugin;
