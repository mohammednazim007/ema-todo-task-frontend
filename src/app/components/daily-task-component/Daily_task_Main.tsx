// "use client";
// import React, { FormEvent, useState } from "react";
// import styles from "./task.module.css";

// const Daily_task_Main = () => {
//   const [category, setCategory] = useState<string>("");
//   const [expense, setExpense] = useState<number>(0);

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log(e.target);
//   };

//   return (
//     <div className={`${styles.home_container}`}>
//       <div>
//         {/* form  */}
//         <form onSubmit={handleSubmit}>
//           {/* category */}
//           <div>
//             <label className={styles.labels} htmlFor="category">
//               Select category
//             </label>
//             <select
//               name=""
//               id=""
//               className={styles.inputs}
//               onChange={(e) => setCategory(e.target.value)}
//             >
//               <option>Select category</option>
//               <option>Select category</option>
//               <option>Select category</option>
//               <option>Select category</option>
//             </select>
//           </div>

//           {/* limit */}
//           <div>
//             <label className={styles.labels} htmlFor="limit">
//               Enter expense amount
//             </label>
//             <input
//               className={styles.inputs}
//               required
//               type="number"
//               id="expense"
//               name="expense"
//               min={1}
//               placeholder="Enter your expense amount"
//               onChange={(e) => setExpense(Number(e.target.value))}
//             />
//           </div>
//           {/* limit */}
//           <div>
//             <label className={styles.labels} htmlFor="expenseReason">
//               Reason for expense
//             </label>
//             <textarea
//               className={styles.inputs}
//               name="expenseReason"
//               id="expenseReason"
//               cols={30}
//               rows={5}
//             ></textarea>
//           </div>

//           {/* error message */}
//           {/* {error && (
//             <div>
//               <p className={styles.errors}>Error: {getErrorMessage()}</p>
//             </div>
//           )} */}
//           {/* success message */}

//           {/* {isSuccess && (
//             <div>
//               <p className={styles.success}>Task is created successfully!</p>
//             </div>
//           )} */}

//           <button className={styles.buttons} type="submit">
//             submit
//             {/* {isLoading ? "Loading..." : "Submit"} */}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Daily_task_Main;
"use client";
import React, { FormEvent, useState } from "react";
import styles from "./task.module.css";

const Daily_task_Main = () => {
  const [category, setCategory] = useState<string>("");
  const [expense, setExpense] = useState<number>(0);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ category, expense });
  };

  return (
    <div className={styles.home_container}>
      <div>
        {/* form  */}
        <form onSubmit={handleSubmit}>
          {/* category */}
          <div>
            <label className={styles.labels} htmlFor="category">
              Select category
            </label>
            <select
              id="category"
              className={styles.inputs}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select category</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
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
              onChange={(e) => setExpense(Number(e.target.value))}
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
              rows={5}
            ></textarea>
          </div>

          <button className={styles.buttons} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Daily_task_Main;
