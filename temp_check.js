  // بيانات الأجزاء الثلاثة للزمالة
  const fellowshipParts = [
    {
      id: 1,
      title: 'الجزء الأول: الأساسيات',
      description: 'مقدمة شاملة في أساسيات المراجعة الداخلية والمفاهيم الأولية',
      files: [
        {
          id: '1',
          name: 'دليل المراجعة الداخلية الأساسي.pdf',
          type: 'pdf' as const,
          size: '2.5 MB',
          description: 'دليل شامل لأساسيات المراجعة الداخلية',
          isProtected: false,
          downloadAllowed: true,
          previewAvailable: true,
          url: '/files/internal-audit-basics.pdf'
        },
        {
          id: '2',
          name: 'نماذج التقارير الأساسية.docx',
          type: 'docx' as const,
          size: '1.8 MB',
          description: 'نماذج جاهزة لتقارير المراجعة البسيطة',
          isProtected: false,
          downloadAllowed: true,
          previewAvailable: true,
          url: '/files/report-templates.docx'
        }
      ],
      videos: [
        {
          id: '1',
          title: 'مقدمة في المراجعة الداخلية',
          description: 'شرح مفصل لمفهوم المراجعة الداخلية وأهميتها',
          duration: '45 دقيقة',
          src: '/videos/intro-internal-audit.mp4',
          isProtected: true,
          downloadAllowed: false
        },
        {
          id: '2',
          title: 'أساسيات إدارة المخاطر',
          description: 'فهم أساسيات تحديد وتقييم المخاطر',
          duration: '38 دقيقة',
          src: '/videos/risk-management-basics.mp4',
          isProtected: true,
          downloadAllowed: false
        }
      ],
      podcasts: [
        {
          id: '1',
          title: 'حوار مع خبير المراجعة الداخلية',
          description: 'حوار مفتوح مع أحد خبراء المراجعة الداخلية',
          duration: '62 دقيقة',
          src: '/podcasts/expert-interview.mp3',
          isProtected: false,
          downloadAllowed: true
        }
      ]
    },
    {
      id: 2,
      title: 'الجزء الثاني: المتقدم',
      description: 'الطرق والأدوات المتقدمة في المراجعة الداخلية',
      files: [
        {
          id: '3',
          name: 'أدوات المراجعة المتقدمة.pdf',
          type: 'pdf' as const,
          size: '3.2 MB',
          description: 'دليل الأدوات والتقنيات المتقدمة',
          isProtected: true,
          downloadAllowed: true,
          previewAvailable: true,
          url: '/files/advanced-tools.pdf'
        },
        {
          id: '4',
          name: 'دراسات حالة عملية.xlsx',
          type: 'xlsx' as const,
          size: '1.5 MB',
          description: 'دراسات حالة حقيقية لتطبيق عملي',
          isProtected: true,
          downloadAllowed: true,
          previewAvailable: true,
          url: '/files/case-studies.xlsx'
        }
      ],
      videos: [
        {
          id: '3',
          title: 'تحليل البيانات في المراجعة',
          description: 'استخدام التحليلات في عمليات المراجعة',
          duration: '52 دقيقة',
          src: '/videos/data-analysis-audit.mp4',
          isProtected: true,
          downloadAllowed: false
        }
      ],
      podcasts: [
        {
          id: '2',
          title: 'تجارب ناجحة في المراجعة الداخلية',
          description: 'قصص نجاح من الميدان العملي',
          duration: '45 دقيقة',
          src: '/podcasts/success-stories.mp3',
          isProtected: false,
          downloadAllowed: true
        }
      ]
    },
    {
      id: 3,
      title: 'الجزء الثالث: الدولي',
      description: 'المعايير الدولية وأفضل الممارسات العالمية',
      files: [
        {
          id: '5',
          name: 'المعايير الدولية للمراجعة.pdf',
          type: 'pdf' as const,
          size: '4.1 MB',
          description: 'المعايير الدولية المعتمدة للمراجعة الداخلية',
          isProtected: true,
          downloadAllowed: true,
          previewAvailable: true,
          url: '/files/international-standards.pdf'
        }
      ],
      videos: [
        {
          id: '4',
          title: 'تطبيق المعايير الدولية',
          description: 'كيفية تطبيق المعايير الدولية في الواقع العملي',
          duration: '48 دقيقة',
          src: '/videos/international-standards-application.mp4',
          isProtected: true,
          downloadAllowed: false
        }
      ],
      podcasts: [
        {
          id: '3',
          title: 'مستقبل المراجعة الداخلية',
          description: 'اتجاهات وتوقعات مستقبل المهنة',
          duration: '55 دقيقة',
          src: '/podcasts/future-of-audit.mp3',
          isProtected: false,
          downloadAllowed: true
        }
      ]
    }
  ];

  // بيانات بنك الأسئلة
  const sampleQuestions = [
    {
      id: '1',
      question: 'ما هو الدور الرئيسي للمراجع الداخلي في المنظمة؟',
