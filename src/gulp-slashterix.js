const through = require('through2');
const fs = require('fs');
const slashterix_parser = require('./parser.js');

const _slashterix = (opts = {}, buffer) => {
  let code = buffer.contents.toString(),
      parsed_code = slashterix_parser(code);
  if(parsed_code.length != code.length || parsed_code !== code)
    buffer.contents = Buffer.alloc(parsed_code.length + 1, parsed_code + '\n');
  return buffer;
};

const _inject = (opts = {}, buffer) => {
  let slashterix_lib = fs.readFileSync(`${__dirname}/slashterix.js`).toString(),
      code = buffer.contents.toString(),
      combined = slashterix_lib.concat(code);
  buffer.contents = Buffer.from(combined);
  return buffer;
};

module.exports = {
    parse: (opts = {}) => through.obj((file, enc, f) => f(null, _slashterix(opts, file))),
    use: (opts = {}) => through.obj((file, enc, f) => f(null, _inject(opts, file)))
}
