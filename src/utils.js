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

function parseErrorStack(stackList) {
  return stackList.map(function (line) {
    if (line.indexOf("(eval ") > -1) {
      line = line
        .replace(/eval code/g, "eval")
        .replace(/(\(eval at [^()]*)|(,.*$)/g, "");
    }
    let sanitizedLine = line
      .replace(/^\s+/, "")
      .replace(/\(eval code/g, "(")
      .replace(/^.*?\s+/, "");

    const location = sanitizedLine.match(/ (\(.+\)$)/);

    sanitizedLine = location
      ? sanitizedLine.replace(location[0], "")
      : sanitizedLine;

    const locationParts = extractLocation(
      location ? location[1] : sanitizedLine,
    );
    const functionName = (location && sanitizedLine) || undefined;
    const fileName =
      ["eval", "<anonymous>"].indexOf(locationParts[0]) > -1
        ? undefined
        : locationParts[0];
    console.log(
      "paesed",
      "functionName",
      functionName,
      "fileName",
      fileName,
      "line",
      locationParts[1],
      "col",
      locationParts[2],
      "souece",
      line,
    );
    return {
      functionName: functionName,
      fileName: fileName,
      lineNumber: locationParts[1],
      columnNumber: locationParts[2],
      source: line,
    };
  }, this);
}

function extractLocation(urlLike) {
  if (urlLike.indexOf(":") === -1) {
    return [urlLike];
  }

  const regExp = /(.+?)(?::(\d+))?(?::(\d+))?$/;
  const parts = regExp.exec(urlLike.replace(/[()]/g, ""));
  return [parts[1], parts[2] || undefined, parts[3] || undefined];
}

module.exports = { getSourceMap, parseErrorStack };
