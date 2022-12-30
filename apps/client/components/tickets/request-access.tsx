const RequestAccess = ({ setIsEmailModalOpen }: any) => {
  return (
    <div className="w-full flex flex-col items-center">
      <p>You don't have any tickets.</p>
      <div className="flex flex-col items-center gap-4">
        <p>
          Already purchased a ticket? Request access through email.
        </p>
        <button
          onClick={() => setIsEmailModalOpen(true)}
          className="bg-primary px-4 py-2 rounded-lg text-secondary font-medium border border-transparent text-sm hover:text-primary hover:bg-transparent hover:border-primary transition-all duration-200 ease-in-out"
        >
          Request Access
        </button>
      </div>
    </div>
  )
}

export default RequestAccess