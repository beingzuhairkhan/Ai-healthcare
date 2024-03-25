import React from 'react';

const Appointment = ({ appointments }) => {
  return (
    <table className="w-full text-left text-sm text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope='col' className="px-6 py-3">
            Name
          </th>
          <th scope='col' className="px-6 py-3">
            Gender
          </th>
          <th scope='col' className="px-6 py-3">
            Payment
          </th>
          <th scope='col' className="px-6 py-3">
            Price
          </th>
          <th scope='col' className="px-6 py-3">
            Booked on
          </th>
        </tr>
      </thead>
      <tbody>
        {appointments?.map(item => (
          <tr key={item._id}>
            <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
              {item.user.photo ? (
                <img src={item.user.photo} alt={item.user.name} className="w-10 h-10 rounded-full" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
              )}
              <div className="pl-3">
                <div className="text-base font-semibold">{item.user.name}</div>
                <div>{item.user.email}</div>
              </div>
            </td>
            <td className="px-6 py-4">{item.user.gender || "N/A"}</td>
            <td className="px-6 py-4">
              {item.isPaid ? (
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                  Paid
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                  Unpaid
                </div>
              )}
            </td>
            <td className="px-6 py-4">{item.ticketPrice || "N/A"}</td>
            <td className="px-6 py-4">{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Appointment;
