<template>
  <q-page class="bg-white w-full">
    <q-table
      title="Equipos registrados"
      :data="data"
      :columns="columns"
      row-key="idComputer">
      <template v-slot:top-right>
        <q-input
          class="q-pt-sm"
          dense
          v-model="searchInp"
          placeholder="Buscar"
          @keydown.enter="search()">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
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
          name: 'brand',
          required: true,
          label: 'Marca',
          align: 'left',
          field: row => row.brand,
          sortable: true
        },
        {
          name: 'serial_number',
          label: 'No. Serie',
          align: 'left',
          field: row => row.serial_number,
          sortable: true 
        }
      ],
      data: [],
      searchInp: ''
    }
  },
  created () {
    var that = this;
    axiosInstance.get('/api/computers')
    .then((response) => {
      if(response.data.result){
        that.data = response.data.data
      }
    }, (error) => {
      console.log(error)
    })
  },
  methods: {
    search() {
      var that = this
      console.log(that.searchInp)
      axiosInstance.get('/api/computers?search=' + that.searchInp)
      .then((response) => {
        console.log(response.data)
        if(response.data.result){
          that.data = response.data.data
        } else {
          that.data = []
          that.$q.dialog({
            title: 'No se encontraron resultados',
            message: 'Intente con otras palabras'
          }).onOk(() => {
            // console.log('OK')
          }).onCancel(() => {
            // console.log('Cancel')
          }).onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          })
        }
      }, (error) => {
        console.log(error)
      })
    }
  }
}
</script>