<?php
// define variables and set to empty values
$nameErr = $emailErr = $messageErr = "";
$name = $email = $subject = $comment = $success = "";
$nameValidRegex = "/^[a-zA-Z ]*$/";

if($_SERVER["REQUEST_METHOD"] == "POST"){
    //name, email, and message are required fields

    //check name field
    if(empty($_POST["name"])){
        $nameErr = "Name is required";
    } 
    else{
        $name = validate_Input($_POST["name"]);
        if(!preg_match($nameValidRegex,$name)){
            $nameErr = "Only letters and whitespace allowed";
        }
    }

    //check for valid email
    if(empty($_POST["email"])){
        $emailErr = "Email is required";
    }
    else{
        $email = validate_Input($_POST["email"]);
        if(!filter_var($email,FILTER_VALIDATE_EMAIL)){
            $emailErr = "Invalid email format";
        }
    }

    //check for message
    if(empty($_POST["message"])){
        $messageErr = "Message must have text";
    }
    else{
        $comment = validate_Input($_POST["message"]);
    }

    //check for subject
    if(empty($_POST["subject"])){
        $subject = "";
    }
    else{
        $subject = validate_Input($_POST["subject"]);
    }

    if(empty($nameErr) && empty($emailErr) && empty($messageErr)){
        $headers = "From: ". $name . "\r\n";
        mail("admin@mphillips.dev",$subject,$comment,$headers);
        $success = "Mail SeNt";
    }
}


function validate_Input($input){
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
?>