<template>
  <div>
    <el-table
      :data="items"
      style="width: 100%" row-key="id" @row-click="onRowClick" empty-text="No results">
      <el-table-column
        label="ID"
        prop="id" align="left">
      </el-table-column>
      <el-table-column
        label="CID"
        prop="cid" align="left">
      </el-table-column>
      <el-table-column
        label="Number"
        prop="number" align="left">
      </el-table-column>
      <el-table-column
        label="SID"
        prop="sid" align="left">
      </el-table-column>
      <el-table-column
        label="Signed at"
        prop="signedAt" align="left">
      </el-table-column>
      <el-table-column
        label="Valid till"
        prop="validTill" align="left">
      </el-table-column>
    </el-table>
    <Pagination :pagination="pagination" @page-change="onPageChange"></Pagination>

    <ContractModal
      v-if="!!editableContract"
      :visible="!!editableContract"
      :contract="editableContract"
      @confirm="onConfirm"
      @cancel="onCancel"></ContractModal>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex';
  import Pagination from '../../components/Pagination/Pagination';
  import ContractModal from '../../components/ContractModal/ContractModal';

  const { mapState, mapActions } = createNamespacedHelpers('contracts');

  export default {
    name: 'Contracts',
    components: { ContractModal, Pagination },
    props: {
      company: {
        required: true,
        type: Object,
      },
    },
    computed: {
      ...mapState({
        items: state => state.list,
        pagination: state => state.pagination,
      }),
    },
    data() {
      return {
        /**
         * There is no need to have this object inside of store.
         * This is a contract, that will be edited,
         * so once the modal closes - I am just nulling this one.
         * Handleing that kind of state in a component, I think, is more than enough.
         */
        editableContract: null,
      };
    },
    methods: {
      ...mapActions([
        'loadAllByCompany',
        'updatePaginationPage',
        'updateContract',
      ]),
      onPageChange({ page }) {
        this.updatePaginationPage(page);
        this.loadAllByCompany(this.company.id);
      },
      onRowClick(row) {
        this.editableContract = row;
      },
      onConfirm({ contract }) {
        this.updateContract(contract);
        this.editableContract = null;
      },
      onCancel() {
        this.editableContract = null;
      },
    },
    mounted() {
      this.loadAllByCompany(this.company.id);
    },
    created() {
    },
    watch: {
      company(val) {
        this.loadAllByCompany(val.id);
      },
    },
  };
</script>

<style>
</style>
