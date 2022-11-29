import { useState } from 'react'
import TypeSelector from '@components/tickets/type-selector'
import list from '@components/tickets/test-list'
import getTeamIcon from '@lib/get-team-icon'

export enum MatchType {
  GROUP_STAGE = 'Group Stage',
  ROUND_OF_16 = 'Round of 16',
  QUARTER_FINALS = 'Quarter-Finals',
  SEMI_FINALS = 'Semi-Finals',
  THIRD_PLACE_AND_FINAL = '3rd Place & Final',
}

const AllMatches = () => {
  const [matchType, setMatchType] = useState(MatchType.GROUP_STAGE)
  const matches: any = list

  const groupedMatches: any = {}

  matches.forEach((match: any) => {
    const date = new Date(match.DateUtc).toLocaleDateString('en-GB', {
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

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-black text-4xl">
        All Matches
      </h1>
      <TypeSelector matchType={matchType} setMatchType={setMatchType} />
      <div className="flex flex-col gap-10">
        {sortedArray.map((group) => (
          <div key={group.date} className="flex flex-col gap-4">
            <h2 className="text-primary font-semibold text-xl">
              {group.date}
            </h2>
            <div className="px-6 py-4 bg-gray-50 rounded-lg flex flex-col gap-4">
              {group.matches.map((match: any) => (
                <div
                  key={match.MatchNumber}
                  className="grid matches-grid gap-12 items-center border border-secondary bg-white px-4 py-2 rounded-lg"
                >
                  <div className="flex items-center justify-end gap-6">
                    <div>
                      {match.HomeTeam}
                    </div>
                    <div className="w-10 aspect-square">
                      {getTeamIcon(match.HomeTeam)}
                    </div>
                  </div>
                  <div className="w-full h-full bg-secondary rounded-2xl flex items-center justify-center gap-2 font-semibold">
                    {match.HomeTeamScore !== null && match.AwayTeamScore !== null ? (
                      <>
                        <span>{match.HomeTeamScore}</span>
                        <span>:</span>
                        <span>{match.AwayTeamScore}</span>
                      </>
                    ) : (
                      <span>{new Date(match.DateUtc).toLocaleTimeString([], {
                        hour: 'numeric',
                        minute: '2-digit',
                      })}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-start gap-6">
                    <div className="w-10 aspect-square">
                      {getTeamIcon(match.AwayTeam)}
                    </div>
                    <div>
                      {match.AwayTeam}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .matches-grid {
          grid-template-columns: 4fr 1fr 4fr;
        }
      `}</style>
    </div>
  )
}

export default AllMatches