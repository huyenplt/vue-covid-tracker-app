<script>
import { Bar } from "vue-chartjs";
export default {
    name: 'BarChart',
    extends: Bar,
    props: ['stats'],
    beforeUpdate() {
        console.log(this.stats.TotalConfirmed)
    },
    watch: {
        stats() {
            // console.log(this.stats.TotalConfirmed)
            this.renderChart(
            {
                labels: ['Inferted', 'Deaths', 'Recovered'],
                datasets: [
                {
                    label: 'People',
                    data: [this.stats.TotalConfirmed, this.stats.TotalDeaths, this.stats.TotalRecovered],
                    backgroundColor: ['#AAC9CE', '#B6B4C2', '#C9BBC8'],
                },
                ]
            }, this.options);

        }
    },
    mounted() {
        // console.log(this.stats.TotalConfirmed)
        this.renderChart(
        {
            labels: ['Inferted', 'Deaths', 'Recovered'],
            datasets: [
            {
                label: 'People',
                data: [this.stats.TotalConfirmed, this.stats.TotalDeaths, this.stats.TotalRecovered],
                backgroundColor: ['#AAC9CE', '#B6B4C2', '#C9BBC8'],
                fill: true
            },
            ]
        }, this.options);
    }
}
</script>