import { useEffect, useMemo, useRef, useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import { html_beautify, css_beautify } from 'js-beautify'

import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('./Editor'), {
    ssr: false,
});

const formatHTML = (html: string) => html_beautify(html, { indent_size: 2 })
const formatCSS = (css: string) => css_beautify(css, { indent_size: 2 })

enum CssClass {
    Viewport = 'viewport',
    Container = 'container',
    Sibling = 'sibling',
    Target = 'target',
}

const PreviewTheme: {
    [key in CssClass]: string;
} = {
    [CssClass.Viewport]: '#ffffff',
    [CssClass.Container]: '#F2F5FF',
    [CssClass.Sibling]: '#FFC9B5',
    [CssClass.Target]: '#10b981DD'
}

const themeCss = `
/* scrollbar */

*::-webkit-scrollbar {
  height: 12px;
  width: 12px;
  background-color: transparent;
}

* {
  scrollbar-width: thin;
}

*::-webkit-scrollbar-thumb {
  -webkit-transition: background .2s ease-in-out;
  transition: background .2s ease-in-out;
  border: 3px solid transparent;
  border-radius: 9999px;
  --tw-bg-opacity: 1;
  background-color: rgb(229 231 235 / var(--tw-bg-opacity));
  background-clip: content-box;
}

*::-webkit-scrollbar-thumb:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(209 213 219 / var(--tw-bg-opacity));
}

*::-webkit-scrollbar-corner {
  background-color: transparent;
}


.${CssClass.Container} {       
    background: ${PreviewTheme[CssClass.Container]};
    color: black;
    position: relative;
    padding: 0 10px;
    border-radius: 5px;
    overflow: hidden;
    margin: 3%;
    overflow-y: scroll;
    height: 500px;
}

.${CssClass.Sibling}, .${CssClass.Target} {
    width: 100%;
    height: 100px;
    background: ${PreviewTheme[CssClass.Sibling]};
    color: white;
    border-radius: 5px;
    margin: 10px 0;
}

.placeholder {
    background: none;
    border: 2px dashed rgb(0,0,255) ;
}

.${CssClass.Target} {
    background: ${PreviewTheme[CssClass.Target]};
}
`;

type PreviewContentProps = {
    /**
    * Number of siblings of target including the `Target`.
    */
    nSiblings: number;

    /**
     * Index of the `Target` in the `Target`s siblings.
     */
    idxTarget: number;
}
type PlaygroundProps = Partial<PreviewContentProps> & {
    /**
     * The CSS to be injected into the `Target`.
     */
    targetCss: string;
}

const Preview = ({ previewTemplate }: {
    previewTemplate: JSX.Element;
}) => {

    const srcDoc = useMemo(() => ReactDOMServer.renderToString(previewTemplate), [previewTemplate])
    const LegendItem = ({ color, label }) => {
        return (
            <div className='flex items-center'>
                <div className='h-3 w-3 rounded ring-1 ring-gray-300 align-middle '
                    style={{ background: color }}
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
                style={{ background: PreviewTheme.viewport }}
                srcDoc={srcDoc} />
            <div className='w-full h-6 py-1.5 px-3 flex justify-around gap-1.5 bg-gray-100/0 border-t border-gray-200'>
                {
                    Object.entries(PreviewTheme).reverse().map(([key, value]) => (
                        <LegendItem label={key} key={key} color={value} />
                    ))
                }
            </div>
        </div>
    )
}

const PreviewContent = ({ nSiblings, idxTarget }: PreviewContentProps) => (
    <div className={CssClass.Container}>
        {
            Array.from({ length: nSiblings }, (_, i) =>
                <div className={i + 1 == idxTarget ? CssClass.Target : CssClass.Sibling} key={i}></div>
            )
        }
    </div>
)

const InlinePlayground = ({ targetCss, nSiblings = 10, idxTarget = 2 }: PlaygroundProps) => {
    const [targetCssRaw, setTargetCssRaw] = useState(formatCSS(targetCss) || '');
    const [targetCssValue, setTargetCssValue] = useState(targetCssRaw);

    useEffect(() => {
        /*  To delay change state while typing...
            https://stackoverflow.com/questions/53071774/reactjs-delay-onchange-while-typing 
        */
        const timeOutId = setTimeout(() => {
            setTargetCssValue(targetCssRaw);
        }, 500);
        return () => clearTimeout(timeOutId);
    }, [targetCssRaw]);

    const customCss = `
        ${targetCssValue}
    `;

    const previewContentStr = useMemo(() =>
        ReactDOMServer.renderToString(
            <PreviewContent nSiblings={nSiblings} idxTarget={idxTarget} />
        ),
        [nSiblings, idxTarget]);

    const PreviewTemplete = () => (
        <div >
            {/* default styling */}
            <style dangerouslySetInnerHTML={{ __html: themeCss }}></style>

            {/* custom styling */}
            <style dangerouslySetInnerHTML={{ __html: customCss }}></style>

            {/* content */}
            <PreviewContent nSiblings={nSiblings} idxTarget={idxTarget} />
        </div>
    )

    return (
        <div className="rounded border-solid border box-border relative m-4 ">
            <div className=" grid grid-cols-1 md:grid-cols-2  w-full ">
                <div className="col-span-1 flex-auto flex flex-col overflow-auto">
                    <div>
                        <div className='p-3'>
                            <Editor value={targetCssRaw} onChange={(value) => setTargetCssRaw(formatCSS(value))} />
                        </div>
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
                            className="bg-transparent max-h-30em p-3">
                            {formatHTML(previewContentStr)}
                        </pre>
                    </div>
                </div>
                <div className="col-span-1 border-l border-gray-200  p-3 h-96 max-h-fit md:h-full  md:max-h-full bg-gray-50">
                    <Preview previewTemplate={<PreviewTemplete />} />
                </div>
            </div>
        </div>
    )
}

export default InlinePlayground

