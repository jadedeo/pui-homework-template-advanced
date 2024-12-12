// general react
import React from "react";

//components
import Header from "../components/Header";
import Form from "../components/Form";

// styles
import "../css/home.css";
import "../css/header.css";

// form page displays header & form component
const FormPage = () => {
  return (
    <>
      <Header />
      <main>
        <Form />
      </main>
    </>
  );
};
export default FormPage;
