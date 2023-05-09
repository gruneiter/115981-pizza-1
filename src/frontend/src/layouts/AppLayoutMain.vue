<template>
  <div class="app-layout app-layout--main">
    <Header />
    <slot />
  </div>
</template>

<script>
import Header from "../common/components/Header";
export default {
  name: "AppLayoutMain",
  components: {
    Header,
  },
};
</script>
<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
