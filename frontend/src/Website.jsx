import WebsiteRoutes from "./routes/WebsiteRoutes.jsx";
import { RoleProvider } from "./context/RoleContext.jsx";

export default function Website() {
  return (
    <RoleProvider>
      <WebsiteRoutes />
    </RoleProvider>
  );
}
