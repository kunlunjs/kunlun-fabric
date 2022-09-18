const { cwd } = require('./root')

if (!cwd.endsWith('/kunlun-fabric')) {
  // @ts-ignore
  require('./generator')
}
