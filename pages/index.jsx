import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

const Home = ({ posts }) => {
  return (
    <div className="m-4">
      {posts.map((post, index) => (
        <Link href={'/blog/' + post.slug} passHref key={index}>
          <div className="cursor-pointer my-4">
                  <h5>{post.frontMatter.title}</h5>
                  <p>{post.frontMatter.description}</p>
                  <p>
                    <small className="text-sm">{post.frontMatter.date}</small>
                  </p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join('posts'))

  const posts = files.map(filename => {
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
    const { data: frontMatter } = matter(markdownWithMeta)

    return {
      frontMatter,
      slug: filename.split('.')[0]
    }
  })

  return {
    props: {
      posts
    }
  }
}

export default Home
