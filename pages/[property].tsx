import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXProvider } from '@mdx-js/react';


import { Nav, InlinePlayground } from '../components'
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import * as csstree from 'css-tree';
type MDXComponents = React.ComponentProps<typeof MDXProvider>['components']


const MdxCode = (props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {
  let classNames = (props.className || '').split(',').map(c => c.trim().toLowerCase());

  // const isPresent = (className: string) => classNames.includes(className);

  console.log(classNames);
  console.log(classNames.includes('language-css'))

  if (classNames.includes('language-css') && classNames.includes('playground')) {
    const css = props.children.toString();
    const ast = csstree.parse(css);

    const target_rule = csstree.find(ast, (node, item, list) => {
      if (node.type === 'Rule' && node.prelude) {
        const target = csstree.find(node.prelude, (n, i, l) =>
          n && n.type === 'ClassSelector' && n.name === 'target'
        )
        if (target) return true;
      }
      return false;
    });

    const target_block = (target_rule as csstree.Rule)?.block;

    let target_css = '';
    if (target_block) {
      target_css = csstree.generate(target_block)?.replace('{', '').replace('}', '') || '';
    }
    console.log("block", target_css);
    return <InlinePlayground defaultCss={target_css}></InlinePlayground>
  }

  return (
    <code {...props}></code>
  )
}

const components: MDXComponents = {
  Nav,
  InlinePlayground,
  h1: (props) => <h1 {...props} className="flex font-semibold text-xl mr-0 mt-10 mb-2.5 -ml-4 pl-4 tracking-tight whitespace-pre-wrap" ></h1>,
  code: (props) => <MdxCode {...props}></MdxCode>
}

const Page = ({ frontMatter: { title, description }, mdxSource }) => {
  return (
    <div className="m-8">
      <h1 className="inline-block font-extrabold text-2xl leading-8 m-0 tracking-tight sm:text-3xl sm:leading-9">{title}</h1>
      <p className="text-lg leading-7 mx-0 mb-0 my-2">
        {description}
      </p>
      <MDXRemote {...mdxSource} components={components} />
    </div>
  )
}

const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('docs', 'css-properties'))

  const paths = files.map(filename => ({
    params: {
      property: filename.replace('.mdx', '')
    }
  }))

  return {
    paths,
    fallback: false
  }
}

const getStaticProps = async ({ params: { property } }) => {
  const markdownWithMeta = fs.readFileSync(
    path.join('docs', 'css-properties', property + '.mdx'), 'utf-8')

  const { data: frontMatter, content } = matter(markdownWithMeta)
  const mdxSource = await serialize(content)

  return {
    props: {
      frontMatter,
      property,
      mdxSource
    }
  }
}

export { getStaticProps, getStaticPaths }
export default Page
