<template>
  <directory-item-normal
    v-if="type === 'normal'"
    :max-length="maxLength"
    :show-checkbox="showCheckbox"
    :hover-color="hoverColor"
    :data="data"
    @click="handleClick"
    @save="handleSave">
    <slot></slot>
  </directory-item-normal>
  <directory-item-list
    v-else-if="type === 'list'"
    :max-length="maxLength"
    :show-checkbox="showCheckbox"
    :hover-color="hoverColor"
    :data="data"
    @click="handleClick"
    @save="handleSave">
    <template v-slot:right>
      <slot name="right"></slot>
    </template>
  </directory-item-list>
</template>

<script>
import DirectoryItemNormal from './Directory-item-normal';
import DirectoryItemList from './Directory-item-list';

export default {
  name: 'vueDirectory',

  components: {
    DirectoryItemNormal,
    DirectoryItemList
  },

  props: {
    data: {                 // 目录数据
      type: Object,
      default: () => {
        return {
          img: '',
          name: '',
          editing: false
        }
      }
    },
    showCheckbox: {         // 是否展示可选
      type: Boolean,
      default: false
    },
    hoverColor: {           // 鼠标悬停时的背景颜色
      type: String,
      default: '#bddaf9'
    },
    maxLength: {
      type: [Number, String],
      default: 20
    }
  },

  computed: {
    type() {
      return this.$parent.$parent.$parent.type;
    }
  },

  methods: {
    handleClick(data, e) {
      this.$emit('click', data, e);
    },
    handleSave(name) {
      this.$emit('save', name);
    }
  }
}
</script>
