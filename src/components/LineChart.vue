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
  chartStateUpdate () {
    this.$data._chart.update()
  }
}
}

</script>