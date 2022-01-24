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
        <b-table :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter" :filter-included-fields="filterOn" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection" stacked="md" show-empty small @filtered="onFiltered">
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
        <b-modal :id="addModal.id" :title="addModal.title" @hide="resetInfoModal">
            <pre>{{ addModal.content }}</pre>
        </b-modal>
    </b-container>
</template>

<script>
  export default {
    data() {
      return {
        items:[
            {"ID":"1","Produktcode":"001","Produkttitel":"PHP-Kochbuch","Autorname":"Lucas","Verlagsname":"","PreisNetto":"26.10800","Mwstsatz":"7","PreisBrutto":"24.40000","Lagerbestand":"745","Kurzinhalt":"Very interesting book about PHP","Gewicht":"800","LinkGrafik":"http:zsedthujio.com"},
            {"ID":"2","Produktcode":"002","Produkttitel":"Java-Kochbuch","Autorname":"Albers","Verlagsname":"","PreisNetto":"19.26000","Mwstsatz":"7","PreisBrutto":"18.00000","Lagerbestand":"15","Kurzinhalt":"Very interesting book about Java","Gewicht":"600","LinkGrafik":"http:zsedthujio-java.com"},
            {"ID":"3","Produktcode":"003","Produkttitel":"JavaScript-Frameworks","Autorname":"Jean","Verlagsname":"","PreisNetto":"41.73000","Mwstsatz":"7","PreisBrutto":"39.00000","Lagerbestand":"14","Kurzinhalt":"รงa fait cher\r\n","Gewicht":"1300","LinkGrafik":""}
        ],
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
          title: 'Add this book to cart',
          content: ''
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
    mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length
    },
    methods: {
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
        add(item, button){
            this.addModal.content = item.Produkttitel
            this.$root.$emit('bv::show::modal', this.addModal.id, button)
        },
        resetInfoModal() {
            this.infoModal.title = ''
            this.infoModal.content = ''
        },
    }
  }
</script>

<style>
    .p-20{
        padding: 1em 3em 0em 3em !important;
    }

    .pr-1{
        padding-right: 0.25em;
    }
</style>