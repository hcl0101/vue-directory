<template>
  <div>
    <div class="clearfix">
      <div class="context-menu--container">
        <p>普通的</p>
        <div
          class="context-menu--item"
          v-context-menu="context"
          @contextmenu="handleOpenContextmenu(context)">
          <p>右键点击此区域</p>
        </div>
      </div>
      <div class="context-menu--container">
        <p>带分割线</p>
        <div
          class="context-menu--item"
          v-context-menu="contextDivider"
          @contextmenu="handleOpenContextmenu(contextDivider)">
          <p>右键点击此区域</p>
        </div>
      </div>
    </div>
    <vue-context-menu
      ref="context"
      :context="contextmenu"
      @show-contextmenu="handleShow"
      @hide-contextmenu="handleHide"
      @click-contextmenu="handleClickContextmenu">
    </vue-context-menu>
    <template v-for="(api, index) in apis">
      <Table :key="index" :title="api.title" :data="api.data"></Table>
    </template>
  </div>
</template>

<script>
import contextMenu from "@/directives/context-menu.js";
import Table from '@/views/Table';
import API from './api';

export default {
  components: {
    Table
  },

  directives: {
    contextMenu
  },

  data() {
    return {
      apis: API,
      contextmenu: [],
      context: [
        { icon: 'iconfont icon-fenxiangfangshi', label: '编辑' },
        { icon: 'iconfont icon-shujukanban', label: '删除' },
        { icon: 'iconfont icon-addteam', label: '重命名' },
      ],
      contextDivider: [
        { icon: 'iconfont icon-fenxiangfangshi', label: '编辑' },
        { divider: true },
        { icon: 'iconfont icon-shujukanban', label: '删除' },
        { divider: true },
        { icon: 'iconfont icon-addteam', label: '重命名' },
      ],
    };
  },

  methods: {
    handleOpenContextmenu(contextmenu) {
      this.contextmenu = contextmenu;
    },
    handleClickContextmenu(menu, vdom) {
      console.log(menu, vdom);
    },

    handleShow() {
      console.log('show');
    },

    handleHide() {
      console.log('hide');
    }
  }
};
</script>

<style lang="scss" scoped>
  .context-menu--container {
    float: left;
    width: calc(50% - 15px);
    box-sizing: border-box;
    &:not(:last-child) {
      margin-right: 15px;
    }
    p {
      line-height: 40px;
      color: #666;
      text-align: center;
      text-align: left;
      text-indent: 15px;
    }
    .context-menu--item {
      height: 100px;
      border-radius: 4px;
      border: 1px solid #409EFF;
    }
  }
  
</style>
