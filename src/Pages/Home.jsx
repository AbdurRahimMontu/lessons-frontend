import Banner from "../Components/Banner";
import FeaturedLifeLessons from "../Components/FeaturedLifeLessons";
import LearningLife from "../Components/LearningLife";

import MostSavedLessons from "../Components/MostSavedLessons";
import TopContributors from "../Components/TopContributors";


const Home = () => {
  
  return (
     <div>
   <Banner></Banner>
<FeaturedLifeLessons></FeaturedLifeLessons>

   <LearningLife></LearningLife>
   <TopContributors></TopContributors>
   <MostSavedLessons></MostSavedLessons>
  
      </div>
  );
};

export default Home;
