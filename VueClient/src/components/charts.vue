<template>
<div class="ui container animated fadeIn">
  <div class="ui header page-left-header">Volume traded by time of day</div>
  <line-chart  :data="data" xtitle="Time" ytitle="Percentage"/>
</div>
</template>

<script>
import axios from 'axios'
  export default {
    data() {
      return {
        data : []
      }
    },
    async created () {
      console.log("chart component created");
      var result = await this.getChartData();
      for(let i=0;i<result.data.length;i++){
        //console.log(result.data[i].name);
        var dummy={
          name:'',
          data:{}
        };
        dummy.name=result.data[i].name
        //console.log(result.data[i].history);
        for(let j=0;j<result.data[i].history.length;j++){
          //console.log(result.data[i].history[j].Timestamp);
          var d =new Date(result.data[i].history[j].Timestamp);
          var t=d.toLocaleTimeString()
          var p=result.data[i].history[j].percentage_value
          var item={
            t : p
          }
          dummy.data[t]=p
        }
        this.data.push(dummy);
      }
      console.log(this.data);
    },
    methods: {
      getChartData() {
        return new Promise((resolve, reject) => {
          axios.get('http://localhost:3000/analytics')
            .then(function(response) {
              resolve(response);
            })
            .catch(function(error) {
              console.log(error);
              reject(error)
            });
        });
      }
    }
  }
</script>
