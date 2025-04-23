import Logo from "./logo";
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className=" d-flex justify-content-center border-top border-3 bg-secondary  bg-opacity-50">
      <Logo />
      <span className="mx-2">&copy;</span>
      {year} JavaScript
      <span></span>
    </footer>
  );
}

export default Footer;
