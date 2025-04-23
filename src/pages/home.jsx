import PageHeader from "../components/common/pageHeader";
import { useAuth } from "../context/auth.context";
import MyCards from "./myCards";

function Home() {
  const { user } = useAuth();

  const title = "Home";
  const description = "Explore business cards shared by the community";
  return (
    <div className="container">
      <PageHeader title={title} description={description}></PageHeader>
      {!user && (
        <div className="text-center my-5">
          <h4>Join Us Today</h4>
          <p className="opacity-75">
            Sign up to create cards, save favorites, and discover local
            businesses.
          </p>
        </div>
      )}
      <MyCards home={true} favorite={false}></MyCards>
    </div>
  );
}
export default Home;
