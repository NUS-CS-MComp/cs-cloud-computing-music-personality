module.exports = {
    'src/**/*.{js,jsx}': [
        'npm run lint:eslint',
        'npm run lint:stylelint',
        'npm run lint:prettier',
    ],
    '../server/**/*.py': ['black', 'flake8'],
}
