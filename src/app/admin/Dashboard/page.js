"use client"
import Card from "../../components/Card";
// import Chart from "@/app/components/Chart";
import { useState, useEffect } from "react";
import Table from "../../components/Table";
import { useAppContext } from "../../context/Context";

export default function Dashboard() {
  const { users, orders } = useAppContext();
  const [recentOrder, setRecentOrder] = useState([]);

  let ordersPaid = orders?.filter((order)=> order.paymentStatus === "paid")
  let totalIncome = ordersPaid.reduce((acc, order)=> acc + order.totalAmount ,0)
  let arrived = orders?.filter((order)=> order.status === "delivered")
  let pending = orders?.filter((order)=> order.status === "pending")
  let cancel = orders?.filter((order)=> order.status === "cancel")

  const fetchRecentOrders = async () => {
    try{
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const filterRecentOrder = orders.filter((order)=>{
        let orderData = order.createdAt.toDate()
        return orderData > sevenDaysAgo
      })
      setRecentOrder(filterRecentOrder)
    } catch(error){
      console.error("Error fetching recent orders:", error);
    }
  }
  useEffect(() => {
    fetchRecentOrders();
  }, [orders]);
  

  return (
    <div className="p-2 min-h-screen">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card title="Total Income" value={new Intl.NumberFormat("en-US").format(totalIncome)} change={5.2} />
        <Card  title="Users" value={users?.length} change={-3.4} />
        <Card title="Orders Paid" value={ordersPaid.length} change={8.7} />
        <Card title="Total Sales" value={orders?.length} change={-1.2} />
      </div>

      <div className="grid grid-cols-1 mt-12 items-start lg:grid-cols-2 gap-6">

      <div className="bg-white p-6 rounded-lg">
          <h2 className="text-2xl mb-6">Activity Overview</h2>

          <div className="grid grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
            <Card title="Arrived" value={arrived?.length} change={-1.2} />
            <Card title="Pending" value={pending?.length} change={-1.2} />
            <Card title="Cancel" value={cancel?.length} change={-1.2} />
            <Card title="Orders" value={orders?.length} change={-1.2} />
          </div>
      </div>

          <div className="bg-white p-6 rounded-lg">
          <h2 className="text-2xl mb-6">Recent Transactions</h2>
            <Table rows={recentOrder} />
          </div>
      </div>
    </div>
  );
}