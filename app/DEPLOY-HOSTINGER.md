# Guía de Deploy Estático en Hostinger

## Paso 1: Limpiar builds anteriores (LOCAL)

```bash
rm -rf .next out
```

## Paso 2: Generar build estático (LOCAL)

```bash
yarn build
```

Esto genera la carpeta `out/` con todos los archivos estáticos HTML, CSS, JS e imágenes.

## Paso 3: Verifica las rutas en el HTML generado (LOCAL)

```bash
# Abre out/index.html en un editor y busca:
# 1) Busca "/_next/image" → NO debe aparecer
# 2) Busca "/brand/" → debe aparecer (ej: /brand/logo.png)
# 3) Busca "/products/" → debe aparecer (ej: /products/1-antibiotico.png)
# 4) Busca "/sections/" → debe aparecer (ej: /sections/hero.png)
```

## Paso 4: Verifica que existan las carpetas y archivos en out/

```bash
ls -la out/
# Debe contener:
# - brand/ (con logos)
# - products/ (con imágenes de productos)
# - sections/ (con hero.png, about.png, etc)
# - gallery/ (con imágenes de galería)
# - index.html
# - sendmail.php
```

## Paso 5: Instalar PHPMailer en public_html (solo la primera vez)

El archivo `out/sendmail.php` espera encontrar PHPMailer en `public_html/PHPMailer/src/`.

### Opción A — File Manager de Hostinger (sin SSH)

1. Descargá el ZIP de la última release:
   https://github.com/PHPMailer/PHPMailer/releases
2. Descomprimilo localmente. Tomá solo la carpeta `src/` (contiene `PHPMailer.php`, `SMTP.php`, `Exception.php`).
3. En Hostinger → **File Manager** → `public_html/`:
   - Creá la carpeta `PHPMailer/`
   - Dentro, creá la carpeta `src/`
   - Subí los 3 archivos `.php` a `public_html/PHPMailer/src/`

Estructura final esperada:
```
public_html/
  PHPMailer/
    src/
      PHPMailer.php
      SMTP.php
      Exception.php
  sendmail.php
  index.html
  ...
```

### Opción B — SSH / Terminal

```bash
cd public_html
curl -L https://github.com/PHPMailer/PHPMailer/archive/refs/heads/master.zip -o phpmailer.zip
unzip phpmailer.zip
mkdir -p PHPMailer/src
cp PHPMailer-master/src/PHPMailer.php PHPMailer/src/
cp PHPMailer-master/src/SMTP.php PHPMailer/src/
cp PHPMailer-master/src/Exception.php PHPMailer/src/
rm -rf phpmailer.zip PHPMailer-master
```

### Configurar las variables de entorno SMTP

En Hostinger → **Hosting → Administrar → PHP → Variables de entorno PHP**:

| Variable             | Valor                        |
|----------------------|------------------------------|
| `SMTP_USER`          | `contacto@tudominio.com`     |
| `SMTP_PASS`          | contraseña del buzón         |
| `SMTP_TO`            | email que recibe los mails   |
| `SMTP_HOST_PRIMARY`  | `mail.tudominio.com`         |

> PHPMailer **no** se sube con el build. Solo se instala una vez y queda en el hosting.
> No lo incluyas en `out/` ni en el repositorio.

---

## Paso 6: Sube a Hostinger - IMPORTANTE

**Sube TODO el contenido de `out/` directamente a `public_html/`**

NO sigas este flujo (❌ INCORRECTO):

- Crear carpeta `out` en public_html
- Tener: `public_html/out/index.html`

SÍ sigue este flujo (✅ CORRECTO):

- Tener: `public_html/index.html`
- Tener: `public_html/brand/logo.png`
- Tener: `public_html/products/*.png`
- Tener: `public_html/sections/*.png`
- Tener: `public_html/gallery/*.png`

## Paso 6: Verifica en el navegador

1. Accede a: https://argenpet.com
2. Abre la consola (F12 → Console)
3. Busca errores 404 de imágenes
4. Si ves `GET https://argenpet.com/_next/image` → ERROR, necesitas rebuild limpio
5. Si ves `GET https://argenpet.com/brand/logo.png` con 200 → ✅ CORRECTO

## Paso 7: Si siguen sin verse las imágenes

1. Verifica en FTP/File Manager que los archivos estén en public_html
2. Revisa mayúsculas/minúsculas en los nombres (debe coincidir exactamente)
3. Limpia caché del navegador (Ctrl+Shift+Delete o Cmd+Shift+Delete)
4. Prueba acceder directamente a una imagen: https://argenpet.com/brand/logo-argentpet.png

## Comandos rápidos para referencia

```bash
# Generar estático:
yarn build

# Borrar builds para rebuild limpio:
rm -rf .next out

# Probar localmente cómo se verá en Hostinger:
yarn start
```

## Checklist final

**Build y archivos estáticos**
- [ ] Ejecuté `rm -rf .next out` en local
- [ ] Ejecuté `yarn build` en local
- [ ] Verifiqué que out/ contiene brand/, products/, sections/, gallery/, sendmail.php y los HTMLs
- [ ] Borré contenido antiguo de public_html en Hostinger
- [ ] Subí TODO de out/ a public_html/ (no adentro de una carpeta out)
- [ ] Limpié cache del navegador
- [ ] Probé acceder a una imagen directamente por URL

**PHPMailer (solo la primera vez o si se actualizó)**
- [ ] Carpeta `public_html/PHPMailer/src/` existe en el hosting
- [ ] Contiene `PHPMailer.php`, `SMTP.php` y `Exception.php`
- [ ] Variables de entorno SMTP configuradas en el panel de Hostinger
- [ ] Probé enviar el formulario y recibí el mail en destino
