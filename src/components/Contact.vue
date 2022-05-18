<script setup>
defineProps({
  title: String,
  logo: String,
  url: String,
});
</script>

<template>
  <a :href="url" class="contact" v-html="logo"> </a>
</template>

<style scoped>
.contact {
  position: relative;
  width: 64px;
  height: 64px;
  display: block;
  margin: 0 0 25px 0;
  /* background: #3338; */
  text-decoration: none;
}
.contact::after {
  content: "Github";
  position: relative;
  display: block;
  opacity: 0;
  height: 20px;
  transition: 0.3s;
  color: #73f;
  text-shadow: 0 0 3px;
}
.contact:hover {
  transition: 0.5s;
  border: 3px 5px 5px 3px solid;
  top: -3px;
  width: 70px;
  height: 70px;
}
.contact:active {
  transition: 0.5s;
  top: 3px;
  width: 58px;
  height: 58px;
}
.contact:hover::after {
  opacity: 1;
}
svg {
  width: 128px;
  height: 128px;
}
</style>