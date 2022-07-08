import Link from 'next/link'

const SideBar = ({ links }: { links: { [key: string]: String[] } }) => {

    return (
        <aside className="" aria-label="Sidebar">
            {/* TODO Searchbox */}
            {/* <div className="z-10 top-4 w-full mt-8 flex items-center text-sm leading-6 text-slate-400 
            rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 bg-white">
                <>
                    <svg
                        width="24"
                        height="24"
                        fill="none"
                        aria-hidden="true"
                        className="mr-3 flex-none"
                    >
                        <path
                            d="m19 19-3.5-3.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <circle
                            cx="11"
                            cy="11"
                            r="6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    Quick search...
                </>
            </div> */}
            <ul className="z-9 top-20">
                {
                    Object.entries(links).sort().map(([key, value]) => (
                        <li key={key} className="mt-8">
                            <h5 className="mb-3 font-semibold text-slate-900">{key}</h5>
                            <ul className="space-y-6 lg:space-y-2 border-l border-slate-100">
                                {value.sort().map((item, idx) => (
                                    <li key={key}>
                                        <Link href={{ pathname: `/${item}` }} passHref key={idx} >
                                            <a
                                                className='block border-l pl-4 -ml-px border-transparent hover:border-slate-400'
                                            >
                                                {item}
                                            </a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))
                }
            </ul>
        </aside>
    )
}

export default SideBar
