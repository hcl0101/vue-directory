<template>
  <div
    ref="directory"
    class="hcl-directory"
    :style="{ backgroundColor: isHover ? hoverColor : 'inherit' }"
    @click="handleClick"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false">
    <slot></slot>
    <div class="directory-img">
      <img :src="data.img" alt="">
    </div>
    <div v-if="data.editing" class="directory-input">
      <input
        ref="input"
        class="hcl-input"
        type="text"
        v-model="name"
        :maxlength="maxLength"
        @click.stop.prevent
        @blur="handleBlur"
        @keyup.esc="handleKeyupEsc"
        @keyup.enter="$event.target.blur"/>
    </div>
    <p v-else
      class="directory-name ellipsis"
      :title="name"
      @click.stop.prevent="handleRename">
      {{ name }}
    </p>
    <div
      class="directory-checkbox"
      v-if="showCheckbox"
      :style="{
        display: (isHover || isChecked) ? 'block' : 'none',
      }"
      @click.stop>
      <el-checkbox
        v-model="isChecked"
        :label="data.id"
        @change="value => isChecked = value">
      </el-checkbox>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DirectoryItemNormal',

  props: {
    data: Object,
    maxLength: [Number, String],
    showCheckbox: Boolean,
    hoverColor: String
  },

  data() {
    return {
      name: '',
      cacheName: '',
      isHover: false,
      isChecked: false
    }
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
      this.$emit('click-name', this.data);
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
