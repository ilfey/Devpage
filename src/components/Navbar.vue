<script>
export default {
  data: () => ({
    currentLang: "En",
    currentScheme: "dark",
  }),
  methods: {
    toggleLang() {
      alert("Пендосам хода нет, мне лень делать i18n.")
    },
    toggleTheme() {
      const htmlClasses = document.documentElement.classList

      if (htmlClasses.contains("dark")) {
        this.currentScheme = "light"
        htmlClasses.replace("dark", this.currentScheme)
      } else {
        this.currentScheme = "dark"
        htmlClasses.replace("light", this.currentScheme)
      }
      localStorage.setItem("color-scheme", this.currentScheme)
    },
  },
  beforeMount() {
    const scheme = localStorage.getItem("color-scheme")
    if (scheme) {
      this.currentScheme = scheme
    }
  },
}
</script>

<template>
  <nav>
    <p @click="toggleLang">{{ currentLang == 'Ru' ? 'En' : 'Ru' }}</p>
    <p @click="toggleTheme">{{ currentScheme == "dark" ? "Light" : "Dark" }}</p>
  </nav>
</template>

<style>
nav {
  margin: 25px 0 0 0;
  font-size: 1rem;
  font-family: Inter;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>