<script>
export default {
  props: {
    attrs: {
      required: true,
      type: Object,
    },
  }
}
</script>

<template>
  <a class="button" :href="attrs.url" target="_blank">
    <component :is="attrs.logo" />
    <p class="button__text">{{  attrs.title  }}</p>
  </a>
</template>

<style>
.button {
  display: flex;
  align-items: center;
  padding: 32px;
  color: var(--primary);
  border: 1px solid var(--primary);
  border-radius: 16px;
  transition: 0.1s;
  font-family: Inter;
  font-weight: 700;
  margin: 10px 10px;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.button svg {
  width: 32px;
  height: 32px;
  min-width: 32px;
  min-height: 32px;
}

.button svg path {
  fill: var(--primary);
}

.button:hover {
  color: var(--secondary);
  border: 1px solid var(--secondary);
}

.button:hover svg path {
  fill: var(--secondary);
}

.button__text {
  height: 100%;
  line-height: 32px;
  flex-basis: 100%;
  margin: 0 0 0 32px;
}
</style>