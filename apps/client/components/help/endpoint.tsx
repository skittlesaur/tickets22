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
  responses: {
    [status: number]: [
      {
        description: string,
        res: string
      }
    ]
  }
}

enum AuthorizationMethod {
  COOKIES,
  BEARER
}

const Endpoint = ({ baseUrl, path, title, method, requiresToken = false, responses }: EndpointProps) => {

  const [activeAuthorization, setActiveAuthorization] = useState(AuthorizationMethod.COOKIES)
  const [activeResponse, setActiveResponse] = useState<number>(200)

  const copyToClipboard = (str: string) => {
    navigator.clipboard.writeText(str)
      .then(() => toast.success('Copied successfully'))
  }

  const cookiesString = `const options = {
  "headers": {
    "cookie": "access=XXX",
    "Content-Type": "application/json"
  }
}`

  const bearerString = `const options = {
  "headers": {
    "Authorization": "Bearer XXX",
    "Content-Type": "application/json"
  }
}`

  return (
    <>
      <h3 id={path} className="font-semibold text-xl pt-6">{title}</h3>
      <p>
        Endpoint
      </p>
      <div className="flex items-center w-full justify-between relative bg-[#111827] text-[#e5e7eb] rounded-lg p-4 max-w-full">
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
          <p>
            Authentication
          </p>
          <div className="w-full">
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
      <p>
        Example Responses
      </p>
      <div className="w-full">
        <div className="rounded-lg border border-gray-400 p-4 flex flex-col gap-4">
          <div className="flex items-center gap-4 border-b border-gray-300 pb-2">
            {Object.keys(responses).sort()?.map((res: string) => (
              <button
                key={res}
                onClick={() => setActiveResponse(Number(res))}
                className={`${Number(res) === activeResponse ? 'text-black' : 'text-gray-500'} hover:text-black`}
              >
                {res}
              </button>
            ))}
          </div>
          {responses[activeResponse]?.map(({ description, res }) => (
            <>
              <p className="text-sm text-gray-600">{description}</p>
              <div className="flex items-center justify-between bg-[#111827] text-[#e5e7eb] rounded-lg p-4 w-full">
                <SyntaxHighlighter
                  language="JavaScript"
                  showInlineLineNumbers
                  useInlineStyles={false}
                  showLineNumbers={true}
                  wrapLines={true}
                  className={'syntax-highlighter'}
                >
                  {res}
                </SyntaxHighlighter>
                <button
                  onClick={() => copyToClipboard(`${bearerString}`)}
                  className="bg-[#111827] px-2 self-start sticky top-0"
                >
                  <Clipboard className="w-5 aspect-square fill-current text-[#e5e7eb]/60 hover:text-[#e5e7eb] transition-all duration-200 ease-in-out" />
                </button>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  )
}

export default Endpoint