<template>
<div>
  <div class="view-directory">
    <vue-directory-group style="height:300px;"
      ref="directory"
      show-breadcrumb
      maxLength="20"
      use-default-create-icon
      :type="type"
      :header="header"
      :loading="loading"
      :breadcrumb-list="breadcrumbList"
      @checked-change="handleChecked"
      @sort-change="handleSort"
      @click-breadcrumb="clickBreadcrumb">
      <!-- 头部右侧的slot, 这里渲染用于目录/列表间切换的radio button -->
      <template slot="header-right">
        <div class="flex-center">
          <el-radio-group v-model="type" size="mini">
            <el-radio-button label="normal">平铺</el-radio-button>
            <el-radio-button label="list">列表</el-radio-button>
          </el-radio-group>
        </div>
      </template>
      <template v-for="(directory, index) in data">
        <vue-directory
          v-context-menu="contextmenu"
          :key="directory.id"
          :is-active="directory.id === defaultActive"
          :show-checkbox="directory.showCheckbox"
          :fields="fields"
          :data="directory"
          @click-name="handleClickName"
          @click="handleClick"
          @save="name => save(name, index)">
          <p v-if="type === 'normal'" class="directory-path ellipsis">
            {{ directory.path }}
          </p>
          <!-- list模式下，使用作用域插槽自定义渲染 -->
          <template v-if="type === 'list'" v-slot:default="prop">
            <template v-if="directory.type !== 'create'">
              <span class="ellipsis">{{ directory[prop.field] }}</span>
              <div v-if="prop.field === 'operation'" @click.stop.prevent>
                <el-button type="text" @click="triggerOperation(index, 'edit')">编辑</el-button>
                <el-button type="text" @click="triggerOperation(index, 'rename')">重命名</el-button>
                <el-button type="text" @click="triggerOperation(index, 'delete')">删除</el-button>
              </div>
            </template>
          </template>
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
  <pre v-highlight style="lineHeight: 20px;">
    <code class="html" spellcheck="false">{{ code }}</code>
  </pre>
  <template v-for="(api, index) in apis">
    <Table :key="index" :title="api.title" :data="api.data"></Table>
  </template>
</div>
</template>

<script>
import contextMenu from "@/directives/context-menu.js";
import highlight from '@/directives/highlight.js';
import code from './code';
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
    contextMenu,
    highlight
  },

  data() {
    return {
      apis: API,
      code: code,
      loading: false,
      type: 'normal',
      header: [
        { key: 'name', value: '名称', sortable: true },
        { key: 'id', value: 'id', sortable: true },
        { key: 'path', value: '路径', sortable: true },
        { key: 'operation', value: '操作' },
      ],
      defaultActive: '',
      data: [
        { id: 1, path: 'root/hcl/', type: 'create', name: '新建文件夹', editing: false, showCheckbox: false, img: ICON_DIRECTORY_ADD },
        { id: 2, path: 'root/hcl/', type: 'folder', name: '文件1', editing: false, showCheckbox: true, img: ICON_DIRECTORY },
        { id: 3, path: 'root/hcl/', type: 'folder', name: '文件夹2', editing: false, showCheckbox: true, img: ICON_DIRECTORY },
        { id: 4, path: 'root/hcl/', type: 'folder', name: '文件夹3', editing: false, showCheckbox: true, img: ICON_DIRECTORY },
        { id: 5, path: 'root/hcl/', type: 'file', name: '文件1', editing: false, showCheckbox: true, img: ICON_FILE },
        { id: 6, path: 'root/hcl/', type: 'file', name: '文件2', editing: false, showCheckbox: true, img: ICON_FILE },
        { id: 7, path: 'root/hcl/', type: 'file', name: '文件3', editing: false, showCheckbox: true, img: ICON_FILE }
      ],
      fields: [
        { name: 'name', width: '30%' },
        { name: 'id', width: '20%' },
        { name: 'path', width: '30%' },
        { name: 'operation' },
      ],
      breadcrumbList: [{ name: '根目录', id: '/' }],
      contextmenu: []
    };
  },

  methods: {
    handleChecked(checkedItems) {
      console.log(checkedItems);
    },

    handleSort(data, type) {
      this.data = data;
    },

    handleClickName(data) {
      if (data.id !== 1) {
        data.editing = true;
      }
    },

    handleClick(item, e) {
      if (item.type === 'create') {
        this.defaultActive = '';
        this.createFolder();
      } else if (item.type === 'folder') {
        this.defaultActive = '';
        this.clickFolder(item);
      } else {
        this.defaultActive = item.id;
        this.clickFile(item);
      }
    },

    createFolder() {
      this.data.push({
        id: this.data.length + 1,
        name: '文件夹' + this.data.length,
        img: ICON_DIRECTORY,
        type: 'folder',
        editing: true,
        showCheckbox: true
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
      this.triggerOperation(index, type);
    },

    triggerOperation(index, type) {
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
    .directory-path {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      padding: 0 12px;
      line-height: 20px;
      font-size: 14px;
      text-align: center;
    }
  }
</style>
