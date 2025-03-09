"use client";

import { useEffect, useState } from "react";

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch("/api/get-payments");
        const data = await response.json();
        console.log(data);

        if (data.payments && data.payments.items && data.payments.items.length > 0) {
          setPayments(data.payments.items);
        } else {
          setPayments([]);
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
        setPayments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);



  // Pagination logic
  const totalPages = Math.ceil(payments.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = payments.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <div className="flex h-screen flex-col">
      <main className="flex-grow p-6">
        <section id="payment-management" className="mb-2">
          <h2 className="text-2xl font-bold mb-1 top-0 bg-white p-4 shadow-md z-10">
            Payment Management
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded shadow">
              <thead className="bg-gray-200 sticky top-[10px] z-10">
                <tr>
                  <th className="px-4 py-2">Transaction ID</th>
                  <th className="px-4 py-2">Order ID</th>
                  <th className="px-4 py-2">Customer Email</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Payment Method</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {currentRecords.length > 0 ? (
                  currentRecords.map((payment) => (
                    <tr key={payment.id} className="border-b">
                      <td className="px-4 py-2">{payment.id}</td>
                      <td className="px-4 py-2">{payment.order_id}</td>
                      <td className="px-4 py-2">{payment.email}</td>
                      <td className="px-4 py-2">{payment.amount / 100} INR</td>
                      <td className="px-4 py-2">{new Date(payment.created_at * 1000).toLocaleString()}</td>
                      <td className="px-4 py-2">{payment.method}</td>
                      <td className="px-4 py-2">{payment.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-4 py-2 text-center">
                      No payment records available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default PaymentManagement;
