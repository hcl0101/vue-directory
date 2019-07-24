export default [
  {
    title: 'Attributes',
    data: [
      {
        '参数': 'ref',
        '说明': '-',
        '类型': 'Sting',
        '配置': '-',
        '默认值': "必须是'context'"
      },
      {
        '参数': 'context',
        '说明': '右键菜单配置',
        '类型': 'Array',
        '配置': [
          { icon: 'iconfont icon-xxx', label: '编辑' },
          { divider: true },
        ],
        '默认值': '[]'
      }
    ]
  },
  {
    title: 'events',
    data: [
      {
        '名称': 'show-contextmenu',
        '说明': '展示右键菜单',
        '回调函数': 'function() {} 可对右键菜单进行配置',
        '参数': '-'
      },
      {
        '名称': 'hide-contextmenu',
        '说明': '隐藏右键菜单',
        '回调函数': 'function() {}',
        '参数': '-'
      },
      {
        '名称': 'click-contextmenu',
        '说明': '点击右键菜单',
        '回调函数': 'function(menuItem, vdom) {}',
        '参数': 'menuItem: 点击的菜单, vdom: 关联的右键菜单的组件的虚拟dom'
      }
    ]
  }
];