<template>
  <div class="w-75 mx-auto">
    <BarChart
      v-if="this.state.loaded"
      v-bind:chartData="this.state.chartData"
      v-bind:chartOptions="this.state.chartOptions"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import BarChart from "./BarChart";

export default defineComponent({
  name: "AuthorBarChart",
  components: { BarChart },
  props: ["results"],
  data() {
    return {
      api: "https://my.api.mockaroo.com",
      api_key: "febc6e00",
      state: {
        labels: [],
        loaded: false,
        values: [],
        chartData: {},
        chartOptions: {
          responsive: true,
          title: {
            display: true,
            text: "Rate Of Books",
            fontColor: "white",
            fontSize: 27,
          },
          legend: {
            labels: {
              fontColor: "white",
              fontSize: 18,
            },
          },
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    fontColor: "white"
                },
            }],
          xAxes: [{
                ticks: {
                    fontColor: "white"
                },
            }]
        } 
        },
      },
    };
  },
  methods: {
    getData() {
      this.results.forEach((element) => {
        this.state.labels.push(element.book.title);
        this.state.values.push(element.rate.average);
        console.log(this.state.labels);
      });

      this.state.chartData = {
        labels: this.state.labels,
        datasets: [
          {
            data: this.state.values,
            label: "Film",
            backgroundColor: ["red", "blue", "green", "yellow", "black", "cyan", "magenta", "white", "orange", "darkblue"],
            borderColor: "#80b6f4",
            pointBorderColor: "#80b6f4",
            pointBackgroundColor: "#80b6f4",
            pointHoverBackgroundColor: "#80b6f4",
            pointHoverBorderColor: "#80b6f4",
            pointBorderWidth: 10,
            pointHoverRadius: 10,
            pointHoverBorderWidth: 1,
            pointRadius: 3,
            fill: false,
            borderWidth: 1,
          },
        ],
      };
      this.state.loaded = true;
    },
   
  },
  beforeMount() {
    this.getData();
  },
});
</script>  