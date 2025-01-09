"use client";
import { FormEvent, useState } from "react";
import styles from "./home.module.css";
import Link from "next/link";
import { useCreateCategoryMutation } from "@/app/redux/create-category/create_category";

const Home_component = () => {
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState(0);
  const [createCategory, { isLoading, error, isSuccess }] =
    useCreateCategoryMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createCategory({ category, limit: Number(limit) });
  };

  // // Type guard for FetchBaseQueryError
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

  return (
    <div className={`${styles.home_container}`}>
      <div>
        {/* form  */}
        <form onSubmit={handleSubmit}>
          {/* category */}
          <div>
            <label className={styles.labels} htmlFor="category">
              Enter category name
            </label>
            <input
              className={styles.inputs}
              required
              type="text"
              id="category"
              name="category"
              placeholder="Enter your name"
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          {/* limit */}
          <div>
            <label className={styles.labels} htmlFor="limit">
              Enter limit of amount
            </label>
            <input
              className={styles.inputs}
              required
              type="number"
              id="limit"
              name="limit"
              min={1}
              placeholder="Enter your limit"
              onChange={(e) => setLimit(Number(e.target.value))}
            />
          </div>

          {/* error message */}
          {error && (
            <div>
              <p className={styles.errors}>Error: {getErrorMessage()}</p>
            </div>
          )}
          {/* success message */}

          {isSuccess && (
            <div>
              <p className={styles.success}>Task is created successfully!</p>
            </div>
          )}

          <div className={styles.buttonsGroup}>
            <button className={styles.buttons} type="submit">
              {isLoading ? "Loading..." : "Submit"}
            </button>

            <Link href={"/create-daily-task"} className={styles.buttons}>
              Buy product
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home_component;
