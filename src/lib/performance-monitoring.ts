export const reportWebVitals = (metric: any) => {
  if (process.env.NODE_ENV === 'production') {
    // إرسال إلى خدمة مراقبة مثل Vercel Analytics أو DataDog
    console.log(metric);
  }
};
