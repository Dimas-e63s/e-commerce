<template>
  <div class="mb-24 text-center">
    <h2 class="mb-8"><slot /></h2>
    <router-link custom v-slot="{ navigate }" to="/">
      <button @click="navigate" class="button button--anim">
        Go to Shop
      </button>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
