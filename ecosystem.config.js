module.exports = {
  apps: [{
    name: '',
    script: '',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '100M',
    env_production: {
      NODE_ENV: 'production',
      PORT: 8000,
    },
  }],

  deploy: {
    development: {
      user: '',
      host: '',
      ref: 'origin/master',
      repo: 'git@github.com:',
      path: '/',
      'post-deploy': 'yarn && yarn build && pm2 reload ecosystem.config.js --env development',
    },
    production: {
      user: '',
      host: '',
      ref: 'origin/master',
      repo: 'git@github.com:',
      path: '/',
      'post-deploy': 'yarn && yarn build && pm2 reload ecosystem.config.js --env production',
    },
  },
}
