const clickOutside = {
  bind: function (el, binding, vNode) {
    el.__vueClickOutside__ = event => {
      if (!el.contains(event.target)) {
        vNode.context[binding.expression](event);
        event.stopPropagation();
      }
    }
    document.body.addEventListener('click', el.__vueClickOutside__);
  },
  unbind: function (el, binding, vNode) {
    document.body.removeEventListener('click', el.__vueClickOutside__);
    el.__vueClickOutside__ = null;
  }
}

export default clickOutside;


