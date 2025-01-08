import Link from "next/link";
import React from "react";
import initialStyle from "./initials.module.css";

const Initials_page = () => {
  return (
    <div className={`${initialStyle.container}`}>
      <h1>Welcome to easy life 👋</h1>
      <Link href={"/add-category"} className={`${initialStyle.links}`}>
        {" "}
        SET YOUR LIMITS
      </Link>
    </div>
  );
};

export default Initials_page;
