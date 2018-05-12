<template>
    <div class="ui container animated fadeIn">
        <div class="ui basic segment">
            <div class="ui two column grid">
                <div class="column">
                    <div class="ui header page-left-header">Crypto Currencies by volume traded over the past 24 hours</div>
                </div>
            </div>
        <div class="ui segment raised padded">
            <b-table :perPage=per_page :current-page=currentPage :items=items class="ui compact orange celled table selectable" cellspacing="0" width="100%"></b-table>
            <b-pagination @input="pageChange(currentPage)" size="md" align="center" :total-rows="total_rows" v-model="currentPage" :per-page="per_page">
            </b-pagination>
        </div>
      </div>
    </div>

</template>

<script>
import axios from 'axios'
    export default {
        name: 'edit-Study',
        data() {
            return {
                pagename: 'About',
                currentPage: 1,
                per_page:10,
                total_rows:null,
                items : [
                ]
            }
        },
        async created () {
          console.log('table component created')
          var response = await this.getData(1);
          this.total_rows = response.data.Total_records;
          for(let i=0;i<response.data.data.length;i++){
            var item ={
              'Rank': i+1,
              'Name': Object.keys(response.data.data[i]).toString(),
              'Percentage':Object.values(response.data.data[i]).toString()
            }
            this.items.push(item);
          }
        },
        methods: {
          async pageChange (currentPage) {
            console.log('page changed', currentPage);
            var response = await this.getData(currentPage);
            //console.log(10*(currentPage-1)+1)
            //console.log((10*(currentPage-1)+1)+10)
            console.log(response);
            var start = 10*(currentPage-1)+1;
            var end = (10*(currentPage-1)+1)+10;
            console.log('start= ', start);
            console.log('end= ',end);
            for(let i=start ; i<end ; i++){
              console.log(i)
              var item ={
                'Rank': i,
                'Name': Object.keys(response.data.data[i]).toString(),
                'Percentage':Object.values(response.data.data[i]).toString()
              };
              console.log("test", item);
              this.items.push(item);
            }
          },
          getData (page) {
            console.log(page)
            return new Promise((resolve, reject) => {
              axios.get('http://localhost:3000/cryptoByVolumeTradedPast24Hours?page=' + page )
              .then(function (response) {
                //console.log(response);
                resolve (response);
              })
              .catch(function (error) {
                console.log(error);
                reject(error)
              });
            });
          }
        }
    }
</script>
