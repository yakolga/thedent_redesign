<?php 

$name = $_POST['name'];
$surname = $_POST['surname'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$question = $_POST['question'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'mail.adm.tools';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'dentistry@thedent.com.ua';                 // Наш логин
$mail->Password = 'tJ8d@24B-@Mf';                           // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('dentistry@thedent.com.ua', 'The Dent');   // От кого письмо 
$mail->addAddress('aleksanderkulczycki55@gmail.com');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Дані';
$mail->Body    = '
	Користувач залишив дані<br>
	Ім"я: ' . $name . ' <br>
	Прізвище: ' . $surname . '<br>
	Номер телефону: ' . $phone . ' <br>
	E-mail: ' . $email . ' <br>
	Повідомлення: ' . $question . '';

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>