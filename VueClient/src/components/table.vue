<template>
    <div class="ui container animated fadeIn">
        <div class="ui basic segment">
            <div class="ui two column grid">
                <div class="column">
                    <div class="ui header page-left-header">Crypto Currencies by volume traded over the past 24 hours</div>
                </div>
            </div>
        <div class="ui segment raised padded">
            <b-table :items="items" class="ui compact orange celled table selectable" cellspacing="0" width="100%"></b-table>
            <b-pagination size="md" align="center" :total-rows="100" v-model="currentPage" :per-page="10">
            </b-pagination>
        </div>
      </div>
    </div>

</template>

<script>
    export default {
        name: 'edit-Study',
        data() {
            return {
                pagename: 'About',
                currentPage: 1,
                per_page:10,
                total_rows:100,
                items : [
                  {
                    Rank: 1,
                    Name: 'Bitcoin',
                    Percentage: '32%'
                  }
                ]
            }
        }
    }
</script>
