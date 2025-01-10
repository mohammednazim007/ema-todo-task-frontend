"use client";
import React, { useEffect, useState } from "react";
import styles from "./display.module.css";
import { useGetAllCategoryQuery } from "@/app/redux/get-all-category/get-all-category";
import { useUpdateCategoryMutation } from "@/app/redux/update-single-category/update-category";

type CType = {
  _id: string;
  createdAt: string;
  category: string;
  limit: number;
};

const DisplayCategory = () => {
  const [category, setCategory] = useState<string>(""); // Original category
  const [categoryId, setCategoryId] = useState<string | undefined>(); // ID of the original category
  const [newCategory, setNewCategory] = useState<string>(""); // New category to update

  const [amount, setAmount] = useState<number>(0); // Expense amount

  const { data } = useGetAllCategoryQuery({});
  const [
    updateCategory,
    { error: updateError, isLoading: isUpdating, isSuccess: isUpdated },
  ] = useUpdateCategoryMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const obj = { category: newCategory, limit: amount, categoryId };
    await updateCategory(obj);
  };

  const getErrorMessage = () => {
    if (updateError && "data" in updateError) {
      return (
        (updateError as { data?: { message?: string } }).data?.message ||
        "An error occurred"
      );
    }
    return "An unknown error occurred";
  };

  // Populate the category dropdown with the first category as default
  useEffect(() => {
    if (data?.result?.length > 0 && !category) {
      setCategory(data.result[0].category);
      setCategoryId(data.result[0]._id); // Default to the first category ID
      setNewCategory(data.result[0].category); // Set newCategory default
    }
  }, [data, category]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    // Update the categoryId based on the selected category
    const selectedItem = data?.result?.find(
      (item: CType) => item.category === selectedCategory
    );
    setCategoryId(selectedItem?._id);
    setNewCategory(selectedCategory);
  };

  return (
    <div>
      <div>
        {/* form */}
        <form onSubmit={handleSubmit}>
          <h1 className={styles.heading}>Update limit of expense</h1>

          {/* Original category */}
          <div>
            <label className={styles.labels} htmlFor="category">
              Select category to update
            </label>

            <select
              id="category"
              className={styles.inputs}
              required
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="" disabled>
                Select a category
              </option>
              {data?.result?.length > 0 ? (
                data.result.map((item: CType) => (
                  <option key={item._id} value={item.category}>
                    {item.category}
                  </option>
                ))
              ) : (
                <option>Loading...</option>
              )}
            </select>
          </div>

          {/* New category (Editable) */}
          <div>
            <label className={styles.labels} htmlFor="newCategory">
              Enter or select new category
            </label>
            <input
              id="newCategory"
              className={styles.inputs}
              list="categories"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Type or select a category"
              required
            />
            <datalist id="categories">
              {data?.result?.length > 0 &&
                data.result.map((item: CType) => (
                  <option key={item._id} value={item.category} />
                ))}
            </datalist>
          </div>

          {/* Expense amount */}
          <div>
            <label className={styles.labels} htmlFor="expense">
              Enter expense amount
            </label>
            <input
              className={styles.inputs}
              required
              type="number"
              id="expense"
              name="expense"
              min={1}
              placeholder="Enter your expense amount"
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>

          {/* Success or error message */}
          {isUpdated && (
            <p className={styles.success}>Update submitted successfully</p>
          )}
          {updateError && <p className={styles.errors}>{getErrorMessage()}</p>}

          <div className={styles.doubleBtn}>
            <button className={styles.buttons} type="submit">
              {isUpdating ? "Updating..." : "Update now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DisplayCategory;
