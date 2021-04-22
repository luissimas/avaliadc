import React from "react";
import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";

import "./style.css";

export default function HomeLink() {
  return (
    <div>
      <Link style={{paddingTop:7}} className="button" to="/">
        <FiHome size={30}/>
      </Link>
    </div>
  );
}
