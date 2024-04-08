const request = require("request");
const { client_id, client_secret } = require("../config");

exports.getCompiler = (req, res, next) => {
  res.send('<h1 align="center">Sorry, Only Post method allowed</h1>');
};

exports.postJavaCompiler = (req, res, next) => {
  const code = req.body.code;
  const input = req.body.input;
  const version = req.body.version;
  console.log(code);

  var program = {
    script: code,
    stdin: input,
    language: "java",
    versionIndex: version,
    clientId: client_id,
    clientSecret: client_secret,
  };
  try {
    request(
      {
        url: "https://api.jdoodle.com/v1/execute",
        method: "POST",
        json: program,
      },
      (error, response, body) => {
        if (error === null) {
          console.log(body);
          return res.status(200).send(body);
        }
        res.status(400).send(error);
      }
    );
  } catch (e) {}
};

exports.postCCompiler = (req, res, next) => {
  const code = req.body.code;
  const input = req.body.input;
  const version = req.body.version;
  console.log(code);

  var program = {
    script: code,
    stdin: input,
    language: "c",
    versionIndex: version,
    clientId: client_id,
    clientSecret: client_secret,
  };
  try {
    request(
      {
        url: "https://api.jdoodle.com/v1/execute",
        method: "POST",
        json: program,
      },
      (error, response, body) => {
        if (error === null) {
          console.log(body);
          return res.send(body);
        }
        res.send(error);
      }
    );
  } catch (e) {}
};

exports.postCppCompiler = (req, res, next) => {
  const code = req.body.code;
  const input = req.body.input;
  const version = req.body.version;
  console.log(code);

  var program = {
    script: code,
    stdin: input,
    language: "cpp",
    versionIndex: version,
    clientId: client_id,
    clientSecret: client_secret,
  };
  try {
    request(
      {
        url: "https://api.jdoodle.com/v1/execute",
        method: "POST",
        json: program,
      },
      (error, response, body) => {
        if (error === null) {
          console.log(body);
          return res.send(body);
        }
        res.send(error);
      }
    );
  } catch (e) {}
};

exports.postPythonThreeCompiler = (req, res, next) => {
  const code = req.body.code;
  const input = req.body.input;
  const version = req.body.version;
  console.log(code);

  var program = {
    script: code,
    stdin: input,
    language: "python3",
    versionIndex: version,
    clientId: client_id,
    clientSecret: client_secret,
  };
  try {
    request(
      {
        url: "https://api.jdoodle.com/v1/execute",
        method: "POST",
        json: program,
      },
      (error, response, body) => {
        if (error === null) {
          console.log(body);
          return res.send(body);
        }
        res.send(error);
      }
    );
  } catch (e) {}
};

exports.postPythonTwoCompiler = (req, res, next) => {
  const code = req.body.code;
  const input = req.body.input;
  const version = req.body.version;
  console.log(code);

  var program = {
    script: code,
    stdin: input,
    language: "python2",
    versionIndex: version,
    clientId: client_id,
    clientSecret: client_secret,
  };
  try {
    request(
      {
        url: "https://api.jdoodle.com/v1/execute",
        method: "POST",
        json: program,
      },
      (error, response, body) => {
        if (error === null) {
          console.log(body);
          return res.send(body);
        }
        res.send(error);
      }
    );
  } catch (e) {}
};

exports.postRubyCompiler = (req, res, next) => {
  const code = req.body.code;
  const input = req.body.input;
  const version = req.body.version;
  console.log(code);

  var program = {
    script: code,
    stdin: input,
    language: "ruby",
    versionIndex: version,
    clientId: client_id,
    clientSecret: client_secret,
  };
  try {
    request(
      {
        url: "https://api.jdoodle.com/v1/execute",
        method: "POST",
        json: program,
      },
      (error, response, body) => {
        if (error === null) {
          console.log(body);
          return res.send(body);
        }
        res.send(error);
      }
    );
  } catch (e) {}
};

exports.postCSharpCompiler = (req, res, next) => {
  const code = req.body.code;
  const input = req.body.input;
  const version = req.body.version;
  console.log(code);

  var program = {
    script: code,
    stdin: input,
    language: "csharp",
    versionIndex: version,
    clientId: client_id,
    clientSecret: client_secret,
  };
  try {
    request(
      {
        url: "https://api.jdoodle.com/v1/execute",
        method: "POST",
        json: program,
      },
      (error, response, body) => {
        if (error === null) {
          console.log(body);
          return res.send(body);
        }
        res.send(error);
      }
    );
  } catch (e) {}
};

