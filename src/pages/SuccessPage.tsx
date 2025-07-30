import { Layout } from "../components/organisms/Layout";

export default function SuccessPage() {
  return (
    <Layout>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>✅ Order Confirmed!</h2>
        <p>Your coffee is on its way ☕</p>
      </div>
    </Layout>
  );
}
