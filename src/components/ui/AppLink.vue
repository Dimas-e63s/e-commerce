<template>
  <a
    class="icon"
    rel="noopener"
    v-bind="$attrs"
    :aria-label="link.icon"
    :href="link.url"
    target="_blank"
  >
    <font-awesome-icon :icon="[prefix, link.icon]" size="lg" />
    <slot />
    <span v-if="link.text" class="icon__text">{{ link.text }}</span>
  </a>
</template>

<script>
export default {
  props: {
    link: {
      type: Object,
      required: true
    },
    prefix: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.icon {
  cursor: pointer;

  &__text {
    display: inline-block;
    margin-left: 0.5rem;
  }
}
</style>
