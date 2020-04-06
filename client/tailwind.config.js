module.exports = {
    theme: {
        extend: {
            boxShadow: {
                nav:
                    '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
            },
            colors: {
                secondary: '#F7F7F7',
                facebook: '#1976D2',
                reddit: '#FF5722',
                spotify: '#1DB954',
                twitter: '#03A9F4',
            },
            flex: {
                '2': '2 1 0%',
                '4': '4 1 0%',
            },
            screens: {
                fhd: '1980px',
            },
        },
    },
    variants: {
        margin: ['responsive', 'last'],
    },
    plugins: [],
}
