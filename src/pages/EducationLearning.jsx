import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import {
  BookOpen,
  Users,
  Lightbulb,
  MessageSquare,
  ThumbsUp,
  Send,
  Search,
  Share2,
  Plus,
  HelpCircle,
  CheckCircle,
  Sparkles,
  Filter,
  ChevronDown,
  ArrowUp,
  Bookmark,
  ChevronRight
} from 'lucide-react';
import { toast } from 'react-hot-toast';

// Initial Tips & Tricks Data
const TIPS_AND_TRICKS = [
  {
    id: 1,
    category: 'Clearing Dues',
    title: 'The Snowflake Method: Micro-payments',
    summary: 'Squeeze extra debt payments out of your budget by making small micro-payments of 100 ₹ to 1,000 ₹ several times a month.',
    readTime: '4 min read',
    upvotes: 42,
    bookmarked: false,
    content: `
### What is the Snowflake Method?
While the Snowball and Avalanche methods focus on large, monthly extra payments toward your dues, the **Snowflake Method** is about making micro-payments throughout the month. Whenever you find a spare 100 ₹, 200 ₹, or 500 ₹, you immediately transfer it to your active debt.

### How to Find "Snowflakes"
1. **Rounded Transactions:** Did you spend 180 ₹ on lunch? Round it to 200 ₹ and transfer the remaining 20 ₹ to your loan.
2. **Refunds & Cashbacks:** Put any digital wallet cashback or refunds directly toward your balance.
3. **No-Spend Days:** Challenge yourself to a no-spend day. Transfer the money you would have spent on coffee or snacks immediately to your dues.

### Why It Works
- **Reduces Daily Interest Accumulation:** For many credit cards and personal loans, interest is calculated daily. Reducing your principal mid-month immediately lowers the interest charges.
- **Prevents Impulse Buying:** By sweeping small amounts of spare cash out of your account immediately, you remove the temptation to spend it.
    `,
    author: 'Aarav Mehta, Financial Guide'
  },
  {
    id: 2,
    category: 'Negotiation Hacks',
    title: 'Credit Card Interest Rate Negotiation Script',
    summary: 'A step-by-step phone script to negotiate a lower interest rate (APR) with your card issuer or bank.',
    readTime: '6 min read',
    upvotes: 89,
    bookmarked: false,
    content: `
### Negotiating Your Interest Rate
Many credit card companies are willing to lower your interest rate if you have a history of on-time payments, or if you simply ask. A lower rate means more of your payment goes toward principal, helping you clear the dues faster.

### Pre-negotiation Checklist
- Know your current interest rate (APR).
- Know your credit score (e.g., CIBIL score). If it's above 750, you have strong leverage.
- Check competing offers from other banks to use as leverage.

### The Phone Script
When you call your bank's customer support, follow this structure:

**You:** *"Hello, I have been a customer since [Year] and have a strong record of on-time payments. I recently received an offer from [Competitor Bank] for a credit card with an interest rate of 14% APR. I would prefer to stay with you, but I need you to lower my current rate of 22% to match it."*

**Support agent:** *"I'm sorry, we cannot offer matches at this time."*

**You:** *"I understand you have guidelines, but as a loyal customer who has never missed a payment, I would like to speak to a supervisor in the account retention or customer loyalty department to see if we can find a solution before I transfer my balance."*

**Once connected to Supervisor:** *"I am reviewing my high-interest debts and plan to clear them. I want to pay you, but the 22% rate makes it difficult. Can you lower my APR to 14%, or offer a temporary promotional interest relief rate for the next 12 months?"*

### Tips for Success
- **Be polite but firm:** Customer service reps are more likely to help cooperative callers.
- **Ask for temporary relief if permanent is denied:** Sometimes banks offer a 6-month promotional 0% or low-interest window.
    `,
    author: 'Neha Sharma, Debt Specialist'
  },
  {
    id: 3,
    category: 'Psychology & Habits',
    title: 'Dopamine Hacking the Debt Snowball Loop',
    summary: 'Keep yourself motivated by gamifying your payment milestones. Learn why psychological wins clear debt faster than pure math.',
    readTime: '3 min read',
    upvotes: 56,
    bookmarked: false,
    content: `
### The Psychology of Debt Clearance
Paying off dues is as much about psychological endurance as it is about mathematics. The reason the **Debt Snowball** (paying off the smallest balance first) succeeds is because it provides immediate positive feedback to your brain.

### How to Create a Dopamine Loop
1. **Visual Tracker:** Create a physical or digital coloring tracker. Color in progress blocks for every 1,000 ₹ paid off. Seeing the chart fill up releases dopamine.
2. **Set "Micro-Milestones":** Don't just target the final zero. Celebrate paying off 10%, 25%, and 50% of an individual loan.
3. **The "Reward Cache":** Set aside a small, guilt-free reward for each milestone (e.g., watching a movie or ordering a favorite dessert). This reinforces the positive payment behavior.

### Dealing with Budget Fatigue
Budget fatigue is real. If you restrict yourself too much, you might end up "revenge spending". Build a tiny "fun fund" into your monthly budget. It's better to pay off your dues 5% slower than to burn out completely and give up.
    `,
    author: 'Dr. Kabir Sen, Behavioral Economist'
  },
  {
    id: 4,
    category: 'Budgeting',
    title: 'The 50/30/20 Debt-First Flip',
    summary: 'Adjust the traditional 50/30/20 budget to aggressively tackle outstanding dues without feeling deprived.',
    readTime: '5 min read',
    upvotes: 74,
    bookmarked: false,
    content: `
### What is the 50/30/20 Rule?
The standard rule recommends allocation as:
- **50% Needs** (Rent, groceries, utilities)
- **30% Wants** (Dining out, entertainment)
- **20% Savings** (Investments, emergency fund)

### The "Debt-First Flip" Adjustment
When you carry high-interest dues, savings should be minimized (except for a basic emergency fund) and wants must be scaled down. Adjust the structure like this:
- **50% Needs**
- **35% Debt Payoff** (Extra payments beyond minimum EMIs)
- **10% Basic Wants** (Prevents burnout)
- **5% Emergency Buffer** (To avoid taking new loans during an emergency)

### Implementation Steps
1. **Automate Dues:** Set your auto-debits to trigger immediately on salary day.
2. **Audit Wants:** Review bank accounts for hidden subscriptions and cancel everything you haven't used in the last 30 days.
3. **The Buffer Safeguard:** Maintain an emergency fund of at least 15,000 ₹ to 30,000 ₹. If you have no cash buffer, any minor emergency (like medical expenses or vehicle repair) will force you to swipe a credit card, restarting the cycle.
    `,
    author: 'Riya Kapoor, Certified Financial Planner'
  },
  {
    id: 5,
    category: 'Income Boosters',
    title: 'Side Hustles That Pay Directly to Debt',
    summary: 'How to scale your monthly income and isolate that cash strictly for extra EMI payments.',
    readTime: '5 min read',
    upvotes: 38,
    bookmarked: false,
    content: `
### The Power of Income Scaling
You can only cut expenses so much before reaching a hard limit. However, your income potential has no ceiling. An extra 5,000 ₹ per month allocated entirely to your highest-interest loan can shave years off your repayment timeline.

### How to Side-Hustle Effectively
1. **Skill Monetization:** Offer freelance writing, digital design, coding, or translation.
2. **Asset Utilization:** If you have a vehicle, consider peak-hour delivery gigs.
3. **Micro-tasks:** Complete digital surveys or transcribe audio during your daily commute.

### The "Escrow" Mental Trick
The biggest danger of making extra money is "lifestyle creep"—spending the extra income on dining out or shopping.
- Set up a separate bank account.
- Direct all freelance or side-gig payments to this account.
- Do not order a debit card for this account. Set up a single recurring transfer from it straight to your credit card or loan balance.
    `,
    author: 'Amit Verma, Side Hustle Creator'
  }
];

