import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // return children;
  // 1.check the the authentication of the user
  const { isAuthenticated, isLoading } = useUser();
  // 3. if not authenticated redirect to the login
  // useEffect(
  //   function () {
  if (!isLoading && !isAuthenticated) navigate("/login");
  //   },
  //   [isLoading, isAuthenticated, navigate],
  // );
  // 2. make a spinner while checking
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. if authenticated return the children
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
