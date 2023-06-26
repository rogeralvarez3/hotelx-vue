<template>
  <div>
    <v-card width="600">
      <v-card-title class="grey lighten-4 pa-2">
        <v-icon>mdi-account-group</v-icon>
        <h3>USUARIOS</h3>
        <v-spacer></v-spacer>
        <v-btn fab dark color="error"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-simple-table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>
                <v-icon small color="warning">mdi-edit</v-icon>
                <v-icon small color="success">mdi-key</v-icon>
                <v-icon small color="error">mdi-close</v-icon>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>
      <v-card-actions>
        <v-btn dark color="primary">nuevo</v-btn>
        <v-btn>cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
