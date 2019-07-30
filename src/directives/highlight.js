import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';

const directive = {
  inserted(el) {
    const preEl = document.querySelectorAll('pre code');
    preEl.forEach(el => {
      hljs.highlightBlock(el);
    });
  }
};

export default directive;