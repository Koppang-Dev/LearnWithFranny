import DeckList from "./__components/decklist";
import Header from "./__components/header";
import RecentlyUsed from "./__components/recentlyUsed";

const FlashCard = () => {
  const decks = [];
  return (
    <div className="flex flex-col gap-10 pl-10 pt-20">
      <Header />
      <DeckList decks={decks} />
    </div>
  );
};

export default FlashCard;
