import PageHeader from "../components/common/pageHeader";
import CardUpdate from "../pages/cardUpdate";

//
function CardCreate() {
  //

  const title = " Create New Card";
  const description = "Add a new business card to your collection";
  return (
    <div className="container">
      <PageHeader title={title} description={description}></PageHeader>
      <CardUpdate cardCreate={true}></CardUpdate>
    </div>
  );
}
export default CardCreate;
