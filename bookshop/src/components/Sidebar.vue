<template>
  <div id="sidebar">
    <b-sidebar id="sidebar-right" title="Shopping cart" right shadow>
      <div id="listbooks" class="px-3 py-2">
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
        <b-button class="ml-7" @click="clear">Clear</b-button>
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
      successURL: 'https://iws107.informatik.htw-dresden.de/ewa/G09/Bookshop/',
      cancelURL: 'https://iws107.informatik.htw-dresden.de/ewa/G09/Bookshop/',
    };
  },
  methods: {
    clear(){
      // var list = document.getElementById('item_selected');
      // list.remove();
      // var listBooks = document.getElementById("listbooks");
      // var emptyList = document.createElement("ul");
      // emptyList.setAttribute('id', 'item_selected');
      // listBooks.appendChild(emptyList);
      document.getElementById("item_selected").innerHTML = "";
    },
    submit () {

      var a = 0
      var b = 0
      var c = 0
      this.lineItems= []

      if(document.getElementById('PHP-Kochbuch')){
        a=document.getElementById('PHP-Kochbuch').innerHTML;
        a=a.split(": ");
        a=parseInt(a[1]);
        this.lineItems.push(
            {
          price: 'price_1KGPlDCjyN8XrbQRmEVVv2BV', // The id of the PHP-Kochbuch
          quantity: a,
            }
        )
      }
      if(document.getElementById('Java-Kochbuch')){
        b=parseInt(document.getElementById('Java-Kochbuch').innerHTML);
        b=document.getElementById('Java-Kochbuch').innerHTML;
        b=b.split(": ");
        b=parseInt(b[1]);
        this.lineItems.push(
            {
              price: 'price_1KLX53CjyN8XrbQRAyoxMmMz', // The id of the Java-Kochbuch
              quantity: b,
            }
        )
      }
      if(document.getElementById('JavaScript-Frameworks')){
        c=parseInt(document.getElementById('JavaScript-Frameworks').innerHTML);
        c=document.getElementById('JavaScript-Frameworks').innerHTML;
        c=c.split(": ");
        c=parseInt(c[1]);
        this.lineItems.push(
            {
              price: 'price_1KLX60CjyN8XrbQRRiXPyzlY', // The id of the JavaScript-Frameworks
              quantity: c,
            }
        )
      }


      // You will be redirected to Stripe's secure checkout page
      this.$refs.checkoutRef.redirectToCheckout();
    },
  },
};
</script>