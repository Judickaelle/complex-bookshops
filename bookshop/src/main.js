import Vue from 'vue'
import App from './App.vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//import { StripePlugin } from '@vue-stripe/vue-stripe';
// import VueStripeCheckout from 'vue-stripe-checkout';

// const options = {
//   pk: process.env.STRIPE_PUBLISHABLE_KEY,
//   stripeAccount: process.env.STRIPE_ACCOUNT,
//   apiVersion: process.env.API_VERSION,
//   locale: process.env.LOCALE,
// };

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

// Vue.use(VueStripeCheckout, "pk_test_51KGPIeCjyN8XrbQRcvM5dmjmZdniJmzmzL6JWYcqMwsPGSbc9mfuMCpR42rygY9VzBT3M2CW3C0tjg9P0fdvXjRR00ZoSpACmi");

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
