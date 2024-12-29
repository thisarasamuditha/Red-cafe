import React, { useState } from 'react';
import './Menu.css';

function Menu() {
  const [orders, setOrders] = useState([]);
  const [slideBarOpen, setSlideBarOpen] = useState(false);

  const menuItems = [
    { id: 1, name: 'Coffee', description: 'Delicious brewed coffee', price: 200, img: 'coffee.jpg' },
    { id: 2, name: 'Cake', description: 'Freshly baked cake', price: 150, img: 'cake.jpg' },
    { id: 3, name: 'Sandwich', description: 'Freshly made sandwich', price: 350, img: 'sandwich.jpg' },
    { id: 4, name: 'Tea', description: 'Aromatic tea with a refreshing taste', price: 100, img: 'tea.webp' },
    { id: 5, name: 'Pastry', description: 'Flaky and buttery pastry', price: 180, img: 'pastry.jpg' },
    { id: 6, name: 'Muffin', description: 'Soft and sweet muffin, perfect for a snack', price: 120, img: 'muffin.jpg' },
  ];

  const handleOrder = async (item) => {
    const existingOrder = orders.find((order) => order.id === item.id);
    if (existingOrder) {
      setOrders(
        orders.map((order) =>
          order.id === item.id ? { ...order, quantity: order.quantity + 1 } : order
        )
      );
    } else {
      setOrders([...orders, { ...item, quantity: 1 }]);
    }
    setSlideBarOpen(true);

    // Send the order to the backend
    try {
      const response = await fetch('http://localhost:5001/user-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 1, // Replace with the actual user ID
          itemName: item.name,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        alert(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while placing the order.');
    }
  };

  const handleQuantityChange = async (item, change) => {
    const newQuantity = Math.max(item.quantity + change, 1);
    setOrders(
      orders.map((order) =>
        order.id === item.id ? { ...order, quantity: newQuantity } : order
      )
    );

    // Send the update request to the backend
    try {
      const response = await fetch('http://localhost:5001/user-items', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 1, // Replace with the actual user ID
          itemName: item.name,
          quantity: newQuantity,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        alert(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating the quantity.');
    }
  };

  const handleRemoveItem = async (item) => {
    setOrders(orders.filter((order) => order.id !== item.id));

    // Send the delete request to the backend
    try {
      const response = await fetch('http://localhost:5001/user-items', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 1, // Replace with the actual user ID
          itemName: item.name,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        alert(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while removing the item.');
    }
  };

  const totalAmount = orders.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <section id="menu" className={`menu ${slideBarOpen ? 'slide-bar-open' : ''}`}>
      <h2>Our Menu</h2>
      <div className="menu-items">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-item" onClick={() => handleOrder(item)}>
            <img src={item.img} alt={item.name} className="menu-item-img" />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <span>{item.price} LKR</span>
          </div>
        ))}
      </div>
      <div className={`slide-bar ${slideBarOpen ? 'open' : ''}`}>
        <h2>Your Order</h2>
        {orders.map((order) => (
          <div key={order.id} className="slide-bar-item">
            <div className="item-details">
              <span className="item-name">{order.name}</span>
              <span className="item-price">{order.price * order.quantity} LKR</span>
            </div>
            <div className="item-controls">
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(order, -1)}>-</button>
                <span>{order.quantity}</span>
                <button onClick={() => handleQuantityChange(order, 1)}>+</button>
              </div>
              <button className="remove-button" onClick={() => handleRemoveItem(order)}>
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="slide-bar-total">
          <strong>Total:</strong> <span>{totalAmount} LKR</span>
        </div>
        <button className="confirm-order-button">Confirm Order</button>
      </div>
    </section>
  );
}

export default Menu;