// Initial Forum Threads Data
const INITIAL_FORUM_POSTS = [
  {
    id: 1,
    user: 'Rohan_K',
    role: 'Member',
    badge: 'Debt Crusher (70% cleared)',
    avatar: '👨‍💼',
    title: 'Cleared my 3.5 Lakh Personal Loan in 14 months! Ask me anything.',
    content: 'Just made the final payment today! It was a grueling journey of strict budgeting, side hustles, and eating home-cooked meals. I used the Avalanche Method to tackle a 15% interest personal loan. Happy to share my monthly budget template and tips for negotiating interest waivers with banks.',
    category: 'Success Stories',
    likes: 28,
    hasLiked: false,
    date: '2 hours ago',
    replies: [
      {
        id: 101,
        user: 'Priya_S',
        avatar: '👩‍💻',
        text: 'Congratulations! This is incredibly inspiring. How did you handle the mental fatigue around month 8-9? I am currently struggling to stay motivated.',
        date: '1 hour ago'
      },
      {
        id: 102,
        user: 'Rohan_K',
        avatar: '👨‍💼',
        text: 'Hi Priya! Honestly, month 8 was my lowest point. What helped me was printing out a visual chart and coloring it. I also set a rule that for every 10,000 ₹ I paid off, I would treat myself to a nice home-cooked steak or premium coffee. Hang in there, it is so worth the feeling of freedom!',
        date: '45 mins ago'
      }
    ]
  },
  {
    id: 2,
    user: 'Ananya_Das',
    role: 'Expert',
    badge: 'Financial Advisor',
    avatar: '👩‍🏫',
    title: 'Is a Balance Transfer Card worth it for credit card debt?',
    content: 'I see a lot of clients asking about balance transfer credit cards to escape high credit card APRs (usually 36-42% in India). A balance transfer can be a powerful tool, but only if you avoid the trap of spending on the new card. Here are the core details you must check before applying.',
    category: 'Strategy Help',
    likes: 19,
    hasLiked: false,
    date: '5 hours ago',
    replies: [
      {
        id: 201,
        user: 'Vikram_Raj',
        avatar: '🏃‍♂️',
        text: 'What are the usual processing fees for balance transfers? Is it a flat rate?',
        date: '3 hours ago'
      },
      {
        id: 202,
        user: 'Ananya_Das',
        avatar: '👩‍🏫',
        text: 'Hey Vikram, it varies between 1% to 3% of the transferred balance. Always calculate if the processing fee is lower than the interest you would save over the promo period (typically 3 to 6 months).',
        date: '2 hours ago'
      }
    ]
  },
  {
    id: 3,
    user: 'Dev_G',
    role: 'Member',
    badge: 'Starter',
    avatar: '👨‍💻',
    title: 'Tips for reducing grocery bills? It is eating up 40% of my budget.',
    content: 'I live in Bangalore and my grocery expenses have skyrocketed. I am trying to free up an extra 4,000 ₹ per month to put towards my credit card bills. What are your hacks for saving on food without eating unhealthy stuff?',
    category: 'Savings Hacks',
    likes: 12,
    hasLiked: false,
    date: '1 day ago',
    replies: [
      {
        id: 301,
        user: 'Meera_Nair',
        avatar: '👩‍🌾',
        text: 'Try bulk buying staple grains (rice, lentils, flour) from local wholesale markets (kirana stores) instead of online apps. Online quick commerce adds a 15-20% convenience premium.',
        date: '18 hours ago'
      },
      {
        id: 302,
        user: 'Sandeep_S',
        avatar: '👨‍🍳',
        text: 'Meal prepping is a game changer. Plan your menu on Sunday, buy exactly what you need, and freeze portions. It eliminates food waste and mid-week impulse orders.',
        date: '12 hours ago'
      }
    ]
  }
];

