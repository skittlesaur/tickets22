import { SeatPosition, TicketType } from '@components/purchase/index'

const SeatForm = ({ seatPosition, setSeatPosition, ticketType, setTicketType, quantity, setQuantity }: any) => {
  return (
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
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm disabled:opacity-50"
          value={ticketType}
          onChange={(e) => setTicketType(e.target.value)}
          disabled={seatPosition === SeatPosition.NOT_SELECTED}
        >
          {Object.values(TicketType).map((type) => (
            <option
              key={type}
              value={type}
            >
              Category {type}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-600">
          Quantity
        </label>
        <input
          id="quantity"
          name="quantity"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm disabled:opacity-50"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value || '0', 10))}
          disabled={seatPosition === SeatPosition.NOT_SELECTED}
          type="number"
          min="1"
        />
      </div>
    </form>
  )
}

export default SeatForm