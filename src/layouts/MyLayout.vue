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
          :icon="item.icon"
          :label="item.label">
          <q-item clickable tag="a" :href="'/#/' + item.baseUrl + '/'">
            <q-item-section>
              <q-item-label>{{ item.seeAllText }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable tag="a" :href="'/#/' + item.baseUrl + '/create'">
            <q-item-section>
              <q-item-label>{{ item.createText }}</q-item-label>
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
      leftDrawerOpen: false,
      menuItems: [
        {
          icon: 'build',
          label: 'Tecnicos',
          baseUrl: 'engineers',
          seeAllText: 'Ver todos',
          createText: 'Añadir tecnico'
        },
        {
          icon: 'apartment',
          label: 'Empresas',
          baseUrl: 'companies',
          seeAllText: 'Ver todas',
          createText: 'Añadir empresa'
        },
        {
          icon: 'computer',
          label: 'Equipos',
          baseUrl: 'computers',
          seeAllText: 'Ver todos',
          createText: 'Añadir equipo'
        },
        {
          icon: 'assignment_turned_in',
          label: 'Reportes',
          baseUrl: 'reports',
          seeAllText: 'Ver todos',
          createText: 'Crear reporte'
        }
      ]
    }
  }
}
</script>
