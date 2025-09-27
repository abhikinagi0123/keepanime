import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
          <>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/10 via-muted/40 to-background mb-6"
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-4 sm:gap-6">
                  <Avatar className="h-16 w-16 sm:h-20 sm:w-20 ring-2 ring-primary/20">
                    <AvatarImage src="" alt={user?.name ?? "User"} />
                    <AvatarFallback className="font-semibold">
                      {String(user?.name ?? user?.email ?? "U")
                        .trim()
                        .slice(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-2xl font-bold truncate">
                        {user?.name ?? "Unnamed User"}
                      </h2>
                      <Badge variant="secondary" className="text-xs">
                        {user?.role ?? "user"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 truncate">
                      {user?.email ?? "No email"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" onClick={signOut} className="w-full sm:w-auto">
                    Sign Out
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="grid grid-cols-1 gap-6"
            >
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Account Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-muted-foreground">User ID</div>
                      <div className="font-medium break-all">
                        {String(user?._id ?? "—")}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Email</div>
                      <div className="font-medium break-all">
                        {user?.email ?? "—"}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Name</div>
                      <div className="font-medium">{user?.name ?? "—"}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Role</div>
                      <div className="font-medium capitalize">
                        {user?.role ?? "user"}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This information is private to your account.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Sign-in Method</span>
                    <span className="font-medium">Email OTP</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your account uses secure one-time passcodes sent to your email for
                    authentication.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}