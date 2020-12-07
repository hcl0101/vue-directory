<template>
  <div
    ref="directory"
    class="hcl-directory"
    :style="{ backgroundColor: showHoverColor ? hoverColor : 'inherit' }"
    @click="handleClick"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false">
    <slot></slot>
    <template>
      <div v-if="useDefaultCreateIcon && data.type === 'create'" class="directory-img__normal--default flex-center">
        <span class="flex-center">+</span>
      </div>
      <div v-else class="directory-img">
        <img :src="data.img" alt="">
      </div>
    </template>
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
    useDefaultCreateIcon: Boolean,
    data: Object,
    maxLength: [Number, String],
    showCheckbox: Boolean,
    hoverColor: String,
    isActive: Boolean
  },

  data() {
    return {
      name: '',
      cacheName: '',
      isHover: false,
      isChecked: false
    }
  },

  computed: {
    showHoverColor() {
      return this.isActive || this.isHover;
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
      this.$refs.input.select();
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
