<template>
  <li
    :style="{ backgroundColor: isHover ? hoverColor : 'inherit' }"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
    @click="handleClick">
    <div
      v-if="showCheckbox"
      class="directory-checkbox"
      @click.stop>
      <el-checkbox
        v-model="isChecked"
        :label="data.name"
        @change="value => isChecked = value">
      </el-checkbox>
    </div>
    <div class="directory-img flex-center">
      <img :src="data.img" alt="">
    </div>
    <div class="directory-input" v-if="data.editing">
      <input
        ref="input"
        class="hcl-input"
        type="text"
        v-model="name"
        @click.stop.prevent
        @blur="handleBlur"
        @keyup.esc="handleKeyupEsc"
        @keyup.enter="$event.target.blur"/>
    </div>
    <div v-else class="directory-name">{{ data.name }}</div>
    <div class="directory-action">
      <slot name="right"></slot>
    </div>
  </li>
</template>

<script>
export default {
  name: 'DirectoryItemList',

  props: {
    data: Object,
    fields: Array,
    showCheckbox: Boolean,
    hoverColor: String
  },

  data() {
    return {
      name: '',
      cacheName: '',
      isHover: false,
      isChecked: false
    };
  },

  watch: {
    data: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        this.cacheName = newVal.name;
        this.name = newVal.name;
        if (newVal.editing) {
          this.$nextTick(() => {
            this.focus();
          });
        }
      }
    }
  },

  methods: {
    focus() {
      this.$refs.input.focus();
    },
    handleClick(e) {
      this.$emit('click', this.data, e);
    },
    handleRename() {
      this.data.editing = true;
    },
    handleBlur() {
      this.data.editing = false;
      this.$emit('save', this.name);
    },
    handleKeyupEsc() {
      this.data.editing = false;
      this.name = this.cacheName;
    }
  }
}
</script>
