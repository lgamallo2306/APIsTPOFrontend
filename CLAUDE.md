# 3d — Frontend

Frontend del marketplace **3d** (productos impresos en 3D). Consume la API REST del backend Spring Boot + JWT ([Mateo-1027/APIsTPO](https://github.com/Mateo-1027/APIsTPO)). Textos en español (Argentina) y precios en ARS.

## Stack y comandos

- React + Vite, **JavaScript** (`.jsx`). Ruteo con `react-router-dom`. CSS plano (sin Tailwind ni librerías de UI).
- El proyecto está en `frontend/`:

```bash
cd frontend
npm install      # la primera vez
npm run dev      # http://localhost:5173
npm run lint     # tiene que quedar sin errores
```

- El backend corre en `http://localhost:8080` (constante `URL` en `src/utils/api.js`).
- `node_modules/` no se versiona.

## Estructura

```
frontend/src/
  main.jsx          BrowserRouter + App. No se modifica.
  App.jsx           Estado de sesión, Header y definición de rutas.
  index.css         Fuentes + import de los tokens + estilos globales (.app).
  styles/
    tokens.css      Sistema de diseño (variables y clases base). No se edita.
  utils/
    api.js          URL base y una función por endpoint.
    format.js       formatPrice, finalPrice, formatDate.
  components/       Componentes reutilizables, agrupados por dominio
    ui/  layout/  auth/  catalog/  products/  cart/  orders/  seller/  admin/
  views/            Una vista por URL (admin/ para las de administrador).
  assets/           Solo imágenes fijas (logo, banners). Las de productos vienen del back.
```

**Vista vs. componente:** una vista tiene URL propia y solo arma componentes. Todo lo demás es un componente.

## Reglas de código

**Componentes**
- Funcionales, con nombre en PascalCase igual al del archivo, y `export default` siempre.
- Un solo elemento raíz por componente (fragment `<>` si no hace falta una etiqueta).
- Una sola responsabilidad por componente; idealmente menos de 40 líneas. Si crece, se divide.
- Usar etiquetas semánticas (`header`, `nav`, `main`, `section`, `form`).

**Estado y datos**
- Solo `useState`, `useEffect` y los hooks de `react-router-dom` (`useNavigate`, `useLocation`).
- No usar `useContext`, `useReducer`, `useRef`, `useMemo`, `useCallback` ni hooks propios.
- El padre guarda el estado y lo pasa por props (desestructuradas en los parámetros). El hijo recibe el evento y le avisa al padre con una función recibida por props; el padre ejecuta la lógica.
- Listas con `.map(...)` y `key={item.id}`. No usar `forEach` ni modificar arrays del estado: copiar con spread (`[...arr]`, `{ ...obj }`).
- Renderizado condicional con ternario `? :`, `&&` o un `if` antes del `return`. Con números usar `count > 0 &&` (no `count &&`).

**Formularios**
- Controlados: un único estado objeto por formulario.
- Cada input lleva `name` igual al campo del DTO del backend; un solo `handleChange` con `[e.target.name]: e.target.value`.
- `e.preventDefault()` en el submit. Validar primero los casos inválidos y cortar con `return`.

**Código simple y explicable**
- Todo el equipo tiene que poder explicar cada línea. Ante dos soluciones, elegir la más directa aunque sea más larga.
- Estados explícitos en vez de valores deducidos con trucos. Por ejemplo, la carga se maneja con un estado `loading` (`setLoading(true)` antes del fetch, `setLoading(false)` en `.then` y `.catch`), no comparando strings.
- Evitar, salvo acuerdo del equipo: la prop `children`, `key` para forzar el reinicio de un componente, `??` y `?.`, desestructuración dentro de callbacks (`([, value]) =>`), `Object.entries` / `reduce` encadenados, y hooks de librerías que no estén en esta lista (`useSearchParams`, `useParams`, etc.).

**Prohibido**
- TypeScript.
- Acceder a `document` o `window` desde componentes (incluye `alert`, `confirm`, `getElementById`, `document.title`). La única excepción es `main.jsx`. Avisos y confirmaciones se hacen con componentes (`Modal`, `Toast`) mostrados con estado.
- `async/await` y axios: usar `fetch` con `.then/.catch`.
- Repetir un GET para refrescar datos.

## Comunicación con el backend

Todas las llamadas están en `src/utils/api.js`. Cada función devuelve la promesa con `.then(handle)`:

- `handle` convierte la respuesta a JSON y, si `!res.ok`, lanza `{ status, message }`. Así los errores del back (400, 401, 403, 409) llegan al `.catch` de la vista con el mensaje en español.
- Los endpoints protegidos usan `authHeaders(token)` → `Authorization: Bearer <token>`.

En la vista:

```javascript
useEffect(() => {
  getCategories()
    .then((data) => setCategories(data))
    .catch((error) => setError(error.message))
}, [])
```

- GET de carga: en `useEffect` con `[]` (o con las dependencias que cambian la consulta, como los filtros).
- POST/PUT/PATCH/DELETE: actualizar el estado local con la respuesta del back. No volver a pedir la lista ni recargar.
- Mostrar el `message` del backend tal cual. Si `status` es 401 o 403 con sesión iniciada, cerrar sesión.

## Sesión

Vive en `App.jsx` y se pasa por props:

- `token`: se guarda en `localStorage` (es lo único que se persiste en el navegador).
- `user`: respuesta de `GET /users/me`. `user.roles` es un array (`USER`, `VENDOR`, `ADMIN`).
- `cartCount`: suma de `quantity` de los ítems del carrito.
- `handleLogin(token)` / `handleLogout()`: se pasan a las vistas y al Header.
- Un `useEffect` con `[token]` trae usuario y carrito cada vez que cambia el token.

Rutas protegidas con renderizado condicional en `element` (no se usan `Navigate` ni `Outlet`):

```jsx
<Route path="/carrito" element={user ? <CartView /> : <LoginView onLogin={handleLogin} />} />
```

## Rutas

| Ruta | Acceso | Vista |
| --- | --- | --- |
| `/` | público | CatalogView |
| `/productos/:id` | público | ProductDetailView |
| `/login`, `/registro` | público | LoginView, RegisterView |
| `/carrito`, `/mis-compras`, `/perfil` | USER | CartView, MyPurchasesView, ProfileView |
| `/vendedor/productos`, `/vendedor/productos/nuevo`, `/vendedor/productos/:id` | VENDOR / ADMIN | MyProductsView, ProductFormView |
| `/vendedor/calculadora`, `/vendedor/ventas` | VENDOR / ADMIN | PriceCalculatorView, MySalesView |
| `/admin/categorias`, `/admin/usuarios` | ADMIN | CategoriesView, UsersView |

Los filtros del catálogo viven en la query string (`/?name=maceta&categoryId=3&page=0`). Se leen con `useLocation().search` + `URLSearchParams` y se escriben con `navigate`.

## Diseño

- La especificación visual está en el handoff de diseño (pantallas desktop 1280 px y mobile 390 px, `tokens.css`, `mock-data.json`).
- `styles/tokens.css` es el sistema de diseño tal como viene del handoff: no se edita; si el diseño cambia, se reemplaza entero. Las variables están definidas sobre `.app`, por eso el `div` raíz de `App` lleva `className="app"`.
- Usar las clases del diseño (`btn btn-primary`, `input`, `field`, `label`, `card`, `pcard`, `badge`, `alert-err`, `modal`, `skel`, `pager`, etc.) antes de crear estilos nuevos.
- Cada componente o vista con estilos propios tiene su CSS al lado (`Header.jsx` + `Header.css`) y lo importa (`import './Header.css'`). Los CSS compartidos llevan nombre propio (`auth/AuthForm.css`, `views/AuthView.css`).
- Estos CSS son globales (no quedan limitados al componente): las clases nuevas se prefijan con el nombre del componente (`.header-actions`, `.user-dropdown`) para no chocar.
- Responsive solo con `@media` en CSS.
- Formatos (`utils/format.js`): precio `$ 15.725,00`; precio final `price * (1 - discount / 100)`; fecha `30 sep 2026, 14:20`.
- Stock: `0` → badge "Sin stock" y botón deshabilitado; `<= 3` → badge "Últimas N".
- Todo listado tiene 4 estados: cargando (skeleton), vacío, error con "Reintentar" y sin resultados para filtros.

## Backend: diferencias con el handoff de diseño

El backend real manda sobre el handoff:

| Endpoint | Formato real |
| --- | --- |
| `POST /api/v1/auth/register` | `{ firstname, lastname, email, password, role }` |
| `PUT /cart/items` | body `{ productId, quantity }` (`quantity: 0` elimina el ítem) |
| `PATCH /products/{id}/stock` | body `{ quantity }` |
| `PATCH /products/{id}/discount` | body `{ discount }` |
| `GET /users` | existe, paginado (ADMIN) |
| `GET /categories` | devuelve una página (`Page`): la lista está en `data.content` |

- Sin token, el back responde **403** (no 401).
- Pendiente en el back: configurar CORS para `http://localhost:5173` y corregir `DELETE /cart/items` (tiene un `@PathVariable` sin variable en la ruta).

## Decisiones pendientes

- `/productos/:id` necesita leer el parámetro de la URL (`useParams`). Confirmar si se puede usar antes de implementar el detalle.
- Modo oscuro: se haría con un estado en `App` que agrega la clase `dark` a `.app`. Baja prioridad.
- Al recargar una ruta protegida se ve el login un instante hasta que llega `GET /users/me` (se resuelve con un estado `loadingUser`).
