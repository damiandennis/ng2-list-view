export default {
  entry: 'dist/list-view.module.js',
  dest: 'dist/bundles/ng2-list-view.umd.js',
  sourceMap: false,
  format: 'umd',
  moduleName: 'ng2.list.view',
  globals: {
    '@angular/core': 'ng.core',
    '@angular/forms': 'ng.forms',
    '@angular/common': 'ng.common'
  }
}