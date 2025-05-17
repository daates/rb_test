<?php

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Метод не разрешён']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['name']) || !isset($data['phone'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Некорректные данные']);
    exit;
}

$name = htmlspecialchars($data['name']);
$phone = htmlspecialchars($data['phone']);

$to = "sa0529083@gmail.com";
$subject = "Отправка заявки на почту";
$message = "Имя: $name\nТелефон: $phone";

$headers = "From: rb_test\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";

$success = mail($to, $subject, $message, $headers);

if ($success) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Ошибка при отправке письма']);
}
?>

