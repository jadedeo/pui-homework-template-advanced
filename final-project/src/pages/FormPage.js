import React from "react";
import "../css/home.css";
import "../css/header.css";
import "../css/muiOverrides.css";
import Header from "../components/Header";
import Form from "../components/Form";

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
