<template>
  <el-pagination
    layout="prev, pager, next"
    :total="pagination.total" :page-size="pagination.perPage" @current-change="onPageChange">
  </el-pagination>
</template>

<script>
  export const PAGE_CHANGE_EVENT_NAME = 'page-change';

  export default {
    name: 'Pagination',
    props: {
      pagination: {
        required: true,
        type: Object,
      },
    },
    data() {
      return {
      };
    },
    methods: {
      onPageChange(page) {
        /**
         * API pagination implementation is zero-based,
         * el-ui-pagination implementation begins with 1 for a first page.
         */
        this.$emit(PAGE_CHANGE_EVENT_NAME, { page: page - 1 });
      },
    },
  };
</script>

<style>
</style>
