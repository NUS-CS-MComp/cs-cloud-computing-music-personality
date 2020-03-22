module.exports = {
    'src/**/*.{js,jsx}': ['npm run lint:eslint', 'npm run lint:prettier'],
    'src/**/*.{css}': ['npm run lint:stylelint'],
    '../server/**/*.py': ['black', 'flake8'],
}
