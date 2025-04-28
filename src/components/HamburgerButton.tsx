import Menu from '@/components/Menu'
import { useState } from 'react'

function HamburgerButton() {
  const [open, setOpen] = useState(false)

  function handleHamburgerClick() {
    setOpen(prev => !prev)
  }

  return (
    <div className='flex items-center justify-center ani-el'>
      <button
        onClick={handleHamburgerClick}
        className='relative w-8 h-6 cursor-pointer focus:outline-none group'
      >
        <span
          className={`absolute left-1/2 top-1/2 h-[1px] w-full bg-white transform -translate-x-1/2 transition duration-300 ease-in-out
          ${
            open
              ? '-translate-y-1/2 rotate-45'
              : '-translate-y-[4px] group-hover:translate-y-[2px]'
          }
          `}
        />
        <span
          className={`absolute left-1/2 top-1/2 h-[1px] w-full bg-white transform -translate-x-1/2 transition duration-300 ease-in-out
          ${
            open
              ? '-translate-y-1/2 -rotate-45'
              : 'translate-y-[4px] group-hover:-translate-y-[2px]'
          }
          `}
        />
      </button>

      <Menu isOpen={open} />
    </div>
  )
}

export default HamburgerButton
