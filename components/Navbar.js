// components/Navbar.js
import Link from 'next/link'
import NavLink from './NavLink'

const Navbar = () => {
  return (
    <nav className="h-screen min-w-48 bg-gray-800 text-white flex flex-col items-center py-10">
      <Link href={"/"} className="text-2xl font-bold mb-10">Logo</Link>
      <ul className="space-y-6">
        <NavLink href="/chat">Chat</NavLink>
      </ul>
    </nav>
  )
}

export default Navbar
