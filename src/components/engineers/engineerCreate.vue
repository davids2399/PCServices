<template>
  <div class="q-py-md column">
    <div class="col">
      <p class="text-h5">Registrar nuevo técnico</p>
    </div>

    <q-form
      class="q-gutter-md"
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

      <q-input v-model="form.password" filled :type="form.isPwd ? 'password' : 'text'" label="Contraseña">
        <template v-slot:append>
          <q-icon
            :name="form.isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="form.isPwd = !form.isPwd"
          />
        </template>
      </q-input>

      <div>
        <q-btn label="Enviar" type="submit" color="primary"/>
      </div>
    </q-form>
  </div>
</template>

<script>
import { axiosInstance } from 'boot/axios'

export default {
  name: 'PageIndex',
  data () {
    return {
      form: {
        name: '',
        lastname: '',
        email: '',
        password: '',
        isPwd: true,
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
        console.log(response)
      }, (error) => {
        console.log(error)
      })
    }
  }
}
</script>
