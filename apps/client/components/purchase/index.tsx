import { useEffect, useMemo, useState } from 'react'
import useMatchQuery from '@services/shop/match-query'
import getDynamicQuery from '@lib/get-dynamic-query'
import FullscreenLoader from '@components/fullscreen-loader'
import getTeamIcon from '@lib/get-team-icon'
import Stadium from '@components/purchase/stadium'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import RESERVATIONS_SERVICE from '@services/reservations'
import { AnimatePresence, motion } from 'framer-motion'
import SeatForm from '@components/purchase/seat-form'
import InfoForm from '@components/purchase/info-form'
import useUser from '@hooks/use-user'

export enum SeatPosition {
  NOT_SELECTED = 'Select a seat',
  NORTH = 'North',
  SOUTH = 'South',
  EAST = 'East',
  WEST = 'West',
}

export enum TicketType {
  CATEGORY_1 = 'Category 1',
  CATEGORY_2 = 'Category 2',
  CATEGORY_3 = 'Category 3',
}

const Purchase = () => {
  const { data: user } = useUser()
  const router = useRouter()
  const id = getDynamicQuery('id')
  const { data: match, isLoading, isError } = useMatchQuery(id)
  const [seatPosition, setSeatPosition] = useState<SeatPosition>(SeatPosition.NOT_SELECTED)
  const [ticketType, setTicketType] = useState<TicketType>(TicketType.CATEGORY_1)
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState(user?.email || '')

  const { data: ticketsData, isLoading: ticketsLoading, isError: ticketsError } = useQuery({
    queryKey: ['availableTickets', id],
    queryFn: () => RESERVATIONS_SERVICE.get(`/tickets/match/${id}/available`).then((res) => res.data),
  })

  const categoryData = useMemo(() => {
    if (!ticketsData) return {}

    const category1 = ticketsData.find((ticket: any) => ticket.category === 1)
    const category2 = ticketsData.find((ticket: any) => ticket.category === 2)
    const category3 = ticketsData.find((ticket: any) => ticket.category === 3)

    return {
      [TicketType.CATEGORY_1]: category1,
      [TicketType.CATEGORY_2]: category2,
      [TicketType.CATEGORY_3]: category3,
    }
  }, [ticketsData])

  const allSoldOut = useMemo(() => {
    if (!ticketsData) return false

    return ticketsData.every((ticket: any) => ticket.available === 0 && ticket.pending === 0)
  }, [ticketsData])

  if (isLoading || ticketsLoading)
    return <FullscreenLoader text="Loading Ticket" />

  if (isError || ticketsError) {
    router.push('/matches?error=Falied to load match ticket')
    return <></>
  }

  const handlePurchase = () => {
    if (step === 1) return setStep(2)


  }

  return (
    <div className="w-screen h-screen flex bg-gray-100">
      <div className="w-1/3 border-r border-gray-200 py-20 px-10 flex flex-col justify-between">
        <div className="flex flex-col gap-10">
          <div>
            <h1 className="font-semibold text-3xl tracking-tight">
              Purchase Ticket
            </h1>
            <p className="font-semibold text-gray-600">
              {step === 1 && 'Seat Details'}
              {step === 2 && 'Personal Details'}
            </p>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {step === 1 && (
                <SeatForm
                  ticketType={ticketType}
                  setTicketType={setTicketType}
                  seatPosition={seatPosition}
                  setSeatPosition={setSeatPosition}
                />
              )}
              {step === 2 && (
                <InfoForm
                  email={email}
                  setEmail={setEmail}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <AnimatePresence mode="wait">
          {!allSoldOut && seatPosition !== SeatPosition.NOT_SELECTED && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-2"
            >
              <div className="flex items-end justify-between gap-2">
                <p className={`${categoryData[ticketType].available === 0 && categoryData[ticketType].pending === 0 ? 'opacity-50' : 'opacity-100'} transition-all duration-200 ease-in-out`}>
                <span>
                $
                </span>
                  <span className="font-semibold text-3xl">
              {categoryData[ticketType].price}
                </span>
                  <span className="text-gray-500">
              {' '}/ticket
                </span>
                </p>
                {categoryData[ticketType].available === 0 && categoryData[ticketType].pending === 0 && (
                  <p className="text-primary font-semibold">
                    Sold Out
                  </p>
                )}
              </div>
              <button
                disabled={categoryData[ticketType].available === 0 && categoryData[ticketType].pending === 0}
                type="button"
                className="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-white hover:border-primary hover:text-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary disabled:hover:text-white"
                onClick={handlePurchase}
              >
                {step === 1 ? 'Continue' : 'Purchase'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        {allSoldOut && (
          <div className="flex flex-col gap-2">
            <p className="text-center text-gray-500">
              All tickets are sold out
            </p>
          </div>
        )}
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