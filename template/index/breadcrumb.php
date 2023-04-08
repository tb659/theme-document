<?php

/*
 * 文章顶部面包屑
 * @author 友人a丶
 * @date 2022-07-08
 * */

/*
 * 是否需要显示
 * */

if (nicen_theme_showBread()) {
  /*
	 * 是否有目录
	 * */
  if (empty(get_the_category())) {
    $no_category = true;
  } else {
    $category    = get_the_category()[0]->cat_name; //目录名
    $link        = get_category_link(get_the_category()[0]->term_id); //目录地址
    $no_category = false;
  }

  /*
	 * 是否有标签
	 * */
  if (empty(get_the_tags())) {
    $no_tag = true;
  } else {
    $tags    = get_the_tags()[0]->name; //目录名
    $linkTag = get_term_link(get_the_tags()[0]->term_id); //目录地址
    $no_tag  = false;
  }

?>
  <div class="breadcrumb">
    现在位置: <a href="/" title="首页">首页</a>
    <?php if (!$no_category) { ?>
      /
      <a href="<?php echo $link ?>" title=" <?php echo $category; ?>"> <?php echo $category; ?></a>
    <?php }
    if (!$no_tag) { ?>
      /
      <a href="<?php echo $linkTag ?>" title=" <?php echo $tags; ?>"> <?php echo $tags; ?></a>
    <?php } ?>
    / 正文
  </div>
<?php
}
