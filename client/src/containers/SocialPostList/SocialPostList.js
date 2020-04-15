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
        <div className='md:flex md:flex-col md:max-h-full md:min-h-full'>
            <div className='flex items-center justify-between text-default-black'>
                <Heading
                    text='Timeline'
                    subheading='Your history posts on social media'
                />
                <button type='button' onClick={() => loadPosts()}>
                    <Icon name='refresh' className='h-6 fill-current' />
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
