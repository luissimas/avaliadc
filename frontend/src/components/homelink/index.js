import React from "react";
import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";

export default function HomeLink() {
  return (
    <div>
      <Link style={{paddingTop:6}} className="button" to="/">
        <FiHome size={30}/>
      </Link>
    </div>
  );
}
