import Navbar from "../../components/ui/Navbar";
const HomePage = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default HomePage;
