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
        <v-btn color="primary">{{ $store.getters.getLang("save") }}</v-btn>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-text-field
          type="title"
          :label="$options.filters.capital($store.getters.getLang('title'))"
          dense
          v-model="text"
        ></v-text-field>
        <v-text-field
          multiline
          type="text"
          :label="$store.getters.getLang('text')"
          dense
          height="60"
          v-model="text"
        ></v-text-field
        ><v-img width="580" height="300" class="elevation-1" cover></v-img>
        <input type="file" id="myFile" accept="image/jpeg" />
      </v-card-text>
      <v-card-actions>
        <v-btn>{{ $store.getters.getLang("select image file") }}...</v-btn>
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
      text: null,
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
          mv.image = fr.readAsDataURL();
        };
        fr.readAsDataURL(image);
      };
      inputObject.click();
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
