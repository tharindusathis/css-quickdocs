import Link from 'next/link'

const Nav = () => {
  return (
    <nav className="nav p-3 cursor-pointer">
      <Link href="/" passHref>
        <h2 className="font-extrabold text-xl">CSS quickbook</h2>
      </Link>
    </nav>
  )
}

export default Nav
