<template>
    <div>
        <div class="heading-1">
            <h2>Progression Chart</h2>
            <p>Search up your exercises to see your progression by weight over time.</p>
            <input v-model="exerciseName">
            <button class="generalBtn" @click="retrieveExercises()">Generate</button>
        </div>
        <!-- Send datacollection to chart compoonent for renderings -->
        <line-chart :chartStateUpdate="this.chartState" :chart-data="datacollection" :options="{responsive: true, maintainAspectRatio: false}"></line-chart>
        <div class="bottomNavContainer">
            <ul>
                <li><img @click="$router.push({name: 'WorkoutSplit'})" src="@/assets/homeIcon.png"></li>
                <li><img @click="$router.push({name: 'WorkoutHistory'})" src="@/assets/historyIcon.png"></li>
                <li id="activePage"><img @click="$router.push({name: 'Progress'})" src="@/assets/progression.png"></li>
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
    name: 'Progress',
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
                        label: 'Weight(lbs)',
                        backgroundColor: '#f58840',
                        data: []
                    },
                    {
                        label: 'Date',
                        backgroundColor: '#f58840',
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
                // Make Datetime more readable by omitting time
                this.datacollection.labels = [];
                this.datacollection.datasets[0].data=[];
                this.datacollection.datasets[1].data=[];

                for (let i=0; i<response.data.length; i++){
                    let splitDate = response.data[i].completedAt.split(" ");

                    let newDate = splitDate[0];
                    // x-axis label
                    this.datacollection.labels[i] = newDate;
                    // 2 data array variables: weight and date
                    this.datacollection.datasets[0].data[i] = response.data[i].weight;
                    this.datacollection.datasets[1].data[i] = newDate;
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
    .heading-1 {
        text-align: center;
        
        h2 {
        text-align: center;
        margin: 2vh 0;
        
        input, button {
            padding-bottom:10px;
        }
    }
    }
  

</style>