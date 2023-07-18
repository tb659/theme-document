<?php
/*
 * 处理所有前端请求
 * */

/*
 * 链接提交
 * */
function nicen_theme_auth()
{
  $private = get_option("document_private");

  if (empty($_GET['private']) && empty($_POST['private'])) {
    exit(json_encode([
      'code'   => 0,
      'result' => "密钥为空"
    ]));
  }

  if (($_GET['private'] ?? "") != $private && ($_POST['private'] ?? "") != $private) {
    exit(json_encode([
      'code'   => 0,
      'result' => "密钥有误"
    ]));
  }
}

/*
 * 点赞
 * */
if (isset($_GET['nice'])) {
  if (is_numeric($_GET['nice'])) {
    nicen_theme_setPostNice($_GET['nice']);

    exit(json_encode([
      'code'   => 1,
      'errMsg' => "点赞成功！"
    ]));
  }
}

/*
 * 踩
 * */
if (isset($_GET['bad'])) {
  if (is_numeric($_GET['bad'])) {
    nicen_theme_setPostBad($_GET['bad']);
    exit(json_encode([
      'code'   => 1,
      'errMsg' => "踩成功！"
    ]));
  }
}

/*
 * 百度链接提交
 * */
if (isset($_GET['submit'])) {

  nicen_theme_auth(); //权限验证

  $token = get_option("document_baidu");

  $site = get_option("document_baidu_site");

  /*
	 * 检查token
	 * */
  if (empty($token)) {
    exit(json_encode([
      'code'   => 0,
      'result' => "token尚未填写，无法进行推送！请先保存"
    ]));
  }

  /*
	 * 检查站点
	 * */
  if (empty($site)) {
    exit(json_encode([
      'code'   => 0,
      'result' => "站点尚未填写，无法进行推送！请先保存"
    ]));
  }

  $api = 'http://data.zz.baidu.com/urls?site=' . $site . '&token=' . $token;

  /*
   * 请求头模拟
   * */
  $headers = [
    'User-Agent'   => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
    'Content-Type' => 'text/plain'
  ];

  /*
	 * 请求数据
	 * */
  $res = wp_remote_post($api, [
    'body'      => implode("\n", nicen_theme_getLinks()),
    'headers'   => $headers,
    'sslverify' => false,
    'timeout'   => 120,
  ]);

  /*
	 * 输出推送结果
	 * */
  exit(json_encode([
    'code'   => 0,
    'result' => wp_remote_retrieve_body($res)
  ]));
}

/*
* 链接遍历
* */
if (isset($_GET['sitemap'])) {

  nicen_theme_auth(); //权限验证

  if (!is_writable($_SERVER['DOCUMENT_ROOT'])) {
    exit(json_encode([
      'code'   => 0,
      'result' => '根目录不可写，站点地图生成失败！'
    ]));
  }
  if (file_put_contents('sitemap.txt', implode("\n", nicen_theme_getLinks()), LOCK_EX)) {
    exit(json_encode([
      'code'   => 1,
      'result' => '站点地图生成成功！'
    ]));
  } else {
    exit(json_encode([
      'code'   => 0,
      'result' => '站点地图生成失败！'
    ]));
  }
}

/*
 * 请求回复默认配置
 * */
if (isset($_GET['default'])) {
  nicen_theme_auth(); //权限验证
  foreach (CONFIG as $key => $value) {
    update_option($key, $value);
  }
  exit(json_encode([
    'code'   => 1,
    'result' => '成功！'
  ]));
}