// FAQS & Basic Concepts Data
const FAQ_DATA = [
  {
    question: 'What is the main difference between the Debt Snowball and Debt Avalanche methods?',
    answer: 'The Debt Snowball method focuses on momentum: you pay off your smallest debts first to get quick wins, boosting your psychological motivation. The Debt Avalanche method focuses on interest rate: you pay off your highest interest rate debts first to mathematically minimize the amount of total interest paid over time.'
  },
  {
    question: 'How does a CIBIL credit score impact my loan interest rates?',
    answer: 'A CIBIL score ranges from 300 to 900. A score of 750 or above is considered excellent. Lenders use this score to evaluate your default risk. A high credit score enables you to qualify for lower interest rates, waived processing fees, and balance transfer programs.'
  },
  {
    question: 'What is debt restructuring or re-amortization?',
    answer: 'Debt restructuring is when a bank modifies your loan terms—such as extending the tenure to lower the monthly EMI, or reducing the interest rate—to help you avoid defaulting. This is preferable to a settlement because it prevents a harsh negative mark on your credit report.'
  },
  {
    question: 'How can I deal with recovery agent harassment?',
    answer: 'According to Reserve Bank of India (RBI) regulations, banks and recovery agents cannot harass debtors, call at inappropriate hours (must be between 8 AM and 7 PM), or use physical force/threats. If harassed, document the communication, file a written complaint with your bank, and if unsolved within 30 days, escalate to the RBI Ombudsman.'
  },
  {
    question: 'Is it better to invest spare cash or pay down debt first?',
    answer: 'Compare the interest rate on your debt with the expected rate of return on investments. If your debt carries a high interest rate (e.g., credit card debt at 36-40% or personal loans at 12-18%), paying it off yields a guaranteed return equal to that interest rate, which is higher than most market investments. Clear high-interest dues first, then invest.'
  }
];

