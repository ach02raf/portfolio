import Loading from "@/C/Loading/Loading";
import "./page.scss";
export default function Home() {
  return (
    <main>
      <div className="container-fluid gx-0 d-flex justify-content-center align-items-center vh-100 contain">
        <Loading />
      </div>
    </main>
  );
}
