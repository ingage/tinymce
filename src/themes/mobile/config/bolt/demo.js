configure({
  configs: [
    './../../../../core/config/bolt/demo.js',
    './prod.js'
  ],
  sources: [
    source('amd', 'ephox/imagetools', '../../../../../node_modules/@ephox/imagetools/src/main/js', mapper.hierarchical),
    source('amd', 'tinymce.themes.mobile.demo', '../../src/demo/js', function (id) {
      return mapper.hierarchical(id).replace(/^tinymce\/themes\/mobile\//, '');
    }),
    source('amd', 'tinymce.themes.mobile', '../../src/main/js', function (id) {
      return mapper.hierarchical(id).replace(/^tinymce\/themes\/mobile\//, '');
    }),

    source('amd', 'ephox.alloy', 'http://lenovo-morgan/me/work/van/alloy/src/main/js', mapper.hierarchical, { absolute: true }),


    source('amd', 'tinymce.themes', '../../../../themes', function (id) {
      var parts = id.split('.');
      return parts.slice(2, 3).concat(['src/main/js']).concat(parts.slice(3)).join('/');
    }),
    source('amd', 'tinymce.plugins', '../../../../plugins', function (id) {
      var parts = id.split('.');
      return parts.slice(2, 3).concat(['src/main/js']).concat(parts.slice(3)).join('/');
    })
  ]
});

