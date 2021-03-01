import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faInstagram,
  faTwitter,
  faLinkedinIn,
  faFacebookSquare
} from '@fortawesome/free-brands-svg-icons';
import { faTimesCircle, faHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faEnvelope,
  faPhone,
  faShoppingCart,
  faSearch,
  faExchangeAlt,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faBars,
  faHeart as farHeart
} from '@fortawesome/free-solid-svg-icons';
import rate from 'vue-rate';
import 'vue-rate/dist/vue-rate.css';
import './index.scss';

library.add(
  faInstagram,
  faFacebookSquare,
  faLinkedinIn,
  faPhone,
  faTwitter,
  faEnvelope,
  faShoppingCart,
  faSearch,
  faTimesCircle,
  faHeart,
  faExchangeAlt,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  farHeart,
  faBars
);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);
app
  .use(store)
  .use(router)
  .use(rate)
  .mount('#app');
