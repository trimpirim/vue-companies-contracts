<template>
  <el-table
    :data="items"
    style="width: 100%" row-key="id" ref="table" @row-click="onRowClick">
    <el-table-column type="expand">
      <template slot-scope="props">
        <Contracts :company="expandedRow" v-if="expandedRow"></Contracts>
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
</template>

<script>
  import { createNamespacedHelpers } from 'vuex';
  import Contracts from '../Contracts/Contracts';

  const { mapState: mapCompaniesState, mapActions: mapCompaniesActions, mapGetters: mapCompaniesGetters } = createNamespacedHelpers('companies');

  export default {
    name: 'Companies',
    components: { Contracts },
    computed: {
      ...mapCompaniesState({
        items: state => state.list,
        expandedRow: state => state.selected,
      }),
    },
    data() {
      return {
      };
    },
    methods: {
      ...mapCompaniesActions({
        loadAll: 'loadAll',
        selectCompany: 'select',
      }),
      onRowClick(row) {
        this.collapseAll(this.items);
        this.$refs.table.toggleRowExpansion(row, true);
        this.selectCompany(row);
      },
      collapseAll(rows) {
        rows.forEach((row) => {
          this.$refs.table.toggleRowExpansion(row, false);
        });
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
