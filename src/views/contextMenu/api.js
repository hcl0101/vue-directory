export default [
  {
    title: 'Attributes',
    data: [
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
        '名称': 'show',
        '说明': '展示右键菜单',
        '回调函数': '-'
      },
      {
        '名称': 'hide',
        '说明': '隐藏右键菜单',
        '回调函数': '-'
      },
      {
        '名称': 'click-contextmenu',
        '说明': '点击右键菜单',
        '回调函数': 'menuItem, index'
      }
    ]
  }
];