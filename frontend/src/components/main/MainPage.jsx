import Navbar from "../../components/ui/Navbar";
const HomePage = ({ children }) => {
  return (
    <div className="">
      <Navbar >
        {children}
      </Navbar>

    </div >
  );
};

export default HomePage;
