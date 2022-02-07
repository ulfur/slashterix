function _parse_fragment(template, regex, parser, args) {
  let _splice = (s, r, m) => s.substr(0, m.index) + r + s.substr(m.index + m[0].length, s.length),
      match = regex.exec(template);
  while(match) {
    template = _splice(template, parser(...args(match.groups)), match);
    match = regex.exec(template);
  }
  return template;
}

const _parse_template = (template) => _parse_fragment(template,
            /\/\*template( with (?<context>[a-z0-9_+.,;:\[\]\-\/%$"'`*{}]+))?( on (?<node>[a-z0-9_.]+))?(?<template>.+?)\*\//isg,
            (template, context = undefined, node = undefined) => `_sx_template((${context ? context : ''}) => \`${template}\`, ${context}, ${node});`,
            (data) => [data.template, data.context, data.node]),
      _parse_if = (template) =>_parse_fragment(template,
            /if (?<condition>.+?)( with (?<context>.+?))? then\n(\s+)(?<template_a>.+?)(else\n(\s+)(?<template_b>.+?))?endif/isg,
            (condition, context, template_a, template_b) => `$\{_sx_if(${condition}, ${context}, () => \`${template_a}\`${template_b ? `, () => \`${template_b}\`` : ''} )}`,
            (data) => [data.condition, data.context, data.template_a, data.template_b]),
      _parse_for = (template) => _parse_fragment(template,
            /for (?<arg>\w+) in (?<context>.+?)\n(\s+)+(?<template>.+?)\n(\s+)endfor/isg,
            ((arg, context, template) => `$\{_sx_for((${arg}) => \`${template}\`, ${context})\}`),
            (data) => [data.arg, data.context, data.template]);

module.exports = (code) => _parse_for(_parse_if(_parse_template(code)));
