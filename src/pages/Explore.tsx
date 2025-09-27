import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Users, 
  Star, 
  Play,
  Heart,
  MessageCircle,
  Share
} from "lucide-react";
import { pageTransitions, staggerContainer, staggerItem, cardHover } from "@/lib/motion";
import { Navbar } from "@/components/ui/navbar";

// Mock creator data
const creators = [
  {
    id: 1,
    name: "Sarah Chen",
    username: "@sarahcreates",
    avatar: "🎨",
    bio: "Digital artist creating unique NFT collections and exclusive tutorials",
    tokenSymbol: "SARAH",
    tokenPrice: "$2.89",
    holders: "2.8K",
    contentCount: "124",
    category: "Art",
    verified: true,
    trending: true,
    tags: ["Digital Art", "NFTs", "Tutorials"],
    backgroundGradient: "from-pink-500 to-purple-600"
  },
  {
    id: 2,
    name: "Alex Rivera",
    username: "@alexbeats",
    avatar: "🎵",
    bio: "Music producer sharing beats, behind-the-scenes content, and collabs",
    tokenSymbol: "ALEX", 
    tokenPrice: "$1.45",
    holders: "1.9K",
    contentCount: "89",
    category: "Music",
    verified: true,
    trending: false,
    tags: ["Hip Hop", "Production", "Beats"],
    backgroundGradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    name: "Maya Patel",
    username: "@mayaphoto",
    avatar: "📸",
    bio: "Photographer capturing life's beautiful moments and sharing editing tips",
    tokenSymbol: "MAYA",
    tokenPrice: "$3.21",
    holders: "3.2K",
    contentCount: "156",
    category: "Photography",
    verified: true,
    trending: true,
    tags: ["Photography", "Editing", "Travel"],
    backgroundGradient: "from-green-500 to-emerald-500"
  },
  {
    id: 4,
    name: "Jordan Kim",
    username: "@jordanfilms",
    avatar: "🎬",
    bio: "Filmmaker creating documentary content and film education",
    tokenSymbol: "JORDAN",
    tokenPrice: "$2.67",
    holders: "2.1K",
    contentCount: "78",
    category: "Film",
    verified: false,
    trending: false,
    tags: ["Documentary", "Education", "Cinema"],
    backgroundGradient: "from-orange-500 to-red-500"
  },
  {
    id: 5,
    name: "Lisa Zhang",
    username: "@lisacodes",
    avatar: "💻",
    bio: "Software developer teaching coding and sharing tech insights",
    tokenSymbol: "LISA",
    tokenPrice: "$4.12",
    holders: "4.1K",
    contentCount: "203",
    category: "Tech",
    verified: true,
    trending: true,
    tags: ["Coding", "Web Dev", "AI"],
    backgroundGradient: "from-violet-500 to-purple-500"
  },
  {
    id: 6,
    name: "Marcus Rodriguez",
    username: "@marcusfits",
    avatar: "💪",
    bio: "Fitness coach sharing workout routines and nutrition advice",
    tokenSymbol: "MARCUS",
    tokenPrice: "$1.89",
    holders: "1.7K",
    contentCount: "167",
    category: "Fitness",
    verified: true,
    trending: false,
    tags: ["Fitness", "Nutrition", "Wellness"],
    backgroundGradient: "from-red-500 to-pink-500"
  }
];

const categories = ["All", "Art", "Music", "Photography", "Film", "Tech", "Fitness", "Gaming", "Fashion"];

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showTrendingOnly, setShowTrendingOnly] = useState(false);

  const filteredCreators = creators.filter(creator => {
    const matchesSearch = creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         creator.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         creator.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || creator.category === selectedCategory;
    const matchesTrending = !showTrendingOnly || creator.trending;
    
    return matchesSearch && matchesCategory && matchesTrending;
  });

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
            <motion.div variants={staggerItem} className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Discover <span className="text-gradient-creator">Amazing Creators</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore talented creators, discover exclusive content, and support your favorites with their tokens.
              </p>
            </motion.div>

            {/* Search and Filters */}
            <motion.div variants={staggerItem} className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search creators, categories, or content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={showTrendingOnly ? "default" : "outline"}
                  onClick={() => setShowTrendingOnly(!showTrendingOnly)}
                  className="whitespace-nowrap"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Trending
                </Button>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </motion.div>

            {/* Category Tabs */}
            <motion.div variants={staggerItem} className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </motion.div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            variants={staggerItem}
            initial="initial"
            animate="animate"
            className="mb-6"
          >
            <p className="text-sm text-muted-foreground">
              Showing {filteredCreators.length} creators
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
              {showTrendingOnly && " (trending only)"}
            </p>
          </motion.div>

          {/* Creators Grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCreators.map((creator, index) => (
              <motion.div
                key={creator.id}
                variants={staggerItem}
                whileHover="hover"
                initial="rest"
              >
                <motion.div variants={cardHover}>
                  <Card className="card-interactive overflow-hidden">
                    {/* Header with gradient background */}
                    <div className={`h-24 bg-gradient-to-r ${creator.backgroundGradient} relative`}>
                      {creator.trending && (
                        <Badge className="absolute top-3 right-3 bg-white/20 text-white border-white/30">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>

                    <CardContent className="p-6 -mt-8 relative">
                      {/* Avatar */}
                      <div className="w-16 h-16 bg-gradient-creator rounded-full flex items-center justify-center text-2xl mb-4 border-4 border-background shadow-lg relative">
                        {creator.avatar}
                        {creator.verified && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full border-2 border-background flex items-center justify-center">
                            <Star className="w-3 h-3 text-white fill-current" />
                          </div>
                        )}
                      </div>

                      {/* Creator Info */}
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-lg">{creator.name}</h3>
                          <p className="text-sm text-muted-foreground">{creator.username}</p>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {creator.bio}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {creator.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-3 py-3 border-t border-border">
                          <div className="text-center">
                            <div className="text-sm font-semibold">{creator.holders}</div>
                            <div className="text-xs text-muted-foreground">Holders</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-semibold">{creator.contentCount}</div>
                            <div className="text-xs text-muted-foreground">Content</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-semibold">{creator.tokenPrice}</div>
                            <div className="text-xs text-muted-foreground">Token</div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <Users className="w-4 h-4 mr-2" />
                            Follow
                          </Button>
                          <Button size="sm" variant="outline">
                            <Play className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Load More */}
          <motion.div
            variants={staggerItem}
            initial="initial"
            animate="animate"
            className="text-center mt-12"
          >
            <Button variant="outline" size="lg">
              Load More Creators
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}