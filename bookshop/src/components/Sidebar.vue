<template>
  <div id="sidebar">
    <b-sidebar id="sidebar-right" title="Shopping cart" right shadow>
      <div class="px-3 py-2">
        <p>
          Here is the list of the book you have chosen.
        </p>
        <ul id="item_selected">
        </ul>
        <div id="action bouton" class="inline">
          <b-button>Buy</b-button>
          <b-button class="ml-7">Clear</b-button>
        </div>
      </div>
    </b-sidebar>
  </div>
</template>