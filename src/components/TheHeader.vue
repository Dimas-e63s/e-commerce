<template>
   <header class="bg-black h-16 flex justify-between flex-row text-white">
     <div class="my-auto">
         <AppLink
           v-for="contact in headerTemplate.contacts"
           :key="contact.icon"
           :link="contact"
           class="ml-16 inline-block"
         />
     </div>
      <div class="my-auto mr-16">
          <AppLink
           v-for="contact in headerTemplate.media"
           :key="contact.icon"
           :link="contact"
           :prefix="headerTemplate.prefix"
         />
      </div>
   </header>
</template>

<script>
import {headerTemplate} from '@/utils/template.js'
import AppLink from '@/components/ui/AppLink.vue';
export default {
  components: {
    AppLink,
  },
  setup() {
    return {
      headerTemplate  
    }        
  }
}
</script>

<style lang="scss" scoped>

</style>