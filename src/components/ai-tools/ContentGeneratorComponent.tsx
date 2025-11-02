'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Mail,
  Megaphone,
  Newspaper,
  Sparkles,
  Copy,
  Download,
  Save,
  Edit,
  Clock,
  CheckCircle,
  Zap,
  BookOpen,
} from 'lucide-react';

interface ContentType {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface Style {
  id: string;
  name: string;
}

interface Length {
  id: string;
  name: string;
}

interface GeneratedContent {
  id: string;
  type: string;
  topic: string;
  keywords: string[];
  style: string;
  length: string;
  content: string;
  timestamp: Date;
}

const ContentGeneratorComponent = () => {
  const [contentType, setContentType] = useState<string>('post');
  const [topic, setTopic] = useState<string>('');
  const [keywords, setKeywords] = useState<string>('');
  const [style, setStyle] = useState<string>('friendly');
  const [length, setLength] = useState<string>('medium');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<string>('');
  const [library, setLibrary] = useState<GeneratedContent[]>([]);

  const contentTypes: ContentType[] = [
    {
      id: 'post',
      name: 'منشور',
      icon: FileText,
      description: 'منشور لوسائل التواصل الاجتماعي',
    },
    {
      id: 'email',
      name: 'إيميل',
      icon: Mail,
      description: 'رسالة إلكترونية تسويقية',
    },
    {
      id: 'ad',
      name: 'إعلان',
      icon: Megaphone,
      description: 'إعلان تجاري قصير',
    },
    {
      id: 'article',
      name: 'مقال',
      icon: Newspaper,
      description: 'مقالة مفصلة',
    },
  ];

  const styles: Style[] = [
    { id: 'formal', name: 'رسمي' },
    { id: 'friendly', name: 'ودي' },
    { id: 'technical', name: 'تقني' },
    { id: 'creative', name: 'إبداعي' },
  ];

  const lengths: Length[] = [
    { id: 'short', name: 'قصير' },
    { id: 'medium', name: 'متوسط' },
    { id: 'long', name: 'طويل' },
  ];

  // Mock data for generated content
  const mockContent: Record<string, Record<string, Record<string, string>>> = {
    post: {
      friendly: {
        short: "🌟 اكتشف عالم البرمجة معنا! دوراتنا التفاعلية تجعل التعلم ممتعاً وسهلاً. انضم الآن وابدأ رحلتك نحو النجاح! #تعلم_البرمجة #تطوير_المهارات",
        medium: "مرحباً أصدقائي! 😊\n\nهل تحلم بأن تصبح مبرمجاً محترفاً؟ مع دوراتنا الشاملة في البرمجة، ستتعلم كل ما تحتاجه من الأساسيات إلى المستويات المتقدمة.\n\n✨ مميزاتنا:\n• مدربون خبراء\n• مشاريع عملية\n• دعم 24/7\n\nلا تفوت الفرصة! سجل الآن وابدأ مغامرتك الرقمية. 🚀",
        long: "أهلاً وسهلاً بكم في عائلتنا الرقمية! 👋\n\nفي عالم يتسارع فيه التطور التكنولوجي، أصبح تعلم البرمجة أمراً أساسياً لكل شخص يريد أن يكون جزءاً من المستقبل.\n\nدوراتنا مصممة خصيصاً لتلبية احتياجاتكم، سواء كنت مبتدئاً أو لديك خبرة سابقة. نقدم:\n\n🔹 منهج متدرج من البسيط إلى المعقد\n🔹 تمارين عملية يومية\n🔹 مشاريع حقيقية لتعزيز المهارات\n🔹 شهادات معتمدة\n🔹 مجتمع داعم من المتعلمين\n\nانضموا إلينا اليوم وكنوا جزءاً من ثورة البرمجة! 💻✨\n\n#تعلم_البرمجة #مستقبل_رقمي #تطوير_ذاتي",
      },
      formal: {
        short: "نقدم لكم دورات برمجة احترافية معتمدة. ابدأ رحلتك التعليمية اليوم.",
        medium: "السادة الكرام،\n\nيسرنا أن نقدم لكم برنامجاً تعليمياً شاملاً في مجال البرمجة والتطوير. يشمل البرنامج دورات متخصصة تغطي مختلف لغات البرمجة والتقنيات الحديثة.\n\nنضمن لكم تعليماً عالي الجودة مع شهادات معتمدة.",
        long: "إلى جميع المهتمين بالتطوير المهني،\n\nفي إطار سعينا المستمر لتقديم أفضل الخدمات التعليمية، نقدم برنامجاً متكاملاً لتعليم البرمجة يلبي احتياجات السوق الحديثة.\n\nيشمل البرنامج:\n\n• دورات أساسية ومتقدمة\n• تدريب عملي على مشاريع حقيقية\n• شهادات معترف بها دولياً\n• دعم فني مستمر\n\nنحن ملتزمون بتمكينكم من المهارات اللازمة للنجاح في مجال التكنولوجيا.",
      },
      technical: {
        short: "تعلم JavaScript ES6+, React, Node.js. مشاريع عملية، شهادات معتمدة.",
        medium: "برنامج شامل لتعلم البرمجة الحديثة:\n\n• Frontend: HTML5, CSS3, JavaScript, React, Vue.js\n• Backend: Node.js, Express, MongoDB\n• DevOps: Docker, AWS, CI/CD\n\nمشاريع عملية + شهادات.",
        long: "منهج تقني متكامل لتطوير المهارات البرمجية:\n\nFrontend Development:\n- HTML5/CSS3/SASS\n- JavaScript (ES6+)\n- React.js/Vue.js/Angular\n- TypeScript\n- Testing (Jest, Cypress)\n\nBackend Development:\n- Node.js/Express\n- Python/Django\n- Databases (SQL/NoSQL)\n- REST APIs/GraphQL\n\nDevOps & Tools:\n- Git/GitHub\n- Docker/Kubernetes\n- AWS/Azure\n- CI/CD Pipelines\n\nشهادات معتمدة + مشاريع portfolio.",
      },
      creative: {
        short: "🚀 انطلق في رحلة البرمجة السحرية! ✨ اكتشف عالم الكود الذي يحول الأفكار إلى واقع رقمي! 💫",
        medium: "تخيل عالماً حيث تكتب كلمات سحرية تحول شاشتك البيضاء إلى تطبيقات مذهلة! 🌟\n\nفي دوراتنا، ستتعلم فن البرمجة كما يتعلم الفنانون الرسم - بخطوات إبداعية ومشاريع مثيرة.\n\n🎨 اجعل كودك يعبر عن روحك!\n🎯 حوّل أحلامك إلى واقع!\n🚀 كن جزءاً من ثورة الإبداع الرقمي!",
        long: "مرحباً بك في عالم حيث يلتقي الإبداع بالتكنولوجيا! 🌈✨\n\nهل حلمت يوماً بأن تكون ساحراً رقمياً؟ أن تكتب تعويذات تحول الأفكار إلى تطبيقات تفاعلية؟\n\nدوراتنا ليست مجرد دروس برمجة - إنها رحلة إبداعية تأخذك من نقطة الصفر إلى قمة الإبداع الرقمي!\n\n🎭 ستتعلم:\n• كيفية جعل الكود يرقص\n• تحويل المفاهيم المعقدة إلى تجارب بسيطة\n• إنشاء تطبيقات تبهر المستخدمين\n• فن التصميم الرقمي الإبداعي\n\nانضم إلى مجتمع المبدعين الرقميين وابدأ في كتابة قصتك الخاصة في عالم البرمجة! 💻🎨🚀",
      },
    },
    email: {
      friendly: {
        short: "مرحباً! 😊 جاهز لتعلم البرمجة؟ دوراتنا تنتظرك!",
        medium: "أهلاً صديقي،\n\nكيف حالك اليوم؟ أردنا أن نخبرك عن دوراتنا الرائعة في البرمجة التي ستغير حياتك المهنية.\n\nمع أكثر من 100 ساعة من المحتوى التفاعلي، ستتعلم كل شيء من الصفر.\n\nسجل الآن واحصل على خصم 20%!\n\nمع خالص التحية،\nفريق التعلم",
        long: "مرحباً بك صديقي العزيز! 👋\n\nأتمنى أن يجدك هذا الإيميل بخير. في عالم يتغير بسرعة، أصبح تعلم البرمجة مفتاح النجاح.\n\nدعني أخبرك عن دوراتنا الفريدة:\n\n🌟 منهج مصمم للمبتدئين والمحترفين\n🎯 مشاريع عملية حقيقية\n👨‍🏫 مدربون متميزون\n📚 مكتبة محتوى غنية\n💬 دعم مجتمعي\n\nلدينا عرض خاص لك: خصم 25% على الاشتراك السنوي!\n\nلا تتردد في الاتصال بنا إذا كان لديك أي أسئلة. نحن هنا لمساعدتك.\n\nمع خالص التحية والتقدير،\nفريق منصة التعلم الإلكتروني",
      },
      formal: {
        short: "نقدم لكم دورات برمجة متخصصة. تفضلوا بزيارة موقعنا.",
        medium: "السيد/السيدة،\n\nيسرنا أن نعرض عليكم برنامجنا التعليمي في مجال البرمجة والتطوير.\n\nيغطي البرنامج جميع المجالات الأساسية والمتقدمة مع ضمان جودة التعليم.\n\nلمزيد من المعلومات، يرجى زيارة موقعنا الإلكتروني.",
        long: "إلى السيد/السيدة المحترم/ة،\n\nتحية طيبة وبعد،\n\nيسعدنا أن نتواصل معكم لتقديم خدماتنا التعليمية المتميزة في مجال البرمجة والتطوير الرقمي.\n\nبرنامجنا يشمل:\n\n• دورات أساسية ومتخصصة\n• تدريب عملي متقدم\n• شهادات معتمدة\n• دعم فني مستمر\n• منصة تعليمية متطورة\n\nنحن ملتزمون بتقديم أعلى مستويات الجودة التعليمية لضمان نجاحكم المهني.\n\nنتطلع إلى التعاون معكم.\n\nمع خالص التحية،\nإدارة منصة التعلم",
      },
      technical: {
        short: "دورات برمجة: Full-Stack, Data Science, AI. شهادات + مشاريع.",
        medium: "برنامج تدريبي تقني شامل:\n\nTech Stack:\n• MERN Stack\n• Python/ML\n• Cloud Computing\n\nRequirements: Basic programming knowledge.\nDuration: 6 months.\n\nApply now.",
        long: "Technical Training Program Overview:\n\nCurriculum:\n\nPhase 1: Fundamentals\n- Programming Logic\n- Data Structures\n- Algorithms\n\nPhase 2: Frontend\n- React.js\n- Vue.js\n- State Management\n\nPhase 3: Backend\n- Node.js\n- Databases\n- APIs\n\nPhase 4: Advanced Topics\n- Microservices\n- DevOps\n- Cloud Platforms\n\nPrerequisites:\n- Basic computer skills\n- Logical thinking\n\nDuration: 24 weeks\nCertification: Industry recognized\nProjects: 5+ real-world applications",
      },
      creative: {
        short: "🎨 اكتشف سحر البرمجة! ✨ دورات تحول الأحلام إلى كود!",
        medium: "عزيزي المبدع،\n\nتخيل لو كان بإمكانك تحويل قصصك الخيالية إلى تطبيقات تفاعلية! 🌟\n\nدوراتنا تجمع بين الفن والتكنولوجيا لتخلق تجارب فريدة.\n\nانضم إلينا واكتب قصتك الرقمية! 🎭💻",
        long: "إلى عشاق الإبداع والتكنولوجيا،\n\nفي عالم حيث يلتقي الخيال بالواقع، نقدم لكم دورات برمجة تتجاوز الحدود التقليدية! 🎨✨\n\nسواء كنت فناناً يريد تعلم الكود، أو مبرمجاً يريد إضافة لمسة إبداعية، فإن برامجنا مصممة خصيصاً لكم.\n\n🎭 ما ستتعلمه:\n• برمجة الألعاب التفاعلية\n• تطوير التطبيقات الإبداعية\n• التصميم الرقمي المتقدم\n• فن الرسوم المتحركة\n\n🌟 مشاريع مميزة:\n• تطبيقات فنية\n• ألعاب تفاعلية\n• مواقع إبداعية\n• تجارب مستخدم فريدة\n\nانضموا إلى مجتمع المبدعين الرقميين وابدأوا رحلتكم السحرية في عالم البرمجة! 🚀💫",
      },
    },
    ad: {
      friendly: {
        short: "تعلم البرمجة بطريقة ممتعة! دوراتنا للجميع. ابدأ اليوم! 😊",
        medium: "هل تريد أن تكون مبرمجاً؟ 🎯\n\nدوراتنا التفاعلية تجعل التعلم سهلاً وممتعاً!\n\n✨ 100+ ساعة محتوى\n👨‍🏫 خبراء في التدريس\n📜 شهادات معتمدة\n\nخصم 30% اليوم فقط!",
        long: "اكتشف عالم البرمجة معنا! 🌟\n\nسواء كنت مبتدئاً أو لديك خبرة، لدينا الدورة المناسبة لك.\n\n🔥 مميزاتنا:\n• تعلم بالسرعة التي تناسبك\n• مشاريع عملية مثيرة\n• دعم من المدربين والمجتمع\n• شهادات تفتح لك أبواب العمل\n\nلا تدع الفرصة تفوتك! سجل الآن واحصل على دورة مجانية في الأسبوع الأول.\n\nانضم إلى آلاف المتعلمين الناجحين! 🚀",
      },
      formal: {
        short: "دورات برمجة معتمدة. جودة عالية، أسعار تنافسية.",
        medium: "برنامج تعليمي متميز في البرمجة والتطوير.\n\nنقدم دورات شاملة مع شهادات معتمدة دولياً.\n\nاطلب استشارة مجانية اليوم.",
        long: "نحن نقدم خدمات تعليمية متميزة في مجال البرمجة والتطوير الرقمي.\n\nبرامجنا مصممة لتلبية احتياجات السوق الحديثة مع التركيز على الجودة والكفاءة.\n\nتشمل خدماتنا:\n\n• دورات متخصصة\n• تدريب عملي\n• شهادات معتمدة\n• دعم فني\n\nنحن ملتزمون بنجاح عملائنا.",
      },
      technical: {
        short: "تعلم: JS, Python, React. مشاريع + شهادات. ابدأ الآن.",
        medium: "Technical Skills Development:\n\n• Full-Stack Development\n• Data Analysis\n• Machine Learning\n• Cloud Computing\n\n6-month intensive program.\n\nLimited seats available.",
        long: "Advanced Technical Training Program:\n\nCore Technologies:\n- JavaScript/TypeScript\n- Python/R\n- React/Node.js\n- AWS/Azure\n\nSpecializations:\n• Web Development\n• Data Science\n• AI/ML\n• DevOps\n\nProgram Features:\n• Hands-on projects\n• Industry mentors\n• Job placement assistance\n• Certification prep\n\nDuration: 6 months\nMode: Online/Live\nPrerequisites: Basic coding knowledge",
      },
      creative: {
        short: "🎨 اجعل الكود يرقص! دورات برمجة إبداعية! ✨",
        medium: "اكتشف فن البرمجة الإبداعية! 🎭\n\nحوّل أفكارك إلى تطبيقات مذهلة!\n\n🌟 دورات تجمع الفن والتكنولوجيا\n🎯 مشاريع إبداعية فريدة\n🚀 كن مبدعاً رقمياً!",
        long: "انطلق في رحلة الإبداع الرقمي! 🚀✨\n\nهل حلمت يوماً بإنشاء تطبيقات تبهر العالم؟ 🎨\n\nدوراتنا الإبداعية تجعل البرمجة فناً!\n\n🎭 ما ستتعلمه:\n• تطوير الألعاب التفاعلية\n• التصميم الرقمي المتقدم\n• الرسوم المتحركة البرمجية\n• تجارب المستخدم الفريدة\n\n🌟 مشاريعك ستشمل:\n• ألعاب إبداعية\n• تطبيقات فنية\n• مواقع تفاعلية\n• تجارب رقمية مميزة\n\nانضم إلى مجتمع المبدعين وابدأ إنشاء عالمك الرقمي! 💫🎨",
      },
    },
    article: {
      friendly: {
        short: "دليلك لتعلم البرمجة في 2024! اكتشف أفضل الطرق والنصائح.",
        medium: "كيف تصبح مبرمجاً ناجحاً؟ 🤔\n\nفي هذا المقال، سنستعرض أهم الخطوات لتعلم البرمجة من الصفر.\n\nمن اختيار اللغة المناسبة إلى بناء مشاريعك الأولى، كل شيء موجود هنا!\n\nاقرأ الآن وابدأ رحلتك!",
        long: "رحلة البرمجة: من المبتدئ إلى المحترف 🎯\n\nمرحباً بكم في دليلنا الشامل لتعلم البرمجة! في عالم يعتمد على التكنولوجيا، أصبحت البرمجة مهارة أساسية.\n\n📚 ما سنغطيه:\n• أساسيات البرمجة\n• اختيار لغة البرمجة المناسبة\n• بناء مشاريع عملية\n• نصائح للنجاح\n\n🔥 لماذا تتعلم البرمجة؟\n• فرص عمل كثيرة\n• رواتب مجزية\n• إمكانية العمل الحر\n• الإبداع والابتكار\n\n🚀 خطوات البداية:\n1. اختر لغة سهلة مثل Python\n2. تعلم الأساسيات\n3. ابدأ بمشاريع صغيرة\n4. انضم إلى مجتمعات البرمجة\n\nتذكر: البرمجة تحتاج إلى صبر وممارسة مستمرة. لا تستسلم!\n\nشاركنا تجربتك في التعليقات! 💬",
      },
      formal: {
        short: "مقدمة في تعلم البرمجة والتطوير الرقمي.",
        medium: "في هذا المقال، نستعرض أهمية تعلم البرمجة في العصر الحديث.\n\nسنغطي المفاهيم الأساسية والتطبيقات العملية.",
        long: "تحليل شامل لصناعة البرمجة والتطوير الرقمي\n\nفي ظل التطور التكنولوجي السريع، أصبحت البرمجة ركيزة أساسية في مختلف المجالات.\n\nيشمل هذا المقال:\n\n• تاريخ تطور البرمجة\n• اللغات البرمجية الرئيسية\n• التطبيقات في مختلف الصناعات\n• مستقبل المهنة\n\nنخلص إلى أن البرمجة مهارة حيوية للمستقبل.",
      },
      technical: {
        short: "نظرة على تقنيات البرمجة الحديثة: JS, Python, AI.",
        medium: "Technical Overview:\n\nProgramming Paradigms:\n• Object-Oriented\n• Functional\n• Procedural\n\nKey Technologies:\n• Web: HTML/CSS/JS\n• Backend: Node.js/Python\n• Mobile: React Native\n\nBest Practices & Patterns.",
        long: "Comprehensive Technical Analysis of Modern Programming\n\nAbstract:\nThis article examines current trends in software development.\n\nMethodology:\n• Literature review\n• Case studies\n• Industry analysis\n\nKey Findings:\n\n1. Rise of JavaScript ecosystems\n2. Python dominance in data science\n3. Cloud-native development\n4. DevOps integration\n\nTechnologies Covered:\n\nFrontend:\n- React/Vue/Angular\n- TypeScript\n- CSS-in-JS\n\nBackend:\n- Microservices\n- Serverless\n- GraphQL\n\nTools:\n- Docker/Kubernetes\n- CI/CD pipelines\n- Monitoring solutions\n\nConclusion:\nThe field continues to evolve rapidly, requiring continuous learning.",
      },
      creative: {
        short: "البرمجة كفن: كيف يخلق المبرمجون عوالم رقمية! 🎨✨",
        medium: "تخيل لو كانت البرمجة لوحة رسم رقمية! 🎨\n\nفي هذا المقال، نستكشف كيف يحول المبرمجون الأفكار إلى واقع.\n\nمن الألعاب إلى التطبيقات، كل شيء يبدأ بسطر كود!\n\nاقرأ واكتشف السحر! ✨",
        long: "فن البرمجة: عندما يلتقي الكود بالإبداع 🎨💻\n\nمرحباً بكم في عالم حيث يصبح الكود فناً! في هذا المقال، سنستكشف كيف يخلق المبرمجون عوالم رقمية مذهلة.\n\n🌟 البرمجة ليست مجرد مهنة - إنها شكل من أشكال التعبير الإبداعي!\n\n🎭 قصص إبداعية:\n• مطور ألعاب يخلق عوالم خيالية\n• مصمم واجهات يرسم تجارب مستخدم\n• مهندس برمجيات يبني مدن رقمية\n\n🚀 كيف تبدأ رحلتك الإبداعية:\n1. تعلم الأساسيات بلغة سهلة\n2. جرب مشاريع إبداعية\n3. انضم إلى مجتمعات المبدعين\n4. شارك أعمالك مع الآخرين\n\n💡 نصائح للمبدعين:\n• لا تخف من التجربة\n• تعلم من الأخطاء\n• ابحث عن الإلهام في كل مكان\n• شارك مع مجتمعك\n\nتذكر: كل مبرمج كان يوماً مبتدئاً، لكن الإبداع يأتي مع الممارسة!\n\nما هو مشروعك الإبداعي التالي؟ شاركنا في التعليقات! 🎨✨",
      },
    },
  };

  const generateContent = () => {
    if (!topic.trim()) return;

    setIsGenerating(true);
    setGeneratedContent(null);

    setTimeout(() => {
      const content = mockContent[contentType]?.[style]?.[length] || 'محتوى غير متوفر لهذا النوع من الأسلوب والطول.';
      const newContent: GeneratedContent = {
        id: Date.now().toString(),
        type: contentType,
        topic,
        keywords: keywords.split(',').map(k => k.trim()).filter(k => k),
        style,
        length,
        content,
        timestamp: new Date(),
      };

      setGeneratedContent(newContent);
      setEditedContent(content);
      setIsGenerating(false);
    }, 2000);
  };

  const saveToLibrary = () => {
    if (generatedContent) {
      const contentToSave = isEditing ? { ...generatedContent, content: editedContent } : generatedContent;
      setLibrary(prev => [contentToSave, ...prev]);
      setGeneratedContent(null);
      setIsEditing(false);
    }
  };

  const copyToClipboard = async () => {
    const content = isEditing ? editedContent : generatedContent?.content || '';
    try {
      await navigator.clipboard.writeText(content);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const exportContent = () => {
    const content = isEditing ? editedContent : generatedContent?.content || '';
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `generated-content-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          مولد المحتوى التسويقي
        </h1>
        <p className="text-lg text-neutral max-w-3xl mx-auto">
          أنشئ محتوى تسويقي احترافي باستخدام الذكاء الاصطناعي
        </p>
      </motion.div>

      {/* Content Generation Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
      >
        <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
          إعدادات التوليد
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Content Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              نوع المحتوى
            </label>
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {contentTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* Style */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              الأسلوب
            </label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {styles.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Length */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              الطول
            </label>
            <select
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {lengths.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>

          {/* Topic */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              الموضوع
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="أدخل موضوع المحتوى"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Keywords */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            الكلمات المفتاحية (مفصولة بفواصل)
          </label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="برمجة, تعلم, تطوير"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={generateContent}
          disabled={!topic.trim() || isGenerating}
          className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
            !topic.trim() || isGenerating
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg transform hover:scale-105'
          }`}
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              جاري التوليد...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              توليد المحتوى
            </>
          )}
        </button>
      </motion.div>

      {/* Generated Content */}
      <AnimatePresence>
        {generatedContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                المحتوى المولد
              </h3>
              <div className="flex space-x-2 space-x-reverse">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  <Edit className="w-3 h-3 inline mr-1" />
                  {isEditing ? 'إلغاء التعديل' : 'تعديل'}
                </button>
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1 text-sm bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-md hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                >
                  <Copy className="w-3 h-3 inline mr-1" />
                  نسخ
                </button>
                <button
                  onClick={exportContent}
                  className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-md hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                >
                  <Download className="w-3 h-3 inline mr-1" />
                  تصدير
                </button>
                <button
                  onClick={saveToLibrary}
                  className="px-3 py-1 text-sm bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 rounded-md hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors"
                >
                  <Save className="w-3 h-3 inline mr-1" />
                  حفظ
                </button>
              </div>
            </div>

            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              <span>النوع: {contentTypes.find(t => t.id === generatedContent.type)?.name}</span>
              <span className="mx-2">•</span>
              <span>الأسلوب: {styles.find(s => s.id === generatedContent.style)?.name}</span>
              <span className="mx-2">•</span>
              <span>الطول: {lengths.find(l => l.id === generatedContent.length)?.name}</span>
            </div>

            {isEditing ? (
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                placeholder="عدل المحتوى هنا..."
              />
            ) : (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 whitespace-pre-wrap text-gray-900 dark:text-white min-h-32">
                {generatedContent.content}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Library */}
      {library.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            مكتبة المحتوى المحفوظ
          </h3>

          <div className="space-y-4">
            {library.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {item.topic}
                    </h4>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {contentTypes.find(t => t.id === item.type)?.name} • {styles.find(s => s.id === item.style)?.name} • {lengths.find(l => l.id === item.length)?.name}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {item.timestamp.toLocaleDateString('ar-SA')}
                  </div>
                </div>

                <div className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                  {item.content}
                </div>

                <div className="flex justify-end mt-3 space-x-2 space-x-reverse">
                  <button
                    onClick={() => {
                      const content = item.content;
                      navigator.clipboard.writeText(content);
                    }}
                    className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    نسخ
                  </button>
                  <button
                    onClick={() => {
                      const blob = new Blob([item.content], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `content-${item.id}.txt`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    }}
                    className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                  >
                    تصدير
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg p-6 text-white"
        >
          <FileText className="w-8 h-8 mb-2 opacity-80" />
          <div className="text-2xl font-bold">{library.length}</div>
          <div className="text-sm opacity-80">محتوى محفوظ</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white"
        >
          <Sparkles className="w-8 h-8 mb-2 opacity-80" />
          <div className="text-2xl font-bold">{generatedContent ? 1 : 0}</div>
          <div className="text-sm opacity-80">محتوى مولد</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white"
        >
          <CheckCircle className="w-8 h-8 mb-2 opacity-80" />
          <div className="text-2xl font-bold">4</div>
          <div className="text-sm opacity-80">أنواع المحتوى</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg p-6 text-white"
        >
          <BookOpen className="w-8 h-8 mb-2 opacity-80" />
          <div className="text-2xl font-bold">48</div>
          <div className="text-sm opacity-80">قالب جاهز</div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContentGeneratorComponent;