import { useParams } from "react-router-dom";
import "./UserDetailPage.css";

const UserDetailPage = () => {
  const userId = useParams();

  return (
    <div>
      <div className="bp-line-break"></div>
      <div className="user-detail-container"></div>
    </div>
  )
}

export default UserDetailPage;