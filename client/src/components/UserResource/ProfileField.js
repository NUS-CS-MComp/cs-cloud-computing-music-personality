import React from 'react'
import PropTypes from 'prop-types'

import toCamelCase from '@utils/camel-case'

/**
 * Profile field component with defined text alignment
 */
const ProfileField = ({ label, name, value, small, editable, emptyClick }) => (
    <label
        className={`flex justify-between mb-2 last:mb-0 ${
            editable ? 'items-center' : 'items-start'
        } lg:flex-col lg:items-start`}
    >
        <span
            className={`whitespace-no-wrap font-bold ${
                small ? 'text-sm' : 'text-base'
            }`}
        >
            {toCamelCase(label === '' ? name : label)}:
        </span>
        <div className='flex items-end w-full md:max-w-md'>
            {editable ? (
                <input
                    form='profile'
                    className='ml-4 bg-background-secondary p-2 w-full rounded lg:ml-0 lg:my-1'
                    type='input'
                    maxLength='50'
                    name={name}
                    defaultValue={value || ''}
                    placeholder={`Enter your ${label.toLowerCase()}`}
                />
            ) : (
                <span
                    className={`w-full text-default-black text-right ml-4 ${small &&
                        'text-sm'} lg:text-left lg:ml-0`}
                >
                    {value || (
                        <button
                            type='button'
                            className='text-default-gray cursor-text'
                            onClick={emptyClick}
                        >{`Click to edit your ${label.toLowerCase()}`}</button>
                    )}
                </span>
            )}
        </div>
    </label>
)

ProfileField.propTypes = {
    /**
     * Label name
     */
    name: PropTypes.string.isRequired,
    /**
     * Label representation
     */
    label: PropTypes.string,
    /**
     * Value
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Boolean flag of small text
     */
    small: PropTypes.bool,
    /**
     * Boolean flag for editable input
     */
    editable: PropTypes.bool,
    /**
     * Click handler for empty value
     */
    emptyClick: PropTypes.func,
}

ProfileField.defaultProps = {
    label: '',
    value: '',
    editable: false,
    emptyClick: () => {},
}

export default ProfileField
