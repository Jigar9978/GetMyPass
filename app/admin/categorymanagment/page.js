"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const AdminPanel = () => {
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`Updating ${name} to ${value}`); // Debugging
        setSelectedCategory({ ...selectedCategory, [name]: value });
    };
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log('Selected file:', file); // Debugging
        setSelectedCategory({ ...selectedCategory, imageFile: file });
    };
    

    const addCategory = () => {
        setIsAdding(true);
        setSelectedCategory({ name: "", icon: "", image: "" });
    };

    const saveCategory = async () => {
        const formData = new FormData();
        formData.append("name", selectedCategory.name);
        formData.append("icon", selectedCategory.icon);
    
        if (selectedCategory.imageFile) {
            formData.append("image", selectedCategory.imageFile);  // imageFile should be set by the file input
        }
    
        const method = isEditing ? "PUT" : "POST";
        const url = isEditing ? `/api/categories/${selectedCategory._id}` : "/api/categories";
    
        const res = await fetch(url, {
            method,
            body: formData,
        });
    
        if (res.ok) {
            fetchCategories();
            setIsAdding(false);
            setIsEditing(false);
            setSelectedCategory({});
        }
    };
    


    const deleteCategory = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if (!confirmDelete) return;

        const res = await fetch(`/api/categories/${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            fetchCategories();
        } else {
            console.error("Failed to delete category");
        }
    };



    const handleEditClick = (category) => {
        setSelectedCategory(category);
        setIsEditing(true);
    };

    return (
        <div className="flex min-h-screen w-[1100px]">
            <div className="flex-grow p-6">
                <h1 className="text-3xl font-bold mb-6 text-center">Category Management</h1>

                <section className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-white shadow-md rounded-lg transition hover:scale-105">
                            <h3 className="font-bold">Total Category</h3>
                            <p className="text-2xl">{categories.length}</p>
                        </div>
                    </div>
                </section>

                <button
                    onClick={addCategory}
                    className="mb-4 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
                >
                    Add Category
                </button>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {categories.map((category) => (
                        <div key={category._id} className="p-4 bg-white shadow-md rounded-lg relative">
                            <span
                                className="absolute top-2 right-2 text-xl cursor-pointer"
                                onClick={() => deleteCategory(category._id)}
                            >
                                ❌
                            </span>
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                {category.icon} {category.name}
                            </h3>
                            <Image
                                src={category.image}
                                alt="image"
                                width={500} // Adjust as needed
                                height={128} // Adjust as needed
                                className="w-full h-32 object-cover mt-2 rounded-md"
                            />

                            <div className="mt-4 flex gap-2">
                                <button
                                    onClick={() => handleEditClick(category)}
                                    className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
                                >
                                    Edit
                                </button>
                                <Link
                                    href={`/admin/categorymanagment/add-events/${category._id}`}
                                    className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
                                >
                                    Add Event
                                </Link>

                            </div>
                        </div>
                    ))}
                </div>

                {(isAdding || isEditing) && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96">
                            <h3 className="text-xl font-bold mb-4">{isEditing ? "Edit Category" : "Add Category"}</h3>
                            <label className="block mb-2 font-semibold">Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={selectedCategory.name || ""}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 mb-4 border rounded-md"
                            />
                            <label className="block mb-2 font-semibold">Icon:</label>
                            <input
                                type="text"
                                name="icon"
                                value={selectedCategory.icon || ""}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 mb-4 border rounded-md"
                            />
                            <label className="block mb-2 font-semibold">Image:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setSelectedCategory({ ...selectedCategory, imageFile: e.target.files[0] })}
                                className="w-full px-3 py-2 mb-4 border rounded-md"
                            />


                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => {
                                        setIsAdding(false);
                                        setIsEditing(false);
                                        setSelectedCategory({});
                                    }}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={saveCategory}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
