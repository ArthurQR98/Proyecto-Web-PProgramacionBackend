module.export = {
    apps: [
        {
            name: 'YOUR-PROJECT-NAME-API',
            script: 'main.js',
            env_staging: {
                NODE_ENV: 'production',
            },
        },
    ],
};
