import { useEffect, useMemo, useState } from 'react'
import getDynamicQuery from '@lib/get-dynamic-query'
import FullscreenLoader from '@components/fullscreen-loader'
import getTeamIcon from '@lib/get-team-icon'
import Stadium from '@components/purchase/stadium'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from 'react-query'
import RESERVATIONS_SERVICE from '@services/reservations'
import { AnimatePresence, motion } from 'framer-motion'
import SeatForm from '@components/purchase/seat-form'
import InfoForm from '@components/purchase/info-form'
import useUser from '@hooks/use-user'
import toast from 'react-hot-toast'
import ChevronBackIcon from '@images/chevron-back.svg'

export enum SeatPosition {
  NOT_SELECTED = 'Select a seat',
  NORTH = 'North',
  SOUTH = 'South',
  EAST = 'East',
  WEST = 'West',
}

export enum TicketType {
  CATEGORY_1 = '1',
  CATEGORY_2 = '2',
  CATEGORY_3 = '3',
}

interface PurchaseProps {
  match: any
}

const Purchase = ({ match }: PurchaseProps) => {
  const { data: user } = useUser()
  const router = useRouter()
  const id = getDynamicQuery('id')
  const [seatPosition, setSeatPosition] = useState<SeatPosition>(
    SeatPosition.NOT_SELECTED,
  )
  const [ticketType, setTicketType] = useState<TicketType>(
    TicketType.CATEGORY_1,
  )
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState(user?.email || '')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (user) {
      setEmail(user.email)
    }
  }, [user])

  const {
    data: ticketsData,
    isLoading: ticketsLoading,
    isError: ticketsError,
  } = useQuery({
    queryKey: ['availableTickets', id],
    queryFn: () =>
      RESERVATIONS_SERVICE.get(`/tickets/match/${id}/available`).then(
        (res) => res.data,
      ),
  })

  const reserveMutation = useMutation({
    mutationKey: 'reserve',
    mutationFn: ({
                   email,
                   matchNumber,
                   seatPosition,
                   ticketType,
                   quantity,
                 }: {
      email: string
      matchNumber: number
      ticketType: TicketType
      seatPosition: SeatPosition
      quantity: number
    }) =>
      RESERVATIONS_SERVICE.post('/tickets/reserve', {
        email,
        matchNumber,
        seatPosition,
        ticketType,
        quantity,
      }),
    retry: 0,
    onSuccess: async (res) => {
      await router.push(`${res.data.url}`)
    },
    onError: (error: any) => {
      toast.error(`${error}`)
    },
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

    return ticketsData.every(
      (ticket: any) => ticket.available === 0 && ticket.pending === 0,
    )
  }, [ticketsData])

  if (ticketsLoading) return <FullscreenLoader text="Loading Ticket" />

  if (ticketsError) {
    router.push('/matches?error=Falied to load match ticket')
    return <></>
  }

  const handlePurchase = () => {
    // validate seat position
    if (seatPosition === SeatPosition.NOT_SELECTED)
      return toast.error('Please select a seat position')

    // validate ticket type
    if (!categoryData[ticketType].available)
      return toast.error('Please select a ticket type')

    if (quantity < 1) return toast.error('Quantity must be greater than 0')

    if(quantity > 2) return toast.error('Quantity cannot be greater than 2')

    if (quantity > categoryData[ticketType].available) return toast.error('Not enough tickets available')

    if (step === 1) return setStep(2)

    // validate email
    if (!email) return toast.error('Please enter your email')

    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!emailRegex.test(email)) return toast.error('Please enter a valid email')

    reserveMutation.mutate({
      email,
      matchNumber: match.matchNumber,
      seatPosition,
      ticketType,
      quantity,
    })
  }

  return (
    <div className="w-screen h-screen flex bg-gray-100 text-black">
      <div className="w-1/3 border-r border-gray-200 py-20 px-10 flex flex-col justify-between">
        <div className="flex flex-col gap-10">
          <div>
            <h1 className="font-semibold text-3xl tracking-tight">
              Purchase Ticket
            </h1>
            <div className="flex items-center gap-2">
              {step > 1 && (
                <button
                  onClick={() => setStep(prev => prev - 1)}
                  className="w-5 aspect-square opacity-50 hover:opacity-100 transition-all duration-200 ease-in-out"
                >
                  <ChevronBackIcon />
                </button>
              )}
              <p className="font-semibold text-gray-600 transition-all duration-200 ease-in-out">
                {step === 1 && 'Seat Details'}
                {step === 2 && 'Personal Details'}
              </p>
            </div>
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
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
              )}
              {step === 2 && <InfoForm email={email} setEmail={setEmail} />}
            </motion.div>
          </AnimatePresence>
        </div>
        <AnimatePresence mode="wait">
          {!allSoldOut && seatPosition !== SeatPosition.NOT_SELECTED && quantity > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-2"
            >
              <div className="flex items-end justify-between gap-2">
                <p
                  className={`${
                    categoryData[ticketType].available === 0 &&
                    categoryData[ticketType].pending === 0
                      ? 'opacity-50'
                      : 'opacity-100'
                  } transition-all duration-200 ease-in-out`}
                >
                  <span>$</span>
                  <span className="font-semibold text-3xl">
										{categoryData[ticketType].price * quantity}
									</span>
                  <span className="text-gray-500">
                    {quantity > 1 ? ` ($${categoryData[ticketType].price} x ${quantity})` : ' /ticket'}
                  </span>
                </p>
                {categoryData[ticketType].available === 0 &&
                  categoryData[ticketType].pending === 0 && (
                    <p className="text-primary font-semibold">Sold Out</p>
                  )}
              </div>
              <button
                disabled={
                  categoryData[ticketType].available === 0 &&
                  categoryData[ticketType].pending === 0
                }
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
          <div className="justify-self-center">v</div>
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
