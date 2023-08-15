<template>
  <div class="body">
    <form @submit.prevent="submitForm" class="login-form-box">
      <div class="input-form">
        <div class="input-title">Login</div>
        <div class="error">
          {{ errors }}
        </div>
        <div class="input-box">
          <div for="username" class="input-label">Username</div>
          <input type="text" id="username" name="username" v-model="username" class="input">
        </div>
        <div class="input-box">
          <div for="password" class="input-label">Password</div>
          <input type="password" id="password" name="password" v-model="password" class="input">
        </div>
        <button type="submit" class="login-button">Login</button>
        <div class="forgot-password" @click="openImportModal">Forgot password?</div>
      </div>
    </form>
    <div>
    </div>
    <div class="detail-modal" id="import-modal">
      <div class="modal-content">
        <div class="modal-header">
          <span>Forgot password</span>
          <span class="close" @click="closeImportModal">&times;</span>
        </div>
        <div class="file-box">
          <div class="success" :class="{'hidden': success}">Please check your email</div>
          <form @submit.prevent="forgotPassword()">
            <input type="email" class="form-control form-control-xlg" placeholder="Enter your email" v-model="email">
            <button type="submit" class="submit-button w-100 mt-5 d-flex justify-content-center">
              Submit
              <div class="flex">
                <div class="lds-ring loading" :class="{ 'active': isPending }">
                  <!-- :class="{ 'active': isPending }" -->
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import store from '../store';
import axios from '../config'
import router from '../router'

export default defineComponent({
  name: 'LoginView',

  setup() {
   
    const username = ref('');
    const password = ref('');
    const errors = ref('');
    /** 
     * Submit form
     * 
     * @return {void}
     */

    
    const submitForm = async () => {
      try {
        let response = await axios.post('auth/login', {
          username: username.value,
          password: password.value
        })
        let response2 = await axios.post('auth/me')
        const role = response2.data.role
        if (role == 'guest') {
          errors.value = 'You are not allowed to access this page'
          return
        }
        localStorage.setItem('role', role)
        localStorage.setItem('token', response.data.access_token)
        localStorage.setItem('isLoggedIn', true)
        router.push('/')
        store.commit('setRole')
      } catch (error) {
        errors.value = error.response.data.error
      }
    }

    const email = ref('');
    const isPending = ref(true);
    const success = ref(true)
    const forgotPassword = async () => {
      try {
        isPending.value = false
        let response = await axios.post('/forgot-password', {
          email: email.value,
        })
        console.log(response.data);
      } catch (error) {
        errors.value = error.response.data.error
      } finally {
        isPending.value = true
        success.value = false
      }
    }

    const openImportModal = () => {
      document.getElementById('import-modal').style.display = 'block'
    }

    const closeImportModal = () => {
      document.getElementById('import-modal').style.display = 'none'
    }

    return {
      username,
      password,
      errors,
      submitForm,
      openImportModal,
      closeImportModal,
      email,
      forgotPassword,
      isPending,
      success
    };
  },
})
</script>

<style scoped>
.active {
  display:none
}

.flex {
  display: flex;
  gap: 60px;
  flex-direction: row-reverse;

}

.forgot-password:hover {
  cursor: pointer;
  text-decoration: underline blue;
  color: blue;
}

.forgot-password {
  font-size: 12px;
  margin-top: 10px;
  color: rgb(156, 156, 156);
}

.hidden {
  display: none;
}

.file-box {
  min-width: 50%;
  padding: 30px;
  align-self: center;
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  /* 15% from the top and centered */
  border: 1px solid #888;
  max-width: 600px;
  min-height: 300px;
  /* Could be more or less, depending on screen size */
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

.body {
  background-color: rgb(240, 240, 240);
  display: flex;
  flex-direction: column;
  padding: 100px;
  border-radius: 3px;
  min-height: 100vh;
}
</style>
