<template>
  <el-table
    :data="items"
    style="width: 100%" row-key="id">
    <el-table-column :width="100"
                     label="ID"
                     prop="id" align="left">
    </el-table-column>
    <el-table-column
      label="Name"
      prop="name" align="left">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'Contracts',
    props: {
      company: {
        required: true,
        type: Object,
      },
    },
    computed: {},
    data() {
      return {
        items: [],
      };
    },
    methods: {},
    mounted() {
    },
    created() {
    },
  };
</script>

<style>
</style>
