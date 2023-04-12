/*
 * @author 友人a丶
 * @date 2022-08-12
 *
 * */

/*
 * 防止子容器触发父容器的滚动
 * */
$.fn.scrollUnique = function () {
  return $(this).each(function () {
    var eventType = "mousewheel";
    // 火狐是DOMMouseScroll事件
    if (document.mozHidden !== undefined) {
      eventType = "DOMMouseScroll";
    }
    $(this).on(eventType, function (event) {
      // 一些数据
      var scrollTop = this.scrollTop,
        scrollHeight = this.scrollHeight,
        height = this.clientHeight;

      var delta = event.originalEvent.wheelDelta
        ? event.originalEvent.wheelDelta
        : -(event.originalEvent.detail || 0);

      if (
        (delta > 0 && scrollTop <= delta) ||
        (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)
      ) {
        // IE浏览器下滚动会跨越边界直接影响父级滚动，因此，临界时候手动边界滚动定位
        this.scrollTop = delta > 0 ? 0 : scrollHeight;
        // 向上滚 || 向下滚
        event.preventDefault();
      }
    });
  });
};

$(function () {
  //防止重复触发目录滚动
  //正在滚动是 左侧文章目录不重复滚动
  let isScroll = false;
  //文章跟随目录点击
  let needScroll = true; //目录被点击，文章是否滚动
  //目录跟随文章滚动
  let watchScroll = true; //是否需要监听文章滚动
  const line = $(".main-container .line");
  const html = $("html");
  //获取第一个一级索引标题的DOM
  const firstIndex = $(".main-container .main-left li div:first");
  //文章导航
  const navigator = $("#navigator");
  //目录容器
  const space = $("#space");
  const headerTop = 76;
  const menuList = [
    ".first-index",
    ".second-index",
    ".third-index",
    ".fourth-index",
    ".fifth-index"
  ];

  /*阅读导航栏初始化*/
  (function () {
    /*
     * 给目录添加展开伸缩图标
     * */
    $.each(menuList, (index, item) => {
      if (index === menuList.length - 1) return;
      $(item).each(function () {
        const that = $(this);
        if (
          that
            .parent()
            .next()
            .children("div")
            .is(menuList[index + 1])
        ) {
          that.children("div").prepend('<i class="iconfont icon-xiangxiazhankai1"></i>');
        }
      });
    });
  })();

  /*
   * 屏蔽文章导航滚动事件向上传递
   * */
  (function () {
    $(".scroll").scrollUnique();
    $(".scroll").on("scroll", function (e) {
      e.stopPropagation(); //停止向上传递事件
    });
  })();

  /*阅读目录初始化*/
  (function () {
    /*导航跳转*/
    function goto(Index) {
      const tops = Index[0].offsetTop;
      line.height(Index.height()); //初始化滚动条高度
      line.css("top", `${tops}px`); //索引条开始滑动
      /*
       * 判断外层容器是否需要滚动
       * */
      /*向下*/
      const scroll = $(".scroll").get(0); //可滚动的导航
      /*
       * 文章滚动时，目录自动翻页向下、向上
       * */
      if (tops >= scroll.scrollTop + scroll.offsetHeight) {
        /*防止重复触发滚动*/
        if (isScroll) return;
        /*标记正在滚动的状态*/
        isScroll = true;
        $(scroll).animate({ scrollTop: tops - headerTop }, 200, () => (isScroll = false));
      }

      /*向上*/
      if (tops < scroll.scrollTop) {
        /*防止重复触发滚动*/
        if (isScroll) return;
        isScroll = true;
        const scrollTop =
          tops - scroll.offsetHeight < 0 ? 0 : tops - scroll.offsetHeight + headerTop;
        $(scroll).animate({ scrollTop }, 200, () => (isScroll = false));
      }

      /*
       * 同步滚动文章页面
       * */

      /*
       * 判断文章是否需要滚动
       * */
      if (!needScroll) {
        /*
         * 目录跟随文章
         * 跟随完毕，恢复文章跟随目录点击
         * */
        needScroll = true;
        return;
      }
      const anchor = html.find(Index.find("div a").attr("href"));
      if (anchor.length != 0) {
        /*
         * 标记文章正在滚动
         * 屏蔽scroll监听事件
         * */
        watchScroll = false; //屏蔽滚动监听
        const top = anchor.getTop() - (IN_HOME ? headerTop : 0);
        /*
         * 滚动锚点标记
         * */
        html.animate({ scrollTop: top }, 200, function () {
          watchScroll = true;
        });
      }
    }

    /*绑定索引标签的点击事件*/
    $.each(menuList, (index, item) => {
      $("body").on("click", item, function () {
        goto($(this));
        $(".article-title-link").css("color", ""); //重置状态
        $(this).css("color", "var(--theme-color)"); //被选中的索引变为主题色
      });
    });

    /*
     * 初始化导航栏滚动条
     * */
    //文章跟随目录点击
    needScroll = false; //屏蔽第一次滚动，标记文章不需要进行滚动
    firstIndex.trigger("click"); //触发默认的第一个目录的点击事件

    /*
     * 渲染完毕后显示，防抖动闪烁
     * */
    $(".main-left").css("opacity", 1);

    /*
     * 内容滚动同步导航栏
     * */
    let timer = null;

    $(window).on("scroll", function () {
      /*
       * 屏蔽点击滚动时的事件监听
       * 如果文章目录被点击后，文章正在滚动
       * */
      if (!watchScroll) return;
      let top = html.get(0).scrollTop;
      let collects = html.find(".main-content").find("h1,h2,h3,h4,h5,h6");
      let position = null;

      /*
       * 循环判断
       * */
      for (let i = 0; i < collects.length; i++) {
        /*
         * 获取循环的jq对象
         * */
        let that = collects.eq(i);
        /*
         * 无锚点，挑出本次循环
         * */
        if (!that.attr("id")) {
          continue;
        }
        /*
         * 获取屏幕已经滚动的高度
         * */
        let domTop = that.getTop() - (IN_HOME ? headerTop : 0) - 10; // 防止侧边导航高亮到上一个标签
        /*
         * 当前阅读的是最靠近顶部的前一个标题
         * */
        if (domTop > top) {
          /*
           * 特殊处理开始、结尾的目录
           * */
          if (i !== 0) {
            position = i - 1;
          } else {
            position = i;
          }
          break;
        }
      }

      /*
       * 如果不判断，会导致needScroll不会重置
       * 因为页面底部已经没有标签了。
       * */
      if (position === null) position = collects.length - 1;
      let parent = $("a[href='#" + collects.eq(position).attr("id") + "']").parent();
      needScroll = false; //标记文章不需要跟随目录的点击而滚动
      parent.trigger("click");
    });
  })();

  /*
   * 监控阅读位置
   * */
  (function () {
    /*
     * 判断是否存在文章导航
     * 记录数据
     * */
    if (navigator.length > 0) {
      const pos = space.position();
      navigator.css("left", pos.left);
      navigator.css("top", space.getTop());
      navigator.show();
      /*
       * 跟随屏幕大小变化，调整目录的位置
       * */
      enquire.register("screen and (min-width:1024px)", {
        /*屏幕大于1024时监听屏幕大小，更新目录导航位置*/
        match() {
          $(window).on("resize", function () {
            navigator.css("left", space.position().left);
          });
        },
        /*屏幕小于1024时取消监听屏幕大小*/
        unmatch() {
          $(window).off("resize", function () {
            navigator.css("left", space.position().left);
          });
        }
      });
    }
  })();

  /*
   * 文章踩、文章点赞
   * */
  (function () {
    $(".icp-beian div").click(function () {
      /*
       * 判断点赞的是哪一个
       * */
      if ($(".icp-beian div").index(this) === 0) {
        /*
         * 点赞
         * */
        let that = $(this);
        $.post(location.pathname + "?nice=" + Current, function (res) {
          that.find("span").text(parseInt(that.find("span").text()) + 1);
        });
      } else {
        /*
         * 踩
         * */
        let that = $(this);
        $.post(location.pathname + "?bad=" + Current, function (res) {
          that.find("span").text(parseInt(that.find("span").text()) + 1);
        });
      }
    });
  })();
});
