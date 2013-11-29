<?
	//level.php is page for game "In the Nest of the Dragon"
	$DIR='..';
	$pageTitle = "Web Dungeon";
	$contentTitle = "Web Dungeon";
	include("$DIR/templates/header.php");
?>

<?php 
 // Connects to Database 
 mysql_connect("www.mystic-peanut.com", "mysticp_mysticp", "superme2") or die(mysql_error()); 
?>  

<br>
	<h2> &nbsp;Web Dungeon </h2> 
      <h3> &nbsp;Project state: in development.    
      <br> &nbsp;Game genre : WebGL 3D online dungeon crawler..
	  <br> &nbsp;Instructions: QWEASD to move, mouse to click..
      <br>
      <br>

	  
<div style="float:left; width:350px">
&nbsp;
<iframe src="http://www.facebook.com/plugins/like.php?href=http://www.mystic-peanut.com/templates/level.php&amp;send=false&amp;layout=button_count&amp;width=150&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:80px; height:21px;" allowTransparency="true"></iframe>

<!-- Place this tag where you want the +1 button to render -->
<g:plusone size="medium"></g:plusone>

<!-- Place this tag after the last plusone tag -->
<script type="text/javascript">
  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();
</script>




<a href="http://www.mystic-peanut.com/webdungeon/cuber.php"> <img src="<?=$DIR?>/images/webdungeon_golem_660_play.jpg"> </a>
<br>
<a href="http://www.mystic-peanut.com/webdungeon/cuber.php"> Click here to enter dungeon... </a>

<?php include "cuber_visit_counter.php"; ?>




<div style="width:100%;float:left;position:relative">
<h2>COMMENTS</h2>
<?php 
 
 mysql_select_db("mysticp_comments") or die(mysql_error());
 $moderated = 0;
 $writingtime=date("Y-m-d H:i:s",mktime(date('H')+$TIMEZONE_OFFSET,date('i'),date('s'),date("m"),date("d"),date("Y")));

 if (isset($_POST['comment']) && ($_POST['comment']!=""))
 {
	$commentcontent=$_POST['comment'];
   
   //one silly bot kept posting word 'USA' to my comments
   //if(strcmp($commentcontent,"USA")!=0)
   {
     if(isset($_POST['name']) && ($_POST['name']!=""))
       $name=$_POST['name'];
     else
       $name="Anonymous";
     $website=$_POST['website'];
     
     $antibot = $_POST['antibut'];
     if($antibot > 100)
     {
     	$qid = mysql_query("INSERT INTO cuber_comments (username,comment,moderated,website,date) 
                            VALUES ('$name','$commentcontent','$moderated','$website','$writingtime')");
        $mail_subject = "New comment on Cuber from: " + $name;
        $mail_body = "Comment: " + $commentcontent;
        mail('info@mystic-peanut.com', "New comment on Cuber", $commentcontent);
     }
     else
     {
     	$antibootfail = 1;
     }
               
     
   }
 }

 //registration
 if (isset($_POST['feedback']) && ($_POST['feedback']!="") && isset($_POST['name']) && ($_POST['name']!=""))
 {
	$name = $_POST['name'];
	$feedback = $_POST['feedback'];
	$website = "";
	
	$qid_feed = mysql_query("INSERT INTO cuber_comments (username,comment,moderated,website,date) 
                            VALUES ('$name','$feedback','$moderated','$website','$writingtime')");

	mail('info@mystic-peanut.com', "New feedback on Cuber", $feedback);
 }
 
 $data = mysql_query("SELECT * FROM cuber_comments ORDER BY date") 
 or die(mysql_error()); 
 while($info = mysql_fetch_array( $data )) 
 {
  if ($info['moderated'] == '1')
  {
	  Print $info['date']; 
	  Print "<br>";
	  if ($info['website'] != "")
	   Print "<a href='".$info['website']."'>".$info['username']."</a>".":";
	  else
	   Print $info['username'].":";
	  Print " ".$info['comment'] . " "; 
	  Print "<br>";
	  Print "<br>";
  }
 }
 
 if (isset($_POST['email']) && ($_POST['email']!=""))
 {
	mysql_select_db("mysticp_cuberuserdata") or die(mysql_error()); 
	$email = $_POST['email'];
	//check valid email format
	if (filter_var($email, FILTER_VALIDATE_EMAIL))
	{
		$name = $_POST['name'];
		$ip = $_SERVER['REMOTE_ADDR'];
		$pass = 'spas';
		
		//add to database
		$reg_qid = mysql_query("INSERT INTO cuber_users (name,email,password,ip,date) VALUES ('$name','$email','$pass','$ip','$writingtime')");
		
		//notify me by email about new user
        mail('info@mystic-peanut.com', "New user on Cuber", $name);
		
		$registration_good = 1;
	}
	else
	{
		//print warning dialog and offer user to reenter email
		$email_bad = 1;
	}
 }
 
 
 if ($qid) {
   Print "<p style='color:green'>";
   Print "Your comment is awaiting moderation.";
   Print "</p>";
 }
 if ($qid_feed) {
   Print "<p style='color:green'>";
   Print "Your feedback will be added to comments.";
   Print "</p>";
 } 
 if($antibootfail)
 {
   Print "<p style='color:red'>";
   Print "<br> You failed to answer antibot question, please try again. <br><br>";
   Print "</p>";
 }
 if($email_bad)
 {
   Print "<p style='color:red'>";
   Print "<br> Your email was wrong, please try again. <br><br>";
   Print "</p>";
 }
 if($registration_good)
 {
   Print "<p style='color:green'>";
   Print "Thank you for registration. You will be notified of game progress.";
   Print "</p>";
 }
 

?>
<br><br>
----------------------------------------
<br>

<form name="commentForm" action="level.php" method="post">
You can leave a comment here. <br><br>
Name: <br>
<input type="text" name="name" title="Put your name here"><br><br>
Website: <br>
<input type="text" name="website" title="Put your website here and your name will link to it"><br><br>
Comment: <br>
<input type="text" name="comment" title="Put your comment here. This field is obligatory for post to work." style="width:330; height:120"><br><br>
Antibot check: <br>
Enter number larger then 100 
<input type="text" name="antibut" title="Enter some big number here to prove you are human">
<br><br>
<input type="submit" value="Post">
</form>
</div>


</h3>
    





    </TD>
	
<?include ("$DIR/templates/footer.php");?>