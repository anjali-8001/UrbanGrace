import React, { useEffect, useState } from "react";
import "../../Styles/CreateCategory.css";
import Layout from "../../Components/Layout";
import AccountNavbar from "../../Components/AccountNavbar";
import { useAuth } from "../../Contexts/auth";
import toast from "react-hot-toast";
import Select from "react-select";
import axios from "axios";

function CreateCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [auth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState("65b7bd9783502abf27691109");
  const [editedName, setEditedName] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const options = categories.map((category) => ({
    value: category.name,
    label: category.name,
  }));

  const createCategoryHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/category/create-category`,
        {
          name: categoryName,
        },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );

      if (res?.data.success) {
        toast.success(res.data.message);
        getCategories();
      }
      setCategoryName("");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in creating category");
    }
  };

  const createSubCategoryHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/category/create-subcategory`,
        {
          name: subCategory,
          categoryName: selectedOption.value,
        },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );

      if (res?.data.success) {
        toast.success(res.data.message);
        setSubCategory("");
        setSelectedOption(null);
        getCategories();
      }
      setCategoryName("");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in creating sub-category");
    }
  };

  const onUpdateHandler = async (catId) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API}/category/update-category/${catId}`,
        { name: editedName },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (res?.data.success) {
        toast.success(res.data.message);
        setEditId("");
        getCategories();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in updating category");
    }
  };

  const onEditHandler = async (catId) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/category/find-category/${catId}`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (res?.data.success) {
        console.log(res.data.categoryName);
        setEditedName(res.data.categoryName);
        setEditId(catId);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in finding category name");
    }
  };

  const onDeleteHandler = async (catId) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/category/delete-category/${catId}`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (res?.data.success) {
        toast.success(res.data.message);
        getCategories();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in deleting category");
    }
  };

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

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Layout>
      <AccountNavbar>
        <div className="categoryContainer">
          <h2>Manage Categories</h2>
          <div className="createCategoryContainer">
            <h3 className="createCategoryTitle">Add a new category</h3>
            <form
              className="createCategoryForm"
              onSubmit={createCategoryHandler}
            >
              <input
                type="text"
                name="category"
                value={categoryName}
                onChange={(e) => {
                  setCategoryName(e.target.value);
                }}
                placeholder="Enter a new category"
              />
              <button type="submit">Add</button>
            </form>
          </div>
          <div className="createCategoryContainer">
            <h3 className="createCategoryTitle">Add a new sub-category</h3>
            <form
              className="createCategoryForm"
              onSubmit={createSubCategoryHandler}
            >
              <Select
                placeholder="Select a category"
                onChange={setSelectedOption}
                options={options}
                className="formSelect"
                isSearchable
                required
              />
              <input
                type="text"
                name="subCategory"
                value={subCategory}
                onChange={(e) => {
                  setSubCategory(e.target.value);
                }}
                placeholder="Enter a new sub-category"
              />
              <button type="submit">Add</button>
            </form>
          </div>
          <div className="manageCategoryContainer">
            <h3 className="manageCategoryTitle">All categories</h3>
            <div className="allCategoriesContainer">
              <table className="allCategoriesTable">
                <thead>
                  <tr>
                    <th className="categoryName">Name</th>
                    <th className="categoryAction">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((cat) => {
                    if (editId === cat._id) {
                      return (
                        <tr key={cat._id}>
                          <td>
                            <input
                              className="editCategory"
                              type="text"
                              value={editedName}
                              onChange={(e) => {
                                setEditedName(e.target.value);
                              }}
                            />
                          </td>
                          <td>
                            <button
                              className="categoryUpdateButton"
                              onClick={() => {
                                onUpdateHandler(cat._id);
                              }}
                            >
                              Update
                            </button>
                          </td>
                        </tr>
                      );
                    } else {
                      return (
                        <tr key={cat._id}>
                          <td>{cat.name}</td>
                          <td>
                            <button
                              className="categoryEditButton"
                              onClick={() => {
                                onEditHandler(cat._id);
                              }}
                            >
                              Edit
                            </button>
                            {"  "}
                            <button
                              className="categoryDeleteButton"
                              onClick={() => {
                                onDeleteHandler(cat._id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AccountNavbar>
    </Layout>
  );
}

export default CreateCategory;
