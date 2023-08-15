<template>
    <div class="body">
        <div class="title-box">
            <h1 class="title">Guest</h1>
        </div>
        <div>
            <DataTable :tableDatas="checkinToday" :tableTitles="tableTitles"></DataTable>
        </div>
    </div>
</template>

<script>
import DataTable from '../components/DataTable.vue'
import { ref } from 'vue'
import axios from '../config'

export default {
    name: 'GuestView',
    components: {
        DataTable
    },

    setup() {
        const checkinToday = ref([]);
        const tableTitles = ['Guest id', 'Guest name', 'Total booking', 'Email address', 'Booking this month', 'Joined date']

        /**
         * Get all bookings
         *
         * @return {void}
         */
        const getGuestStatistic = async () => {
            const response = await axios.get('guest-statistic')
            checkinToday.value = response.data

            console.log(response.data)
        }
        getGuestStatistic()

        return {
            checkinToday,
            tableTitles
        }
    }
}
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