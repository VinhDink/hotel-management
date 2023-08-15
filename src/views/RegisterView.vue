<template>
  <div class="body">
    <form @submit.prevent="register" class="login-form-box">
      <div class="input-form">
        <div class="input-title">Register</div>
        <div class="error">
          {{ errors }}
        </div>
        <div class="success" :class="{ 'hidden': success }">Registered successfully, please verify your email</div>
        <div class="input-box">
          <div for="username" class="input-label">Username</div>
          <input type="text" id="username" name="username" v-model="username" class="input">
        </div>
        <div class="input-box">
          <div for="email" class="input-label">Email</div>
          <input type="email" class="input" id="email" name="email" v-model="email">
        </div>
        <div class="input-box-radio">
          <div for="role" class="input-label">Role</div>
          <div class="radio">
            <div>
              <input type="radio" id="admin" name="role" value="admin" v-model="role">
              <label for="admin" class="input-label">Admin</label>
            </div>
            <div>
              <input type="radio" id="employee" name="role" value="employee" v-model="role">
              <label for="employee" class="input-label">Employee</label>
            </div>
          </div>
        </div>
        <div class="input-box">
          <div for="password" class="input-label">Password</div>
          <input type="password" id="password" name="password" v-model="password" class="input">
        </div>
        <div class="input-box">
          <div for="confirm-password" class="input-label">Confirm password</div>
          <input type="password" class="input" id="confirm_password" name="confirm_password" v-model="confirm_password">
        </div>
        <button type="submit" class="login-button">
          <div class="flex">
            <div class="lds-ring loading" :class="{ 'active': isPending }">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div class="d-flex align-items-center">
              Register
            </div>
          </div>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from '../config'
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'RegisterView',

  setup() {
    const username = ref('')
    const password = ref('')
    const confirm_password = ref('')
    const email = ref('')
    const errors = ref('')
    const role = ref('')
    const isPending = ref(true)
    const success = ref(true)
    /**
     * Register
     * 
     * @return {void}
     */
    const register = async () => {
      try {
        isPending.value = false
        const response = await axios.post('register', {
          username: username.value,
          password: password.value,
          confirm_password: confirm_password.value,
          email: email.value,
          role: role.value,
        })

        console.log(response.data);
        success.value = false
      }
      catch (error) {
        errors.value = error.response.data.message
        success.value = true
      } finally {
        isPending.value = true
      }
    }

    return {
      username,
      password,
      confirm_password,
      email,
      errors,
      role,
      isPending,
      success,
      register,
    };
  }
})
</script>

<style scoped>
.hidden {
  display: none;
}

.active {
  visibility: hidden;
}

.loading {
  font-size: 1px;
}

.body {
  background-color: rgb(240, 240, 240);
  display: flex;
  flex-direction: column;
  padding: 100px;
  border-radius: 3px;
  min-height: 100vh;
}

.input-box-radio {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  width: 250px;
}

.flex {
  display: flex;
  gap: 60px;
  flex-direction: row-reverse;

}

.radio {
  display: flex;
  gap: 50px;
}
</style>
