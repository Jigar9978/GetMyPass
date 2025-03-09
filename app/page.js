import Review from "@/components/Review";
import HorizontalSlider from "@/components/Feature";
import CategoryCards from "@/components/Categorys";
import Popular from "../app/category/[name]/card";
import AnimatedBanner from "@/components/Hidden";
import EventSlider from "@/app/category/[name]/Slider";


export default function Page() {
  return <div>
    <EventSlider/>
    <AnimatedBanner/>
    <Popular/>
   <CategoryCards/>
   <HorizontalSlider/>
   <Review/>
  </div>
}
