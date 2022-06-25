import Link from 'next/link'

const Nav = () => {
  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 
                      lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06]
                      bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent">
      <div className="border-b mx-4 py-4 lg:border-0 lg:mx-0 lg:px-8">
        <div className="flex items-center relative">

          <Link href="/" passHref className=''>
            <span className='cursor-pointer font-sans text-2xl font-medium'>CSS QuickDocs</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Nav
