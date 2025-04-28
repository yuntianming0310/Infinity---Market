import TransitionLink from '@/components/TransitionLink'
import { ArrowLeft02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

function BackToMarket() {
  return (
    <div className='absolute top-1/12 left-[8%]'>
      <span className='text-2xl text-zinc-400 tracking-wide'>
        Back to Market
      </span>
      <TransitionLink to='/market'>
        <HugeiconsIcon
          icon={ArrowLeft02Icon}
          width={64}
          size={52}
          className='cursor-pointer'
        />
      </TransitionLink>
    </div>
  )
}

export default BackToMarket
