<template>
  <v-container>
    <iframe
      @load="hideLangButton()"
      :src="`https://www.roomcloud.net/be/se1/index.jsp?hotel=5484&lang=${$store.state.lang.default}`"
      frameborder="0"
      width="100%"
      height="650"
    ></iframe>
  </v-container>
</template>

<script>
export default {
  methods: {
    hideLangButton: function () {
      const lngBtn = document.querySelector(".li");
      console.log(lngBtn);
    },
  },
};
</script>
