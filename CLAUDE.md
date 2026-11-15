# 3d — Frontend

Frontend del marketplace **3d** (productos impresos en 3D). Consume la API REST del backend Spring Boot + JWT ([Mateo-1027/APIsTPO](https://github.com/Mateo-1027/APIsTPO)). Textos en español (Argentina) y precios en ARS.

## Stack y comandos

- React + Vite, **JavaScript** (`.jsx`). Ruteo con `react-router-dom`. CSS plano (sin Tailwind ni librerías de UI).
- **Estado global con Redux Toolkit** (`@reduxjs/toolkit` + `react-redux`) y llamadas al back con **axios** (tercera entrega). Ver "Redux" más abajo.
- El proyecto está en `frontend/`:

```bash
cd frontend
npm install      # la primera vez
npm run dev      # http://localhost:5173
npm run lint     # tiene que quedar sin errores
```

- El backend corre en `http://localhost:8080` (constante `URL` en `src/redux/apiconfig.js`; mientras dure la migración también está en `src/utils/api.js`).
- `node_modules/` no se versiona y se borra al entregar (se reinstala con `npm install`). Front y back van en repos separados.

## Estructura

```
frontend/src/
  main.jsx          <Provider store={store}> + BrowserRouter + App.
  App.jsx           Estado de sesión, Header y definición de rutas.
  redux/            Todo lo de Redux, en minúscula (carpeta y archivos .js).
    store.js        configureStore con un reducer por slice.
    apiconfig.js    URL base, authConfig(token) e interceptor de axios para los errores.
    productSlice.js, categoriesSlice.js, cartSlice.js, authSlice.js, ...
  index.css         Fuentes + import de los tokens + estilos globales (.app).
  styles/
    tokens.css      Sistema de diseño (variables y clases base). No se edita.
  utils/
    api.js          Llamadas con fetch que todavía no se migraron a Redux. Se borra al terminar la migración.
    format.js       formatPrice, finalPrice, formatDate.
  components/       Componentes reutilizables, agrupados por dominio
    ui/  layout/  auth/  catalog/  products/  cart/  orders/  reviews/  seller/  admin/
  views/            Una vista por URL (admin/ para las de administrador).
  assets/           Solo imágenes fijas (logo, banners). Las de productos vienen del back.
```

**Vista vs. componente:** una vista tiene URL propia y solo arma componentes. Todo lo demás es un componente. La vista casi no tiene lógica: el `useSelector`/`dispatch`, el estado local y la lectura de la URL van en un componente contenedor que la vista solo renderiza (ejemplo: `CatalogView` → `catalog/Catalog` → `catalog/CatalogProducts`).

## Reglas de código

**Componentes**
- Funcionales, con nombre en PascalCase igual al del archivo, y `export default` siempre.
- Un solo elemento raíz por componente (fragment `<>` si no hace falta una etiqueta).
- Una sola responsabilidad por componente; idealmente menos de 40 líneas. Si crece, se divide. Referencia de la cátedra: un filtro no pasa las ~30 líneas y un componente de 120 líneas está mal de entrada.
- Filtros: un componente por filtro (categoría, precio, orden), que se juntan en un filtro general dentro de una sidebar.
- Usar etiquetas semánticas (`header`, `nav`, `main`, `section`, `form`).

**Estado y datos**
- Hooks permitidos: `useState`, `useEffect`, los de `react-router-dom` (`useNavigate`, `useLocation`, `useParams`) y los de `react-redux` (`useSelector`, `useDispatch`).
- No usar `useContext`, `useReducer`, `useRef`, `useMemo`, `useCallback` ni hooks propios.
- Datos del back → estado global (Redux). Estado de UI (modales abiertos, inputs de formularios, filtros del sidebar, stepper de cantidad) → `useState` local.
- El padre guarda el estado y lo pasa por props (desestructuradas en los parámetros). El hijo recibe el evento y le avisa al padre con una función recibida por props; el padre ejecuta la lógica.
- Listas con `.map(...)` y `key={item.id}` (si los datos no vienen de la base y no tienen id, se puede usar el index). No usar `forEach` ni modificar arrays del estado: copiar con spread (`[...arr]`, `{ ...obj }`).
- Renderizado condicional con ternario `? :`, `&&` o un `if` antes del `return`. Con números usar `count > 0 &&` (no `count &&`).
- Comparar siempre con `===` / `!==`.
- No usar nada que no se haya visto en clase sin poder explicarlo: la cátedra revisa que cada integrante entienda todo lo entregado.

**Formularios**
- Controlados: un único estado objeto por formulario.
- Cada input lleva `name` igual al campo del DTO del backend; un solo `handleChange` con `[e.target.name]: e.target.value`.
- `e.preventDefault()` en el submit. Validar primero los casos inválidos y cortar con `return`.
- Cada input con un `label` visible arriba (no solo `placeholder`).

**Código simple y explicable**
- Todo el equipo tiene que poder explicar cada línea. Ante dos soluciones, elegir la más directa aunque sea más larga.
- Estados explícitos en vez de valores deducidos con trucos. Por ejemplo, la carga se maneja con un `loading` (en Redux: `true` en `pending`, `false` en `fulfilled` y `rejected`), no comparando strings.
- La regla de ESLint `react-hooks/set-state-in-effect` está desactivada a propósito (en `eslint.config.js`): se permite `setLoading(true)` y `setError('')` al inicio de un `useEffect` en los componentes que todavía usan `api.js`, y `setPage(...)` en un efecto (ver `CategoriesContainer`). Para sincronizar un formulario con la URL se usa un `useEffect` con los campos como dependencias (ver `CatalogFilters`). Al reintentar o cambiar de página, el reseteo de `loading` y `error` se hace en el handler que dispara la carga. Si la carga cambia por un parámetro de la URL sin pasar por un handler, se guarda el valor anterior en un estado y se compara antes del `return` (ver `lastId` en `OrderDetailContainer`).
- Usar `children` para componentes que son marcos o layouts: el componente arma la estructura fija y recibe el contenido entre sus etiquetas (`Modal`, `CatalogSidebar`, `SellerLayout`, `AuthLayout`). Los componentes que muestran datos con forma fija (`ProductCard`, `PriceTag`, `Pagination`) usan props normales.
- Evitar, salvo acuerdo del equipo: `key` para forzar el reinicio de un componente, `??` y `?.`, desestructuración dentro de callbacks (`([, value]) =>`), `Object.entries` / `reduce` encadenados, hooks de librerías que no estén en esta lista (`useSearchParams`, etc.) y el updater funcional (`setX((prev) => ...)`): se usa el estado directo (`setCategories(categories.filter(...))`).

**Prohibido**
- TypeScript y componentes de clase.
- Acceder a `document` o `window` desde componentes (incluye `alert`, `confirm`, `getElementById`, `document.title`). La única excepción es `main.jsx`. Avisos y confirmaciones se hacen con componentes (`Modal`, `Toast`) mostrados con estado.
- Llamadas al back dentro de componentes: van en los thunks de los slices (`src/redux/`).
- `fetch` en código nuevo: se usa axios.
- `async/await` fuera de los thunks. En los componentes, si hace falta esperar algo, `.then`.
- Efectos secundarios en los reducers (`localStorage`, llamadas, navegación): los reducers son funciones puras.
- Repetir un GET para refrescar datos. La cátedra mira Network y Redux DevTools: un mismo GET no se repite al cambiar de pantalla y volver.

## Redux

Patrón de la clase (Redux Toolkit + `createAsyncThunk`). Ejemplos de referencia: `redux/productSlice.js` (lecturas) y `redux/categoriesSlice.js` (CRUD completo). Material: docs del proyecto `claude/clase-redux-1.md`, `claude/clase-redux-2.md`, `claude/material-redux-pdfs.md`.

**Slices**
- Uno por dominio / service del back, no uno por entidad (las imágenes van con productos; el carrito con sus ítems).
- Archivo `xxxSlice.js` en `src/redux/`, registrado en `store.js`: `categories: categoriesReducer`.
- `reducers: {}` para acciones síncronas sin back (ej. `resetCart`); `extraReducers` con `builder.addCase` para los thunks.

**Thunks** (una por endpoint)
```javascript
export const fetchCategoriesPage = createAsyncThunk('categories/fetchCategoriesPage', async (page) => {
  const { data } = await axios.get(`${URL}/categories?page=${page}&size=10`)
  return data
})
```
- `type` con la convención `'slice/accion'`. Lo que se devuelve llega como `action.payload`.
- Más de un dato → un objeto: `async ({ token, id, category }) =>`.
- `axios.get(url, config)` / `axios.delete(url, config)` / `axios.post|put|patch(url, body, config)`. Con login: `authConfig(token)` como config.
- **Sin try/catch**: el interceptor de `apiconfig.js` transforma cualquier error en `new Error(mensaje del back)` (o un mensaje genérico de conexión si no hubo respuesta), así llega a `action.error.message` en el `rejected`.
- Mientras no esté migrado auth, el token llega al componente por props y se le pasa al thunk.

**Casos**
- GET: `pending` (`loading = true`, `error = null`), `fulfilled` (guardar `action.payload`), `rejected` (`error = action.error.message`).
- Crear: solo `fulfilled` → `state.items = [...state.items, action.payload]`.
- Editar: solo `fulfilled` → `findIndex` con `===`; si `!== -1`, `state.items[index] = action.payload`.
- Borrar: solo `fulfilled` → `filter`. El back responde 204 sin datos: el id sale de `action.meta.arg`.
- Si el mismo dato está en dos lugares del estado (ej. `categories.items` y `categories.page`), se actualizan los dos.
- Se puede escribir `state.x = ...` porque Toolkit usa Immer; fuera de un slice el estado sigue siendo inmutable.

**No repetir GETs** (`action.meta.arg`)
- En el `pending` se guarda qué se pidió: `state.detail = { id: action.meta.arg, product: null, loading: true, error: null }`.
- En el componente se despacha solo si lo guardado no es lo pedido, y `loading` se deduce de eso:
```javascript
const detail = useSelector((state) => state.products.detail)

useEffect(() => {
  if (detail.id !== id) dispatch(fetchProduct(id))
}, [dispatch, id, detail.id])

const loading = detail.id !== id || detail.loading
```
- "Reintentar" despacha directo (sin el `if`).
- Datos que se piden una vez para toda la app (categorías): `dispatch` en el `useEffect` de `App` con `[dispatch]`.
- Varias consultas del mismo thunk (filas de la Home): se guardan por clave, `state.rows[action.meta.arg]`.

**Esperar el resultado en el componente**
- Cuando hace falta (mostrar el error en un modal, cerrar después de guardar, navegar después del checkout), `dispatch` devuelve una promesa con la acción final:
```javascript
dispatch(createCategory({ token, category: form })).then((result) => {
  if (result.error) {
    setSaveError(result.error.message)
    return
  }
  toast.success('Categoría creada')
  closeModal()
})
```

**Reglas que siguen valiendo**
- Mostrar el `message` del backend tal cual.
- Todo listado tiene 4 estados: cargando (skeleton), vacío, error con "Reintentar" y sin resultados.
- Comprobar en Redux DevTools que cada acción aparece una vez (`.../pending` → `.../fulfilled`).

**Para consultar con la profe** (decisiones que no mostró en clase)
- El interceptor de axios en vez de try/catch + `rejectWithValue` en cada thunk.
- `dispatch(...).then(result)` para esperar el resultado.
- Cerrar sesión ante 401/403: el interceptor no pasa el status. Hoy los containers migrados no cierran sesión; se resuelve con el slice de auth.

### Estado de la migración

| Slice | Componentes | Responsable | Estado |
| --- | --- | --- | --- |
| products | ProductRow, CatalogProducts, ProductDetail | Mateo (revisa Pato) | Hecho |
| categories | App, CategoriesContainer, CategoriesPanel | Mateo (revisa Franco) | Hecho |
| seller | MyProducts, MyProductsPanel, ProductEditor, ProductEditorPanel | Mateo | Pendiente |
| cart | AddToCart, Cart, Header, App (+ checkout) | Pato | Slice creado, falta conectar |
| reviews | Reviews, ReviewModal, ReviewsPanel | Pato | Pendiente |
| orders | PurchasesContainer, OrderDetailContainer, OrderConfirmation | Franco | Pendiente |
| admin | UsersContainer | Franco | Pendiente |
| sales | MySales, PriceCalculator | Lucho | Pendiente |
| auth | Login, Register, ProfileSettings, App | Lauti | Pendiente, va último. El `authSlice.js` actual tiene `state.loading = error` (rompe el lint) y `localStorage` en los reducers: se rehace con thunks |

- `store.js`: cada uno agrega su línea. `App.jsx`: primero carrito, después auth.
- Al terminar: borrar `utils/api.js`.

### Llamadas que todavía usan `utils/api.js`

Hasta migrarlas siguen el formato viejo: cada función devuelve la promesa con `.then(handle)`; `handle` convierte la respuesta a JSON y, si `!res.ok`, lanza `{ status, message }`. Los endpoints protegidos usan `authHeaders(token)`. Si `status` es 401 o 403 con sesión iniciada, se cierra sesión.

## Sesión

Vive en `App.jsx` y se pasa por props (hasta que se migre auth y carrito):

- `token`: se guarda en `localStorage` (es lo único que se persiste en el navegador).
- `user`: respuesta de `GET /users/me`. `user.roles` es un array (`USER`, `VENDOR`, `ADMIN`).
- `cart`: respuesta de `GET /cart` (se pide una sola vez por token y baja a `CartView`). Cada ítem trae `imageUrl` y `stock`, así que no hace falta pedir los productos. `cartCount` se calcula sumando `quantity` de `cart.items`.
- `onCartChange(cart)`: las vistas que modifican el carrito (detalle, carrito) le pasan a `App` el carrito que devuelve el back, así el contador del Header se actualiza sin otro GET.
- `categories`: en Redux (`state.categories.items`). App hace `dispatch(fetchCategories())` una sola vez y por ahora la sigue pasando por props a Home, catálogo y formulario de producto. El panel admin actualiza la lista desde el slice (ya no hay `onCategorySaved` / `onCategoryDeleted`).
- `handleLogin(token)` / `handleLogout()`: se pasan a las vistas y al Header.
- Perfil: `setUser` baja como `onUserChange` (editar nombre). `handleTokenChange(token)` se usa al cambiar el email, porque el back devuelve un token nuevo: guarda el token sin borrar `user`, y el `useEffect` de `[token]` trae el usuario actualizado.
- Un `useEffect` con `[token]` trae usuario y carrito cada vez que cambia el token (todavía con `api.js`).
- `loadingUser`: mientras llega `GET /users/me`, las rutas protegidas muestran `PageLoading` en vez del login.
- Si un visitante tuvo que loguearse en medio de una acción (por ejemplo, agregar al carrito), después del login vuelve a donde estaba (`navigate(-1)`), no al inicio.

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
| `/compra/:id/confirmada` | USER | OrderConfirmationView (la orden llega del checkout en `location.state`; sin state, `GET /orders/{id}`) |
| `/vendedor/productos`, `/vendedor/productos/nuevo`, `/vendedor/productos/:id` | VENDOR / ADMIN | MyProductsView, ProductFormView |
| `/vendedor/calculadora`, `/vendedor/ventas` | VENDOR / ADMIN | PriceCalculatorView, MySalesView |
| `/admin/categorias`, `/admin/usuarios` | ADMIN | CategoriesView, UsersView |
| `*` (cualquier otra) | público | NotFoundView (página 404); va última en `Routes` |

Los filtros del catálogo viven en la query string (`/?name=maceta&categoryId=3&page=0`). Se leen con `useLocation().search` + `URLSearchParams` y se escriben con `navigate`. Así sobreviven a ir al login y volver, a recargar y a los botones atrás/adelante, algo que un `useState` en la vista no puede hacer porque se pierde al desmontarla.

## Diseño

- La especificación visual está en el handoff de diseño (pantallas desktop 1280 px y mobile 390 px, `tokens.css`, `mock-data.json`).
- `styles/tokens.css` es el sistema de diseño tal como viene del handoff: no se edita; si el diseño cambia, se reemplaza entero. Las variables están definidas sobre `.app`, por eso el `div` raíz de `App` lleva `className="app"`.
- Usar las clases del diseño (`btn btn-primary`, `input`, `field`, `label`, `card`, `pcard`, `badge`, `alert-err`, `modal`, `skel`, `pager`, etc.) antes de crear estilos nuevos.
- Cada componente o vista con estilos propios tiene su CSS al lado (`Header.jsx` + `Header.css`) y lo importa (`import './Header.css'`). Los CSS compartidos llevan nombre propio (`auth/AuthForm.css`, `views/AuthView.css`).
- Estos CSS son globales (no quedan limitados al componente): las clases nuevas se prefijan con el nombre del componente (`.header-actions`, `.user-dropdown`) para no chocar.
- Responsive solo con `@media` en CSS.
- En los CSS propios, medidas relativas (`rem`, `em`) en vez de `px` (`tokens.css` queda como viene del handoff).
- Formatos (`utils/format.js`): precio `$ 15.725,00`; precio final `price * (1 - discount / 100)`; fecha `30 sep 2026, 14:20`.
- Stock: `0` → badge "Sin stock" y botón deshabilitado; `<= 3` → badge "Últimas N".
- Todo listado tiene 4 estados: cargando (skeleton), vacío, error con "Reintentar" y sin resultados para filtros.

## Backend: diferencias con el handoff de diseño

El backend real manda sobre el handoff:

| Endpoint | Formato real |
| --- | --- |
| `POST /api/v1/auth/register` | `{ firstname, lastname, email, password, role }` |
| `PUT /cart/items` | body `{ productId, quantity }` (`quantity: 0` elimina el ítem) |
| `GET /cart` y respuestas del carrito | cada ítem trae `imageUrl` (la primera imagen, o `null`) y `stock` del producto |
| `PATCH /products/{id}/stock` | body `{ quantity }`: **se suma** al stock actual (negativo resta). El front pide el valor nuevo y manda la diferencia |
| `PATCH /products/{id}/discount` | body `{ discount }` |
| `GET /users` | existe, paginado (ADMIN) |
| `GET /categories` | devuelve una página (`Page`): la lista está en `data.content` |
| `GET /products/{id}`, `/products/mine` | el producto trae `categoryName` (no el id) e `imageUrls` (sin id de imagen). Para quitar una imagen se hace `PUT /products/{id}` con `imageUrls` sin esa url; si el `PUT` no manda `imageUrls`, las imágenes no se tocan |
| `GET/POST /reviews/products/{id}`, `GET/POST /reviews/sellers/{id}` | reseñas (no están en el handoff). GET público, devuelve lista. POST body `{ rating, comment }`; 409 si no compró o ya reseñó |
| `DELETE /reviews/{id}` | el autor borra la suya y ADMIN cualquiera (204); otro usuario recibe 403. La reseña trae `authorId` para saber cuáles son del usuario. En el detalle del producto, "Eliminar" aparece en las reseñas propias (o en todas si es admin) y se confirma con un modal |
| `GET /orders`, `GET /orders/{id}` | cada ítem trae `sellerId`, `sellerName` y `productActive` (si el producto sigue publicado: el nombre linkea a `/productos/{id}`; si no, se muestra "ya no está publicado") |

- Sin token, el back responde **403** (no 401).
- CORS configurado en el back para `http://localhost:5173` (si el front levanta en otro puerto, las llamadas fallan).
- Pendiente en el back: `POST /products/{id}/images` responde 500 (`cloud_name is disabled`): la cuenta de Cloudinary configurada está deshabilitada.
- Pendiente en el back: corregir `DELETE /cart/items` (tiene un `@PathVariable` sin variable en la ruta). Mientras tanto, para borrar un ítem se usa `PUT /cart/items` con `quantity: 0`.

## Decisiones pendientes

- `/productos/:id` lee el id con `useLocation().pathname.split('/')[2]`, mientras que `/mis-compras/:id` usa `useParams`. Se podría unificar todo con `useParams`.
- Modo oscuro: se haría con un estado en `App` que agrega la clase `dark` a `.app`. Baja prioridad.
