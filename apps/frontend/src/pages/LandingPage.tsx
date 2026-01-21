import { Link } from "react-router";
import {
  ArrowRight,
  CheckCircle2,
  BarChart3,
  ShieldCheck,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../modules/auth/hooks/useAuth";
import { fadeInUp, staggerContainer } from "../utils";
import type { FeatureSectionProps } from "../types";
import StepCard from "../components/StepCard";
const DASHBOARD_MOCKUP =
  "https://i.ibb.co/Y7c7pVZY/Screenshot-2026-01-06-at-12-21-34-AM.png";

const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden font-sans selection:bg-purple-500/30">
      <title>Attendify - Modern Geofence Attendance System</title>
      <meta
        name="description"
        content="Stop time theft with GPS-based attendance tracking. Real-time analytics, geofencing for distributed teams."
      />
      <meta
        property="og:title"
        content="Attendify - The Modern Standard for Workforce Attendance"
      />
      <meta
        property="og:image"
        content="https://your-vercel-domain.app/preview-image.png"
      />
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">A.</span>
            </div>
            Attendify.
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-white transition-colors"
            >
              How it works
            </a>
            {user ? (
              <Link
                to="/dashboard/office"
                className="hover:text-white transition-colors"
              >
                {user.name}
              </Link>
            ) : (
              <Link to="/login" className="hover:text-white transition-colors">
                Login
              </Link>
            )}

            {!user && (
              <Link
                to="/register"
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-all active:scale-[0.98] font-semibold"
              >
                Get Started
              </Link>
            )}
          </div>

          <button
            className="md:hidden text-slate-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute w-full bg-slate-900 border-b border-white/10 px-6 py-4 flex flex-col gap-4">
            <a href="#features" className="text-slate-300 py-2">
              Features
            </a>
            <a href="#how-it-works" className="text-slate-300 py-2">
              How it works
            </a>
            <Link to="/login" className="text-slate-300 py-2">
              Login
            </Link>
          </div>
        )}
      </nav>

      <main>
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />

          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="max-w-4xl mx-auto space-y-8"
            >
              {/* <motion.div variants={fadeInUp}>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-sm font-medium ring-1 ring-inset ring-purple-500/20">
                  New: Geofencing 2.0 Released
                </span>
              </motion.div> */}

              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
              >
                The Modern Standard for <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-fuchsia-400">
                  Workforce Attendance.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
              >
                Stop relying on outdated spreadsheets. Gain real-time
                visibility, ensure compliance, and simplify payroll with a
                platform built for today's distributed teams.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
              >
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 group"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#features"
                  className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg border border-white/10 transition-all flex items-center justify-center"
                >
                  See How It Works
                </a>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="pt-8 flex justify-center items-center gap-8 text-sm text-slate-500"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" /> No credit
                  card required
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" /> Cancel
                  anytime
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="mt-16 relative mx-auto max-w-5xl"
            >
              <div className="rounded-xl border border-white/10 bg-white/5 p-2 shadow-2xl shadow-purple-500/20 relative z-10 backdrop-blur-sm">
                <img
                  src={DASHBOARD_MOCKUP}
                  alt="App Dashboard"
                  className="w-full h-auto rounded-lg border border-slate-800/50"
                />
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-purple-600/30 blur-[120px] -z-10 rounded-full opacity-50"></div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 border-y border-white/5 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-8">
              Trusted by forward-thinking companies
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="flex flex-wrap justify-center gap-x-16 gap-y-8 grayscale opacity-50"
            >
              <h3 className="text-2xl font-bold text-slate-600">ACME Corp</h3>
              <h3 className="text-2xl font-bold text-slate-600">Globex</h3>
              <h3 className="text-2xl font-bold text-slate-600">Soylent</h3>
              <h3 className="text-2xl font-bold text-slate-600">Initech</h3>
            </motion.div>
          </div>
        </section>

        <section id="features" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6 space-y-32">
            <ClassicFeatureSection
              title="Precision GPS Geofencing."
              description="Define virtual boundaries around your office locations. Employees can only clock in when they are physically on-site, eliminating time theft and ensuring accurate records."
              icon={<MapPin className="w-6 h-6 text-purple-400" />}
              imageSrc={DASHBOARD_MOCKUP}
              align="left"
            />

            <ClassicFeatureSection
              title="Real-time Insightful Analytics."
              description="Visualize attendance trends, spot late arrivals, and generate comprehensive reports instantly. Make data-driven decisions to optimize workforce productivity."
              icon={<BarChart3 className="w-6 h-6 text-fuchsia-400" />}
              imageSrc={DASHBOARD_MOCKUP}
              align="right"
            />

            <ClassicFeatureSection
              title="Enterprise-Grade Security."
              description="Your data security is paramount. We utilize advanced encryption, secure session management, and granular role-based access controls to keep your information safe."
              icon={<ShieldCheck className="w-6 h-6 text-purple-400" />}
              imageSrc={DASHBOARD_MOCKUP}
              align="left"
            />
          </div>
        </section>

        <section
          id="how-it-works"
          className="py-32 bg-slate-900 border-t border-white/5"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
                  Up and running in minutes.
                </h2>
                <p className="text-lg text-slate-400">
                  We've simplified the onboarding process so you can start
                  tracking immediately.
                </p>
              </motion.div>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid md:grid-cols-3 gap-12"
            >
              <StepCard
                number="1"
                title="Create Organization"
                description="Sign up and set up your company profile and basic settings."
              />
              <StepCard
                number="2"
                title="Set Locations"
                description="Define your office coordinates and geofence radius on the map."
              />
              <StepCard
                number="3"
                title="Invite Employees"
                description="Send magic links for your team to join and start tracking."
              />
            </motion.div>
          </div>
        </section>

        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-tr from-purple-900/20 to-slate-950 -z-10" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto px-6 text-center border border-white/10 bg-white/5 rounded-3xl p-16 backdrop-blur-sm"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
              Ready to modernize your <br /> workforce management?
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
              Join thousands of companies switching to a smarter, secure way of
              tracking attendance.
            </p>
            <Link
              to="/register"
              className="inline-flex px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg rounded-lg shadow-lg shadow-purple-500/20 transition-all active:scale-95 items-center justify-center gap-3"
            >
              Start Your 14-Day Free Trial
            </Link>
          </motion.div>
        </section>
      </main>

      <footer className="bg-slate-950 py-12 border-t border-white/5 text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 font-bold text-white">
            <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center text-xs">
              A.
            </div>
            Attendify.
          </div>
          <div className="flex gap-8">
            <Link to={"/Privacy"} className="hover:text-white transition">
              Privacy
            </Link>
            <Link to={"/Terms"} className="hover:text-white transition">
              Terms
            </Link>
            <Link to={"/Contact"} className="hover:text-white transition">
              Contact
            </Link>
          </div>
          <p>© {new Date().getFullYear()} Attendify Inc.</p>
        </div>
      </footer>
    </div>
  );
};

