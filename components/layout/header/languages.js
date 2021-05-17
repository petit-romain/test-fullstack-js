// Libraries
import React from 'react'
import { Dropdown, Menu } from 'antd'
import { defaultTo, filter, map } from 'lodash'
import i18next from 'i18next'
import ReactCountryFlag from 'react-country-flag'

const Languages = ({ onLanguageChange = () => {} }) => {
  const currentLanguage = defaultTo(i18next?.language, 'en')
  const languages = filter(
    defaultTo(i18next?.languages, []),
    (language) => language !== currentLanguage
  )

  const countryFlags = {
    fr: 'FR',
    en: 'GB'
  }

  const overlay = (
    <Menu>
      {map(languages, (language) => {
        return (
          <Menu.Item key={language} onClick={() => onLanguageChange(language)}>
            <ReactCountryFlag countryCode={countryFlags?.[language]} svg />
          </Menu.Item>
        )
      })}
    </Menu>
  )

  return (
    <Dropdown trigger={['click']} placement='bottomCenter' overlay={overlay}>
      <ReactCountryFlag countryCode={countryFlags?.[currentLanguage]} />
    </Dropdown>
  )
}

export default Languages
