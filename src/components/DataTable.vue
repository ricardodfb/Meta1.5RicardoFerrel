<template>
  <v-data-table
    :headers="headers"
    :items="usersWithPosts"
    :sort-by="[{ key: 'name', order: 'asc' }]"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" dark class="mb-2" v-bind="props">
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="User"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem['post.title']" label="Title"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem['post.body']" label="Body"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon size="small" class="me-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon size="small" @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        { title: 'User', key: 'name' },
        { title: 'Title', key: 'post.title' },
        { title: 'Body', key: 'post.body' },
        { title: 'Actions', key: 'actions', sortable: false },
      ],
      usersWithPosts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        'post.title': '',
        'post.body': '',
      },
      defaultItem: {
        name: '',
        'post.title': '',
        'post.body': '',
      },
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      try {
        const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        const usersData = await usersResponse.json();
        const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
        const postsData = await postsResponse.json();

        this.usersWithPosts = usersData.map(user => {
          user.post = postsData.find(post => post.userId === user.id) || {};
          return user;
        });
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    },

    editItem(item) {
      this.editedIndex = this.usersWithPosts.indexOf(item);
      this.editedItem = {
        name: item.name,
        'post.title': item.post ? item.post.title : '',
        'post.body': item.post ? item.post.body : '',
      };
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.usersWithPosts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.usersWithPosts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.usersWithPosts[this.editedIndex], this.editedItem);
      } else {
        this.usersWithPosts.push(this.editedItem);
      }
      this.close();
    },
    save() {
      if (this.editedIndex > -1) {
        // Si editedIndex es mayor que -1, estás editando un elemento existente
        this.usersWithPosts.splice(this.editedIndex, 1, Object.assign({}, this.editedItem));
      } else {
        // Si editedIndex es -1, estás creando un nuevo elemento
        this.usersWithPosts.push(Object.assign({}, this.editedItem));
      }
      this.close();
    },
  },
};
</script>
