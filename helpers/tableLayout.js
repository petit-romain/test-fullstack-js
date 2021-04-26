import {defaultTo} from 'lodash'

const sorter = (a = {}, b = {}, {type = '', key = ''}) => {
    switch (type) {
        case 'string':
            return defaultTo(a?.key, '').localeCompare(defaultTo(b?.key, ''))
        default:
            return null
    }
}

export {
    sorter
}
