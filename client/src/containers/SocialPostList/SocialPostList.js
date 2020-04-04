import React, { useEffect } from 'react'

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
        <div>
            <div className='flex items-center justify-between'>
                <h2 className='font-extrabold text-2xl mb-2 md:mb-4'>
                    Your Timeline
                </h2>
                <button type='button' onClick={() => loadPosts()}>
                    <Icon name='refresh' className='fill-current' />
                </button>
            </div>
            <SocialPostList posts={posts} />
        </div>
    )
}
