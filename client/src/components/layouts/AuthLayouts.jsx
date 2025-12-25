import React from "react";

const glassBlob = `
  rounded-full
 bg-[radial-gradient(circle_at_top_left,#ffffffb3_0%,#ffffff40_35%,#ffffff00_65%)]
backdrop-saturate-150
  border border-white/15
  backdrop-blur-3xl
  shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]
`;

const styles = {
  root: `
  relative min-h-screen w-full
  overflow-hidden

 bg-[#14171E]

`,
// bg-[radial-gradient(circle_at_top,#b4faf0_0%,#4edded_45%,#52d1b6_100%)]
  centerWrapper: `
    relative z-10
    flex items-center justify-center
    min-h-screen w-full
    px-4
  `,

  glassCard: `
    relative z-[1]
    backdrop-blur-lg
    flex items-center justify-center
    w-full max-w-[900px]
    rounded-3xl
    p-10
 border border-white/10
    shadow-[0_30px_120px_rgba(0,0,0,0.45)]
  `,

  card: `
  relative z-10
  w-auto min-w-[350px] max-h-screen
  flex flex-col items-center justify-center
  rounded-[32px]
  p-4 md:p-8
  
  bg-gradient-to-br from-white/10 to-white/10
  backdrop-blur-2xl
  backdrop-saturate-[180%] 
  
  border border-white/30
     shadow-[0_40px_100px_rgba(0,0,0,0.2)]
    transition-all duration-500
  hover:shadow-[0_50px_120px_rgba(0,0,0,0.25)]
`,

  header: `
  mb-3 text-center
  `,

  title: `
    text-[30px]
    font-semibold
    text-white/85
    tracking-tight
  `,

  subtitle: `
      text-[16px]
  text-white/85
   font-medium
  `,
};

const AuthLayouts = ({ title, subtitle, children }) => {
  return (
    <div className={styles.root}>
      {/* Background Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-16 left-[100px] w-60 h-60 animate-blob ${glassBlob}`}
        />
        <div
          className={`absolute top-30 right-[200px] w-40 h-40 animate-blob animation-delay-2000 ${glassBlob}`}
        />
        <div
          className={`absolute bottom-30 right-[100px] w-24 h-24 animate-blob animation-delay-4000 ${glassBlob}`}
        />
        <div
          className={`absolute bottom-32 left-[150px] w-40 h-40 animate-blob-2 ${glassBlob}`}
        />
        <div
          className={`absolute bottom-30 left-[400px] w-48 h-48 ${glassBlob}`}
        />
        <div
          className={`absolute top-10 left-[400px] w-40 h-40 ${glassBlob}`}
        />
        <div
          className={`absolute top-30 right-[400px] w-24 h-24 ${glassBlob}`}
        />
        <div
          className={`absolute bottom-20 right-[300px] w-32 h-32 ${glassBlob}`}
        />
      </div>

      {/* Centered Glass Card */}
      <div className={styles.centerWrapper}>
        <div className={styles.glassCard}>
          <div className={styles.card}>
            {(title || subtitle) && (
              <div className={styles.header}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.subtitle}>{subtitle}</p>
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayouts;
