"use client";
import React, { useEffect, useState } from "react";
import { useGetAllCategoryQuery } from "@/app/redux/get-all-category/get-all-category";
import { useFilterByCategoryIdQuery } from "@/app/redux/filter-by-category/filter_by_category";
import table from "./table.module.css";
import { useDeletePurchaseItemMutation } from "@/app/redux/delete-purchase-item/deletePurchaseItem";
import Image from "next/image";
import deletes from "@/app/assets/download.jpeg";

type PTypes = {
  category: string;
  limit: number;
  _id: string;
};
type TProduct = {
  createdAt: string;
  purpose: string;
  amount: number;
  categoryId: string;
  category: string;
  _id: string;
};

const Table_contentMain = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProductId, setSelectedProductId] = useState<string>("");

  // Fetch categories
  const { data: categoryData, isLoading: isLoadingCategories } =
    useGetAllCategoryQuery({});

  // Fetch data based on categoryId
  const { data: filterData, isLoading: isLoadingFilter } =
    useFilterByCategoryIdQuery(
      { id: selectedProductId },
      { skip: !selectedProductId } // Skip query if no category is selected
    );

  // delete purchase item mutation with id
  const [deletePurchaseItem, {}] = useDeletePurchaseItemMutation();

  // Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryValue = e.target.value;
    setSelectedCategory(selectedCategoryValue);

    // Find and set the corresponding category ID
    const selectedCategoryItem = categoryData?.result?.find(
      (item: PTypes) => item.category === selectedCategoryValue
    );
    setSelectedProductId(selectedCategoryItem?._id || "");
  };

  // Set default category and ID when categories are loaded
  useEffect(() => {
    if (categoryData?.result?.length > 0 && !selectedCategory) {
      const defaultCategory = categoryData.result[0];
      setSelectedCategory(defaultCategory.category);
      setSelectedProductId(defaultCategory._id);
    }
  }, [categoryData, selectedCategory]);

  // Helper function to truncate text
  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  //   delete handler
  const handleDelete = async (id: string) => {
    if (typeof window !== "undefined") {
      const agreed = window.confirm(
        "Are you sure you want to delete this item?"
      );
      if (!agreed) return;
      await deletePurchaseItem(id);
    }
  };

  return (
    <div className={table.table_container}>
      <div className={table.headers}>
        <h6 className={table.table_heading}>Monthly Expenses</h6>
        <div className={table.filter_wrapper}>
          <select
            className={table.select}
            name="category"
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="" disabled>
              {isLoadingCategories
                ? "Loading categories..."
                : "Select a category"}
            </option>
            {categoryData?.result?.map((item: PTypes, index: number) => (
              <option key={index} value={item.category}>
                {item.category} - ( Limit : {item.limit} )
              </option>
            ))}
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
            {isLoadingFilter ? (
              <tr>
                <td colSpan={3}>Loading data...</td>
              </tr>
            ) : filterData?.tasks?.length > 0 ? (
              filterData?.tasks?.map((item: TProduct, index: number) => (
                <tr key={index} title={item?.purpose || "No purpose"}>
                  <td>{item?.createdAt || "N/A"}</td>
                  <td>{truncateText(item?.purpose || "N/A", 5)}</td>
                  <td className={table.amountDelete}>
                    {item?.amount !== undefined ? `$${item.amount}` : "N/A"}
                    {/* {typeof window !== "undefined" && (
                      <MdOutlineDelete
                        className={table.delete}
                        onClick={() => handleDelete(item?._id || "")}
                      />
                    )} */}
                    <Image
                      src={deletes}
                      width={100}
                      height={100}
                      alt="delete"
                      className={table.delete}
                      onClick={() => handleDelete(item?._id || "")}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>Data not found</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className={table.price}>
          Total amount : <strong>${filterData?.totalPrice || 0}</strong>
        </div>
      </div>
    </div>
  );
};

export default Table_contentMain;
