export default [
  {
    title: 'directory-group 属性',
    data: [
      {
        '参数': 'loading',
        '说明': '加载中...',
        '类型': 'Boolean',
        '可选值': 'true | false',
        '默认值': false
      },
      {
        '参数': 'type',
        '说明': '以目录方式展示还是以列表方式展示',
        '类型': 'String',
        '可选值': 'normal | list',
        '默认值': 'normal'
      },
      {
        '参数': 'show-breadcrumb',
        '说明': '是否展示当前目录结构',
        '类型': 'Array',
        '可选值': '-',
        '默认值': true
      },
      {
        '参数': 'breadcrumb-list',
        '说明': '当前目录的结构',
        '类型': 'Array',
        '可选值': '-',
        '默认值': { name: '根目录', id: '/' }
      },
      {
        '参数': 'empty-text',
        '说明': '无数据时，展示的文字提醒',
        '类型': 'String',
        '可选值': '-',
        '默认值': '该文件夹为空!'
      }
    ]
  },
  {
    title: 'directory-group 方法',
    data: [
      {
        '名称': 'click-breadcrumb',
        '说明': '点击目录',
        '参数': '{ name: xx, id: xx }'
      },
      {
        '名称': 'checked-change',
        '说明': '选中文件夹、文件夹时触发',
        '回调函数': 'function(checkedItems) {}',
        '参数': 'checkedItems: 选中的资源'
      },
    ]
  },
  {
    title: 'directory-group slot',
    data: [
      {
        '名称': 'header-right',
        '说明': '目录头部位于最右侧的位置，可用于渲染目录展示方式： 平铺(normal), 列表(list)'
      }
    ]
  },
  {
    title: 'directory 属性',
    data: [
      {
        '参数': 'data',
        '说明': '目录所需要的数据',
        '类型': 'Object',
        '默认值': { img: '', name: '', editing: false }
      },
      {
        '参数': 'show-checkbox',
        '说明': '目录是否可选',
        '类型': 'Boolean',
        '默认值': true
      },
      {
        '参数': 'hover-color',
        '说明': '鼠标悬停时的背景色',
        '类型': 'String',
        '默认值': '#bddaf9'
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
        '名称': 'save',
        '说明': '保存名称时触发',
        '参数': 'name: 文件、文件夹的名称'
      }
    ]
  }
]