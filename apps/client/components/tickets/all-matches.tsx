import { useEffect, useState } from 'react'
import TypeSelector from '@components/tickets/type-selector'
import getTeamIcon from '@lib/get-team-icon'
import Link from 'next/link'
import MatchesQuery from '@services/shop/matches-query'
import Loader from '@components/loader'

export enum MatchType {
  GROUP_STAGE = 'Group Stage',
  ROUND_OF_16 = 'Round of 16',
  QUARTER_FINALS = 'Quarter-Finals',
  SEMI_FINALS = 'Semi-Finals',
  THIRD_PLACE_AND_FINAL = '3rd Place & Final',
}

const AllMatches = () => {
  const [matchType, setMatchType] = useState(MatchType.GROUP_STAGE)
  const { data: matches, isLoading: matchesLoading } = MatchesQuery()

  const [displayedMatches, setDisplayedMatches] = useState<any>([])

  useEffect(() => {
    if (!matches) return

    const groupedMatches: any = {}
    let toDisplay = matches

    if (matchType === MatchType.GROUP_STAGE)
      toDisplay = matches.filter((match: any) => [1, 2, 3].includes(match.roundNumber))
    else if (matchType === MatchType.ROUND_OF_16)
      toDisplay = matches.filter((match: any) => match.roundNumber === 4)
    else if (matchType === MatchType.QUARTER_FINALS)
      toDisplay = matches.filter((match: any) => match.roundNumber === 5)
    else if (matchType === MatchType.SEMI_FINALS)
      toDisplay = matches.filter((match: any) => match.roundNumber === 6)
    else if (matchType === MatchType.THIRD_PLACE_AND_FINAL)
      toDisplay = matches.filter((match: any) => match.roundNumber === 7)


    toDisplay?.forEach((match: any) => {
      const date = new Date(match.date).toLocaleDateString('en-GB', {
        month: 'long',
        day: 'numeric',
      })

      if (!groupedMatches[date])
        groupedMatches[date] = []

      groupedMatches[date].push(match)
    })

    // sort array by date
    const sortedMatches = Object.keys(groupedMatches).sort((a, b) => {
      const dateA = new Date(a)
      const dateB = new Date(b)

      return dateA.getTime() - dateB.getTime()
    })

    const sortedArray = sortedMatches.map((date) => {
      return {
        date,
        matches: groupedMatches[date],
      }
    })

    setDisplayedMatches(sortedArray)
  }, [matches, matchType])

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-black text-4xl">
        All Matches
      </h1>
      <TypeSelector matchType={matchType} setMatchType={setMatchType} />
      {matchesLoading ? (
        <Loader color="bg-primary" />
      ) : (
        <div className="flex flex-col gap-10">
          {displayedMatches.map((group: any) => (
            <div key={group.date} className="flex flex-col gap-4 overflow-hidden">
              <h2 className="text-primary font-semibold text-xl">
                {group.date}
              </h2>
              <div className="px-6 py-4 bg-gray-50 rounded-lg flex flex-col gap-4">
                {group.matches.map((match: any) => (
                  <Link
                    href={`/tickets/${match.id}`}
                    key={match.id}
                    className="group"
                  >
                    <div
                      key={match.id}
                      className="relative grid matches-grid gap-12 items-center border border-secondary bg-white px-4 py-2 rounded-lg group-hover:shadow-lg transition-all duration-200 ease-in-out"
                    >
                      <div className="flex items-center justify-end gap-6">
                        <div className="hidden md:block">
                          {match.homeTeam.name}
                        </div>
                        <div className="w-10 aspect-square">
                          {getTeamIcon(match.homeTeam.name)}
                        </div>
                      </div>
                      <div className="w-full h-full bg-secondary rounded-2xl flex items-center justify-center gap-2 font-semibold">
                        {match.homeScore !== null && match.awayScore !== null ? (
                          <>
                            <span>{match.homeScore}</span>
                            <span>:</span>
                            <span>{match.awayScore}</span>
                          </>
                        ) : (
                          <span>{new Date(match.date).toLocaleTimeString([], {
                            hour: 'numeric',
                            minute: '2-digit',
                          })}</span>
                        )}
                      </div>
                      <div className="flex items-center justify-start gap-6">
                        <div className="w-10 aspect-square">
                          {getTeamIcon(match.awayTeam.name)}
                        </div>
                        <div className="hidden md:block">
                          {match.awayTeam.name}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <style jsx>{`
        .matches-grid {
          gap: 2rem !important;
          grid-template-columns: 1fr 2fr 1fr;
        }

        @media screen and (min-width: 768px) {
          .matches-grid {
            grid-template-columns: 4fr 1fr 4fr;
          }
        }
      `}</style>
    </div>
  )
}

export default AllMatches