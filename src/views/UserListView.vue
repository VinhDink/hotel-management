<template>
  <div class="body">
    <div class="title-box">
      <h1 class=title>List of user</h1>
    </div>
    <div>
      <DataTable :tableDatas="users" :tableTitles="tableTitles" :actionDanger="'Delete'" :functionDanger="deleteUser"></DataTable>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import axios from '../config'
import DataTable from '../components/DataTable.vue'

export default defineComponent({
  name: 'UserListView',
  components: {
    DataTable
  },

  setup() {
    const users = ref([]);
    const tableTitles = ref(['User id', 'Username', 'email', 'User role'])

    /**
     * Get all users
     * 
     * @return {void}
     */
    const getUser = async () => {
      const response = await axios.get('userlist')
      users.value = response.data
    }

    /**
     * Delete a user
     * 
     * @param {int} id 
     * 
     * @return {void}
     */
    const deleteUser = async (id) => {
      console.log(id)
      try {
        const response = await axios.delete('userlist/del', {
          data: {
            id: id,
          },
        })
        console.log(response.data)
        getUser()
      } catch (error) {
        console.error(error.response.data)
      }
    }
    getUser()

    return {
      users,
      deleteUser,
      tableTitles
    }
  },
})
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

  .fee-box {
    display: flex;
  }

  .fee {
    width: 100px;
    border: none;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
}

@media (max-width: 768px) {
  .body {
    background-color: rgb(240, 240, 240);
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .danger-button {
    border: none;
    border-radius: 20px;
    background: #ff8585;
    color: white;
  }

}
</style>
