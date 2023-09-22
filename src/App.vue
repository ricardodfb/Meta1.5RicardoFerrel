<template>
  <v-app>
    <MenuSidebar /> <!-- Agrega el menú lateral colapsable -->
    <v-main>
      <router-view /> <!-- Mostrará la vista actual en función de la ruta -->
    </v-main>
  </v-app>
</template>

<script setup>
  //
</script>
