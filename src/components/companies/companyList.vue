<template>
  <q-page class="bg-white w-full">
    <q-table
    title="Compañias registradas"
    :data="data"
    :columns="columns"
    row-key="idCompany"
    />
  </q-page>
</template>

<script>
import { axiosInstance } from 'boot/axios'

export default {
  name: 'CompanyList',
  data () {
    return {
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Nombre',
          align: 'left',
          field: row => row.name,
          sortable: true
        },
        {
          name: 'email',
          label: 'Correo',
          align: 'left',
          field: row => row.email,
          sortable: true, 
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) 
        }
      ],
      data: []
    }
  },
  created () {
    var that = this;
    axiosInstance.get('/api/companies')
    .then((response) => {
      if(response.data.result){
        that.data = response.data.data
      }
    }, (error) => {
      console.log(error)
    })
  }
}
</script>