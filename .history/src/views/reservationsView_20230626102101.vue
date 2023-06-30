<template>
  <v-container>
    <iframe
      id="myIframe"
      :src="`https://www.roomcloud.net/be/se1/index.jsp?hotel=5484&lang=${$store.state.lang.default}`"
      frameborder="0"
      width="100%"
      height="650"
    ></iframe>
  </v-container>
</template>

<script>
export default {
};
let myIframe = document.getElementById("myIframe");

</script>
