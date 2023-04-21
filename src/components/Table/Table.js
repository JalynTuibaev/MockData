import React, { useState, useEffect } from "react";
import mockData from "../../data/mock_stores.json";
import "./Table.css";

const Table = () => { 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;  

  const pageItems = mockData.slice(startIndex, endIndex);

  const pages = Array.from({ length: Math.round(mockData.length / itemsPerPage) }, (_, i) => i + 1);

  const [data, setData] = useState(pageItems);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = mockData.slice(startIndex, endIndex);
    setData(pageItems);
  }, [currentPage, itemsPerPage]);

  const monthsName = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const verticalSum = monthsName.map((monthName, index) => {
    return data.reduce((acc, item) => acc + item?.months[index].value, 0);
  });

  const horizontalSum = data.map((item) => {
    return item.months.reduce((acc, month) => acc + month.value, 0);
  });

  const total = horizontalSum.reduce((acc, value) => acc + value, 0);

  const inputChangeHandler = (e, item, index, month) => {
    setData((prevItems) => {
      const newItems = prevItems.map((prevItem) => {
        if (prevItem.store.id === item.store.id) {
          return {
            ...prevItem,
            months: [
              ...prevItem.months.slice(0, index),
              { ...month, value: Number(e.target.value) },
              ...prevItem.months.slice(index + 1),
            ],
          };
        } else {
          return prevItem;
        }
      });
  
      return newItems;
    });
  };
  
  

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>Store name</th>
            {monthsName.map((month, index) => (
              <th key={month + index}>{month}</th>
            ))}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={`${item.store.id}-${index}`}>
              <td>{item.store.name}</td>
              {item.months.map((month, index) => (
                <td key={month.id}>
                  <input className="table__input" type="number" min={0} value={month.value} onChange={(e) => inputChangeHandler(e, item, index, month)} />
                </td>
              ))}
              <td>{horizontalSum[item.store.id - 1]}</td>
            </tr>
          ))}
          <tr>
            <td>Total</td>
            {verticalSum.map((sum, index) => (
              <td key={index}>{sum}</td>
            ))}
            <td>{total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;