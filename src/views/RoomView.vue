<template>
  <div class="body">
    <div class="title-box">
      <h1 class="title">Room</h1>
      <div class="">
        <button class="modify-button w-auto" @click="openImportModal">Import room</button>
        <div class="detail-modal" id="import-modal">
          <div class="modal-content">
            <div class="modal-header">
              <span>Detail</span>
              <span class="close" @click="closeImportModal">&times;</span>
            </div>
            <div class="file-box">
              <input class="form-control form-control-lg" type="file" :v-model="fileInput" @change="handleFileUpload" />
              <button @click="uploadFile" class="submit-button">Upload</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <DataTable :tableDatas="tableData" :tableTitles="tableTitles" :actionModify="'Modify'" :actionDetail="'View detail'"
        :functionDetail="viewRoomDetail" :functionModify="modifyRoom" :key="key"></DataTable>
      <div>
        <DetailInfo :datas="roomInfo"></DetailInfo>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from '../components/DataTable.vue'
import { ref} from 'vue'
import axios from '../config'
import DetailInfo from '../components/DetailInfo.vue'
import router from '../router'

export default {
  name: 'TestingView',
  components: {
    DataTable,
    DetailInfo
  },

  setup() {
    const tableData = ref({})
    const roomInfo = ref({})
    const modalStatus = ref(false)
    // const fileInput = ref(null)
    const file = ref(null)
    const tableTitles = ref([
      'Room ID',
      'Room Name',
      'Type',
      'Hour price',
      'Day price',
      'Size',
    ])
    const getRooms = async () => {
      let results = await axios.get('room')
      tableData.value = results.data
    }

    const modifyRoom = (id) => {
      //router push to modify room
      router.push('room/modify/' + id)
    }

    const handleFileUpload = (event) => {
      file.value = event.target.files[0];
    }

    const viewRoomDetail = async (id) => {
      let response = await axios.post('room/room-detail', {
        id: id
      })
      roomInfo.value = {
        'Id': response.data.id,
        'Name': response.data.name,
        'Type': response.data.type,
        'Hour price': response.data.hour_price,
        'Day price': response.data.day_price,
        'Status': response.data.status,
        'Size': response.data.size,
        'Balcony': response.data.balcony,
        'View': response.data.view,
        'Smoking': response.data.smoking,
        'Floor': response.data.floor,
        'Bathtub': response.data.bathtub,
      }
      document.getElementById('detail-modal').style.display = 'block'
    }

    const openImportModal = () => {
      document.getElementById('import-modal').style.display = 'block'
    }

    const closeImportModal = () => {
      document.getElementById('import-modal').style.display = 'none'
    }

    const uploadFile = async () => {
      let formData = new FormData();
      formData.append('file', file.value);

      await axios.post('/room/storeRoomFile', formData)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        }).finally(() => {
          closeImportModal()
        });
        getRooms()
    }

    getRooms()
    return {
      tableData,
      tableTitles,
      viewRoomDetail,
      handleFileUpload,
      roomInfo,
      modalStatus,
      closeImportModal,
      modifyRoom,
      openImportModal,
      uploadFile,
    }
  }
}
</script>


<style scoped>

.file-box {
  min-width:50%;
  padding:30px;
  align-self: center;
  display:flex;
  flex-direction: column;
  gap:50px;
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
  .body {
    background-color: rgb(240, 240, 240);
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 3px;
    min-height: 100%;
  }

}

@media (max-width:768px) {
  .body {
    background-color: rgb(240, 240, 240);
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
}
</style>
