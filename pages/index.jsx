import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

const Home = ({ pages }) => {
  return (
    <div className="m-4">
      {pages.map((page, index) => (
        <Link href={'/' + page.property} passHref key={index}>
          <div className="cursor-pointer my-4">
                  <h5>{page.frontMatter.title}</h5>
                  <p>{page.frontMatter.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join('docs','css-properties'))

  const pages = files.map(filename => {
    const markdownWithMeta = fs.readFileSync(path.join('docs','css-properties', filename), 'utf-8')
    const { data: frontMatter } = matter(markdownWithMeta)

    return {
      frontMatter,
      property: filename.split('.')[0]
    }
  })

  return {
    props: {
      pages
    }
  }
}

export default Home
