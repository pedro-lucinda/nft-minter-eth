import type { NextPage } from "next";
import { PublicPage } from "../components/layouts/public-page";
import { HomeView } from '../views'

const Home: NextPage = () => {
  return (
    <PublicPage>
      <HomeView />
    </PublicPage>
  )
};

export default Home;
