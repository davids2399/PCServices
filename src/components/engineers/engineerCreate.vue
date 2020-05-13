<template>
  <q-page class="bg-white w-full p-8">
    <q-dialog v-model="form.done">
      <q-card>
        <q-card-section>
          <div v-if="form.success" class="text-h6">Tecnico añadido con éxito</div>
          <div v-else class="text-h6">Tecnico no pudo ser añadido</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div v-if="form.success">Presione aceptar para salir</div>
          <div v-else>Por alguna razon el tecnico no pudo ser añadido, intentelo de nuevo mas tarde</div>
          <div></div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Aceptar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="q-py-md column">
      <div class="col">
        <p class="text-lg text-medium mb-4">Registrar nuevo técnico</p>
      </div>

      <q-form
        class="q-gutter-md"
        ref="createEngineerForm"
        @submit="onSubmit"
      >
        <q-input
          filled
          v-model="form.name"
          label="Nombre(s) *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'No dejar el campo vacío']"
        />

        <q-input
          filled
          v-model="form.lastname"
          label="Apellidos *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'No dejar el campo vacío']"
        />

        <q-input
          filled
          v-model="form.email"
          label="Correo electrónico *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'No dejar el campo vacío']"
        />

        <q-input
          v-model="form.password"
          filled
          :type="form.isPwd ? 'password' : 'text'"
          label="Contraseña"
          hint="Esta contraseña la utilizara para iniciar sesión desde el login"
          >
          <template v-slot:append>
            <q-icon
              :name="form.isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="form.isPwd = !form.isPwd"
            />
          </template>
        </q-input>

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
  name: 'EngineerCreate',
  data () {
    return {
      form: {
        name: '',
        lastname: '',
        email: '',
        password: '',
        isPwd: true,
        done: false,
        success: false
      }
    }
  },
  methods: {
    onSubmit: function () {
      var that = this;
      axiosInstance.post('/api/users', {
        name: that.form.name,
        lastname: that.form.lastname,
        email: that.form.email,
        password: that.form.password
      })
      .then((response) => {
        if(response.data.result){
          this.form = {
            name: '',
            lastname: '',
            email: '',
            password: '',
            isPwd: true,
            done: true,
            success: true
          }
          this.$refs.createEngineerForm.reset(evt)
        } else {
          this.form.done = true
          this.form.success = false
        }
      }, (error) => {
        console.log(error)
      })
    }
  }
}
</script>
