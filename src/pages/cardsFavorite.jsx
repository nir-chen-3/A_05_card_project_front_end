import PageHeader from "../components/common/pageHeader";
import MyCards from "./myCards";

function CardsFavorite() {
  const title = "Favorite Cards";
  const description = "Your saved and liked business cards";
  return (
    <div className="container">
      <PageHeader title={title} description={description}></PageHeader>
      <MyCards home={false} favorite={true}></MyCards>
    </div>
  );
}
export default CardsFavorite;
