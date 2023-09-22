<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">User</th>
        <th class="text-left">Title</th>
        <th class="text-left">Body</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.name }}</td>
        <td>{{ user.post.title }}</td>
        <td>{{ user.post.body }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
  export default {
    data() {
      return {
        users: []
      };
    },
    async mounted() {
      try {
        const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        const usersData = await usersResponse.json();
        const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
        const postsData = await postsResponse.json();

        this.users = usersData.map(user => {
          user.post = postsData.find(post => post.userId === user.id);
          return user;
        });
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    }
  };
</script>
