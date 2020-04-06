import React, { useEffect } from 'react'

import EmptyData from '@components/EmptyData'
import Heading from '@components/Heading'
import Icon from '@components/Icon'
import SocialPostList from '@components/SocialPostList'
import useSocialPosts from '@hooks/use-social-posts'

/**
 * Social post container containing user posts information
 */
export default () => {
    const [, posts, loadPosts] = useSocialPosts()
    useEffect(() => {
        loadPosts()
    }, [loadPosts])
    return (
        <div className='flex flex-col'>
            <div className='flex items-center justify-between text-default-black'>
                <Heading text='Your Timeline' />
                <button type='button' onClick={() => loadPosts()}>
                    <Icon name='refresh' className='fill-current' />
                </button>
            </div>
            {posts.length > 0 ? (
                <SocialPostList posts={posts} />
            ) : (
                <EmptyData
                    message='Connect to Social Media to view'
                    icon='social'
                    iconClassName='h-10'
                />
            )}
        </div>
    )
}
