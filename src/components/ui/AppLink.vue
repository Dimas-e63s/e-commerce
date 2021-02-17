<template>
   <a
     class="cursor-pointer"
     :href="link.url" 
     target="_blank">
     <font-awesome-icon :class="prefix ? 'mr-4' : ''" :icon="[prefix, link.icon]" size="lg"/>
     <slot/>
     <span 
       v-if="link.text"
       class="inline-block ml-2"
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
      type: String
    }
  }        
}
</script>

<style lang="scss" scoped>

</style>