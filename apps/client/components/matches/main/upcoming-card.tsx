import getTeamIcon from '@lib/get-team-icon'

const UpcomingCard = () => {
  return (
    <>
      <div className="z-[1] flex items-center justify-center gap-2 md:gap-24">
        <div className="flex flex-col items-center gap-6">
          <div className="w-20 md:w-32 aspect-square">
            {getTeamIcon('argentina')}
          </div>
          <div className="font-qatar font-black text-lg md:text-xl text-primary">
            Argentina
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 text-primary text-sm font-light text-center">
          <p>Group E</p>
          <p className="text-xl font-normal">vs</p>
          <p>27 November at 10PM</p>
        </div>
        <div className="flex flex-col items-center gap-6">
          <div className="w-20 md:w-32 aspect-square">
            {getTeamIcon('australia')}
          </div>
          <div className="font-qatar font-black text-lg md:text-xl text-primary">
            Australia
          </div>
        </div>
      </div>
      <div className="z-[0] absolute inset-0 items-start justify-between -my-6 mx-10 select-none hidden md:flex">
        <div className="bg-gradient-to-t from-white via-transparent to-white/50 z-[1] inset-0 absolute" />
        <img
          src="/images/players/argentina/10.png"
          alt="Lionel Messi"
          className="object-cover w-[30%] mix-blend-luminosity grayscale opacity-70"
        />
        <img
          src="/images/players/australia/15.png"
          alt="Lionel Messi"
          className="object-cover w-[30%] mix-blend-luminosity grayscale opacity-70"
        />
      </div>
    </>
  )
}

export default UpcomingCard