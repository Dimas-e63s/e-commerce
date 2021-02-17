<template>
   <footer class="border h-16">
    <div class="container flex flex-row justify-between h-full">
        <div class="my-auto text-roboto">
            We’re confident we’ve provided all the best for you. Stay conne
        </div>
        <div class="my-auto">
            <AppLink
            v-for="contact in headerTemplate.media"
            :key="contact.icon"
            :link="contact"
            :prefix="headerTemplate.prefix"
            class="text-black inline-block"
            />
        </div>
    </div>
    <div class="container flex flex-row align-center justify-between pb-20">
        <div  
          class="inline-block" 
          v-for="list in navbarTemplate"
          :key="list.title"
        >
        <h4 class="my-8 font-poppins">{{list.title}}</h4>
        <ul>
            <li 
              v-for="link in list.children" 
              :key="link.text">
              <router-link
                :to="link.url"
                class="text-black font-roboto mb-2 inline-block hover:underline" 
                href="">{{ link.text }}</router-link></li>
        </ul>
        </div>
    </div>
    <div class="bg-black">   
        <div class="container text-gray-300 h-16 flex ">
            <p class="my-auto">
                Copyright 2017 RenoshopBee all right reserved  -  Design by Bee
            </p>
        </div>
    </div>
   </footer>
</template>

<script>
import {headerTemplate, navbarTemplate} from '@/utils/template.js'
import AppLink from '@/components/ui/AppLink.vue'
export default {
  components: {
    AppLink,
  },
  setup() {
    return {
      headerTemplate,
      navbarTemplate
    }
  }    
}
</script>