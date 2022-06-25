import { useMemo, useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import { html_beautify, css_beautify } from 'js-beautify'

const TemplateColors = {
    'viewport': '#ffffff',
    'container': '#F2F5FF',
    'sibling': '#FFC9B5',
    'target': '#10b981DD'
}

const Template = ({ css, onChangeHtml, siblings = 10, target = 2 }:
    {css:string; onChangeHtml?: (html: string) => void; siblings?: number; target?: number }) => {
    
    const defaultCss = `
        .container {       
            height: fit-content;
            background: ${TemplateColors.container};
            color: black;
            position: relative;
            padding: 0 10px;
            border-radius: 5px;
            overflow: hidden;
            margin: 3%;
        }
        
        .sibling, .target {
            width: 100%;
            height: 100px;
            background: ${TemplateColors.sibling};
            color: white;
            border-radius: 5px;
            margin: 10px 0;
        }

        .target {
            background: ${TemplateColors.target};
        }
    `
    const customCss = `
        .target {
            ${css}
        }
    `
    const Content = () => (
        <div className="container">
                {
                    Array.from({length: siblings}, (_, i)=>
                <div className={i+1 == target ? 'target':'sibling'} key={i}></div>
                    )                    
                }
        </div>
    )

    onChangeHtml && onChangeHtml(ReactDOMServer.renderToString(<Content />))
    

    return (
        <div >
            {/* default styling */}
            <style dangerouslySetInnerHTML={{__html: defaultCss}}></style>

            {/* custom styling */}
            <style dangerouslySetInnerHTML={{__html: customCss}}></style>

            {/* content */}
            <Content/>
        </div>
    )
}

const Preview = ({css, onChangeHtml}:{
    css: string;
    onChangeHtml?: (html: string) => void;
}) => {

    const cssMemo = useMemo(() => {
        return css_beautify(css, {})
    }, [css])

    const srcDoc = <Template css={cssMemo} onChangeHtml={html => onChangeHtml && onChangeHtml(html)}/>;    
    const LegendItem = ({color, label}) => {
        return (
            <div className='flex items-center'>
                <div className='h-3 w-3 rounded ring-1 ring-gray-300 align-middle '
                style={{background: color}}
                 ></div>
                <div className='ml-2 text-xs align-text-top text-gray-500'>{label}</div>
            </div>
        )
    }
    return (
        <div className='shadow-lg rounded-xl overflow-hidden w-full h-full flex flex-col'>
            <div className='bg-white-100 w-full h-6 py-1.5 px-3 flex gap-1.5 bg-white border-b border-gray-200'>
                <div className="rounded-full h-3 w-3 bg-red-400"></div>
                <div className="rounded-full h-3 w-3 bg-yellow-400"></div>
                <div className="rounded-full h-3 w-3 bg-green-400"></div>
            </div>
            <iframe
                className='w-full h-full'
                style={{background: TemplateColors.viewport}}
                srcDoc={ReactDOMServer.renderToString(srcDoc)} />
            <div className='w-full h-6 py-1.5 px-3 flex justify-around gap-1.5 bg-gray-100/0 border-t border-gray-200'>
                {
                    Object.entries(TemplateColors).reverse().map(([key, value])=> (
                        <LegendItem label={key} key={key} color={value} />
                    ))
                }
            </div>
        </div>
    )
}

const InlinePlayground = ({ defaultCss } : {defaultCss?: string}) => {

    const [css, setCss] = useState(defaultCss || '') 
    const [htmlContent, setHtmlContent] = useState('')

    const formatHTML = (html: string) => html_beautify(htmlContent, {indent_size: 4})

    return (
            <div className="rounded border-solid border box-border relative m-4 ">
            <div className=" grid grid-cols-2  w-full "
            >
                <div className="col-span-1 flex-auto flex flex-col overflow-auto">
                    <div>
                        <textarea
                            className="bg-transparent outline-none font-mono w-full  h-48"
                            value={css}
                            onChange={(e) => setCss(e.target.value)}
                        />
                    </div>

                    <div className="text-sm border-t border-gray-200">
                        <div className="ml-1 p-2 text-sm opacity-50 flex">
                            <span>HTML</span>
                            <div className="flex-auto" />
                            <div className="icon-button" title="Toggle Mode">
                                <span className="text-sm mr-1.5 capitalize"></span>
                                    
                            </div>
                            <div className="icon-button ml-3" title="Copy">
                            </div>
                        </div>
                        <pre
                            className="bg-transparent max-h-30em px-4 py-4">
                                {formatHTML(htmlContent)}
                            </pre>
                    </div>
                </div>
                <div className="col-span-1 border-l border-gray-200  p-3 min-h-40 bg-gray-50">
                    <Preview  css={css} 
                     onChangeHtml={html => setHtmlContent(html)}
                     />
                </div>
            </div>
        </div>
    ) 
}

export default InlinePlayground

