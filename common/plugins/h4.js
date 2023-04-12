(function () {
  /*
   * h4
   * */
  tinymce.create("tinymce.plugins.h4", {
    init: function (ed, url) {
      ed.addButton("h4", {
        title: "h4标题",
        image: url + "/icon/h-4.svg",
        onclick: function () {
          ed.selection.setContent("[h4]" + ed.selection.getContent() + "[/h4]");
        }
      });
    },
    createControl: function (n, cm) {
      return null;
    }
  });

  tinymce.PluginManager.add("h4", tinymce.plugins.h4);
})();
