import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, MotionConfig } from 'framer-motion';
// Importation des icônes de React Icons
import { FaGithub, FaLinkedin, FaEnvelope, FaExternalLinkAlt, FaUser, FaCode, FaBriefcase } from 'react-icons/fa';
import { BiWorld, BiServer } from 'react-icons/bi';
import { BsDatabase, BsTerminal } from 'react-icons/bs';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Limiter la fréquence de mise à jour pour améliorer les performances
      requestAnimationFrame(() => {
        const { clientX, clientY } = e;
        const moveX = (clientX - window.innerWidth / 2) / 50;
        const moveY = (clientY - window.innerHeight / 2) / 50;
        setMousePosition({ x: moveX, y: moveY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const skills = [
    { name: 'React.js', icon: <BiWorld size={24} /> },
    { name: 'Node.js', icon: <BiServer size={24} /> },
    { name: 'TypeScript', icon: <FaCode size={24} /> },
    { name: 'Python', icon: <BsTerminal size={24} /> },
    { name: 'AWS', icon: <BsTerminal size={24} /> },
    { name: 'Docker', icon: <BsDatabase size={24} /> }
  ];

  return (
    <MotionConfig reducedMotion="user">
      <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
        {/* Background Parallax Effect */}
        <motion.div
          className="fixed inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y: backgroundY
          }}
        />

        {/* Hero Section */}
        <motion.header 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative container mx-auto px-4 py-20 flex flex-col items-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`
            }}
            className="w-40 h-40 rounded-full overflow-hidden mb-8 shadow-xl"
          >
            <img 
              src="./assets/profilPic.jpeg"
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
            />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ y: textY }}
            className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          >
            John Doe
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-300 mb-8 text-center max-w-2xl"
          >
            Développeur Full Stack Passionné | Créateur d'Expériences Web Innovantes
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex space-x-6"
          >
            <motion.a 
              href="#" 
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="hover:text-blue-400 transition-colors"
            >
              <FaGithub size={24} />
            </motion.a>
            <motion.a 
              href="#" 
              whileHover={{ scale: 1.2, rotate: -5 }}
              className="hover:text-blue-400 transition-colors"
            >
              <FaLinkedin size={24} />
            </motion.a>
            <motion.a 
              href="#" 
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="hover:text-blue-400 transition-colors"
            >
              <FaEnvelope size={24} />
            </motion.a>
          </motion.div>
        </motion.header>

        {/* Sections */}
        <main className="relative container mx-auto px-4 py-16">
          {/* À propos */}
          <motion.section 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-20"
          >
            <div className="flex items-center mb-8">
              <FaUser className="mr-4 text-blue-400" size={28} />
              <h2 className="text-3xl font-bold">À Propos</h2>
            </div>
            <motion.p 
              className="text-gray-300 leading-relaxed max-w-3xl"
            >
              Passionné par le développement web depuis plus de 5 ans, je crée des solutions numériques 
              innovantes qui combinent performance technique et expérience utilisateur exceptionnelle. 
              Mon approche est centrée sur la création de produits qui font la différence.
            </motion.p>
          </motion.section>

          {/* Compétences */}
          <motion.section 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-20"
          >
            <div className="flex items-center mb-8">
              <FaCode className="mr-4 text-blue-400" size={28} />
              <h2 className="text-3xl font-bold">Compétences</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
                  }}
                  transition={{ 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300
                  }}
                  viewport={{ once: true }}
                  className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700 flex flex-col items-center gap-2"
                >
                  <div className="text-blue-400">
                    {skill.icon}
                  </div>
                  <span className="text-sm font-medium">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Projets */}
          <motion.section
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex items-center mb-8">
              <FaBriefcase className="mr-4 text-blue-400" size={28} />
              <h2 className="text-3xl font-bold">Projets</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "E-commerce Platform",
                  description: "Une plateforme e-commerce complète avec panier et paiement",
                  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                },
                {
                  title: "Portfolio Dashboard",
                  description: "Dashboard analytics pour portfolio d'investissement",
                  image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                }
              ].map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ 
                    scale: 1.03,
                    y: -5
                  }}
                  transition={{ 
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 300
                  }}
                  viewport={{ once: true }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700"
                >
                  <div className="relative overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                  </div>
                  <div className="p-6 relative">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <motion.a 
                      href="#" 
                      className="inline-flex items-center text-blue-400 hover:text-blue-300"
                      whileHover={{ x: 10 }}
                    >
                      Voir plus <FaExternalLinkAlt size={16} className="ml-2" />
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-800 mt-20 py-8">
          <div className="container mx-auto px-4 text-center text-gray-400">
            <p>© 2024 John Doe. Tous droits réservés.</p>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}

export default App;