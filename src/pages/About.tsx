import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Heart, Target, Users, Zap } from "lucide-react";
import { Link } from "react-router";

export default function About() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-6">About KeepAnime</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're passionate about bringing anime culture into the digital age with premium, 
            collectible storage solutions that anime fans can actually use.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16"
        >
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                KeepAnime was born from a simple idea: what if anime collectibles could be both 
                beautiful and practical? As lifelong anime fans, we noticed that most merchandise 
                sits on shelves looking pretty but serving no real purpose.
              </p>
              <p>
                That's when we decided to create something different. Our anime-themed pendrives 
                combine stunning designs inspired by your favorite series with high-quality storage 
                technology, preloaded with exclusive content.
              </p>
              <p>
                Every drive is carefully crafted with authentic artwork, premium materials, and 
                curated anime content that brings your favorite characters and stories with you 
                wherever you go.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop"
              alt="Anime Collection"
              className="w-full rounded-2xl shadow-lg"
            />
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Passion for Anime",
                description: "Every product is created by anime fans, for anime fans, with authentic attention to detail."
              },
              {
                icon: Target,
                title: "Quality First",
                description: "We use only premium materials and cutting-edge technology in every drive we create."
              },
              {
                icon: Users,
                title: "Community Driven",
                description: "Our designs and content are inspired by feedback from the anime community."
              },
              {
                icon: Zap,
                title: "Innovation",
                description: "We're constantly pushing boundaries to create unique, functional anime collectibles."
              }
            ].map((value, index) => (
              <Card key={value.title} className="text-center border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center bg-muted/30 rounded-2xl p-12 mb-16"
        >
          <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            To make anime collectibles practical and digital, creating a bridge between 
            physical merchandise and the digital content we love. We envision a world where 
            every anime fan can carry their favorite series with them in style.
          </p>
          <Link to="/shop">
            <Button size="lg">
              Explore Our Products
            </Button>
          </Link>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
