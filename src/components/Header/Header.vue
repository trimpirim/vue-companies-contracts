<template>
  <div class="header">
    <div class="header__logo">
      Logo
    </div>
    <div class="header__menu">
      <router-link :to="{name: 'Companies'}">
        <div class="header__menu__item">
          Companies
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    data() {
      return {};
    },
  };
</script>

<style scoped lang="scss">
  .header {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;

    &__menu {
      &__item {
        cursor: pointer;
      }
    }
  }
</style>
