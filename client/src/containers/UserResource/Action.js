import React from 'react'
import { useDispatch } from 'react-redux'

import Heading from '@components/Heading'
import Icon from '@components/Icon'
import { deleteUser } from '@redux/actions/user'

/**
 * Extra user action handling container
 */
export default () => {
    const dispatch = useDispatch()
    return (
        <div className='text-left flex flex-col'>
            <div className='flex items-center justify-between text-default-black'>
                <Heading
                    text='Danger Zone'
                    subheading='Some dangerous actions to perform'
                />
            </div>
            <div className='block bg-default-white rounded-lg'>
                <div className='bg-button-alert rounded-t-lg relative h-18 py-2'>
                    <Icon
                        name='alert'
                        color='default-white'
                        className='h-8 mr-auto ml-4 object-cover'
                    />
                </div>
                <div className='p-4'>
                    <div className='flex flex-col'>
                        <button
                            className='my-2 p-2 w-56 uppercase font-bold bg-button-alert rounded text-default-white duration-200 transition-opacity hover:opacity-75'
                            type='button'
                            onClick={() => dispatch(deleteUser())}
                        >
                            Remove my account
                        </button>
                        <span className='text-xs font-semibold text-button-alert'>
                            <span className='font-bold'>ATTENTION: </span>This
                            will remove all details related to your account
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
