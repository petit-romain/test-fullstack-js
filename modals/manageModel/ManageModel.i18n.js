import i18next from 'i18next'

i18next.addResourceBundle('fr', 'ManageModel', {
  form: {
    requiredMessage: 'Veuillez saisir un(e) {{ fieldName }}',
    patternMessage: {
      email: "Le champs saisi {{fieldName}} n'est pas une adresse valide"
    },
    input: {
      placeholder: 'Renseignez un(e) {{ fieldName }}'
    },
    select: {
      placeholder: 'Sélectionnez un(e) {{ fieldName }}'
    }
  }
})
