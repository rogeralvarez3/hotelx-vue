<template>
  <v-container fluid>
    <v-row justify="center" class="pt-2">
      <v-card width="600">
        <v-card-title class="grey lighten-4 pa-2">
          <v-icon class="mr-2">mdi-account-group</v-icon>
          <h3>USUARIOS</h3>
          <v-spacer></v-spacer>
          <v-btn fab dark color="error" small><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-simple-table dense>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in $store.state.users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>
                  <v-icon
                    small
                    color="error"
                    class="ma-1"
                    @click="removeUser(user.id)"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>
        <v-card-actions>
          <v-btn
            dark
            color="primary"
            @click="
              dlgNuevo = true;
              dlgNuevoMode = 'nuevo';
            "
            >nuevo</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn>cerrar</v-btn>
        </v-card-actions>
      </v-card>
      <v-dialog v-model="dlgNuevo" width="350" persistent>
        <v-card>
          <v-card-title class="grey lighten-4 pa-2">{{
            dlgNuevoMode == "nuevo" ? "Nuevo usuario" : "Identifícate"
          }}</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-text-field
              prepend-inner-icon="mdi-account"
              label="Nombre"
              v-model="usr.name"
              autofocus
            ></v-text-field>
            <v-text-field
              prepend-inner-icon="mdi-key"
              label="Contraseña"
              v-model="usr.password"
              type="password"
              append-icon="mdi-eye"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              dark
              color="primary"
              @click="dlgNuevoMode == 'nuevo' ? guardar() : login()"
              >{{ dlgNuevoMode == "nuevo" ? "Guardar" : "Entrar" }}</v-btn
            >
            <v-btn
              @click="
                dlgNuevoMode == 'nuevo' ? (dlgNuevo = false) : $router.push('/')
              "
              >cancelar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog></v-row
    >
  </v-container>
</template>

<script>
export default {
  data: () => {
    return {
      dlgNuevo: true,
      dlgNuevoMode: "login",
      usr: { name: null, password: null },
    };
  },
  methods: {
    obtenerDatos: function (token) {
      const mv = this;
      fetch(`${mv.$store.state.api}?tabla=users&&token=${token}`, {
        method: "get",
        headers: { "content-type": "application/json" },
      })
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          //mv.users = json;
          mv.$set(mv.$store.state, "users", json);
        });
    },
    guardar: function () {
      const mv = this;
      const data = JSON.stringify({
        tabla: "users",
        data: mv.usr,
        token: localStorage.getItem("token"),
      });
      fetch(`${mv.$store.state.api}`, {
        method: "post",
        body: data,
        headers: { "content-type": "application/json" },
      })
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          if (json.insertId) {
            json.name = mv.usr.name;
            json.id = json.insertId;
            let users = Object.assign([], mv.$store.state.users);
            users.push(json);
            mv.$set(mv.$store.state, "users", users);
            mv.dlgNuevo = false;
          } else {
            if (json.errno == 1062) {
              mv.$swal.fire({
                icon: "error",
                title: "Error al guardar",
                text: "Ya hay un usuario con este nombre",
              });
            }
          }
        });
    },
    login: function () {
      const mv = this;
      const data = JSON.stringify(mv.usr);
      fetch(`${mv.$store.state.api}/login`, {
        method: "post",
        body: data,
        headers: { "content-type": "application/json" },
      })
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          if (json.error) {
            mv.$swal.fire({ icon: "error", title: json.error });
          } else {
            mv.dlgNuevo = false;
            mv.obtenerDatos(json.token);
            localStorage.setItem("token", json.token);
          }
        });
    },
    verificarToken: function (token) {
      const mv = this;
      const data = JSON.stringify({ token: token });
      fetch(`${mv.$store.state.api}/verificarToken`, {
        method: "post",
        body: data,
        headers: { "content-type": "application/json" },
      })
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          if (json.error) {
            localStorage.clear();
            mv.dlgNuevo = true;
            mv.dlgNuevoMode = "login";
          } else {
            mv.dlgNuevo = false;
            mv.obtenerDatos(token);
          }
        });
    },
    removeUser: function (id) {
      const mv = this;
      mv.$swal
        .fire({
          icon: "warning",
          title: "Confirmar para eliminar",
          text: "El usuario seleccionado será borrado peramentemente",
          showCancelButton: true,
          confirmButtonText: "Confirmar borrado",
        })
        .then((res) => {
          if (res.value) {
            const data = JSON.stringify({
              tabla: "users",
              id: id,
              token: localStorage.getItem("token"),
            });
            fetch(`${mv.$store.state.api}`, {
              method: "delete",
              body: data,
              headers: { "content-type": "application/json" },
            })
              .then((res) => {
                return res.json();
              })
              .then((json) => {
                console.log(json);
                if (json.error) {
                  mv.$swal.fire({
                    icon: "error",
                    title: "Error al intentar borrar",
                  });
                } else {
                  mv.$swal.fire({
                    icon: "success",
                    title: "usuario borrado correctamente",
                  });
                  let token = localStorage.getItem("token");
                  if (token) {
                    mv.obtenerDatos(token);
                  }
                }
              });
          }
        });
    },
  },
  mounted: function () {
    const mv = this;
    const token = localStorage.getItem("token");
    mv.verificarToken(token);
  },
};
</script>

<style></style>
