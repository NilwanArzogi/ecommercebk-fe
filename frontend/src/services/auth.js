// src/services/auth.js

export function register(user) {
  const users = JSON.parse(localStorage.getItem('users')) || []

  const exist = users.find(u => u.email === user.email)
  if (exist) {
    return { success: false, message: 'Email sudah terdaftar' }
  }

  users.push(user)
  localStorage.setItem('users', JSON.stringify(users))

  return { success: true }
}

export function login(email, password) {
  const users = JSON.parse(localStorage.getItem('users')) || []

  const user = users.find(
    u => u.email === email && u.password === password
  )

  if (!user) {
    return { success: false, message: 'Email atau password salah' }
  }

  localStorage.setItem('loginUser', JSON.stringify(user))
  return { success: true }
}

export function logout() {
  localStorage.removeItem('loginUser')
}

export function getUser() {
  return JSON.parse(localStorage.getItem('loginUser'))
}
