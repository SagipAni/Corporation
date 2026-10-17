import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="not-found">
      <h1>Page not found</h1>
      <Link to="/">Back to home</Link>
    </main>
  );
}

export default NotFound;
