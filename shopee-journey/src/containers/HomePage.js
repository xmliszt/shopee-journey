import Header from "../components/Header";
import Quests from "../components/Quests";
// import Scoredisplay from "../components/Scoredisplay";

export default function HomePage() {
  return (
    <div className="Home">
      <Header />
      {/* <Scoredisplay /> */}
      <Quests />
    </div>
  );
}
