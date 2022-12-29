import Link from 'next/link'

const Hero = () => {
  return (
    <div className="relative bg-gray-900 w-full md:h-[96vh] overflow-hidden">
      <div className="opacity-70 h-[70vh] aspect-video md:w-full md:mt-[-24vw] md:h-[100vw] bg-red-400 bg-red-400 saturate-0 brightness-50">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/-F9WGMM8J48?autoplay=1&loop=1&controls=1&playlist=-F9WGMM8J48"
          title="YouTube video player"
        ></iframe>
      </div>
      <div className="absolute z-[2] inset-0 mx-4 md:mx-40 flex flex-col gap-4 justify-center items-start max-w-[60%] md:max-w-[40%]">
        <h1 className="text-4xl md:text-8xl font-qatar text-white drop-shadow-xl">
          From Qatar To All.
        </h1>
        <p className="text-sm md:text-base opacity-80 text-white">
          Get your tickets now for FIFA World Cup Qatar 2022™ and enjoy worldwide soccer from Qatari stadiums.
        </p>
        <div className="w-full flex flex-col md:flex-row gap-2 md:gap-4 mt-4 md:mt-0">
          <Link
            href="/matches"
            className="text-center bg-primary text-secondary md:w-1/2 hover:w-2/3 py-4 rounded-xl border border-transparent hover:bg-gray-900/40 hover:tracking-widest hover:backdrop-blur hover:border-secondary transition-all duration-300 ease-in-out"
          >
            Get Tickets
          </Link>
          <Link
            href="/login"
            className="text-center bg-gray-900/40 text-secondary md:w-1/2 hover:w-2/3 py-4 rounded-xl border border-primary hover:tracking-widest hover:backdrop-blur hover:border-secondary transition-all duration-300 ease-in-out"
          >
            Login
          </Link>
        </div>
      </div>
      <div className="absolute z-[1] w-96 aspect-square rounded-full -bottom-16 -right-16 bg-primary/50 blur-[200px] animate-pulse" />
    </div>
  )
}

export default Hero