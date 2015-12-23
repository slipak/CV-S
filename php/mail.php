<?php
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