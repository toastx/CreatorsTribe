import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { 
  Edit, 
  Link as LinkIcon, 
  Calendar, 
  MapPin, 
  Globe, 
  Image as ImageIcon, 
  Video, 
  Music, 
  FileText,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Coins,
  ExternalLink,
  Star,
  Zap
} from "lucide-react";
import { pageTransitions } from "@/lib/motion";
import { Navbar } from "@/components/ui/navbar";

// Mock data
const userData = {
  name: "Alex Johnson",
  username: "@alexjohnson",
  bio: "Digital creator | Photographer | Travel enthusiast | Coffee addict ☕",
  location: "San Francisco, CA",
  website: "alexjohnson.design",
  joinDate: "Joined March 2023",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000",
  stats: {
    followers: "12.5K",
    following: "842",
    content: "156",
    likes: "24.7K"
  },
  social: {
    twitter: "@alexjohnson",
    instagram: "@alexjohnson.photo",
    discord: "alexjohnson#1234"
  }
};

const contentItems = [
  {
    id: 1,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000',
    likes: 1245,
    comments: 89,
    title: 'Sunset at the beach',
    isExclusive: false
  },
  {
    id: 2,
    type: 'video',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-woman-taking-photos-of-flowers-close-up-3987-large.mp4',
    likes: 2456,
    comments: 156,
    title: 'Photography Tutorial',
    isExclusive: true
  },
  {
    id: 3,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1511497584788-876bf1112e95?q=80&w=1000',
    likes: 897,
    comments: 42,
    title: 'City Lights',
    isExclusive: false
  },
  {
    id: 4,
    type: 'audio',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    likes: 567,
    comments: 23,
    title: 'Morning Vibes',
    isExclusive: true
  },
  {
    id: 5,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1000',
    likes: 1789,
    comments: 134,
    title: 'Mountain View',
    isExclusive: false
  },
  {
    id: 6,
    type: 'document',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    likes: 321,
    comments: 15,
    title: 'Photography Guide',
    isExclusive: true
  },
];

