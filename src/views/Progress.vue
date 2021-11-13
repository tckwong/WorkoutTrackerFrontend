<template>
    <div>
        <button @click="retrieveExercises()">Randomize</button>
        <input v-model="exerciseName">
        <line-chart :chartStateUpdate="this.chartState" :chart-data="datacollection" :options="{responsive: true, maintainAspectRatio: false}"></line-chart>

    </div>
</template>

<script>
import LineChart from '@/components/LineChart.vue'
import axios from 'axios'
import cookies from 'vue-cookies'

export default {
    name: 'PlanetChart',
    components: {
        LineChart
    },
    data () {
        return {
            chartState : false,
            userId : null,
            exerciseName : null,
            datacollection: {
                labels: [],
                datasets:[
                    {
                        label: 'Weight',
                        backgroundColor: '#f87979',
                        data: []
                    }
                ]
            }
        }
    },
    methods: {
        retrieveExercises() {
            axios.request({
                url: `${process.env.VUE_APP_BASE_DOMAIN}/api/workout-progress`,
                method: 'GET',
                params : {
                    "exerciseName" : this.exerciseName,
                    "userId" : this.userId,
                }
            }).then((response) => {
                this.datacollection.labels = [];
                this.datacollection.datasets[0].data=[];

                for (let i=0; i<response.data.length; i++){
                    this.datacollection.labels[i] = response.data[i].weight;
                    this.datacollection.datasets[0].data[i] = response.data[i].weight
                }
                console.log(this.datacollection);
                this.chartState = !this.chartState;
    
                
            }).catch((error) => {
                console.error("There was an error: " +error);
            })
        },
        getMyCookies() {
                const getCookie = cookies.get('loginData');
                this.userToken = getCookie.loginToken;
                this.userId = getCookie.userId;
        },
    },

    mounted () {
        this.getMyCookies();
    },

}
</script>