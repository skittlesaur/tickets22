const PlayerCard = ({ player }: any) => {
  return (
    <div className="flex flex-col border border-primary dark:border-secondary-700 rounded-3xl flex flex-col items-center overflow-hidden">
      <div className="w-64 aspect-square">
        <img
          src={player.imageUri}
          alt={`${player.firstName} ${player.lastName}`}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col items-center px-2 py-4 bg-secondary dark:bg-gray-900 w-full border-t border-primary dark:border-secondary-700 drop-shadow-xl">
        <h3 className="font-bold text-lg">
          {player.firstName} {player.lastName}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {player.position}
        </p>
      </div>
    </div>
  )
}

export default PlayerCard