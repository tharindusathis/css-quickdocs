import { Sidebar } from "../components";
import { useState } from "react";
import { Dialog } from '@headlessui/react'

const WithSidebar = ({ children, navList }: { children: React.ReactNode, navList: { [key: string]: String[] } }) => {

    const [navIsOpen, setNavIsOpen] = useState(false);

    return (
        <div className="">
            <nav className="fixed top-1 z-40 w-full flex-none transition-colors duration-500 
                      lg:z-50 lg:hidden border-slate-900/10 
                      bg-transparent ">
                <div className="flex items-center">
                    <div className="flex items-center p-4 ">
                        <button
                            type="button"
                            onClick={() => setNavIsOpen(!navIsOpen)}
                            className="text-slate-500 hover:text-slate-600  ">
                            <svg width="24" height="24">
                                <path
                                    d="M5 6h14M5 12h14M5 18h14"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
            <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="hidden bg-white lg:block fixed z-20 inset-0 top-[3.8125rem] right-auto w-72 pb-10 px-8 overflow-y-auto"
                    onClick={() => setNavIsOpen(false)}>
                    <Sidebar links={navList} />
                </div>
                <div className="lg:pl-72">
                    {children}
                </div>
            </div>

            <Dialog
                as="div"
                open={navIsOpen}
                onClose={() => setNavIsOpen(false)}
                className="fixed z-50 inset-0 overflow-y-auto lg:hidden"
            >
                <Dialog.Overlay className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
                <div className="relative bg-white w-80 max-w-[calc(100%-3rem)] p-6">
                    <button
                        type="button"
                        onClick={() => setNavIsOpen(false)}
                        className="absolute z-10 top-5 right-5 w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-600 "
                    >
                        <span className="sr-only">Close navigation</span>
                        <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 overflow-visible">
                            <path
                                d="M0 0L10 10M10 0L0 10"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>

                    <Sidebar links={navList} />

                </div>
            </Dialog>
        </div>

    )
};

export default WithSidebar;