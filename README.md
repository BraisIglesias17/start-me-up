# Curso Angular
<br>

## Caso práctico

Aplicación web de crowdfunding **StartMeUP**

*¿Qué es crowdfunding?: Crowdfunding es una forma de financiación colectiva en la que un grupo grande de personas contribuye con pequeñas cantidades de dinero para apoyar un proyecto o iniciativa. Esta forma de financiación se ha vuelto muy popular en los últimos años, especialmente para proyectos creativos, de emprendimiento y sin fines de lucro.*


## Descripción

StartMeUP es una aplicación web de crowdfunding que permite a los usuarios crear campañas para recaudar fondos para sus proyectos. Con StartMeUP, los emprendedores pueden llegar a una audiencia global y recibir el apoyo que necesitan para hacer realidad sus sueños.

- Los creadores de proyectos pueden utilizar StartMeUP para recaudar fondos para su proyecto sin necesidad de invertir una gran cantidad de tiempo o dinero.
- Los mecenas pueden apoyar proyectos que les interesen, recibir actualizaciones sobre el progreso de la campaña y en algunos casos pueden recibir alguna recompensa, comisión o participación en la organización que están financiando.


## Elementos del modelo de dominio

**Usuario:** Representa a un usuario registrado en la plataforma de StartMeUP, que puede crear y administrar sus campañas de crowdfunding y realizar donaciones a otros proyectos.

**Campaña:** Representa una iniciativa de crowdfunding creada por un usuario en la plataforma de StartMeUP, con el objetivo de recaudar fondos para un proyecto específico. Cada campaña tiene una descripción, un objetivo de financiación, un período de tiempo limitado y una lista de recompensas para los donantes.

**Donación/participación:** Representa la acción de un usuario que realiza una contribución financiera a una campaña específica en la plataforma de StartMeUP.

**Tipo:** Representa una etiqueta asignada a cada campaña para clasificarla en función al tipo de participación permitido (donación, recompensa, inversión, préstamo)

**Categoría:** Representa una etiqueta asignada a cada campaña para clasificarla en una categoría específica, como arte, música, tecnología, etc.

**Recompensa:** Representa un incentivo ofrecido por el creador de la campaña para agradecer a los donantes por sus contribuciones. Las recompensas pueden ser tangibles o intangibles y se ofrecen en diferentes niveles de donación.

**Financiación:** Representa la información sobre la financiación objetivo, progreso de la campaña, los fondos recaudados, las donaciones recibidas y otros datos relevantes para cada campaña.

## Características deseadas 

El diseño UX se deja al criterio de cada desarrollador. (Se valorará de forma positiva un buen diseño)

### Acciones:
- Registro y autenticación de usuarios por email/nombre y contraseña
- Baja de usuario
- CRUD de campañas de crowdfunding
- Filtrado y ordenación de campañas
- Unirse a proyectos (participar como mecenas)
- Puntuar proyectos

### Vistas:
	
El **layout** de la aplicación debe contar con una cabecera/toolbar con la información del usuario conectado y acceso a su cuenta.

**Registro y login**

**Cuenta de usuario**

- Se visualiza toda la información relativa al usuario.

- Acciones disponibles: edición y baja.

**Portada**

Tarjetas con la información más importante de campañas vigentes, por ejemplo: título, descripción corta, imagen de portada, categoría, recaudación actual/ total, días restantes.

Acciones disponibles:
- Clic en la tarjeta →  navega al detalle del proyecto.
- Filtrado de campañas por nombre, categoría, estado, días restantes, puntuación, recaudación)
- Ordenación de campañas.

**Mis campañas:**

- Listado de campañas en las que participa el usuario, se muestra la información que cada uno considere más relevante para el usuario.
- Debe poder identificarse claramente las campañas propias de las campañas en las que sólo se es mecenas.

Acciones disponibles:
- El usuario podrá crear campañas, y editar/borrar las campañas de las que es propietario.
- Clic en elemento → navega al detalle del proyecto.

**Detalle de las campaña**

Vista detalle con toda la información disponible sobre la campaña y la participación del usuario en dicha campaña.

Acciones disponibles:
- Unirse, puntuar.
- Editar y borrar campañas propias.

## Requisitos técnicos

- La aplicación se creará utilizando Angular 12.
- Datos base deberán estar mockeados en ficheros .json, la persistencia de nuevos datos se hará en memoria (preferiblemente usando observables).
- Consulta de datos a través del servicio HttpClient de Angular.
- Cada vista debe tener una ruta asociada para facilitar la navegación
- Uso de pipes (pipe async) y directivas. 
- Utilizar enumerados siempre que sea necesario.
- Uso de date-fns para formateo de fechas.
- Estilos usando la metodología BEM.
- Únicamente se usará Angular Material, y no se podrá usar frameworks css tipo Bootstrap
- Commits reducidos y bien nombrados (con sentidiño).
- El gestor de repositorio usado para esta práctica será github (recibiréis una invitación al correo de Odeene).

## Datos básicos

- **Usuarios:** nombre y apellidos, email, password,  
    Relacionado: campañas, participaciones
- **Campañas:** título, descripción, descripción corta, **tipo,** **categoría,** imagen de portada, otras imágenes, financiación objetivo, fecha de inicio y fin de la campaña, lista de recompensas, total recaudado, puntuación.
    Relacionado: categorías, recompensas, participaciones,
- **Categoría:** nombre de la categoría, descripción, imagen de la categoría, etc.
- **Recompensa:** descripción de la recompensa, nivel de donación requerido, cantidad disponible, fecha de entrega estimada, etc.
- **Donación/participación:** cantidad donación, fecha y hora, campaña a la que se destinó, usuario participante, recompensa asociada

Ejemplos de clasificación de campañas:

- **Tipos:** donación | recompensa | inversión | préstamo, etc.
- **Categorías:** música | ciencia | tecnología | software | deportes, etc.
