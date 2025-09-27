import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Zap, 
  Users, 
  TrendingUp, 
  Shield, 
  Sparkles,
  Play,
  Star,
  DollarSign,
  Rocket,
  Bolt,
  Eye,
  Crown
} from "lucide-react";
import { 
  pageTransitions, 
  staggerContainer, 
  staggerItem, 
  fadeInUp,
  cardHover 
} from "@/lib/motion";
import { FloatingElements, ParticleField, CyberGrid, HolographicOverlay } from "@/components/HeroVisuals";

// Mock data for animations
const stats = [
  { label: "Active Creators", value: "12.5K", icon: Users },
  { label: "Total Earnings", value: "$2.4M", icon: DollarSign },
  { label: "Content Pieces", value: "847K", icon: Play },
  { label: "Success Rate", value: "94%", icon: TrendingUp },
];

const creators = [
  { name: "Sarah Chen", avatar: "🎨", tokens: "2.4K", followers: "89K" },
  { name: "Alex Rivera", avatar: "🎵", tokens: "1.8K", followers: "67K" },
  { name: "Maya Patel", avatar: "📸", tokens: "3.1K", followers: "125K" },
  { name: "Jordan Kim", avatar: "🎬", tokens: "2.7K", followers: "98K" },
];

const testimonials = [
  {
    name: "Emma Johnson",
    role: "Digital Artist",
    content: "Finally, a platform where my fans can truly support my work. Token-gated content changed everything.",
    rating: 5
  },
  {
    name: "Marcus Rodriguez", 
    role: "Music Producer",
    content: "The collaboration features helped me connect with brands I never thought would notice me.",
    rating: 5
  },
  {
    name: "Lisa Zhang",
    role: "Content Creator", 
    content: "My earnings increased 300% in the first month. The community here is incredible.",
    rating: 5
  }
];

