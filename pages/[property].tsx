import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXProvider } from '@mdx-js/react';

import { Nav, InlinePlayground, Todo, EditOnGitHub } from '../components'
import { DetailedHTMLProps, HTMLAttributes, useMemo } from 'react'
import * as csstree from 'css-tree';
import WithSidebar from '../layouts/WithSidebar'

type MDXComponents = React.ComponentProps<typeof MDXProvider>['components']

const MdxCode = (props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {
  const classNames = (props.className || '').split(',').map(c => c.trim().toLowerCase());

  const idxTarget = useMemo(() => {
    const REGEX = /i-(\d+)/;
    const val = classNames.find(c => REGEX.test(c))?.match(REGEX)[1];
    return val ? parseInt(val) : undefined;
  }, [classNames]);
  const nSiblings = useMemo(() => {
    const REGEX = /s-(\d+)/;
    const val = classNames.find(c => REGEX.test(c))?.match(REGEX)[1];
    return val ? parseInt(val) : undefined;
  }, [classNames]);

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

    const target_block = (target_rule as csstree.Rule);

    let target_css = '';
    if (target_rule) {
      target_css = csstree.generate(target_rule) || '';
    }
    console.log("block", target_css);
    return <InlinePlayground targetCss={target_css} nSiblings={nSiblings} idxTarget={idxTarget}></InlinePlayground>
  }

  return (
    <code {...props}></code>
  )
}

const components: MDXComponents = {
  Nav,
  InlinePlayground,
  h1: (props) => <h1 {...props} className="flex font-semibold text-xl mr-0 mt-10 mb-2.5 -ml-4 pl-4 tracking-tight whitespace-pre-wrap" ></h1>,
  code: (props) => <MdxCode {...props}></MdxCode>,
  Todo
}

const Page = ({ frontMatter: { title, description }, mdxSource, sidebarPaths }) => {
  return (
    <WithSidebar navList={sidebarPaths}>
      <div className='p-4'>
        <h1 className="inline-block font-bold text-2xl leading-8 mb-8 tracking-tight sm:text-3xl sm:leading-9">
          {title}
        </h1>
        <MDXRemote {...mdxSource} components={components} />
        <EditOnGitHub href={`https://github.com/tharindusathis/css-quickdocs/tree/main/docs/css-properties/${title}.mdx`} />
      </div>
    </WithSidebar>
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

  const allFrontMatters = fs.readdirSync(path.join('docs', 'css-properties')).map(
    filename => {
      const mdx = fs.readFileSync(path.join('docs', 'css-properties', filename), 'utf-8');
      const { data } = matter(mdx);
      return data;
    }
  )

  let sidebarPaths = {
  };

  allFrontMatters.forEach(frontMatter => {
    sidebarPaths[frontMatter.tags[0]] = [...(sidebarPaths[frontMatter.tags[0]] || []), frontMatter.title];
  });

  return {
    props: {
      frontMatter,
      property,
      mdxSource,
      sidebarPaths
    }
  }
}

export { getStaticProps, getStaticPaths }
export default Page
