import { MDXProvider } from '@mdx-js/react'
import HelpTOC from '@components/help/toc'
import Logo from '@images/logo.svg'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import Arrow from '@images/arrow-forward.svg'

interface HelpProps {
  children: any
  title: string
}

const components = {
  h1: ({ children }: any) => <h1 className="font-black text-4xl">{children}</h1>,
  h2: ({ children }: any) => <h2 className="font-bold text-2xl mt-6">{children}</h2>,
  h3: ({ children }: any) => <h3 className="font-semibold text-xl">{children}</h3>,
  a: ({ children, href }: any) => (href.includes('http') ? (
    <a
      target="_blank"
      className="font-medium text-primary hover:underline inline-flex items-center gap-0.5"
      href={href}
    >
      <span>{children}</span>
      <Arrow className="w-4 aspect-square -rotate-45" />
    </a>
  ) : (
    <Link className="font-medium text-primary hover:underline" href={href}>{children}</Link>
  )),
  li: ({ children }: any) =>
    <li className="before:content-[''] before:w-5 before:h-[0.1em] before:bg-gray-300 before:inline-block before:rounded before:mr-4 flex items-center ">
      {children}
    </li>,
  p: ({ children }: any) => <p className="text-gray-700">{children} </p>,
}

const HelpLayout = ({ children, title }: HelpProps) => {
  return (
    <div className="relative flex flex-col min-h-screen gap-16 max-w-full overflow-clip bg-gray-100">
      <NextSeo
        title={title}
      />
      <div className="overflow-hidden bg-primary h-[40vh] fixed top-0 left-0 right-0 z-[0]">
        <div className="flex items-center justify-center">
          <Link
            href="/"
            className="relative z-[1] flex items-center justify-center mt-10 text-secondary drop-shadow-md hover:animate-pulse"
          >
            <Logo className="w-20 aspect-square [&>*]:fill-current" />
            <h1 className="italic font-bold text-3xl">Tickets22</h1>
            <p className="font-mono font-medium text-xl opacity-80 ml-4">/help</p>
          </Link>
        </div>
        <img
          alt="Pattern"
          src="https://mir-s3-cdn-cf.behance.net/projects/404/9d7be7151890527.Y3JvcCw4MjgsNjQ4LDEyMyww.jpg"
          className="z-[0] select-none pointer-events-none opacity-10 absolute top-0 w-full object-cover"
        />
      </div>
      <div className="relative z-[1] mt-36 mb-24 bg-white max-w-screen-xl mx-auto w-full grow px-20 py-16 shadow-xl rounded-3xl flex gap-9">
        <div className="sticky top-0 border-r border-gray-200 min-w-[12em]">
          <HelpTOC />
        </div>
        <div className="py-8 flex flex-col gap-4">
          <MDXProvider components={components}>
            {children}
          </MDXProvider>
        </div>
      </div>
    </div>
  )
}

export default HelpLayout