import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate, useParams } from 'react-router-dom';

// User provided API Key
const CUSTOM_API_KEY = "AIzaSyDUg3RRAgCkC1SLop-QyIZTG7crtLW0y9k";
import { 
  Home, 
  Wallet, 
  PlusSquare, 
  Users, 
  User as UserIcon, 
  Menu, 
  Bell, 
  Search, 
  MoreHorizontal,
  MoreVertical,
  MessageCircle, 
  Share2, 
  Heart,
  ChevronRight,
  ChevronLeft,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowLeft,
  History,
  Repeat,
  Send,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  TrendingUp,
  LogOut,
  ExternalLink,
  CheckCircle2,
  Clock,
  Copy,
  UserCheck,
  UserX,
  Pause,
  Trash2,
  CreditCard,
  Smartphone,
  Building2,
  Bitcoin,
  Lock,
  Mail,
  UserPlus,
  ArrowRight,
  Star,
  Globe,
  Zap,
  Image as ImageIcon,
  Video,
  Smile,
  MapPin,
  X,
  Camera,
  Eye,
  MessageSquare,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  GripVertical,
  Info,
  FileText,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { User, Ad, AdminStats } from './types';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Burst Effect Components ---

const EmojiBurst: React.FC<{ x: number; y: number; onComplete: () => void }> = ({ x, y, onComplete }) => {
  const emojis = ["❤️", "❤️", "🥀", "🥀", "😘", "😘", "😍", "😍", "🥰", "🥰", "💞", "💞", "💕", "💕", "💓", "💓", "❤️", "🔥", "❤️", "🔥", "❤️", "🔥", "💗", "💗"];
  const particles = Array.from({ length: 12 });

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <motion.div
        initial={{ opacity: 0, y: y, x: x - 50, scale: 0.5 }}
        animate={{ opacity: 1, y: y - 100, scale: 1.5 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute w-32 text-center"
      >
        <span className="text-sm font-bold text-blue-600 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm border border-blue-100">
          Thanks Thanks
        </span>
      </motion.div>
      {particles.map((_, i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const velocity = 100 + Math.random() * 150;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        
        return (
          <motion.div
            key={i}
            initial={{ x, y, opacity: 1, scale: 0 }}
            animate={{ 
              x: x + tx, 
              y: y + ty, 
              opacity: [1, 1, 0], // Stay visible then fade
              scale: [0, 1.8, 2],
              rotate: Math.random() * 720 
            }}
            transition={{ 
              duration: 3, // 3 seconds as requested
              times: [0, 0.8, 1], // Stays visible for 80% of the time
              ease: "linear" // Slow motion feel
            }}
            onAnimationComplete={i === 0 ? onComplete : undefined}
            className="absolute text-2xl"
          >
            {emoji}
          </motion.div>
        );
      })}
    </div>
  );
};

const SocialLinksModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const links = [
    { name: 'Facebook', icon: '📘', url: 'https://facebook.com', color: 'bg-blue-600' },
    { name: 'Instagram', icon: '📸', url: 'https://instagram.com', color: 'bg-pink-600' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com', color: 'bg-sky-500' },
    { name: 'WhatsApp', icon: '💬', url: 'https://whatsapp.com', color: 'bg-emerald-500' },
    { name: 'YouTube', icon: '📺', url: 'https://youtube.com', color: 'bg-red-600' },
    { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com', color: 'bg-blue-700' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="p-6 text-center border-b border-slate-100">
              <h3 className="text-xl font-display font-bold text-slate-900">Social Connect</h3>
              <p className="text-sm text-slate-500">Find me on other platforms</p>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors group"
                >
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform", link.color)}>
                    {link.icon}
                  </div>
                  <span className="text-xs font-bold text-slate-700">{link.name}</span>
                </a>
              ))}
            </div>
            <button
              onClick={onClose}
              className="w-full py-4 bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const SocialMediaInteractiveIcon = ({ onOpenSocial }: { onOpenSocial: () => void }) => {
  const [showThanks, setShowThanks] = useState(false);
  const [emoji, setEmoji] = useState("❤️");
  const emojis = ["❤️", "❤️", "🥀", "🥀", "😘", "😘", "😍", "😍", "🥰", "🥰", "💞", "💞", "💕", "💕", "💓", "💓", "❤️", "🔥", "❤️", "🔥", "❤️", "🔥", "💗", "💗"];

  const trigger = (x?: number, y?: number) => {
    setEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
    setShowThanks(true);
    
    if (x !== undefined && y !== undefined) {
      const event = new CustomEvent('trigger-burst', { 
        detail: { x, y } 
      });
      window.dispatchEvent(event);
    }
  };

  useEffect(() => {
    if (showThanks) {
      const timer = setTimeout(() => setShowThanks(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showThanks]);

  return (
    <div className="relative flex flex-col items-center">
      <AnimatePresence>
        {showThanks && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.5 }}
            animate={{ opacity: 1, y: -65, scale: 1 }}
            exit={{ opacity: 0, y: -90, scale: 0.8 }}
            transition={{ type: "spring", damping: 12 }}
            className="absolute z-20 flex flex-col items-center pointer-events-none"
          >
            <motion.span 
              animate={{ y: [0, -5, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-3xl mb-1"
            >
              {emoji}
            </motion.span>
            <span className="text-[10px] font-bold text-white bg-[#c29a5b] px-3 py-1 rounded-full shadow-md border border-white/30 whitespace-nowrap uppercase tracking-tighter">
              Thanks Thanks
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        drag
        dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
        onDrag={(e: any, info) => {
          trigger(info.point.x, info.point.y);
        }}
        onClick={() => {
          trigger();
          onOpenSocial();
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 bg-[#c29a5b] rounded-full flex flex-col items-center justify-center text-white shadow-lg border-2 border-white/30 z-10 cursor-grab active:cursor-grabbing"
      >
      </motion.button>
    </div>
  );
};

const BurstContainer = () => {
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);
  const counterRef = useRef(0);

  useEffect(() => {
    const handler = (e: any) => {
      setBursts(prev => [...prev, { id: counterRef.current++, x: e.detail.x, y: e.detail.y }]);
    };
    window.addEventListener('trigger-burst', handler);
    return () => window.removeEventListener('trigger-burst', handler);
  }, []);

  return (
    <>
      <AnimatePresence>
        {bursts.map(burst => (
          <EmojiBurst 
            key={burst.id} 
            x={burst.x} 
            y={burst.y} 
            onComplete={() => setBursts(prev => prev.filter(b => b.id !== burst.id))} 
          />
        ))}
      </AnimatePresence>
    </>
  );
};

// --- Components ---

const LandingPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Public Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-12 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">GNG</div>
            <span className="font-display font-bold text-xl tracking-tight">GNG Social</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Login</Link>
            <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">Join Now</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
          >
            <Zap size={14} />
            The Future of Social Advertising
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold text-slate-900 leading-tight"
          >
            Grow Your Presence,<br/>
            <span className="text-blue-600">Earn GNG Points.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 max-w-2xl mx-auto"
          >
            Join the world's first points-based social advertising network. 
            Boost your brands, connect with experts, and earn rewards every step of the way.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link to="/register" className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2 group">
              Get Started Free
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/login" className="w-full sm:w-auto bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
              View Demo
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-slate-900">Why Choose GNG Social?</h2>
            <p className="text-slate-500 mt-2">Everything you need to dominate the social landscape.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: 'Global Reach', desc: 'Connect with millions of users across the globe instantly.' },
              { icon: ShieldCheck, title: 'Secure Platform', desc: 'Your data and points are protected by industry-leading security.' },
              { icon: Wallet, title: 'Easy Withdraw', desc: 'Convert your points to PKR and withdraw via JazzCash or EasyPaisa.' },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Active Users', value: '50k+' },
            { label: 'Ads Published', value: '1.2M' },
            { label: 'Points Earned', value: '500M' },
            { label: 'Countries', value: '120+' },
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-4xl font-display font-bold text-blue-600 mb-1">{stat.value}</p>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">G</div>
            <span className="font-display font-bold text-xl tracking-tight">GNG Social</span>
          </div>
          <div className="flex gap-8 text-sm font-bold text-slate-400">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Support</a>
          </div>
          <p className="text-sm text-slate-400">© 2024 GNG Social Media. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    onLogin();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">G</div>
            <span className="font-display font-bold text-2xl tracking-tight">GNG Social</span>
          </Link>
          <h2 className="text-3xl font-display font-bold text-slate-900">Welcome Back</h2>
          <p className="text-slate-500 mt-2">Login to manage your points and ads</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Mail size={16} /> Email Address
              </label>
              <input 
                type="email" 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Lock size={16} /> Password
                </label>
                <a href="#" className="text-xs font-bold text-blue-600 hover:underline">Forgot?</a>
              </div>
              <input 
                type="password" 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              Don't have an account? <Link to="/register" className="text-blue-600 font-bold hover:underline">Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const RegisterPage = ({ onRegister }: { onRegister: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    referral: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock register
    onRegister();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">G</div>
            <span className="font-display font-bold text-2xl tracking-tight">GNG Social</span>
          </Link>
          <h2 className="text-3xl font-display font-bold text-slate-900">Join GNG Social</h2>
          <p className="text-slate-500 mt-2">Start earning points and growing today</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <UserIcon size={16} /> Full Name
              </label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Mail size={16} /> Email Address
              </label>
              <input 
                type="email" 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Lock size={16} /> Password
              </label>
              <input 
                type="password" 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                placeholder="Min. 8 characters"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Users size={16} /> Referral Code (Optional)
              </label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                placeholder="GNG-XXXXX"
                value={formData.referral}
                onChange={(e) => setFormData({...formData, referral: e.target.value})}
              />
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
            >
              <UserPlus size={20} />
              Create Account
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CreatePostPage = ({ user, onPostCreated }: { user: User | null, onPostCreated: (post: Ad) => void }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    if (!content.trim() && !image) return;
    
    const newPost: Ad = {
      id: Math.floor(Date.now() + Math.random() * 1000000),
      user_id: user?.id || 0,
      campaign_name: "User Post",
      budget_type: "daily",
      budget_amount: 0,
      target_audience: "All",
      title: "",
      description: content,
      image_url: image || "",
      cta_text: "",
      duration_days: 0,
      status: "active",
      created_at: new Date().toISOString()
    };

    onPostCreated(newPost);
    alert('Post shared successfully!');
    setContent('');
    setImage(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <ArrowLeft size={20} className="text-slate-600" />
              </button>
              <h2 className="text-xl font-display font-bold">Create New Post</h2>
            </div>
            <button 
              onClick={handlePost}
              disabled={!content.trim() && !image}
              className={cn(
                "px-6 py-2 rounded-xl font-bold transition-all shadow-lg",
                content.trim() || image 
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200" 
                  : "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
              )}
            >
              Post Now
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-2xl overflow-hidden shrink-0 border-2 border-white shadow-sm">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`} alt="User" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-900">{user?.email.split('@')[0]}</p>
                <div className="flex items-center gap-1.5 bg-slate-100 w-fit px-2.5 py-1 rounded-lg mt-1">
                  <Globe size={12} className="text-slate-500" />
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Public Audience</span>
                </div>
              </div>
            </div>

            <textarea 
              className="w-full min-h-[150px] text-xl outline-none resize-none placeholder:text-slate-400 font-medium"
              placeholder={`What's on your mind, ${user?.email.split('@')[0]}?`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            {!image ? (
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-4 hover:bg-slate-100 transition-all group overflow-hidden relative"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <ImageIcon size={32} className="text-blue-600" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-slate-700 text-lg">Select Photos or Videos</p>
                  <p className="text-sm text-slate-500">High quality images get more engagement</p>
                </div>
                <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ) : (
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-lg group">
                <img src={image} alt="Preview" className="w-full h-auto max-h-[500px] object-cover" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <button 
                  onClick={() => setImage(null)}
                  className="absolute top-4 right-4 p-2 bg-black/60 text-white rounded-full hover:bg-black/80 transition-colors backdrop-blur-md"
                >
                  <X size={20} />
                </button>
              </div>
            )}

            <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-700">Add to your post</span>
              <div className="flex items-center gap-2">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="p-3 text-emerald-600 hover:bg-emerald-100 rounded-2xl transition-all hover:scale-110"
                  title="Gallery"
                >
                  <ImageIcon size={28} />
                </button>
                <button className="p-3 text-blue-600 hover:bg-blue-100 rounded-2xl transition-all hover:scale-110">
                  <Video size={28} />
                </button>
                <button className="p-3 text-amber-600 hover:bg-amber-100 rounded-2xl transition-all hover:scale-110">
                  <Smile size={28} />
                </button>
                <button className="p-3 text-red-600 hover:bg-red-100 rounded-2xl transition-all hover:scale-110">
                  <MapPin size={28} />
                </button>
              </div>
            </div>

            <div className="bg-red-50 p-6 rounded-3xl border border-red-100 space-y-2">
              <div className="flex items-center gap-2 text-red-600">
                <ShieldCheck size={20} />
                <h4 className="font-bold uppercase text-xs tracking-widest">Community Guidelines</h4>
              </div>
              <p className="text-sm text-red-700 font-medium leading-relaxed">
                Koi ghalat post upload na kry apka account block ho jaye ga. Sahi and Islamic post upload kry. 
                Keep GNG Social a safe and professional environment for everyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'chat' | 'notification'>('chat');
  
  const chats = [
    { id: 1, name: 'GNG Support', message: 'Welcome to GNG Social!', time: '10:30 AM', unread: 1 },
    { id: 2, name: 'Ad Manager', message: 'Your campaign is performing well.', time: 'Yesterday', unread: 0 },
    { id: 3, name: 'Community Bot', message: 'New points available!', time: '2 days ago', unread: 0 },
  ];

  const notifications = [
    { id: 1, title: 'New Like', message: 'User_42 liked your post', time: '5m ago', icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
    { id: 2, title: 'Point Earned', message: 'You earned 50 points from an ad', time: '1h ago', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 3, title: 'New Follower', message: 'Creative_Mind started following you', time: '3h ago', icon: UserPlus, color: 'text-blue-500', bg: 'bg-blue-50' },
  ];

  return (
    <div className="pt-24 pb-20 px-4 max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-1 rounded-2xl border border-slate-200 shadow-sm flex">
        <button 
          onClick={() => setActiveTab('chat')}
          className={cn(
            "flex-1 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2",
            activeTab === 'chat' ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-slate-500 hover:bg-slate-50"
          )}
        >
          <MessageCircle size={18} />
          Chat Inbox
        </button>
        <button 
          onClick={() => setActiveTab('notification')}
          className={cn(
            "flex-1 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2",
            activeTab === 'notification' ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-slate-500 hover:bg-slate-50"
          )}
        >
          <Bell size={18} />
          All Notifications
        </button>
      </div>

      {activeTab === 'chat' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold text-slate-900">Messages</h2>
            <button className="p-2 bg-blue-50 text-blue-600 rounded-full">
              <PlusSquare size={20} />
            </button>
          </div>
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
            {chats.map((chat) => (
              <button key={chat.id} className="w-full p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors text-left group">
                <div className="w-14 h-14 bg-slate-100 rounded-2xl overflow-hidden shrink-0 relative">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.name}`} alt={chat.name} />
                  <div className="absolute bottom-1 right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-slate-900 truncate">{chat.name}</h4>
                    <span className="text-[10px] font-medium text-slate-400">{chat.time}</span>
                  </div>
                  <p className="text-sm text-slate-500 truncate">{chat.message}</p>
                </div>
                {chat.unread > 0 && (
                  <div className="w-5 h-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {chat.unread}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold text-slate-900">Notifications</h2>
            <button className="text-xs font-bold text-blue-600 hover:underline">Mark all as read</button>
          </div>
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
            {notifications.map((notif) => (
              <div key={notif.id} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors group cursor-pointer">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0", notif.bg, notif.color)}>
                  <notif.icon size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-0.5">
                    <h4 className="font-bold text-slate-900 text-sm">{notif.title}</h4>
                    <span className="text-[10px] font-medium text-slate-400">{notif.time}</span>
                  </div>
                  <p className="text-xs text-slate-500">{notif.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const MLMPlanDashboard = () => {
  const navigate = useNavigate();
  const mlmStats = [
    { label: 'Direct Referrals', value: '12', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Indirect Team', value: '48', icon: UserPlus, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Team Points', value: '5,400', icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Level Status', value: 'Silver Agent', icon: ShieldCheck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  return (
    <div className="pt-24 pb-20 px-4 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-slate-600" />
        </button>
        <h2 className="text-2xl font-display font-bold">GNG Agent MLM Plan</h2>
      </div>

      <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="relative z-10">
          <p className="text-indigo-100 text-xs font-bold uppercase tracking-widest mb-2">Total Team Earnings</p>
          <h3 className="text-4xl font-display font-bold">Rs. 12,450.00</h3>
          <div className="mt-6 flex items-center gap-2 bg-white/20 w-fit px-4 py-2 rounded-xl backdrop-blur-md">
            <Zap size={16} className="text-amber-300" />
            <span className="text-sm font-bold">Next Level: Gold Agent (85%)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {mlmStats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4", stat.bg, stat.color)}>
              <stat.icon size={20} />
            </div>
            <p className="text-2xl font-display font-bold text-slate-900">{stat.value}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h4 className="font-bold text-slate-900">Recent Team Activity</h4>
        </div>
        <div className="divide-y divide-slate-100">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-full overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=team${i}`} alt="User" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Agent_Team_{i}</p>
                  <p className="text-[10px] text-slate-500">Joined Level {i}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-emerald-600">+50 Pts</p>
                <p className="text-[10px] text-slate-400">2h ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AccountSettingsPage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'User_42',
    bio: 'Digital Creator & GNG Enthusiast',
    email: 'user@example.com',
    phone: '+92 300 1234567',
    language: 'English (US)'
  });

  return (
    <div className="pt-24 pb-20 px-4 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft size={24} className="text-slate-600" />
          </button>
          <h2 className="text-2xl font-display font-bold">Account Settings</h2>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors"
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 text-center border-b border-slate-100">
          <div className="relative w-24 h-24 mx-auto mb-4 group">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User_42`} 
              className="w-full h-full rounded-full border-4 border-slate-50 shadow-md"
              alt="Avatar"
            />
            {isEditing && (
              <button className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={20} />
              </button>
            )}
          </div>
          <h3 className="text-xl font-bold text-slate-900">{profile.name}</h3>
          <p className="text-sm text-slate-500">{profile.email}</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Display Name</label>
              <input 
                type="text" 
                disabled={!isEditing}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all disabled:bg-slate-50 disabled:text-slate-500"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Bio</label>
              <textarea 
                disabled={!isEditing}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all disabled:bg-slate-50 disabled:text-slate-500 h-24 resize-none"
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email Address</label>
                <input 
                  type="email" 
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all disabled:bg-slate-50 disabled:text-slate-500"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all disabled:bg-slate-50 disabled:text-slate-500"
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Preferred Language</label>
              <select 
                disabled={!isEditing}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all disabled:bg-slate-50 disabled:text-slate-500"
                value={profile.language}
                onChange={(e) => setProfile({...profile, language: e.target.value})}
              >
                <option>English (US)</option>
                <option>Urdu</option>
                <option>Arabic</option>
                <option>Spanish</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-red-50 p-6 rounded-3xl border border-red-100">
        <h4 className="text-red-600 font-bold mb-2">Danger Zone</h4>
        <p className="text-xs text-red-500 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
        <button className="px-6 py-2 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-colors">
          Delete My Account
        </button>
      </div>
    </div>
  );
};

const SecurityPrivacyPage = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    twoFactor: false,
    privateProfile: false,
    showOnlineStatus: true,
    adPersonalization: true
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="pt-24 pb-20 px-4 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-slate-600" />
        </button>
        <h2 className="text-2xl font-display font-bold">Security & Privacy</h2>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck size={18} className="text-blue-600" />
              Security Settings
            </h3>
          </div>
          <div className="divide-y divide-slate-100">
            <button className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors text-left">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                  <Lock size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Change Password</p>
                  <p className="text-xs text-slate-500">Update your account password</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-300" />
            </button>
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                  <Smartphone size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Two-Factor Authentication</p>
                  <p className="text-xs text-slate-500">Add an extra layer of security</p>
                </div>
              </div>
              <button 
                onClick={() => toggleSetting('twoFactor')}
                className={cn(
                  "w-12 h-6 rounded-full transition-colors relative",
                  settings.twoFactor ? "bg-blue-600" : "bg-slate-200"
                )}
              >
                <div className={cn(
                  "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                  settings.twoFactor ? "right-1" : "left-1"
                )} />
              </button>
            </div>
            <button className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors text-left">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                  <History size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Login Activity</p>
                  <p className="text-xs text-slate-500">Check where you're logged in</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-300" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Eye size={18} className="text-emerald-600" />
              Privacy Settings
            </h3>
          </div>
          <div className="divide-y divide-slate-100">
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                  <UserIcon size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Private Profile</p>
                  <p className="text-xs text-slate-500">Only followers can see your posts</p>
                </div>
              </div>
              <button 
                onClick={() => toggleSetting('privateProfile')}
                className={cn(
                  "w-12 h-6 rounded-full transition-colors relative",
                  settings.privateProfile ? "bg-blue-600" : "bg-slate-200"
                )}
              >
                <div className={cn(
                  "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                  settings.privateProfile ? "right-1" : "left-1"
                )} />
              </button>
            </div>
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                  <Globe size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Online Status</p>
                  <p className="text-xs text-slate-500">Show when you're active</p>
                </div>
              </div>
              <button 
                onClick={() => toggleSetting('showOnlineStatus')}
                className={cn(
                  "w-12 h-6 rounded-full transition-colors relative",
                  settings.showOnlineStatus ? "bg-blue-600" : "bg-slate-200"
                )}
              >
                <div className={cn(
                  "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                  settings.showOnlineStatus ? "right-1" : "left-1"
                )} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HelpSupportPage = () => {
  const navigate = useNavigate();
  const [ticket, setTicket] = useState({ subject: '', message: '' });
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    { q: "How do I earn GNG Points?", a: "You can earn points by creating posts, engaging with other users' content, and completing daily tasks in the dashboard." },
    { q: "How to withdraw PKR?", a: "Go to your GNG Point Dashboard, click Withdraw, and select your preferred method (JazzCash/EasyPaisa)." },
    { q: "What is the MLM Agent Plan?", a: "It's a referral-based earning system where you earn commissions from your team's activities." },
    { q: "Is my data secure?", a: "Yes, we use industry-standard encryption to protect your personal information and transaction data." }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Support ticket submitted successfully! We will get back to you soon.');
    setTicket({ subject: '', message: '' });
  };

  return (
    <div className="pt-24 pb-20 px-4 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-slate-600" />
        </button>
        <h2 className="text-2xl font-display font-bold">Help & Support</h2>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-900">Submit a Support Ticket</h3>
          <p className="text-xs text-slate-500 mt-1">Our team usually responds within 24 hours.</p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Subject</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              placeholder="e.g., Withdrawal Issue"
              value={ticket.subject}
              onChange={(e) => setTicket({...ticket, subject: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Message</label>
            <textarea 
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all h-32 resize-none"
              placeholder="Describe your problem in detail..."
              value={ticket.message}
              onChange={(e) => setTicket({...ticket, message: e.target.value})}
            />
          </div>
          <button 
            type="submit"
            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            Send Message
          </button>
        </form>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-slate-900 px-2">Frequently Asked Questions</h3>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <button 
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold text-slate-700 text-sm">{faq.q}</span>
                <ChevronRight size={18} className={cn("text-slate-400 transition-transform", expandedFaq === i && "rotate-90")} />
              </button>
              <AnimatePresence>
                {expandedFaq === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-4 pb-4 text-sm text-slate-500 leading-relaxed border-t border-slate-50 pt-3"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center space-y-2">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto">
            <MessageCircle size={24} />
          </div>
          <h4 className="font-bold text-slate-900">Live Chat</h4>
          <p className="text-[10px] text-slate-500">Available 9AM - 9PM</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center space-y-2">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto">
            <Mail size={24} />
          </div>
          <h4 className="font-bold text-slate-900">Email Support</h4>
          <p className="text-[10px] text-slate-500">support@gngsocial.com</p>
        </div>
      </div>
    </div>
  );
};

const SystemNoticePage = () => {
  const navigate = useNavigate();
  
  const notices = [
    {
      title: "System Status & Updates",
      icon: Zap,
      color: "text-blue-600",
      bg: "bg-blue-50",
      content: "All systems are currently operational. We have recently upgraded our servers to handle more traffic and ensure faster point processing."
    },
    {
      title: "Point Conversion Policy",
      icon: Bitcoin,
      color: "text-amber-600",
      bg: "bg-amber-50",
      content: "Current conversion rate: 1 GNG Point = 0.5 PKR. This rate is subject to change based on market conditions and platform growth."
    },
    {
      title: "Withdrawal Guidelines",
      icon: Clock,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      content: "Withdrawal requests are processed within 24 to 48 hours. Please ensure your JazzCash/EasyPaisa details are correct to avoid delays."
    },
    {
      title: "Content & Islamic Policy",
      icon: ShieldCheck,
      color: "text-red-600",
      bg: "bg-red-50",
      content: "GNG Social strictly follows an Islamic and ethical content policy. Any post containing nudity, music, or unethical content will lead to an immediate permanent ban."
    },
    {
      title: "Referral Program",
      icon: UserPlus,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      content: "Earn 100 GNG Points for every verified friend you invite. Your friend must complete their profile for you to receive the reward."
    }
  ];

  return (
    <div className="pt-24 pb-20 px-4 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-slate-600" />
        </button>
        <h2 className="text-2xl font-display font-bold">System Notices</h2>
      </div>

      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="relative z-10 flex items-center gap-6">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md shrink-0">
            <Info size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold">Official Announcements</h3>
            <p className="text-blue-100 text-sm mt-1">Stay updated with the latest GNG Social system rules and news.</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {notices.map((notice, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", notice.bg, notice.color)}>
                <notice.icon size={20} />
              </div>
              <h4 className="font-bold text-slate-900">{notice.title}</h4>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed pl-13">
              {notice.content}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 text-center space-y-4">
        <AlertTriangle className="text-amber-400 mx-auto" size={40} />
        <h3 className="text-white font-bold text-lg">Important Reminder</h3>
        <p className="text-slate-400 text-sm">
          GNG Social is a professional platform. Misuse of the points system or attempting to cheat will result in account termination without notice.
        </p>
        <button 
          onClick={() => navigate('/support')}
          className="inline-flex items-center gap-2 text-blue-400 font-bold hover:underline"
        >
          Contact Support if you have questions
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

const DraggableFloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [emoji, setEmoji] = useState("❤️");
  const constraintsRef = useRef(null);
  const emojis = ["❤️", "🥀", "😘", "😍", "🥰", "💞", "💕", "💓", "🔥", "💗"];

  const trigger = (x?: number, y?: number) => {
    setEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
    setShowThanks(true);
    
    if (x !== undefined && y !== undefined) {
      const event = new CustomEvent('trigger-burst', { 
        detail: { x, y } 
      });
      window.dispatchEvent(event);
    }
  };

  useEffect(() => {
    if (showThanks) {
      const timer = setTimeout(() => setShowThanks(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showThanks]);

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', color: 'bg-[#1877F2]', url: 'https://facebook.com' },
    { icon: Twitter, label: 'Twitter', color: 'bg-[#1DA1F2]', url: 'https://twitter.com' },
    { icon: Instagram, label: 'Instagram', color: 'bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]', url: 'https://instagram.com' },
    { icon: Youtube, label: 'YouTube', color: 'bg-[#FF0000]', url: 'https://youtube.com' },
    { icon: Linkedin, label: 'LinkedIn', color: 'bg-[#0A66C2]', url: 'https://linkedin.com' },
    { icon: Send, label: 'Telegram', color: 'bg-[#0088cc]', url: 'https://t.me' },
  ];

  const systemNotices = [
    { title: 'Islamic Policy', content: 'No music, no nudity, no unethical content allowed.', icon: ShieldCheck, color: 'text-emerald-600' },
    { title: 'Points Rate', content: '1 GNG Point = 0.5 PKR. Rates may vary.', icon: Bitcoin, color: 'text-amber-600' },
    { title: 'Withdrawals', content: 'Processed within 24-48 hours via JazzCash/EasyPaisa.', icon: Clock, color: 'text-blue-600' },
  ];

  return (
    <>
      {/* Draggable Handle */}
      <div className="fixed inset-0 pointer-events-none z-[60]" ref={constraintsRef}>
        <motion.div
          drag
          dragConstraints={constraintsRef}
          dragElastic={0.1}
          whileDrag={{ scale: 1.1 }}
          onDrag={(e, info) => {
            // Trigger burst occasionally during drag
            if (Math.random() > 0.85) {
              trigger(info.point.x, info.point.y);
            }
          }}
          className="pointer-events-auto w-16 h-16 bg-[#C5A059] rounded-full shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing border-4 border-white shadow-amber-200/50 relative"
          style={{ position: 'absolute', right: 20, bottom: 120 }}
          onClick={(e) => {
            trigger(e.clientX, e.clientY);
            setIsOpen(true);
          }}
        >
          <AnimatePresence>
            {showThanks && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.5 }}
                animate={{ opacity: 1, y: -75, scale: 1 }}
                exit={{ opacity: 0, y: -100, scale: 0.8 }}
                transition={{ type: "spring", damping: 12 }}
                className="absolute z-20 flex flex-col items-center pointer-events-none"
              >
                <motion.span 
                  animate={{ y: [0, -5, 0] }} 
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-3xl mb-1"
                >
                  {emoji}
                </motion.span>
                <span className="text-[10px] font-bold text-white bg-[#c29a5b] px-3 py-1 rounded-full shadow-md border border-white/30 whitespace-nowrap uppercase tracking-tighter">
                  Thanks Thanks
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Bottom Notice/Social Sheet */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[40px] z-[80] shadow-2xl border-t border-slate-100 max-h-[85vh] overflow-y-auto"
            >
              <div className="p-8 space-y-8">
                <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto" />
                
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-display font-bold text-slate-900">GNG Official Notice</h3>
                  <p className="text-slate-500 text-sm">Important updates and community links</p>
                </div>

                {/* System Notices */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">System Rules</h4>
                  <div className="grid gap-3">
                    {systemNotices.map((notice, i) => (
                      <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex gap-4">
                        <div className={cn("w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm", notice.color)}>
                          <notice.icon size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{notice.title}</p>
                          <p className="text-xs text-slate-500 leading-relaxed">{notice.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Social Media</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {socialLinks.map((link, i) => (
                      <a 
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl border border-slate-100 hover:border-blue-200 transition-all group shadow-sm"
                      >
                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform", link.color)}>
                          <link.icon size={24} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-600">{link.label}</span>
                      </a>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-full py-4 bg-[#C5A059] text-white rounded-2xl font-bold shadow-lg shadow-amber-200 hover:opacity-90 transition-opacity"
                >
                  Got it, Thanks!
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const recentSearches = ['GNG Points', 'Sponsored Ads', 'Trending Now', 'Top Earners'];

  return (
    <div className="pt-24 pb-20 px-4 max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ChevronLeft size={24} className="text-slate-600" />
        </button>
        <form 
          onSubmit={(e) => { e.preventDefault(); alert(`Searching for: ${query}`); }}
          className="flex-1 relative"
        >
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            autoFocus
            placeholder="Search GNG Social..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm font-medium"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-bold text-slate-900">Recent Searches</h3>
          <button className="text-xs font-bold text-blue-600">Clear All</button>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
          {recentSearches.map((search, i) => (
            <button 
              key={i}
              className="w-full p-4 flex items-center gap-3 hover:bg-slate-50 transition-colors text-left"
            >
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                <Search size={14} />
              </div>
              <span className="text-sm font-medium text-slate-700">{search}</span>
              <ChevronRight size={16} className="ml-auto text-slate-300" />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-slate-900 px-2">Suggested for You</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'GNG Rewards', icon: Star, color: 'bg-amber-100 text-amber-600' },
            { label: 'Ad Campaigns', icon: LayoutDashboard, color: 'bg-blue-100 text-blue-600' },
            { label: 'Top Creators', icon: Users, color: 'bg-emerald-100 text-emerald-600' },
            { label: 'Help Center', icon: ExternalLink, color: 'bg-slate-100 text-slate-600' },
          ].map((item, i) => (
            <button 
              key={i}
              className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center gap-3 hover:scale-[1.02] transition-transform"
            >
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", item.color)}>
                <item.icon size={24} />
              </div>
              <span className="text-sm font-bold text-slate-700">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { icon: UserIcon, label: 'My Profile', path: '/account' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: Users, label: 'Invite Friends', path: '/invite' },
    { icon: ArrowUpRight, label: 'Withdraw Points', path: '/withdraw' },
    { icon: LayoutDashboard, label: 'Ads Manager', path: '/ads' },
    { icon: ShieldCheck, label: 'Privacy Policy', path: '/privacy' },
    { icon: LogOut, label: 'Logout', path: '/login', color: 'text-red-600' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="bg-blue-600 text-white py-1 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap px-4 text-[10px] font-bold uppercase tracking-widest">
          GNG Social Media • Boost Your Presence • Earn GNG Points • Professional Advertising Dashboard • Join the Community Now!
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto relative">
        <div className="flex items-center gap-3 overflow-hidden flex-1 mr-4">
          <Link to="/" className="w-14 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg font-display shrink-0 shadow-sm">
            GNG
          </Link>
          <div className="overflow-hidden whitespace-nowrap flex-1">
            <div className="animate-marquee-text inline-block font-display font-bold text-xl tracking-tight text-blue-600">
              GNG Social Media • GNG Social Media • GNG Social Media • GNG Social Media • GNG Social Media • 
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 shrink-0" ref={menuRef}>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "p-2 rounded-full transition-all duration-200",
              isMenuOpen ? "bg-blue-50 text-blue-600" : "hover:bg-slate-100 text-slate-600"
            )}
          >
            <MoreVertical size={24} />
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full right-4 mt-2 w-64 bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/60 overflow-hidden py-2 z-[60]"
              >
                <div className="px-4 py-3 border-b border-slate-50 mb-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Menu Options</p>
                </div>
                {menuItems.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      navigate(item.path);
                      setIsMenuOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left",
                      item.color || "text-slate-700"
                    )}
                  >
                    <item.icon size={18} className={cn(!item.color && "text-slate-400")} />
                    <span className="text-sm font-bold">{item.label}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

const BottomNav = () => {
  const location = useLocation();
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Wallet, label: 'GNG Point', path: '/points' },
    { icon: PlusSquare, label: 'Create Post', path: '/create-post' },
    { icon: MessageCircle, label: 'Chat Now\nNotification', path: '/chat' },
    { icon: UserIcon, label: 'Account', path: '/account' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-2 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 min-w-[72px] relative",
                isActive ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <item.icon size={isActive ? 24 : 22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-bold text-center leading-tight whitespace-pre-line">
                {item.label}
              </span>
              {isActive && (
                <motion.div 
                  layoutId="activeNav"
                  className="w-1 h-1 bg-blue-600 rounded-full absolute -bottom-1"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200&h=600",
      title: "Boost Your Social Presence",
      subtitle: "Professional tools for modern creators"
    },
    {
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200&h=600",
      title: "Targeted Advertising",
      subtitle: "Reach the right audience with precision"
    },
    {
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200&h=600",
      title: "Earn While You Grow",
      subtitle: "GNG Points system for loyal users"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-[1200px] aspect-[2/1] mx-auto rounded-2xl overflow-hidden shadow-xl group">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img 
            src={slides[current].image} 
            alt={slides[current].title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-5xl font-display font-bold mb-2"
            >
              {slides[current].title}
            </motion.h2>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-slate-200"
            >
              {slides[current].subtitle}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button 
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              current === i ? "bg-white w-6" : "bg-white/50"
            )}
          />
        ))}
      </div>
    </div>
  );
};

interface PostCardProps {
  ad: Ad & { isSponsored?: boolean };
}

const UserProfilePage = ({ user: currentUser }: { user: User | null }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock user data for the profile being viewed
  const profileUser = {
    id: id,
    name: `User_${id}`,
    email: `user${id}@example.com`,
    followers: 1250,
    following: 450,
    likes: 8900,
    bio: "Digital creator and GNG enthusiast. 🚀",
    joined: "January 2024"
  };

  return (
    <div className="pt-24 pb-20 px-4 max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-blue-600 to-indigo-600" />
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-md transition-colors z-10"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="relative mt-12">
          <div className="w-32 h-32 bg-white rounded-full mx-auto mb-4 overflow-hidden border-4 border-white shadow-xl">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`} alt="Profile" />
          </div>
          <h3 className="text-2xl font-display font-bold text-slate-900">{profileUser.name}</h3>
          <p className="text-sm text-slate-500 mb-6">{profileUser.bio}</p>
          
          <div className="grid grid-cols-3 gap-4 mb-8 border-y border-slate-100 py-6">
            <div className="text-center">
              <p className="text-xl font-bold text-slate-900">{profileUser.followers.toLocaleString()}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Followers</p>
            </div>
            <div className="text-center border-x border-slate-100">
              <p className="text-xl font-bold text-slate-900">{profileUser.following.toLocaleString()}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Following</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-slate-900">{profileUser.likes.toLocaleString()}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Likes</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setIsFollowing(!isFollowing)}
              className={cn(
                "flex-1 py-4 rounded-2xl font-bold transition-all shadow-lg",
                isFollowing 
                  ? "bg-slate-100 text-slate-600 hover:bg-slate-200" 
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200"
              )}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
            <button 
              onClick={() => navigate('/chat')}
              className="flex-1 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} />
              Message
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-display font-bold text-xl px-2">Recent Posts</h4>
        {[1, 2].map((i) => (
          <PostCard 
            key={i} 
            ad={{
              id: 5000 + i,
              user_id: Number(id),
              title: `Amazing Day ${i}`,
              description: "Sharing some highlights from my latest adventure! #GNGSocial #Growth",
              image_url: `https://picsum.photos/seed/post${i}/800/600`,
              isSponsored: false,
              cta_text: '',
              status: 'active',
              created_at: new Date().toISOString()
            } as any} 
          />
        ))}
      </div>
    </div>
  );
};

const PostCard: React.FC<PostCardProps> = ({ ad }) => {
  const isSponsored = ad.isSponsored !== false;
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-4 max-w-2xl mx-auto">
      <div className="p-4 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => !isSponsored && navigate(`/user/${ad.user_id}`)}
        >
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden group-hover:ring-2 group-hover:ring-blue-500 transition-all">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${ad.user_id}`} alt="Avatar" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-sm group-hover:text-blue-600 transition-colors">
                {isSponsored ? "GNG Advertiser" : `User_${ad.user_id}`}
              </span>
              {isSponsored && <CheckCircle2 size={14} className="text-blue-600 fill-blue-600/10" />}
            </div>
            <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
              <span>{isSponsored ? "Sponsored" : "Just now"}</span>
              <span>•</span>
              <Clock size={10} />
            </div>
          </div>
        </div>
        <button className="text-slate-400 hover:text-slate-600">
          <MoreHorizontal size={20} />
        </button>
      </div>
      
      <div className="px-4 pb-3 text-sm text-slate-800 leading-relaxed">
        {ad.title && <p className="font-semibold mb-1">{ad.title}</p>}
        <p>{ad.description}</p>
      </div>
      
      {ad.image_url && (
        <div className="aspect-video bg-slate-100 relative overflow-hidden">
          <img 
            src={ad.image_url} 
            alt="Post Content" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
      
      {isSponsored && (
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="flex-1 mr-4">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-0.5">Limited Time Offer</p>
            <p className="text-sm font-bold text-slate-900 truncate">{ad.title}</p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm">
            {ad.cta_text}
          </button>
        </div>
      )}
      
      <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-around text-slate-500">
        <button className="flex flex-col items-center gap-1 hover:text-red-500 transition-colors group">
          <div className="flex items-center gap-2">
            <Heart size={18} />
            <span className="text-xs font-medium">Like</span>
          </div>
          {isSponsored && (
            <span className="text-[9px] font-bold text-emerald-600 animate-pulse">Like & Earn GNG Point</span>
          )}
        </button>
        <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
          <MessageCircle size={18} />
          <span className="text-xs font-medium">Comment</span>
        </button>
        <button className="flex items-center gap-2 hover:text-emerald-500 transition-colors">
          <Share2 size={18} />
          <span className="text-xs font-medium">Share</span>
        </button>
      </div>
    </div>
  );
};

// --- Pages ---

const MultiStepNoticeModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [step, setStep] = useState(1);
  
  if (!isOpen) return null;

  const steps = [
    {
      title: "GNG TEAM WELCOME",
      content: (
        <div className="text-center space-y-4">
          <p className="font-bold text-slate-800">GNG TEAM WELCOME TO EVERYONE</p>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-center gap-2">
              <Star className="text-amber-500" size={18} />
              <span>Branded & Trusted Platform</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Smartphone className="text-blue-500" size={18} />
              <span>24/7 Customer Care</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Zap className="text-emerald-500" size={18} />
              <span>Daily Gift Codes & Promotions</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-blue-600 font-bold">
              <Globe size={18} />
              <span>Join with us in:</span>
            </div>
          </div>
          <div className="text-[10px] text-blue-500 font-medium grid grid-cols-2 gap-1">
            <span>gngsocial.com</span>
            <span>gngrewards.com</span>
            <span>gngpkr.com</span>
            <span>gnggo.com</span>
          </div>
        </div>
      )
    },
    {
      title: "COMMUNITY LINKS",
      content: (
        <div className="text-center space-y-4">
          <p className="font-bold text-slate-800">OFFICIAL CHANNELS</p>
          <div className="grid grid-cols-2 gap-3">
            <a href="#" className="p-3 bg-blue-50 rounded-xl flex flex-col items-center gap-1">
              <Facebook className="text-[#1877F2]" size={24} />
              <span className="text-[10px] font-bold">Facebook</span>
            </a>
            <a href="#" className="p-3 bg-pink-50 rounded-xl flex flex-col items-center gap-1">
              <Instagram className="text-[#E4405F]" size={24} />
              <span className="text-[10px] font-bold">Instagram</span>
            </a>
            <a href="#" className="p-3 bg-red-50 rounded-xl flex flex-col items-center gap-1">
              <Youtube className="text-[#FF0000]" size={24} />
              <span className="text-[10px] font-bold">YouTube</span>
            </a>
            <a href="#" className="p-3 bg-sky-50 rounded-xl flex flex-col items-center gap-1">
              <Twitter className="text-[#1DA1F2]" size={24} />
              <span className="text-[10px] font-bold">Twitter</span>
            </a>
          </div>
          <p className="text-xs text-slate-500">Follow us for daily gift codes and updates!</p>
        </div>
      )
    },
    {
      title: "SYSTEM RULES",
      content: (
        <div className="text-center space-y-4">
          <p className="font-bold text-slate-800">IMPORTANT GUIDELINES</p>
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 text-left space-y-3">
            <div className="flex gap-2">
              <ShieldCheck className="text-amber-600 shrink-0" size={16} />
              <p className="text-[11px] text-amber-900 font-medium">Islamic Policy: No music, no nudity, no unethical content allowed.</p>
            </div>
            <div className="flex gap-2">
              <Bitcoin className="text-amber-600 shrink-0" size={16} />
              <p className="text-[11px] text-amber-900 font-medium">Conversion: 1 GNG Point = 0.5 PKR. Rates may vary.</p>
            </div>
            <div className="flex gap-2">
              <Clock className="text-amber-600 shrink-0" size={16} />
              <p className="text-[11px] text-amber-900 font-medium">Withdrawals: Processed within 24-48 hours via JazzCash/EasyPaisa.</p>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 italic">By clicking confirm, you agree to our terms of service.</p>
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative w-full max-w-sm bg-white rounded-[32px] overflow-hidden shadow-2xl"
      >
        <div className="bg-[#C5A059] p-4 text-center">
          <h3 className="text-white font-display font-bold tracking-widest">{steps[step-1].title}</h3>
        </div>
        
        <div className="p-8">
          {steps[step-1].content}
        </div>

        <div className="p-6 pt-0 flex gap-3">
          {step > 1 && (
            <button 
              onClick={() => setStep(step - 1)}
              className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors"
            >
              Back
            </button>
          )}
          {step < 3 ? (
            <button 
              onClick={() => setStep(step + 1)}
              className="flex-1 py-3 bg-[#C5A059] text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-amber-200"
            >
              Next
            </button>
          ) : (
            <button 
              onClick={onClose}
              className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            >
              Confirm
            </button>
          )}
        </div>

        <div className="pb-6 flex justify-center gap-1.5">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all",
                step === i ? "bg-[#C5A059] w-4" : "bg-slate-200"
              )} 
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const HomePage = ({ user, ads, userPosts }: { user: User | null, ads: Ad[], userPosts: Ad[] }) => {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    // Show modal on every load/refresh of home page as requested
    setShowWelcomeModal(true);
  }, []);

  const regularPosts = [
    {
      id: 1001,
      user_id: 42,
      title: "Exploring the Mountains",
      description: "The view from the top is absolutely breathtaking! Highly recommend this trail to everyone. 🏔️✨",
      image_url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200",
      isSponsored: false,
      cta_text: '',
      status: 'active',
      created_at: new Date().toISOString()
    },
    {
      id: 1002,
      user_id: 15,
      title: "Morning Coffee",
      description: "Nothing beats a fresh cup of coffee to start the day. ☕️ What's your morning routine?",
      image_url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200",
      isSponsored: false,
      cta_text: '',
      status: 'active',
      created_at: new Date().toISOString()
    },
    {
      id: 1003,
      user_id: 88,
      title: "New Setup!",
      description: "Finally finished my home office setup. Ready to crush some code today! 💻🔥",
      image_url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200",
      isSponsored: false,
      cta_text: '',
      status: 'active',
      created_at: new Date().toISOString()
    }
  ];

  const allPosts = [
    ...ads.map(a => ({...a, isSponsored: true})), 
    ...userPosts.map(p => ({...p, isSponsored: false})),
    ...regularPosts
  ];
  
  const sortedPosts = allPosts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <div className="space-y-6 pb-20 pt-24 px-4 max-w-7xl mx-auto">
      <MultiStepNoticeModal isOpen={showWelcomeModal} onClose={() => setShowWelcomeModal(false)} />
      
      <HeroSlider />

      <div className="space-y-3 max-w-2xl mx-auto w-full">
        <div className="grid grid-cols-2 gap-4 w-full">
          {/* GNG Points Card with Highlight Effect */}
          <motion.div 
            initial={{ scale: 1 }}
            animate={{ 
              boxShadow: ["0px 0px 0px rgba(59, 130, 246, 0)", "0px 0px 20px rgba(59, 130, 246, 0.4)", "0px 0px 0px rgba(59, 130, 246, 0)"]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="bg-white p-5 rounded-3xl border-2 border-blue-100 shadow-sm space-y-2 relative overflow-hidden group"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">GNG Points</p>
            </div>
            <div className="flex flex-col">
              <motion.p 
                key={user?.points}
                initial={{ scale: 1.2, color: "#2563eb" }}
                animate={{ scale: 1, color: "#0f172a" }}
                className="text-3xl font-display font-black text-slate-900 leading-none"
              >
                {user?.points || 500}
              </motion.p>
              <p className="text-[10px] font-bold text-emerald-600 mt-1">Rs {(user?.points || 500) * 0.5}</p>
            </div>
            <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-blue-50 rounded-full blur-2xl group-hover:bg-blue-100 transition-colors" />
          </motion.div>

          {/* Invite Friends Card */}
          <Link 
            to="/invite"
            className="bg-blue-600 p-5 rounded-3xl shadow-lg shadow-blue-200/50 flex flex-col justify-between text-white relative overflow-hidden group transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-blue-100" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-100">Invite Friends</p>
              </div>
              <p className="text-xl font-display font-bold leading-tight">Get 100<br/>Points</p>
            </div>
            <div className="relative z-10 mt-4">
              <div className="inline-flex items-center gap-1 text-[10px] font-bold bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                Invite Now <ArrowRight size={12} />
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
          </Link>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-display font-bold text-xl px-2">News Feed</h3>
        {sortedPosts.map(post => (
          <PostCard key={post.id} ad={post as any} />
        ))}
        {sortedPosts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500">No posts yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ExchangePage = ({ user }: { user: User | null }) => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const rate = 0.5;

  return (
    <div className="pt-24 pb-20 px-4 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-display font-bold">Exchange Points</h2>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl border border-blue-100">
          <div>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Current Rate</p>
            <p className="text-lg font-bold text-slate-900">1 Point = Rs. {rate}</p>
          </div>
          <Repeat className="text-blue-600" size={24} />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Points to Exchange</label>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              placeholder="Enter points"
            />
            <p className="text-[10px] text-slate-400 mt-1">Available: {user?.points.toLocaleString()} Points</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">You will receive</p>
            <p className="text-2xl font-display font-bold text-slate-900">Rs. {(Number(amount) * rate).toLocaleString()}</p>
          </div>
        </div>

        <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
          Confirm Exchange
        </button>
      </div>
    </div>
  );
};

const DepositPage = ({ user }: { user: User | null }) => {
  const navigate = useNavigate();
  const [method, setMethod] = useState('JazzCash');
  
  const methods = [
    { id: 'JazzCash', icon: Smartphone, label: 'JazzCash' },
    { id: 'EasyPaisa', icon: Smartphone, label: 'EasyPaisa' },
    { id: 'Bank', icon: Building2, label: 'Bank' },
    { id: 'Crypto', icon: Bitcoin, label: 'Crypto USDT' },
  ];

  return (
    <div className="pt-24 pb-20 px-4 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-display font-bold">Deposit Funds</h2>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <h4 className="text-sm font-bold text-slate-900 mb-4">Select Deposit Method</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {methods.map((m) => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={cn(
                  "flex flex-col items-center gap-2 p-3 rounded-xl border transition-all",
                  method === m.id ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-100 hover:border-slate-200 text-slate-500"
                )}
              >
                <m.icon size={20} />
                <span className="text-[10px] font-bold">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Payment Details ({method})</p>
          <p className="text-sm font-bold text-slate-900">Account Name: GNG Social</p>
          <p className="text-sm font-bold text-slate-900">Account Number: 0300-1234567</p>
          <p className="text-[10px] text-blue-500 mt-2 italic">* Please send the amount and paste the Transaction ID below.</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Amount to Deposit (PKR)</label>
            <input 
              type="number" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              placeholder="Enter amount"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Transaction ID</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              placeholder="Enter TRX ID"
            />
          </div>
        </div>

        <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
          Submit Deposit
        </button>
      </div>
    </div>
  );
};

const TransferPage = ({ user }: { user: User | null }) => {
  const navigate = useNavigate();

  return (
    <div className="pt-24 pb-20 px-4 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-display font-bold">Transfer Points</h2>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-2xl border border-purple-100">
          <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center text-white">
            <Send size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-purple-600 uppercase tracking-wider">Available Balance</p>
            <p className="text-lg font-bold text-slate-900">{user?.points.toLocaleString()} Points</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Recipient ID or Email</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              placeholder="Enter recipient details"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Amount to Transfer</label>
            <input 
              type="number" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              placeholder="Enter points"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Note (Optional)</label>
            <textarea 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all h-24 resize-none"
              placeholder="Add a message..."
            />
          </div>
        </div>

        <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
          Send Points
        </button>
      </div>
    </div>
  );
};

const HistoryPage = () => {
  const navigate = useNavigate();
  const transactions = [
    { id: 1, type: 'Deposit', amount: '+ Rs. 5,000', status: 'Completed', date: '2024-03-01', icon: ArrowDownLeft, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 2, type: 'Withdraw', amount: '- Rs. 2,000', status: 'Pending', date: '2024-02-28', icon: ArrowUpRight, color: 'text-red-500', bg: 'bg-red-50' },
    { id: 3, type: 'Transfer', amount: '- 500 Pts', status: 'Completed', date: '2024-02-25', icon: Send, color: 'text-purple-500', bg: 'bg-purple-50' },
    { id: 4, type: 'Exchange', amount: '1,000 Pts', status: 'Completed', date: '2024-02-20', icon: Repeat, color: 'text-blue-500', bg: 'bg-blue-50' },
  ];

  return (
    <div className="pt-24 pb-20 px-4 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-display font-bold">Transaction History</h2>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
        {transactions.map((tx) => (
          <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", tx.bg, tx.color)}>
                <tx.icon size={24} />
              </div>
              <div>
                <p className="font-bold text-slate-900">{tx.type}</p>
                <p className="text-[10px] text-slate-400 font-medium">{tx.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={cn("font-bold text-sm", tx.color)}>{tx.amount}</p>
              <p className={cn(
                "text-[10px] font-bold",
                tx.status === 'Completed' ? "text-emerald-500" : "text-amber-500"
              )}>{tx.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PointsDashboard = ({ user }: { user: User | null }) => {
  const pkrRate = 0.5; // 1 point = 0.5 PKR
  const pkrValue = (user?.points || 0) * pkrRate;

  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-2xl font-display font-bold">GNG Point Dashboard</h2>
        <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          <CheckCircle2 size={14} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Your Wallet verified</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {/* Combined Points & PKR Card */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-4 text-white shadow-lg relative overflow-hidden flex flex-col justify-center min-h-[120px]">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 blur-2xl" />
          <div className="space-y-3 relative z-10">
            <div>
              <p className="text-white/70 text-[9px] font-bold uppercase tracking-widest mb-1">GNG Points</p>
              <h3 className="text-2xl font-display font-bold leading-none">{user?.points.toLocaleString()}</h3>
            </div>
            <div className="pt-2 border-t border-white/10">
              <p className="text-white/70 text-[9px] font-bold uppercase tracking-widest mb-1">PKR Value</p>
              <h3 className="text-lg font-display font-bold leading-none text-emerald-300">Rs. {pkrValue.toLocaleString()}</h3>
            </div>
          </div>
        </div>
        
        {/* Available Balance Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-center min-h-[120px] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-12 -mt-12 blur-2xl opacity-50 group-hover:bg-blue-100 transition-colors" />
          <div className="space-y-2 relative z-10">
            <div>
              <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest mb-1">Available Balance</p>
              <h3 className="text-2xl font-display font-bold text-slate-900 leading-none">Rs 500</h3>
            </div>
            <p className="text-[9px] text-slate-400 font-medium leading-tight">Believe under text use for ads running</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Link to="/deposit" className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-blue-600 transition-all group">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
            <ArrowDownLeft size={24} />
          </div>
          <span className="font-bold text-slate-700">Deposit</span>
        </Link>
        <Link to="/withdraw" className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-red-500 transition-all group">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
            <ArrowUpRight size={24} />
          </div>
          <span className="font-bold text-slate-700">Withdraw</span>
        </Link>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Repeat, label: 'Exchange', color: 'bg-blue-100 text-blue-600', path: '/exchange' },
          { icon: Send, label: 'Transfer', color: 'bg-purple-100 text-purple-600', path: '/transfer' },
          { icon: History, label: 'History', color: 'bg-slate-100 text-slate-600', path: '/history' },
        ].map((item, i) => (
          <Link key={i} to={item.path} className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors">
            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", item.color)}>
              <item.icon size={20} />
            </div>
            <span className="text-xs font-bold text-slate-600">{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 text-white space-y-6">
        <h4 className="text-xl font-display font-bold flex items-center gap-2">
          <ExternalLink size={20} className="text-blue-400" />
          How it Works
        </h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h5 className="font-bold text-blue-400 uppercase text-xs tracking-widest">Withdrawals</h5>
            <p className="text-sm text-slate-300 leading-relaxed">
              You can withdraw your earned GNG Points into PKR or Crypto. 
              Simply go to the Withdraw section, select your preferred method (JazzCash, EasyPaisa, Bank, or USDT), 
              and enter the amount. Withdrawals are processed within 24-48 hours.
            </p>
          </div>
          <div className="space-y-3">
            <h5 className="font-bold text-emerald-400 uppercase text-xs tracking-widest">Deposits & Ads</h5>
            <p className="text-sm text-slate-300 leading-relaxed">
              Deposit funds using PKR or Crypto to run your own advertisement campaigns. 
              Boost your social presence, get more followers, and increase engagement 
              by creating ads directly from the Ads Manager.
            </p>
          </div>
        </div>
        <div className="pt-4 flex flex-wrap gap-4">
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
            <CreditCard size={16} className="text-blue-400" />
            <span className="text-xs font-bold">PKR Support</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
            <Bitcoin size={16} className="text-amber-400" />
            <span className="text-xs font-bold">Crypto Currency</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const InviteFriendsPage = ({ user }: { user: User | null }) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const referralLink = `https://gngsocial.com/register?ref=${user?.referral_code || 'GNG123'}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join GNG Social Media',
        text: 'Join GNG Social Media and earn points!',
        url: referralLink,
      });
    } else {
      handleCopy();
    }
  };

  const history = [
    { name: 'Ahmad Khan', status: 'verified', points: 100, date: '2 hours ago' },
    { name: 'Sara Malik', status: 'pending', points: 100, date: '1 day ago' },
    { name: 'John Doe', status: 'expired', points: 0, date: '4 days ago' },
    { name: 'Zainab Bibi', status: 'verified', points: 100, date: '5 days ago' },
    { name: 'Ali Raza', status: 'pending', points: 100, date: '2 days ago' },
  ];

  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-display font-bold text-slate-900">Invite Friends</h2>
      </div>

      {/* SECTION 1: Active Account Card */}
      <div className="flex justify-center">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 text-center max-w-xs w-full relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-600" />
          <h3 className="text-sm font-bold text-slate-900 mb-1">Your Active Account</h3>
          <p className="text-2xl font-display font-black text-blue-600">600</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">All Your Invite Friends</p>
        </div>
      </div>

      {/* SECTION 2: Invite Statistics */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left Card */}
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/40 relative overflow-hidden">
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
            <UserCheck size={20} />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Verified Invite</p>
          <h4 className="text-3xl font-display font-bold text-slate-900 mb-2">400</h4>
          <div className="pt-3 border-t border-slate-50">
            <p className="text-[10px] font-bold text-emerald-600">Total Earn GNG Point: 5000</p>
          </div>
        </div>

        {/* Right Card */}
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/40 relative overflow-hidden">
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 mb-4">
            <Clock size={20} />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Unverified Invite</p>
          <h4 className="text-3xl font-display font-bold text-slate-900 mb-2">100</h4>
          <div className="pt-3 border-t border-slate-50">
            <p className="text-[10px] font-bold text-amber-600">Pending GNG Point: 500</p>
          </div>
        </div>
      </div>

      {/* SECTION 3: Info Text Box */}
      <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-lg shadow-blue-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
        <div className="flex gap-4 relative z-10">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0 backdrop-blur-md">
            <Info size={24} />
          </div>
          <div className="space-y-1">
            <p className="font-bold text-lg">Apna account activate karo.</p>
            <p className="text-sm text-blue-50 leading-relaxed">
              Jab aapka invited user Point withdraw karega ya Exchange karega, 
              aapko <span className="font-bold text-white">5% – 10% commission</span> milega.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 4: Referral Link Card */}
      <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/60 space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl font-display font-bold text-slate-900">Your Referral Link</h3>
          <p className="text-sm text-slate-500">Share this link with your friends to earn rewards together.</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input 
              type="text" 
              readOnly 
              value={referralLink}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-medium text-slate-600 outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            />
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleCopy}
              className={cn(
                "flex-1 md:flex-none px-8 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg",
                copied ? "bg-emerald-600 text-white shadow-emerald-200" : "bg-slate-900 text-white shadow-slate-200 hover:bg-slate-800"
              )}
            >
              {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button 
              onClick={handleShare}
              className="flex-1 md:flex-none px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              <Share2 size={18} />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 5: Invite History Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xl font-display font-bold text-slate-900">Invite History</h3>
          <button className="text-xs font-bold text-blue-600">View All</button>
        </div>

        <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
          <div className="divide-y divide-slate-50">
            {history.map((item, i) => (
              <div key={i} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
                    item.status === 'verified' ? "bg-emerald-50 text-emerald-600" : 
                    item.status === 'pending' ? "bg-amber-50 text-amber-600" : 
                    "bg-red-50 text-red-600"
                  )}>
                    {item.status === 'verified' ? <UserCheck size={24} /> : 
                     item.status === 'pending' ? <Clock size={24} /> : 
                     <UserX size={24} />}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{item.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "font-bold text-sm",
                    item.status === 'verified' ? "text-emerald-600" : 
                    item.status === 'pending' ? "text-amber-600" : 
                    "text-red-600"
                  )}>
                    {item.status === 'verified' ? `+${item.points} Points` : 
                     item.status === 'pending' ? 'Pending' : 
                     'Expired'}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {item.status === 'verified' ? 'Points Credited' : 
                     item.status === 'pending' ? 'Points Pending' : 
                     'Points Expired'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-start justify-between gap-4 group">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
              <AlertTriangle size={20} />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              <span className="font-bold text-slate-900">Note:</span> If invite verifies within 3 days, points will be credited. Otherwise, points expire.
            </p>
          </div>
          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-xl transition-all shadow-sm md:opacity-0 group-hover:opacity-100">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const WithdrawPage = ({ user }: { user: User | null }) => {
  const navigate = useNavigate();
  const [method, setMethod] = useState('JazzCash');
  const pkrRate = 0.25; // Example rate for withdrawal calculation
  
  const methods = [
    { id: 'JazzCash', icon: Smartphone, label: 'JazzCash' },
    { id: 'EasyPaisa', icon: Smartphone, label: 'EasyPaisa' },
    { id: 'Bank', icon: Building2, label: 'Bank' },
    { id: 'Crypto', icon: Bitcoin, label: 'Crypto USDT' },
  ];

  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-display font-bold">Withdraw Points</h2>
      </div>

      <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden flex flex-col justify-center min-h-[160px]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
        <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-1">All Withdraw</p>
        <h3 className="text-3xl font-display font-bold">20k Point</h3>
        <div className="flex items-center gap-2 text-white font-bold mt-2">
          <span className="text-lg">Value PKR 5000</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <h4 className="text-sm font-bold text-slate-900 mb-4">Your account added</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {methods.map((m) => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={cn(
                  "flex flex-col items-center gap-2 p-3 rounded-xl border transition-all",
                  method === m.id ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-100 hover:border-slate-200 text-slate-500"
                )}
              >
                <m.icon size={20} />
                <span className="text-[10px] font-bold">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Account Number</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              placeholder="Enter account number"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Enter Amount</label>
            <input 
              type="number" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              placeholder="Enter points to withdraw"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Enter Transaction Code</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              placeholder="Enter your 6-digit code"
            />
          </div>
        </div>

        <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
          Withdraw Now
        </button>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-display font-bold px-2">Withdraw History</h4>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
          {[
            { id: 1, method: 'JazzCash', amount: '5,000 Points', status: 'Completed', date: '2024-03-01' },
            { id: 2, method: 'EasyPaisa', amount: '2,500 Points', status: 'Pending', date: '2024-02-28' },
            { id: 3, method: 'Bank', amount: '10,000 Points', status: 'Completed', date: '2024-02-25' },
          ].map((item) => (
            <div key={item.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                  <History size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold">{item.method}</p>
                  <p className="text-[10px] text-slate-400">{item.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">{item.amount}</p>
                <p className={cn(
                  "text-[10px] font-bold",
                  item.status === 'Completed' ? "text-emerald-500" : "text-amber-500"
                )}>{item.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CreateAdsPage = ({ user, ads, onAdCreated }: { user: User | null, ads: Ad[], onAdCreated: (ad: Ad) => void }) => {
  const [step, setStep] = useState<'list' | 'create' | 'preview'>('list');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    campaign_name: '',
    budget_type: 'daily' as 'daily' | 'lifetime',
    budget_amount: 100,
    target_audience: 'All Users',
    image_url: '',
    title: '',
    description: '',
    cta_text: 'WhatsApp Now',
    duration_days: 7
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image_url: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const newAd: Ad = {
      ...formData,
      id: Math.floor(Date.now() + Math.random() * 1000000),
      user_id: user?.id || 0,
      status: 'active',
      created_at: new Date().toISOString()
    };
    
    onAdCreated(newAd);
    setStep('list');
    alert('Ad campaign created successfully!');
    setFormData({
      campaign_name: '',
      budget_type: 'daily',
      budget_amount: 100,
      target_audience: 'All Users',
      image_url: '',
      title: '',
      description: '',
      cta_text: 'WhatsApp Now',
      duration_days: 7
    });
  };

  const userAds = ads.filter(ad => ad.user_id === user?.id);

  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold">Ads Manager</h2>
        {step === 'list' && (
          <button 
            onClick={() => setStep('create')}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"
          >
            <PlusSquare size={18} />
            Create Campaign
          </button>
        )}
      </div>

      {step === 'list' && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                <LayoutDashboard size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Campaign Overview</h3>
                <p className="text-xs text-slate-500">Manage your active and past advertisements</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-xl font-bold">{userAds.length}</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold">Active</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-xl font-bold">{(userAds.length * 125).toLocaleString()}</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold">Reach</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-xl font-bold">{(userAds.length * 42).toLocaleString()}</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold">Clicks</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <span className="text-sm font-bold">Your Campaigns</span>
              <button className="text-xs text-blue-600 font-bold">View All</button>
            </div>
            <div className="divide-y divide-slate-100">
              {userAds.length > 0 ? userAds.map(ad => (
                <div key={ad.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg overflow-hidden">
                      <img src={ad.image_url || `https://picsum.photos/seed/${ad.id}/100/100`} alt="Ad" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{ad.campaign_name}</p>
                      <p className="text-[10px] text-slate-500 capitalize">{ad.status} • {ad.duration_days} days</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-slate-400 hover:text-blue-600"><Pause size={16} /></button>
                    <button className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                  </div>
                </div>
              )) : (
                <div className="p-8 text-center text-slate-400 text-sm">
                  No campaigns found. Create your first ad!
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {step === 'create' && (
        <div className="space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-full overflow-hidden shrink-0">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`} alt="User" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{user?.email.split('@')[0]}</p>
                  <div className="flex items-center gap-1 bg-slate-100 w-fit px-2 py-0.5 rounded-md mt-1">
                    <Users size={10} />
                    <span className="text-[10px] font-bold">Public</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Campaign Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
                  placeholder="e.g. Summer Product Launch"
                  value={formData.campaign_name}
                  onChange={e => setFormData({...formData, campaign_name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Ad Title</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none text-sm"
                  placeholder="Catchy headline"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Ad Description</label>
                <textarea 
                  required
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none h-24 text-sm resize-none"
                  placeholder="What is your ad about?"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                className="hidden" 
              />

              {!formData.image_url ? (
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-slate-100 transition-colors group"
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <ImageIcon size={24} className="text-emerald-500" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-slate-700">Add Ad Media</p>
                    <p className="text-xs text-slate-500">Select a photo for your campaign</p>
                  </div>
                </button>
              ) : (
                <div className="relative rounded-xl overflow-hidden border border-slate-200">
                  <img src={formData.image_url} alt="Preview" className="w-full h-auto" />
                  <button 
                    onClick={() => setFormData({...formData, image_url: ''})}
                    className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Budget Type</label>
                  <select 
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none text-sm"
                    value={formData.budget_type}
                    onChange={e => setFormData({...formData, budget_type: e.target.value as any})}
                  >
                    <option value="daily">Daily Budget</option>
                    <option value="lifetime">Lifetime Budget</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Amount (Points)</label>
                  <input 
                    type="number" 
                    required
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none text-sm"
                    value={formData.budget_amount}
                    onChange={e => setFormData({...formData, budget_amount: Number(e.target.value)})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">CTA Button</label>
                  <select 
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none text-sm"
                    value={formData.cta_text}
                    onChange={e => setFormData({...formData, cta_text: e.target.value})}
                  >
                    <option>WhatsApp Now</option>
                    <option>Install Now</option>
                    <option>Shop Now</option>
                    <option>Learn More</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Duration (Days)</label>
                  <input 
                    type="number" 
                    required
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none text-sm"
                    value={formData.duration_days}
                    onChange={e => setFormData({...formData, duration_days: Number(e.target.value)})}
                  />
                </div>
              </div>
            </div>

          <div className="flex gap-3">
            <button 
              type="button"
              onClick={() => setStep('list')}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="button"
              onClick={() => setStep('preview')}
              className="flex-1 px-4 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-lg"
            >
              Preview Ad
            </button>
          </div>
        </div>
      )}

      {step === 'preview' && (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-center gap-3 text-blue-700">
            <Bell size={20} />
            <p className="text-sm font-medium">This is how your ad will appear to other users in their feed.</p>
          </div>

          <PostCard ad={{
            ...formData,
            id: 0,
            user_id: user?.id || 0,
            status: 'active',
            created_at: new Date().toISOString()
          } as Ad} />

          <div className="flex gap-3 max-w-2xl mx-auto">
            <button 
              type="button"
              onClick={() => setStep('create')}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-white transition-colors"
            >
              Edit Ad
            </button>
            <button 
              type="button"
              onClick={handleSubmit}
              className="flex-1 px-4 py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors shadow-lg"
            >
              Confirm & Publish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const AdminPanel = ({ stats }: { stats: AdminStats | null }) => {
  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold">Admin Control Center</h2>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
          <ShieldCheck size={14} />
          System Secure
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Total Users</p>
          <p className="text-3xl font-display font-bold">{stats?.totalUsers || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Active Ads</p>
          <p className="text-3xl font-display font-bold">{stats?.totalAds || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Total Points Circulating</p>
          <p className="text-3xl font-display font-bold">{stats?.totalPoints?.toLocaleString() || 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50 font-bold text-sm">Recent Security Logs</div>
          <div className="p-4 space-y-3">
            {[
              { event: 'New user registered', time: '2 mins ago', icon: UserIcon, color: 'text-blue-500' },
              { event: 'Ad campaign approved', time: '15 mins ago', icon: CheckCircle2, color: 'text-emerald-500' },
              { event: 'Withdrawal request', time: '1 hour ago', icon: ArrowUpRight, color: 'text-red-500' },
            ].map((log, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <log.icon size={14} className={log.color} />
                  <span className="font-medium">{log.event}</span>
                </div>
                <span className="text-slate-400">{log.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50 font-bold text-sm">Quick Controls</div>
          <div className="p-4 grid grid-cols-2 gap-3">
            <button className="p-3 bg-slate-50 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors flex items-center gap-2">
              <Settings size={14} /> System Settings
            </button>
            <button className="p-3 bg-slate-50 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors flex items-center gap-2">
              <Users size={14} /> User Management
            </button>
            <button className="p-3 bg-slate-50 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors flex items-center gap-2">
              <PlusSquare size={14} /> Ads Approval
            </button>
            <button className="p-3 bg-slate-50 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors flex items-center gap-2 text-red-600">
              <LogOut size={14} /> Logout Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [ads, setAds] = useState<Ad[]>([]);
  const [userPosts, setUserPosts] = useState<Ad[]>([]);
  const [adminStats, setAdminStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const [userRes, adsRes, statsRes] = await Promise.all([
        fetch('/api/user/user@example.com'),
        fetch('/api/ads'),
        fetch('/api/admin/stats')
      ]);
      
      if (userRes.ok) setUser(await userRes.json());
      if (adsRes.ok) setAds(await adsRes.json());
      if (statsRes.ok) setAdminStats(await statsRes.json());
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button')) {
        const event = new CustomEvent('trigger-burst', { 
          detail: { x: e.clientX, y: e.clientY } 
        });
        window.dispatchEvent(event);
      }
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    // In a real app, we would redirect to /feed or /
  };

  const handlePostCreated = (newPost: Ad) => {
    setUserPosts(prev => [newPost, ...prev]);
  };

  const handleAdCreated = (newAd: Ad) => {
    setAds(prev => [newAd, ...prev]);
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <BurstContainer />
        <SocialLinksModal isOpen={isSocialModalOpen} onClose={() => setIsSocialModalOpen(false)} />
        {isAuthenticated && <Header />}
        
        <main className={cn(isAuthenticated ? "max-w-7xl mx-auto" : "")}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={isAuthenticated ? <HomePage user={user} ads={ads} userPosts={userPosts} /> : <LandingPage />} />
            <Route path="/login" element={<LoginPage onLogin={handleAuthSuccess} />} />
            <Route path="/register" element={<RegisterPage onRegister={handleAuthSuccess} />} />

            {/* Protected Routes */}
            {isAuthenticated ? (
              <>
                <Route path="/points" element={<PointsDashboard user={user} />} />
                <Route path="/deposit" element={<DepositPage user={user} />} />
                <Route path="/exchange" element={<ExchangePage user={user} />} />
                <Route path="/transfer" element={<TransferPage user={user} />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/withdraw" element={<WithdrawPage user={user} />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/create-post" element={<CreatePostPage user={user} onPostCreated={handlePostCreated} />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/ads" element={<CreateAdsPage user={user} ads={ads} onAdCreated={handleAdCreated} />} />
                <Route path="/invite" element={<InviteFriendsPage user={user} />} />
                <Route path="/account" element={
                  <div className="pt-24 pb-20 px-4 max-w-2xl mx-auto space-y-6">
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-10" />
                      

                      <div className="relative">
                      <div className="relative inline-block">
                        <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 overflow-hidden border-4 border-white shadow-lg">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`} alt="Profile" />
                        </div>
                      </div>
                        <h3 className="text-2xl font-display font-bold text-slate-900">{user?.email?.split('@')[0]}</h3>
                        <p className="text-xs text-slate-500 mb-6">Member since {new Date(user?.created_at || '').toLocaleDateString()}</p>
                        
                        <div className="grid grid-cols-3 gap-4 mb-8 border-y border-slate-100 py-4">
                          <div className="text-center">
                            <p className="text-lg font-bold text-slate-900">1.2k</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Followers</p>
                          </div>
                          <div className="text-center border-x border-slate-100">
                            <p className="text-lg font-bold text-slate-900">450</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Following</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-bold text-slate-900">8.9k</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Likes</p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 text-sm">
                            Edit Profile
                          </button>
                          <Link to="/chat" className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-sm">
                            <MessageCircle size={18} />
                            Messages
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Link to="/ads" className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center gap-2 hover:bg-slate-50 transition-colors">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                          <LayoutDashboard size={20} />
                        </div>
                        <span className="text-xs font-bold text-slate-700">Ads Manager</span>
                      </Link>
                      <Link to="/invite" className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center gap-2 hover:bg-slate-50 transition-colors">
                        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                          <Users size={20} />
                        </div>
                        <span className="text-xs font-bold text-slate-700">Invite Friends</span>
                      </Link>
                    </div>

                    <Link to="/mlm-plan" className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 rounded-3xl text-white shadow-lg relative overflow-hidden group block">
                      <div className="relative z-10 flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-display font-bold">GNG Agent MLM Plan</h4>
                          <p className="text-xs text-indigo-100 mt-1">Build your team and earn more rewards</p>
                        </div>
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform">
                          <ArrowRight size={24} />
                        </div>
                      </div>
                      <Star className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10 rotate-12" />
                    </Link>
                    
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                      {[
                        { icon: Settings, label: 'Account Settings', path: '/settings' },
                        { icon: Info, label: 'System Notices', path: '/notice' },
                        { icon: ShieldCheck, label: 'Security & Privacy', path: '/security' },
                        { icon: Bell, label: 'Notifications' },
                        { icon: ExternalLink, label: 'Help & Support', path: '/support' },
                        { icon: LogOut, label: 'Logout', color: 'text-red-500', action: () => setIsAuthenticated(false) },
                      ].map((item, i) => (
                        <Link 
                          key={i} 
                          to={item.path || '#'}
                          onClick={item.action}
                          className={cn(
                            "w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0",
                            item.color
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon size={20} />
                            <span className="font-medium">{item.label}</span>
                          </div>
                          <ChevronRight size={18} className="text-slate-300" />
                        </Link>
                      ))}
                    </div>
                  </div>
                } />
                <Route path="/mlm-plan" element={<MLMPlanDashboard />} />
                <Route path="/notice" element={<SystemNoticePage />} />
                <Route path="/settings" element={<AccountSettingsPage />} />
                <Route path="/security" element={<SecurityPrivacyPage />} />
                <Route path="/support" element={<HelpSupportPage />} />
                <Route path="/user/:id" element={<UserProfilePage user={user} />} />
                <Route path="/admin" element={<AdminPanel stats={adminStats} />} />
              </>
            ) : (
              <Route path="*" element={<LandingPage />} />
            )}
          </Routes>
        </main>

        {isAuthenticated && <BottomNav />}
        <DraggableFloatingMenu />
      </div>
    </Router>
  );
}
