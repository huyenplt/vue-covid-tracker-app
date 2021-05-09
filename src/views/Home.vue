<template>
  <div class="container mx-auto">
    <main class="flex flex-col align-center justify-center" v-if="!loading">
      <DataTitle :text="title" :dataDate="dataDate"/>
      <DataBoxes :stats="stats"/>
      <CountrySelect @get-country="getCountryData" :countries="countries"/>
      <div class="mb-20">
        <button 
        @click="clearCountryData"
        v-if="stats.Country"
        class="bg-green-700 text-white rounded p-3 mt-5 focus:outline-none hover:bg-green-600">
        Clear Country
      </button>
      <div class="flex flex-col align-center justify-center text-center mb-10">
        <div class="md:w-1/2 sm:w-3/4 mx-auto">
          <BarChart :stats="stats"/>
          <p class="mt-10 text-gray-800 text-xs mb-10">The current number of people affected by covid-19</p>
          <LineChart 
            v-if="caseConfirmed.length > 0"
            :caseConfirmed = "caseConfirmed"
            :caseDeath = "caseDeath"
            :options="chartOptions"/> 
          <p v-if="caseConfirmed.length > 0" class="mt-10 text-gray-800 text-xs">The total global number of people effected by covid-19 from 01/2020 to 03/2021</p>
        </div>
      </div>
      </div>
    </main>

    <main class="flex flex-col align-center justify-center text-center" v-else>
      <div class="text-gray-500 text-3xl mt-10 mb-6">
        Fetching Data
      </div>
      <img :src="loadingImage" class="w-24 m-auto" alt="">
    </main>
  </div>
  
</template>

<script>
import moment from "moment";
import DataTitle from '@/components/DataTitle'
import DataBoxes from '@/components/DataBoxes'
import CountrySelect from '@/components/CountrySelect'
import BarChart from '@/components/BarChart'
import LineChart from '@/components/LineChart'

export default {
  name: 'Home',
  components: {
    DataTitle,
    DataBoxes,
    CountrySelect,
    BarChart,
    LineChart
  },
  data() {
    return {
      loading: true,
      title: 'Global',
      dataDate: '',
      stats: {},
      countries: [],
      loadingImage: require('../assets/hourglass.gif'),
      caseConfirmed: [],
      caseDeath: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    } 
  },
  methods: {
    // fetch data in summary
    async fetchCovidData() {
      // fetch data from api
      const res = await fetch('https://api.covid19api.com/summary')
      const data = await res.json()
      // console.log(data)
      return data
    },

    // fetch data in daily
    async fetchDailyData() {
      const res = await fetch('https://covid19.mathdro.id/api/daily')
      const data = await res.json()
      // console.log(data)
      return data
    },
    getCountryData(country) {
      this.stats = country
      this.title = country.Country
    },
    async clearCountryData() {
      this.loading = true
      const data = await this.fetchCovidData()
      this.title = 'Global'
      this.stats = data.Global
      this.loading = false
    },

  },
  async created() {
    // summary data
    const data = await this.fetchCovidData()
    this.dataDate = data.Date
    this.stats = data.Global
    this.countries = data.Countries
    this.loading = false

    // daily data
    const dailyData = await this.fetchDailyData()

    dailyData.forEach(d => {
      const date = moment(d.reportDate, "YYYYMMDD").format("MM/DD/YYYY");

      this.caseConfirmed.push({ date, total: d.totalConfirmed });
      this.caseDeath.push({ date, total: d.deaths.total });
    });
  }
}
</script>

<style scoped>

</style>
