<template>
   <header class="header">
     <div class="header__contact">
        <AppLink
          v-for="contact in headerTemplate.contacts"
          :key="contact.icon"
          :link="contact"
          class="header__link"
        />
     </div>
      <div class="header__media">
        <AppLink
          v-for="contact in headerTemplate.media"
          :key="contact.icon"
          :link="contact"
          :prefix="headerTemplate.prefix"
          class="header__link"
        />
      </div>
   </header>
</template>

<script>
import {headerTemplate} from '@/utils/template.js'
import AppLink from '@/components/ui/AppLink.vue'
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

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  height: 4rem;
  
  background: #000;
  color: #fff;
}

.header__contact {
  margin: auto 0;
  margin-left: 4rem;
}

.header__link {
  display: inline-block;
  color: #fff;
  margin-left: 1rem;
}

.header__media {
  margin: auto 0;
  margin-right: 4rem;
}
</style>