export default function EducationLearning() {
  const [activeTab, setActiveTab] = useState('tips');
  const [tipsFilter, setTipsFilter] = useState('All');
  const [selectedTip, setSelectedTip] = useState(null);
  const [bookmarkedTips, setBookmarkedTips] = useState([]);
  const [tipsList, setTipsList] = useState(TIPS_AND_TRICKS);

  // Forum States
  const [forumPosts, setForumPosts] = useState(INITIAL_FORUM_POSTS);
  const [forumSearch, setForumSearch] = useState('');
  const [forumCategory, setForumCategory] = useState('All');
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [newPostModalOpen, setNewPostModalOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('General Q&A');
  const [replyInputTexts, setReplyInputTexts] = useState({});

  // FAQ States
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [faqSearch, setFaqSearch] = useState('');

  // Handle Tip Upvote
  const handleTipUpvote = (id, e) => {
    e.stopPropagation();
    setTipsList(prev => prev.map(tip => {
      if (tip.id === id) {
        return { ...tip, upvotes: tip.upvotes + 1 };
      }
      return tip;
    }));
    toast.success('Tip upvoted! Thank you for the feedback.');
  };

  // Handle Tip Bookmark toggle
  const handleTipBookmark = (id, e) => {
    e.stopPropagation();
    setTipsList(prev => prev.map(tip => {
      if (tip.id === id) {
        const nextState = !tip.bookmarked;
        if (nextState) {
          toast.success('Tip bookmarked for offline reading!');
        } else {
          toast.success('Bookmark removed.');
        }
        return { ...tip, bookmarked: nextState };
      }
      return tip;
    }));
  };

  // Handle Forum Like
  const handleForumLike = (postId) => {
    setForumPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const nextLiked = !post.hasLiked;
        return {
          ...post,
          hasLiked: nextLiked,
          likes: nextLiked ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    }));
  };

  // Handle Forum New Post Submission
  const handleCreatePostSubmit = (e) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast.error('Please enter a title and description.');
      return;
    }

    const newPostObj = {
      id: Date.now(),
      user: 'You',
      role: 'Member',
      badge: 'Active Tracker',
      avatar: '🧗‍♂️',
      title: newPostTitle,
      content: newPostContent,
      category: newPostCategory,
      likes: 0,
      hasLiked: false,
      date: 'Just now',
      replies: []
    };

    setForumPosts(prev => [newPostObj, ...prev]);
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostModalOpen(false);
    toast.success('Discussion posted successfully!');
  };

  // Handle Forum Reply Submit
  const handleReplySubmit = (postId) => {
    const text = replyInputTexts[postId];
    if (!text || !text.trim()) {
      toast.error('Reply cannot be empty.');
      return;
    }

    setForumPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          replies: [
            ...post.replies,
            {
              id: Date.now(),
              user: 'You',
              avatar: '🧗‍♂️',
              text: text,
              date: 'Just now'
            }
          ]
        };
      }
      return post;
    }));

    setReplyInputTexts(prev => ({ ...prev, [postId]: '' }));
    toast.success('Reply added!');
  };

  const handleReplyChange = (postId, text) => {
    setReplyInputTexts(prev => ({ ...prev, [postId]: text }));
  };

  // Filtering Tips
  const filteredTips = tipsList.filter(tip => {
    if (tipsFilter === 'All') return true;
    return tip.category.toLowerCase() === tipsFilter.toLowerCase() || 
           (tipsFilter === 'Dues' && tip.category === 'Clearing Dues');
  });

  // Filtering Forum
  const filteredForumPosts = forumPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(forumSearch.toLowerCase()) ||
                          post.content.toLowerCase().includes(forumSearch.toLowerCase());
    const matchesCategory = forumCategory === 'All' || post.category === forumCategory;
    return matchesSearch && matchesCategory;
  });

  // Filtering FAQ
  const filteredFaqs = FAQ_DATA.filter(faq => {
    return faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
           faq.answer.toLowerCase().includes(faqSearch.toLowerCase());
  });

  return (
    <PageWrapper isProtected={true}>
      <div className="space-y-8 pb-20">
        
        {/* Page Title & Intro */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 shadow-[0_0_15px_rgba(37,99,235,0.1)]">
              <BookOpen className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Education & Community</h1>
          </div>
          <p className="text-slate-400 max-w-2xl leading-relaxed text-sm">
            Learn actionable best practices and smart hacks to clear your dues, manage your cash flow, and participate in peer discussions about financial freedom.
          </p>
        </motion.div>

        {/* Tab Selection */}
        <div className="flex border-b border-white/5 gap-4">
          <button
            onClick={() => setActiveTab('tips')}
            className={`pb-4 px-2 font-medium text-sm transition-all duration-300 relative flex items-center gap-2 ${
              activeTab === 'tips' ? 'text-blue-400' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            Tips & Tricks
            {activeTab === 'tips' && (
              <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('forum')}
            className={`pb-4 px-2 font-medium text-sm transition-all duration-300 relative flex items-center gap-2 ${
              activeTab === 'forum' ? 'text-blue-400' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            Community Forum
            {activeTab === 'forum' && (
              <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('faq')}
            className={`pb-4 px-2 font-medium text-sm transition-all duration-300 relative flex items-center gap-2 ${
              activeTab === 'faq' ? 'text-blue-400' : 'text-slate-400 hover:text-white'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            FAQs & Concepts
            {activeTab === 'faq' && (
              <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
            )}
          </button>
        </div>

        {/* ==================== TAB 1: TIPS & TRICKS ==================== */}
        {activeTab === 'tips' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Quick Hero Banner */}
            <div className="relative bg-gradient-to-br from-blue-900/20 via-indigo-900/10 to-transparent border border-blue-500/20 rounded-2xl p-6 overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
              <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 animate-pulse" /> Weekly Focus
                  </div>
                  <h2 className="text-xl font-bold text-white">The Snowflake Strategy</h2>
                  <p className="text-xs text-slate-300 max-w-xl">
                    Discover how scraping together minor payments of 100 ₹ to 500 ₹ cuts down compounded daily interest significantly on credit card dues.
                  </p>
                </div>
                <Button 
                  onClick={() => setSelectedTip(TIPS_AND_TRICKS[0])} 
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-500 shrink-0"
                >
                  Read Technique
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 flex items-center gap-1.5 mr-2">
                <Filter className="w-3.5 h-3.5" /> Filter by:
              </span>
              {['All', 'Clearing Dues', 'Negotiation Hacks', 'Psychology & Habits', 'Budgeting', 'Income Boosters'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTipsFilter(filter === 'Clearing Dues' ? 'Dues' : filter)}
                  className={`text-xs px-3.5 py-1.5 rounded-full border transition-all duration-300 font-medium ${
                    (tipsFilter === filter || (tipsFilter === 'Dues' && filter === 'Clearing Dues'))
                      ? 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                      : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Grid of Tip Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTips.map((tip) => (
                <Card 
                  key={tip.id} 
                  className="hover:border-blue-500/30 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                  onClick={() => setSelectedTip(tip)}
                >
                  <div>
                    {/* Header tags */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400">
                        {tip.category}
                      </span>
                      <span className="text-[11px] text-slate-500">{tip.readTime}</span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-blue-400 transition-colors leading-snug">
                      {tip.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                      {tip.summary}
                    </p>
                  </div>

                  {/* Actions footer */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-slate-400">
                    <span className="text-[11px] text-slate-500 italic">By {tip.author.split(',')[0]}</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => handleTipUpvote(tip.id, e)}
                        className="flex items-center gap-1.5 text-xs hover:text-emerald-400 transition-colors py-1 px-2 rounded hover:bg-white/5"
                        title="Upvote Tip"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                        <span>{tip.upvotes}</span>
                      </button>
                      <button
                        onClick={(e) => handleTipBookmark(tip.id, e)}
                        className={`p-1.5 rounded hover:bg-white/5 transition-colors ${
                          tip.bookmarked ? 'text-blue-400' : 'hover:text-white'
                        }`}
                        title="Bookmark Tip"
                      >
                        <Bookmark className="w-3.5 h-3.5" fill={tip.bookmarked ? "currentColor" : "none"} />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* ==================== TAB 2: COMMUNITY FORUM ==================== */}
        {activeTab === 'forum' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Header controls for Forum */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full sm:max-w-xs">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={forumSearch}
                  onChange={(e) => setForumSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-slate-950/60 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                />
              </div>

              {/* Action buttons and categories */}
              <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
                <select
                  value={forumCategory}
                  onChange={(e) => setForumCategory(e.target.value)}
                  className="text-xs bg-slate-950/60 border border-white/10 rounded-xl text-slate-300 px-3 py-2 focus:outline-none"
                >
                  <option value="All">All Categories</option>
                  <option value="Success Stories">Success Stories</option>
                  <option value="Strategy Help">Strategy Help</option>
                  <option value="Savings Hacks">Savings Hacks</option>
                  <option value="General Q&A">General Q&A</option>
                </select>

                <Button
                  onClick={() => setNewPostModalOpen(true)}
                  size="sm"
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 shadow-lg text-xs"
                >
                  <Plus className="w-4 h-4" /> Start Thread
                </Button>
              </div>
            </div>

            {/* List of Forum Posts */}
            <div className="space-y-4">
              {filteredForumPosts.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-white/5 rounded-2xl bg-slate-950/10">
                  <MessageSquare className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-slate-400 text-sm">No discussions found matching your filters.</p>
                </div>
              ) : (
                filteredForumPosts.map((post) => {
                  const isExpanded = expandedPostId === post.id;
                  return (
                    <Card key={post.id} className="border border-white/5 bg-slate-900/25 hover:border-white/10 transition-all duration-300">
                      
                      {/* Thread Header */}
                      <div className="flex items-start gap-4">
                        <div className="text-2xl p-2.5 bg-white/5 rounded-xl border border-white/5 hidden sm:block">
                          {post.avatar}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <span className="font-bold text-white">{post.user}</span>
                            <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400 scale-90">
                              {post.badge}
                            </span>
                            <span className="text-slate-500">&bull; {post.date}</span>
                            <span className="ml-auto text-[10px] font-bold tracking-wider text-indigo-400 uppercase bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
                              {post.category}
                            </span>
                          </div>
                          
                          <h3 className="text-base font-bold text-white pt-1">
                            {post.title}
                          </h3>
                        </div>
                      </div>

                      {/* Thread Content */}
                      <p className="text-xs text-slate-300 leading-relaxed mt-4 whitespace-pre-line">
                        {post.content}
                      </p>

                      {/* Thread Actions bar */}
                      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleForumLike(post.id)}
                            className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl transition-all ${
                              post.hasLiked 
                                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                : 'hover:bg-white/5 hover:text-white'
                            }`}
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                            <span>{post.likes} Likes</span>
                          </button>

                          <button
                            onClick={() => setExpandedPostId(isExpanded ? null : post.id)}
                            className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl hover:bg-white/5 hover:text-white transition-all`}
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>{post.replies.length} Replies</span>
                          </button>
                        </div>

                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            toast.success('Thread link copied to clipboard!');
                          }}
                          className="p-1.5 rounded-xl hover:bg-white/5 hover:text-white"
                          title="Share Link"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Expanded Replies Section */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 pt-4 border-t border-white/5 space-y-4">
                              <h4 className="text-xs font-semibold text-slate-400 mb-2">Discussion Replies</h4>
                              
                              {/* Replies List */}
                              <div className="space-y-3 pl-4 border-l-2 border-white/5">
                                {post.replies.map((reply) => (
                                  <div key={reply.id} className="bg-slate-950/20 p-3 rounded-xl border border-white/5 text-xs">
                                    <div className="flex items-center gap-2 mb-1.5">
                                      <span className="text-base">{reply.avatar}</span>
                                      <span className="font-bold text-white">{reply.user}</span>
                                      <span className="text-[10px] text-slate-500 ml-auto">{reply.date}</span>
                                    </div>
                                    <p className="text-slate-300 leading-relaxed">
                                      {reply.text}
                                    </p>
                                  </div>
                                ))}

                                {post.replies.length === 0 && (
                                  <p className="text-xs text-slate-500 italic py-2">No replies yet. Be the first to answer!</p>
                                )}
                              </div>

                              {/* Write a Reply Form */}
                              <div className="flex gap-2 mt-4 pl-4">
                                <input
                                  type="text"
                                  placeholder="Write a supportive reply..."
                                  value={replyInputTexts[post.id] || ''}
                                  onChange={(e) => handleReplyChange(post.id, e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleReplySubmit(post.id);
                                  }}
                                  className="flex-1 text-xs bg-slate-950/40 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                                />
                                <Button
                                  onClick={() => handleReplySubmit(post.id)}
                                  size="sm"
                                  className="px-4 bg-blue-600 hover:bg-blue-500 shrink-0"
                                >
                                  <Send className="w-3.5 h-3.5" />
                                </Button>
                              </div>

                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </Card>
                  );
                })
              )}
            </div>

            {/* Bottom Community Challenge banner */}
            <div className="bg-gradient-to-r from-emerald-600/10 to-teal-600/10 border border-emerald-500/20 rounded-2xl p-6 text-center">
              <Sparkles className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Join the "Debt-Free Challenge"</h3>
              <p className="text-xs text-slate-300 max-w-lg mx-auto mb-4 leading-relaxed">
                Connect with 10k+ active members sharing daily saving techniques and accountability reports. It's completely free to join the weekly check-ins.
              </p>
              <Button 
                onClick={() => toast.success('You have successfully enrolled in the Debt-Free Challenge check-ins!')}
                variant="accent" 
                size="sm"
              >
                Enroll in Challenge
              </Button>
            </div>

          </motion.div>
        )}

        {/* ==================== TAB 3: FAQS & CONCEPTS ==================== */}
        {activeTab === 'faq' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Search FAQ */}
            <div className="relative max-w-md mx-auto">
              <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search financial terms, laws, or guidelines..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-950/60 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
              />
            </div>

            {/* Accordion list */}
            <div className="space-y-3 max-w-4xl mx-auto">
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs">
                  No matches found for your search term.
                </div>
              ) : (
                filteredFaqs.map((faq, idx) => {
                  const isExpanded = expandedFaq === idx;
                  return (
                    <Card
                      key={idx}
                      className="p-5 cursor-pointer hover:border-blue-500/30 transition-all duration-300 bg-slate-900/20"
                      onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-bold text-sm text-white">{faq.question}</h3>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 shrink-0 ${isExpanded ? 'rotate-180 text-blue-400' : ''}`} />
                      </div>
                      
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="text-xs text-slate-300 leading-relaxed mt-4 pt-4 border-t border-white/5">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  );
                })
              )}
            </div>
          </motion.div>
        )}

      </div>

      {/* ==================== MODAL: TIP DETAILS ==================== */}
      <Modal
        isOpen={!!selectedTip}
        onClose={() => setSelectedTip(null)}
        title={selectedTip?.title}
        className="max-w-2xl bg-slate-950 border border-white/10 text-white"
      >
        {selectedTip && (
          <div className="space-y-4 text-slate-300 text-xs p-4 sm:p-2">
            
            <div className="flex justify-between items-center text-[10px] uppercase font-bold text-blue-400 border-b border-white/5 pb-2 mb-2">
              <span>Category: {selectedTip.category}</span>
              <span>{selectedTip.readTime}</span>
            </div>

            {/* Custom Markdown-like content formatter */}
            <div className="space-y-4 leading-relaxed prose prose-invert max-w-none">
              {selectedTip.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('###')) {
                  return (
                    <h3 key={index} className="text-sm font-bold text-white pt-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-400" />
                      {paragraph.replace('###', '').trim()}
                    </h3>
                  );
                }
                if (paragraph.startsWith('1.') || paragraph.startsWith('-')) {
                  return (
                    <ul key={index} className="list-disc pl-4 space-y-1.5">
                      {paragraph.split('\n').map((line, lIdx) => {
                        const cleanLine = line.replace(/^[0-9\-.]+\s*/, '').replace(/\*\*/g, '');
                        return <li key={lIdx}>{cleanLine}</li>;
                      })}
                    </ul>
                  );
                }
                return (
                  <p key={index} className="whitespace-pre-line text-slate-300">
                    {paragraph.replace(/\*\*/g, '')}
                  </p>
                );
              })}
            </div>

            <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center">
              <span className="text-[10px] text-slate-500 italic">Author: {selectedTip.author}</span>
              <Button
                onClick={() => {
                  setSelectedTip(null);
                  toast.success('Happy payoff hunting!');
                }}
                size="sm"
                className="bg-blue-600 hover:bg-blue-500"
              >
                Close & Start Applying
              </Button>
            </div>

          </div>
        )}
      </Modal>

      {/* ==================== MODAL: NEW DISCUSSION THREAD ==================== */}
      <Modal
        isOpen={newPostModalOpen}
        onClose={() => setNewPostModalOpen(false)}
        title="Start a Community Discussion"
        className="max-w-lg bg-slate-950 border border-white/10 text-white"
      >
        <form onSubmit={handleCreatePostSubmit} className="space-y-4 p-4">
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-medium">Topic Category</label>
            <select
              value={newPostCategory}
              onChange={(e) => setNewPostCategory(e.target.value)}
              className="w-full text-xs bg-slate-900 border border-white/10 rounded-xl text-white px-3 py-2.5 focus:outline-none"
            >
              <option value="General Q&A">General Q&A</option>
              <option value="Success Stories">Success Stories</option>
              <option value="Strategy Help">Strategy Help</option>
              <option value="Savings Hacks">Savings Hacks</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-medium">Thread Title</label>
            <input
              type="text"
              placeholder="e.g. Help negotiating a personal loan extension"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              className="w-full text-xs bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-medium">Description / Details</label>
            <textarea
              placeholder="Explain your scenario in detail. Share amounts, APR rates, or budget structures so the community can offer precise advice."
              rows={5}
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="w-full text-xs bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
              required
            />
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setNewPostModalOpen(false)}
              size="sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="bg-blue-600 hover:bg-blue-500"
            >
              Post Thread
            </Button>
          </div>
        </form>
      </Modal>

    </PageWrapper>
  );
}
