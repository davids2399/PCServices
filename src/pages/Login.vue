<template>
  <q-page class="flex ">
    <div class="column flex full-width">
      <div class="col-3 flex text-h4 justify-center items-center">
        <div>Iniciar sesión</div>
      </div>
      <div class="col-3 q-px-md q-gutter-md">
        <q-input outlined v-model="form.email" label="Correo" />
        <q-input outlined v-model="form.password" label="Contraseña" type="password" />
      </div>
      <div class="col-3 q-px-md q-gutter-md">
        <div class="row justify-center">
          <q-btn color="blue" glossy text-color="white" label="Iniciar sesion" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
        form: {
          email: ''
        }
    }
  }
}
</script>
