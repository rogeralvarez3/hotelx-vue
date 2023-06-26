<template>
  <v-container>
    <iframe
      :src="`https://www.roomcloud.net/be/se1/index.jsp?hotel=5484&lang=${$store.state.lang.default}`"
      frameborder="0"
      width="100%"
      height="650"
    ></iframe>
  </v-container>
</template>

<script>
const lngBtn = document.querySelector("#lbli-sv");
lngBtn.style("display", "none");
export default {};
</script>
