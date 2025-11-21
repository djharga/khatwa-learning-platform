/**
 * خوارزمية رد ذكية للمساعد
 * تحليل السياق وفهم نية المستخدم لتوليد ردود ذكية ومناسبة
 */

export type IntentType = 
  | 'greeting'           // تحية
  | 'question'           // سؤال
  | 'request_help'       // طلب مساعدة
  | 'course_inquiry'    // استفسار عن دورة
  | 'training_plan'      // خطة تدريبية
  | 'technical_question' // سؤال تقني
  | 'feedback'           // ملاحظات
  | 'complaint'          // شكوى
  | 'pricing'            // أسعار
  | 'registration'       // تسجيل
  | 'general'            // عام
  | 'unknown';           // غير معروف

export interface MessageContext {
  intent: IntentType;
  keywords: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  urgency: 'low' | 'medium' | 'high';
  topic?: string;
}

export interface ConversationHistory {
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }>;
  context: MessageContext[];
}

/**
 * تحليل نية المستخدم من الرسالة
 */
export function analyzeIntent(message: string): MessageContext {
  const lowerMessage = message.toLowerCase();
  const keywords: string[] = [];
  let intent: IntentType = 'unknown';
  let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral';
  let urgency: 'low' | 'medium' | 'high' = 'low';
  let topic: string | undefined;

  // كلمات التحية
  const greetingWords = ['مرحبا', 'أهلا', 'سلام', 'السلام', 'صباح', 'مساء', 'هاي', 'hello', 'hi'];
  if (greetingWords.some(word => lowerMessage.includes(word))) {
    intent = 'greeting';
    sentiment = 'positive';
  }

  // كلمات الاستفسار عن الدورات
  const courseWords = ['دورة', 'كورس', 'تدريب', 'تعليم', 'محتوى', 'درس', 'برنامج', 'course', 'training'];
  if (courseWords.some(word => lowerMessage.includes(word))) {
    intent = 'course_inquiry';
    topic = 'courses';
    keywords.push(...courseWords.filter(word => lowerMessage.includes(word)));
  }

  // كلمات طلب خطة تدريبية
  const trainingPlanWords = ['خطة', 'برنامج', 'مسار', 'تأهيل', 'تطوير', 'مهارات', 'plan', 'program'];
  if (trainingPlanWords.some(word => lowerMessage.includes(word))) {
    intent = 'training_plan';
    topic = 'training';
    keywords.push(...trainingPlanWords.filter(word => lowerMessage.includes(word)));
  }

  // كلمات الأسئلة التقنية
  const technicalWords = ['كيف', 'ماذا', 'لماذا', 'متى', 'أين', 'ما هو', 'ما هي', 'شرح', 'how', 'what', 'why', 'explain'];
  if (technicalWords.some(word => lowerMessage.includes(word))) {
    intent = 'technical_question';
    keywords.push(...technicalWords.filter(word => lowerMessage.includes(word)));
  }

  // كلمات طلب المساعدة
  const helpWords = ['مساعدة', 'مساعدة', 'دعم', 'مساعدة', 'help', 'support', 'assist'];
  if (helpWords.some(word => lowerMessage.includes(word))) {
    intent = 'request_help';
    urgency = 'medium';
  }

  // كلمات الأسعار
  const pricingWords = ['سعر', 'تكلفة', 'ثمن', 'دفع', 'اشتراك', 'باقة', 'price', 'cost', 'payment', 'subscription'];
  if (pricingWords.some(word => lowerMessage.includes(word))) {
    intent = 'pricing';
    topic = 'pricing';
    keywords.push(...pricingWords.filter(word => lowerMessage.includes(word)));
  }

  // كلمات التسجيل
  const registrationWords = ['تسجيل', 'انضمام', 'اشتراك', 'حساب', 'register', 'signup', 'join', 'account'];
  if (registrationWords.some(word => lowerMessage.includes(word))) {
    intent = 'registration';
    topic = 'registration';
    keywords.push(...registrationWords.filter(word => lowerMessage.includes(word)));
  }

  // كلمات السلبية
  const negativeWords = ['مشكلة', 'خطأ', 'لا يعمل', 'فشل', 'صعب', 'مستحيل', 'problem', 'error', 'failed', 'difficult'];
  if (negativeWords.some(word => lowerMessage.includes(word))) {
    sentiment = 'negative';
    urgency = 'high';
  }

  // كلمات الإيجابية
  const positiveWords = ['شكرا', 'ممتاز', 'رائع', 'جميل', 'مفيد', 'thanks', 'thank', 'excellent', 'great', 'good'];
  if (positiveWords.some(word => lowerMessage.includes(word))) {
    sentiment = 'positive';
  }

  // كلمات الاستعجال
  const urgencyWords = ['عاجل', 'فورا', 'الآن', 'سريع', 'urgent', 'immediately', 'now', 'quick'];
  if (urgencyWords.some(word => lowerMessage.includes(word))) {
    urgency = 'high';
  }

  // إذا لم يتم تحديد نية واضحة، افترض سؤال عام
  if (intent === 'unknown' && lowerMessage.length > 5) {
    intent = 'question';
  }

  return {
    intent,
    keywords: [...new Set(keywords)],
    sentiment,
    urgency,
    topic,
  };
}