const ClassicFeatureSection = ({
  title,
  description,
  icon,
  imageSrc,
  align,
}: FeatureSectionProps) => {
  const isLeft = align === "left";

  return (
    <div
      className={`flex flex-col ${
        isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
      } items-center gap-16`}
    >
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 space-y-6 text-center lg:text-left"
      >
        <div
          className={`inline-flex p-3 rounded-xl bg-white/5 border border-white/10 shadow-inner ${
            !isLeft && "lg:ml-auto"
          }`}
        >
          {icon}
        </div>
        <h3 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
          {title}
        </h3>
        <p className="text-lg text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
          {description}
        </p>
        <div className={`pt-4 ${!isLeft ? "lg:flex lg:justify-end" : ""}`}>
          <a
            href="#"
            className="text-purple-400 hover:text-purple-300 font-medium flex items-center gap-2 group"
          >
            Learn more{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: isLeft ? 50 : -50, scale: 0.95 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        className="flex-1 relative"
      >
        <div className="relative z-10 rounded-xl border border-white/10 bg-slate-900/50 p-2 shadow-2xl">
          <img
            src={imageSrc}
            alt={title}
            className="w-full rounded-lg border border-white/5 shadow-sm"
          />
        </div>

        <div
          className={`absolute top-1/2 ${
            isLeft ? "left-1/2" : "right-1/2"
          } -translate-x-1/2 -translate-y-1/2 w-3/5 h-3/5 bg-purple-600/20 blur-[100px] -z-10 rounded-full opacity-40`}
        ></div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
