import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UnifiedWalletConnect from "@/components/UnifiedWalletConnect";
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Unlock, 
  Plus, 
  Upload, 
  Gift, 
  Briefcase,
  ArrowUpRight,
  DollarSign,
  Target,
  Zap
} from "lucide-react";
import { pageTransitions, staggerContainer, staggerItem, cardHover } from "@/lib/motion";
import { Navbar } from "@/components/ui/navbar";
import { Link } from "react-router-dom";

// Mock data
const kpiData = [
  {
    title: "Token Holders",
    value: "2,847",
    change: "+12.3%",
    icon: Users,
    trend: "up",
    color: "creator"
  },
  {
    title: "Monthly Earnings",
    value: "$8,245",
    change: "+24.7%", 
    icon: DollarSign,
    trend: "up",
    color: "success"
  },
  {
    title: "Content Views",
    value: "156.2K",
    change: "+8.9%",
    icon: Eye,
    trend: "up",
    color: "primary"
  },
  {
    title: "Unlock Rate",
    value: "94.2%",
    change: "+2.1%",
    icon: Unlock,
    trend: "up",
    color: "success"
  }
];

const quickActions = [
  {
    title: "Mint New Token",
    description: "Create additional tokens for special releases",
    icon: Plus,
    color: "creator",
    href: "/mint"
  },
  {
    title: "Upload Content",
    description: "Share new exclusive content with your community",
    icon: Upload,
    color: "primary",
    href: "/content/new"
  },
  {
    title: "Create Drop",
    description: "Launch an access drop for limited content",
    icon: Gift,
    color: "success",
    href: "/drops"
  },
  {
    title: "Brand Requests",
    description: "View and manage collaboration opportunities",
    icon: Briefcase,
    color: "primary",
    href: "/brand"
  }
];

