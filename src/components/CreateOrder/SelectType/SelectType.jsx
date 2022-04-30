import React, { useState } from "react";
import "./SelectType.css";
import {types, fotosetTypes, reportTypes} from "./SelectType.constans"

function SelectType({ selectType }) {
  const [type, setType] = useState("");
  const [podType, setPodType] = useState("");

  function chengeSelectType(event) {
    setType(event.target.value);
    setPodType("");
    selectType(event.target.value, "");
  }

  function chengeSelectPodType(event) {
    setPodType(event.target.value);
    selectType(type, event.target.value);
  }

  return (
    <div className="selectType">
      <span className="title body1 required">Вид съемки</span>
      <div className="selectData">
        <select
          className="chooseType"
          value={type}
          onChange={chengeSelectType}
          style={type ? { border: "1px solid #7d94df" } : { color: "#696969" }}
        >
          <option
            key="0"
            value=""
            selected
            disabled
            style={{ display: "none" }}
          >
            Выберите тип
          </option>
          {types.map((type) => (
            <option key={type.id} value={type.type} style={{ color: "black" }}>
              {type.text}
            </option>
          ))}
        </select>
        <div className={type ? "separator" : "noactive"}>
          <div
            className="circle"
            style={type && podType ? { backgroundColor: "#7d94df" } : {}}
          />
          <div
            className="circle"
            style={type && podType ? { backgroundColor: "#7d94df" } : {}}
          />
        </div>
        <select
          className={
            type === "fotoset" || type === "report"
              ? "active choosePodType"
              : "noactive"
          }
          onChange={chengeSelectPodType}
          value={podType}
          style={
            podType ? { border: "1px solid #7d94df" } : { color: "#696969" }
          }
        >
          <option
            key="0"
            value=""
            selected
            disabled
            style={{ display: "none" }}
          >
            {type === "fotoset"
              ? "Какая фотосессия вам нужна?"
              : "Какой репортаж вам нужен?"}
          </option>
          {type === "fotoset"
            ? fotosetTypes.map((type) => (
                <option
                  key={type.id}
                  value={type.type}
                  style={{ color: "black" }}
                >
                  {type.text}
                </option>
              ))
            : reportTypes.map((type) => (
                <option
                  key={type.id}
                  value={type.type}
                  style={{ color: "black" }}
                >
                  {type.text}
                </option>
              ))}
        </select>
        <input
          className={
            type === "items" || type === "content" || type === "other"
              ? "active choosePodType"
              : "noactive"
          }
          placeholder={
            type === "items"
              ? "Какой предмет нужно отснять?"
              : type === "content"
              ? "Для чего вам нужна съемка?"
              : "Какая съемка вам нужна?"
          }
          onChange={chengeSelectPodType}
          value={podType}
          style={podType ? { border: "2px solid #7d94df" } : {}}
        ></input>
      </div>
    </div>
  );
}

export default SelectType;
