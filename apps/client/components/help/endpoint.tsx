import Clipboard from '@images/clipboard.svg'
import toast from 'react-hot-toast'
import { useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import useUser from '@hooks/use-user'
import EyeOff from '@images/eye-off.svg'
import Eye from '@images/eye.svg'

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
  CURL,
  AXIOS,
}

const Endpoint = ({ baseUrl, path, title, method, requiresToken = false, responses }: EndpointProps) => {
  const { data: user } = useUser()
  const [activeAuthorization, setActiveAuthorization] = useState(AuthorizationMethod.CURL)
  const [activeResponse, setActiveResponse] = useState<number>(200)
  const [tokenHidden, setTokenHidden] = useState(true)

  const copyToClipboard = (str: string) => {
    navigator.clipboard.writeText(str)
      .then(() => toast.success('Copied successfully'))
  }

  const token = tokenHidden || !user?.apiKey ? 'TOKEN' : user?.apiKey
  const curl = `--header 'Authorization: Bearer $TOKEN$`
  const axios = `import axios from "axios"
  
const url = \`${baseUrl}${path}\`
const config = {
  headers: {
    Authorization: 'Bearer $TOKEN$'
    } 
  }
  
axios.${method.toLowerCase()}(url,${method !== 'GET' ? `{ /* data */ },` : ''} config)
`

  return (
    <>
      <h3 id={path} className="font-semibold text-xl pt-6">{title}</h3>
      <p>
        Endpoint
      </p>
      <div className="flex items-center w-full justify-between relative bg-[#111827] text-[#e5e7eb] rounded-lg p-4 max-w-full">
        <pre className="overflow-x-auto">
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
                  onClick={() => setActiveAuthorization(AuthorizationMethod.CURL)}
                  className={`${activeAuthorization === AuthorizationMethod.CURL ? 'text-black' : 'text-gray-500'} hover:text-black`}
                >
                  cURL
                </button>
                <button
                  onClick={() => setActiveAuthorization(AuthorizationMethod.AXIOS)}
                  className={`${activeAuthorization === AuthorizationMethod.AXIOS ? 'text-black' : 'text-gray-500'} hover:text-black`}
                >
                  Axios
                </button>
              </div>
              <div className="relative pl-9 md:pl-4 flex items-center justify-between bg-[#111827] text-[#e5e7eb] rounded-lg p-4 w-full">
                {activeAuthorization === AuthorizationMethod.CURL && (
                  <SyntaxHighlighter
                    language="bash"
                    showInlineLineNumbers
                    useInlineStyles={false}
                    wrapLines={true}
                    className={'syntax-highlighter'}
                  >
                    {curl.replace('$TOKEN$', token)}
                  </SyntaxHighlighter>
                )}
                {activeAuthorization === AuthorizationMethod.AXIOS && (
                  <SyntaxHighlighter
                    language="bash"
                    showInlineLineNumbers
                    useInlineStyles={false}
                    wrapLines={true}
                    className={'syntax-highlighter'}
                  >
                    {axios.replace('$TOKEN$', token)}
                  </SyntaxHighlighter>
                )}
                <div className="flex flex-col items-center gap-2 bg-[#111827] sticky top-0 self-start">
                  <button
                    onClick={() => {
                      if (activeAuthorization === AuthorizationMethod.CURL)
                        return copyToClipboard(curl.replace('$TOKEN$', token))

                      if (activeAuthorization === AuthorizationMethod.AXIOS)
                        return copyToClipboard(axios.replace('$TOKEN$', token))
                    }}
                    className="px-2"
                  >
                    <Clipboard className="w-5 aspect-square fill-current text-[#e5e7eb]/60 hover:text-[#e5e7eb] transition-all duration-200 ease-in-out" />
                  </button>
                  {user?.apiKey && (
                    <button
                      onClick={() => setTokenHidden(!tokenHidden)}
                      className="w-5 aspect-square text-[#e5e7eb]/60 hover:text-[#e5e7eb] transition-all duration-200 ease-in-out"
                    >
                      {tokenHidden ? (
                        <EyeOff className="fill-current" />
                      ) : (
                        <Eye className="fill-current" />
                      )}
                    </button>
                  )}
                </div>
              </div>
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
              <div className="relative pl-9 md:pl-4 flex items-center justify-between bg-[#111827] text-[#e5e7eb] rounded-lg p-4 w-full">
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
                  onClick={() => copyToClipboard(`${curl}`)}
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