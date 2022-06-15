<?php $url = get_template_directory_uri();//主题url?>
<!DOCTYPE html>
<html lang="zh-cn" xmlns="http://www.w3.org/1999/html">
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>"/>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<title><?php if ( is_page() || is_single() ) {
        the_title();
        echo "－";
        bloginfo( 'name' );
    } else {
        bloginfo( 'name' );
        echo "－";
		documents( 'document_subtitle' );
    } ?></title>
<meta name="keywords" content="<?php documents( 'document_keywords' ); ?>"/>
<?php if(is_single()){ ?>
<meta name="description" content="<?php getExcerpt( get_the_excerpt(),$post->post_password ); ?>"/>
<?php }else{ ?>
<meta name="description" content="<?php documents( 'document_description' ); ?>"/>
<?php } ?>
<link href="<?= $url; ?>/favicon.ico" rel="shortcut icon" type="image/x-icon"/>
<?php wp_head(); ?>
<script>
    <?php echo (is_single())?'window.Current='.get_the_ID().";":""; ?>
    /*同步rem单位大小*/
    window.ROOT = "<?=$url ; ?>";
    let l = () => {
        let r = document.documentElement, o = r.offsetWidth / 100;
        o < 17 && (o = 17), r.style.fontSize = o + "px", window.rem = o
    };
    window.onresize = l;
    l();
    /*同步主题*/
    let theme = localStorage.getItem('theme-color');
    if (!!theme) {
        $('html').addClass(theme)
    }
    /*同步阅读模式 */
    let night = localStorage.getItem('night');
    if (!!night) {
        $('html').addClass('dark')
        $(function () {
            $('.readMode img').attr('src', ROOT + '/assets/images/anhei.svg').attr("title", '切换白天模式')
        });
    }
</script>
</head>
<body>
<!--顶部导航栏-->
<header class="main-header">
    <!--  顶部左侧标题 和 logo -->
    <div class="left">
        <img class="logo" src="<?php documents( 'document_logo_url' ); ?>" title="logo"/>
        <a href="/" title="回到首页"><h2 class="title tooltip" data-hint="<?php echo bloginfo( 'name' ); ?>"><?php echo bloginfo( 'name' ); ?> </h2></a>
    </div>
    <!--  右边导航栏  -->
    <div class="right">
        <!--  搜索图标  -->
        <div class="search-icon iconfont icon-sousuo"></div>
        <!--  搜索框  -->
        <input id="search" class="search" type="text" placeholder="输入关键词回车搜索"/>
        <!--菜单栏-->
		<?php get_template_part( 'template/index/nav_menu' ); ?>
    </div>
</header>
