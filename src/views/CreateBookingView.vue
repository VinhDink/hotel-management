<template>
  <div class="body">
    <div class="title-box">
      <h1 class="title">Create Booking</h1>
    </div>
    <div class="input-box">
      <div class="input-box-content">
        <form @submit.prevent="checkAvailability()" class="">
          <div class="input-title-box">
            Enter information
          </div>
          <div class="error">
            {{ errorValue }}
          </div>
          <div class="detail-modal" id="modal">
            <div class="modal-content h-400px">
              <div class="modal-header">
                <span>Create booking</span>
                <span class="close" @click="closeModal">&times;</span>
              </div>
              <div class="file-box mt-4">
                <form class="booking-form" @submit.prevent="addBooking">
                  <div class="">
                    <label for="guest_name" class="">Guest Name</label>
                    <div class="">
                      <input type="text" id="guest_name" v-model="guest_name" name="guest_name" class="input">
                    </div>
                  </div>
                  <div class="">
                    <label for="guest_number" class="">Guest Number</label>
                    <div class="">
                      <input type="text" id="guest_number" v-model="guest_number" name="guest_number" class="input">
                    </div>
                  </div>
                  <div>
                    <label for="room" class="">Room</label>
                    <div>
                      <select class="input" name="room" id="room" v-model="room_id">
                        <option v-for="room in availableRoom" :key="room.id" :value="room.id" >
                          {{ room.name }} 
                        </option>
                      </select>
                    </div>
                    <button type="submit" class="submit-button h-50px mt-3 w-100">
                    <i class="bi bi-check-circle"></i> Submit
                  </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="">
            <label for="arrive_date" class="">Arrive date</label>
            <div class="">
              <input type="date" id="arrive_date" v-model="arrive_date" name="arrive_date" class="input">
            </div>
          </div>
          <div class="">
            <label for="leave_date" class="">Leave date</label>
            <div class="">
              <input type="date" id="leave_date" v-model="leave_date" name="leave_date" class="input">
            </div>
          </div>
          <button type="submit" class="submit-button w-100 mt-3">
            <i class="bi bi-check-circle"></i> Check
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'
import axios from '../config'
import router from '@/router'

export default defineComponent({
  name: "CreateBookingView",
  setup() {
    const guest_name = ref('')
    const guest_number = ref('')
    const arrive_date = ref('')
    const leave_date = ref('')
    const room_id = ref('')
    const deviceWidth = ref(window.innerWidth)
    const availableRoom = ref('')
    const err = ref('')
    /**
     * Add booking
     * 
     * @return {void}
     */
    const addBooking = async () => {
      try {
        const userId = (await axios.post('auth/me')).data.id
        await axios.post('booking/create-booking', {
          guest_name: guest_name.value,
          guest_number: guest_number.value,
          arrive_date: arrive_date.value,
          room_id: room_id.value,
          leave_date: leave_date.value,
          guest_id: userId
        })
        router.push({ name: 'Booking' })
      } catch (error) {
        err.value = error.response.data.message
        console.log(err.value)
      }
    }

    const showAvailableRoom = async (id) => {
      try {
        let response = await axios.post('booking/show-available-room', {
          id
        })
        availableRoom.value = response.data
      } catch (error) {
        err.value = error.response.data.message
        console.log(err.value)
      }
    }

    const openModal = () => {
      document.getElementById('modal').style.display = 'block'
    }

    const closeModal = () => {
      document.getElementById('modal').style.display = 'none'
    }


    const checkAvailability = async () => {
      try {
        let response = await axios.post('booking/check-availability', {
          arrive_date: arrive_date.value,
          leave_date: leave_date.value
        })
        showAvailableRoom(response.data)
        openModal()
      } catch (error) {
        err.value = error.response.data.message
        console.log(err.value)
      }
    }

    return {
      guest_name,
      guest_number,
      arrive_date,
      room_id,
      leave_date,
      addBooking,
      deviceWidth,
      openModal,
      closeModal,
      err,
      checkAvailability,
      availableRoom
    }
  },

  computed: {
    errorValue() {
      return this.err;
    }
  }
})
</script>

<style scoped>
.h-50px {
  height: 50px;
}

.h-400px {
  height: 400px;
}

.booking-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.modal-header {
  display: flex;
  color: white;
  font-size: 25px;
  font-weight: bold;
  width: 100%;
  padding: 15px;
  background-color: #18d6dc;
}

@media (min-width: 769px) {
  .input-title-box {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 40px;
  }

  .error {
    color: red;
    font-weight: bold;
  }

  .body {
    background-color: rgb(240, 240, 240);
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 3px;
    height: 100%;
  }


  .input-box-content {
    display: flex;
    background-color: white;
    justify-content: space-between;
    height: 100%;
    justify-content: center;
    padding: 50px;
    padding-left: 100px;
    padding-right: 100px;
    border: none;
    border-radius: 3px;
    box-shadow: 5px 5px 5px 5px #d5d5d5;
  }

  .input-box {
    margin-top: 40px;
    padding: 20px;
    display: flex;
    justify-content: center;
  }

  .input {
    border: none;
    background-color: rgb(240, 240, 240);
    border-radius: 3px;
    width: 300px;
    height: 50px;
  }
}

@media (max-width: 768px) {

  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    /* 15% from the top and centered */
    border: 1px solid #888;
    max-width: 800px;
    min-height: 500px;

    /* Could be more or less, depending on screen size */
}
  .input-title-box {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 40px;
  }

  .body {
    background-color: rgb(240, 240, 240);
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .input-box {
    margin-top: 40px;
    padding: 20px;
    display: flex;
    justify-content: center;
  }

  .input-box-content {
    display: flex;
    background-color: white;
    justify-content: space-between;
    height: 100%;
    min-width: 100%;
    justify-content: center;
    border: none;
    border-radius: 3px;
    padding: 50px;
    box-shadow: 5px 5px 5px 5px #d5d5d5;
  }

  .error {
    color: red;
    font-weight: bold;
  }

  .input {
    border: none;
    background-color: rgb(240, 240, 240);
    border-radius: 3px;
    width: 250px;
    height: 50px;
    margin-bottom: 20px;
  }

  .submit-button {
    border: none;
    background: #93e4c1;
    color: white;
    border-radius: 3px;
    width: 250px;
    height: 50px;
    margin-top: 20px;
  }

}
</style>
