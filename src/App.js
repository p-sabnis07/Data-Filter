// import './App.css';
import { useEffect, useState } from "react";
import Cards from "./components/Cards";
import Filter from "./components/Filter";
import Navbar from "./components/Navbar";
import { apiUrl, filterData } from "./data";
import { toast } from "react-toastify";
import Spinner from "./components/Spinner";

const App = () => {
  const [courses, setCourses] = useState(null);
  // While the data is fetching, after the fetching data show me the loading spinner
  const [loading, setLoading] = useState(true);
  // filtering the data by given filter buttons
  const[category, setCategory] = useState(filterData[0].title);

  // Making API Call
  const fetchData = async () => {
    // Set loading to true before making the API call
    setLoading(true);
    
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      // Save data into a variable
      setCourses(data.data);
    } catch (error) {
      toast.error("Something went wrong..!");
    }

    // Set loading to false after data is fetched
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div>
        <Navbar />
      </div>
      <div>
        <div>
          {/* We are sending filterData by using props */}
          <Filter filterData={filterData} category={category} setCategory={setCategory} />
        </div>
        <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center min-h-[50vh]">
          {loading ? <Spinner /> : <Cards courses={courses} category={category} />}
        </div>
      </div>
    </div>
  );
};

export default App;


