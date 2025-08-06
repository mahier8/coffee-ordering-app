import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Spinner } from "./components/molecules/Spinner";

const Landing = lazy(() => import("./pages/LandingPage"));
const Confirm = lazy(() => import("./pages/OrderConfirmationPage"));
const Payment = lazy(() => import("./pages/PaymentPage"));
const Success = lazy(() => import("./pages/SuccessPage"));

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/order/:id" element={<Confirm />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <Suspense fallback={<Spinner />}>
        <AnimatedRoutes />
      </Suspense>
    </Router>
  );
}
