import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function Profile() {
  const { isAuthenticated, user, signOut } = useAuth();

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold">Your Profile</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            View your account details.
          </p>
        </motion.div>

        {!isAuthenticated ? (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Sign in required</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                You need to sign in to view your profile.
              </p>
              <Link to="/auth">
                <Button>Go to Sign In</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Account
                <Badge variant="secondary" className="text-xs">
                  {user?.role ?? "user"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-muted-foreground">User ID</div>
                  <div className="font-medium break-all">{String(user?._id ?? "—")}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Email</div>
                  <div className="font-medium break-all">{user?.email ?? "—"}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Name</div>
                  <div className="font-medium">{user?.name ?? "—"}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Role</div>
                  <div className="font-medium capitalize">{user?.role ?? "user"}</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                This page will be expanded with order history and account settings.
              </p>
              <Button variant="outline" onClick={signOut}>
                Sign Out
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
}