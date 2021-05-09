<script>
import { Line } from "vue-chartjs";
export default {
  name: 'LineChart',
  extends: Line,
  props: ['caseConfirmed', 'caseDeath'],
  mounted() {
    const dates = this.caseConfirmed.map(d => d.date)
    const data1 = this.caseConfirmed.map(d => d.total)
    const data3 = this.caseDeath.map(d => d.total)
    this.renderChart(
      {
        labels: dates,
        datasets: [
          {
            label: 'Infected',
            data: data1,
            borderColor: "#077187",
            // backgroundColor: "#74A57F",
            fill: true
          },
          {
            label: 'Death',
            data: data3,
            borderColor: "#E55381",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true
          }
        ]
      },
      this.options
    );

  }
}
</script>