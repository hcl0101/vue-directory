export default [
  {
    title: 'directory-group Attributes',
    data: [
      {
        '参数': 'loading',
        '说明': '加载中...',
        '类型': 'Boolean',
        '默认值': false
      },
      {
        '参数': 'show-breadcrumb',
        '说明': '是否展示当前目录结构',
        '类型': 'Array',
        '默认值': true
      },
      {
        '参数': 'breadcrumb-list',
        '说明': '当前目录的结构',
        '类型': 'Array',
        '默认值': '{ name: 根目录, id: / }'
      },
      {
        '参数': 'hoverColor',
        '说明': '批量设置hover时的背景色， 覆盖child的hoverColor',
        '类型': 'String',
        '默认值': '#bddaf9'
      },
      {
        '参数': 'emptyText',
        '说明': '无数据时，展示的文字提醒',
        '类型': 'String',
        '默认值': '该文件夹为空!'
      }
    ]
  },
  {
    title: 'directory-group 方法',
    data: [
      {
        '名称': 'rename',
        '说明': '重命名文件夹/文件',
        '参数': 'index: 文件夹/文件的索引'
      },
      {
        '名称': 'click-breadcrumb',
        '说明': '点击目录',
        '参数': '{ name: xx, id: xx }'
      }
    ]
  },
  {
    title: 'directory Attributes',
    data: [
      {
        '参数': 'data',
        '说明': '文件夹/文件的数据对象',
        '类型': 'Boolean',
        '默认值': "{ img: '', name: '' }"
      },
      {
        '参数': 'renameable',
        '说明': '是否可重命名, 优先级高于group的renameable',
        '类型': 'Boolean',
        '默认值': true
      },
      {
        '参数': 'hoverColor',
        '说明': 'hover时的背景颜色, 优先级低于group的hoverColor',
        '类型': 'String',
        '默认值': '#bddaf9'
      },
      {
        '参数': 'show-checkbox',
        '说明': '是否展示checkbox',
        '类型': 'Boolean',
        '默认值': 'true'
      }
    ]
  },
  {
    title: 'directory events',
    data: [
      {
        '名称': 'click',
        '说明': '点击文件夹/文件',
        '回调函数': '(data, e) data: 文件夹/文件的数据， e: event'
      },
      {
        '名称': 'rename',
        '说明': '保存名称时触发',
        '参数': 'name: 文件、文件夹的名称'
      }
    ]
  }
]