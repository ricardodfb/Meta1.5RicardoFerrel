<template>
  <v-navigation-drawer app v-model="menuDrawer">
    <v-list>
      <!-- Encabezado -->
      <v-list-item>
        <v-list-item-title class="options-header">Opciones</v-list-item-title>
      </v-list-item>

      <!-- Vista 1 -->
      <v-list-item to="/">
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Página principal</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Vista 2 -->
      <v-list-item to="/tabla">
        <v-list-item-icon>
          <v-icon>mdi-image</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Tabla</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar app>
    <v-app-bar-nav-icon @click.stop="menuDrawer = !menuDrawer"></v-app-bar-nav-icon>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      menuDrawer: false, // Inicialmente cerrado
    };
  },
};
</script>

<style scoped>
.options-header {
  font-weight: bold;
}
</style>
