import Vue from 'vue'
import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
})

Vue.prototype.$axios = axiosInstance
