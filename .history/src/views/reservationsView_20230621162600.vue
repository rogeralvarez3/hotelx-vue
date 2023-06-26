<template>
  <v-container>
    <iframe
      ref="myIframe"
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
      const lngBtn = this.$refs.myIframe.content.find(".li");
      console.log("onchange iframe ready");
      console.log(lngBtn);
    },
  },
};
</script>
