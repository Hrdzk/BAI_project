<script>
import { defineComponent } from "vue";
import { Pie } from "vue3-chart-v2";

export default defineComponent({
  name: "PieChart",
  extends: Pie,

  props: {
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
      required: false,
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.chartOptions);
  },
});
</script>