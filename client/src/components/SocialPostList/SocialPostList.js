import React from 'react'
import PropTypes from 'prop-types'

import SocialPost from '@components/SocialPostList/SocialPost'

/**
 * Component for displaying list of social media posts
 */
const SocialPostList = ({ posts }) => (
    <div className='overflow-x-auto text-left flex flex-no-wrap md:overflow-x-hidden md:flex-wrap md:max-h-screen'>
        {posts.map((post) => (
            <SocialPost
                key={post.id}
                message={post.message}
                time={post.time}
                provider={post.provider}
            />
        ))}
    </div>
)

SocialPostList.propTypes = {
    /**
     * Social post data list
     */
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            message: PropTypes.string,
            time: PropTypes.number,
            provider: PropTypes.string,
        })
    ).isRequired,
}

export default SocialPostList
