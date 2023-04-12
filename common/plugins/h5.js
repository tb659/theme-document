(function () {
  /*
   * h5
   * */
  tinymce.create("tinymce.plugins.h5", {
    init: function (ed, url) {
      ed.addButton("h5", {
        title: "h5标题",
        image: url + "/icon/h-5.svg",
        onclick: function () {
          ed.selection.setContent("[h5]" + ed.selection.getContent() + "[/h5]");
        }
      });
    },
    createControl: function (n, cm) {
      return null;
    }
  });

  tinymce.PluginManager.add("h5", tinymce.plugins.h5);
})();
