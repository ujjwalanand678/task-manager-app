import React from "react";

const styles = {
  root: `
    min-h-screen w-full
    flex items-center justify-center
    bg-slate-200
    px-4
  `,

  card: `
    w-full max-w-md
    rounded-2xl
    bg-slate-200
    p-8
    shadow-[12px_12px_24px_#b8bcc2,-12px_-12px_24px_#ffffff]
  `,

  header: `
    text-center mb-8
  `,

  title: `
    text-2xl font-semibold text-slate-700
    tracking-tight
  `,

  subtitle: `
    mt-1 text-sm text-slate-500
  `,
};

const AuthLayouts = ({ title, subtitle, children }) => {
  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        {children}
      </div>
    </div>
  );
};

export default AuthLayouts;
