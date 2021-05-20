import i18next from 'i18next'

i18next.addResourceBundle('fr', 'FormLayout', {
  requiredMessage: 'Veuillez saisir le champs « {{ fieldName }} »',
  patternMessage: {
    email: "Le champs « {{ fieldName }} » n'est pas une adresse mail valide"
  },
  input: {
    placeholder: 'Renseignez le champs « {{ fieldName }} »'
  },
  select: {
    placeholder: 'Sélectionnez le champs « {{ fieldName }} »'
  }
})

i18next.addResourceBundle('en', 'FormLayout', {
  requiredMessage: 'The field « {{ fieldName }} » must be filled',
  patternMessage: {
    email: 'The field « {{ fieldName }} » must be a valid email address'
  },
  input: {
    placeholder: 'Fill the field « {{ fieldName }} »'
  },
  select: {
    placeholder: 'Choose the field « {{ fieldName }} »'
  }
})