const recentActivity = [
  {
    action: "New token holder",
    user: "@alexart",
    tokens: "50 SARAH",
    time: "2 minutes ago",
    type: "holder"
  },
  {
    action: "Content unlocked",
    user: "@musiclover",
    content: "Behind the Scenes #24",
    time: "5 minutes ago", 
    type: "unlock"
  },
  {
    action: "Brand inquiry",
    user: "TechBrand Co",
    message: "Collaboration opportunity",
    time: "1 hour ago",
    type: "brand"
  },
  {
    action: "New subscriber",
    user: "@designfan",
    tier: "Premium",
    time: "2 hours ago",
    type: "subscriber"
  }
];

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");

  return (
    <>
      <Navbar />
      <motion.div
        variants={pageTransitions}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen bg-background"
      >
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="mb-8"
          >
            <motion.div variants={staggerItem} className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah! 👋</h1>
                <p className="text-muted-foreground">Here's what's happening with your creator token today.</p>
              </div>
              <div className="flex items-center space-x-3 mt-4 md:mt-0">
                <UnifiedWalletConnect />
                <Badge className="bg-creator/10 text-creator border-creator/20">
                  <Zap className="w-3 h-3 mr-1" />
                  Premium Creator
                </Badge>
                <Badge variant="outline">SARAH Token</Badge>
              </div>
            </motion.div>

            {/* Quick Stats Grid */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            >
              {kpiData.map((kpi, index) => {
                const Icon = kpi.icon;
                return (
                  <motion.div
                    key={kpi.title}
                    variants={staggerItem}
                    whileHover="hover"
                    initial="rest"
                  >
                    <motion.div variants={cardHover}>
                      <Card className="card-interactive">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <Icon className={`w-5 h-5 text-${kpi.color}`} />
                            <Badge variant="secondary" className="text-xs">
                              {kpi.change}
                              <ArrowUpRight className="w-3 h-3 ml-1" />
                            </Badge>
                          </div>
                          <div className="text-2xl font-bold mb-1">{kpi.value}</div>
                          <div className="text-sm text-muted-foreground">{kpi.title}</div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Dashboard */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Actions */}
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                <motion.h2 variants={staggerItem} className="text-xl font-semibold mb-4">
                  Quick Actions
                </motion.h2>
                <motion.div
                  variants={staggerContainer}
                  className="grid md:grid-cols-2 gap-4"
                >
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <motion.div
                        key={action.title}
                        variants={staggerItem}
                        whileHover="hover"
                        initial="rest"
                      >
                        <Link to={action.href}>
                          <motion.div variants={cardHover}>
                            <Card className="card-interactive cursor-pointer">
                              <CardContent className="p-6">
                                <div className="flex items-start space-x-4">
                                  <div className={`w-10 h-10 bg-gradient-${action.color} rounded-lg flex items-center justify-center`}>
                                    <Icon className="w-5 h-5 text-white" />
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="font-semibold mb-1">{action.title}</h3>
                                    <p className="text-sm text-muted-foreground">{action.description}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>

              {/* Performance Tabs */}
              <motion.div
                variants={staggerItem}
                initial="initial"
                animate="animate"
              >
                <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="earnings">Earnings</TabsTrigger>
                    <TabsTrigger value="community">Community</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-6">
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <TrendingUp className="w-5 h-5 mr-2" />
                            Performance Overview
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium">Token Distribution</span>
                                <span className="text-sm text-muted-foreground">78%</span>
                              </div>
                              <Progress value={78} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium">Community Engagement</span>
                                <span className="text-sm text-muted-foreground">92%</span>
                              </div>
                              <Progress value={92} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium">Content Unlock Rate</span>
                                <span className="text-sm text-muted-foreground">85%</span>
                              </div>
                              <Progress value={85} className="h-2" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="earnings" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Earnings Breakdown</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                            <span>Token Sales</span>
                            <span className="font-semibold">$4,250</span>
                          </div>
                          <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                            <span>Content Unlocks</span>
                            <span className="font-semibold">$2,680</span>
                          </div>
                          <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                            <span>Brand Collaborations</span>
                            <span className="font-semibold">$1,315</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="community" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Community Growth</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 bg-muted rounded-lg">
                            <div className="text-2xl font-bold text-creator">2,847</div>
                            <div className="text-sm text-muted-foreground">Token Holders</div>
                          </div>
                          <div className="text-center p-4 bg-muted rounded-lg">
                            <div className="text-2xl font-bold text-success">94.2%</div>
                            <div className="text-sm text-muted-foreground">Retention Rate</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>

            {/* Right Column - Activity Feed */}
            <div className="space-y-6">
              <motion.div
                variants={staggerItem}
                initial="initial"
                animate="animate"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            activity.type === 'holder' ? 'bg-creator' :
                            activity.type === 'unlock' ? 'bg-primary' :
                            activity.type === 'brand' ? 'bg-success' :
                            'bg-muted-foreground'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm">
                              <span className="font-medium">{activity.action}</span>
                              {' by '}
                              <span className="text-primary">{activity.user}</span>
                            </p>
                            {activity.tokens && (
                              <p className="text-xs text-muted-foreground">{activity.tokens}</p>
                            )}
                            {activity.content && (
                              <p className="text-xs text-muted-foreground">{activity.content}</p>
                            )}
                            {activity.message && (
                              <p className="text-xs text-muted-foreground">{activity.message}</p>
                            )}
                            {activity.tier && (
                              <p className="text-xs text-muted-foreground">{activity.tier} tier</p>
                            )}
                            <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Token Info */}
              <motion.div
                variants={staggerItem}
                initial="initial"
                animate="animate"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">SARAH Token</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Total Supply</span>
                        <span className="text-sm font-medium">10,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Circulating</span>
                        <span className="text-sm font-medium">7,823</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Current Price</span>
                        <span className="text-sm font-medium">$2.89</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Market Cap</span>
                        <span className="text-sm font-medium">$22,588</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}