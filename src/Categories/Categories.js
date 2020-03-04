import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const Categories = props => {
    const [categories, setCategories] = useState(0);

    useEffect(() => {
        fetch(`/categories?token=${encodeURIComponent(props.accessToken)}`)
            .then(response => response.json())
            .then(state => {
                setCategories(state.data.categories.items.map(v => v.name));
            });
    }, [props.accessToken]);

    return <div>{categories ? categories.map(item => <div key={item}>{item}</div>) : ''}</div>;
};

const mapStateToProps = state => {
    return {
        accessToken: state.accessToken,
    };
};

export default connect(mapStateToProps, null)(Categories);
