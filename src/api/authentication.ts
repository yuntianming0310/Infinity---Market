import axiosInstance from '@/api'

export async function signup({
  name,
  email,
  password,
  confirmPassword,
}: {
  name: string
  email: string
  password: string
  confirmPassword: string
}) {
  const res = await axiosInstance.post('/users/signup', {
    name,
    email,
    password,
    passwordConfirm: confirmPassword,
  })

  return res
}

export async function login({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const res = await axiosInstance.post('/users/login', {
    email,
    password,
  })

  return res
}

export async function isLoggedIn() {
  const res = await axiosInstance.get('/users/isLoggedIn')

  return res
}

export async function logout() {
  const res = await axiosInstance.get('/users/logout')

  return res
}
