module.exports = {
  branches: ['master', 'staging', 'dev'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'eslint'
      }
    ],
    '@semantic-release/release-notes-generator'
  ]
}
