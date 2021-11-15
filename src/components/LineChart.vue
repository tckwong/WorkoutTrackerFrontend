// vue-ChartJS - cannot merge template tag and does not require
<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options', 'chartStateUpdate'],
  mounted () {
    // this.chartData is created in the mixin.
    this.renderChart(this.chartData, this.options)
  },
  watch: {
  // Watcher used to check for call to update chart
  chartStateUpdate () {
    this.$data._chart.update()
  }
}
}

</script>