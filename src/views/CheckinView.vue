<template>
  <div class="body">
    <div class="title-box">
      <h1 class="title">Checkin</h1><br>
      <div class="">
        <button class="modify-button" @click="exportData()">Export data</button>
      </div>
    </div>
    <DataTable :tableDatas="checkins" :tableTitles="tableTitles" :actionModify="'Checkout'" :actionDetail="'View detail'"
      :actionDanger="'Delete'" :actionSubmitInput="'Add fee'" :functionModify="checkout" :functionDetail="viewDetail"
      :functionDanger="destroy" :functionSubmitInput="addFee"></DataTable>
    <DetailInfo :datas="CheckinDetail"></DetailInfo>
  </div>
</template>

<script>
import { defineComponent, ref, } from 'vue'
import axios from '../config'
import DetailInfo from '../components/DetailInfo.vue'
import DataTable from '../components/DataTable.vue'

export default defineComponent({
  name: 'CheckinView',
  components: {
    DetailInfo,
    DataTable
  },
  data() {
    return {
      fee: {}
    }
  },

  setup() {

    const tableTitles = ref([
      'Checkin ID',
      'Booking ID',
      'Guest name',
      'Checkin Time',
      'Checkout Time',
      'Fee',
      'Total Price'
    ])
    const checkins = ref();
    /**
     * Get all checkins
     * 
     * @return {void}
     */
    const getCheckin = async () => {
      const response = await axios.get('checkin')
      checkins.value = response.data
    }

    /**
     * Checkin a booking
     * 
     * @param {number} id
     * @param {number} bookingId
     * 
     * @return {void}
     */
    const checkout = async (id, bookingId) => {
      console.log(id, bookingId)
      try {
        const response = await axios.post('checked/checkout', {
          id: id,
          bookingId: bookingId
        })
        console.log(response.data);
      } catch (error) {
        console.error(error.response.data)
      }
      getCheckin()
    }

    /**
     * Delete a checkin
     * 
     * @param {number} id
     * 
     * @return {void}
     */
    const destroy = async (id) => {
      try {
        const response = await axios.delete('checkin/checkin', {
          data: {
            id: id
          }
        })
        console.log(response.data);
      } catch (error) {
        console.error(error.response.data)
      }
      getCheckin()
    }

    /**
     * View detail of a checkin
     * 
     * @param {number} employeeId
     * @param {number} bookingId
     * 
     * @return {void}
     */
    const CheckinDetail = ref([]);

    const viewDetail = async (checkinId, bookingId) => {
      try {
        const response = await axios.post('checkin/checkin-detail', {
          checkinId: checkinId,
          bookingId: bookingId
        })
        CheckinDetail.value = {
          'Guest name': response.data[0].guest_name,
          'Guest number': response.data[0].guest_number,
          'Booked time': response.data[0].created_at,
          'Employee id': response.data[1].id,
          'Employee name': response.data[1].name,
          'Employee role': response.data[1].role,
        }
        console.log(response.data)
        document.getElementById('detail-modal').style.display = 'block'
      } catch (error) {
        console.error(error)
      }
    }

    const closeModal = () => {
      document.getElementById('detail-modal').style.display = 'none'
    }

    /**   
    * Add fee to a checkin
    * 
    * @param {number} id
    * 
    * @return {void}
    */

    const addFee = async (id, fee) => {
      try {
        console.log(id, fee)
        const response = await axios.post('checked/addFee', {
          id: id,
          fee: fee
        })
        console.log(response.data)
        getCheckin()
      } catch (error) {
        console.error(error.response.data)
      }
    }

    const exportData = async () => {

      try {
        axios({
          method: 'GET',
          url: 'checkin/export',
          responseType: 'blob',
        }).then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'data.csv'); // Specify the filename
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
      } catch (error) {
        console.error(error.response.data)
      }
    }

    getCheckin()

    return {
      checkins,
      exportData,
      checkout,
      destroy,
      getCheckin,
      viewDetail,
      closeModal,
      addFee,
      tableTitles,
      CheckinDetail
    }
  },
})
</script>

<style scoped>
.test {
  max-width: 90%;
}

@media (min-width: 426px) {
  .fee {
    padding: 5px;
  }

  .body {
    background-color: rgb(240, 240, 240);
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 3px;
    height: 100%;
    width: 86vw;
  }
}

@media (max-width:768px) {

  .body {
    background-color: rgb(240, 240, 240);
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .submit-button {
    border: none;
    background: #93e4c1;
    color: white;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .fee {
    width: 100px;
    border: none;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    padding: 5px;
  }
}
</style>
