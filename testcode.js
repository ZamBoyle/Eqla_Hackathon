const getGithubCode = require('get-github-code');

const url = 'https://github.com/diegozanon/get-github-code';

getGithubCode(url)
    .then(() => {
        console.log('success');
    })
    .catch(console.error);