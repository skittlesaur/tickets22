import TicketPattern from '@images/ticket-pattern.svg'
import Logo from '@images/logo.svg'
import WCLogo from '@images/world-cup-logo.svg'
import { QRCodeSVG } from 'qrcode.react'
import { CLIENT_URL } from '@services/constants'
import getDynamicQuery from '@lib/get-dynamic-query'
import { useQuery } from 'react-query'
import RESERVATIONS_SERVICE from '@services/reservations'
import FullscreenLoader from '@components/fullscreen-loader'
import { useRouter } from 'next/router'
import { AxiosError } from 'axios'
import getType, { getTypeAr } from '@lib/get-type'
import getArabicTeamName from '@lib/get-arabic-team-name'
import getStadiumNameArabic from '@lib/get-stadium-name-arabic'
import Seo from '@components/seo'

const Ticket = () => {
  const router = useRouter()
  const ticketId = getDynamicQuery('id')
  const { data: ticket, isLoading, isError, error } = useQuery<any, AxiosError>({
    queryKey: ['ticket', ticketId],
    queryFn: () => RESERVATIONS_SERVICE.get(`/tickets/${ticketId}`).then(res => res.data),
    enabled: !!ticketId,
    staleTime: Infinity,
    retry: false,
  })

  if (isError) {
    const { data: errorData } = error.response || {} as any
    if (errorData.redirect)
      router.push(errorData.redirect)
    return <></>
  }

  if (isLoading || !ticket)
    return (
      <>
        <Seo title="Loading Ticket" />
        <FullscreenLoader />
      </>
    )

  if (ticket.status !== 'PURCHASED') {
    router.push('/tickets')
    return <></>
  }

  return (
    <div className={'text-black h-[49em] p-16 flex items-center justify-center mx-auto w-[96em] max-w-[96em]'}>
      <Seo title={`Ticket #${ticket.id}`} />
      <div className="relative flex items-center w-full h-full gap-4 overflow-hidden border shadow-xl bg-secondary border-primary rounded-3xl">
        <img
          src="/images/pattern.jpg"
          alt="pattern"
          className="absolute inset-0 object-cover w-full h-full pointer-events-none saturate-0 mix-blend-difference opacity-10"
        />
        <div className="w-[60%] h-full p-10 flex flex-col justify-between">
          <div className="flex justify-between w-full">
            <div className="w-24 aspect-square">
              <WCLogo />
            </div>
            <div className="flex flex-col items-center py-1">
              <h1 className="text-sm font-semibold uppercase">
                Date
              </h1>
              <h2 className="text-gray-500 font-arabic">
                تاريخ
              </h2>
              <p className="mt-4 text-3xl font-qatar">
                {new Date(ticket.match.date).getDate()}
              </p>
            </div>
            <div className="w-[1px] h-full bg-gray-500" />
            <div className="flex flex-col items-center py-1">
              <h1 className="text-sm font-semibold uppercase">
                Kick Off Time
              </h1>
              <h2 className="text-gray-500 font-arabic">
                وقت البدء
              </h2>
              <p className="mt-4 text-3xl font-qatar">
                {new Date(ticket.match.date).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}
              </p>
            </div>
            <div className="w-[1px] h-full bg-gray-500" />
            <div className="flex flex-col items-center py-1">
              <h1 className="text-sm font-semibold uppercase">
                Match Type
              </h1>
              <h2 className="text-gray-500 font-arabic">
                نوع المباراة
              </h2>
              <p className="mt-4 text-3xl font-qatar">
                {getType(ticket.match.roundNumber, ticket.match.gameNumber, ticket.match.group)}
              </p>
              <p className="text-gray-500 font-arabic" style={{ direction: 'rtl' }}>
                {getTypeAr(ticket.match.roundNumber, ticket.match.gameNumber, ticket.match.group)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-24">
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center">
                <p className="font-semibold uppercase">Match</p>
                <p className="font-arabic">مباراة</p>
              </div>
              <div className="p-1 bg-primary pentagon aspect-square">
                <div className="bg-secondary p-0.5 pentagon aspect-square">
                  <div className="relative p-10 bg-primary text-secondary pentagon aspect-square">
                    <p className="absolute left-1/2 -translate-x-1/2 top-1/2 translate-y-[calc(-50%+6px)] font-qatar text-3xl">
                      {ticket.match.matchNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-5xl font-qatar">
                {ticket.match.homeTeam.name}
                <span className="mx-3 text-2xl text-gray-700">v.</span>
                {ticket.match.awayTeam.name}
              </h1>
              <h2 className="text-4xl font-medium text-gray-600 font-arabic">
                {getArabicTeamName(ticket.match.homeTeam.name)}
                <span className="mx-3 text-xl text-gray-500">ضد</span>
                {getArabicTeamName(ticket.match.awayTeam.name)}
              </h2>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex justify-between w-full">
              <p>
                {ticket.match.stadium.name}
              </p>
              <p className="font-medium text-gray-500 font-arabic">
                {getStadiumNameArabic(ticket.match.stadium.name)}
              </p>
            </div>
            <div className="flex justify-between w-full">
              <p>
                Capacity
              </p>
              <p className="font-medium">
                {ticket.match.stadium.capacity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </p>
              <p className="font-medium text-gray-500 font-arabic">
                السعة
              </p>
            </div>
          </div>
          <div className="relative flex justify-between w-full">
            <div className="absolute top-12 w-full h-[1px] bg-gray-700" />
            <div>
              <p className="text-sm font-semibold uppercase">
                Gate
              </p>
              <p className="text-sm font-medium text-gray-600 font-arabic">
                بوابة
              </p>
              <p className="mt-5 text-xl font-qatar">
                {ticket.seatPosition}
              </p>
            </div>
            <div>
              <p className="font-semibold uppercase">Seat</p>
              <p className="font-arabic">مقعد</p>
              <p className="mt-5 text-3xl font-qatar">
                {ticket.seatNumber}
              </p>
            </div>
            <div>
              <p className="font-semibold uppercase">Row</p>
              <p className="font-arabic">صف</p>
              <p className="mt-5 text-3xl font-qatar">
                {ticket.seatRow}
              </p>
            </div>
            <div>
              <p className="font-semibold uppercase">Category</p>
              <p className="font-arabic">
                فئة
              </p>
              <p className="mt-5 text-3xl font-qatar">
                {ticket.category}
              </p>
            </div>
            <div>
              <p className="font-semibold uppercase">
                Price
              </p>
              <p className="font-arabic">
                السعر
              </p>
              <p className="mt-5 text-3xl font-qatar">
                ${ticket.price}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 bottom-0 right-0 h-full w-[40%] pl-52 py-16 flex flex-col items-center justify-between">
          <TicketPattern className="absolute inset-0 left-5 drop-shadow-lg" />
          <div className="relative z-[1] text-secondary flex items-center gap-2">
            <Logo className="w-8 [&>*]:fill-current" />
            <h1 className="text-2xl italic font-bold">Tickets22</h1>
          </div>
          <div className="relative z-[1]">
            <QRCodeSVG
              value={`${CLIENT_URL}/tickets/${ticketId}`}
              bgColor="transparent"
              fgColor="#EEEEE4"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .pentagon {
          clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
        }
      `}</style>
    </div>
  )
}

export default Ticket