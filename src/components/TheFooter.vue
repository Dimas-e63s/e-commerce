<template>
  <footer class="footer">
    <div class="container footer__media">
      <div class="footer__text text-roboto">
        We’re confident we’ve provided all the best for you. Stay conne
      </div>
      <div class="footer__links-wrapper">
        <AppLink
          v-for="contact in headerTemplate.media"
          :key="contact.icon"
          :link="contact"
          :prefix="headerTemplate.prefix"
          class="footer__link"
          />
      </div>
    </div>
    <div class="footer__nav container">
      <div  
        class="inline-block" 
        v-for="list in navbarTemplate"
        :key="list.title"
      >
        <h4 class="footer__title font-poppins">{{list.title}}</h4>
        <ul>
          <li 
            v-for="link in list.children" 
            :key="link.text">
              <router-link
                :to="link.url"
                class="footer__link font-roboto" 
                href="">{{ link.text }}
              </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer__copyright">   
      <div class="footer__container container">
        <p class="footer__text">Copyright 2017 RenoshopBee all right reserved  -  Design by Bee</p>
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

<style scoped>
.footer {
  height: 4rem;
  border-width: 1px;
}

.footer__media {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  height: 4rem;
}
.footer__text,
.footer__links-wrapper {
  margin: auto 0;
}

.footer__link {
  color: #000;
  margin-right: 1rem;
  display: inline-block;
}

.footer__link:hover {
  text-decoration: underline;
}

.footer__nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding-bottom: 5rem;
}

.footer__title {
  margin: 2rem 0;
}

.footer__copyright {
  background-color: #000;
}

.footer__container {
  display: flex;
  height: 4rem;

  color: #D1D5DB;
} 
</style>