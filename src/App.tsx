import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ "./pages/Cart"));
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound"));
const FullPizza = lazy(() => import(/* webpackChunkName: "FullPizza" */ "./pages/FullPizza"));
const CartLazy = () => (
  <Suspense fallback={<div>...Loading</div>}>
    <Cart />
  </Suspense>
);
const FullPizzaLazy = () => (
  <Suspense fallback={<div>...Loading</div>}>
    <FullPizza />
  </Suspense>
);
const NotFoundLazy = () => (
  <Suspense fallback={<div>...Loading</div>}>
    <NotFound />
  </Suspense>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<CartLazy />} />
        <Route path="pizza/:id" element={<FullPizzaLazy />} />
        <Route path="*" element={<NotFoundLazy />} />
      </Route>
    </Routes>
  );
}
export default App;
