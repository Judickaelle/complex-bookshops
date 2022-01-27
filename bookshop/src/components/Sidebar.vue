<template>
  <div id="sidebar">
    <b-sidebar id="sidebar-right" title="Shopping cart" right shadow>
      <div class="px-3 py-2">
        <p>
          Here is the list of the book you have chosen.
        </p>
        <ul id="item_selected">
        </ul>
      </div>
      <div id="action bouton" class="inline">
        <stripe-checkout
            ref="checkoutRef"
            mode="payment"
            :pk="publishableKey"
            :line-items="lineItems"
            :success-url="successURL"
            :cancel-url="cancelURL"
            @loading="v => loading = v"
        />
        <b-button @click="submit">Pay now!</b-button>
        <b-button class="ml-7">Clear</b-button>
      </div>
    </b-sidebar>
  </div>
</template>

<script>

import { StripeCheckout } from '@vue-stripe/vue-stripe';

export default {
  components: {
    StripeCheckout,
  },
  data () {
    this.publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
    return {
      publishableKey: "pk_test_51KGPIeCjyN8XrbQRcvM5dmjmZdniJmzmzL6JWYcqMwsPGSbc9mfuMCpR42rygY9VzBT3M2CW3C0tjg9P0fdvXjRR00ZoSpACmi",
      loading: false,
      lineItems: [
        {
          price: 'price_1KGPlDCjyN8XrbQRmEVVv2BV', // The id of the one-time price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
      successURL: 'https://stackoverflow.com/questions/63079821/unknown-custom-element-vue-stripe-checkout-did-you-register-the-component-c',
      cancelURL: 'https://stackoverflow.com/questions/56571446/stripe-redirecttocheckout-method-redirects-to-successful-url-before-showing-any',
    };
  },
  methods: {
    submit () {
      // You will be redirected to Stripe's secure checkout page
      this.$refs.checkoutRef.redirectToCheckout();
    },
  },
};
</script>