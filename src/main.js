import { createI18n } from 'vue-i18n'
import { createApp } from 'vue'
import App from './App.vue'


const i18n = createI18n({
    /* TODO add En language
    https://vue-i18n.intlify.dev/guide/installation.html */
})

const app = createApp(App)

app.use(i18n)
app.mount('.wrapper')
