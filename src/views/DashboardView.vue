<template>
  <div class="body">
    <div class="title-box">
      <h1 class="title">Dashboard</h1>
    </div>
    <div class="summary-box">
      <div class="summary">
        <div class="icon-box">
          <i class="bi bi-cash-stack money-icon"></i>
        </div>
        <div class="summary-title">
          Today's interest
        </div>
        <div class="summary-value">
          {{ bookingInfos.total }}
        </div>
      </div>
      <div class="summary">
        <div class="icon-box">
          <i class="bi bi-bag-check checkin-icon"></i>
        </div>
        <div class="summary-title">
          This month checkin
        </div>
        <div class="summary-value">
          {{ bookingInfos.lastMonth }}
        </div>
      </div>
      <div class="summary">
        <div class="icon-box">
          <i class="bi bi-safe2 safe-icon"></i>
        </div>
        <div class="summary-title">
          This month interest
        </div>
        <div class="summary-value">
          {{ bookingInfos.lastMonthTotal }}
        </div>
      </div>
    </div>
    <div class="chart">
      <h2>Total booking of each month this year</h2>
      <div>
        <LineChart v-if="loaded" :chartData="LineChartData" :chartOptions="LineChartOptions" />
      </div>
      <h2>Interest of each month this year</h2>
      <div>
        <LineChart v-if="loaded" :chartData="BarChartData" :chartOptions="BarChartOptions" />
      </div>
    </div>
    <div>
      <h2>Income after expense</h2>
      <div>
        <LineChart v-if="loaded" :chartData="PieChartData" :chartOptions="PieChartOptions" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import axios from '../config'
import LineChart from '../components/LineChart.vue'

export default defineComponent({
  name: 'DashboardView',
  components: {
    LineChart
  },
  data() {
    return {
      loaded: false,
      LineChartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Booking',
            data: [],
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      LineChartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Booking'
            },
            ticks: {
              beginAtZero: true
            }
          },
          y: {
            min: 0,
            ticks: {
              stepSize: 1
            },
            title: {
              display: true,
              text: 'Month'
            }
          },
        },
        elements: {
          point: {
            backgroundColor: 'red'
          }
        }
      },
      BarChartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
          label: 'Income',
          data: [],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          type: 'bar'
        }]
      },
      BarChartOptions: {
        scales: {
          x: {
            title: {
              display: true,
            },
            ticks: {
              beginAtZero: true
            }
          },
          y: {
            title: {
              display: true,
              text: 'Month'
            }
          }
        }
      },
      PieChartData: {
        labels: ['Income', 'Employee salary', 'expense', 'tax'],
        datasets: [{
          backgroundColor: ['#41B883', '#E46651', '#00D8FF', 'rgb(114,64,109)'],
          data: [],
          type: 'pie',
          labels: ['Income', 'Employee salary', 'expense', 'tax'],
        }]
      },
      //make legend show all 4 labels
      PieChartOptions: {
        responsive: true,
        maintainAspectRatio: true,
      }
    }
  },


  setup() {
    const tableTitles = ref(['ID', 'Guest Name', 'Guest Number', 'Room ID', 'Checkin time'])
    const guestInfos = ref([])
    const checkinToday = ref()
    const bookingInfos = ref([])
    const incomeAndSalary = ref([])
    const getData = async () => {
      try {
        let results = await axios.get('dashboard')
        guestInfos.value = results.data.guestInfos
        bookingInfos.value = results.data.bookingInfos
      } catch (error) {
        console.log(error)
      }
    }

    getData()

    return {
      guestInfos,
      bookingInfos,
      incomeAndSalary,
      tableTitles,
      checkinToday
    }
  },

  async mounted() {
    this.loaded = false
    try {
      const bookingThisYear = await axios.get('dashboard/booking-this-year')
      this.LineChartData.datasets[0].data = bookingThisYear.data
      const interestThisYear = await axios.get('dashboard/interest-this-year')
      this.BarChartData.datasets[0].data = interestThisYear.data
      const IncomeAndSalary = await axios.get('dashboard/income-this-month')
      this.PieChartData.datasets[0].data = IncomeAndSalary.data
      this.loaded = true
    } catch (e) {
      console.error(e)
    }
  }

})

</script>

<style scoped>
@media (min-width: 426px) {
   .body {
     background-color: rgb(240, 240, 240);
     display: flex;
     flex-direction: column;
     padding: 20px;
     border-radius: 3px;
     min-height: 100%;
   }

   .summary-box {
     display: flex;
     justify-content: space-evenly;
     margin-top: 10px;
   }

   .summary {
     background-color: rgb(255, 255, 255);
     box-shadow: 5px 5px 5px 5px rgb(235, 234, 234);
     border-radius: 10px;
     width: 250px;
     padding: 15px
   }

   .summary-title {
     font-size: 10px;
     color: rgb(181, 181, 181);
      text-align: center;
   }

   .icon-box {
     font-size: 80px;
     text-align: center;
   }

   .money-icon {
     color: rgb(0, 255, 0);
   }

   .checkin-icon {
     color: rgb(255, 0, 0);
   }

   .chart {
     display: flex;
     flex-direction: column;
     gap: 20px;
     margin-top: 50px;
   }

   .safe-icon {
     color: rgb(252, 255, 64);
   }

   .summary-value {
     font-size: 30px;
     font-weight: bold;
      text-align: center;
   }
 }

 @media (max-width: 425px) {
   .body {
     background-color: rgb(240, 240, 240);
     display: flex;
     flex-direction: column;
     min-height: 100vh;
   }

   .summary-box {
     display: flex;
     flex-direction: column;
     justify-content: center;
     padding: 10px;
   }

   .summary {
     background-color: rgb(255, 255, 255);
     box-shadow: 5px 5px 5px 5px rgb(235, 234, 234);
     border-radius: 10px;
     width: 250px;
     padding: 15px;
     margin: 10px;
     align-self: center;
     width: 100%;
   }

   .icon-box {
     font-size: 50px;
     text-align: center;
   }

   .money-icon {
     color: rgb(0, 255, 0);
   }

   .checkin-icon {
     color: rgb(255, 0, 0);
   }

   .safe-icon {
     color: rgb(252, 255, 64);
   }

   .summary-value {
     font-size: 30px;
     font-weight: bold;
   }

   .summary-title {
     font-size: 10px;
     color: rgb(181, 181, 181);
   }
 }
</style>
