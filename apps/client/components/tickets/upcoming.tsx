import BallIcon from '@images/ball.svg'
import LinedSparkles from '@images/lined-sparkles.svg'
import Sparkle from '@images/sparkle.svg'
import getTeamIcon from '@lib/get-team-icon'

const Upcoming = () => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-black text-4xl">
        Upcoming
      </h1>
      <div className="relative overflow-hidden rounded-lg shadow-lg border border-primary ">
        <div className="relative z-[2] w-full flex flex-col gap-3 p-6">
          <div className="flex items-center gap-2">
            <BallIcon className="w-5 aspect-square" />
            <LinedSparkles className="w-24" />
          </div>
          <div className="flex items-center justify-center gap-24">
            <div className="flex flex-col items-center gap-6">
              <div className="w-32 aspect-square">
                {getTeamIcon('argentina')}
              </div>
              <div className="font-qatar font-black text-xl text-primary">
                Argentina
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 text-primary text-sm font-light">
              <p>Group E</p>
              <p className="text-xl font-normal">vs</p>
              <p>27 November at 10PM</p>
            </div>
            <div className="flex flex-col items-center gap-6">
              <div className="w-32 aspect-square">
                {getTeamIcon('australia')}
              </div>
              <div className="font-qatar font-black text-xl text-primary">
                Australia
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Sparkle className="w-6 aspect-square" />
          </div>
        </div>
        <div className="absolute inset-0 flex items-start justify-between -my-6 mx-10">
          <div className="bg-gradient-to-t from-white via-transparent to-white/50 z-[1] inset-0 absolute" />
          <img
            src="/players/argentina/10.png"
            alt="Lionel Messi"
            className="object-cover w-[30%] mix-blend-luminosity grayscale opacity-70"
          />
          <img
            src="/players/australia/15.png"
            alt="Lionel Messi"
            className="object-cover w-[30%] mix-blend-luminosity grayscale opacity-70"
          />
        </div>
      </div>
    </div>
  )
}

export default Upcoming