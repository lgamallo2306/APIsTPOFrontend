
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


export const getCart = (token) =>
  fetch(`${URL}/cart`, { headers: authHeaders(token) }).then(handle)


export const getCategories = () =>
  fetch(`${URL}/categories`).then(handle)