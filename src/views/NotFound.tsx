import { useLocation, Link } from "@/lib/router-compat";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px]" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [] as any }}
          className="text-center relative z-10 px-6"
        >
          <span className="inline-block text-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-12">
            Error 404
          </span>
          <h1 className="text-[clamp(4rem,15vw,10rem)] font-serif italic font-light mb-8 leading-none">
            Lost <span className="text-gold not-italic font-bold">Horizon</span>
          </h1>
          <p className="text-xl text-muted-foreground font-light mb-16 max-w-md mx-auto italic">
            The path you seek has transcended the digital realm.
          </p>
          <Link to="/">
            <button className="btn-gold !px-16 !py-6 text-sm">
              Return to Sanctuary
            </button>
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
};

export default NotFound;
