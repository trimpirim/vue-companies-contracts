<template>
  <div>
    <el-table
      :data="items"
      style="width: 100%"
      row-key="id"
      ref="table"
      @expand-change="onExpandChange"
      @row-click="onRowClick"
      empty-text="No results">
      <el-table-column type="expand">
        <template slot-scope="props">
          <Contracts v-if="expandedRow" :company="props.row"></Contracts>
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
  const { mapActions: mapContractActions } = createNamespacedHelpers('contracts');

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
      return {};
    },
    methods: {
      ...mapActions({
        loadAll: 'loadAll',
        selectCompany: 'select',
        updatePaginationPage: 'updatePaginationPage',
      }),
      ...mapContractActions({
        resetContracts: 'reset',
      }),
      /**
       * @param row
       */
      onRowClick(row) {
        this.handleCompanySelection(row);
        this.$refs.table.toggleRowExpansion(row, true);
      },
      /**
       * onRowClick and onExpandChange is needed to handle whole row clicks
       * and to handle arrow clicks specifically.
       * Both methods have almost the same implementation, but differs.
       *
       * @param row
       * @param expandedRows
       * @param expanded
       */
      onExpandChange(row, expandedRows, expanded) {
        if (expanded) {
          this.handleCompanySelection(row);
        }
      },
      handleCompanySelection(row) {
        this.resetContracts();
        this.selectCompany(null);
        this.collapseAll(this.items.filter(item => item.id !== row.id));
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

<style lang="scss">

</style>
