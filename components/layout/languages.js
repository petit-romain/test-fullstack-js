// Libraries
import { Dropdown, Menu } from 'antd'
import React, { useCallback } from 'react'
import { defaultTo, map } from 'lodash'
import i18next from 'i18next'
import ReactCountryFlag from 'react-country-flag'

const Languages = () => {
  const currentLanguage = defaultTo(i18next?.language, 'en')
  const languages = defaultTo(i18next?.languages, [])

  const countryFlags = {
    fr: 'FR',
    en: 'GB'
  }

  const handleOnLanguageSelected = useCallback((lng) => {
    i18next.changeLanguage(lng)
  }, [])

  const overlay = (
    <Menu>
      {map(languages, (language) => {
        return (
          <Menu.Item
            key={language}
            disabled={language === currentLanguage}
            onClick={() => handleOnLanguageSelected(language)}
          >
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
