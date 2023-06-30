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
  mounted: () => {
    let myIframe = document.getElementById("myIframe");
    myIframe.onload = () => {
      var css = ".languages{display:none}",
        head =
          myIframe.contentWindow.head ||
          myIframe.contentWindow.head.getElementsByTagName("head")[0],
        style = myIframe.contentWindow.head.createElement("style");

      head.appendChild(style);

      style.type = "text/css";
      if (style.styleSheet) {
        // This is required for IE8 and below.
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    };
  },
};
</script>
