import getTeamIcon from "@lib/get-team-icon";
import Link from "next/link";

const Match = ({ match }: any) => {
  return (
    <Link href={`/matches/${match.id}`} key={match.id} className="group">
      <div
        key={match.id}
        className="relative grid matches-grid gap-12 items-center border border-secondary bg-white px-4 py-2 rounded-lg group-hover:shadow-lg transition-all duration-200 ease-in-out dark:bg-gray-980 dark:border-gray-800 dark:hover:border-gray-600"
      >
        <div className="flex items-center justify-end gap-6">
          <div className="hidden md:block">{match.homeTeam.name}</div>
          <div className="w-10 aspect-square">
            {getTeamIcon(match.homeTeam.name)}
          </div>
        </div>
        <div className="w-full h-full bg-secondary rounded-2xl flex items-center justify-center gap-2 font-semibold dark:bg-gray-800 dark:text-secondary">
          {match.ended ? (
            <>
              <span>{match.homeScore}</span>
              <span>:</span>
              <span>{match.awayScore}</span>
            </>
          ) : (
            <span>
              {new Date(match.date).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })}
            </span>
          )}
        </div>
        <div className="flex items-center justify-start gap-6">
          <div className="w-10 aspect-square">
            {getTeamIcon(match.awayTeam.name)}
          </div>
          <div className="hidden md:block">{match.awayTeam.name}</div>
        </div>
      </div>
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
    </Link>
  );
};

export default Match;
