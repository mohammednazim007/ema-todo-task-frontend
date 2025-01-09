// "use client";
// import { useGetAllCategoryQuery } from "@/app/redux/get-all-category/get-all-category";
// import React, { useEffect, useState } from "react";
// import table from "./table.module.css";
// import { useFilterByCategoryIdQuery } from "@/app/redux/filter-by-category/filter_by_category";

// type PTypes = { category: string; limit: number; categoryId: string };
// type TProduct = {
//   createdAt: string;
//   purpose: string;
//   amount: number;
//   categoryId: string;
//   category: string;
// };

// const Table_contentMain = () => {
//   const { data } = useGetAllCategoryQuery({});
//   const [selectedCategory, setSelectedCategory] = useState<string>("");
//   const [selectedProductId, setSelectedProductId] = useState<string>("");

//   // Fetch filtered data based on selectedProductId
//   const { data: filterData } = useFilterByCategoryIdQuery({
//     id: selectedProductId, // Pass the selected categoryId to the query
//   });

//   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedCategoryValue = e.target.value;
//     setSelectedCategory(selectedCategoryValue);

//     // Find the corresponding categoryId for the selected category
//     const selectedCategoryItem = data?.result?.find(
//       (item: PTypes) => item.category === selectedCategoryValue
//     );
//     console.log("selectedCategoryItem", selectedCategoryItem);

//     if (selectedCategoryItem) {
//       setSelectedProductId(selectedCategoryItem?._id); // Set the categoryId
//     }
//   };

//   useEffect(() => {
//     if (data?.result?.length > 0 && !selectedCategory) {
//       // Set default category and categoryId
//       const defaultCategory = data?.result[0];
//       setSelectedCategory(defaultCategory?.category);
//       setSelectedProductId(defaultCategory?._id);
//     }
//   }, [data, selectedCategory]);
//   console.log("filterData", filterData);

//   return (
//     <div className={table.table_container}>
//       <div className={table.headers}>
//         <h6 className={table.table_heading}>Daily Expenses</h6>
//         {/* Filter expenses */}
//         <div className={table.filter_wrapper}>
//           <select
//             className={table.select}
//             name="category"
//             id="category"
//             value={selectedCategory}
//             onChange={handleCategoryChange}
//           >
//             <option value="" disabled>
//               Select a category
//             </option>
//             {data?.result?.length > 0 ? (
//               data.result.map((item: PTypes, index: number) => (
//                 <option key={index} value={item.category}>
//                   {item.category} - ( Limit : {item.limit} )
//                 </option>
//               ))
//             ) : (
//               <option>Loading...</option>
//             )}
//           </select>
//         </div>
//       </div>

//       {/* Table */}
//       <div className={table.table_wrapper}>
//         <table className={table.responsive_table}>
//           <thead>
//             <tr className={table.table_header}>
//               <th>Date</th>
//               <th>Buy Reason</th>
//               <th>Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filterData?.tasks?.length > 0 ? (
//               filterData?.tasks?.map((items: TProduct, index: number) => (
//                 <tr key={index}>
//                   <td>{items.createdAt}</td>
//                   <td>{items.purpose}</td>
//                   <td>${items.amount}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={3}>No data</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//         <div className={table.price}>
//           Total amount : <strong>{filterData?.totalPrice}</strong>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Table_contentMain;
"use client";
import React, { useEffect, useState } from "react";
import { useGetAllCategoryQuery } from "@/app/redux/get-all-category/get-all-category";
import { useFilterByCategoryIdQuery } from "@/app/redux/filter-by-category/filter_by_category";
import table from "./table.module.css";

type PTypes = { category: string; limit: number; categoryId: string };
type TProduct = {
  createdAt: string;
  purpose: string;
  amount: number;
  categoryId: string;
  category: string;
};

const Table_contentMain = () => {
  const { data } = useGetAllCategoryQuery({});
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProductId, setSelectedProductId] = useState<string>("");

  const { data: filterData } = useFilterByCategoryIdQuery({
    id: selectedProductId,
  });

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryValue = e.target.value;
    setSelectedCategory(selectedCategoryValue);

    const selectedCategoryItem = data?.result?.find(
      (item: PTypes) => item.category === selectedCategoryValue
    );

    if (selectedCategoryItem) {
      setSelectedProductId(selectedCategoryItem?._id);
    }
  };

  useEffect(() => {
    if (data?.result?.length > 0 && !selectedCategory) {
      const defaultCategory = data?.result[0];
      setSelectedCategory(defaultCategory?.category);
      setSelectedProductId(defaultCategory?._id);
    }
  }, [data, selectedCategory]);

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  return (
    <div className={table.table_container}>
      <div className={table.headers}>
        <h6 className={table.table_heading}>Daily Expenses</h6>
        <div className={table.filter_wrapper}>
          <select
            className={table.select}
            name="category"
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="" disabled>
              Select a category
            </option>
            {data?.result?.length > 0 ? (
              data.result.map((item: PTypes, index: number) => (
                <option key={index} value={item.category}>
                  {item.category} - ( Limit : {item.limit} )
                </option>
              ))
            ) : (
              <option>Loading...</option>
            )}
          </select>
        </div>
      </div>

      <div className={table.table_wrapper}>
        <table className={table.responsive_table}>
          <thead>
            <tr className={table.table_header}>
              <th>Date</th>
              <th>Buy Reason</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filterData?.tasks?.length > 0 ? (
              filterData?.tasks?.map((items: TProduct, index: number) => (
                <tr key={index} title={items.purpose}>
                  <td>{items.createdAt}</td>
                  <td>{truncateText(items.purpose, 5)}</td>
                  <td>${items.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>No data</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className={table.price}>
          Total amount : <strong>{filterData?.totalPrice}</strong>
        </div>
      </div>
    </div>
  );
};

export default Table_contentMain;
