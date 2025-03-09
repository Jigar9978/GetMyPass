const Dashboard = () => {
    return (
      <section id="dashboard" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded shadow">
            <h3 className="text-lg font-semibold">Total Sales</h3>
            <p className="text-xl font-bold text-purple-600">$45,000</p>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h3 className="text-lg font-semibold">Active Events</h3>
            <p className="text-xl font-bold text-purple-600">12</p>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h3 className="text-lg font-semibold">Tickets Sold</h3>
            <p className="text-xl font-bold text-purple-600">3,456</p>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h3 className="text-lg font-semibold">Revenue</h3>
            <p className="text-xl font-bold text-purple-600">$90,000</p>
          </div>
        </div>
      </section>
    );
  };
  
  export default Dashboard;