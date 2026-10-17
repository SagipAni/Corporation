import { Routes, Route, Navigate } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import NotFound from "./NotFound.jsx";

import Landing from "../pages/public/Landing.jsx";
import Login from "../pages/public/Login.jsx";
import Signup from "../pages/public/Signup.jsx";

import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import ProvisionSeller from "../pages/admin/ProvisionSeller.jsx";
import ListingModeration from "../pages/admin/ListingModeration.jsx";
import PriceMonitoring from "../pages/admin/PriceMonitoring.jsx";
import ReportsDisputes from "../pages/admin/ReportsDisputes.jsx";
import UserManagement from "../pages/admin/UserManagement.jsx";
import SupportOversight from "../pages/admin/SupportOversight.jsx";
import SystemSettings from "../pages/admin/SystemSettings.jsx";

import Profile from "../pages/shared/Profile.jsx";
import Inbox from "../pages/shared/Inbox.jsx";
import HelpCenter from "../pages/shared/HelpCenter.jsx";
import SupportTickets from "../pages/shared/SupportTickets.jsx";
import NewSupportTicket from "../pages/shared/NewSupportTicket.jsx";
import AccountSecurity from "../pages/shared/AccountSecurity.jsx";
import Privacy from "../pages/shared/Privacy.jsx";

import { BuyerDashboard, BuyerBrowse, BuyerProduct, BuyerPriceComparison, BuyerMessages, BuyerOrders, BuyerSaved, BuyerReviews } from "../pages/buyer/BuyerPages.jsx";
import {
  SellerDashboard,
  SellerOrders,
  FarmPlanning,
  InventoryPricing,
  PriceComparison,
  MyListings,
  AddListing,
  ListingPerformance,
  SellerMessages,
  SellerDetails,
} from "../pages/seller/SellerPages.jsx";

// All route definitions live here.
//   Public pages  -> PublicLayout (no sidebar)
//   Shared pages  -> ProtectedRoute (seller, buyer, admin) -> MainLayout
//   Seller pages  -> ProtectedRoute (seller only)          -> MainLayout
//   Buyer pages   -> ProtectedRoute (buyer only)           -> MainLayout
//   Admin pages   -> ProtectedRoute (admin only)           -> MainLayout
function WebsiteRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Shared pages: every logged-in role */}
      <Route
        element={<ProtectedRoute allowedRoles={["seller", "buyer", "admin"]} />}
      >
        <Route element={<MainLayout />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/support-tickets" element={<SupportTickets />} />
          <Route path="/support-tickets/new" element={<NewSupportTicket />} />
          <Route path="/account-security" element={<AccountSecurity />} />
          <Route path="/privacy" element={<Privacy />} />
        </Route>
      </Route>

      {/* Seller pages */}
      <Route element={<ProtectedRoute allowedRoles={["seller"]} />}>
        <Route element={<MainLayout />}>
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/update-details" element={<SellerDetails />} />
          <Route path="/seller/listings" element={<MyListings />} />
          <Route path="/seller/listings/new" element={<AddListing />} />
          <Route
            path="/seller/listings/performance"
            element={<ListingPerformance />}
          />
          <Route path="/seller/messages" element={<SellerMessages />} />
          <Route path="/seller/orders" element={<SellerOrders />} />
          <Route path="/seller/inventory" element={<InventoryPricing />} />
          <Route path="/seller/farm-planning" element={<FarmPlanning />} />
          <Route
            path="/seller/price-comparison"
            element={<PriceComparison />}
          />
          {/* Seller-only services and account settings; buyer/admin routes stay unchanged. */}
          <Route path="/seller/help-center" element={<HelpCenter />} />
          <Route path="/seller/support-tickets" element={<SupportTickets />} />
          <Route
            path="/seller/support-tickets/new"
            element={<NewSupportTicket />}
          />
          <Route
            path="/seller/account-security"
            element={<AccountSecurity />}
          />
          <Route path="/seller/privacy" element={<Privacy />} />
        </Route>
      </Route>

      {/* Buyer pages */}
      <Route element={<ProtectedRoute allowedRoles={["buyer"]} />}>
        <Route element={<MainLayout />}>
          <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
          <Route path="/buyer/browse" element={<BuyerBrowse />} />
          <Route path="/buyer/products/:productId" element={<BuyerProduct />} />
          <Route path="/buyer/messages" element={<BuyerMessages />} />
          <Route path="/buyer/price-comparison" element={<BuyerPriceComparison />} />
          <Route path="/buyer/orders" element={<BuyerOrders />} />
          <Route path="/buyer/saved" element={<BuyerSaved />} />
          <Route path="/buyer/reviews" element={<BuyerReviews />} />
          <Route path="/buyer/roles" element={<BuyerDashboard />} />
          <Route path="/buyer/help-center" element={<HelpCenter />} />
          <Route path="/buyer/support-tickets" element={<SupportTickets />} />
          <Route path="/buyer/support-tickets/new" element={<NewSupportTicket />} />
          <Route path="/buyer/account-security" element={<AccountSecurity />} />
          <Route path="/buyer/privacy" element={<Privacy />} />
        </Route>
      </Route>

      {/* Admin pages */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route element={<MainLayout />}>
          <Route
            path="/admin"
            element={<Navigate to="/admin/dashboard" replace />}
          />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/sellers/new" element={<ProvisionSeller />} />
          <Route path="/admin/listings" element={<ListingModeration />} />
          <Route path="/admin/price-monitoring" element={<PriceMonitoring />} />
          <Route path="/admin/reports" element={<ReportsDisputes />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/support" element={<SupportOversight />} />
          <Route path="/admin/settings" element={<SystemSettings />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
export default WebsiteRoutes;
