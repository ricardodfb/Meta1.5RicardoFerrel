/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
import { createApp } from 'vue'; // Cambio de importación a Vue 3
import router from './router';
import MenuSidebar from '@/components/MenuSidebar.vue';
import App from './App.vue';
import { registerPlugins } from '@/plugins';

const app = createApp(App);

app.use(router); // Usar el enrutador en la aplicación

registerPlugins(app);

app.component('MenuSidebar', MenuSidebar);

app.mount('#app');
