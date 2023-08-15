<template>
  <div class="body">
    <div class="title-box">
      <h1 class="title">Booking</h1>
      <div class="create-button-box">
        <router-link to="/create-booking">
          <button class="modify-button">Create booking</button>
        </router-link>
      </div>
      <br />
    </div>
    <DataTable :tableDatas="bookings" :tableTitles="tableTitles" :actionSubmit="'Checkin'" :actionDanger="'Delete'"
      :functionSubmit="checkin" :functionDanger="destroy" />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import axios from '../config';
import DataTable from '../components/DataTable.vue'

export default defineComponent({
  name: "BookingView",
  components: {
    DataTable,
  },

  setup() {
    const bookings = ref([]);
    const tableTitles = ref(['Booking id', 'Guest name', 'Guest number', 'Arrive date', 'Leave date', 'Room id', 'Checked'])

    /**
     * Get all bookings
     *
     * @return {void}
     */
    const getBooking = async () => {
      const response = await axios.get("booking");
      bookings.value = response.data;
    };

    /**
     * Checkin booking
     *
     * @param {int} id
     *
     * @return {void}
     */
    const checkin = async (id) => {
      console.log(id);
      try {
        const response = await axios.post("checked", {
          id: id,
        });
        console.log(response.data);
      } catch (error) {
        console.error(error.response.data);
      }
      getBooking();
    };

    /**
     * destroy a booking
     *
     * @param {*} id
     *
     * @return {void}
     */
    const destroy = async (id) => {
      console.log(id);
      try {
        const response = await axios.delete(
          "booking",
          {
            data: {
              id: id,
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error(error.response);
      }
      getBooking();
    };

    getBooking();

    return {
      checkin,
      destroy,
      bookings,
      tableTitles
    };
  },
});
</script>

<style scoped>

@media (min-width: 769px) {
  .body {
    background-color: rgb(240, 240, 240);
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 3px;
    height: 100%;
  }

  .table-box {
    border: 2px rgb(222, 222, 222) solid;
    border-radius: 15px;
    padding: 5px;
  }

  tr:nth-child(even) {
    background: rgb(224, 224, 224);
  }

  td:first-child {
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
  }

  td:last-child {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
  }

  .create-button-box {
    order: 2;
  }

  .create-button {
    border: none;
    border-radius: 30px;
    padding: 10px;
    background: #ff347f;
    color: white
  }

  .create-button:hover {
    background: #c9356c;
    color: white;
  }
}

@media (max-width:768px) {
  .body {
    background-color: rgb(240, 240, 240);
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .table-box {
    overflow: scroll;
  }

  th {
    padding: 10px
  }


  .create-button {
    border: none;
    border-radius: 30px;
    padding: 10px;
    background: #ff347f;
    color: white
  }

  .create-button-box {
    order: 1
  }

  tr:nth-child(even) {
    background-color: rgb(224, 224, 224);
  }

  td:first-child {
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
  }

  td:last-child {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
  }
}
</style>
