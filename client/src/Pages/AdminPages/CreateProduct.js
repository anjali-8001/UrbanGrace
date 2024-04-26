import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import AccountNavbar from "../../Components/AccountNavbar";
import { useAuth } from "../../Contexts/auth";
import axios from "axios";
import toast from "react-hot-toast";
import Select from "react-select";
import "../../Styles/CreateProduct.css";

function CreateProduct() {
  const [auth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [image, setImage] = useState("");

  const categoryOptions = categories.map((category) => ({
    value: category.name,
    label: category.name,
    id: category._id,
  }));

  const subCategoryOptions = subcategories.map((subcategory) => ({
    value: subcategory.name,
    label: subcategory.name,
    id: subcategory._id,
  }));

  const getCategories = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/category/get-categories`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (res?.data.success) {
        setCategories(res.data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  const getSubCategories = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/category/get-subcategories/${selectedCategory.value}`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (res?.data.success) {
        setSubcategories(res.data.subcategories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting subcategories");
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await axios
        .post(
          `${process.env.REACT_APP_API}/product/create-product`,
          {
            name,
            category: selectedCategory.id,
            description,
            price,
            isFeatured,
            image,
            subcategory: selectedSubCategory.id,
          },
          {
            headers: {
              Authorization: auth?.token,
            },
          }
        )
        .catch(async (error) => {
          toast.error(error.response.data.message);
        });
      if (res?.data.success) {
        toast.success(res.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setIsFeatured(false);
        setImage("");
        setSelectedCategory(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      getSubCategories();
    }
    console.log(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    console.log(isFeatured);
  }, [isFeatured]);

  return (
    <Layout>
      <AccountNavbar>
        <div className="productContainer">
          <h2>Manage Products</h2>
          <div className="createProductContainer">
            <h3 className="createProductTitle">Add a new Product</h3>
            <form className="createProductForm" onSubmit={onSubmitHandler}>
              <div className="formItem">
                <label> Select Category</label>
                <Select
                  placeholder="Select"
                  onChange={setSelectedCategory}
                  options={categoryOptions}
                  className="formSelect"
                  isSearchable
                  required
                />
              </div>
              <div className="formItem">
                <label> Select sub-category</label>
                <Select
                  placeholder="Select"
                  onChange={setSelectedSubCategory}
                  options={subCategoryOptions}
                  className="formSelect"
                  isDisabled={!selectedCategory}
                  isSearchable
                  required
                />
              </div>
              <div className="formItem">
                <label> Name: </label>
                <input
                  className="formInput"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                ></input>
              </div>
              <div className="formItem">
                <label>Description:</label>
                <input
                  className="formInput"
                  type="text"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></input>
              </div>
              <div className="formItem">
                <label>Price:</label>
                <input
                  className="formInput"
                  type="number"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                ></input>
              </div>
              <div className="formItem">
                <label>Image:</label>
                <input
                  className="formInput"
                  type="file"
                  onChange={handleImage}
                ></input>
              </div>
              <div className="isFeatured">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => {
                    setIsFeatured(e.target.checked);
                  }}
                />
                <label>Will be Featured?</label>
              </div>
              <div className="formItem">
                <button type="submit">Add Product</button>
              </div>
            </form>
          </div>
        </div>
      </AccountNavbar>
    </Layout>
  );
}

export default CreateProduct;
