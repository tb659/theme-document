<?php

/*
 * 顶部导航栏模板
 * @author 友人a丶
 * @date 2022-07-08
 * */

/*
 * 判断菜单是否已经被分配，分配则显示菜单
 * */
if (has_nav_menu('top-menu')) {
  wp_nav_menu([
    'theme_location' => 'top-menu',
    'menu_class'     => 'menu',
    'container'      => 'ul',
    'items_wrap'     => '<ul id="%1$s" class="%2$s menu-nav"> <li class="menu-item read-mode"><i class="fa-regular fa-sun" style="color: #000;"></i></li>%3$s</ul>',
    'walker'         => (new Walker_Nav_Menu())
  ]);
}
?>

<div class="user-menu-plane user-menu-wrap">
  <?php
  if (isLogin()) {
  ?>
    <ul class="user-menu">
      <li class="menu-item menu-item-has-children">
        <a class="user-menu-main">
          <img class="user-avatar" width="30" height="30" src="<?php echo corepress_get_avatar_url() ?>">
          <span class="user-menu-name">
            <?php echo corepress_get_user_nickname() ?></span>
        </a>
        <ul class="user-sub-menu sub-menu">
          <?php
          if (isAdmin()) {
          ?>
            <li class="menu-item">
              <a href="<?php echo admin_url(); ?>">
                <i class="fas fa-tachometer-alt"></i>
                管理中心
              </a>
            </li>
          <?php
          }
          if (current_user_can('edit_posts')) {
          ?>
            <li class="menu-item">
              <a href="<?php echo admin_url() . 'post-new.php'; ?>">
                <i class="far fa-edit"></i>
                新建文章
              </a>
            </li>
          <?php
          }
          ?>
          <li class="menu-item">
            <a href="<?php echo wp_logout_url(apply_filters('the_permalink', get_permalink(), '')); ?>">
              <i class="fas fa-sign-out-alt"></i>
              注销登录
            </a>
          </li>
        </ul>
      </li>
    </ul>
  <?php
  } else {
  ?>
    <div class="user-menu-main user-menu-main-notlogin">
      <a href="<?php echo loginAndBack(); ?>" class="login-btn">
        登录
      </a>
    </div>
  <?php
  }
  ?>
</div>
