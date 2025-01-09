"use client";
import React, { FormEvent, useEffect, useState } from "react";
import styles from "./task.module.css";
import { useGetAllCategoryQuery } from "@/app/redux/get-all-category/get-all-category";
import { useCreateDailyExpenseMutation } from "@/app/redux/create-daily-expense/create_daily_expense";
import Table_contentMain from "../table-contantMain/Table_contentMain";

const Daily_task_Main = () => {
  const [category, setCategory] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const { data } = useGetAllCategoryQuery({});
  const [createDailyExpense, { error, isLoading, isSuccess }] =
    useCreateDailyExpenseMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createDailyExpense({
      category,
      purpose,
      amount,
    });
  };

  // get error message
  const getErrorMessage = () => {
    if (error && "data" in error) {
      // Narrowed to FetchBaseQueryError
      return (
        (error as { data?: { message?: string } }).data?.message ||
        "An error occurred"
      );
    }
    return "An unknown error occurred";
  };

  useEffect(() => {
    if (data?.result?.length > 0 && !category) {
      setCategory(data.result[0].category); // Set to the first category in the list as default.
    }
  }, [data, category]);

  return (
    <div className={styles.home_container}>
      <div>
        {/* form  */}
        <form onSubmit={handleSubmit}>
          <h1 className={styles.heading}>Make daily expense</h1>
          {/* category */}
          <div>
            <label className={styles.labels} htmlFor="category">
              Select category
            </label>

            <select
              id="category"
              className={styles.inputs}
              required
              value={category} // Ensure controlled component
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>
                Select a category
              </option>
              {data?.result?.length > 0 ? (
                data?.result?.map(
                  (
                    item: { category: string; limit: number },
                    index: number
                  ) => (
                    <option key={index} value={item.category}>
                      {item.category}
                    </option>
                  )
                )
              ) : (
                <option>Loading...</option>
              )}
            </select>
          </div>

          {/* limit */}
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

          {/* reason */}
          <div>
            <label className={styles.labels} htmlFor="expenseReason">
              Reason for expense
            </label>
            <textarea
              className={styles.inputs}
              name="expenseReason"
              id="expenseReason"
              cols={30}
              rows={3}
              onChange={(e) => setPurpose(e.target.value)}
              required
            ></textarea>
          </div>

          {/* {isSuccess && <p>Success</p>} */}
          {isSuccess && (
            <p className={styles.success}>Product is bought successfully </p>
          )}
          {/* {error && <p>{error}</p>} */}
          {error && <p className={styles.errors}>{getErrorMessage()}</p>}

          <button className={styles.buttons} type="submit">
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>

      {/* table content */}
      <Table_contentMain />
    </div>
  );
};

export default Daily_task_Main;
