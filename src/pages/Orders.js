import React from "react";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import OrderFilters from "../components/Orders/OrderFilters";
import OrderCard from "../components/Orders/OrderCard";

function Orders() {
  return (
    <div>
      <Header pageName={{pageName:"Заказы"}}/>
      <div className="pageLayout">
        <SideMenu />
        <div className="pageBody">
          <OrderFilters />
          {getOders().map( order =>
          <OrderCard order={order}/>
          )} 
        </div>
      </div>
    </div>
  );

  function getOders(){
    return[
      {
        "first_name": "Иван",
        "last_name": "Иванович",
        "middle_name": "Иванов",
        "email": "string",
        "phone": "string",
        "birthdate": "2022-01-04T07:55:13.557000+00:00",
        "city": "Екатеринбург",
        "role": "Admin",
        "created_date": "2022-01-04T07:55:13.557000+00:00",
        "id": "ff9f28fc-aca7-4942-93ff-33cd8bdf4df2",
        "password": "j-F/GSEz"
      },
      {
        "first_name": "Иван",
        "last_name": "Иванович",
        "middle_name": "Иванов",
        "email": "string",
        "phone": "string",
        "birthdate": "2022-01-04T07:55:13.557000+00:00",
        "city": "Москва",
        "role": "Admin",
        "created_date": "2022-01-04T07:55:13.557000+00:00",
        "id": "ff9f28fc-aca7-4942-93ff-33cd8bdf4df2",
        "password": "j-F/GSEz"
      },
    ]
  }
}

export default Orders;
