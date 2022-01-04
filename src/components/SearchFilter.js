import React, { useState } from "react";

function SearchFilter() {
  return (
    <div className="serchFilters" style={styles.body}>
      <form className="filters" style={styles.form}>
        <input type="text" className="filter" style={styles.input} placeholder="Поиск" />
        <input type="text" className="filter" style={styles.input} placeholder="Город"/>
        <input type="text" className="filter" style={styles.input} placeholder="Жанр" />
        <input type="text" className="filter" style={styles.input} placeholder="Максимальная цена" />
      </form>
    </div>
  );
}

const styles = {
  body: {
    width: 780,
    height: "auto",
    display: "inline-block",
    float: "right",
  },
  input:{
      width: 180-16,
      height: 40-16,
      border: "none"
  },
  form:{
      display: "flex",
      justifyContent: "space-between",
      padding: 0
  }
};

export default SearchFilter;
