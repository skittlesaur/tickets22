import { useEffect, useState } from 'react'
import TypeSelector from '@components/matches/main/type-selector'
import MatchesQuery from '@services/shop/matches-query'
import Loader from '@components/loader'
import Match from '@components/matches/main/match'

export enum MatchType {
  GROUP_STAGE = 'Group Stage',
  ROUND_OF_16 = 'Round of 16',
  QUARTER_FINALS = 'Quarter-Finals',
  SEMI_FINALS = 'Semi-Finals',
  THIRD_PLACE_AND_FINAL = '3rd Place & Final',
}

interface MatchesProps {
  matches: any;
}

const AllMatches = ({ matches }: MatchesProps) => {
  const [matchType, setMatchType] = useState(MatchType.GROUP_STAGE)

  const [displayedMatches, setDisplayedMatches] = useState<any[]>([])

  useEffect(() => {
    if (!matches) return

    const groupedMatches: any = {}
    let toDisplay = matches

    if (matchType === MatchType.GROUP_STAGE)
      toDisplay = matches?.filter((match: any) =>
        [1, 2, 3].includes(match.roundNumber),
      )
    else if (matchType === MatchType.ROUND_OF_16)
      toDisplay = matches?.filter((match: any) => match.roundNumber === 4)
    else if (matchType === MatchType.QUARTER_FINALS)
      toDisplay = matches?.filter((match: any) => match.roundNumber === 5)
    else if (matchType === MatchType.SEMI_FINALS)
      toDisplay = matches?.filter((match: any) => match.roundNumber === 6)
    else if (matchType === MatchType.THIRD_PLACE_AND_FINAL)
      toDisplay = matches?.filter((match: any) => match.roundNumber === 7)

    toDisplay?.forEach((match: any) => {
      const date = new Date(match.date).toLocaleDateString('en-GB', {
        month: 'long',
        day: 'numeric',
      })

      if (!groupedMatches[date]) groupedMatches[date] = []

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
      <h1 className="font-black text-4xl">All Matches</h1>
      <TypeSelector matchType={matchType} setMatchType={setMatchType} />
      {!matches ? (
        <Loader color="bg-primary" />
      ) : (
        <div className="flex flex-col gap-10">
          {displayedMatches.map((group: any) => (
            <div
              key={group.date}
              className="flex flex-col gap-4 overflow-hidden"
            >
              <h2 className="text-primary font-semibold text-xl">
                {group.date}
              </h2>
              <div className="py-4 bg-gray-50 rounded-lg flex flex-col gap-4 dark:bg-gray-980 transition-all duration-200 ease-in-out">
                {group.matches.map((match: any) => (
                  <Match key={match.matchNumber} match={match} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AllMatches
