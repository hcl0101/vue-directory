<template>
<div>
  <div class="view-directory">
    <vue-directory-group
      ref="directory"
      show-breadcrumb
      :loading="loading"
      :breadcrumb-list="breadcrumbList"
      @checked-change="handleChecked"
      @click-breadcrumb="clickBreadcrumb">
      <template v-for="(directory, index) in data">
        <vue-directory
          v-context-menu="contextmenu"
          :key="directory.id"
          :show-checkbox="directory.showCheckbox"
          :data="directory"
          @click="handleClick"
          @save="name => save(name, index)">
        </vue-directory>
      </template>
    </vue-directory-group>
    <vue-contextmenu
      ref="context"
      :context="contextmenu"
      @show-contextmenu="showContextmenu"
      @click-contextmenu="clickContextmenu">
    </vue-contextmenu>
  </div>
  <template v-for="(api, index) in apis">
    <Table :key="index" :title="api.title" :data="api.data"></Table>
  </template>
</div>
</template>

<script>
import contextMenu from "@/directives/context-menu.js";
import Table from '@/views/Table';
import API from './api';

import ICON_DIRECTORY_ADD from '@/assets/images/directory_add.png';
import ICON_DIRECTORY from '@/assets/images/directory.png';
import ICON_FILE from '@/assets/images/file.png';

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
      loading: false,
      data: [
        { id: 1, type: 'create', name: '新建文件夹', editing: false, showCheckbox: false, img: ICON_DIRECTORY_ADD },
        { id: 2, type: 'folder', name: '文件夹1', editing: false, showCheckbox: true, img: ICON_DIRECTORY },
        { id: 3, type: 'folder', name: '文件夹2', editing: false, showCheckbox: true, img: ICON_DIRECTORY },
        { id: 4, type: 'folder', name: '文件夹3', editing: false, showCheckbox: true, img: ICON_DIRECTORY },
        { id: 5, type: 'file', name: '文件1', editing: false, showCheckbox: true, img: ICON_FILE },
        { id: 6, type: 'file', name: '文件2', editing: false, showCheckbox: true, img: ICON_FILE },
        { id: 7, type: 'file', name: '文件3', editing: false, showCheckbox: true, img: ICON_FILE }
      ],
      breadcrumbList: [{ name: '根目录', id: '/' }],
      contextmenu: []
    };
  },

  methods: {
    handleChecked(checkedItems) {
      console.log(checkedItems)
    },

    handleClick(item, e) {
      if (item.type === 'create') {
        this.createFolder();
      } else if (item.type === 'folder') {
        this.clickFolder(item);
      } else {
        this.clickFile(item);
      }
    },

    createFolder() {
      this.data.push({
        id: this.data.length + 1,
        name: '文件夹' + this.data.length,
        editing: true,
        img: ICON_DIRECTORY,
        type: 'folder'
      });
    },

    clickFolder(folder) {
      this.loading = true;
      this.$message({ message: `点击了: ${folder.name}`, type: 'success' });
      this.breadcrumbList.push({ name: folder.name, id: folder.id });
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },

    clickFile(file) {
      this.$message({ message: `点击了: ${file.name}`, type: 'success' });
    },

    clickBreadcrumb(breadcrumb) {
      const index = this.breadcrumbList.findIndex(b => b.id === breadcrumb.id);
      this.breadcrumbList.splice(index + 1, this.breadcrumbList.length - 1);
    },

    showContextmenu(vnode) {
      const index = this.data.findIndex(directory => directory.id === vnode.key);
      const { type } = this.data[index];

      if (type === 'create') {
        this.contextmenu = [];
      } else if (type === 'folder') {
        this.contextmenu = [
          { label: '删除', value: 'delete' },
          { divider: true },
          { label: '重命名', value: 'rename' }
        ];
      } else {
        this.contextmenu = [
          { label: '编辑', value: 'edit' },
          { divider: true },
          { label: '删除', value: 'delete' },
          { divider: true },
          { label: '重命名', value: 'rename' }
        ];
      }
    },

    clickContextmenu(contextmenu, vnode) {
      const index = this.data.findIndex(directory => directory.id === vnode.key);
      const type = contextmenu.value;
      
      if (type === 'edit') {
        this.data[index].editing = true;
      } else if (type === 'delete') {
        this.data.splice(index, 1);
      } else if (type === 'rename') {
        this.data[index].editing = true;
      }
    },

    save(name, index) {
      this.data[index].name = name;
    }
  }
}
</script>

<style lang="scss" scoped>
  .view-directory {
    margin: 0 20px 20px 20px;
    border: 1px solid #ebedf0;
    border-radius: 2px;
  }
</style>
