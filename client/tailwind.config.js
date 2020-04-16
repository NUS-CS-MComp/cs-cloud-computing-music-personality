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
                'user-page': 'min-content 1fr',
            },
            maxWidth: {
                fhd: '1980px',
            },
            minHeight: {
                '64': '16rem',
                '1/2': '50%',
            },
            screens: {
                fhd: '1980px',
            },
            width: {
                '1/3-m-4': 'calc(33.3333333% - 0.75rem)',
            },
        },
    },
    variants: {
        flex: ['responsive', 'hover', 'focus', 'last'],
        margin: ['responsive', 'last'],
        opacity: ['responsive', 'hover', 'focus', 'group-hover'],
        transitionProperty: ['responsive', 'hover', 'focus', 'group-hover'],
        textColor: ['responsive', 'hover', 'focus', 'group-hover'],
        textAlign: ['responsive', 'focus'],
    },
    plugins: [],
}
