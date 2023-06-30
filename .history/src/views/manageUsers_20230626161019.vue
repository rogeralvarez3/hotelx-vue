<template>
  <v-container fluid>
    <v-row justify="center" class="pt-2">
      <v-card width="600">
        <v-card-title class="grey lighten-4 pa-2">
          <v-icon class="mr-2">mdi-account-group</v-icon>
          <h3>{{ $store.getters.getLang("users") | uppercase }}</h3>
          <v-spacer></v-spacer>
          <v-btn fab dark color="error" small @click="$router.push('/')"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-simple-table dense>
            <thead>
              <tr>
                <th>Id</th>
                <th>{{ $store.getters.getLang("name") | capital }}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in $store.state.users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>
                  <v-icon
                    v-if="$store.state.users.length > 1"
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
              dlgNew = true;
              dlgNewMode = 'new';
            "
            >{{ $store.getters.getLang("new") }}</v-btn
          >
        </v-card-actions>
      </v-card>
      <v-dialog v-model="dlgNew" width="350" persistent>
        <v-card>
          <v-card-title class="grey lighten-4 pa-2">{{
            dlgNewMode == "new"
              ? $store.getters.getLang("new user")
              : $store.getters.getLang("sing in")
          }}</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-text-field
              prepend-inner-icon="mdi-account"
              :label="$store.getters.getLang('name')"
              v-model="usr.name"
              autofocus
            ></v-text-field>
            <v-text-field
              prepend-inner-icon="mdi-key"
              :label="$store.getters.getLang('password')"
              v-model="usr.password"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-icon="showPassword = true"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              dark
              color="primary"
              @click="dlgNewMode == 'new' ? save() : login()"
              >{{
                dlgNewMode == "new"
                  ? $store.getters.getLang("save")
                  : $store.getters.getLang("login")
              }}</v-btn
            >
            <v-btn
              @click="
                dlgNewMode == 'new' ? (dlgNew = false) : $router.push('/')
              "
              >{{ $store.getters.getLang("cancel") }}</v-btn
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
      dlgNew: true,
      dlgNewMode: "login",
      usr: { name: null, password: null },
      showPassword: false,
    };
  },
  methods: {
    getData: function (token) {
      const mv = this;
      mv.$store.dispatch("getData", "users");
    },
    save: function () {
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
            mv.dlgNew = false;
          } else {
            if (json.errno == 1062) {
              mv.$swal.fire({
                icon: "error",
                title: mv.$store.getters.getLang("save error"),
                text: mv.$store.getters.getLang("user already exist"),
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
            mv.dlgNew = false;
            mv.getData(json.token);
            localStorage.setItem("token", json.token);
          }
        });
    },
    verifyToken: function (token) {
      const mv = this;
      const data = JSON.stringify({ token: token });
      fetch(`${mv.$store.state.api}/verifyToken`, {
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
            mv.dlgNewMode = "login";
          } else {
            mv.dlgNew = false;
            mv.getData(token);
          }
        });
    },
    removeUser: function (id) {
      const mv = this;
      mv.$swal
        .fire({
          icon: "warning",
          title: mv.$store.getters.getLang("confirm delete"),
          text: mv.$store.getters.getLang("user will be deleted permanently"),
          showCancelButton: true,
          confirmButtonText: mv.$store.getters.getLang("yes, delete"),
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
                    title: mv.$store.getters.getLang("confirm delete"),
                  });
                } else {
                  mv.$swal.fire({
                    icon: "success",
                    title: mv.$store.getters.getLang(
                      "user deleted successfully"
                    ),
                  });
                  let token = localStorage.getItem("token");
                  if (token) {
                    mv.getData(token);
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
    mv.verifyToken(token);
  },
};
</script>

<style></style>
