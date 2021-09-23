import React from 'react'
import { useParams } from 'react-router-dom'
import { BlogPosts } from './Posts'

export default function Post() {
  const { slug } = useParams()
  // @ts-ignore
  const post = BlogPosts[slug];

  const { title, description } = post;

  return (
    <div style={{ padding: 20 }}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}
