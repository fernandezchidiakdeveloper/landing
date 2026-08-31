# Contact Form with PHP Mailer — Setup Guide

Implementación de formulario de contacto con envío de mails vía PHPMailer + SMTP, lista para reutilizar en proyectos Next.js (o cualquier frontend estático hosteado junto a PHP).

---

## Arquitectura

```
Frontend (React/Next.js)
  └── fetch POST → /sendmail.php (FormData: name, email, message)
        └── PHPMailer → SMTP server → destino
```

---

## 1. PHPMailer

Descargá PHPMailer y colocalo en `public/PHPMailer/`:

```bash
# Opción A: con Composer (dentro de public/)
cd public
composer require phpmailer/phpmailer

# Opción B: descarga manual
# https://github.com/PHPMailer/PHPMailer/releases
# Estructura esperada:
# public/
#   PHPMailer/
#     src/
#       PHPMailer.php
#       SMTP.php
#       Exception.php
```

---

## 2. `public/sendmail.php`

```php
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

// Variables de entorno (configurar en el panel del hosting)
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

// Intenta SMTPS 465 primero, luego STARTTLS 587 (fallback automático)
$smtpCandidates = [
    ['host' => $primaryHost, 'secure' => PHPMailer::ENCRYPTION_SMTPS,    'port' => 465],
    ['host' => $primaryHost, 'secure' => PHPMailer::ENCRYPTION_STARTTLS,  'port' => 587],
];
if ($secondaryHost !== '') {
    $smtpCandidates[] = ['host' => $secondaryHost, 'secure' => PHPMailer::ENCRYPTION_SMTPS,   'port' => 465];
    $smtpCandidates[] = ['host' => $secondaryHost, 'secure' => PHPMailer::ENCRYPTION_STARTTLS, 'port' => 587];
}

// Leer datos del formulario
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

        $mail->setFrom($username, 'Tu Sitio Contacto');
        $mail->addAddress($to);
        $mail->addReplyTo($email, $name);

        $mail->isHTML(false);
        $mail->Subject = 'Nuevo mensaje de ' . $name;
        $mail->Body    = "Nombre: $name\nEmail: $email\n\nMensaje:\n$message";

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
```

---

## 3. Frontend TypeScript — `lib/contact/sendContactForm.ts`

```ts
export async function sendContactForm(data: {
  name: string;
  email: string;
  message: string;
}) {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('message', data.message);

  const res = await fetch('/sendmail.php', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.text();
}
```

---

## 4. Validación con Zod — `lib/contact/schema.ts`

```ts
import { z } from 'zod';

export const ContactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Ingresá tu nombre completo (mínimo 2 caracteres).')
    .max(80, 'El nombre no puede superar 80 caracteres.'),

  email: z
    .string()
    .trim()
    .email('Ingresá un correo electrónico válido.')
    .max(120, 'El correo no puede superar 120 caracteres.'),

  message: z
    .string()
    .trim()
    .min(10, 'Contanos un poco más (mínimo 10 caracteres).')
    .max(1000, 'El mensaje no puede superar 1000 caracteres.'),
});

export type ContactFormValues = z.infer<typeof ContactFormSchema>;

export const CONTACT_FORM_DEFAULTS: ContactFormValues = {
  fullName: '',
  email: '',
  message: '',
};
```

---

## 5. Formulario React — `components/contact/ContactForm.tsx`

```tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactFormSchema, CONTACT_FORM_DEFAULTS } from '@/lib/contact/schema';
import type { ContactFormValues } from '@/lib/contact/schema';
import { sendContactForm } from '@/lib/contact/sendContactForm';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: CONTACT_FORM_DEFAULTS,
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await sendContactForm({
        name: data.fullName,
        email: data.email,
        message: data.message,
      });
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      alert('Error al enviar el mensaje. Intenta nuevamente.');
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate>
      {submitted && (
        <p role="status" aria-live="polite">
          ¡Mensaje enviado correctamente!
        </p>
      )}

      <div>
        <label htmlFor="fullName">Nombre completo *</label>
        <input
          id="fullName"
          type="text"
          autoComplete="name"
          aria-required="true"
          aria-invalid={!!errors.fullName}
          {...register('fullName')}
        />
        {errors.fullName && <p role="alert">{errors.fullName.message}</p>}
      </div>

      <div>
        <label htmlFor="email">Correo electrónico *</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-required="true"
          aria-invalid={!!errors.email}
          {...register('email')}
        />
        {errors.email && <p role="alert">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="message">Mensaje *</label>
        <textarea
          id="message"
          rows={5}
          aria-required="true"
          aria-invalid={!!errors.message}
          {...register('message')}
        />
        {errors.message && <p role="alert">{errors.message.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
      </button>
    </form>
  );
}
```

---

## 6. Dependencias npm

```bash
npm install react-hook-form @hookform/resolvers zod
```

---

## 7. Variables de entorno en el hosting (Hostinger / cPanel)

Configurar en el panel de hosting (no en `.env`):

| Variable             | Descripción                                  | Ejemplo                  |
|----------------------|----------------------------------------------|--------------------------|
| `SMTP_USER`          | Email que envía (autenticación SMTP)         | `contacto@tudominio.com` |
| `SMTP_PASS`          | Contraseña del buzón SMTP                    | `tu_password`            |
| `SMTP_TO`            | Email que recibe los mensajes                | `admin@tudominio.com`    |
| `SMTP_HOST_PRIMARY`  | Servidor SMTP principal                      | `mail.tudominio.com`     |
| `SMTP_HOST_SECONDARY`| Servidor SMTP de respaldo (opcional)         | `smtp.gmail.com`         |

> En Hostinger: **Hosting → Administrar → PHP → Variables de entorno PHP**

---

## 8. Prompt para aplicar en otro proyecto (IA)

Copiá y pegá esto en tu agente de IA preferido:

```
Implementá un formulario de contacto con envío de emails en este proyecto.
La arquitectura es:
- Frontend: formulario React con react-hook-form + Zod (validación client-side).
  Campos: fullName, email, message. Al hacer submit llama a /sendmail.php vía fetch POST con FormData.
- Backend: public/sendmail.php con PHPMailer. Lee variables de entorno SMTP_USER, SMTP_PASS, SMTP_TO,
  SMTP_HOST_PRIMARY, SMTP_HOST_SECONDARY. Intenta conexión en este orden:
  1. primaryHost:465 (SMTPS), 2. primaryHost:587 (STARTTLS), 3. secondaryHost:465, 4. secondaryHost:587.
  Si ninguna funciona responde 500 con el log de errores.
- PHPMailer debe estar en public/PHPMailer/src/ (descargado manualmente o via Composer).
- El script PHP devuelve texto plano (no JSON): 200 OK en éxito, 400/500 en error.
- El fetch del frontend lanza un Error con el texto de respuesta si !res.ok.
Adaptá los textos, campos extra y estilos al stack y diseño de este proyecto.
```

---

## Notas

- El archivo `sendmail.php` debe ser accesible como ruta pública (`/sendmail.php`).
- Si usás Next.js con `output: 'export'` (static export), el PHP corre en el mismo servidor web (Hostinger, cPanel, etc.), no en Node.
- Para proyectos puramente Node.js (Vercel, Railway, etc.), reemplazá el PHP por una API Route de Next.js usando `nodemailer`.
