import { useState } from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { BookOpen, Play, Clock, CheckCircle, Lock, Award, Users, Zap } from 'lucide-react';

const COURSES = [
  {
    id: 1,
    title: 'Debt Management 101',
    description: 'Master the fundamentals of managing and eliminating debt',
    level: 'Beginner',
    duration: '4 weeks',
    lessons: 12,
    completed: 8,
    thumbnail: '📚',
    topics: ['Types of Debt', 'Interest Rates', 'Loan Terminology', 'Payment Strategies'],
  },
  {
    id: 2,
    title: 'Building Financial Freedom',
    description: 'Create a sustainable plan to achieve financial independence',
    level: 'Intermediate',
    duration: '6 weeks',
    lessons: 18,
    completed: 5,
    thumbnail: '🎯',
    topics: ['Goal Setting', 'Budgeting', 'Savings Strategies', 'Investment Basics'],
  },
  {
    id: 3,
    title: 'Credit Score Mastery',
    description: 'Understand and improve your credit score',
    level: 'Intermediate',
    duration: '3 weeks',
    lessons: 10,
    completed: 0,
    thumbnail: '💳',
    topics: ['Credit Reports', 'CIBIL Score', 'Improving Credit', 'Credit Cards'],
  },
  {
    id: 4,
    title: 'Smart Investment Strategies',
    description: 'Learn to grow wealth through smart investments',
    level: 'Advanced',
    duration: '8 weeks',
    lessons: 20,
    completed: 0,
    thumbnail: '📈',
    topics: ['Stock Market', 'Mutual Funds', 'Portfolio Diversification', 'Risk Management'],
  },
  {
    id: 5,
    title: 'Tax Planning for Debt Freedom',
    description: 'Optimize your finances through smart tax planning',
    level: 'Intermediate',
    duration: '4 weeks',
    lessons: 14,
    completed: 0,
    thumbnail: '🏦',
    topics: ['Tax Deductions', 'Investment Benefits', 'Filing Returns', 'Tax Optimization'],
  },
  {
    id: 6,
    title: 'Entrepreneurship & Side Hustles',
    description: 'Increase income streams while managing debt',
    level: 'Advanced',
    duration: '5 weeks',
    lessons: 16,
    completed: 0,
    thumbnail: '💼',
    topics: ['Side Hustle Ideas', 'Freelancing', 'Online Business', 'Income Scaling'],
  },
];

const RESOURCES = [
  {
    id: 1,
    type: 'article',
    title: 'The Complete Debt Payoff Guide',
    description: 'A comprehensive guide covering all aspects of debt elimination',
    icon: '📄',
    duration: '15 min read',
  },
  {
    id: 2,
    type: 'video',
    title: 'Live Webinar: Ask Financial Experts',
    description: 'Monthly Q&A session with certified financial advisors',
    icon: '🎥',
    duration: '1 hour',
  },
  {
    id: 3,
    type: 'calculator',
    title: 'EMI & Interest Calculator',
    description: 'Advanced calculator for loan planning and comparison',
    icon: '🧮',
    duration: 'Interactive',
  },
  {
    id: 4,
    type: 'checklist',
    title: 'Debt Freedom Checklist',
    description: 'Step-by-step checklist to track your debt elimination journey',
    icon: '✅',
    duration: 'Printable',
  },
];

const FAQ = [
  {
    question: 'How can I pay off debt faster?',
    answer: 'You can pay off debt faster by using strategies like the Snowball Method (pay smallest debts first) or Avalanche Method (pay highest interest first). Consider increasing your income through side hustles or cutting unnecessary expenses.',
  },
  {
    question: 'What is a good debt-to-income ratio?',
    answer: 'A good debt-to-income ratio is below 36%. This means your monthly debt payments (including EMIs) are less than 36% of your gross monthly income. Ratios above 43% are considered high risk.',
  },
  {
    question: 'How does interest compound on loans?',
    answer: 'Interest compounds based on your loan type. Simple interest is calculated on principal only, while compound interest includes previously earned interest. Most personal loans use simple interest calculated monthly.',
  },
  {
    question: 'Should I focus on one loan or multiple?',
    answer: 'Use the Avalanche Method (highest interest first) for mathematical optimization, or the Snowball Method (smallest balance first) for psychological motivation. Choose what keeps you motivated!',
  },
  {
    question: 'How can I improve my credit score?',
    answer: 'Pay bills on time, maintain low credit utilization (below 30%), avoid multiple loan applications, and correct any errors in your credit report. It typically takes 3-6 months to see improvement.',
  },
];

