<template>
  <a
    class="icon"
    v-bind="$attrs"
    :href="link.url" 
    target="_blank">
    <font-awesome-icon :icon="[prefix, link.icon]" size="lg"/>
    <slot/>
    <span 
      v-if="link.text"
      class="icon__text"
    >{{ link.text }}</span>
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
}
</script>

<style scoped>
.icon {
  cursor: pointer;
}

.icon__text {
  display: inline-block;
  margin-left: 0.5rem;
}
</style>