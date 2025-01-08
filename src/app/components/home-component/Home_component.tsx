"use client";
import { FormEvent, useState } from "react";
import styles from "./home.module.css";
import { useCreateCategoryMutation } from "@/app/redux/create-category/create_category";

const Home_component = () => {
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState(0);
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createCategory({ category, limit: Number(limit) });
    console.log({ category, limit });
  };

  if (isLoading) return <div className={styles.loading}>Loading...</div>;

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

          <button className={styles.buttons} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home_component;
