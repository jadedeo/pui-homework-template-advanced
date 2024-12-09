import "../css/home.css";
import "../css/header.css";

const Header = (props) => {
  return (
    <header id="header-container">
      {/* <div > */}
      <div id="header-content">
        <div>
          <img
            alt="stack of books emoji"
            id="books-favicon"
            src="assets/application/books.svg"
            height="30"
          />
        </div>
        <div>
          <h1>LitTunes</h1>
          <h4>Soundtracks for your shelf.</h4>
        </div>
      </div>
      {/* </div> */}
    </header>
  );
};

export default Header;