exports.postObjectiveCCompiler = (req, res, next) => {
  const code = req.body.code;
  const input = req.body.input;
  const version = req.body.version;
  console.log(code);

  var program = {
    script: code,
    stdin: input,
    language: "objc",
    versionIndex: version,
    clientId: client_id,
    clientSecret: client_secret,
  };
  try {
    request(
      {
        url: "https://api.jdoodle.com/v1/execute",
        method: "POST",
        json: program,
      },
      (error, response, body) => {
        if (error === null) {
          console.log(body);
          return res.send(body);
        }
        res.send(error);
      }
    );
  } catch (e) {}
};
exports.postFortranCompiler = (req, res, next) => {
  const code = req.body.code;
  const input = req.body.input;
  const version = req.body.version;
  console.log(code);

  var program = {
    script: code,
    stdin: input,
    language: "fortran",
    versionIndex: version,
    clientId: client_id,
    clientSecret: client_secret,
  };
  try {
    request(
      {
        url: "https://api.jdoodle.com/v1/execute",
        method: "POST",
        json: program,
      },
      (error, response, body) => {
        if (error === null) {
          console.log(body);
          return res.send(body);
        }
        res.send(error);
      }
    );
  } catch (e) {}
};
exports.postDartCompiler = (req, res, next) => {
  const code = req.body.code;
  const input = req.body.input;
  const version = req.body.version;
  console.log(code);

  var program = {
    script: code,
    stdin: input,
    language: "dart",
    versionIndex: version,
    clientId: client_id,
    clientSecret: client_secret,
  };
  try {
    request(
      {
        url: "https://api.jdoodle.com/v1/execute",
        method: "POST",
        json: program,
      },
      (error, response, body) => {
        if (error === null) {
          console.log(body);
          return res.send(body);
        }
        res.send(error);
      }
    );
  } catch (e) {}
};

exports.postNodejsCompiler = (req, res, next) => {
  const code = req.body.code;
  const input = req.body.input;
  const version = req.body.version;
  console.log(code);

  var program = {
    script: code,
    stdin: input,
    language: "nodejs",
    versionIndex: version,
    clientId: client_id,
    clientSecret: client_secret,
  };
  try {
    request(
      {
        url: "https://api.jdoodle.com/v1/execute",
        method: "POST",
        json: program,
      },
      (error, response, body) => {
        if (error === null) {
          console.log(body);
          return res.send(body);
        }
        res.send(error);
      }
    );
  } catch (e) {}
};

exports.postCobolCompiler = (req, res, next) => {
  const code = req.body.code;
  const input = req.body.input;
  const version = req.body.version;
  console.log(code);

  var program = {
    script: code,
    stdin: input,
    language: "cobol",
    versionIndex: version,
    clientId: client_id,
    clientSecret: client_secret,
  };
  try {
    request(
      {
        url: "https://api.jdoodle.com/v1/execute",
        method: "POST",
        json: program,
      },
      (error, response, body) => {
        if (error === null) {
          console.log(body);
          return res.send(body);
        }
        res.send(error);
      }
    );
  } catch (e) {}
};

exports.postPerlCompiler = (req, res, next) => {
  const code = req.body.code;
  const input = req.body.input;
  const version = req.body.version;
  console.log(code);

  var program = {
    script: code,
    stdin: input,
    language: "perl",
    versionIndex: version,
    clientId: client_id,
    clientSecret: client_secret,
  };
  try {
    request(
      {
        url: "https://api.jdoodle.com/v1/execute",
        method: "POST",
        json: program,
      },
      (error, response, body) => {
        if (error === null) {
          console.log(body);
          return res.send(body);
        }
        res.send(error);
      }
    );
  } catch (e) {}
};

exports.postKotlinCompiler = (req, res, next) => {
  const code = req.body.code;
  const input = req.body.input;
  const version = req.body.version;
  console.log(code);

  var program = {
    script: code,
    stdin: input,
    language: "kotlin",
    versionIndex: version,
    clientId: client_id,
    clientSecret: client_secret,
  };
  try {
    request(
      {
        url: "https://api.jdoodle.com/v1/execute",
        method: "POST",
        json: program,
      },
      (error, response, body) => {
        if (error === null) {
          console.log(body);
          return res.send(body);
        }
        res.send(error);
      }
    );
  } catch (e) {}
};

// curl -X POST "https://api.jdoodle.com/v1/execute" -d "clientId=6ba6faf5b206623b11d904b2c26a3f42" -d "clientSecret=b604a86ad865142f00721daa7f4621731d7e25b732ae5504151e0e75486d02a7" -d "script=print('Hello, World!')" -d "language=python3"
