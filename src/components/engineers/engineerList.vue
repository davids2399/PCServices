<template>
  <div class="w-full">
    <q-table
    title="Tecnicos registrados"
    :data="data"
    :columns="columns"
    row-key="idUser"
    />
  </div>
</template>

<script>
import { axiosInstance } from 'boot/axios'

export default {
  name: 'EngineerList',
  data () {
    return {
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Nombre(s)',
          align: 'left',
          field: row => row.name,
          sortable: true
        },
        {
          name: 'lastname',
          required: true,
          label: 'Apellidos',
          align: 'left',
          field: row => row.lastname,
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
    axiosInstance.get('/api/users')
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