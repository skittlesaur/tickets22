import Clipboard from '@images/clipboard.svg'
import toast from 'react-hot-toast'
import { useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'


interface EndpointProps {
  baseUrl: string
  path: string
  title: string
  method: 'GET' | 'POST'
  requiresToken?: boolean
  responses: [
    {
      status: number
      res: any
    }
  ]
}

enum AuthorizationMethod {
  COOKIES,
  BEARER
}

const Endpoint = ({ baseUrl, path, title, method, requiresToken = false, responses }: EndpointProps) => {

  const [activeAuthorization, setActiveAuthorization] = useState(AuthorizationMethod.COOKIES)
  const [activeResponse, setActiveResponse] = useState(0)

  const copyToClipboard = (str: string) => {
    navigator.clipboard.writeText(str)
      .then(() => toast.success('Copied successfully'))
  }

  const cookiesString =
    `const options = {
  "headers": {
    "cookie": "access=XXX"
  }
}`

  const bearerString =
    `const options = {
  "headers": {
    "Authorization": "Bearer XXX"
  }
}`

  return (
    <>
      <h3 id={path} className="font-semibold text-xl mt-6">{title}</h3>
      <li className="before:content-[''] before:w-5 before:h-[0.1em] before:bg-gray-300 before:inline-block before:rounded before:mr-4 flex items-center ">
        Endpoint
      </li>
      <div className="ml-9 flex items-center w-full justify-between relative bg-[#111827] text-[#e5e7eb] rounded-lg p-4 max-w-full">
        <pre>
          <code>
            <span className="mr-5">{method}</span>
            <span className="text-sm text-[#e5e7eb]/60">{baseUrl}</span>
            {path}
          </code>
      </pre>
        <button
          onClick={() => copyToClipboard(`${baseUrl}${path}`)}
          className="bg-[#111827] px-2"
        >
          <Clipboard className="w-5 aspect-square fill-current text-[#e5e7eb]/60 hover:text-[#e5e7eb] transition-all duration-200 ease-in-out" />
        </button>
      </div>
      {requiresToken && (
        <>
          <li className="before:content-[''] before:w-5 before:h-[0.1em] before:bg-gray-300 before:inline-block before:rounded before:mr-4 flex items-center ">
            Authentication
          </li>
          <div className="ml-9 w-full">
            <div className="rounded-lg border border-gray-400 p-4 flex flex-col gap-4">
              <div className="flex items-center gap-4 border-b border-gray-300 pb-2">
                <button
                  onClick={() => setActiveAuthorization(AuthorizationMethod.COOKIES)}
                  className={`${activeAuthorization === AuthorizationMethod.COOKIES ? 'text-black' : 'text-gray-500'} hover:text-black`}
                >
                  Cookies
                </button>
                <button
                  onClick={() => setActiveAuthorization(AuthorizationMethod.BEARER)}
                  className={`${activeAuthorization === AuthorizationMethod.BEARER ? 'text-black' : 'text-gray-500'} hover:text-black`}
                >
                  Bearer Token
                </button>
              </div>
              {activeAuthorization === AuthorizationMethod.COOKIES && (
                <div className="flex items-center justify-between bg-[#111827] text-[#e5e7eb] rounded-lg p-4 w-full">
                  <SyntaxHighlighter
                    language="JavaScript"
                    showInlineLineNumbers
                    useInlineStyles={false}
                    showLineNumbers={true}
                    wrapLines={true}
                    className={'syntax-highlighter'}
                  >
                    {cookiesString}
                  </SyntaxHighlighter>
                  <button
                    onClick={() => copyToClipboard(`${cookiesString}`)}
                    className="bg-[#111827] px-2 self-start sticky top-0"
                  >
                    <Clipboard className="w-5 aspect-square fill-current text-[#e5e7eb]/60 hover:text-[#e5e7eb] transition-all duration-200 ease-in-out" />
                  </button>
                </div>
              )}
              {activeAuthorization === AuthorizationMethod.BEARER && (
                <div className="flex items-center justify-between bg-[#111827] text-[#e5e7eb] rounded-lg p-4 w-full">
                  <SyntaxHighlighter
                    language="JavaScript"
                    showInlineLineNumbers
                    useInlineStyles={false}
                    showLineNumbers={true}
                    wrapLines={true}
                    className={'syntax-highlighter'}
                  >
                    {bearerString}
                  </SyntaxHighlighter>
                  <button
                    onClick={() => copyToClipboard(`${bearerString}`)}
                    className="bg-[#111827] px-2 self-start sticky top-0"
                  >
                    <Clipboard className="w-5 aspect-square fill-current text-[#e5e7eb]/60 hover:text-[#e5e7eb] transition-all duration-200 ease-in-out" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      <li className="before:content-[''] before:w-5 before:h-[0.1em] before:bg-gray-300 before:inline-block before:rounded before:mr-4 flex items-center ">
        Example Responses
      </li>
      <div className="ml-9 w-full">
        <div className="rounded-lg border border-gray-400 p-4 flex flex-col gap-4">
          <div className="flex items-center gap-4 border-b border-gray-300 pb-2">
            {responses.map((res, index) => (
              <button
                key={index}
                onClick={() => setActiveResponse(index)}
                className={`${index === activeResponse ? 'text-black' : 'text-gray-500'} hover:text-black flex items-center gap-1`}
              >
                {res.status}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between bg-[#111827] text-[#e5e7eb] rounded-lg p-4 w-full">
            <SyntaxHighlighter
              language="JavaScript"
              showInlineLineNumbers
              useInlineStyles={false}
              showLineNumbers={true}
              wrapLines={true}
              className={'syntax-highlighter'}
            >
              {responses[activeResponse].res}
            </SyntaxHighlighter>
            <button
              onClick={() => copyToClipboard(`${bearerString}`)}
              className="bg-[#111827] px-2 self-start sticky top-0"
            >
              <Clipboard className="w-5 aspect-square fill-current text-[#e5e7eb]/60 hover:text-[#e5e7eb] transition-all duration-200 ease-in-out" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Endpoint