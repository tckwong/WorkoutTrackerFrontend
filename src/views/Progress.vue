<template>
    <div>
        <h2>Progression Chart</h2>
        <input v-model="exerciseName">
        <button @click="retrieveExercises()">Generate</button>
        <line-chart :chartStateUpdate="this.chartState" :chart-data="datacollection" :options="{responsive: true, maintainAspectRatio: false}"></line-chart>
        <div class="bottomNavContainer">
            <ul>
                <li><img @click="$router.push({name: 'WorkoutSplit'})" src="@/assets/homeIcon.png"></li>
                <li><img @click="$router.push({name: 'WorkoutHistory'})" src="@/assets/historyIcon.png"></li>
                <li><img @click="$router.push({name: 'Progress'})" src="@/assets/progression.png"></li>
                <li><img @click="logOutUser" src="@/assets/logoutIcon.png"></li>
            </ul>
        </div>
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
                this.chartState = !this.chartState;
    
                
            }).catch((error) => {
                console.error("There was an error: " +error);
            })
        },
        logOutUser() {
                axios.request({
                    url: `${process.env.VUE_APP_BASE_DOMAIN}/api/login`,
                    method: 'DELETE',
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                    },
                    data : {
                        "loginToken" : this.userToken,
                    }

                }).then(() => {
                    cookies.remove('loginData');
                    this.$router.push({ name: 'Login' });
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

<style lang="scss" scoped>
    h2 {
        text-align: center;
    }

</style>