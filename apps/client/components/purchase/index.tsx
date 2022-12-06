import ThreeD from '@components/purchase/three-d'
import { useState } from 'react'
import useMatchQuery from '@services/shop/match-query'
import getDynamicQuery from '@lib/get-dynamic-query'
import FullscreenLoader from '@components/fullscreen-loader'
import getTeamIcon from '@lib/get-team-icon'
import Stadium from '@components/purchase/stadium'

export enum SeatPosition {
  NORTH,
  SOUTH,
  EAST,
  WEST,
  NOT_SELECTED,
}

enum TicketType {
  CATEGORY_1 = 'Category 1',
  CATEGORY_2 = 'Category 2',
  CATEGORY_3 = 'Category 3',
  CATEGORY_4 = 'Category 4',
}

const Purchase = () => {
  const id = getDynamicQuery('id')
  const { data: match, isLoading } = useMatchQuery(id)
  const [seatPosition, setSeatPosition] = useState<SeatPosition>(SeatPosition.NOT_SELECTED)
  const [ticketType, setTicketType] = useState<TicketType>(TicketType.CATEGORY_1)

  if (isLoading || !match) return <FullscreenLoader text="Loading Ticket" />

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
              onChange={(e) => setSeatPosition(Number(e.target.value))}
            >
              <option value={SeatPosition.NOT_SELECTED}>Select Seat Position</option>
              <option value={SeatPosition.NORTH}>North</option>
              <option value={SeatPosition.SOUTH}>South</option>
              <option value={SeatPosition.EAST}>East</option>
              <option value={SeatPosition.WEST}>West</option>
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
              <option value={TicketType.CATEGORY_1}>{TicketType.CATEGORY_1}</option>
              <option value={TicketType.CATEGORY_2}>{TicketType.CATEGORY_2}</option>
              <option value={TicketType.CATEGORY_3}>{TicketType.CATEGORY_3}</option>
              <option value={TicketType.CATEGORY_4}>{TicketType.CATEGORY_4}</option>
            </select>
          </div>
        </form>
      </div>
      <div className="relative w-full h-full bg-gray-200/10 flex flex-col">
        <div className="border-b border-gray-200 bg-gray-100 grid grid-cols-[2fr_0.5fr_2fr] items-center py-4">
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
        <Stadium />
      </div>
    </div>
  )
}

export default Purchase