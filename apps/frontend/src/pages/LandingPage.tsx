import { Link } from "react-router";
import {
  ArrowRight,
  CheckCircle2,
  BarChart3,
  ShieldCheck,
  MapPin,
  Menu,
  X,
  Clock,
  Users,
  Zap,
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
      <title>Attendify - GPS-Based Attendance Tracking System</title>
      <meta
        name="description"
        content="Modern geofence attendance tracking with real-time analytics. Ensure accurate time tracking with GPS verification for distributed teams."
      />
      <meta
        property="og:title"
        content="Attendify - GPS-Based Attendance Tracking"
      />
      <meta
        property="og:image"
        content="https://your-vercel-domain.app/preview-image.png"
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2.5 font-bold text-xl tracking-tight"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
              <span className="text-white font-black text-lg">A</span>
            </div>
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Attendify
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a
              href="#features"
              className="text-slate-400 hover:text-white transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-slate-400 hover:text-white transition-colors duration-200"
            >
              How it works
            </a>
            {user ? (
              <Link
                to="/dashboard/office"
                className="text-slate-400 hover:text-white transition-colors duration-200"
              >
                {user.name}
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-slate-400 hover:text-white transition-colors duration-200"
              >
                Sign in
              </Link>
            )}

            {!user && (
              <Link
                to="/register"
                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-xl transition-all duration-200 active:scale-95 font-semibold shadow-lg shadow-purple-500/25"
              >
                Get Started Free
              </Link>
            )}
          </div>

          <button
            className="md:hidden text-slate-300 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute w-full bg-slate-900/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 flex flex-col gap-4 shadow-xl"
          >
            <a
              href="#features"
              className="text-slate-300 hover:text-white py-2.5 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-slate-300 hover:text-white py-2.5 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How it works
            </a>
            {user ? (
              <Link
                to="/dashboard/office"
                className="text-slate-300 hover:text-white py-2.5 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {user.name}
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-white py-2.5 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl font-semibold text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started Free
                </Link>
              </>
            )}
          </motion.div>
        )}
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
          {/* Animated grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f15_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)] -z-10" />

          {/* Gradient orbs */}
          <div className="absolute top-40 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -z-10" />
          <div className="absolute top-60 right-1/4 w-96 h-96 bg-fuchsia-600/15 rounded-full blur-3xl -z-10" />

          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="max-w-4xl mx-auto space-y-8"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1]"
              >
                Attendance tracking
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-500 bg-clip-text text-transparent">
                  made simple.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light"
              >
                GPS-verified attendance with geofencing. Real-time insights. No
                more time theft or manual spreadsheets.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
              >
                <Link
                  to="/register"
                  className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2.5 shadow-lg shadow-purple-500/25 active:scale-95"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <a
                  href="#features"
                  className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 flex items-center justify-center backdrop-blur-sm"
                >
                  Explore Features
                </a>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="pt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-slate-500"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span>Free 14-day trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span>Cancel anytime</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Dashboard mockup */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="mt-20 relative mx-auto max-w-6xl"
            >
              <div className="relative z-10 rounded-2xl border border-white/20 bg-gradient-to-b from-white/10 to-white/5 p-3 shadow-2xl shadow-purple-500/20 backdrop-blur-sm">
                <img
                  src={DASHBOARD_MOCKUP}
                  alt="Attendify Dashboard Interface"
                  className="w-full h-auto rounded-xl border border-white/10 shadow-2xl"
                />
              </div>

              {/* Glow effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gradient-to-r from-purple-600/30 via-fuchsia-600/30 to-purple-600/30 blur-[120px] -z-10 rounded-full" />
            </motion.div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-16 border-y border-white/5 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-center space-y-10"
            >
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                Trusted by teams worldwide
              </p>

              <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 opacity-40 grayscale">
                <h3 className="text-2xl font-bold text-slate-600">ACME Corp</h3>
                <h3 className="text-2xl font-bold text-slate-600">Globex</h3>
                <h3 className="text-2xl font-bold text-slate-600">Soylent</h3>
                <h3 className="text-2xl font-bold text-slate-600">Initech</h3>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-5xl font-black mb-4">
                  Everything you need to track attendance
                </h2>
                <p className="text-lg text-slate-400">
                  Built for modern teams who need accuracy and simplicity
                </p>
              </motion.div>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid md:grid-cols-3 gap-8"
            >
              <BenefitCard
                icon={<Clock className="w-6 h-6" />}
                title="Real-time Tracking"
                description="Monitor employee attendance as it happens with instant GPS verification and location data"
              />
              <BenefitCard
                icon={<MapPin className="w-6 h-6" />}
                title="Geofence Control"
                description="Set virtual boundaries around work locations to ensure employees clock in from the right place"
              />
              <BenefitCard
                icon={<BarChart3 className="w-6 h-6" />}
                title="Analytics Dashboard"
                description="Get comprehensive insights with visual reports on attendance patterns and trends"
              />
              <BenefitCard
                icon={<ShieldCheck className="w-6 h-6" />}
                title="Secure & Reliable"
                description="Enterprise-grade security with encrypted data and role-based access controls"
              />
              <BenefitCard
                icon={<Users className="w-6 h-6" />}
                title="Team Management"
                description="Easily manage employees, roles, and permissions from a centralized dashboard"
              />
              <BenefitCard
                icon={<Zap className="w-6 h-6" />}
                title="Quick Setup"
                description="Get started in minutes with our intuitive onboarding process and simple interface"
              />
            </motion.div>
          </div>
        </section>

        {/* Feature Sections */}
        <section id="features" className="py-32 relative bg-slate-900/30">
          <div className="max-w-7xl mx-auto px-6 space-y-32">
            <ClassicFeatureSection
              title="Geofencing that actually works"
              description="Create precise virtual boundaries around your office locations with customizable radius controls. Employees can only clock in when physically present, eliminating buddy punching and time theft while ensuring accurate attendance records."
              icon={<MapPin className="w-6 h-6 text-purple-400" />}
              imageSrc={DASHBOARD_MOCKUP}
              align="left"
            />

            <ClassicFeatureSection
              title="Analytics at your fingertips"
              description="Transform raw attendance data into actionable insights. Visualize patterns, identify trends, spot anomalies, and generate comprehensive reports instantly. Make informed decisions with real-time analytics designed for modern workforce management."
              icon={<BarChart3 className="w-6 h-6 text-fuchsia-400" />}
              imageSrc={DASHBOARD_MOCKUP}
              align="right"
            />

            <ClassicFeatureSection
              title="Security you can trust"
              description="Built with enterprise-grade security from the ground up. Advanced encryption protects your data, secure session management safeguards user access, and granular role-based permissions ensure only authorized personnel can view sensitive information."
              icon={<ShieldCheck className="w-6 h-6 text-purple-400" />}
              imageSrc={DASHBOARD_MOCKUP}
              align="left"
            />
          </div>
        </section>

        {/* How it Works */}
        <section
          id="how-it-works"
          className="py-32 bg-slate-900 border-y border-white/5"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-5xl font-black mb-6">
                  Get started in three simple steps
                </h2>
                <p className="text-lg text-slate-400">
                  No complex setup or lengthy training required
                </p>
              </motion.div>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid md:grid-cols-3 gap-8 lg:gap-12"
            >
              <StepCard
                number="1"
                title="Create Your Organization"
                description="Sign up and configure your company profile with basic settings in minutes"
              />
              <StepCard
                number="2"
                title="Define Office Locations"
                description="Set your office coordinates and geofence radius using our interactive map interface"
              />
              <StepCard
                number="3"
                title="Add Your Team"
                description="Invite employees with magic links and start tracking attendance immediately"
              />
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-950 to-fuchsia-900/20 -z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-3xl -z-10" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto px-6 text-center border border-white/10 bg-white/5 rounded-3xl p-12 md:p-16 backdrop-blur-sm shadow-2xl"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Ready to transform your
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                attendance tracking?
              </span>
            </h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Join modern teams using GPS-verified attendance to eliminate time
              theft and streamline workforce management
            </p>
            <Link
              to="/register"
              className="inline-flex px-10 py-5 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-bold text-lg rounded-xl shadow-2xl shadow-purple-500/30 transition-all duration-200 active:scale-95 items-center justify-center gap-3"
            >
              Start Your Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-sm text-slate-500 mt-6">
              14-day trial • No credit card required • Cancel anytime
            </p>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-2.5 font-bold text-white"
            >
              <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/25">
                <span className="text-white font-black text-sm">A</span>
              </div>
              <span className="text-lg">Attendify</span>
            </Link>

            <div className="flex gap-8 text-sm text-slate-400">
              <Link
                to="/Privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link to="/Terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link
                to="/Contact"
                className="hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </div>

            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Attendify Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const BenefitCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent hover:border-purple-500/30 hover:bg-white/10 transition-all duration-300 group"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 border border-purple-500/20 flex items-center justify-center mb-5 text-purple-400 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
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
      } items-center gap-12 lg:gap-16`}
    >
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 space-y-6 text-center lg:text-left"
      >
        <div
          className={`inline-flex p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-lg ${
            !isLeft && "lg:ml-auto"
          }`}
        >
          {icon}
        </div>
        <h3 className="text-3xl md:text-4xl font-black leading-tight">
          {title}
        </h3>
        <p className="text-lg text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
          {description}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: isLeft ? 50 : -50, scale: 0.95 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        className="flex-1 relative"
      >
        <div className="relative z-10 rounded-2xl border border-white/20 bg-gradient-to-b from-white/10 to-white/5 p-2.5 shadow-2xl backdrop-blur-sm">
          <img
            src={imageSrc}
            alt={title}
            className="w-full rounded-xl border border-white/10 shadow-xl"
          />
        </div>

        {/* Glow effect */}
        <div
          className={`absolute top-1/2 ${
            isLeft ? "left-1/2" : "right-1/2"
          } -translate-x-1/2 -translate-y-1/2 w-3/5 h-3/5 bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20 blur-[100px] -z-10 rounded-full`}
        />
      </motion.div>
    </div>
  );
};

export default LandingPage;
