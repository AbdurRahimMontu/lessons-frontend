import React from "react";
import { Link } from "react-router";

const PricingPage = () => {

  const handlePayment=()=>{
     
  }




  

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold text-center mb-6">
        Upgrade to <span className="text-blue-600">Premium</span>
      </h1>
      <h2 className="text-center text-gray-600 mb-10">
        Lifetime access for only <span className="font-bold">৳1500</span>
      </h2>

  
      <div className="bg-white shadow-lg rounded-xl p-6 border">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-3 text-xl font-semibold">Features</th>
              <th className="py-3 text-center text-lg">Free Plan</th>
              <th className="py-3 text-center text-lg text-blue-600">Premium</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            <tr>
              <td className="py-3">Create Lessons</td>
              <td className="text-center"> Limited</td>
              <td className="text-center text-blue-600">Unlimited</td>
            </tr>

            <tr>
              <td className="py-3">Upload Images</td>
              <td className="text-center">✔</td>
              <td className="text-center text-blue-600">✔ High-quality images</td>
            </tr>

            <tr>
              <td className="py-3">Premium Lesson Creation</td>
              <td className="text-center">✖</td>
              <td className="text-center text-blue-600">✔ Yes</td>
            </tr>

            <tr>
              <td className="py-3">Ad-Free Experience</td>
              <td className="text-center">✖</td>
              <td className="text-center text-blue-600">✔ 100% Ad-free</td>
            </tr>

            <tr>
              <td className="py-3">Priority Listing</td>
              <td className="text-center">✖</td>
              <td className="text-center text-blue-600">✔ Always on top</td>
            </tr>

            <tr>
              <td className="py-3">Access to Exclusive Lessons</td>
              <td className="text-center">✖</td>
              <td className="text-center text-blue-600">✔ Yes</td>
            </tr>

            <tr>
              <td className="py-3">Analytics & Insights</td>
              <td className="text-center">✖</td>
              <td className="text-center text-blue-600">✔ Full access</td>
            </tr>

            <tr>
              <td className="py-3">Community Recognition</td>
              <td className="text-center">✖</td>
              <td className="text-center text-blue-600">✔ Premium badge</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-center my-10">
   
          <Link onClick={handlePayment}
            type="submit"
            className="bg-blue-600 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:bg-blue-700 transition"
          >
            Upgrade to Premium — ৳1500
          </Link>
       
      </div>
    </div>
  );

};

export default PricingPage;
