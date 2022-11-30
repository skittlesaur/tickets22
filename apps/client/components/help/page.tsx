import { useState } from 'react'
import ChevronForward from '@images/chevron-forward.svg'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface PageProps {
  page: string
  title: string
  children: any
  nestCount?: number
}

const Page = ({ page, title, children, nestCount = 0 }: PageProps) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(router.pathname.includes(page))

  return (
    <>
      <div
        style={{ marginLeft: `${nestCount * 0.5}rem` }}
        className={`relative ${router.pathname === `/help${page}` ? 'text-black' : 'text-gray-600 hover:text-black'}`}
      >
        {children && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`block w-4 top-1/2 -translate-y-1/2 aspect-square absolute right-full mr-1 fill-current ${isOpen ? 'rotate-90' : 'rotate-0'} transition-all duration-200 ease-in-out cursor-pointer`}
          >
            <ChevronForward />
          </button>
        )}
        <Link
          key={page}
          href={`/help${page}`}
          className={`${router.pathname === `/help${page}` ? 'font-medium' : ''}`}
        >
          {title}
        </Link>
      </div>
      {isOpen && children?.map((child: any) => (
        <Page
          page={child.page}
          title={child.title}
          children={child.children}
          nestCount={nestCount + 1}
        />
      ))}
    </>
  )
}

export default Page