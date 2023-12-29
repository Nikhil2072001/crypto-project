import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import TabsComponent from "../components/Dashboard/Tabs";
import axios from "axios";
import Search from "../components/Dashboard/Search";
import Button from "../components/Common/Button";
import PaginationComponent from "../components/Dashboard/Pagination";
import Loader from "../components/Common/Loader";
import BackToTop from "../components/Common/BackToTop";
import { get100Coins } from "../functions/get100Coins";
const DashboardPage = () => {
  const [search, setSearch] = useState("");
  const [coins, setCoins] = useState([]);
  const [paginationCoins, setPaginationCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const handlePageChange = (event, value) => {
    setPage(value);
    var previousIndex = (value - 1) * 10;
    setPaginationCoins(coins.slice(previousIndex, previousIndex + 10));
  };
  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };
  var filteredCoins = coins.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.symbol.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
   getData();
  }, []);
   const getData = async ()=>{
    const myCoins = await get100Coins();
    if(myCoins){
      setCoins(myCoins);
      setPaginationCoins(myCoins.slice(0, 10));
      setIsLoading(false);
    }
   }
  return (
   <div>
     <Header />
     <BackToTop/>
     { isLoading ? (
      <Loader/>
    ): (
      <div>
     
      <Search search={search} onSearchChange={onSearchChange} />
      {filteredCoins.length > 0 ? (
        <TabsComponent coins={search ? filteredCoins : paginationCoins} />
      ) : (
        <div
          className="no-items"
          style={{ display: "flex", flexFlow: "column", alignItems: "center" }}
        >
          <h1>No Items Found</h1>
          <Button
            text={"Clear Search"}
            outlined={false}
            onClick={() => setSearch("")}
          />
        </div>
      )}
      {!search && (
        <PaginationComponent page={page} handlePageChange={handlePageChange} />
      )}
    </div>
    )}
   </div>
   
  );
};

export default DashboardPage;
