<template>
  <div class="body">
    <div class="title-box">
      <h1 class="title">Employee</h1>
    </div>
    <DataTable :tableDatas="employees" :tableTitles="tableTitles" />
  </div>
</template>

<script>
import { defineComponent,ref  } from 'vue'
import DataTable from '@/components/DataTable.vue'
import axios from '@/config'

export default defineComponent({
  name: 'EmployeeView',
  components: {
    DataTable
  },

 setup() {
    const employees = ref([])
    const tableTitles = ref([
      'ID',
      'Name',
      'Role',
      'Shift',
      'Day off',
      'Salary',
      'Status'
    ])
    const getEmployee = async () => {
      const response = await axios.get('employee')
      employees.value = response.data
    }
    getEmployee()

    return {
      employees,
      tableTitles
    }
  }
})
</script>

<style scoped>
@media (min-width: 768px) {
  .body {
    background-color: rgb(240, 240, 240);
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 3px;
    height: 100%;
  }

}

@media (max-width: 768px) {
  .body {
    background-color: rgb(240, 240, 240);
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
}
</style>
