<template>
    <b-container id="body" class="p-20" fluid>
    <!-- User Interface controls -->
        <b-row>
            <b-col lg="6" class="my-1">
                <b-form-group label="Sort" label-for="sort-by-select" label-cols-sm="3" label-align-sm="right" label-size="sm" class="mb-0" v-slot="{ ariaDescribedby }">
                <b-input-group size="sm">
                    <b-form-select id="sort-by-select" v-model="sortBy" :options="sortOptions" :aria-describedby="ariaDescribedby" class="w-75">
                        <template #first>
                            <option value="">-- none --</option>
                        </template>
                    </b-form-select>

                    <b-form-select v-model="sortDesc" :disabled="!sortBy" :aria-describedby="ariaDescribedby" size="sm" class="w-25">
                        <option :value="false">Asc</option>
                        <option :value="true">Desc</option>
                    </b-form-select>
                </b-input-group>
                </b-form-group>
            </b-col>

            <b-col lg="6" class="my-1">
                <b-form-group label="Initial sort" label-for="initial-sort-select" label-cols-sm="3" label-align-sm="right" label-size="sm" class="mb-0">
                    <b-form-select  id="initial-sort-select" v-model="sortDirection" :options="['asc', 'desc', 'last']" size="sm">
                    </b-form-select>
                </b-form-group>
            </b-col>

            <b-col lg="6" class="my-1">
                <b-form-group label="Filter" label-for="filter-input" label-cols-sm="3" label-align-sm="right" label-size="sm" class="mb-0">
                    <b-input-group size="sm">
                        <b-form-input id="filter-input" v-model="filter" type="search" placeholder="Type to Search">
                        </b-form-input>

                        <b-input-group-append>
                            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
            </b-col>

            <b-col lg="6" class="my-1">
                <b-form-group v-model="sortDirection" label="Filter On" description="Leave all unchecked to filter on all data" label-cols-sm="3" label-align-sm="right" label-size="sm" class="mb-0" v-slot="{ ariaDescribedby }">
                    <b-form-checkbox-group v-model="filterOn" :aria-describedby="ariaDescribedby" class="mt-1">
                        <b-form-checkbox value="Produkttitel">Book title</b-form-checkbox>
                        <b-form-checkbox value="Autorname">Author</b-form-checkbox>
                    </b-form-checkbox-group>
                </b-form-group>
            </b-col>

            <b-col sm="5" md="6" class="my-1">
                <b-form-group label="Per page" label-for="per-page-select" label-cols-sm="6" label-cols-md="4" label-cols-lg="3" label-align-sm="right" label-size="sm" class="mb-0">                    
                    <b-form-select id="per-page-select" v-model="perPage" :options="pageOptions" size="sm">
                    </b-form-select>
                </b-form-group>
            </b-col>

            <b-col sm="7" md="6" class="my-1">
                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" size="sm" class="my-0" >
                </b-pagination>
            </b-col>
        </b-row>

        <!-- Main table element -->
        <b-table :busy.sync="isBusy" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter" :filter-included-fields="filterOn" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection" stacked="md" show-empty small @filtered="onFiltered">

            <template #cell(Produkttitel)="row">
                {{ row.value }}
            </template>

            <template #cell(actions)="row">
                <b-button size="sm pr-1" @click="row.toggleDetails" class="ml-7">
                {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
                </b-button>
                <b-button @click="add(row.item, $event.target)" size="sm pr-1" class="ml-7">Add to cart</b-button>
            </template>

            <template #row-details="row">
                <b-card>
                <ul>
                    <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
                </ul>
                </b-card>
            </template>
        </b-table>

        <!-- Add to cart modal -->
        <b-modal :id="addModal.id" title="Add this book to cart">
            <div id="body-modal">
                <div class="inline">
                        <div >{{ addModal.content }}</div>
                        <div class="quantity-toggle right-align ml-7">
                            <button @click="decrement()">&mdash;</button>
                            <input type="text" :value="quantity" readonly>
                            <button @click="increment()">&#xff0b;</button>
                            <b-button class="ml-7" @click="addCart(addModal.info, quantity)">Add to cart</b-button>
                        </div>
                </div>
                <b-alert v-model="showSuccessAlert" variant="success" class="mt">Your cart has been updated</b-alert>
            </div>
            <template #modal-footer="{ cancel }">
                 <b-button variant="outline-danger" @click="cancel()">Close</b-button>
            </template>
        </b-modal>
    </b-container>
</template>


<script>
import axios from 'axios'
  //const axios = require('axios').default;
  export default {
    data() {
      return {
        isBusy: false,
        showSuccessAlert: false,
        quantity: 1,
        items: [],
        fields: [
          { key: 'Produkttitel', label: 'Book title', sortable: true, sortDirection: 'desc' },
          { key: 'Autorname', label: 'Author', sortable: true, sortDirection: 'desc', class: 'text-center' },
          { key: 'actions', label: 'Actions' }
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
        addModal: {
          id: 'info-modal',
          content: '',
          info: ''
        }
      }
    },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
    mounted () {
        // get all the records available
        this.allRecords();
        // Set the initial number of items
        this.totalRows = this.items.length
        console.log("I am mounted")
        
    },
    methods: {
        allRecords: async function () {
          //getAllRecord(){
          this.isBusy = true
          var allData
          await axios.get('src/config.php')
              .then(function (response) {
                allData = response.data;
              })
              .catch(function (error) {
                this.isBusy = false
                console.log(error);
              });
          this.isBusy = false
          this.items = allData;
          //return allData;
        },
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
        add(item, button){
            this.showSuccessAlert = false
            this.addModal.content = item.Produkttitel
            this.addModal.info = JSON.stringify(item, null, 2)
            this.$root.$emit('bv::show::modal', this.addModal.id, button)
        },
        increment () {
            this.quantity++
        },
        decrement () {
            if(this.quantity === 1) {
                alert('Negative quantity not allowed')
            } else {
                this.quantity--
            }
        },
        addCart(item, quantity){
            //write in the sidebar the book title and the choosen quantity
            //PREVOIR DE FERMEER LE MODAL 
           try {
              var book = JSON.parse(item);
              var ul = document.getElementById("item_selected");

              if (!document.getElementById(book.Produkttitel)) {
                var li = document.createElement("li");
                li.setAttribute('id', book.Produkttitel);
                li.appendChild(document.createTextNode(book.Produkttitel + " | quantity : " + quantity));
                ul.appendChild(li);
                this.showSuccessAlert = true;
              } else {
                var liBook=document.getElementById(book.Produkttitel).innerHTML;
                var nBook=liBook.split(": ");
                nBook=parseInt(nBook[1])+parseInt(quantity);
                document.getElementById(book.Produkttitel).innerHTML = book.Produkttitel + " | quantity : " + nBook;
                //li.appendChild(document.createTextNode(book.Produkttitel + " | quantity : " + nBook));

              }

            } catch (ex) {
              console.error(ex);
            }
        }
    },
  }
</script>

<style>
    .p-20{
        padding: 1em 3em 0em 3em !important;
    }

    .mt{
        margin-top: 2em;
    }

    .pr-1{
        padding-right: 0.25em;
    }

    .quantity-toggle {
        display: flex;
    }

    input {
        border: 0;
        border-top: 2px solid #ddd;
        border-bottom: 2px solid #ddd;
        width: 2.5rem;
        text-align: center;
        padding: 0 .5rem;
    }
    
    button {
        border: 2px solid #ddd;
        padding: .5rem;
        background: #f5f5f5;
        color: #888;
        /*font-size:*/
    }
</style>