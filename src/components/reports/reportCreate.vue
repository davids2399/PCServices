<template>
  <q-page class="bg-white w-full p-8">
    <q-dialog v-model="form.done">
      <q-card>
        <q-card-section>
          <div v-if="form.success" class="text-h6">Reporte creado con éxito</div>
          <div v-else class="text-h6">Reporte no pudo ser creado</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div v-if="form.success">Presione aceptar para salir</div>
          <div v-else>Por alguna razon el Reporte no pudo ser creado, intentelo de nuevo mas tarde</div>
          <div></div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Aceptar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="q-py-md column">
      <div class="q-px-md col">
        <p class="text-h5 text-medium mb-4">Crear nuevo reporte</p>
      </div>

      <q-form
        class="q-px-md q-gutter-md"
        ref="createReportForm"
        @submit="onSubmit"
      >
        <q-select :loading="form.companies.loading" v-model="form.companies.active" :disable="form.companies.options.length > 0 ? false : true" :options="form.companies.options" label="Empresas" />
        <q-select :loading="form.services.loading" v-model="form.services.active" :disable="form.services.options.length > 0 ? false : true" :options="form.services.options" label="Tipo de Servicio" />
        <q-select
          v-model="form.computers.active"
          :loading="form.computers.loading"
          use-input
          input-debounce="0"
          label="Equipo de computo"
          :options="form.computers.filtered"
          @filter="filterFn"
          behavior="menu">
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <div class="row q-gutter-sm">
          <div class="text-h6 full-width">Fecha y hora de inicio</div>
          <q-input dense placeholder="Fecha de inicio" filled v-model="form.initialDate.date" mask="date" :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="initialDate_date" transition-show="scale" transition-hide="scale">
                  <q-date v-model="form.initialDate.date" @input="() => $refs.initialDate_date.hide()" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input dense placeholder="Hora de inicio" filled v-model="form.initialDate.time" mask="time" :rules="['time']">
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="form.initialDate.time" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="row q-gutter-sm">
          <div class="text-h6 full-width">Fecha y hora fin</div>
          <q-input dense placeholder="Fecha de fin" filled v-model="form.endDate.date" mask="date" :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="endDate_date" transition-show="scale" transition-hide="scale">
                  <q-date v-model="form.endDate.date" @input="() => $refs.endDate_date.hide()" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input dense placeholder="Hora de fin" filled v-model="form.endDate.time" mask="time" :rules="['time']">
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="form.endDate.time" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <q-input
          v-model="form.details"
          placeholder="Detalles de la visita"
          filled
          autogrow/>
        <div>
          <q-btn class="mt-4" label="Enviar" type="submit" color="primary"/>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { axiosInstance } from 'boot/axios'

export default {
  name: 'ReportCreate',
  data () {
    return {
      form: {
        done: false,
        companies: {
          loading: true,
          active: '',
          options: []
        },
        services: {
          loading: true,
          active: '',
          options: []
        },
        computers: {
          loading: true,
          active: '',
          options: [],
          filtered: []
        },
        initialDate: {
          date: '',
          time: ''
        },
        endDate: {
          date: '',
          time: ''
        },
        details: ''
      }
    }
  },
  async created () {
    var that = this;
    await axiosInstance.get('/api/companies')
    .then((response) => {
      if(response.data.result){
        response.data.data.forEach(function(company){
          that.form.companies.options.push({ label: company.name, value: company.idCompany })
          that.form.companies.loading = false
          that.form.companies.active = { label: '', value: 0 }
        })
      }
    }, (error) => {
      console.log(error)
    })
    if (this.form.companies.options.length == 0) this.form.companies.active = { label: 'No hay empresas disponibles', value: 0 }

    await axiosInstance.get('/api/services')
    .then((response) => {
      if (response.data.result) {
        response.data.data.forEach(function(service){
          that.form.services.options.push({ label: service.name, value: service.idService })
          that.form.services.loading = false
          that.form.services.active = { label: '', value: 0 }
        })
      }
    }, (error) => {
      console.log(error)
    })

    if (this.form.services.options.length == 0) this.form.services.active = { label: 'No hay servicios disponibles', value: 0 }

    await axiosInstance.get('/api/computers')
    .then((response) => {
      if (response.data.result) {
        response.data.data.forEach(function(computer){
          that.form.computers.options.push({ label: computer.serial_number, value: computer.idComputer })
          that.form.computers.loading = false
          that.form.computers.active = { label: '', value: 0 }
        })
      }
    }, (error) => {
      console.log(error)
    })

    if (this.form.services.options.length == 0) this.form.services.active = { label: 'No hay servicios disponibles', value: 0 }
  },
  methods: {
    onSubmit: function () {
      var that = this;
      axiosInstance.post('/api/reports', {
        computer_id: that.form.computers.active.value,
        company_id: that.form.companies.active.value,
        user_id: 1,
        service_id: that.form.services.active.value,
        visit_start_time: that.form.initialDate.date + ' ' + that.form.initialDate.time,
        visit_end_time: that.form.endDate.date + ' ' + that.form.endDate.time,
        description: that.form.details
      })
      .then((response) => {
        if(response.data.result){
          that.form.companies.active = ''
          that.form.services.active = ''
          that.form.computers.active = ''
          that.form.computers.filtered = that.form.computers.options
          that.form.initialDate = { date: '', time: '' }
          that.form.endDate = { date: '', time: '' }
          that.form.details = ''
          that.form.done = true
          that.form.success = true
          that.$refs.createReportForm.reset()
        } else {
          that.form.done = true
          that.form.success = false
        }
      }, (error) => {
        console.log(error)
      })
    },
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.form.computers.filtered = this.form.computers.options
        })
        return
      }

      update(() => {
        console.log(val)
        var needle = val.toLowerCase()
        this.form.computers.filtered = this.form.computers.options.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    }
  }
}
</script>
