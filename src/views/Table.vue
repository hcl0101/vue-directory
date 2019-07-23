<template>
  <section>
    <h3>{{ title }}</h3>
    <table>
      <thead>
        <tr>
          <th v-for="key in header" :key="key">{{ key }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in data" :key="index">
          <td v-for="key in header" :key="key">{{ row[key] }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      data: {
        type: Array,
        default: () => []
      }
    },

    computed: {
      header() {
        return this.data.length ? Object.keys(this.data[0]) : [];
      },
    }
  }
</script>

<style lang="scss" scoped>
  table {
    width: 100%;
    font-size: 14px;
  }
  thead th {
    max-width: 250px;
    padding: 15px;
    font-weight: 400;
    text-align: left;
    white-space: nowrap;
    color: #909399;
    border-bottom: 1px solid #dcdfe6; 
  }
  tbody td {
    padding: 15px;
    max-width: 250px;
    color: #606266;
    border-bottom: 1px solid #dcdfe6;
  }
</style>
