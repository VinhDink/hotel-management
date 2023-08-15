<template>
    <div class="detail-modal" id="detail-modal">
        <div class="modal-content">
            <div class="modal-header">
                <span>Detail</span>
                <span class="close" @click="closeModal()">&times;</span>
            </div>
            <div class="modal-body">
                <div class="modal-icon">
                    <i class="bi bi-info-circle-fill"></i>
                </div>
                <div>
                    <div v-for="data, key in datas" :key="data.id"><span class="modal-title">{{ key }}: </span>{{ data }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DetailInfo',
    props: {
       datas: {
            type: Object,
        }
    },
    methods: {
        closeModal() {
            document.getElementById('detail-modal').style.display = 'none'
        }
    }
}
</script>
