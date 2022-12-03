import BallIcon from '@images/ball.svg'

const FullscreenLoader = ({ text }: { text?: string }) => {
  return (
    <div className="bg-primary w-screen h-screen fixed inset-0 z-50 flex items-center justify-center">
      <div className="flex flex-col gap-2 items-center">
        <BallIcon className="animate-spin w-14 aspect-square fill-secondary" />
        {text && <p className="text-white text-center">{text}</p>}
      </div>
    </div>
  )
}

export default FullscreenLoader