<template>
  <q-page class="row">
    <q-form class="col" @submit="submit()">
      <div class="column flex full-width full-height">
        <div class="col-3 flex text-h4 justify-center items-center">
          <div>Iniciar sesión</div>
        </div>
        <div class="col q-px-md q-gutter-md">
          <q-input outlined v-model="form.email" label="Correo" />
          <q-input outlined v-model="form.password" label="Contraseña" type="password" />
          <q-checkbox v-model="form.isCompany" label="Iniciar como empresa" />
        </div>
        <div class="col-3 q-px-md q-gutter-md">
          <div class="row justify-center">
            <q-btn color="blue" glossy text-color="white" label="Iniciar sesion" type="submit"/>
          </div>
        </div>
      </div>
    </q-form>
    <q-dialog v-model="form.done">
      <q-card>
        <q-card-section>
          <div class="text-h6">Usuario/Contraseña incorrectos</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div>Intentelo de nuevo</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Aceptar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { axiosInstance } from 'boot/axios'

export default {
  name: 'Login',
  data () {
    return {
        form: {
          email: '',
          password: '',
          isCompany: false,
          done: false,
          success: false
        }
    }
  },
  methods: {
    submit () {
      var that = this
      axiosInstance.post('/api/login', {
        email: that.form.email,
        password: that.form.password,
        isCompany: that.form.isCompany
      })
      .then((response) => {
        if(response.data.result){
          if (Object.entries(response.data.data).length === 0 && response.data.data.constructor === Object){
            that.form.success = false
            that.form.done = true
          } else {
            that.$store.dispatch('login/login', that.form.isCompany)
            that.$router.push({ path: '/' })
          }
        } else {
          that.form.success = false
          that.form.done = true
        }
      }, (error) => {
        console.log(error)
      })
    }
  }
}
</script>
