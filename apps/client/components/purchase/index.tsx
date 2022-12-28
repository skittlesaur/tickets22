import { useState } from 'react'
import useMatchQuery from '@services/shop/match-query'
import getDynamicQuery from '@lib/get-dynamic-query'
import FullscreenLoader from '@components/fullscreen-loader'
import getTeamIcon from '@lib/get-team-icon'
import Stadium from '@components/purchase/stadium'
import { useRouter } from 'next/router'

export enum SeatPosition {
  NOT_SELECTED = 'Select a seat',
  NORTH = 'North',
  SOUTH = 'South',
  EAST = 'East',
  WEST = 'West',
}

enum TicketType {
  CATEGORY_1 = 'Category 1',
  CATEGORY_2 = 'Category 2',
  CATEGORY_3 = 'Category 3',
}

const Purchase = () => {
  const router = useRouter()
  const id = getDynamicQuery('id')
  const { data: match, isLoading, isError } = useMatchQuery(id)
  const [seatPosition, setSeatPosition] = useState<SeatPosition>(SeatPosition.NOT_SELECTED)
  const [ticketType, setTicketType] = useState<TicketType>(TicketType.CATEGORY_1)

  if (isLoading)
    return <FullscreenLoader text="Loading Ticket" />

  if (isError) {
    router.push('/matches?error=Falied to load match ticket')
    return <></>
  }

  return (
    <div className="w-screen h-screen flex bg-gray-100">
      <div className="w-1/3 border-r border-gray-200 py-20 px-10 flex flex-col gap-10">
        <div>
          <h1 className="font-semibold text-3xl tracking-tight">
            Purchase Ticket
          </h1>
          <p className="font-semibold text-gray-600">
            Seat Details
          </p>
        </div>
        <form className="flex flex-col gap-4">
          <div>
            <label htmlFor="seatPosition" className="block text-sm font-medium text-gray-600">
              Seat Position
            </label>
            <select
              id="seatPosition"
              name="seatPosition"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              value={seatPosition}
              onChange={(e) => setSeatPosition(e.target.value as SeatPosition)}
            >
              {Object.values(SeatPosition).map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-600">
              Ticket Type
            </label>
            <select
              id="type"
              name="type"
              onChange={(e) => setTicketType(e.target.value as TicketType)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            >
              {Object.values(TicketType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
      <div className="relative w-full h-full bg-gray-200/10 flex flex-col">
        <div className="absolute top-0 z-50 w-full border-b border-gray-200 bg-gray-200/40 backdrop-blur grid grid-cols-[2fr_0.5fr_2fr] items-center py-4">
          <div className="flex gap-4 items-center justify-self-end">
            <h1 className="font-semibold text-2xl tracking-tight">
              {match.homeTeam.name}
            </h1>
            <div className="w-20 aspect-square">
              {getTeamIcon(match.homeTeam.name)}
            </div>
          </div>
          <div className="justify-self-center">
            v
          </div>
          <div className="flex gap-4 items-center justify-self-start">
            <div className="w-20 aspect-square">
              {getTeamIcon(match.awayTeam.name)}
            </div>
            <h1 className="font-semibold text-2xl tracking-tight">
              {match.awayTeam.name}
            </h1>
          </div>
        </div>
        <Stadium seatPosition={seatPosition} />
      </div>
    </div>
  )
}

export default Purchase