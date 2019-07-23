const preventDefault = (e) => { //阻止默认事件
  if (e && e.preventDefault) {
    e.preventDefault();                 //W3C
  } else {
    window.event.returnValue = false;   //ie
  } 
}

const stopPropagation= (e) => { //阻止冒泡
  if (e.stopPropagation) {
    e.stopPropagation();      //W3C
  } else {       
    e.cancelBubble = true;    //IE
  }
}

const directive = {
  inserted(el, binding, vnode) {
    // el.className = el.className ? el.className + ' v-context-menu' : 'v-context-menu';

    el.addEventListener('contextmenu', (e) => {
      preventDefault(e);
      stopPropagation(e);
      
      const context = vnode.context.$refs['context']; //写死了：ref="context"
      context.showContextMenu(vnode, e);
    });
  }
}

export default directive;