/**
 * توليد رد ذكي بناءً على السياق
 */
export function generateIntelligentReply(
  userMessage: string,
  context: MessageContext,
  conversationHistory?: ConversationHistory
): string {
  const { intent, sentiment, urgency, topic, keywords } = context;

  // استخدام السياق من المحادثة السابقة
  const recentTopics = conversationHistory?.context
    .slice(-3)
    .map(ctx => ctx.topic)
    .filter(Boolean) || [];

  // ردود حسب النية
  switch (intent) {
    case 'greeting':
      return sentiment === 'positive'
        ? 'أهلاً وسهلاً بك! أنا مساعد خطى الذكي، جاهز لمساعدتك في أي استفسار حول الدورات التدريبية، الخطط التعليمية، أو أي موضوع آخر. كيف يمكنني مساعدتك اليوم؟'
        : 'مرحباً بك! كيف يمكنني مساعدتك؟';

    case 'course_inquiry': {
      const courseReplies = [
        'لدينا مجموعة متنوعة من الدورات المتخصصة في المراجعة الداخلية والمحاسبة المالية. يمكنني مساعدتك في اختيار الدورة المناسبة لك بناءً على مستواك وخبرتك. ما هو المجال الذي تهتم به؟',
        'نوفر دورات شاملة تغطي جميع جوانب المراجعة الداخلية والمحاسبة. هل تبحث عن دورة للمبتدئين أم المتقدمين؟ وما هو الموضوع المحدد الذي تريد تعلمه؟',
        'يمكنني مساعدتك في العثور على الدورة المثالية. لدينا دورات في: المراجعة الداخلية، المعايير المحاسبية، التحليل المالي، وإدارة المخاطر. ما الذي يثير اهتمامك؟',
      ];
      return courseReplies[Math.floor(Math.random() * courseReplies.length)];
    }

    case 'training_plan': {
      const trainingReplies = [
        'سأقوم بإعداد خطة تدريبية مخصصة لك! يمكنني تصميم برنامج يتضمن: تحديد الأهداف، اختيار الدورات المناسبة، وضع جدول زمني، ومتابعة التقدم. ما هي أهدافك التدريبية؟',
        'لإعداد خطة تدريبية فعالة، أحتاج معرفة: مستواك الحالي، المجال الذي تريد تطويره، المدة المتاحة، والأهداف المرجوة. هل يمكنك مشاركة هذه التفاصيل؟',
        'يمكنني بناء خطة تدريبية شاملة تتضمن: مراجعة المهارات الحالية، تحديد الفجوات، اختيار المسار المناسب، ووضع خطة زمنية. ما هو المجال الذي تريد التركيز عليه؟',
      ];
      return trainingReplies[Math.floor(Math.random() * trainingReplies.length)];
    }

    case 'technical_question': {
      const technicalReplies = [
        'سأجيب على سؤالك بشكل مفصل. يمكنني تقديم شرح شامل مع أمثلة عملية. هل تريد أيضاً روابط لمواد إضافية أو دروس ذات صلة؟',
        'دعني أشرح لك هذا الموضوع بالتفصيل. يمكنني أيضاً توجيهك إلى الدروس والموارد المناسبة لفهم أعمق. ما هو الجانب المحدد الذي تريد التركيز عليه؟',
        'سأقدم لك إجابة شاملة مع أمثلة عملية. إذا كان السؤال معقداً، يمكنني تقسيمه إلى أجزاء أصغر لتسهيل الفهم. هل هذا مناسب لك؟',
      ];
      return technicalReplies[Math.floor(Math.random() * technicalReplies.length)];
    }

    case 'request_help': {
      const helpReplies = urgency === 'high'
        ? [
            'أفهم أنك تحتاج مساعدة عاجلة. سأبذل قصارى جهدي لمساعدتك فوراً. ما هي المشكلة التي تواجهها بالضبط؟',
            'أنا هنا لمساعدتك! يبدو أنك تحتاج دعم فوري. أخبرني بالتفاصيل وسأجد الحل المناسب لك.',
          ]
        : [
            'بكل سرور! أنا هنا لمساعدتك. ما هي المساعدة التي تحتاجها؟ يمكنني مساعدتك في: اختيار الدورات، إعداد الخطط، الإجابة على الأسئلة، وأكثر.',
            'سأساعدك بكل سرور. أخبرني بما تحتاجه وسأقدم لك الحلول والاقتراحات المناسبة.',
          ];
      return helpReplies[Math.floor(Math.random() * helpReplies.length)];
    }

    case 'pricing': {
      const pricingReplies = [
        'لدينا باقات متنوعة تناسب جميع الاحتياجات. نوفر: باقة مجانية للبدء، باقات اشتراك شهرية، وباقات سنوية بخصومات. ما هو نوع الباقة التي تهمك؟',
        'يمكنني مساعدتك في اختيار الباقة المناسبة. لدينا خيارات متعددة تبدأ من مجانية وتصل إلى باقات شاملة. ما هو ميزانيتك والاحتياجات التي تريد تغطيتها؟',
        'نوفر خطط أسعار مرنة. يمكنك البدء مجاناً ثم الترقية حسب احتياجاتك. هل تريد معرفة تفاصيل باقة معينة أم مقارنة بين الباقات؟',
      ];
      return pricingReplies[Math.floor(Math.random() * pricingReplies.length)];
    }

    case 'registration': {
      const registrationReplies = [
        'التسجيل سهل جداً! يمكنك إنشاء حساب مجاني في دقائق. سأرشدك خلال العملية خطوة بخطوة. هل تريد البدء الآن؟',
        'للتسجيل، يمكنك زيارة صفحة التسجيل أو الضغط على زر "إنشاء حساب". العملية بسيطة وتستغرق دقائق فقط. هل تحتاج مساعدة في أي خطوة؟',
        'يمكنك التسجيل مجاناً والبدء فوراً. بعد التسجيل، ستحصل على وصول لمواد مجانية ويمكنك الترقية لاحقاً. هل تريد رابط التسجيل المباشر؟',
      ];
      return registrationReplies[Math.floor(Math.random() * registrationReplies.length)];
    }

    case 'question': {
      const questionReplies = [
        'سأجيب على سؤالك بشكل شامل. إذا كان السؤال معقداً، سأقسمه إلى أجزاء لتسهيل الفهم. هل تريد أيضاً موارد إضافية حول هذا الموضوع؟',
        'دعني أقدم لك إجابة مفصلة. يمكنني أيضاً توجيهك إلى الدروس والمواد ذات الصلة. ما هو الجانب الذي تريد التركيز عليه؟',
        'سأجيب على سؤالك مع أمثلة عملية إن أمكن. إذا احتجت مزيداً من التفاصيل، أخبرني وسأوسع الشرح.',
      ];
      return questionReplies[Math.floor(Math.random() * questionReplies.length)];
    }

    case 'feedback':
      return sentiment === 'positive'
        ? 'شكراً لك على ملاحظاتك الإيجابية! يسعدني أن تجد المساعد مفيداً. هل هناك شيء آخر يمكنني تحسينه أو مساعدتك فيه؟'
        : 'شكراً لك على ملاحظاتك. أعتذر عن أي إزعاج. سأعمل على تحسين تجربتك. هل يمكنك إخباري بالتفاصيل حتى أتمكن من المساعدة بشكل أفضل؟';

    case 'complaint':
      return 'أعتذر عن المشكلة التي واجهتها. أريد أن أساعدك في حل هذا الأمر. هل يمكنك إخباري بالتفاصيل حتى أتمكن من تقديم الحل المناسب؟';

    default:
      // رد عام ذكي بناءً على الكلمات المفتاحية
      if (keywords.length > 0) {
        return `أفهم أنك تسأل عن ${keywords.join(' و')}. دعني أساعدك في هذا الموضوع. هل يمكنك توضيح سؤالك أكثر حتى أقدم لك الإجابة الأكثر دقة؟`;
      }
      return 'شكراً لك على رسالتك. يمكنني مساعدتك في: اختيار الدورات، إعداد الخطط التدريبية، الإجابة على الأسئلة التقنية، والمساعدة في التسجيل. ما الذي تريد المساعدة فيه تحديداً؟';
  }
}

