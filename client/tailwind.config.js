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
                    inner: 'var(--background-inner)',
                    'inner-dark': 'var(--background-inner-dark)',
                    'primary-light': 'var(--background-primary-light)',
                },
                button: {
                    alert: 'var(--button-alert)',
                    active: 'var(--button-active)',
                    inactive: 'var(--button-inactive)',
                    'alert-secondary': 'var(--button-alert-secondary)',
                },
                default: {
                    black: 'var(--default-black)',
                    white: 'var(--default-white)',
                    gray: 'var(--default-gray)',
                },
                header: 'var(--default-header)',
                heading: 'var(--default-heading)',
                footer: 'var(--default-footer)',
                line: 'var(--default-line-color)',
                divider: 'var(--default-divider)',
                nav: 'var(--default-nav)',
                facebook: 'var(--provider-facebook)',
                reddit: 'var(--provider-reddit)',
                spotify: 'var(--provider-spotify)',
                twitter: 'var(--provider-twitter)',
                'bar-yellow': 'var(--bar-yellow)',
                'bar-blue': 'var(--bar-blue)',
            },
            fontSize: {
                '2xxl': '1.625rem',
            },
            gridTemplateRows: {
                '1-auto': 'repeat(1, minmax(0, auto))',
                '1-min-content': 'minmax(300px, min-content)',
                'user-page': 'min-content 1fr',
            },
            height: {
                md: '28rem',
                sm: '24rem',
            },
            maxHeight: {
                md: '28rem',
                sm: '24rem',
                xs: '18rem',
            },
            maxWidth: {
                fhd: '1980px',
                '32': '8rem',
                '36': '9rem',
                '40': '10rem',
                'full-m': 'calc(100% - 4rem)',
            },
            minHeight: {
                '64': '16rem',
                '1/2': '50%',
            },
            screens: {
                fhd: '1980px',
            },
            transitionProperty: {
                width: 'width',
                'content-height': 'opacity, color, height',
                'content-width': 'opacity, color, width',
            },
            width: {
                '1/3-m-3': 'calc(33.3333333% - 0.75rem)',
                '1/2-m-2': 'calc(50% - 0.5rem)',
                'full-m': 'calc(100% - 3.5rem)',
            },
        },
    },
    variants: {
        borderWidth: ['responsive', 'hover', 'focus', 'last'],
        display: ['responsive', 'hover', 'focus', 'group-hover'],
        flex: ['responsive', 'hover', 'focus', 'last'],
        margin: ['responsive', 'last'],
        opacity: ['responsive', 'hover', 'focus', 'group-hover'],
        transitionProperty: ['responsive', 'hover', 'focus', 'group-hover'],
        textColor: ['responsive', 'hover', 'focus', 'group-hover'],
        textAlign: ['responsive', 'focus'],
    },
    plugins: [],
}
