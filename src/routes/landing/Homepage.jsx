import React, { useEffect, lazy, Suspense } from "react";
import ScrollButton from "../../helpers/ScrollBtn";
import ResetLocation from "../../helpers/ResetLocation";
import Hero from "./hero/Hero";
const ContactUsLanding = lazy(() => import("./company-info/ContactUsLanding"));
const WelcomeSection = lazy(() => import("./welcome/WelcomeSection"));
const OurServices = lazy(() => import("./our-service/OurServices"));
const Gallery = lazy(() => import("./gallery/Gallery"));
const StatsPreview = lazy(() => import("./stats-preview/StatsPreview"));
const MenuSlider = lazy(() => import("./menu-slider/MenuSlider"));
const Newsletter = lazy(() => import("./newsletter/Newsletter"));
const ReviewForm = lazy(() => import("./review-form/ReviewForm"));
const ContactLanding = lazy(() => import("./contact-info/ContactLanding"));

const Homepage = () => {
  useEffect(() => {
    document.title = "Pizza Time";
    ResetLocation();
  }, []);
  return (
    <React.Fragment>
      <Hero />
      <Suspense fallback={<div className="loading-state">Cargando...</div>}>
        {/*<WelcomeSection />*/}
        {/*<ContactUsLanding />*/}
        {/*<OurServices />*/}
        {/*<Gallery />*/}
        {/*<StatsPreview />*/}
        {/*<MenuSlider />*/}
        {/*<Newsletter />*/}
        <ReviewForm />
        {/*<ContactLanding />*/}
        <ScrollButton />
      </Suspense>
    </React.Fragment>
  );
};

export default Homepage;
