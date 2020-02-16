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
          group="mainmenu"
          expand-separator
          icon="build"
          label="Tecnicos"
          >
          <q-item clickable tag="a" href="/#/engineers/">
            <q-item-section>
              <q-item-label>Ver todos</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable tag="a" href="/#/engineers/create">
            <q-item-section>
              <q-item-label>Añadir tecnico</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
        <q-expansion-item
          group="mainmenu"
          expand-separator
          icon="apartment"
          label="Empresas"
          >
          <q-item clickable tag="a" href="/#/companies">
            <q-item-section>
              <q-item-label>Ver todas</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable tag="a" href="/#/companies/create">
            <q-item-section>
              <q-item-label>Añadir empresa</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
        <q-expansion-item
          group="mainmenu"
          expand-separator
          icon="computer"
          label="Equipos"
          >
          <q-item clickable tag="a" href="/#/computers">
            <q-item-section>
              <q-item-label>Ver todos</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable tag="a" href="/#/computers/create">
            <q-item-section>
              <q-item-label>Añadir equipo</q-item-label>
            </q-item-section>
          </q-item>
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
      leftDrawerOpen: false
    }
  }
}
</script>
