import React, { useState } from "react";
import "./SelectType.css";

function SelectType() {
  const [type, setType] = useState("");
  const [podType, setPodType] = useState("");

  function chengeSelectType(event) {
    setType(event.target.value);
    setPodType("");
  }

  function chengeSelectPodType(event) {
    setPodType(event.target.value);
  }

  const types = [
    { id: 1, type: "fotoset", text: "Фотосессия" },
    { id: 2, type: "report", text: "Репортаж" },
    { id: 3, type: "items", text: "Предметная" },
    { id: 4, type: "content", text: "Контентная" },
    { id: 5, type: "other", text: "Другое" },
  ];

  const fotosetTypes = [
    { id: 1, type: "portret", text: "Портретная" },
    { id: 2, type: "loveStory", text: "Love story" },
  ];
  const reportTypes = [{ id: 1, type: "wedding", text: "Свадьба" }];

  console.log(type === "items" || type === "content" || type === "other");
  return (
    <div className="selectType">
      <span className="title body1">Вид съемки</span>
      <div className="selectData">
        <select
          className="chooseType"
          value={type}
          onChange={chengeSelectType}
          style={type ? { border: "2px solid #7d94df" } : {}}
        >
          <option key="0" value="" selected disabled style={{ display: "none" }} />
          {types.map((type) => (
            <option key={type.id} value={type.type}>
              {type.text}
            </option>
          ))}
        </select>
        <div className={type ? "separator" : "noactive"}>
          <div className="circle" />
          <div className="circle" />
        </div>
        <select
          className={
            type === "fotoset" || type === "report"
              ? "active choosePodType"
              : "noactive"
          }
          onChange={chengeSelectPodType}
          value={podType}
          style={podType ? { border: "2px solid #7d94df" } : {}}
        >
          <option key="0" value="" selected disabled style={{ display: "none" }} />
          {type === "fotoset"
            ? fotosetTypes.map((type) => (
                <option key={type.id} value={type.type}>
                  {type.text}
                </option>
              ))
            : reportTypes.map((type) => (
                <option key={type.id} value={type.type}>
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
        ></input>
      </div>
    </div>
  );
}

export default SelectType;
