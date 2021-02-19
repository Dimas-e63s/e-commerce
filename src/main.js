import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import camelCase from 'lodash.camelcase'
import upperFirst from 'lodash.upperfirst'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInstagram, faTwitter, faLinkedinIn, faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
import { faTimesCircle, faHeart } from '@fortawesome/free-regular-svg-icons'
import { faEnvelope, faPhone, faShoppingCart, faSearch, faExchangeAlt, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import rate from 'vue-rate'
import 'vue-rate/dist/vue-rate.css'
import './index.css'

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
  faAngleDoubleRight
  )

const requireComponent = require.context(
    './components',
    false,
    /App[A-Z]\w+\.(vue|js)$/
)

const app = createApp(App)

requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName)
  
    const componentName = upperFirst(
      camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
    )
  
    app.component(componentName, componentConfig.default || componentConfig)
})
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(store).use(router).use(rate).mount('#app')
