<template>
  <el-form :model="value">
    <el-form-item label="Contract number" :label-width="formLabelWidth">
      <el-input
        v-model="value.number"
        autocomplete="off"
        @change="ev => onModelChange({number: ev})"
      ></el-input>
    </el-form-item>
    <el-form-item label="Signing date" :label-width="formLabelWidth">
      <el-input
        v-model="value.signedAt"
        autocomplete="off"
        @change="ev => onModelChange({signedAt: ev})"
      ></el-input>
    </el-form-item>
    <el-form-item label="End date" :label-width="formLabelWidth">
      <el-input
        v-model="value.validTill"
        autocomplete="off"
        @change="ev => onModelChange({validTill: ev})"
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'ContractForm',
    props: ['value'],
    data() {
      return {
        formLabelWidth: '120px',
      };
    },
    methods: {
      onModelChange(model) {
        this.$emit('input', {
          ...this.value,
          ...model,
        });
      },
    },
  };
</script>

<style>
</style>
