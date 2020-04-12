module.exports = {
    theme: {
        extend: {
            boxShadow: {
                nav:
                    '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
            },
            colors: {
                background: {
                    primary: 'var(--background-primary)',
                    secondary: 'var(--background-secondary)',
                },
                default: {
                    black: 'var(--default-black)',
                    white: 'var(--default-white)',
                    gray: 'var(--default-gray)',
                },
                header: 'var(--default-header)',
                footer: 'var(--default-footer)',
                line: 'var(--default-line-color)',
                nav: 'var(--default-nav)',
                facebook: 'var(--provider-facebook)',
                reddit: 'var(--provider-reddit)',
                spotify: 'var(--provider-spotify)',
                twitter: 'var(--provider-twitter)',
            },
            gridTemplateRows: {
                '1-auto': 'repeat(1, minmax(0, auto))',
                '2-auto': 'repeat(2, minmax(0, auto))',
                '3-auto': 'repeat(3, minmax(0, auto))',
                '4-auto': 'repeat(4, minmax(0, auto))',
                '5-auto': 'repeat(5, minmax(0, auto))',
                '6-auto': 'repeat(6, minmax(0, auto))',
            },
            maxWidth: {
                fhd: '1980px',
            },
            minHeight: {
                '64': '16rem',
            },
            screens: {
                fhd: '1980px',
            },
            transitionProperty: {
                move: 'opacity, transform',
            },
        },
    },
    variants: {
        margin: ['responsive', 'last'],
        transitionProperty: ['responsive', 'hover', 'focus'],
    },
    plugins: [],
}
