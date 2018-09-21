<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>

  import Header from '@/components/header/Header';

  export default {
    name: 'App',
    components: {
      Header,
    },
  };
</script>

<style lang="scss">
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-table {
    th {
      line-height: 23px;
    }

    .el-pager {
      display: block;
      line-height: 23px;
    }
  }

  .el-pagination {
    display: flex;
    justify-content: flex-end;
  }
</style>
