<template>
  <v-container fluid>
    <v-card width="600">
      <v-card-title class="grey lighten-4 pa-2">
        <div width="100">
          <v-select
            :items="items"
            :label="
              $options.filters.capital($store.getters.getLang('sections'))
            "
            v-model="selectedSectionId"
          ></v-select>
        </div>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="savePost()">{{
          $store.getters.getLang("save")
        }}</v-btn>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-text-field
          type="title"
          :label="$options.filters.capital($store.getters.getLang('title'))"
          dense
          v-model="title"
        ></v-text-field>
        <v-text-field
          multiline
          type="text"
          :label="$store.getters.getLang('description')"
          dense
          height="60"
          v-model="description"
        ></v-text-field
        ><v-img
          width="580"
          height="300"
          class="elevation-1"
          cover
          :src="image"
        ></v-img>
        <input type="file" id="myFile" accept="image/jpeg" />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="findImageFile()"
          >{{ $store.getters.getLang("select image file") }}...</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => {
    return {
      selectedSectionId: null,
      title: null,
      description: null,
      image: null,
    };
  },
  computed: {
    items: function () {
      const mv = this;
      const myItems = mv.$store.state.sections.map((item) => {
        return {
          value: item.id,
          text: mv.$options.filters.capital(
            mv.$store.getters.getLang(item.description)
          ),
        };
      });
      return myItems;
    },
  },
  methods: {
    findImageFile: function () {
      const mv = this;
      const inputObject = document.getElementById("myFile");
      inputObject.onchange = (event) => {
        let image = event.target.files[0];
        let fr = new FileReader();
        fr.onload = () => {
          mv.image = fr.result;
        };
        fr.readAsDataURL(image);
      };
      inputObject.click();
    },
    savePost: function () {
      const mv = this;
      let data = new FormData();
      let file = document.getElementById("myFile").files[0];
      if (!file | !mv.title | !mv.selectedSectionId | !mv.description) {
        mv.$swal.fire({
          icon: "error",
          title: mv.$store.getters.getLang("validation error"),
          text: mv.$store.getters.getLang("all fields are required"),
        });
        return;
      }
      data.append("file", file);
      data.append("title", mv.title);
      data.append("section", mv.selectedSectionId);
      data.append("description", mv.description);
      fetch(`${mv.$store.state.api}/savePost`, {
        method: "post",
        body: data,
        headers: {
          "content-type": `multipart/form-data;boundary=---XYZ`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          console.log(json);
        });
    },
  },
};
</script>

<style>
.active {
  background: dodgerblue;
  color: white !important;
}
#myFile {
  display: none;
}
</style>
