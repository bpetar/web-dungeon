<?
$lang = $_GET["lang"];
$langvar = "";
$langsufix = "";
if (isset($lang) && $lang != ""){
  $langvar = "?lang=".$lang;
  $langsufix = "_".$lang;
}
?>
<html>
<title>Mystic peanut - <?=$pageTitle?></title>
<meta http-equiv=Content-Type content="text/html; charset=windows-1252">
<meta content="MPE Homepage" name=description>
<meta content="3D, game, development, company" name=keywords>

<head>
<link href="<?=$DIR?>/styles.css" rel="stylesheet" type="text/css" />
<link rel="image_src" href="http://www.mystic-peanut.com/images/dragonest1thumb.jpg" />
<meta property="og:image" content="http://www.mystic-peanut.com/images/dragonest1thumb.jpg"/>
</head>

<body>

<center>
<div class="title">
	<div><img src="<?=$DIR?>/images/br_Head.jpg"></div>
</div>
<div class="title">
	<div><img src="<?=$DIR?>/images/br_C_Caption.jpg"></div>
	<div class="title_text"><?=$contentTitle?></div>
	<div class="left_title_text">Projects</div>
	<div class="right_title_text">Company</div>
</div>

<table class="mainTable" cellpadding="0" cellspacing="0">
<tr>
  <td valign=top><?include("leftmenu.php");?></td>
  <td width=692 align=left valign=top style="padding-left:10px">