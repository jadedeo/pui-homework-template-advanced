import Header from "../components/Header.js";
import Form from "../components/Form.js";
import "../css/home.css";
// import { useSelector } from "react-redux";

const Home = (props) => {
  return (
    <div id="home-container">
      <Header />
      <Form />
    </div>
  );
};
export default Home;
