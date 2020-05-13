<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          PC Services
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'LoginLayout',
  methods: {
    cameraPermission() {
      var vm = this
      var permissions = cordova.plugins.permissions;
      permissions.checkPermission(permissions.CAMERA, function( status ) {
        if ( status.hasPermission ) {
          console.log("Yes :D ");
        }
        else {
          vm.$q.dialog({
            title: 'Permisos',
            message: 'No se han dado permisos para acceder a la camara'
          })
        }
      });

      permissions.requestPermission(permissions.CAMERA, success, error);
      function error() {
        console.warn('Camera permission is not turned on');
      }
      function success( status ) {
        if( !status.hasPermission ) error();
      }
    },
  }
}
</script>