export default function Landing() {
  return (
    <motion.div
      variants={pageTransitions}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen"
    >
      {/* ULTIMATE Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-mesh">
        <CyberGrid />
        <HolographicOverlay />
        <FloatingElements />
        <ParticleField />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-32 min-h-screen flex items-center">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="text-center space-y-12 w-full"
          >
            {/* NEON Badge */}
            <motion.div variants={staggerItem} className="flex justify-center">
              <Badge className="bg-primary/20 text-primary border-primary/40 px-6 py-3 text-lg shadow-glow backdrop-blur-sm cyber-blink">
                <Sparkles className="w-5 h-5 mr-2 animate-neon-pulse" />
                ENTER THE CREATOR METAVERSE
              </Badge>
            </motion.div>

            {/* HOLOGRAPHIC Headline */}
            <motion.div variants={staggerItem} className="space-y-8">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight">
                <motion.span 
                  className="text-holographic block"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  CREATE
                </motion.span>
                <motion.span 
                  className="text-gradient-creator block"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  DOMINATE
                </motion.span>
                <motion.span 
                  className="text-gradient-primary block"
                  animate={{ 
                    textShadow: [
                      "0 0 20px hsl(var(--primary))",
                      "0 0 40px hsl(var(--primary))",
                      "0 0 20px hsl(var(--primary))"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  TRANSCEND
                </motion.span>
              </h1>
              <motion.p 
                className="text-xl md:text-2xl text-foreground/80 max-w-4xl mx-auto leading-relaxed font-medium"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Launch your quantum creator token, unleash exclusive content, forge brand alliances, 
                and build an unstoppable community in the new digital economy.
              </motion.p>
            </motion.div>

            {/* PLASMA CTA Buttons */}
            <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/dashboard">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" className="button-glow group bg-gradient-primary hover:shadow-large text-lg px-8 py-4 relative overflow-hidden">
                    <Rocket className="w-5 h-5 mr-2 animate-bounce-gentle" />
                    LAUNCH TOKEN
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  </Button>
                </motion.div>
              </Link>
              <Link to="/explore">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" variant="outline" className="bg-background/10 backdrop-blur-md border-primary/40 text-lg px-8 py-4 hover:bg-primary/10 hover:shadow-glow">
                    <Eye className="w-5 h-5 mr-2" />
                    EXPLORE MATRIX
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* LEVITATING Creator Avatars */}
            <motion.div 
              variants={staggerItem}
              className="flex justify-center items-center space-x-6 pt-12"
            >
              {creators.map((creator, index) => (
                <motion.div
                  key={creator.name}
                  initial={{ opacity: 0, scale: 0.5, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    delay: 1.2 + index * 0.15,
                    type: "spring",
                    stiffness: 200,
                    damping: 10
                  }}
                  className="relative group cursor-pointer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                >
                  <motion.div 
                    className="w-16 h-16 md:w-20 md:h-20 bg-gradient-creator rounded-2xl flex items-center justify-center text-2xl md:text-3xl shadow-large relative"
                    animate={{
                      y: [0, -8, 0],
                      rotateY: [0, 180, 360],
                    }}
                    transition={{
                      y: { duration: 3, repeat: Infinity, delay: index * 0.5 },
                      rotateY: { duration: 6, repeat: Infinity, delay: index * 0.5 }
                    }}
                  >
                    {creator.avatar}
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-30 rounded-2xl transition-opacity duration-300" />
                  </motion.div>
                  <motion.div 
                    className="absolute -top-3 -right-3 w-8 h-8 bg-success rounded-full border-3 border-background flex items-center justify-center shadow-glow"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      boxShadow: [
                        "0 0 20px hsl(var(--success))",
                        "0 0 40px hsl(var(--success))",
                        "0 0 20px hsl(var(--success))"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    <Crown className="w-4 h-4 text-black" />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        
        {/* Energy burst on scroll */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, -10, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Bolt className="w-8 h-8 text-primary animate-neon-pulse" />
        </motion.div>
      </section>

      {/* QUANTUM Stats Section */}
      <section className="py-20 bg-card-elevated relative overflow-hidden">
        <div className="absolute inset-0 particle-field" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={staggerItem}
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <Card className="p-8 card-interactive bg-card/50 backdrop-blur-xl border-primary/20 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                    <motion.div
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity }
                      }}
                    >
                      <Icon className="w-12 h-12 text-primary mx-auto mb-6 drop-shadow-glow" />
                    </motion.div>
                    <motion.div 
                      className="text-4xl md:text-5xl font-black text-holographic mb-4"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-foreground/70 font-medium uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* TRANSCENDENT Features Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-50" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.h2 
              className="text-5xl md:text-7xl font-black mb-8"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Everything You Need to <span className="text-holographic">DOMINATE</span>
            </motion.h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto font-medium">
              Unleash the full power of next-generation tools designed to amplify your creative dominance and forge unbreakable audience bonds.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-10"
          >
            {[
              {
                icon: Zap,
                title: "QUANTUM TOKEN LAUNCH",
                description: "Deploy your personalized cryptocurrency with quantum-encrypted security. Enable staking, governance, and exclusive access protocols."
              },
              {
                icon: Shield,
                title: "FORTRESS CONTENT GATES",
                description: "Create impenetrable premium content vaults accessible only to token holders. Build ultimate exclusivity and exponential value."
              },
              {
                icon: Users,
                title: "ELITE BRAND NEXUS",
                description: "Connect with premium brands through AI-powered matchmaking. Forge strategic partnerships based on audience synergy and influence metrics."
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div 
                  key={feature.title} 
                  variants={staggerItem}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="perspective-1000"
                >
                  <Card className="p-10 h-full card-interactive bg-card/30 backdrop-blur-xl border-primary/30 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-all duration-500" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-creator rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                    
                    <motion.div 
                      className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-8 relative"
                      animate={{
                        boxShadow: [
                          "0 0 20px hsl(var(--primary) / 0.5)",
                          "0 0 40px hsl(var(--primary) / 0.8)",
                          "0 0 20px hsl(var(--primary) / 0.5)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    >
                      <Icon className="w-8 h-8 text-background" />
                    </motion.div>
                    
                    <h3 className="text-2xl font-black mb-6 text-gradient-creator uppercase tracking-wider">
                      {feature.title}
                    </h3>
                    <p className="text-foreground/70 text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-card-elevated">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Loved by <span className="text-gradient-primary">Creators</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of creators who are already earning more and building stronger communities.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={testimonial.name} variants={staggerItem}>
                <Card className="p-6 h-full card-interactive">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ULTIMATE Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <FloatingElements />
        <CyberGrid />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-12"
          >
            <motion.h2 
              className="text-6xl md:text-8xl font-black leading-tight"
              animate={{
                textShadow: [
                  "0 0 30px hsl(var(--primary) / 0.5)",
                  "0 0 60px hsl(var(--primary) / 0.8)",
                  "0 0 30px hsl(var(--primary) / 0.5)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Ready to <span className="text-holographic">ASCEND</span> to Creator Godhood?
            </motion.h2>
            <motion.p 
              className="text-2xl text-foreground/80 max-w-4xl mx-auto font-medium leading-relaxed"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Join the creator economy revolution. Deploy your quantum token, build your unstoppable community, and start earning exponential rewards from day zero.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-8"
              variants={staggerContainer}
            >
              <Link to="/dashboard">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  whileTap={{ scale: 0.9 }}
                  variants={staggerItem}
                >
                  <Button size="lg" className="button-glow bg-gradient-primary hover:shadow-large text-xl px-12 py-6 relative overflow-hidden group">
                    <Rocket className="w-6 h-6 mr-3 animate-bounce-gentle" />
                    ASCEND NOW
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-3 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                  </Button>
                </motion.div>
              </Link>
              
              <Link to="/explore">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -2 }}
                  whileTap={{ scale: 0.9 }}
                  variants={staggerItem}
                >
                  <Button size="lg" variant="outline" className="bg-background/10 backdrop-blur-md border-2 border-primary/50 text-xl px-12 py-6 hover:bg-primary/20 hover:shadow-glow relative overflow-hidden group">
                    <Eye className="w-6 h-6 mr-3 animate-neon-pulse" />
                    EXPLORE MATRIX
                    <div className="absolute inset-0 bg-gradient-creator opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}