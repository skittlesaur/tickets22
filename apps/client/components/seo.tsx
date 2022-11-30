import Head from 'next/head'

interface SeoProps {
  title: string
  description?: string
}

const Seo = ({ title, description }: SeoProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="og:title" content={title} />
      <meta name="description" content={description} />
      <meta name="og:description" content={description} />
      <meta name="og:image" content="https://instatus.com/og.png" />
      <meta name="og:url" content="https://tickets22.baraa.app" />
      <meta name="og:type" content="website" />
      <link rel="icon" type="image/png" href="/logo.png" />
    </Head>
  )
}

export default Seo