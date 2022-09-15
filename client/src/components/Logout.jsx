import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <button className="log-out-button" onClick={handleClick}>
      Log out
    </button>
  );
}

export default Logout;
