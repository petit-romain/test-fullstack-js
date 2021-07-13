// Libraries
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import moment from 'moment'

i18n
  // detect user language
  .use(LanguageDetector)
  // i18n instance
  .use(initReactI18next)
  .init({
    lng: 'fr',
    fallbackLng: ['fr', 'en'],
    react: {
      useSuspense: false
    },
    ns: ['Common'],
    defaultNS: 'Common',
    resources: {}
  })

moment.locale(i18n.language)

export default i18n