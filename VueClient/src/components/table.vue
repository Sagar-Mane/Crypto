<template>
<div class="ui container animated fadeIn">
  <div class="ui basic segment">
    <div class="ui two column grid">
      <div class="column">
        <div class="ui header page-left-header">Crypto Currencies by volume traded over the past 24 hours</div>
      </div>
      <div>
</div>
    </div>

    <div class="ui segment raised padded">
      <b-row>
        <b-col md="4" class="my-1">
          <b-form-group horizontal label="Per page" class="mb-0">
            <b-form-select :options="pageOptions" v-model="perPage" />
          </b-form-group>
        </b-col>
        <b-col md="4" class="my-1">
          <b-form-group horizontal label="Filter" class="mb-0">
            <b-input-group>
              <b-form-input v-model="filter" placeholder="Type to Search" />
              <b-input-group-append>
                <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-table :per-page="perPage" :filter="filter" @filtered="onFiltered" :current-page=currentPage :items=items class="ui compact orange celled table selectable" cellspacing="0" width="100%"></b-table>
      <b-pagination size="md" align="center" :total-rows="total_rows" v-model="currentPage" :per-page="perPage">
      </b-pagination>

    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'table',
  data() {
    return {
      pagename: 'About',
      currentPage: 1,
      perPage: 5,
      total_rows: null,
      pageOptions: [5, 10, 15],
      filter: null,
      items: []
    }
  },
  async created() {
    console.log('table component created')
    var response = await this.getData(1);
    console.log("Total Records = ", response.data.Total_records);
    this.total_rows = response.data.Total_records;
    for (let i = 0; i < response.data.data.length; i++) {
      var item = {
        'Rank': i + 1,
        'Name': Object.keys(response.data.data[i]).toString(),
        'Percentage': Object.values(response.data.data[i]).toString()
      }
      this.items.push(item);
    }
  },
  methods: {
    getData(page) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/cryptoByVolumeTradedPast24Hours?page=' + page)
          .then(function(response) {
            resolve(response);
          })
          .catch(function(error) {
            console.log(error);
            reject(error)
          });
      });
    },
    onFiltered(filteredItems) {
      console.log('filtering')
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>
