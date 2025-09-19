import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import readingTime from 'reading-time'

export const Content = defineDocumentType(() => ({
  name: 'Content',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the content (optional - can be in content body instead)',
      required: false,
    },
    date: {
      type: 'date',
      description: 'The date of the content',
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      description: 'Tags for the content',
      required: false,
    },
    author: {
      type: 'string',
      description: 'The author of the content',
      required: false,
      default: 'AI Agent',
    },
    status: {
      type: 'enum',
      options: ['draft', 'published', 'archived'],
      description: 'The status of the content',
      required: false,
      default: 'published',
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath,
    },
    category: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileDir.split('/').pop() || 'content',
    },
    readingTime: {
      type: 'string',
      resolve: (doc) => {
        const stats = readingTime(doc.body.raw)
        return `${Math.max(1, Math.round(stats.minutes))} min`
      },
    },
    url: {
      type: 'string',
      resolve: (doc) => {
        const category = doc._raw.sourceFileDir.split('/').pop()
        if (category === 'posts') {
          return `/posts/${doc._raw.flattenedPath.replace('posts/', '')}`
        }
        return `/${category}/${doc._raw.flattenedPath.replace(`${category}/`, '')}`
      },
    },
  },
}))

export default makeSource({
  contentDirPath: './app/content',
  documentTypes: [Content],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})
