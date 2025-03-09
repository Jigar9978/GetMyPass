"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";


export default function Profile() {
  const [profileData, setProfileData] = useState({});
  const [phoneNumber, setPhoneNumber] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    // लोकल स्टोरेज से फोन नंबर निकालो
    const savedPhoneNumber = localStorage.getItem("phoneNumber");
    if (savedPhoneNumber) {
      setPhoneNumber(savedPhoneNumber);

      // MongoDB से डेटा लाने के लिए API कॉल करो
      fetch(`/api/get-profile?phoneNumber=${savedPhoneNumber}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setProfileData(data.profile);
          }
        })
        .catch((error) => console.error("Error fetching profile data:", error));
    }
  }, []);

  // डेटा लोड होने तक लोडर दिखाओ
  if (!profileData) {
    return <div className="text-center p-10">Loading...</div>;
  }


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Generate image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", e.target.email.value);
    formData.append("phoneNumber", e.target.phoneNumber.value);
    formData.append("firstName", e.target.firstName.value);
    formData.append("lastName", e.target.lastName.value);
    formData.append("dob", e.target.dob.value);
    formData.append("gender", e.target.gender.value);
    formData.append("house", e.target.house.value);
    formData.append("street", e.target.street.value);
    formData.append("locality", e.target.locality.value);
    formData.append("city", e.target.city.value);
    formData.append("state", e.target.state.value);
    formData.append("pincode", e.target.pincode.value);

    // 🟢 Image Upload
    if (imageFile) {
      formData.append("avatar", imageFile);
    }

    const response = await fetch("/api/save-profile", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    alert(result.message);
  };


  return (
    <div className="bg-gray-100 p-4 min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="max-w-4xl w-full space-y-6 animate-fadeIn">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden relative">
              {imagePreview ? (
                <Image width={500} height={128} src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : profileData.profileDetails?.avatar ? (
                <Image width={500} height={128} src={`/uploads/${profileData.profileDetails.avatar}`} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-500">Add Image</span>
              )}
            </div>
            <label className="mt-4 inline-block px-4 py-2 bg-purple-600 text-white rounded-md cursor-pointer hover:bg-purple-700">
              Upload Image
              <input
                type="file"
                name="avatar"
                onChange={handleImageChange}
                className="hidden"
                required
              />
            </label>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
          <div className="flex items-center gap-2">
            <label className="w-32 font-medium">Email:</label>
            <input
              name="email"
              type="email"
              placeholder="Add Email"
              defaultValue={profileData?.email || ""}
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="flex items-center gap-2 mt-4">
            <label className="w-32 font-medium">Phone Number:</label>
            <input
              name="phoneNumber"
              type="tel"
              defaultValue={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-500"
              required
              readOnly
            />
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="firstName"
                type="text"
                placeholder="First Name"
                defaultValue={profileData.profileDetails?.name?.split(" ")[0] || ""}
                className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-500"
                required
              />
              <input
                name="lastName"
                type="text"
                placeholder="Last Name"
                defaultValue={profileData.profileDetails?.name?.split(" ").slice(1).join(" ") || ""}
                className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Date of Birth:</label>
              <input
                name="dob"
                type="date"
                defaultValue={profileData.profileDetails?.dob || ""}
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Gender:</label>
              <div className="flex items-center gap-4">
                <label>
                  <input
                    name="gender"
                    type="radio"
                    value="Male"
                    defaultChecked={profileData.profileDetails?.gender === "Male" || !profileData.profileDetails?.gender}
                    className="mr-2"
                  />{" "}
                  Male
                </label>
                <label>
                  <input
                    name="gender"
                    type="radio"
                    value="Female"
                    defaultChecked={profileData.profileDetails?.gender === "Female"}
                    className="mr-2"
                  />{" "}
                  Female
                </label>
                <label>
                  <input
                    name="gender"
                    type="radio"
                    value="Other"
                    defaultChecked={profileData.profileDetails?.gender === "Other"}
                    className="mr-2"
                  />{" "}
                  Other
                </label>
              </div>

            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Address Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="house"
              type="text"
              placeholder="House"
              defaultValue={profileData.address?.house || ""}
              className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              name="street"
              type="text"
              placeholder="Street"
              defaultValue={profileData.address?.street || ""}
              className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              name="locality"
              type="text"
              placeholder="Locality"
              defaultValue={profileData.address?.locality || ""}
              className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-500"
            />
            <input
              name="city"
              type="text"
              placeholder="City"
              defaultValue={profileData.address?.city || ""}
              className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              name="state"
              type="text"
              placeholder="State"
              defaultValue={profileData.address?.state || ""}
              className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              name="pincode"
              type="text"
              placeholder="Pincode"
              defaultValue={profileData.address?.pincode || ""}
              className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="mt-6 px-6 py-3 bg-purple-600 text-white text-lg font-semibold rounded-md hover:bg-purple-700 focus:ring-2 focus:ring-purple-500">
            Update Profile
          </button>
        </div>
      </form>

      <style jsx global>{`
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  .animate-fadeIn {
    animation: fadeIn 0.5s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`}</style>
    </div>
  );
}



