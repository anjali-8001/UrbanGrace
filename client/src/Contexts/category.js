// import axios from "axios";
// import { createContext, useContext, useEffect, useState } from "react";

// const CategoryContext = createContext();

// const CategoryProvider = ({ children }) => {
//   const [categories, setCategories] = useState();

//   const getCategories = async () => {
//     try {
//       const res = await axios.get(
//         `${process.env.REACT_APP_API}/category/get-categories`
//       );
//       if (res?.data.success) {
//         setCategories(res.data.categories);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getCategories();
//   }, []);

//   return (
//     <CategoryContext.Provider value={[categories, setCategories]}>
//       {children}
//     </CategoryContext.Provider>
//   );
// };

// const useCategory = () => useContext(CategoryContext);

// export { useCategory, CategoryProvider };
