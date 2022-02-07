'use strict'
const _sx_is_node = (v, prop, n = undefined) => n ? n[prop] = v : v,
      _sx_is_callable = (data, node, callable) => (data || node) ? callable(data) : callable,
      _sx_template = (template, data = undefined, node = undefined) => _sx_is_node(_sx_is_callable(data, node,context => template(context)), 'innerHTML', node),
      _sx_for = (template, data = undefined) => _sx_is_callable(data, undefined, list => list.map(template).join('')),
      _sx_if = (condition, data = undefined, template_a, template_b = undefined) => _sx_is_callable(data, undefined, data => condition ? template_a(data) : template_b ? template_b(data) : '');
