import useUser from '@hooks/use-user'

const InfoForm = ({ email, setEmail }: any) => {
  const { data: user } = useUser()

  return (
    <form className="flex flex-col gap-4">
      <div>
        <label htmlFor="seatPosition" className="block text-sm font-medium text-gray-600">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm disabled:opacity-50"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={!!user}
          autoComplete="off"
        />
      </div>
    </form>
  )
}

export default InfoForm