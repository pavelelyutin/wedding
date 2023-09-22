<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require './phpmailer/src/Exception.php';
require './phpmailer/src/PHPMailer.php';
require './phpmailer/src/SMTP.php';

if (!error_get_last()) {

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

$name = $_POST['user_name'];
$lastName = $_POST['user_lastname'];
$phone = $_POST['user_phone'];
$guest = $_POST['user_guest'];

    //Server settings

    $mail->isSMTP();                                            //Send using SMTP
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication

    // $mail->SMTPDebug = 2;                      //Enable verbose debug output
    $mail->Debugoutput = function($str, $level) {$GLOBALS['data']['debug'][] = $str;};    

    $mail->Host       = 'smtp.gmail.com';                       //Set the SMTP server to send through    
    $mail->Username   = 'rdwhtr@gmail.com';                     //SMTP username
    $mail->Password   = 'xsyvbguzoswyrent';                     //SMTP password
    $mail->SMTPSecure = 'ssl';            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('rdwhtr@gmail.com', 'WEDDING VLASOV & SINICHKINA');
    $mail->addAddress('elyutin.pavel@gmail.com', 'Joe User');   //Add a recipient

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'WEDDING VLASOV & SINICHKINA';
    $mail->Body    = 'Здравствуйте, дорогие молодожены. Я, '.  $name . ' ' . $lastName . ' буду присутствовать у Вас на свадьбе. <br> Мой номер телефона: '. $phone . '<br>Хорошего дня!';

    // Проверяем отправленность сообщения
    if ($mail->send()) {
        $data['result'] = "success";
        $data['info'] = "Сообщение успешно отправлено!";
    } else {
        $data['result'] = "error";
        $data['info'] = "Сообщение не было отправлено. Ошибка при отправке письма";
        $data['desc'] = "Причина ошибки: {$mail->ErrorInfo}";
    }
    
} else {
    $data['result'] = "error";
    $data['info'] = "В коде присутствует ошибка";
    $data['desc'] = error_get_last();
}

// Отправка результата
header('Content-Type: application/json');
echo json_encode($data);

?>