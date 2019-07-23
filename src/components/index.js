import ContextMenu from "./context-menu/index.js";
import DirectoryGroup from "./directory-group/index.js";
import Directory from "./directory/index.js";

const components = [
  ContextMenu,
  DirectoryGroup,
  Directory
];

const install = (Vue) => {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  ContextMenu,
  DirectoryGroup,
  Directory
};