import React, { useState, useEffect } from 'react';
import { Mail, Linkedin } from 'lucide-react';

const Portfolio = () => {
  const [currentPage, setCurrentPage] = useState('about');
  const [rotation, setRotation] = useState(0);
  const [rotation2, setRotation2] = useState(0);
  const [rotation3, setRotation3] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [expandedProject, setExpandedProject] = useState(null);
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0);

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      miniDesc: 'Full-stack web application',
      fullDesc: 'Built a comprehensive e-commerce platform with React and Node.js, featuring real-time inventory management, secure payment processing, and responsive design. Handles over 10,000 daily transactions.',
      images: [
        'https://images.unsplash.com/photo-1557821552-17105176677c?w=400',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400'
      ],
      links: {
        github: 'https://github.com/yourusername/ecommerce-platform',
        demo: 'https://ecommerce-demo.example.com'
      }
    },
    {
      id: 2,
      title: 'Mobile Game Development',
      miniDesc: 'Unity game with multiplayer',
      fullDesc: 'Developed an engaging mobile game using Unity and C#. Implemented multiplayer functionality, in-app purchases, and social features. Achieved 50,000+ downloads in the first month.',
      images: [
        'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400',
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400',
        'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400'
      ],
      links: {
        github: 'https://github.com/yourusername/mobile-game',
        docs: 'https://docs.google.com/document/d/your-doc-id'
      }
    },
    {
      id: 3,
      title: 'Travel Booking App',
      miniDesc: 'React Native application',
      fullDesc: 'Created a cross-platform travel booking application with React Native. Features include flight search, hotel reservations, itinerary planning, and offline mode for travelers on the go.',
      images: [
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400',
        'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400',
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400'
      ],
      links: {
        github: 'https://github.com/yourusername/travel-booking',
        demo: 'https://travel-app-demo.example.com'
      }
    },
    {
      id: 4,
      title: 'AI Chat Assistant',
      miniDesc: 'Machine learning integration',
      fullDesc: 'Designed and implemented an AI-powered chat assistant using Python and TensorFlow. Integrated natural language processing to provide intelligent responses and automate customer support.',
      images: [
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
        'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400',
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400'
      ],
      links: {
        github: 'https://github.com/yourusername/ai-chat-assistant',
        docs: 'https://docs.google.com/document/d/your-doc-id-2'
      }
    }
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800',
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800'
  ];

  useEffect(() => {
    if (currentPage === 'about') {
      const interval = setInterval(() => {
        setRotation(prev => prev + 0.15);
        setRotation2(prev => prev + 0.25);
        setRotation3(prev => prev + 0.35);
      }, 16);
      return () => clearInterval(interval);
    }
  }, [currentPage]);

  useEffect(() => {
    if (currentPage === 'about') {
      const interval = setInterval(() => {
        setCurrentGalleryImage(prev => (prev + 1) % galleryImages.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [currentPage, galleryImages.length]);

  const handleCarouselScroll = (e) => {
    if (expandedProject) return;
    e.preventDefault();
    const delta = e.deltaY;
    if (Math.abs(delta) > 5) {
      if (delta > 0 && carouselIndex < projects.length - 1) {
        setCarouselIndex(prev => prev + 1);
      } else if (delta < 0 && carouselIndex > 0) {
        setCarouselIndex(prev => prev - 1);
      }
    }
  };

  const handleProjectClick = (project) => {
    const clickedIndex = projects.findIndex(p => p.id === project.id);
    
    if (clickedIndex === carouselIndex) {
      setExpandedProject(expandedProject ? null : project);
    } else {
      setCarouselIndex(clickedIndex);
      setExpandedProject(null);
    }
  };

  const CircularText = ({ text, radius, fontSize, offset = 0, blueIndices = [], spacingMultiplier = 1 }) => {
    const characters = text.split('');
    const totalChars = characters.length;
    const arcLength = 180 * spacingMultiplier;
    const angleStep = arcLength / totalChars;
    const vwFontSize = fontSize * 0.15;

    return (
      <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
        {characters.map((char, i) => {
          const angle = (i * angleStep - (arcLength / 2) + offset) * (Math.PI / 180);
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          const charRotation = i * angleStep - (arcLength / 2) + offset + 90;
          const isBlue = blueIndices.includes(i);
          
          return (
            <span
              key={i}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translate(${x}vw, ${y}vw) rotate(${charRotation}deg)`,
                fontSize: `${vwFontSize}vw`,
                fontWeight: 'bold',
                color: isBlue ? '#3b82f6' : '#e0e0e0'
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#1a1a1a',
      color: '#e0e0e0',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflow: 'hidden'
    }}>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '30px 50px',
        display: 'flex',
        justifyContent: 'center',
        gap: '40px',
        zIndex: 1000,
        fontSize: '14px',
        letterSpacing: '1px'
      }}>
        <button
          onClick={() => setCurrentPage('about')}
          style={{
            background: 'none',
            border: 'none',
            color: currentPage === 'about' ? '#e0e0e0' : '#666',
            cursor: 'pointer',
            transition: 'color 0.3s',
            fontSize: '14px',
            letterSpacing: '1px'
          }}
        >
          ABOUT
        </button>
        <span style={{ color: '#333' }}>|</span>
        <button
          onClick={() => setCurrentPage('projects')}
          style={{
            background: 'none',
            border: 'none',
            color: currentPage === 'projects' ? '#e0e0e0' : '#666',
            cursor: 'pointer',
            transition: 'color 0.3s',
            fontSize: '14px',
            letterSpacing: '1px'
          }}
        >
          PROJECTS
        </button>
        <span style={{ color: '#333' }}>|</span>
        <button
          onClick={() => setCurrentPage('contact')}
          style={{
            background: 'none',
            border: 'none',
            color: currentPage === 'contact' ? '#e0e0e0' : '#666',
            cursor: 'pointer',
            transition: 'color 0.3s',
            fontSize: '14px',
            letterSpacing: '1px'
          }}
        >
          CONTACT
        </button>
      </nav>

      {currentPage === 'about' && (
        <div style={{
          display: 'flex',
          height: '100vh',
          paddingTop: '80px',
          position: 'relative'
        }}>
          <div style={{
            width: '50%',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              left: '-30vw',
              top: '50%',
              transform: 'translate(0, -50%)',
              width: '60vw',
              height: '60vw'
            }}>
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                transform: `rotate(${rotation}deg)`
              }}>
                <CircularText 
                  text="JAMEEL GANADEN" 
                  radius={21}
                  fontSize={38} 
                  offset={0}
                  spacingMultiplier={1.6}
                />
              </div>
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                transform: `rotate(${rotation2}deg)`
              }}>
                <CircularText text="Software Developer  " radius={15.75} fontSize={22} offset={0} spacingMultiplier={1.2} />
              </div>
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                transform: `rotate(${rotation3}deg)`
              }}>
                <CircularText text="Game Enthusiast" radius={11.25} fontSize={18} offset={0} spacingMultiplier={1.0} />
                <CircularText text="Travel Addict" radius={11.25} fontSize={18} offset={180} spacingMultiplier={1.0} />
              </div>
            </div>
          </div>

          <div style={{
            width: '50%',
            padding: '50px 80px',
            overflowY: 'auto',
            display: 'flex',
            justifyContent: 'flex-start'
          }}>
            <div style={{
              maxWidth: '600px',
              width: '100%'
            }}>
              <h1 style={{
                fontSize: '48px',
                marginBottom: '30px',
                color: '#e0e0e0'
              }}>
                JAMEEL <span style={{ color: '#3b82f6' }}>(JAMJAM)</span> GANADEN
              </h1>
              <p style={{
                fontSize: '18px',
                lineHeight: '1.8',
                color: '#b0b0b0',
                marginBottom: '20px'
              }}>
                Hi! I'm Jameel, a passionate software developer with a love for creating innovative solutions. 
                My journey in tech has been driven by curiosity and a constant desire to learn and grow.
              </p>
              <p style={{
                fontSize: '18px',
                lineHeight: '1.8',
                color: '#b0b0b0',
                marginBottom: '20px'
              }}>
                When I'm not coding, you'll find me exploring new games, discovering the latest gaming trends, 
                or planning my next adventure. I believe that travel and gaming both teach us to think creatively 
                and solve problems from different perspectives.
              </p>
              <p style={{
                fontSize: '18px',
                lineHeight: '1.8',
                color: '#b0b0b0',
                marginBottom: '40px'
              }}>
                I specialize in full-stack development with a focus on creating engaging user experiences. 
                My technical skills combined with my creative mindset allow me to build applications that 
                are both functional and delightful to use.
              </p>

              <h2 style={{
                fontSize: '24px',
                marginBottom: '20px',
                color: '#3b82f6'
              }}>
                Life Highlights
              </h2>
              <div style={{
                width: '100%',
                aspectRatio: '1',
                backgroundColor: '#0a0a0a',
                borderRadius: '8px',
                border: '2px solid #2a2a2a',
                overflow: 'hidden',
                position: 'relative'
              }}>
                {galleryImages.map((img, idx) => (
                  <img 
                    key={idx}
                    src={img} 
                    alt={`Life Highlight ${idx + 1}`}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: idx === currentGalleryImage ? 1 : 0,
                      transition: 'opacity 1s ease-in-out'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {currentPage === 'projects' && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            paddingTop: '80px',
            overflow: 'hidden',
            position: 'relative'
          }}
          onWheel={handleCarouselScroll}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '30px',
            position: 'relative',
            width: '100%',
            justifyContent: 'center',
            flex: 1
          }}>
            {projects.map((project, i) => {
              const offset = i - carouselIndex;
              const isCenter = offset === 0;
              const isVisible = Math.abs(offset) <= 2;

              return isVisible && (
                <div
                  key={project.id}
                  onClick={() => handleProjectClick(project)}
                  style={{
                    width: isCenter ? '900px' : '800px',
                    height: expandedProject?.id === project.id ? '85vh' : '500px',
                    backgroundColor: '#0a0a0a',
                    border: isCenter ? '2px solid #3b82f6' : '2px solid #2a2a2a',
                    borderRadius: '10px',
                    padding: '60px',
                    transform: `translateX(${offset * 880}px) scale(${isCenter ? 1 : 0.9})`,
                    opacity: Math.abs(offset) === 2 ? 0.15 : (isCenter ? 1 : 0.4),
                    transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    cursor: 'pointer',
                    position: 'absolute',
                    zIndex: isCenter ? 10 : (offset < 0 ? 9 - Math.abs(offset) : 9 - offset),
                    overflow: expandedProject?.id === project.id ? 'auto' : 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '25px'
                  }}
                  onMouseEnter={e => {
                    if (!isCenter && Math.abs(offset) !== 2) {
                      e.currentTarget.style.opacity = '0.7';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isCenter) {
                      e.currentTarget.style.opacity = Math.abs(offset) === 2 ? '0.15' : '0.4';
                    }
                  }}
                >
                  <h2 style={{
                    margin: 0,
                    fontSize: '28px',
                    color: '#e0e0e0'
                  }}>
                    {project.title}
                  </h2>
                  <p style={{
                    margin: 0,
                    fontSize: '16px',
                    color: '#888'
                  }}>
                    {project.miniDesc}
                  </p>
                  {expandedProject?.id === project.id && (
                    <div style={{
                      marginTop: '20px',
                      animation: 'fadeIn 0.3s ease-in'
                    }}>
                      <p style={{
                        fontSize: '16px',
                        lineHeight: '1.6',
                        color: '#b0b0b0',
                        marginBottom: '20px'
                      }}>
                        {project.fullDesc}
                      </p>
                      <div style={{
                        display: 'flex',
                        gap: '15px',
                        fontSize: '40px',
                        marginBottom: '20px'
                      }}>
                        {project.images.map((img, idx) => (
                          <div key={idx} style={{
                            width: '100px',
                            height: '100px',
                            backgroundColor: '#1a1a1a',
                            borderRadius: '8px',
                            border: '1px solid #2a2a2a',
                            overflow: 'hidden'
                          }}>
                            <img 
                              src={img}
                              alt={`${project.title} ${idx + 1}`}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                              }}
                            />
                          </div>
                        ))}
                      </div>
                      <div style={{
                        display: 'flex',
                        gap: '15px',
                        flexWrap: 'wrap'
                      }}>
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: '10px 20px',
                              backgroundColor: '#2a2a2a',
                              border: '1px solid #3b82f6',
                              borderRadius: '6px',
                              color: '#e0e0e0',
                              textDecoration: 'none',
                              fontSize: '14px',
                              transition: 'all 0.3s',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#3b82f6'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2a2a2a'}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            GitHub
                          </a>
                        )}
                        {project.links.demo && (
                          <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: '10px 20px',
                              backgroundColor: '#2a2a2a',
                              border: '1px solid #3b82f6',
                              borderRadius: '6px',
                              color: '#e0e0e0',
                              textDecoration: 'none',
                              fontSize: '14px',
                              transition: 'all 0.3s'
                            }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#3b82f6'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2a2a2a'}
                          >
                            Live Demo
                          </a>
                        )}
                        {project.links.docs && (
                          <a
                            href={project.links.docs}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: '10px 20px',
                              backgroundColor: '#2a2a2a',
                              border: '1px solid #3b82f6',
                              borderRadius: '6px',
                              color: '#e0e0e0',
                              textDecoration: 'none',
                              fontSize: '14px',
                              transition: 'all 0.3s'
                            }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#3b82f6'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2a2a2a'}
                          >
                            Documentation
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            padding: '15px 30px',
            backgroundColor: 'rgba(26, 26, 26, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid #2a2a2a',
            borderRadius: '50px',
            fontSize: '14px',
            color: '#b0b0b0'
          }}>
            <div style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center'
            }}>
              {projects.map((_, idx) => (
                <div
                  key={idx}
                  style={{
                    width: idx === carouselIndex ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    backgroundColor: idx === carouselIndex ? '#3b82f6' : '#2a2a2a',
                    transition: 'all 0.3s'
                  }}
                />
              ))}
            </div>
            <div style={{
              borderLeft: '1px solid #2a2a2a',
              paddingLeft: '20px',
              fontWeight: '500',
              color: '#e0e0e0'
            }}>
              <span style={{ color: '#3b82f6', fontSize: '18px' }}>{carouselIndex + 1}</span>
              <span style={{ color: '#666', margin: '0 8px' }}>/</span>
              <span style={{ color: '#888' }}>{projects.length}</span>
            </div>
          </div>
        </div>
      )}

      {currentPage === 'contact' && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          gap: '40px'
        }}>
          <div style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            backgroundColor: '#0a0a0a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '80px',
            border: '3px solid #3b82f6',
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
            overflow: 'hidden'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400"
              alt="Profile"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
          <p style={{
            fontSize: '20px',
            color: '#b0b0b0',
            maxWidth: '500px',
            textAlign: 'center',
            lineHeight: '1.6'
          }}>
            Thank you for taking the time to explore my work. I'm always excited to connect with fellow 
            developers, gamers, and travelers. Feel free to reach out—let's create something amazing together!
          </p>
          <div style={{
            display: 'flex',
            gap: '30px',
            marginTop: '20px'
          }}>
            <a
              href="mailto:jameel.ganaden@example.com"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '15px 30px',
                backgroundColor: '#0a0a0a',
                border: '2px solid #3b82f6',
                borderRadius: '8px',
                color: '#e0e0e0',
                textDecoration: 'none',
                transition: 'all 0.3s',
                fontSize: '16px'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#2a2a2a';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#0a0a0a';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Mail size={20} />
              Email
            </a>
            <a
              href="https://linkedin.com/in/jameelganaden"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '15px 30px',
                backgroundColor: '#0a0a0a',
                border: '2px solid #3b82f6',
                borderRadius: '8px',
                color: '#e0e0e0',
                textDecoration: 'none',
                transition: 'all 0.3s',
                fontSize: '16px'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#2a2a2a';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#0a0a0a';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Linkedin size={20} />
              LinkedIn
            </a>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        * {
          box-sizing: border-box;
        }
        button {
          font-family: inherit;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #0a0a0a;
        }
        ::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;