export default function Profile() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const [stakeAmount, setStakeAmount] = useState('');
  const [isStaking, setIsStaking] = useState(false);
  const [stakeModalOpen, setStakeModalOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { username } = useParams();
  
  // Handle staking to support creator
  const handleStakeToSupport = async () => {
    if (!stakeAmount || isNaN(Number(stakeAmount)) || Number(stakeAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to stake.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsStaking(true);
      // TODO: Implement actual staking logic with smart contract
      // This is a mock implementation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Staking successful!",
        description: `You've successfully staked ${stakeAmount} tokens to support ${userData.name}.`,
        action: (
          <ToastAction altText="View transaction" onClick={() => {
            // TODO: Add transaction explorer URL
            window.open(`https://explorer.flow.com/transaction/0x${Math.random().toString(16).substr(2, 40)}`, '_blank');
          }}>
            <div className="flex items-center">
              <span>View on explorer</span>
              <ExternalLink className="ml-1 h-3 w-3" />
            </div>
          </ToastAction>
        ),
      });
      
      setStakeAmount('');
      setStakeModalOpen(false);
    } catch (error) {
      console.error('Staking failed:', error);
      toast({
        title: "Staking failed",
        description: "There was an error processing your stake. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsStaking(false);
    }
  };
  
  const renderContentIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'audio':
        return <Music className="w-4 h-4" />;
      case 'document':
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransitions}
      className="min-h-screen bg-background"
    >
      <Navbar />
      
      {/* Cover Photo */}
      <div className="h-48 md:h-64 bg-gradient-to-r from-purple-500 to-pink-500 relative">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 h-full flex items-end pb-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-end w-full">
            <div className="relative group">
              <Avatar
                className="h-32 w-32 -mt-16 border-4 border-background cursor-pointer hover:ring-4 hover:ring-primary/20 transition-all duration-200"
                onClick={() => {
                  // Navigate to creator's profile
                  navigate(`/profile/${userData.username.replace('@', '')}`);
                }}
              >
                <AvatarImage src={userData.avatar} />
                <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 -mt-16 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black/50 rounded-full p-2">
                  <ExternalLink className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>

            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <h1 
                className="text-2xl font-bold hover:text-primary cursor-pointer transition-colors"
                onClick={() => navigate(`/profile/${userData.username.replace('@', '')}`)}
              >
                {userData.name}
              </h1>
              <p className="text-muted-foreground">{userData.username}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                <Button
                  variant={isFollowing ? "outline" : "default"}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFollowing(!isFollowing);
                  }}
                  className="flex-1 md:flex-none min-w-[100px]"
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
                <Button
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setStakeModalOpen(true);
                  }}
                  className="flex-1 md:flex-none min-w-[120px]"
                >
                  <Coins className="h-4 w-4 mr-2" />
                  Stake to Support
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="flex-shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-4">{userData.bio}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{userData.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                    <a 
                      href={`https://${userData.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {userData.website}
                    </a>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{userData.joinDate}</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <h4 className="text-sm font-medium mb-3">Social Links</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <span className="w-20 text-muted-foreground">Twitter</span>
                      <a 
                        href={`https://twitter.com/${userData.social.twitter}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {userData.social.twitter}
                      </a>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-20 text-muted-foreground">Instagram</span>
                      <a 
                        href={`https://instagram.com/${userData.social.instagram.replace('@', '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {userData.social.instagram}
                      </a>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-20 text-muted-foreground">Discord</span>
                      <span>{userData.social.discord}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">{userData.stats.followers}</p>
                    <p className="text-sm text-muted-foreground">Followers</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{userData.stats.following}</p>
                    <p className="text-sm text-muted-foreground">Following</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{userData.stats.content}</p>
                    <p className="text-sm text-muted-foreground">Content</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{userData.stats.likes}</p>
                    <p className="text-sm text-muted-foreground">Likes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="content" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="supporters">Supporters</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {contentItems.map((item) => (
                    <Card key={item.id} className="group relative overflow-hidden">
                      <div className="aspect-square bg-muted/50 relative">
                        {item.type === 'image' && (
                          <img 
                            src={item.url} 
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                        {item.type === 'video' && (
                          <video 
                            src={item.url}
                            className="w-full h-full object-cover"
                            controls
                          />
                        )}
                        {item.type === 'audio' && (
                          <div className="w-full h-full flex items-center justify-center bg-muted">
                            <Music className="h-12 w-12 text-muted-foreground" />
                          </div>
                        )}
                        {item.type === 'document' && (
                          <div className="w-full h-full flex items-center justify-center bg-muted">
                            <FileText className="h-12 w-12 text-muted-foreground" />
                          </div>
                        )}
                        
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                          <button className="text-white hover:text-primary transition-colors">
                            <Heart className="h-5 w-5" />
                          </button>
                          <button className="text-white hover:text-primary transition-colors">
                            <MessageCircle className="h-5 w-5" />
                          </button>
                          <button className="text-white hover:text-primary transition-colors">
                            <Share2 className="h-5 w-5" />
                          </button>
                        </div>
                        
                        {item.isExclusive && (
                          <div className="absolute top-2 right-2">
                            <Badge variant="secondary" className="flex items-center">
                              <Star className="h-3 w-3 mr-1" />
                              <span>Exclusive</span>
                            </Badge>
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium line-clamp-1">{item.title}</h3>
                          <div className="flex items-center text-xs text-muted-foreground">
                            {renderContentIcon(item.type)}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              <Heart className="h-3 w-3 mr-1" />
                              <span>{item.likes.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center">
                              <MessageCircle className="h-3 w-3 mr-1" />
                              <span>{item.comments}</span>
                            </div>
                          </div>
                          <Share2 className="h-3 w-3" />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="about" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About {userData.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none">
                      <p className="text-muted-foreground">
                        {userData.bio}
                      </p>
                      <div className="mt-6 space-y-4">
                        <div>
                          <h3 className="font-medium mb-2">Skills & Expertise</h3>
                          <div className="flex flex-wrap gap-2">
                            {['Photography', 'Videography', 'Editing', 'Graphic Design', 'Content Creation'].map((skill) => (
                              <Badge key={skill} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">Equipment</h3>
                          <ul className="list-disc list-inside text-muted-foreground space-y-1">
                            <li>Canon EOS R5</li>
                            <li>Sony A7S III</li>
                            <li>DJI Mavic 3 Pro</li>
                            <li>Adobe Creative Cloud</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="supporters" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Top Supporters</CardTitle>
                      <Button variant="outline" size="sm">
                        <Zap className="h-4 w-4 mr-2" />
                        Support Creator
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      These amazing people are supporting {userData.name}'s work
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map((supporter) => (
                        <div key={supporter} className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={`https://randomuser.me/api/portraits/${supporter % 2 === 0 ? 'women' : 'men'}/${supporter * 10}.jpg`} />
                              <AvatarFallback>U{supporter}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">Supporter {supporter}</p>
                              <p className="text-xs text-muted-foreground">Staked: {(supporter * 250).toLocaleString()} tokens</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="flex items-center">
                            <Star className="h-3 w-3 mr-1 text-yellow-500 fill-yellow-500" />
                            Tier {supporter}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      {/* Stake to Support Modal */}
      {stakeModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-background rounded-lg p-6 w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Stake to Support {userData.name}</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setStakeModalOpen(false)}
                disabled={isStaking}
              >
                ×
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Amount to Stake (tokens)
                </label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  disabled={isStaking}
                  min="0"
                  step="0.1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Your staked tokens will be locked for 30 days.
                </p>
              </div>
              
              <div className="bg-muted/50 p-3 rounded-md">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Your Balance</span>
                  <span>1,250.50 Tokens</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-muted-foreground">APY</span>
                  <span className="text-green-500">5.25%</span>
                </div>
              </div>
              
              <div className="flex gap-3 pt-2">
                <Button 
                  variant="outline" 
                  className="flex-1" 
                  onClick={() => setStakeModalOpen(false)}
                  disabled={isStaking}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1" 
                  onClick={handleStakeToSupport}
                  disabled={isStaking || !stakeAmount}
                >
                  {isStaking ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Coins className="h-4 w-4 mr-2" />
                      Stake Tokens
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
