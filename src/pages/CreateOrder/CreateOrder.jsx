import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import create_order from "../../store/createOrder";
import Header from "../../components/Header/Header";
import { useParams } from "react-router-dom";
import s from "./CreateOrder.module.css";
import Steps from "../../components/CreateOrder/Steps/Steps";
import SelectType from "../../components/CreateOrder/SelectType/SelectType";
import OrderInfo from "../../components/CreateOrder/OrderInfo/OrderInfo";
import SelectPlace from "../../components/CreateOrder/SelectPlace/SelectPlace";
import InputIdea from "../../components/CreateOrder/InputIdea/InputIdea";
import SelectSettings from "../../components/CreateOrder/SelectSettings/SelectSettings";
import SelectCost from "../../components/CreateOrder/SelectCost/SelectCost";

const CreateOrder = observer(() => {
  const { userID } = useParams();
  useEffect(() => {
    create_order.createNewOrderSettings(userID);
  }, []);
  return (
    <>
      <Header />
      <h1 className={s.pageName}>Оформление заказа</h1>
      {!create_order.loading && (
        <div className={s.body}>
          <Steps />
          {create_order.step === 1 && <SelectType />}
          {create_order.step === 2 && <SelectPlace />}
          {create_order.step === 3 && <InputIdea />}
          {create_order.step === 4 && <SelectSettings />}
          {create_order.step === 5 && <SelectCost />}
          {console.log(create_order.progress)}
          <OrderInfo />
        </div>
      )}
    </>
  );
});

export default CreateOrder;
