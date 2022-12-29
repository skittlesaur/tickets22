interface StadiumProps {
  stadium: any
}

const Stadium = ({ stadium }: StadiumProps) => {
  if (!stadium) return <></>

  return (
    <>
      <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-800" />
      <div className="flex items-center justify-center text-sm">
        <div className="w-16 aspect-square select-none">
          <img src={`/images/stadiums/${stadium.name.replace(/ /g, '-').toLowerCase()}.webp`} />
        </div>
        <div>
          <p className="text-gray-400 text-xs">Stadium</p>
          <p className="text-gray-500 font-medium">
            {stadium.name}
          </p>
        </div>
      </div>
    </>
  )
}

export default Stadium