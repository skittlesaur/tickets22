import { MatchType } from "@components/matches/main/all-matches";

interface TypeSelectorProps {
  matchType: MatchType;
  setMatchType: (matchType: MatchType) => void;
}

const TypeSelector = ({ matchType, setMatchType }: TypeSelectorProps) => {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      {Object.values(MatchType).map((type) => (
        <button
          key={type}
          className={`px-6 py-4 rounded font-semibold text-sm ${
            matchType === type
              ? "bg-primary text-secondary"
              : "text-black hover:border-primary hover:text-primary"
          } border border-transparent transition-all duration-200 ease-in-out dark:text-secondary`}
          onClick={() => setMatchType(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default TypeSelector;
