<template>
    <div>
        <div>
            <Line :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>

<script>
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarController,
    BarElement,
    PieController,
    ArcElement
} from 'chart.js'

import { Line } from 'vue-chartjs'


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarController,
    BarElement,
    PieController,
    ArcElement,
    Title,
    Tooltip,
    Legend
)

export default {
    name: 'LineChart',
    components: { Line },
    props: {
        chartData: {
            type: Object,
            required: true
        },
        chartOptions: {
            type: Object,
            required: true
        }
    },
}
</script>
  