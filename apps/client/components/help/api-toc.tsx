import Link from 'next/link'

interface apiTOCProps {
  toc: [
    {
      title: string
      endpoints: [
        {
          title: string,
          path: string
        }
      ]
    }
  ]
}

const ApiTOC = ({ toc }: apiTOCProps) => {
  return (
    <ul className="flex flex-col items-start">
      {toc.map(({ title, endpoints }) => (
        <div>
          <li className="before:content-[''] before:w-5 before:h-[0.1em] before:bg-gray-300 before:inline-block before:rounded before:mr-4 flex items-center ">
            {title}
          </li>
          {endpoints.map(({ title, path }) => (
            <li
              key={path}
              className="ml-14"
            >
              <Link
                className="text-gray-500 hover:text-black"
                href={`#${path}`}
              >
                {title}
              </Link>
            </li>
          ))}
        </div>
      ))}
    </ul>
  )
}

export default ApiTOC