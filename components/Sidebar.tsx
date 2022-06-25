import Link from 'next/link'

const SideBar = () => {
    const links = {
        'Properties': [
            'background-color',
            'background-image',
            'background-position',
            'background-repeat',
            'background-size',
        ],
        'Selectors': [
            ':root',
            ':nth-child',
            ':nth-last-child',
            ':nth-last-of-type',
            ':nth-of-type',
            ':first-child',
        ]
    }
    return (
        <nav className="hidden overflow-y-auto px-8 pb-10 fixed w-80 z-20 lg:block">
            <div className="relative lg:leading-6">
                <div className="flex items-center relative">
                    <ul className="m-0 p-0">
                        {
                            Object.entries(links).map(([key, value]) => (
                                <li key={key} className="mt-12 lg:mt-8">
                                    <h5 className="font-semibold mx-0 mt-0 mb-8 lg:mb-3">{key}</h5>
                                    {value.map(item => (
                                        <Link href='/' passHref key={item} className="border-l block -ml-px pl-4">{item}</Link>
                                    ))}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default SideBar
