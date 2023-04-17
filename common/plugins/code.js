(function () {
  /*
   * 代码文字块
   * */
  tinymce.create("tinymce.plugins.code", {
    init: function (ed, url) {
      ed.addButton("code", {
        title: "代码高亮",
        image: url + "/icon/code.svg",
        onclick: function () {
          ed.windowManager.open({
            title: "代码高亮",
            //icon:'',
            minWidth: 700,
            body: [
              {
                type: "listbox",
                name: "lang",
                label: "选择语言",
                values: [
                  {
                    text: "bash",
                    value: "bash"
                  },
                  {
                    text: "c",
                    value: "c"
                  },
                  {
                    text: "c#",
                    value: "c#"
                  },
                  {
                    text: "c++",
                    value: "c++"
                  },
                  {
                    text: "css",
                    value: "css"
                  },
                  {
                    text: "css-extras",
                    value: "css-extras"
                  },
                  {
                    text: "docker",
                    value: "docker"
                  },
                  {
                    text: "go",
                    value: "go"
                  },
                  {
                    text: "git",
                    value: "git"
                  },
                  {
                    text: "html",
                    value: "html"
                  },
                  {
                    text: "http",
                    value: "http"
                  },
                  {
                    text: "icon",
                    value: "icon"
                  },
                  {
                    text: "java",
                    value: "java"
                  },
                  {
                    text: "javascript",
                    value: "javascript"
                  },
                  {
                    text: "jq",
                    value: "jq"
                  },
                  {
                    text: "js-extras",
                    value: "js-extras"
                  },
                  {
                    text: "json5",
                    value: "json5"
                  },
                  {
                    text: "json",
                    value: "json"
                  },
                  {
                    text: "markdown",
                    value: "markdown"
                  },
                  {
                    text: "nginx",
                    value: "nginx"
                  },
                  {
                    text: "php",
                    value: "php"
                  },
                  {
                    text: "phpdoc",
                    value: "phpdoc"
                  },
                  {
                    text: "php-extras",
                    value: "php-extras"
                  },
                  {
                    text: "plsql",
                    value: "plsql"
                  },
                  {
                    text: "python",
                    value: "python"
                  },
                  {
                    text: "redis",
                    value: "redis"
                  },
                  {
                    text: "ruby",
                    value: "ruby"
                  },
                  {
                    text: "sql",
                    value: "sql"
                  }
                ]
              },
              {
                type: "textbox",
                name: "code",
                label: "代码块",
                multiline: true,
                minHeight: 200
              }
            ],
            onsubmit: function (e) {
              var code = e.data.code.replace(/\r\n/gim, "\n"),
                lang = e.data.lang;
              code = tinymce.html.Entities.encodeAllRaw(code);
              ed.insertContent(
                `<pre class="line-numbers language-${lang}"><code class="language-${lang}">${code}\n</code></pre>&nbsp;`
              );
            }
          });
        }
      });
    },
    createControl: function (n, cm) {
      return null;
    }
  });

  tinymce.PluginManager.add("code", tinymce.plugins.code);
})();
