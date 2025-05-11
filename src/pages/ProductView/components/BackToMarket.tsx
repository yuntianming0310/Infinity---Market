import { ArrowLeft02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Link } from 'react-router-dom'

function BackToMarket() {
  return (
    <div className='absolute top-1/12 left-[8%] z-10 back-btn'>
      <span className='text-2xl text-zinc-400 tracking-wide'>
        Back to Market
      </span>
      <Link to='/market' viewTransition>
        <HugeiconsIcon
          icon={ArrowLeft02Icon}
          width={64}
          size={52}
          className='cursor-pointer'
        />
      </Link>
    </div>
  )
}

export default BackToMarket
