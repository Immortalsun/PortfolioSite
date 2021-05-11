<?php

    if (isset($_POST['submit']))
    {
        //Gather information submitted in form
        $name = $_POST['name'];
        $mailFrom = $_POST['email'];
        $subject = $_POST['subject'];
        $message = $_POST['message'];

        //Prep message data
        $mailTo = "admin@mphillips.dev";
        $headers = "From: ".$mailFrom;
        //Format actual email textual content
        $text = "Message received from ".$name.":\n\n".$message;

        mail(@$mailTo, $subject, $text, $headers);
        header("Location: index2.html?mailsend");
    }

?>