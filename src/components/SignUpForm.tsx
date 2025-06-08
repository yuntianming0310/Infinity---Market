import clsx from 'clsx'
import toast from 'react-hot-toast'
import { CircleAlert } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { signup } from '@/api/authentication'

interface ISignUpFormInput {
  name: string
  email: string
  password: string
  confirmPassword: string
}

function SignUpForm({
  transitionFromSignUpToLogin,
  backToMenu,
}: {
  transitionFromSignUpToLogin: () => void
  backToMenu: () => void
}) {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<ISignUpFormInput>({ criteriaMode: 'firstError' })

  const onSubmit: SubmitHandler<ISignUpFormInput> = async ({
    name,
    email,
    password,
    confirmPassword,
  }) => {
    toast
      .promise(signup({ name, email, password, confirmPassword }), {
        loading: 'Creating your account...',
        success: 'Account created successfully! Please log in.',
        error: err => `Signup failed: ${err.message}`,
      })
      .then(() => {
        transitionFromSignUpToLogin()
        reset()
      })
  }

  const getFirstErrorMessage = () => {
    const fields: Array<keyof ISignUpFormInput> = [
      'name',
      'email',
      'password',
      'confirmPassword',
    ]

    for (const field of fields) {
      if (errors[field]) {
        return errors[field]?.message
      }
    }

    return errors.root?.message
  }

  const firstError = getFirstErrorMessage()

  return (
    <div className='signup-form fixed left-1/4 bottom-1/6 text-white w-108'>
      <h2 className='text-6xl mb-6 font-light uppercase font-DMSans'>
        Sign Up
      </h2>

      <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className='block text-md mb-1'>Name</label>
          <input
            type='text'
            {...register('name', {
              required: 'Name field is required.',
              maxLength: {
                value: 20,
                message: 'Name must be at most 20 characters.',
              },
            })}
            className='w-full bg-transparent border-b border-white/50 py-2 px-1 focus:outline-none focus:border-white'
          />
        </div>
        <div>
          <label className='block text-md mb-1'>Email</label>
          <input
            type='email'
            {...register('email', {
              required: 'E-mail field is required.',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Please provide a valid email address.',
              },
            })}
            className={clsx(
              'w-full bg-transparent border-b border-white/50 py-2 px-1 focus:outline-none focus:border-white',
              errors.email && 'border-red-400'
            )}
          />
        </div>
        <div>
          <label className='block text-md mb-1'>Password</label>
          <input
            type='password'
            {...register('password', {
              required: 'Password field is required.',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters.',
              },
              maxLength: {
                value: 64,
                message: 'Password must be at most 64 characters',
              },
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: 'Password can only contain letters and numbers.',
              },
            })}
            className='w-full bg-transparent border-b border-white/50 py-2 px-1 focus:outline-none focus:border-white'
          />
        </div>
        <div>
          <label className='block text-md mb-1'>Comfirm Password</label>
          <input
            type='password'
            {...register('confirmPassword', {
              required: 'Confirmed password field is required.',
              minLength: {
                value: 8,
                message: 'Confirmed password must be at least 8 characters.',
              },
              maxLength: {
                value: 64,
                message: 'Confirmed password must be at most 64 characters',
              },
              validate: value =>
                value === getValues().password || 'Passwords do not match.',
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message:
                  'Confirmed password can only contain letters and numbers.',
              },
            })}
            className='w-full bg-transparent border-b border-white/50 py-2 px-1 focus:outline-none focus:border-white'
          />
        </div>
        <div className='flex justify-between pt-4'>
          <button
            className='px-6 py-2 border border-white/50 hover:bg-white hover:text-black transition-colors'
            type='submit'
          >
            Sign Up
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
          Already have an account?{' '}
          <button
            className='border-b border-white hover:border-transparent'
            onClick={transitionFromSignUpToLogin}
            type='button'
          >
            Sign In
          </button>
        </p>
      </form>
    </div>
  )
}

export default SignUpForm
