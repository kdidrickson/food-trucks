import React from 'react';

export default ({
  number,
  name,
  address,
  foodItems,
  facilityType,
  hours
}) => {
  return (
    <div className="foodTruck-listItem">
      <h3
        className="foodTruck-listItem-name"
        children={`${number ? `${number}. ${name}` : name}`}
      />
      <div
        className="foodTruck-listItem-facilityType"
        children={facilityType}
      />
      <div
        className="foodTruck-listItem-foodItems"
        children={foodItems}
      />
      <div
        className="foodTruck-listItem-hours"
        children={hours}
      />
      <div
        className="foodTruck-listItem-address"
        children={address}
      />
    </div>
  );
};
