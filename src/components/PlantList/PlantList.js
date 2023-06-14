import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlantItem from "../PlantItem/PlantItem";

function PlantList() {
  const dispatch = useDispatch();

  const store = useSelector((store) => store);

  useEffect(() => {
    console.log("component did mount");
    dispatch({ type: "GET_LIST" });
    console.log(store.plantListReducer);
  }, []);

  return (
    <div>
      <h3>This is the plant list</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Kingdom</th>
            <th>Clade</th>
            <th>Order</th>
            <th>Family</th>
            <th>Subfamily</th>
            <th>Genus</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {store.plantListReducer.map((plant) => {
            return <PlantItem plant={plant} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default PlantList;
