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
          price: 'price_1KGPlDCjyN8XrbQRmEVVv2BV', // The id of the PHP-Kochbuch
          quantity: 1,
        },
        {
          price: 'price_1KLX53CjyN8XrbQRAyoxMmMz', // The id of the Java-Kochbuch
          quantity: 1,
        },
        {
          price: 'price_1KLX60CjyN8XrbQRRiXPyzlY', // The id of the JavaScript-Frameworks
          quantity: 1,
        },
      ],
      successURL: 'http://localhost:8080',
      cancelURL: 'http://localhost:8080',
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