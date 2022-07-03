import Link from 'next/link'

const SideBar = ({ links }: { links: { [key: string]: String[] } }) => {

    return (
        <aside className="w-64" aria-label="Sidebar">
            <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded ">
                <ul className="space-y-2">
                    {
                        Object.entries(links).map(([key, value]) => (
                            <li key={key} className="mt-12 lg:mt-8">
                                <h5 className="font-semibold mx-0 mt-0 mb-8 lg:mb-3">{key}</h5>
                                {value.map((item, idx) => (
                                    <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 ">
                                        <Link href={{ pathname: `/${item}` }} passHref key={idx} className="border-l block -ml-px pl-4">{item}</Link>
                                    </div>
                                ))}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </aside>
    )
}

export default SideBar
