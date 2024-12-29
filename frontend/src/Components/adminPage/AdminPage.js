import React, { useEffect, useState } from 'react';
import './AdminPage.css';

function AdminPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/user-items/orders')
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  return (
    <div className="admin-page">
      <h2>User Orders</h2>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Item Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={`${order.userId}-${order.itemName}`}>
              <td>{order.userId}</td>
              <td>{order.user_name}</td>
              <td>{order.email_address}</td>
              <td>{order.itemName}</td>
              <td>{order.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;