export default function EducationLearning() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showResourceModal, setShowResourceModal] = useState(null);

  const getLevelColor = (level) => {
    if (level === 'Beginner') return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    if (level === 'Intermediate') return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
  };

  const getProgressColor = (progress) => {
    if (progress >= 75) return 'bg-emerald-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-amber-500';
    return 'bg-slate-500';
  };

  return (
    <PageWrapper>
      <div className="space-y-8 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">Education & Learning</h1>
          </div>
          <p className="text-slate-400">Master financial literacy and accelerate your debt-free journey</p>
        </motion.div>

        {/* Featured Course */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="relative bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-2xl p-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold mb-4">
                  FEATURED COURSE
                </span>
                <h2 className="text-3xl font-bold text-white mb-3">Debt Management 101</h2>
                <p className="text-slate-300 mb-6">
                  Start your financial freedom journey with our beginner-friendly course covering debt basics, interest rates, and proven payoff strategies.
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">4 weeks</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-sm">12 lessons</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">8/12 completed</span>
                  </div>
                </div>
                <Button onClick={() => setSelectedCourse(COURSES[0])}>Continue Learning →</Button>
              </div>
              <div className="text-6xl text-center">📚</div>
            </div>
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <Card className="p-6 text-center">
            <div className="text-3xl mb-2">📚</div>
            <p className="text-slate-400 text-sm">Courses Available</p>
            <p className="text-2xl font-bold text-white mt-2">{COURSES.length}</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl mb-2">⏰</div>
            <p className="text-slate-400 text-sm">Total Hours</p>
            <p className="text-2xl font-bold text-white mt-2">150+</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl mb-2">👥</div>
            <p className="text-slate-400 text-sm">Community Members</p>
            <p className="text-2xl font-bold text-white mt-2">10K+</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl mb-2">🏆</div>
            <p className="text-slate-400 text-sm">Certificates Earned</p>
            <p className="text-2xl font-bold text-white mt-2">2,340</p>
          </Card>
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">All Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.map((course) => {
              const progress = Math.round((course.completed / course.lessons) * 100);
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className="overflow-hidden hover:border-blue-500/50 transition-all cursor-pointer"
                    onClick={() => setSelectedCourse(course)}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-4xl">{course.thumbnail}</span>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full border ${getLevelColor(
                            course.level
                          )}`}
                        >
                          {course.level}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-2">{course.title}</h3>
                      <p className="text-sm text-slate-400 mb-4">{course.description}</p>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span>Progress</span>
                          <span className="font-semibold text-white">
                            {course.completed}/{course.lessons}
                          </span>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-2">
                          <div
                            className={`${getProgressColor(progress)} h-2 rounded-full transition-all`}
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {course.topics.slice(0, 2).map((topic, idx) => (
                          <span key={idx} className="text-xs bg-blue-500/10 text-blue-300 px-2 py-1 rounded">
                            {topic}
                          </span>
                        ))}
                        {course.topics.length > 2 && (
                          <span className="text-xs text-slate-500">+{course.topics.length - 2}</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                        <Clock className="w-3 h-3" />
                        <span>{course.duration}</span>
                      </div>

                      <Button className="w-full" size="sm">
                        {progress === 100 ? 'Review Course' : 'Continue Learning'}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Learning Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RESOURCES.map((resource) => (
              <motion.div key={resource.id}>
                <Card
                  className="p-6 hover:border-blue-500/50 transition-all cursor-pointer"
                  onClick={() => setShowResourceModal(resource)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{resource.icon}</span>
                    <span className="text-xs font-semibold text-slate-400 uppercase">
                      {resource.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{resource.title}</h3>
                  <p className="text-sm text-slate-400 mb-4">{resource.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{resource.duration}</span>
                    <span className="text-blue-400 font-semibold text-sm">Explore →</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Expert Webinars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="p-8 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-6 h-6 text-purple-400" />
                  <h3 className="text-2xl font-bold text-white">Live Expert Webinars</h3>
                </div>
                <p className="text-slate-300 mb-4">
                  Learn directly from certified financial advisors and debt management experts. Ask questions, get personalized advice, and grow your financial knowledge.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="text-sm text-slate-300">
                    <span className="font-semibold text-white">Next Webinar:</span> June 22, 2024 at 7 PM
                  </div>
                </div>
              </div>
              <Button className="whitespace-nowrap">Register for Webinar</Button>
            </div>
          </Card>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQ.map((faq, idx) => (
              <motion.div key={idx}>
                <Card
                  className="p-6 cursor-pointer hover:border-blue-500/50 transition-all"
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white">{faq.question}</h3>
                    <span className={`text-2xl transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`}>
                      ⌄
                    </span>
                  </div>
                  {expandedFaq === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-white/10"
                    >
                      <p className="text-slate-300">{faq.answer}</p>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievement Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card className="p-8 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border-emerald-500/30">
            <div className="text-center">
              <Award className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Your Learning Journey</h3>
              <p className="text-slate-300 mb-6">
                You're making great progress! You've completed 8 lessons and earned valuable knowledge about debt management.
              </p>
              <div className="flex justify-center gap-4">
                <Button>View Certificates</Button>
                <Button variant="secondary">Share Progress</Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <Modal onClose={() => setSelectedCourse(null)}>
          <div className="max-w-2xl w-full">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-5xl mb-3">{selectedCourse.thumbnail}</div>
                <h2 className="text-3xl font-bold text-white">{selectedCourse.title}</h2>
              </div>
            </div>

            <p className="text-slate-300 mb-6">{selectedCourse.description}</p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <p className="text-slate-400 text-xs mb-1">Level</p>
                <p className="text-white font-semibold">{selectedCourse.level}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <p className="text-slate-400 text-xs mb-1">Duration</p>
                <p className="text-white font-semibold">{selectedCourse.duration}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <p className="text-slate-400 text-xs mb-1">Lessons</p>
                <p className="text-white font-semibold">{selectedCourse.lessons} total</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-slate-400 text-sm mb-2">Progress</p>
              <div className="w-full bg-white/5 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all"
                  style={{ width: `${(selectedCourse.completed / selectedCourse.lessons) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                {selectedCourse.completed} of {selectedCourse.lessons} lessons completed
              </p>
            </div>

            <div>
              <p className="text-slate-400 text-sm mb-3">Topics Covered</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCourse.topics.map((topic, idx) => (
                  <span key={idx} className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1">
                <Play className="w-4 h-4 mr-2" />
                {selectedCourse.completed === selectedCourse.lessons ? 'Review Course' : 'Continue Learning'}
              </Button>
              <Button variant="secondary" className="flex-1">
                Share
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Resource Detail Modal */}
      {showResourceModal && (
        <Modal onClose={() => setShowResourceModal(null)}>
          <div className="max-w-2xl w-full">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{showResourceModal.icon}</div>
              <h2 className="text-3xl font-bold text-white">{showResourceModal.title}</h2>
            </div>

            <p className="text-slate-300 mb-6">{showResourceModal.description}</p>

            <div className="bg-white/5 p-4 rounded-lg border border-white/10 mb-6">
              <p className="text-slate-400 text-sm">Duration</p>
              <p className="text-white font-semibold mt-1">{showResourceModal.duration}</p>
            </div>

            <div className="space-y-3 mb-6">
              <h3 className="font-semibold text-white">What You'll Learn:</h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Key concepts and best practices</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Practical strategies you can apply immediately</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Expert insights and tips</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1">
                <Play className="w-4 h-4 mr-2" />
                Access Resource
              </Button>
              <Button variant="secondary" className="flex-1">
                Save for Later
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </PageWrapper>
  );
}
