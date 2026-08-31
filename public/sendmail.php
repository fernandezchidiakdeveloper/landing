<?php
$phpMailerBasePath = __DIR__ . '/PHPMailer';
$phpMailerSrcPath  = $phpMailerBasePath . '/src';

if (file_exists($phpMailerSrcPath . '/PHPMailer.php')) {
    require $phpMailerSrcPath . '/PHPMailer.php';
    require $phpMailerSrcPath . '/SMTP.php';
    require $phpMailerSrcPath . '/Exception.php';
} elseif (file_exists($phpMailerBasePath . '/PHPMailer.php')) {
    require $phpMailerBasePath . '/PHPMailer.php';
    require $phpMailerBasePath . '/SMTP.php';
    require $phpMailerBasePath . '/Exception.php';
} else {
    http_response_code(500);
    echo 'Error de configuracion: no se encontro PHPMailer.';
    exit;
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$username      = getenv('SMTP_USER') ?: '';
$password      = getenv('SMTP_PASS') ?: '';
$to            = getenv('SMTP_TO')   ?: '';
$primaryHost   = getenv('SMTP_HOST_PRIMARY')   ?: 'mail.tudominio.com';
$secondaryHost = getenv('SMTP_HOST_SECONDARY') ?: '';

if (!$username || !$password || !$to) {
    http_response_code(500);
    echo 'Error de configuracion SMTP: faltan variables SMTP_USER, SMTP_PASS o SMTP_TO.';
    exit;
}

$smtpCandidates = [
    ['host' => $primaryHost, 'secure' => PHPMailer::ENCRYPTION_SMTPS,   'port' => 465],
    ['host' => $primaryHost, 'secure' => PHPMailer::ENCRYPTION_STARTTLS, 'port' => 587],
];
if ($secondaryHost !== '') {
    $smtpCandidates[] = ['host' => $secondaryHost, 'secure' => PHPMailer::ENCRYPTION_SMTPS,   'port' => 465];
    $smtpCandidates[] = ['host' => $secondaryHost, 'secure' => PHPMailer::ENCRYPTION_STARTTLS, 'port' => 587];
}

$name    = trim($_POST['name']    ?? '');
$email   = trim($_POST['email']   ?? '');
$message = trim($_POST['message'] ?? '');

if (!$name || !$email || !$message) {
    http_response_code(400);
    echo 'Error: faltan datos.';
    exit;
}

$connectionErrors = [];

foreach ($smtpCandidates as $smtpConfig) {
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host       = $smtpConfig['host'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $username;
        $mail->Password   = $password;
        $mail->SMTPSecure = $smtpConfig['secure'];
        $mail->Port       = $smtpConfig['port'];
        $mail->Timeout    = 15;

        $mail->setFrom($username, 'Estudio NF — Contacto');
        $mail->addAddress($to);
        $mail->addReplyTo($email, $name);

        $mail->isHTML(false);
        $mail->Subject = 'Nueva consulta de ' . $name;
        $mail->Body    = $message;

        $mail->send();
        http_response_code(200);
        echo 'Mensaje enviado correctamente.';
        exit;
    } catch (Exception $e) {
        $connectionErrors[] = $smtpConfig['host'] . ':' . $smtpConfig['port'] . ' -> ' . $mail->ErrorInfo;
    }
}

http_response_code(500);
echo 'Error SMTP: ' . implode(' | ', $connectionErrors);
?>
