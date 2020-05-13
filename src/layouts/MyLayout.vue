<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          PC Services
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Menu</q-item-label>
        <q-expansion-item
          v-for="(item, index) in menuItems"
          :key="index"
          group="mainmenu"
          expand-separator
          :class="item.allowed || isAdmin ? '' : 'hidden'"
          :icon="item.icon"
          :label="item.label">
          <template v-if="!isAdmin">
            <q-item v-if="item.seeAllText.allowed" clickable tag="a" :href="'/#/' + item.baseUrl + '/'">
              <q-item-section>
                <q-item-label>{{ item.seeAllText.text }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-if="item.createText.allowed" clickable tag="a" :href="'/#/' + item.baseUrl + '/create'">
              <q-item-section>
                <q-item-label>{{ item.createText.text }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <template v-else>
            <q-item clickable tag="a" :href="'/#/' + item.baseUrl + '/'">
              <q-item-section>
                <q-item-label>{{ item.seeAllText.text }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item tag="a" :href="'/#/' + item.baseUrl + '/create'">
              <q-item-section>
                <q-item-label>{{ item.createText.text }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: false,
      userType: '',
      isAdmin: false,
      menuItems: [
        {
          allowed: false,
          icon: 'build',
          label: 'Tecnicos',
          baseUrl: 'engineers',
          seeAllText: { text: 'Ver todos', allowed: false },
          createText: { text: 'Añadir tecnico', allowed: false }
        },
        {
          allowed: false,
          icon: 'apartment',
          label: 'Empresas',
          baseUrl: 'companies',
          seeAllText: { text: 'Ver todas', allowed: false },
          createText: { text: 'Añadir empresa', allowed: false },
        },
        {
          allowed: false,
          icon: 'computer',
          label: 'Equipos',
          baseUrl: 'computers',
          seeAllText: { text: 'Ver todos', allowed: false },
          createText: { text: 'Añadir equipo', allowed: false }
        },
        {
          allowed: false,
          icon: 'assignment_turned_in',
          label: 'Reportes',
          baseUrl: 'reports',
          seeAllText: { text: 'Ver todos', allowed: false },
          createText: { text: 'Crear reporte', allowed: false }
        }
      ]
    }
  },
  created () {
    var count = 0
    var that = this
    this.isAdmin = this.$store.state.login.user.isAdmin
    this.menuItems.forEach(function(item){
      switch (count) {
        case 0:
          if (that.$store.state.login.user.isCompany){
            item.allowed = false
          } else {
            item.allowed = false
          }
          break;
        case 1:
          if (that.$store.state.login.user.isCompany){
            item.allowed = false
          } else {
            item.allowed = false
          }
          break;
        case 2:
          if (that.$store.state.login.user.isCompany){
            item.allowed = false
          } else {
            item.allowed = true
            item.seeAllText.allowed = true
            item.createText.allowed = true
          }
          break;
        case 3:
          if (that.$store.state.login.user.isCompany){
            item.allowed = true
            item.seeAllText.allowed = true
            item.createText.allowed = false
          } else {
            item.allowed = true
            item.seeAllText.allowed = true
            item.createText.allowed = true
          }
          break;
      }
      count++
    });
    console.log(this.menuItems)
  },
  mounted () {
    this.cameraPermission()
    this.prepareScan()
  },
  methods: {
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
    prepareScan () {
      QRScanner.prepare(onDone); // show the prompt
 
      function onDone(err, status){
        if (err) {
        // here we can handle errors and clean up any loose ends.
        console.error(err);
        }
        if (status.authorized) {
          // W00t, you have camera access and the scanner is initialized.
          // QRscanner.show() should feel very fast.
        } else if (status.denied) {
        // The video preview will remain black, and scanning is disabled. We can
        // try to ask the user to change their mind, but we'll have to send them
        // to their device settings with `QRScanner.openSettings()`.
        } else {
          // we didn't get permission, but we didn't get permanently denied. (On
          // Android, a denial isn't permanent unless the user checks the "Don't
          // ask again" box.) We can ask again at the next relevant opportunity.
        }
      }
    }
  }
}
</script>
