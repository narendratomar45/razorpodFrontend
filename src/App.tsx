import { lazy, Suspense } from "react";
import Loader from "./components/Loader";
const Header = lazy(() => import("./components/Header"));
const Hero = lazy(() => import("./components/Hero"));
const ProductList = lazy(() => import("./components/ProductList"));
const App: React.FC = () => {
  return (
    <div className="min-h-screen  bg-gray-200">
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <Loader />
          </div>
        }
      >
        <Header />
        <Hero />
        <ProductList />
      </Suspense>
    </div>
  );
};

export default App;