/**
 * توليد اقتراحات ذكية بناءً على السياق
 */
export function generateSmartSuggestions(
  context: MessageContext,
  conversationHistory?: ConversationHistory
): string[] {
  const { intent, topic } = context;
  const suggestions: string[] = [];

  switch (intent) {
    case 'course_inquiry':
      suggestions.push(
        'عرض جميع الدورات المتاحة',
        'دورات للمبتدئين',
        'دورات متقدمة في المراجعة الداخلية',
        'مقارنة بين الدورات'
      );
      break;

    case 'training_plan':
      suggestions.push(
        'إنشاء خطة تدريبية مخصصة',
        'عرض المسارات التعليمية',
        'تقييم المهارات الحالية',
        'وضع جدول زمني للتدريب'
      );
      break;

    case 'pricing':
      suggestions.push(
        'عرض جميع الباقات',
        'مقارنة الأسعار',
        'الباقة المجانية',
        'خصومات الاشتراكات السنوية'
      );
      break;

    case 'technical_question':
      suggestions.push(
        'شرح مفصل',
        'أمثلة عملية',
        'موارد إضافية',
        'دروس ذات صلة'
      );
      break;

    default:
      suggestions.push(
        'استكشف الدورات',
        'ابدأ خطة تدريبية',
        'اطلب المساعدة',
        'تعرف على الأسعار'
      );
  }

  return suggestions.slice(0, 4);
}

/**
 * تحسين الرد بناءً على تاريخ المحادثة
 */
export function enhanceReplyWithContext(
  reply: string,
  context: MessageContext,
  conversationHistory?: ConversationHistory
): string {
  if (!conversationHistory || conversationHistory.messages.length < 2) {
    return reply;
  }

  // إذا كان المستخدم يسأل عن نفس الموضوع
  const recentTopics = conversationHistory.context
    .slice(-3)
    .map(ctx => ctx.topic)
    .filter(Boolean);

  if (recentTopics.length > 0 && context.topic && recentTopics.includes(context.topic)) {
    return `${reply} (لاحظت أنك مهتم بموضوع ${context.topic} - هل تريد المزيد من التفاصيل حول هذا الموضوع؟)`;
  }

  return reply;
}

