import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Icon from '@components/Icon'
import ProfileField from '@components/UserResource/ProfileField'
import formatTimeStamp from '@utils/format-unix-time'

/**
 * User profile component with input handling
 */
const Profile = ({ profile, id, sid, timestamp, onChangeCommit }) => {
    const [editable, setEditable] = useState(false)
    const setEditableTrue = () => setEditable(true)
    const setEditableFalse = () => setEditable(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {}
        for (let index = 0; index < e.target.length; index += 1) {
            const { name, value, defaultValue } = e.target[index]
            if (name !== '' && value !== '' && value !== defaultValue) {
                formData[name] = value
            }
        }
        onChangeCommit(formData)
        setEditableFalse()
    }
    return (
        <div className='flex-1 h-full bg-default-white rounded-lg'>
            <div className='bg-spotify rounded-t-lg relative h-18 py-2'>
                <Icon
                    name='disc'
                    color='default-white'
                    className='h-8 mr-auto ml-4 object-cover'
                />
            </div>
            <div className='p-4'>
                <form
                    className='h-full flex flex-col'
                    id='profile'
                    autoComplete='off'
                    onSubmit={handleSubmit}
                >
                    <div className='my-auto'>
                        <ProfileField
                            name='name'
                            label='name'
                            value={profile.user_name}
                            editable={editable}
                            emptyClick={setEditableTrue}
                        />
                        <ProfileField
                            name='short_bio'
                            label='short bio'
                            value={profile.short_bio}
                            editable={editable}
                            emptyClick={setEditableTrue}
                        />
                        <hr className='border-line my-4' />
                        <ProfileField name='ID' value={id} />
                        <ProfileField name='Session' value={sid} />
                        <ProfileField
                            name='Registered at'
                            value={formatTimeStamp(timestamp)}
                        />
                    </div>
                    <div className='flex mt-4'>
                        {editable ? (
                            <>
                                <button
                                    type='button'
                                    className='uppercase font-bold flex-1 p-2 mr-2 bg-background-secondary rounded duration-200 transition-opacity hover:opacity-75 md:w-32 lg:flex-initial'
                                    onClick={setEditableFalse}
                                >
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    className='uppercase font-bold flex-1 p-2 bg-button-alert rounded text-default-white duration-200 transition-opacity hover:opacity-75 md:w-32 lg:flex-initial'
                                >
                                    Change
                                </button>
                            </>
                        ) : (
                            <button
                                type='button'
                                onClick={setEditableTrue}
                                className='uppercase font-bold w-full p-2 bg-button-active text-default-white rounded duration-200 transition-opacity hover:opacity-75 lg:w-32'
                            >
                                Edit
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

Profile.propTypes = {
    /**
     * Profile data
     */
    profile: PropTypes.shape({
        user_name: PropTypes.string,
        short_bio: PropTypes.string,
    }).isRequired,
    /**
     * User ID
     */
    id: PropTypes.string.isRequired,
    /**
     * User session ID
     */
    sid: PropTypes.string.isRequired,
    /**
     * User creation timestamp
     */
    timestamp: PropTypes.number.isRequired,
    /**
     * Function handler for submitted change
     */
    onChangeCommit: PropTypes.func.isRequired,
}

export default Profile
