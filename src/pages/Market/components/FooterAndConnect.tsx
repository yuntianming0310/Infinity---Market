import { Link } from 'react-router-dom'

function FooterAndConnect() {
  return (
    <div className='w-full flex justify-center px-48 pt-16 pb-48 bg-zinc-900 text-background-primary'>
      <ContactInfo />
      <div className='self-end text-center mr-auto'>
        <p>All For What We Love 🤞</p>
        <p className='text-2xl mt-4 text-zinc-500'>By Ken Wen</p>
      </div>
    </div>
  )
}

function ContactInfo({ direction = 'L' }: { direction?: 'L' | 'R' }) {
  const infoList = [
    {
      name: 'Github',
      href: '/',
    },
    {
      name: 'Medium',
      href: '/',
    },
    {
      name: 'G-Mail',
      href: '/',
    },
  ]

  return (
    <div className='self-end mr-auto'>
      <h2 className='text-2xl uppercase text-zinc-400'>Connect</h2>

      <ul
        className={`flex flex-col ${
          direction === 'L' ? 'items-start' : 'items-end'
        } text-2xl gap-1 mt-8`}
      >
        {infoList.map(({ href, name }) => (
          <li
            key={name}
            className='w-fit hover:text-primary-cyan transition-colors duration-300'
          >
            <Link to={href}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FooterAndConnect
