<?php
  //Put email adress here:
  $to = "gijs@de4gees.nl";

  //Define variables and set to empty values
  $nameErr = $emailErr = $msgErr = "";
  $name = $email = $msg = "";

  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty($_POST["name"])) {
      $nameErr = "Name is required.";
   } else {
     $name = test_input($_POST["name"]);
     //Checks if name only contains letters and whitespace
     if (!preg_match("/^[a-zA-Z ]*$/",$name)) {
       $nameErr = "Please enter a valid name.";
     }
   }

   if (empty($_POST["email"])) {
     $emailErr = "Email is required.";
   } else {
     $email = test_input($_POST["email"]);
     //Checks if e-mail address is well-formed
     if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
       $emailErr = "Please enter a valid email adress.";
     }
   }

   if (empty($_POST["msg"])) {
     $msgErr = "Please enter a message.";
   } else {
     $msg = test_input($_POST["msg"]);
   }

 }

 function test_input($data) {
   $data = trim($data);
   $data = stripslashes($data);
   $data = htmlspecialchars($data);
   return $data;
 }

 $errors = array($nameErr, $emailErr, $msgErr);
 $inputNames = array("name", "email", "msg");

 if ($nameErr == "" && $emailErr == "" && $msgErr == "") {
   $msg = "
      <html>
        <head>
          <title>The contact form has sent a mail!</title>
          <style type='text/css'>
            body {
              font-family: arial;
            }
          </style>
        </head>
        <body>
          <h3>Hello NoodleSearching!</h3>
          <p>
            The contact form sent a message for you!
          </p>
          <br>
          <p>
            <b>Name: </b> " . $name . "<br>
            <b>Email: </b>" . $email . "<br>
            <b>Message: </b>" . $msg . "
          </p>
        </body>
      </html>
   ";

   $header =  'From: <' . $name . '>';
   $header .= "MIME-Version: 1.0" . "\r\n";
   $header .= "Content-type:text/html;charset=UTF-8" . "\r\n";
   mail($to, $name, $msg, $header);

   echo "
    <script type='text/javascript'>
      $(document).ready(function() {
        $('form * ').css({
          'transition' : 'none',
          '-moz-transition' : 'none',
          '-webkit-transition' : 'none'
        });

        $('form *').each(function(i) {
          setTimeout(function() {
            $('form * ').eq(i).hide(400);
          }, i * 200);
        });

        setTimeout(function() {
          $('.contact .title').text('Thanks for getting in touch with us!');
        }, 800);
        $('.contact .thankyou-text').delay(1000).css({
          'transition' : 'none',
          '-moz-transition' : 'none',
          '-webkit-transition' : 'none'
        }).slideDown(400);
        $('.contact .social').css({
          'transition' : 'none',
          '-moz-transition' : 'none',
          '-webkit-transition' : 'none'
        }).fadeOut(400);
      });
    </script>
   ";
 }else {
   $script = "";

    for($i = 0; $i <= count($errors) - 1; $i++) {
      if ($errors[$i] != ''){
        $script .= "$('form [name=" . $inputNames[$i] . "]').css({'background-color' : '#FF5050', 'border-color' : '#FF5050', 'color' : '#FFFFFF'}); $('form [errName=" . $inputNames[$i] . "]').html('" . $errors[$i] . "');";
      }else {
        $script .= "$('form [name=" . $inputNames[$i] . "]').css({'background-color' : '#FFFFFF', 'border-color' : '#BFBFBF', 'color' : '#6A6A6A'}); $('form [errName=" . $inputNames[$i] . "]').html('');";
      }
    };

    echo "
      <script type='text/javascript'>
        $(document).ready(function() {
          " . $script . "
        });
      </script>
    ";
 }
?>
