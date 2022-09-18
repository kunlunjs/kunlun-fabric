var cwd = require('./root').cwd;
if (!cwd.endsWith('/kunlun-fabric')) {
    // @ts-ignore
    require('./generator');
}
