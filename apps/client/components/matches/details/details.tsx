import { useState } from 'react'
import Timeline from '@components/matches/details/timeline'
import getTeamIcon from '@lib/get-team-icon'
import Link from 'next/link'

enum Tabs {
  TIMELINE = 'Timeline',
}

interface DetailsProps {
  match: any
}

const Details = ({ match }: DetailsProps) => {
  const [activeTab, setActiveTab] = useState(Tabs.TIMELINE)

  if (!match.ended) return null

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-6">
        {Object.values(Tabs).map((tab) => (
          <button
            key={tab}
            className={`text-sm uppercase ${tab === activeTab ? 'text-primary dark:text-secondary' : 'text-gray-600 dark:text-gray-400'} font-medium transition-all duration-200 ease-in-out`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="w-full bg-secondary dark:bg-gray-900">
        {activeTab === Tabs.TIMELINE && <Timeline match={match} />}
      </div>
    </div>
  )
}

export default Details