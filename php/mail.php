<?php

if(isset($_POST['LinkedInName']) && isset($_POST['LinkedInHeadline']) && isset($_POST['LinkedInProfile']) && isset($_POST['vacancyTitle'])) {
    $to = 'info@corevalue.net';
    $subject = 'Send Profile LinkedIn';
    $message = '
            <html>
                <head>
                    <title>'.$subject.'</title>
                </head>
                <body>
                    <p><strong>Vacancy: </strong>'.$_POST['vacancyTitle'].'</p>
                    <p><strong>Name: </strong>'.$_POST['LinkedInName'].'</p>
                    <p><strong>Position: </strong>'.$_POST['LinkedInHeadline'].'</p>
                    <p><strong>Profile link: </strong><a href="'.$_POST['LinkedInProfile'].'">'.$_POST['LinkedInProfile'].'</a></p>
                </body>
            </html>';
    $headers  = "Content-type: text/html; charset=utf-8 \r\n";
    mail($to, $subject, $message, $headers);
}

function scrub($text)
{
    return htmlspecialchars(trim($text));
}

if (isset($_POST['Message']) && isset($_POST['Name']) && isset($_POST['Email'])) {
    echo mail(
        'info@corevalue.net',
        'CoreValue website contact form message',
        scrub($_POST['Message']),
        'From: ' . scrub($_POST['Name']) . ' <' . scrub($_POST['Email']) . '>' . PHP_EOL
    );
}