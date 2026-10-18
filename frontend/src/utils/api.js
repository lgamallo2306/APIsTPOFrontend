
const URL ='http://localhost:8080'

const handle =(res) => {
    if (res.status === 204) return null 
    return res
        .json()
        .catch(() => ({ message: `Error ${res.status}` })) 
        .then((data) => {
        if (!res.ok) throw { status: res.status, message: data.message }
        return data
    })
}

const authHeaders = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
})

// ---------- Auth ----------
// credentials = { email, password }
export const login = (credentials) =>
  fetch(`${URL}/api/v1/auth/authenticate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  }).then(handle)

// data = { firstname, lastname, email, password, role }
export const register = (data) =>
  fetch(`${URL}/api/v1/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handle)

 export const getMe = (token) =>
    fetch(`${URL}/users/me`, { headers: authHeaders(token) }).then(handle)

// data = { name, surname }
export const updateMe = (token, data) =>
  fetch(`${URL}/users/me`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  }).then(handle)

// data = { newEmail, currentPassword }. Devuelve un token nuevo (el token lleva el email)
export const changeEmail = (token, data) =>
  fetch(`${URL}/users/me/email`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  }).then(handle)

// data = { currentPassword, newPassword }
export const changePassword = (token, data) =>
  fetch(`${URL}/users/me/password`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  }).then(handle)

// data = { password }
export const deactivateMe = (token, data) =>
  fetch(`${URL}/users/me`, {
    method: 'DELETE',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  }).then(handle)


export const getCart = (token) =>
  fetch(`${URL}/cart`, { headers: authHeaders(token) }).then(handle)


export const getCategories = () =>
  fetch(`${URL}/categories`).then(handle)

// página de categorías para el panel admin: 10 por página
export const getCategoriesPage = (page) =>
  fetch(`${URL}/categories?page=${page}&size=10`).then(handle)

export const getProducts = (query) =>
  fetch(`${URL}/products?size=12&${query}`).then(handle)


export const getProductRow = (query) =>
  fetch(`${URL}/products?size=5&${query}`).then(handle)

export const getProduct = (id) =>
  fetch(`${URL}/products/${id}`).then(handle)

// item = { productId, quantity }
export const addCartItem = (token, item) =>
  fetch(`${URL}/cart/items`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(item),
  }).then(handle)

// item = { productId, quantity }; quantity 0 elimina el ítem
export const updateCartItem = (token, item) =>
  fetch(`${URL}/cart/items`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify(item),
  }).then(handle)

export const checkout = (token) =>
  fetch(`${URL}/orders/checkout`, { method: 'POST', headers: authHeaders(token) }).then(handle)

// los ítems del carrito no traen imagen: se pide cada producto.
// Promise.all espera todas las promesas y devuelve un array con los productos en el mismo orden
export const getCartProducts = (items) =>
  Promise.all(items.map((item) => getProduct(item.productId)))

export const clearCart = (token) =>
  fetch(`${URL}/cart`, { method: 'DELETE', headers: authHeaders(token) }).then(handle)

export const getOrder = (token, id) =>
  fetch(`${URL}/orders/${id}`, { headers: authHeaders(token) }).then(handle)
export const getMaterials = () =>
  fetch(`${URL}/products/materials`).then(handle)

export const estimatePrice = (token, data) =>
  fetch(`${URL}/products/estimate-price`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  }).then(handle)

export const getSales = (token) =>
  fetch(`${URL}/orders/sales`, { headers: authHeaders(token) }).then(handle)

export const getOrders = (token) =>
  fetch(`${URL}/orders`, { headers: authHeaders(token) }).then(handle)

// ---------- Productos del vendedor ----------

export const getSellerProducts = (token, page) =>
  fetch(`${URL}/products/mine?page=${page}`, { headers: authHeaders(token) }).then(handle)

export const createProduct = (token, data) =>
  fetch(`${URL}/products`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  }).then(handle)

export const updateProduct = (token, id, data) =>
  fetch(`${URL}/products/${id}`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  }).then(handle)

export const deleteProduct = (token, id) =>
  fetch(`${URL}/products/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  }).then(handle)

// quantity se suma al stock actual (puede ser negativa para restar)
export const updateStock = (token, id, quantity) =>
  fetch(`${URL}/products/${id}/stock`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify({ quantity }),
  }).then(handle)

export const updateDiscount = (token, id, discount) =>
  fetch(`${URL}/products/${id}/discount`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify({ discount }),
  }).then(handle)

// ---------- Imágenes ----------

export const uploadProductImage = (token, productId, file) => {
  const formData = new FormData()
  formData.append('file', file)
  return fetch(`${URL}/products/${productId}/images`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  }).then(handle)
}

export const deleteProductImage = (token, productId, imageId) =>
  fetch(`${URL}/products/${productId}/images/${imageId}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  }).then(handle)

// ---------- Admin: categorías ----------
// data = { description }
export const createCategory = (token, data) =>
  fetch(`${URL}/categories`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  }).then(handle)

export const updateCategory = (token, id, data) =>
  fetch(`${URL}/categories/${id}`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  }).then(handle)

export const deleteCategory = (token, id) =>
  fetch(`${URL}/categories/${id}`, { method: 'DELETE', headers: authHeaders(token) }).then(handle)

// ---------- Admin: usuarios ----------
export const getUserByEmail = (token, email) =>
  fetch(`${URL}/users/email/${encodeURIComponent(email)}`, { headers: authHeaders(token) }).then(handle)

// role = 'USER' | 'VENDOR' | 'ADMIN'
export const assignRole = (token, userId, role) =>
  fetch(`${URL}/users/${userId}/roles/${role}`, { method: 'POST', headers: authHeaders(token) }).then(handle)

export const removeRole = (token, userId, role) =>
  fetch(`${URL}/users/${userId}/roles/${role}`, { method: 'DELETE', headers: authHeaders(token) }).then(handle)
