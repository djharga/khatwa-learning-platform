const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();
app.use(cors());
app.use(express.json());

let browser = null;
let page = null;

// تهيئة المتصفح مع Puter.js
async function initPuter() {
  if (browser) return page;
  
  try {
    browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    page = await browser.newPage();
    
    // تحميل Puter.js
    await page.goto('data:text/html,<html><head><script src="https://js.puter.com/v2/"></script></head><body><h1>Puter Ready</h1></body></html>');
    
    // انتظار تحميل المكتبة
    await page.waitForFunction(() => typeof puter !== 'undefined', { timeout: 10000 });
    
    console.log('✅ Puter.js initialized successfully');
    return page;
  } catch (error) {
    console.error('❌ Failed to initialize Puter.js:', error);
    throw error;
  }
}

// API endpoint متوافق مع OpenAI
app.post('/v1/chat/completions', async (req, res) => {
  try {
    console.log('📨 Received request for chat completion');
    
    const page = await initPuter();
    const { messages, model = 'gpt-4', temperature = 0.7 } = req.body;
    
    // أخذ آخر رسالة من المستخدم
    const userMessage = messages[messages.length - 1];
    const prompt = userMessage.content;
    
    console.log('💬 Processing prompt:', prompt.substring(0, 100) + '...');
    
    // استدعاء Puter.js AI
    const aiResponse = await page.evaluate(async (prompt) => {
      try {
        const response = await puter.ai.chat(prompt);
        return { success: true, content: response };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }, prompt);
    
    if (!aiResponse.success) {
      throw new Error(aiResponse.error);
    }
    
    // تنسيق الرد بصيغة OpenAI
    const response = {
      id: 'chatcmpl-puter-' + Date.now(),
      object: 'chat.completion',
      created: Math.floor(Date.now() / 1000),
      model: model,
      choices: [{
        index: 0,
        message: {
          role: 'assistant',
          content: aiResponse.content
        },
        finish_reason: 'stop'
      }],
      usage: {
        prompt_tokens: Math.ceil(prompt.length / 4),
        completion_tokens: Math.ceil(aiResponse.content.length / 4),
        total_tokens: Math.ceil((prompt.length + aiResponse.content.length) / 4)
      }
    };
    
    console.log('✅ Response sent successfully');
    res.json(response);
    
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({
      error: {
        message: error.message,
        type: 'puter_api_error',
        code: 'internal_error'
      }
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Puter.js API Server is running',
    timestamp: new Date().toISOString()
  });
});

// إغلاق المتصفح عند إغلاق السيرفر
process.on('SIGTERM', async () => {
  if (browser) await browser.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  if (browser) await browser.close();
  process.exit(0);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Puter.js API Server running on http://localhost:${PORT}`);
  console.log('📋 Health check: http://localhost:3000/health');
  console.log('🔗 API endpoint: http://localhost:3000/v1/chat/completions');
  console.log('\n⏳ Initializing Puter.js...');
  
  // تهيئة مبكرة للمتصفح
  initPuter().catch(console.error);
});
