<template>
  <div>
    <q-dialog v-model="form.done">
      <q-card>
        <q-card-section>
          <div v-if="form.success" class="text-h6">Equipo añadido con éxito</div>
          <div v-else class="text-h6">Equipo no pudo ser añadido</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div v-if="form.success">Presione aceptar para salir</div>
          <div v-else>Por alguna razon el equipo no pudo ser añadida, inténtelo de nuevo mas tarde</div>
          <div></div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Aceptar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="q-py-md column">
      <div class="q-px-md col">
        <p class="text-h5 text-medium mb-4">Registrar nuevo equipo</p>
      </div>

      <q-form
        class="q-gutter-md"
        ref="createComputerForm"
        @submit="onSubmit">
        <q-input
          filled
          v-model="form.brand"
          label="Marca *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'No dejar el campo vacío']"
        />

        <q-input
          filled
          v-model="form.serial_number"
          label="Numero de Serie *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'No dejar el campo vacío']"
        />

        <div>
          <q-btn class="mt-4" label="Enviar" type="submit" color="primary"/>
        </div>
      </q-form>

      <qrcode-stream :camera="'auto'" @decode="onDecode">
      </qrcode-stream>
    </div>
  </div>
</template>

<script>
import { axiosInstance } from 'boot/axios'
// https://github.com/patrickmonteiro/quasar-qrcode-reader
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
  name: 'ComputerCreate',
  components: {
    QrcodeStream 
  },
  data () {
    return {
      form: {
        brand: '',
        serial_number: '',
        done: false,
        success: false
      },
      result: null,
    }
  },
  methods: {
    onSubmit: function () {
      var that = this;
      axiosInstance.post('/api/computers', {
        brand: that.form.brand,
        serial_number: that.form.serial_number
      })
      .then((response) => {
        if(response.data.result){
          this.form = {
            brand: '',
            serial_number: '',
            done: true,
            success: true
          }
          this.$refs.createComputerForm.reset()
        } else {
          this.form.done = true
          this.form.success = false
        }
      }, (error) => {
        console.log(error)
      })
    },
    async onDecode (content) {
      this.result = content
      console.log(content)
    },
  }
}
</script>
