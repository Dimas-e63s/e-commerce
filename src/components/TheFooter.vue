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
        <h4 class="footer__title font-poppins">{{ list.title }}</h4>
        <ul>
          <li v-for="link in list.children" :key="link.text">
            <router-link :to="link.url" class="footer__link font-roboto" href=""
              >{{ link.text }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer__copyright">
      <div class="footer__container container">
        <p class="footer__text">
          Copyright 2017 RenoshopBee all right reserved - Design by Bee
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import { headerTemplate, navbarTemplate } from '@/utils/template.js';
import AppLink from '@/components/ui/AppLink.vue';
export default {
  components: {
    AppLink
  },
  setup() {
    return {
      headerTemplate,
      navbarTemplate
    };
  }
};
</script>

<style lang="scss" scoped>
@import '@/_variables';

.footer {
  height: 4rem;
  border-width: 1px;

  &__media {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 4rem;

    @media (max-width: $breakpoint-tablet) {
      display: none;
    }
  }

  &__text,
  &__links-wrapper {
    margin: auto 0;

    @media (max-width: $breakpoint-tablet) {
      text-align: center;
    }
  }

  &__link {
    color: #000;
    margin-right: 1rem;
    display: inline-block;

    &:hover {
      text-decoration: underline;
    }
  }

  &__nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 5rem;

    @media (max-width: $breakpoint-tablet) {
      display: none;
    }
  }

  &__title {
    margin: 2rem 0;
  }

  &__copyright {
    background-color: #000;
  }

  &__container {
    display: flex;
    height: 4rem;
    color: #f5f5f5;

    @media (max-width: $breakpoint-tablet) {
      justify-content: center;
    }
  }
}
</style>
