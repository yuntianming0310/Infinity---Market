import { Link } from 'react-router-dom'

import Logo from '@/components/Logo'

function Nav() {
  return (
    <nav className='flex items-center'>
      <Logo />
      <NavList />
    </nav>
  )
}

function NavList() {
  const navList = [
    { name: 'About', href: '/about' },
    { name: 'Market', href: '/market' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <ul className='flex gap-8 ml-auto'>
      {navList.map(item => (
        <li key={item.name} className='text-4xl uppercase'>
          <Link to={item.href}>{item.name}</Link>
        </li>
      ))}
    </ul>
  )
}

export default Nav
