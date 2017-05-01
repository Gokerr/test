<?php
// Establishing connection with server..
 $connection = mysqli_connect("sql106.byethost7.com", "b7_19712337", "ahmet1996");

// Selecting Database
 $db = mysqli_select_db("b7_19712337_data", $connection);

//Fetching Values from URL
$email=$_POST['email1'];
$password= $_POST['password1'];  // Password Encryption, If you like you can also leave sha1

// check if e-mail address syntax is valid or not
$email = filter_var($email, FILTER_SANITIZE_EMAIL); // sanitizing email(Remove unexpected symbol like <,>,?,#,!, etc.)

if (!filter_var($email, FILTER_VALIDATE_EMAIL))
 {
    echo "Invalid Email.......";
 }
else
 {//matching user input email and password with stored email and password in database
	$result = mysqli_query("SELECT * FROM registration WHERE email='$email' AND password='$password'");
    $data = mysqli_num_rows($result);

	if($data==1)
      {

		 echo "Successfully Logged in...";
     window.location.href="src/home.html";
	  }
	else
	{
		echo "Email or Password is wrong...!!!!";
	}
 }

//connection closed
mysqli_close ($connection);
?>
