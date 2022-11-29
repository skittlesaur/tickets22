import Link from 'next/link'

const Footer = () => {
  return (
    <div className="border-t border-gray-200">
      <div className="max-w-screen-xl mx-auto py-4 flex flex-col">
        <Link
          href="/"
          className="italic font-medium hover:text-primary transition-all duration-200 ease-in-out"
        >
          Tickets22
        </Link>
        <div>

        </div>
      </div>
    </div>
  )
}

export default Footer