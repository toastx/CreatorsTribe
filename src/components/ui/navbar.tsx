import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Search, 
  Upload, 
  Users, 
  Briefcase, 
  Gift, 
  Menu, 
  X,
  Wallet,
  User
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Explore", href: "/explore", icon: Search },
  { name: "Content", href: "/content", icon: Upload },
  { name: "Collab", href: "/collab", icon: Users },
  { name: "Brands", href: "/brand", icon: Briefcase },
  { name: "Drops", href: "/drops", icon: Gift },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="w-full max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">

            {/* Navigation Links */}
            <div className="flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.name} to={item.href}>
                    <Button
                      variant={isActive(item.href) ? "default" : "ghost"}
                      size="sm"
                      className="relative h-10"
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.name}
                      {isActive(item.href) && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-primary rounded-md -z-10"
                          transition={{ type: "spring", duration: 0.4 }}
                        />
                      )}
                    </Button>
                  </Link>
                );
              })}
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="text-xs">
                <Wallet className="w-3 h-3 mr-1" />
                1,247 SOCIAL
              </Badge>
              <Button size="sm" variant="outline">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border bg-background"
          >
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      variant={isActive(item.href) ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">
                    <Wallet className="w-3 h-3 mr-1" />
                    1,247 SOCIAL
                  </Badge>
                  <Button size="sm" variant="outline">
                    Profile
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border">
        <div className="flex items-center justify-around py-2">
          {navigation.slice(0, 5).map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.name} to={item.href} className="flex-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`w-full flex-col h-auto py-2 ${
                    isActive(item.href) ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4 mb-1" />
                  <span className="text-xs">{item.name}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Spacer for fixed navigation */}
      <div className="h-16 md:h-20" />
    </>
  );
}