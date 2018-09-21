<template>
  <div>
    <el-table
      :data="items"
      style="width: 100%" row-key="id" ref="table" @row-click="onRowClick">
      <el-table-column type="expand">
        <template slot-scope="props">
          <Contracts :company="expandedRow"></Contracts>
        </template>
      </el-table-column>
      <el-table-column :width="100"
        label="ID"
        prop="id" align="left">
      </el-table-column>
      <el-table-column
        label="Name"
        prop="name" align="left">
      </el-table-column>
    </el-table>
    <Pagination :pagination="pagination" @page-change="onPageChange"></Pagination>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex';
  import Contracts from '../Contracts/Contracts';
  import Pagination from '../../components/Pagination/Pagination';

  const { mapState, mapActions } = createNamespacedHelpers('companies');

  export default {
    name: 'Companies',
    components: { Pagination, Contracts },
    computed: {
      ...mapState({
        items: state => state.list,
        expandedRow: state => state.selected,
        pagination: state => state.pagination,
      }),
    },
    data() {
      return {
      };
    },
    methods: {
      ...mapActions({
        loadAll: 'loadAll',
        selectCompany: 'select',
        updatePaginationPage: 'updatePaginationPage',
      }),
      onRowClick(row) {
        this.selectCompany(null);
        this.collapseAll(this.items);
        this.$refs.table.toggleRowExpansion(row, true);
        this.selectCompany(row);
      },
      collapseAll(rows) {
        rows.forEach((row) => {
          this.$refs.table.toggleRowExpansion(row, false);
        });
      },
      onPageChange({ page }) {
        this.updatePaginationPage(page);
        this.loadAll();
      },
    },
    mounted() {

    },
    created() {
      this.loadAll();
    },
  };
</script>

<style>
</style>
