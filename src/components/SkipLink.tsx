const SkipLink = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-gradient-to-r focus:from-blue-600 focus:to-purple-600 focus:text-white focus:font-bold focus:rounded-2xl focus:shadow-2xl focus:ring-4 focus:ring-purple-300 focus:ring-offset-2 transition-all duration-300"
    >
      الانتقال إلى المحتوى الرئيسي
    </a>
  );
};

export default SkipLink;
