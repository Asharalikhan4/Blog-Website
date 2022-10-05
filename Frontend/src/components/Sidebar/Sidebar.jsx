import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./Sidebar.css";

export default function Sidebar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:3030/images/";
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        {user ? (
          <>
            <img src={PF + user.profilePic} alt="User" />
            <p className="desc">
              {user.description}
            </p>
            <div className="sidebarItem">
              <span className="sidebarTitle">FOLLOW ME</span>
              <div className="sidebarSocial">
                <i className="sidebarIcon fab fa-facebook-square"></i>
                <i className="sidebarIcon fab fa-twitter-square"></i>
                <i className="sidebarIcon fab fa-pinterest-square"></i>
                <i className="sidebarIcon fab fa-instagram-square"></i>
              </div>
            </div>
          </>
        ) : (
          <h3 className="user">No user logged in.</h3>
        )}
      </div>
    </div>
  );
}
