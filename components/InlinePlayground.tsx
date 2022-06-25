import { useState } from 'react'
import ReactDOMServer from 'react-dom/server'

const Template = ({content}:{content:string}) => {
    return (
        <div >
            <p>Start!!</p>
            <div dangerouslySetInnerHTML={{__html: content}}/>
            <p>End</p>
        </div>
    )
}

const Preview = ({html}) => {
    const srcDoc = <Template content={html}></Template>
    
    return (
        <div className='shadow-lg rounded-xl overflow-hidden'>
            <div className='bg-white-100 w-full h-6 py-1.5 px-3 flex gap-1.5 bg-white border-b border-gray-100'>
                <div className="rounded-full h-3 w-3 bg-red-400"></div>
                <div className="rounded-full h-3 w-3 bg-yellow-400"></div>
                <div className="rounded-full h-3 w-3 bg-green-400"></div>
            </div>
            <iframe width="1000px" height="500px"
             className='bg-white'
             srcDoc={ReactDOMServer.renderToString(srcDoc)} />
        </div>
    )
}

const InlinePlayground = ({ css }) => {

    const [html, setHtml] = useState(`
<p>left: 100px</p>
<div class="bg">
    <div class="box" id="one">3. One</div>
    <div class="box" id="two" style="position: fixed;left: 150px; top:150px">3. Two</div>
    <div class="box" id="three">3. Three</div>
    <div class="box" id="four">3. Four</div>
</div>    
<p>Hello World</p>`)

  return (
            <div className="rounded border-solid border box-border relative m-4 ">
            <div className=" grid  w-full grid-cols-[1fr_max-content]"
            >
                <div className="flex-auto flex flex-col overflow-auto">
                    <div>
                        <textarea
                            className="bg-transparent outline-none w-full h-full"
                            value={html}
                            onChange={(e) => setHtml(e.target.value)}
                        />
                    </div>

                    <div v-show="showCSS" className="text-sm border-t border-gray-200">
                        <div className="ml-1 p-2 text-sm opacity-50 flex">
                            <span>HTML</span>
                            <div className="flex-auto" />
                            <div v-if="showMode" className="icon-button" title="Toggle Mode">
                                <span className="text-sm mr-1.5 capitalize"></span>

                            </div>
                            <div
                                v-if="showCopy"
                                className="icon-button ml-3"
                                title="Copy"
                            >
                            </div>
                        </div>
                        <pre
                            className="language-css bg-transparent max-h-30em px-4 py-4"
                        />
                    </div>
                </div>
                <div className=" border-l border-gray-200 w-10em p-3 min-h-40 bg-gray-50">
                    <Preview html={html}/>
                </div>
            </div>
        </div>
  )
}

export default InlinePlayground

