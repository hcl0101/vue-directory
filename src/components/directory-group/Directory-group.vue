<template>
  <div class="hcl-directory-group">
    <div class="hcl-directory-group__header">
      <el-checkbox
        class="check-all"
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange">全选
      </el-checkbox>
      <template v-if="showBreadcrumb">
        <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
            <a :title="item.name" @click="clickBreadcrumb(item, index)">{{ item.name }}</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </template>
      <slot name="header-right"></slot>
    </div>
    <div class="hcl-directory-group__body">
      <el-scrollbar style="height: 100%">
        <div v-if="!$slots.default" class="hcl-directory-group--empty flex-center">
          <p>{{ emptyText }}</p>
        </div>
        <template v-else>
          <div v-if="loading" class="hcl-directory__loading">
            <i class="iconfont icon-loading"></i>
          </div>
          <el-checkbox-group v-else
            ref="checkbox-group"
            :class="type === 'normal' ? 'hcl-directory__normal clearfix' : 'hcl-directory__list'"
            v-model="checkedItems"
            @change="handleItemChecked">
            <slot v-if="type === 'normal'"></slot>
            <ul v-else-if="type === 'list'">
              <li class="hcl-directory__list__header">
                <div
                  v-for="(item, index) in title"
                  :key="item"
                  :style="{
                    width: fields[index].width ?  fields[index].width : 0,
                    flex: fields[index].width ? 'none' : 1
                  }">
                  {{ item }}
                </div>
              </li>
              <slot></slot>
            </ul>
          </el-checkbox-group>
        </template>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vueDirectoryGroup',

  props: {
    loading: {
      type: Boolean,
      default: false
    },
    type: {                 // 目录展示的类型： 正常、列表
      type: String,
      default: 'normal'     // normal/list
    },
    title: {               //type为list时, 展示的头部(类似于表头)
      type: Array,
      default: () => []
    },
    emptyText: {
      type: String,
      default: '该文件夹为空!'
    },
    hoverColor: {
      type: String,
      default: '#bddaf9'
    },
    showBreadcrumb: {
      type: Boolean,
      default: true
    },
    breadcrumbList: {
      type: Array,
      default: () => [{ name: '根目录', id: '/' }]
    }
  },

  data() {
    return {
      checkedItems: [],
      checkAll: false,
      isIndeterminate: true,
    };
  },

  computed: {
    fields() {
      return this.$parent.fields;
    }
  },

  watch: {
    breadcrumbList(newVal, oldVal) {
      this.checkedItems = [];
      this.isIndeterminate = true;
      this.$emit("checked-change", []);
    },
    type(newVal, oldVal) {
      let children = this.$refs['checkbox-group'].$children;
      this.$nextTick(() => {
        children.forEach(child => {
          if (this.checkedItems.includes(child.data.name)) {
            child.$children[0].isChecked = true;
          }
        });
      })
    }
  },

  methods: {
    handleItemChecked(value) {      
      const checkedCount = this.checkedItems.length;
      let children = this.$refs['checkbox-group'].$children;
      children = children.filter(child => child.showCheckbox);
      
      this.checkAll = checkedCount === children.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < children.length;

      let checked = [];
      children.forEach(child => {
        if (child.$children[0].isChecked) {
          checked.push(child.data);
        }
      });

      this.$emit("checked-change", checked);
    },

    handleCheckAllChange(isChecked) {
      let checked = [];

      this.isIndeterminate = false;
      this.$refs['checkbox-group'].$children.forEach(child => {
        child.$children[0].isChecked = isChecked;
        if (child.data.showCheckbox && isChecked) {
          if (!this.checkedItems.includes(child.data.name)) {
            this.checkedItems.push(child.data.name);
          }
          checked.push(child.data);
        } else {
          this.checkedItems = [];
          checked = [];
        }
      });
      this.$emit("checked-change", checked);
    },

    clickBreadcrumb(item, index) {
      this.$emit('click-breadcrumb', item, index);
    }
  }
}
</script>
