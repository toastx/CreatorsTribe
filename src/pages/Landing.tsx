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
  DollarSign
} from "lucide-react";
import { 
  pageTransitions, 
  staggerContainer, 
  staggerItem, 
  fadeInUp,
  cardHover 
} from "@/lib/motion";

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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-mesh">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="text-center space-y-8"
          >
            {/* Badge */}
            <motion.div variants={staggerItem} className="flex justify-center">
              <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Welcome to the Future of Creator Economy
              </Badge>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={staggerItem} className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                <span className="text-gradient-primary">Create.</span>
                <br />
                <span className="text-gradient-creator">Earn.</span>
                <br />
                <span className="text-foreground">Connect.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Launch your creator token, share exclusive content, collaborate with brands, 
                and build a thriving community that truly values your work.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/dashboard">
                <Button size="lg" className="button-glow group">
                  Launch Your Token
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/explore">
                <Button size="lg" variant="outline" className="bg-background/50 backdrop-blur">
                  Explore Creators
                </Button>
              </Link>
            </motion.div>

            {/* Floating Creator Avatars */}
            <motion.div 
              variants={staggerItem}
              className="flex justify-center items-center space-x-4 pt-8"
            >
              {creators.map((creator, index) => (
                <motion.div
                  key={creator.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="relative"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-creator rounded-full flex items-center justify-center text-lg md:text-xl animate-float shadow-glow">
                    {creator.avatar}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full border-2 border-background flex items-center justify-center">
                    <span className="text-xs text-white">✓</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card-elevated">
        <div className="max-w-7xl mx-auto px-6">
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
                >
                  <Card className="p-6 card-interactive">
                    <Icon className="w-8 h-8 text-primary mx-auto mb-4" />
                    <div className="text-3xl font-bold text-gradient-primary mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Everything You Need to <span className="text-gradient-creator">Succeed</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform provides all the tools you need to monetize your creativity and build lasting relationships with your audience.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Zap,
                title: "Launch Creator Tokens",
                description: "Create your own cryptocurrency that fans can buy, stake, and use to access exclusive content."
              },
              {
                icon: Shield,
                title: "Gated Content",
                description: "Share premium content that only token holders can access. Build exclusivity and value."
              },
              {
                icon: Users,
                title: "Brand Collaborations",
                description: "Connect with brands looking for authentic creators. Get matched based on your audience and style."
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={feature.title} variants={staggerItem}>
                  <Card className="p-8 h-full card-interactive">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
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

      {/* Final CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold">
              Ready to <span className="text-gradient-creator">Transform</span> Your Creative Career?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join the creator economy revolution. Launch your token, build your community, and start earning from day one.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="button-glow">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/explore">
                <Button size="lg" variant="outline">
                  Browse Creators
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}