<template>
  <div class="hcl">
    <aside>
      <ul>
        <li
          v-for="item in menu"
          :key="item.index"
          :class="{ 'active': active === item.index }"
          @click="handleClick(item.index)">
          {{ item.title }}
        </li>
      </ul>
    </aside>
    <main>
      <transition name="fade">  
        <router-view />
      </transition>
    </main>
  </div>
</template>

<script>
  export default {
    name: "home",

    data() {
      return {
        active: '/directory',
        menu: [
          { index: '/contextMenu', title: '右键菜单' },
          { index: '/directory', title: '目录' },
        ]
      }
    },

    created() {
      if (this.active) {
        this.$router.push(this.active);
      }
    },

    methods: {
      handleClick(index) {
        this.active = index;
        this.$router.push(index);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .hcl {
    height: 100%;
  }
  .hcl {
    display: flex;
    aside {
      width: 240px;
      color: #e8e8e8;
      background-color: #1E1E1E;
      li {
        padding: 5px 15px;
        line-height: 30px;
        &:hover {
          background-color: #0080cb;
          opacity: .8;
        }
      }
      .active {
        background-color: #0080cb;
      }
    }
    main {
      flex: 1;
      width: 0;
      padding: 15px 30px;
      overflow: auto;
    }
  }
</style>
