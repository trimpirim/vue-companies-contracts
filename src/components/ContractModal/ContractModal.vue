<template>
  <el-dialog title="Edit contract" :visible.sync="visible">
    <ContractForm v-model="modified" v-if="contract"></ContractForm>
    <span slot="footer" class="dialog-footer">
    <el-button @click="onCancel">Cancel</el-button>
    <el-button type="primary" @click="onConfirm">Confirm</el-button>
  </span>
  </el-dialog>
</template>

<script>
  import ContractForm from '../ContractForm/ContractForm';

  export const ON_COFIRM_EVENT_NAME = 'confirm';
  export const ON_CANCEL_EVENT_NAME = 'cancel';

  export default {
    name: 'ContractModal',
    components: { ContractForm },
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      contract: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        modified: null,
      };
    },
    methods: {
      onConfirm() {
        this.$emit(ON_COFIRM_EVENT_NAME, { contract: this.modified });
      },
      onCancel() {
        this.$emit(ON_CANCEL_EVENT_NAME, { contract: this.contract });
      },
    },
    mounted() {
      this.modified = { ...this.contract };
    },
  };
</script>

<style>
</style>
