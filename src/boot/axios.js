import Vue from 'vue'
import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
})

Vue.prototype.$axios = axiosInstance
