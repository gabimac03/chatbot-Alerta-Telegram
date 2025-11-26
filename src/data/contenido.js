export const CONTENIDO = [

/* ============================================================
   MÓDULO 1 — PROTECCIÓN DE LA INFORMACIÓN
   ============================================================ */
{
  modulo: 1,
  tituloModulo: "Protección de la Información",
  texto: `
La información es uno de los activos más importantes. Incluye bases de datos, documentos, resultados de investigación, datos de estudiantes y recursos institucionales. Su disponibilidad, integridad y confidencialidad son esenciales para el funcionamiento de la universidad.

Amenazas comunes:
- errores humanos
- insiders
- ciberdelincuentes
- ingeniería social
- malware y ransomware

Los pilares de la seguridad (CIA):
- Confidencialidad: solo acceden personas autorizadas
- Integridad: la información debe mantenerse correcta
- Disponibilidad: debe estar accesible cuando se necesita

Clasificación de la información:
- Confidencial: datos personales, contratos, datos financieros
- Restringida: información interna de áreas específicas
- Uso interno: información de bajo riesgo solo para personal
- Pública: datos abiertos

Buenas prácticas de tratamiento:
- limitar accesos
- registrar actividad
- cifrado en tránsito y reposo
- copias de seguridad
- acuerdos de confidencialidad

Cifrado:
- impide lectura sin clave
- usar AES-256
- no compartir claves por correo
- cifrar dispositivos móviles

Metadatos:
- pueden incluir GPS, autor, fechas
- deben limpiarse antes de compartir archivos

Opciones de almacenamiento:
- local
- red institucional
- nube (preferentemente institucional)

Tipos de copia:
- completa
- incremental
- diferencial
- RAID 1 (espejo)
Regla 3-2-1: 3 copias, 2 soportes distintos, 1 fuera.

Borrado seguro:
- triturar papel
- sobrescritura múltiple
- destrucción certificada

Ley argentina 25.326:
- protege datos personales
- AAIP como autoridad
- derechos: acceso, actualización, supresión

Gestión de dispositivos:
- actualizaciones
- clave de bloqueo
- cifrado
- backups

Ante incidentes:
- desconectar equipo
- avisar a ciberseguridad
`
},

/* ============================================================
   MÓDULO 2 — CORREO ELECTRÓNICO SEGURO
   ============================================================ */
{
  modulo: 2,
  tituloModulo: "Correo Electrónico Seguro",
  texto: `
El correo electrónico es una herramienta esencial, pero también uno de los vectores más utilizados para ataques.

¿Por qué es atractivo para atacantes?
- es masivo
- barato
- fácil de personalizar
- un solo clic basta para comprometer cuentas

Señales de correo sospechoso:
- remitente extraño o falso
- asuntos urgentes o alarmistas
- errores de ortografía
- adjuntos peligrosos (.zip, .exe, .docm)
- enlaces engañosos

Tipos de ataques:
- phishing
- spear phishing
- BEC (fraude del CEO)
- scam
- sextorsión
- malware/ransomware

Buenas prácticas:
- verificar dominio real del enlace
- no habilitar macros
- usar CCO
- desactivar descarga automática de imágenes
- confirmar por otro canal si el correo es extraño
- analizar adjuntos en VirusTotal

Cómo actuar ante un ataque:
- no abrir enlaces
- no responder
- reportar al área de TI
- cambiar contraseñas si hiciste clic
- escanear el equipo

Configuraciones recomendadas:
- activar MFA
- revisar reglas de reenvío
- usar gestores de contraseñas
- evitar reenviar correos sospechosos

Riesgos de no seguir estas prácticas:
- robo de identidad
- pérdida de información
- ransomware
- daño a la reputación institucional
`
},

/* ============================================================
   MÓDULO 3 — CONTRASEÑAS SEGURAS
   ============================================================ */
{
  modulo: 3,
  tituloModulo: "Contraseñas Seguras",
  texto: `
Las contraseñas protegen acceso a sistemas, correos y datos personales.

Características de una buena contraseña:
- larga (mínimo 12-16 caracteres)
- mezcla de mayúsculas, minúsculas, números y símbolos
- mejor: frases de paso

Errores comunes:
- usar datos personales
- contraseñas cortas
- reutilizar claves
- anotarlas en papel

Técnicas de ataque:
- fuerza bruta
- diccionario
- credential stuffing (contraseñas filtradas)

Autenticación multifactor:
- usar apps TOTP
- llaves FIDO2/U2F
- evitar SMS como único método

Gestores de contraseñas:
- Bitwarden
- KeePassXC
- 1Password
Permiten claves robustas sin recordarlas.

Ante una filtración:
- cambiar contraseña
- activar MFA
- cerrar sesiones abiertas
- revisar reglas de reenvío

Políticas recomendadas:
- no cambiar contraseñas periódicamente sin motivo
- solo cambiar ante sospecha de compromiso
`
},

/* ============================================================
   MÓDULO 4 — PUESTO DE TRABAJO SEGURO
   ============================================================ */
{
  modulo: 4,
  tituloModulo: "Puesto de Trabajo Seguro",
  texto: `
El puesto de trabajo es un punto crítico de seguridad.

Mesa limpia:
- no dejar documentos sensibles
- guardar todo al finalizar el día

Bloqueo de sesión:
- Win+L
- Ctrl+Alt+L
- bloqueo automático por inactividad

Software y antivirus:
- mantener todo actualizado
- antivirus activo
- firewall activo

Navegación:
- evitar sitios ilegales o no confiables
- no instalar software pirata

Dispositivos externos:
- no conectar USB desconocidos
- cifrar datos en pendrives

Entorno físico:
- no dejar equipos sin supervisión
- usar candados
- controlar acceso físico

Ante incidentes:
- desconectar internet
- avisar rápidamente a seguridad informática
`
},

/* ============================================================
   MÓDULO 5 — DISPOSITIVOS MÓVILES SEGUROS
   ============================================================ */
{
  modulo: 5,
  tituloModulo: "Dispositivos Móviles Seguros",
  texto: `
Riesgos frecuentes:
- pérdida o robo
- malware móvil
- permisos excesivos
- phishing adaptado a móviles
- redes Wi-Fi públicas

Protección esencial:
- PIN o contraseña robusta
- bloqueo biométrico confiable
- cifrado del dispositivo
- actualizaciones automáticas

Apps:
- instalar solo desde tiendas oficiales
- revisar permisos
- evitar APK externos
- usar antimalware confiable

Contraseñas:
- no guardar en navegador sin clave maestra
- usar gestores
- activar MFA

Redes:
- evitar Wi-Fi públicas
- usar VPN
- configurar WPA2/WPA3 en casa
- desactivar WPS

Ante pérdida/robo:
- localizar dispositivo
- bloqueo remoto
- borrado remoto
- cambiar contraseñas críticas
`

},

/* ============================================================
   MÓDULO 6 — REDES SOCIALES SEGURAS
   ============================================================ */
{
  modulo: 6,
  tituloModulo: "Redes Sociales Seguras",
  texto: `
Las redes sociales son herramientas poderosas pero también riesgosas.

Gobernanza y roles:
- definir quién administra cada cuenta
- no compartir contraseñas
- usar roles oficiales de administrador

Acceso seguro:
- contraseñas únicas y fuertes
- MFA activado en todas las redes
- evitar SMS como único 2FA

Privacidad:
- revisar quién puede ver publicaciones
- usar listas de audiencia
- recordar que todo puede capturarse

Riesgos:
- perfiles falsos
- suplantación (typosquatting)
- enlaces acortados sospechosos
- archivos adjuntos maliciosos

Buenas prácticas:
- moderación profesional
- verificar fuentes
- no publicar datos internos
- analizar adjuntos
- monitorear actividad

Ante hackeo:
- cambiar clave
- revocar accesos
- comunicar el incidente
`
},

/* ============================================================
   MÓDULO 7 — USO RESPONSABLE DE LA IA
   ============================================================ */
{
  modulo: 7,
  tituloModulo: "Uso Responsable de la IA",
  texto: `
La inteligencia artificial permite automatizar tareas y mejorar procesos.

Usos principales:
- chatbots
- análisis de desempeño
- clasificación de documentos
- generación de reportes
- detección de amenazas

Beneficios:
- productividad
- bienestar laboral
- reducción de tareas repetitivas

Riesgos:
- sesgos
- filtración de datos
- dependencia excesiva
- alucinaciones
- ciberataques
- problemas de privacidad

Buenas prácticas:
- no subir información sensible
- revisar resultados antes de usarlos
- mantener supervisión humana
- activar MFA en plataformas de IA
- usar cuentas institucionales

Uso ético:
- respetar privacidad
- explicar limitaciones
- cumplir leyes de protección de datos

La IA complementa, no reemplaza, la toma de decisiones humanas.
`
}

];
