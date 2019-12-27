<template>
  <li
    :style="{ backgroundColor: isHover ? hoverColor : 'inherit' }"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
    @click="handleClick">
    <div :style="{
        width: firstField.width ?  firstField.width : 0,
        flex: firstField.width ? 'none' : 1
      }">
      <div
        v-if="showCheckbox"
        class="directory-checkbox"
        @click.stop>
        <el-checkbox
          v-model="isChecked"
          :label="data.id"
          @change="value => isChecked = value">
        </el-checkbox>
      </div>
      <div class="directory-img flex-center">
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
      <div v-else class="directory-name ellipsis">{{ data[firstField.name] }}</div>
    </div>
    <div
      v-for="field in otherFields"
      :key="field.name"
      :style="{
        width: field.width ?  field.width : 0,
        flex: field.width ? 'none' : 1
      }">
      <slot :field="field.name"></slot>
    </div>
  </li>
</template>

<script>
export default {
  name: 'DirectoryItemList',

  props: {
    data: Object,
    fields: Array,
    width: [Number, String],
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
    };
  },

  computed: {
    firstField() {
      return this.fields[0];
    },
    otherFields() {
      return this.fields.length > 1 ? this.fields.slice(1, this.fields.length) : [];
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
