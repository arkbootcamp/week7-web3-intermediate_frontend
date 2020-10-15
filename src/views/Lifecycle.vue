<template>
  <div>
    <h1>Lifecycle Page</h1>
    <line-chart :data="{'2017-01-01': 11, '2017-01-02': 6}"></line-chart>
    <line-chart :data="chartData"></line-chart>
    <div class="overflow-auto">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        @click="numPage(currentPage)"
        aria-controls="my-table"
      ></b-pagination>

      <p class="mt-3">Current Page: {{ currentPage }}</p>
      <!-- <b-table
        id="my-table"
        :items="items"
        :per-page="perPage"
        :current-page="currentPage"
        small
      ></b-table>-->
      <video src="http://iandevlin.github.io/mdn/video-player/video/tears-of-steel-battle-clip-medium.mp4" width="50%" controls></video>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Lifecycle',
  data() {
    return {
      chartData: { '2017-01-01': 11, '2017-01-02': 6 },
      perPage: 3,
      currentPage: 1,
      items: [
        { id: 1, first_name: 'Fred', last_name: 'Flintstone' },
        { id: 2, first_name: 'Wilma', last_name: 'Flintstone' },
        { id: 3, first_name: 'Barney', last_name: 'Rubble' },
        { id: 4, first_name: 'Betty', last_name: 'Rubble' },
        { id: 5, first_name: 'Pebbles', last_name: 'Flintstone' },
        { id: 6, first_name: 'Bamm Bamm', last_name: 'Rubble' },
        { id: 7, first_name: 'The Great', last_name: 'Gazzoo' },
        { id: 8, first_name: 'Rockhead', last_name: 'Slate' },
        { id: 9, first_name: 'Pearl', last_name: 'Slaghoople' }
      ]
    }
  },
  computed: {
    rows() {
      return this.items.length
    }
  },
  updated() {
    console.log(this.currentPage)
  },
  mounted() {
    // this.$refs.videoRef.src = 'http://iandevlin.github.io/mdn/video-player/video/tears-of-steel-battle-clip-medium.mp4'
    // this.$refs.videoRef.pause()
  }
}
</script>
