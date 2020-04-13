<template>
  <div class="w-full">
    <q-table
    title="Reportes creados"
    :data="data"
    :columns="columns"
    row-key="idReport"
    />
  </div>
</template>

<script>
import { axiosInstance } from 'boot/axios'

export default {
  name: 'ReportList',
  data () {
    return {
      columns: [
        {
          name: 'company',
          required: true,
          label: 'Empresa',
          align: 'left',
          field: row => row.company,
          sortable: true
        },
        {
          name: 'computer',
          required: true,
          label: 'Equipo',
          align: 'left',
          field: row => row.computer,
          sortable: true
        },
        {
          name: 'user',
          label: 'Técnico',
          align: 'left',
          field: row => row.user,
          sortable: true,
        },
        {
          name: 'service',
          label: 'Servicio',
          align: 'left',
          field: row => row.service,
          sortable: true,
        },
        {
          name: 'visit_start_time',
          label: 'Hora de inicio',
          align: 'left',
          field: row => row.visit_start_time,
          sortable: true,
        }
      ],
      data: []
    }
  },
  created () {
    var that = this;
    axiosInstance.get('/api/reports?reportList=true')
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