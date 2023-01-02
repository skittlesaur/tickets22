import getTeamIcon from '@lib/get-team-icon'
import Players from '@components/teams/specific/players'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Matches from '@components/teams/specific/matches'

enum TeamTabs {
  Players = 'Players',
  Matches = 'Matches',
}

const Team = ({ team }: any) => {
  const [activeTab, setActiveTab] = useState(TeamTabs.Players)

  return (
    <div className="flex flex-col gap-8 mb-16">
      <div className="flex flex-col">
        <div className="relative w-full bg-gray-200 dark:bg-gray-800 py-8">
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: team.primaryColor,
            }}
          />
          <div className="relative z-[1] flex items-center gap-4 max-w-screen-xl mx-auto w-full px-2 lg:px-0">
            <div className="w-24 aspect-square drop-shadow-lg">
              {getTeamIcon(team.name)}
            </div>
            <h1
              className="font-black text-4xl"
              style={{
                color: team.secondaryColor,
              }}
            >
              {team.name}
            </h1>
          </div>
        </div>
        <div className="py-2 border-b border-gray-300 dark:border-gray-700 px-2 lg:px-0">
          <div className="max-w-screen-xl mx-auto w-full flex items-center gap-6">
            {Object.values(TeamTabs).map((tab) => (
              <button
                key={tab}
                className={`uppercase font-medium py-1 ${activeTab === tab ? 'text-primary dark:text-secondary' : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'} transition-colors duration-200 ease-in-out`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto w-full px-2 lg:px-0">
        <AnimatePresence mode="wait">
          {activeTab === TeamTabs.Players && <Players key={activeTab} id={team.id} />}
          {activeTab === TeamTabs.Matches && <Matches key={activeTab} id={team.id} />}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Team