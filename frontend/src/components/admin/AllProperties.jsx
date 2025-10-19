import { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, TextInput } from "@mantine/core";

const AllPropperties = () => {
  const [properties, setProperties] = useState([]);
  const [isModelOpened, setIsmodelOpened] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    delete_time: "",
    country: "",
    city: "",
  });

  useEffect(() => {
    handleLoadData();
  }, []);

  const handleLoadData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/residency/allresd");
      setProperties(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this property?")) {
        return;
      }

      await axios.delete(`http://localhost:8000/api/residency/deleteresd/${id}`);
      handleLoadData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      if (!selectedId) return alert("No property selected!");

      await axios.patch(
        `http://localhost:8000/api/residency/update/${selectedId}`,
        formData
      );

      setIsmodelOpened(false);
      setFormData({
        title: "",
        description: "",
        delete_time: "",
        country: "",
        city: "",
      });
      setSelectedId(null);
      handleLoadData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full mt-4">
      <table className="w-full bg-white !rounded-xl">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left font-medium text-gray-700">ID</th>
            <th className="px-4 py-3 text-left font-medium text-gray-700">Title</th>
            <th className="px-4 py-3 text-left font-medium text-gray-700">Description</th>
            <th className="px-4 py-3 text-left font-medium text-gray-700">Delete Time</th>
            <th className="px-4 py-3 text-left font-medium text-gray-700">Country</th>
            <th className="px-4 py-3 text-left font-medium text-gray-700">City</th>
            <th className="px-4 py-3 text-left font-medium text-gray-700">Image</th>
            <th className="px-4 py-3 text-left font-medium text-gray-700">Option</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property?._id}>
              <td className="border border-gray-300 px-4 py-2 text-sm">{property?._id}</td>
              <td className="border border-gray-300 px-4 py-2 text-sm">{property?.title}</td>
              <td className="border border-gray-300 px-4 py-2 text-sm">{property?.description}</td>
              <td className="border border-gray-300 px-4 py-2 text-sm">
                {property?.price} Min
              </td>
              <td className="border border-gray-300 px-4 py-2 text-sm">{property?.country}</td>
              <td className="border border-gray-300 px-4 py-2 text-sm">{property?.city}</td>
              <td className="border border-gray-300 px-4 py-2 text-sm">
                {property?.image && (
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-sm">
                <button
                  onClick={() => {
                    setFormData({
                      title: property.title,
                      description: property.description,
                      delete_time: property.price,
                      country: property.country,
                      city: property.city,
                    });
                    setSelectedId(property._id);
                    setIsmodelOpened(true);
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(property?._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        opened={isModelOpened}
        onClose={() => setIsmodelOpened(false)}
        title="Update Property"
        centered
        size="md"
      >
        <div className="flex w-full flex-col gap-2 mt-4">
          <TextInput
            name="title"
            label="Title"
            placeholder="Enter title"
            value={formData.title}
            onChange={handleInputChange}
          />
          <TextInput
            name="description"
            label="Description"
            placeholder="Enter description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <TextInput
            name="delete_time"
            label="Delete time"
            placeholder="Enter delete time"
            value={formData.delete_time}
            onChange={handleInputChange}
          />
          <TextInput
            name="country"
            label="Country"
            placeholder="Enter country"
            value={formData.country}
            onChange={handleInputChange}
          />
          <TextInput
            name="city"
            label="City"
            placeholder="Enter city"
            value={formData.city}
            onChange={handleInputChange}
          />
          <Button color="green" size="md" className="mt-3" onClick={handleUpdate}>
            Submit
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AllPropperties;
