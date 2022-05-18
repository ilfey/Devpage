<script setup>
defineProps({
  title: String,
  url: String,
});
</script>

<template>
  <img class="avatar__logo" alt="Avatar" :src="url" />
  <h2 class="avatar__title">{{ title }}</h2>
</template>

<style scoped>
.avatar__logo {
  width: 40%;
  max-width: 512px;
  background: #413;
  border: 5px solid #524;
  border-radius: 50%;
  box-shadow: 0 0 20px #325;
}
.avatar__title{
	
}
</style>
