import toast from 'react-hot-toast'
import { CircleAlert } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { login } from '@/api/authentication'
import { useAuth } from '@/providers/AuthProvider'
import { useCartActions } from '@/stores/cartStore'
import { getCartInfo } from '@/api/carts'

interface ILoginFormInput {
  email: string
  password: string
}

function LoginForm({
  transitionToSignUpForm,
  backToMenu,
}: {
  transitionToSignUpForm: () => void
  backToMenu: () => void
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILoginFormInput>({
    mode: 'onSubmit',
  })
  const { setUser } = useAuth()
  const { setProducts } = useCartActions()

  const onSubmit: SubmitHandler<ILoginFormInput> = async ({
    email,
    password,
  }) => {
    toast
      .promise(login({ email, password }), {
        loading: 'Logging...',
        success: res => {
          return `Welcome back, ${res.data.user.name}!`
        },
        error: err => `Login failed: ${err.message}`,
      })
      .then(res => {
        setUser(res.data.user)
        backToMenu()
        reset()

        return getCartInfo()
      })
      .then(res => {
        setProducts(res.items)
      })
  }

  const getFirstErrorMessage = () => {
    const fields: Array<keyof ILoginFormInput> = ['email', 'password']

    for (const field of fields) {
      if (errors[field]) {
        return errors[field]?.message
      }
    }

    return errors.root?.message
  }

  const firstError = getFirstErrorMessage()

  return (
    <div className='login-form fixed left-1/4 bottom-1/6 text-white w-108'>
      <h2 className='text-6xl mb-6 font-light uppercase font-DMSans'>
        Sign In
      </h2>
      <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className='block text-md mb-1'>Email</label>
          <input
            type='email'
            {...register('email', {
              required: 'E-mail field is required.',
            })}
            className='w-full bg-transparent border-b border-white/50 py-2 px-1 focus:outline-none focus:border-white'
          />
        </div>
        <div>
          <label className='block text-md mb-1'>Password</label>
          <input
            type='password'
            {...register('password', {
              required: 'Password field is required.',
            })}
            className='w-full bg-transparent border-b border-white/50 py-2 px-1 focus:outline-none focus:border-white'
          />
        </div>
        <div className='flex justify-between pt-4'>
          <button
            className='px-6 py-2 border border-white/50 hover:bg-white hover:text-black transition-colors'
            type='submit'
          >
            Sign In
          </button>
          <button
            type='button'
            className='px-6 py-2 text-white/70 hover:text-white transition-colors'
            onClick={backToMenu}
          >
            Back
          </button>
        </div>

        {firstError && (
          <div className='flex items-center gap-4 text-2xl bg-red-500/20 border border-red-400 text-white px-4 py-3 my-4 rounded'>
            <CircleAlert color='#fb2c36' />
            {firstError}
          </div>
        )}

        <p className='mt-4 text-2xl'>
          Need an account?{' '}
          <button
            type='button'
            className='border-b border-white hover:border-transparent'
            onClick={transitionToSignUpForm}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  )
}

export default LoginForm
