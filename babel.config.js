const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

const plugins = [
  [
    'prismjs',
    {
      languages: ['javascript', 'css', 'markup', 'json', 'bash'],
      plugins: ['line-numbers'],
      theme: 'okaidia',
      css: true
    }
  ]
]
if (IS_PROD) {
  plugins.push('transform-remove-console')
}

// lazy load ant-design-vue
// if your use import on Demand, Use this code
plugins.push([
  'import',
  {
    libraryName: 'ant-design-vue',
    libraryDirectory: 'es',
    style: true // `style: true` 会加载 less 文件
  }
])

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3
      }
    ]
  ],
  plugins
}
