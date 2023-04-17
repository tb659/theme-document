<?php

/*
 * 文章顶部模板
 * @author 友人a丶
 * @date 2022-07-08
 * */

?>

<!--  标题  -->
<h1>
  <?php echo get_the_title(); ?>
</h1>

<?php
/*
 * 是否显示文章详情
 * */
if (nicen_theme_showInfo()) {

  /*获取作者信息*/
  $author = get_the_author_meta('display_name', $post->post_author);
  $url    = get_the_author_meta('user_url', $post->post_author);

  $category = nicen_theme_getCategory(get_the_ID()); //获取文章分类
  $link     = @get_category_link((get_the_category())[0]->term_id);

?>
  <!--  文章信息  -->
  <!--  仅在文章页面展示 -->
  <div class="article-info">
    <ul>
      <li id="author">
        <i class="iconfont icon-chuangzuozhejieshao"></i>
        <?php echo $author; ?>
      </li>
      <li id="category">
        <i class="iconfont icon-fenlei"></i>
        <a href="<?php echo $link ?>" title=" <?php echo $category; ?>">
          <?php echo $category; ?>
        </a>
      </li>
      <li>
        <i class="fa-regular fa-clock"></i>
        <?php echo nicen_theme_timeToString(get_gmt_from_date(get_the_time("Y-m-d H:i:s"))); ?>
      </li>
      <li>
        <i class="fa-solid fa-fire"></i>
        <?php echo nicen_theme_getPostViews(get_the_ID()); ?>
        热度
      </li>
      <li style="border:none">
        <i class="fa-regular fa-comment-dots"></i>
        <?php echo get_comments_number(); ?>
        评论
      </li>
      <?php if (get_edit_post_link() != null) { ?>
        <li style="border:none">
          <i class="fa-regular fa-pen-to-square"></i>
          <a href="<?php echo get_edit_post_link(); ?>">
            编辑
          </a>
        </li>
      <?php } ?>
    </ul>
  </div>
<?php
}
