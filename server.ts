import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const PORT = 3000;

const app = express();
app.use(express.json());

// Initialize GoogleGenAI
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// In-memory store for active direct sponsor campaigns
interface SponsorCampaign {
  id: string;
  brandName: string;
  contactEmail: string;
  headline: string;
  description: string;
  ctaText: string;
  targetCategory: string; // 'all' | 'porn' | 'smoking' | 'alcohol' | 'sugar' | 'gaming' | 'wellness'
  bannerType: 'header' | 'in_feed' | 'urge_screen';
  monthlyBudgetINR: number;
  clickUrl: string;
  createdAt: string;
  status: 'active' | 'pending';
}

const directSponsors: SponsorCampaign[] = [
  {
    id: 'spons-1',
    brandName: 'PuraVita Cold Brew & Botanicals',
    contactEmail: 'partner@puravita.co',
    headline: 'Zero-Sugar Dopamine Refresh Blend',
    description: 'Replace energy drink crashes with organic adaptogenic l-theanine & cold brew tea.',
    ctaText: 'Claim 20% Off',
    targetCategory: 'sugar',
    bannerType: 'in_feed',
    monthlyBudgetINR: 4500,
    clickUrl: 'https://example.com/puravita-recovery?ref=aegis',
    createdAt: new Date().toISOString(),
    status: 'active',
  },
  {
    id: 'spons-2',
    brandName: 'BreathePure Aromatherapeutics',
    contactEmail: 'ads@breathepure.in',
    headline: 'Quit Nicotine with Sensory Air Diffusers',
    description: 'Non-electric oral fixation inhaler with pure peppermint and black pepper essential oils.',
    ctaText: 'Order Recovery Kit',
    targetCategory: 'smoking',
    bannerType: 'urge_screen',
    monthlyBudgetINR: 6000,
    clickUrl: 'https://example.com/breathepure?ref=aegis',
    createdAt: new Date().toISOString(),
    status: 'active',
  },
  {
    id: 'spons-3',
    brandName: 'MindArmor Cognitive Journal',
    contactEmail: 'sponsor@mindarmor.app',
    headline: '90-Day Dopamine Detox Planner',
    description: 'Clinical guided journaling for habit extinction, impulse delay, and executive control.',
    ctaText: 'View Journal Preview',
    targetCategory: 'all',
    bannerType: 'header',
    monthlyBudgetINR: 8000,
    clickUrl: 'https://example.com/mindarmor?ref=aegis',
    createdAt: new Date().toISOString(),
    status: 'active',
  },
];

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    aiConfigured: !!ai,
    activeSponsorsCount: directSponsors.length,
  });
});

// AI Craving Counselor Endpoint (Gemini 3.8 Flash)
app.post('/api/ai/counselor', async (req, res) => {
  try {
    const { prompt, habitName, cravingIntensity, history = [] } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!ai) {
      // High-quality compassionate deterministic fallback if API key is not configured
      return res.json({
        response: `I hear you loud and clear. Craving intensity ${cravingIntensity || 7}/10 for ${habitName || 'this impulse'} is tough, but remember: cravings are like ocean waves—they peak at 3-5 minutes and then subside. \n\nRight now, do this: drop and do 15 rapid push-ups or take 5 long 4-7-8 deep breaths (inhale 4s, hold 7s, exhale 8s). What physical action can you take for the next 120 seconds to break the trance?`,
        source: 'fallback',
      });
    }

    const systemInstruction = `You are the Aegis Recovery Companion, a compassionate, empathetic, and scientifically grounded Cognitive Behavioral Therapy (CBT) addiction de-escalation coach.
The user is reaching out for help with an addiction or compulsive impulse (${habitName || 'unspecified habit'}).
Current reported craving intensity: ${cravingIntensity || 'moderate'}/10.

Key rules:
1. Validate their struggle immediately without judgment or moral lecturing.
2. Ground them in neurobiology: explain that urges are temporary neurochemical spikes (cortisol/dopamine dips) lasting ~3 to 7 minutes.
3. Provide one concrete, immediate somatic/physical action (e.g. 15 push-ups, cold water splash to face, 4-7-8 breathing, drinking 500ml ice water).
4. Encourage urge surfing (riding the urge like a wave without acting on it).
5. Keep your tone firm, warm, empowering, and actionable. Max 2-3 short, focused paragraphs.`;

    const chatContents = [
      ...history.map((msg: { sender: string; text: string }) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      })),
      {
        role: 'user',
        parts: [{ text: `Current trigger/thought: ${prompt}. Habit: ${habitName}. Craving level: ${cravingIntensity}/10.` }],
      },
    ];

    const result = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: chatContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const responseText = result.text || 'Take a deep breath. You are stronger than this temporary impulse.';
    return res.json({
      response: responseText,
      source: 'gemini-3.8-flash',
    });
  } catch (error: any) {
    console.error('Error calling Gemini:', error);
    return res.status(500).json({
      error: 'Failed to generate AI counsel',
      fallbackResponse: 'The urge is temporary. Step away from your screen, drink a cold glass of water, and do 10 deep belly breaths. You have survived 100% of your hardest days so far.',
    });
  }
});

// Emergency Guardian SMS / Notification Dispatch Simulator
// AI Relapse Pattern Predictor & Risk Forecaster
app.post('/api/ai/predict-risk', async (req, res) => {
  try {
    const { habitName = 'Smoking', streakDays = 7, timeOfDay = 'Night', mood = 'Stressed', currentStress = 8 } = req.body;

    if (!ai) {
      return res.json({
        riskScore: Math.min(Math.round(currentStress * 9.2), 94),
        riskLevel: currentStress >= 7 ? 'HIGH' : 'MODERATE',
        vulnerabilitySummary: `At ${timeOfDay} with a stress level of ${currentStress}/10, your prefrontal dopamine reserves are depleted, increasing impulse susceptibility.`,
        immediateShieldProtocol: [
          'Put phone in airplane mode or another room for 30 minutes',
          'Drink 400ml cold water with a pinch of salt to balance electrolytes',
          'Do 3 rounds of physiological sigh (two quick inhales, long slow exhale)'
        ],
        neuroInsight: 'Dopamine D2 receptors are currently upregulated. Discomfort is physical proof of synaptic pruning in action.',
      });
    }

    const prompt = `Analyze relapse vulnerability for a user in recovery:
Habit: ${habitName}
Current Clean Streak: ${streakDays} days
Time of Day: ${timeOfDay}
Reported Mood: ${mood}
Stress Level: ${currentStress}/10 (10 being extreme)

Respond in strictly valid JSON format with keys:
"riskScore": integer 0 to 100,
"riskLevel": string ("LOW", "MODERATE", "HIGH", "CRITICAL"),
"vulnerabilitySummary": string (1-2 sentences on why this moment is risky based on circadian rhythm and ego depletion),
"immediateShieldProtocol": array of 3 specific, physical actions to safeguard sobriety in the next 15 minutes,
"neuroInsight": string (1 sentence explaining the neuroplastic rewiring occurring right now).`;

    const result = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.4,
      },
    });

    const parsed = JSON.parse(result.text || '{}');
    return res.json(parsed);
  } catch (err: any) {
    console.error('AI Predict Risk error:', err);
    return res.json({
      riskScore: 68,
      riskLevel: 'MODERATE',
      vulnerabilitySummary: 'Late hours and elevated stress impair impulse inhibition.',
      immediateShieldProtocol: [
        'Move to a well-lit physical space away from screens',
        'Wash your face with cold water for 20 seconds',
        'Text your accountability partner a 1-word status check'
      ],
      neuroInsight: 'Craving intensity peaks at 5 minutes; surf the wave without reacting.',
    });
  }
});

// AI CBT Rationalization Buster & Cognitive Restructuring
app.post('/api/ai/cbt-reframe', async (req, res) => {
  try {
    const { excuseText, habitName = 'General Impulse' } = req.body;

    if (!excuseText) {
      return res.status(400).json({ error: 'Excuse text is required' });
    }

    if (!ai) {
      return res.json({
        cognitiveDistortion: 'Minimization & Emotional Reasoning',
        rationalAnalysis: 'Your brain is trying to justify short-term dopamine relief by discounting the regret and brain fog that will follow 5 minutes later.',
        mentalArmorResponse: `I acknowledge the urge, but I refuse to exchange 10 minutes of numb pleasure for resetting my clean streak. One time is never just one time.`,
        alternativeAction: 'Do 20 explosive bodyweight squats right now to metabolize the restless adrenaline.',
      });
    }

    const prompt = `The user is having a craving rationalization for ${habitName}:
User excuse: "${excuseText}"

Act as a clinical CBT psychologist specializing in addiction medicine. Expose this rationalization.
Respond in valid JSON with keys:
"cognitiveDistortion": string (name of distortion e.g. "Permission Giving / Minimization / All-or-Nothing"),
"rationalAnalysis": string (2 sentences dissecting why this thought is neurobiologically deceptive),
"mentalArmorResponse": string (1 powerful, memorable 1st-person mantra to speak aloud to instantly kill the excuse),
"alternativeAction": string (1 immediate physical somatic action to break the thought loop).`;

    const result = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.5,
      },
    });

    const parsed = JSON.parse(result.text || '{}');
    return res.json(parsed);
  } catch (err: any) {
    console.error('CBT Reframe error:', err);
    return res.json({
      cognitiveDistortion: 'Permission-Giving Thought',
      rationalAnalysis: 'Your subconscious mind is negotiating for quick dopamine. Giving in reinforces the craving pathway.',
      mentalArmorResponse: 'This is not what I want. This is merely a neurochemical craving spike that will die in 5 minutes.',
      alternativeAction: 'Drink a cold glass of water and perform 15 push-ups.',
    });
  }
});

// AI Context-Aware Somatic Urge-Killer Drill Generator
app.post('/api/ai/custom-drill', async (req, res) => {
  try {
    const { environment = 'desk', habitName = 'Smoking' } = req.body;

    if (!ai) {
      return res.json({
        title: environment === 'bed' ? '4-7-8 Isometric Body Tension Wave' : 'Office Desk Vagal Brake & Calf Pumps',
        durationSeconds: 90,
        steps: [
          'Clench your fists and flex abdominal core with maximum tension for 7 seconds',
          'Release completely with a slow, audible sigh',
          'Take 4 deep diaphragmatic breaths through your nose'
        ],
        somaticResetReason: 'Forces somatic blood flow away from the amygdala directly to large skeletal muscle groups, extinguishing impulse frenzy.',
      });
    }

    const prompt = `Generate a realistic 60-to-90 second urge-killer somatic intervention drill.
User is currently in this physical environment: "${environment}" (e.g. at an office desk, alone in bed, in a social party, in a car, or on the couch).
Trigger habit: ${habitName}.

Respond in valid JSON with keys:
"title": string (catchy, motivating protocol name),
"durationSeconds": number (60 to 120),
"steps": array of 3 concrete, step-by-step physical instructions suitable for that exact environment,
"somaticResetReason": string (1 sentence explaining the physiological vagus nerve or endorphin benefit).`;

    const result = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.6,
      },
    });

    const parsed = JSON.parse(result.text || '{}');
    return res.json(parsed);
  } catch (err: any) {
    console.error('Custom Drill error:', err);
    return res.json({
      title: 'Emergency 60-Second Vagus Brake',
      durationSeconds: 60,
      steps: [
        'Take a deep double-inhale through nose, followed by a long mouth exhale',
        'Press your palms together firmly in front of your chest for 10 seconds',
        'Splash cold water onto your eyes and temples'
      ],
      somaticResetReason: 'Stimulates the parasympathetic nervous system to decrease adrenaline and craving intensity.',
    });
  }
});

// AI Neurobiology Milestone & Dopamine Briefing
app.post('/api/ai/neuro-briefing', async (req, res) => {
  const { streakDays = 14, habitName = 'Pornography' } = req.body || {};
  try {

    if (!ai) {
      return res.json({
        stageTitle: `Day ${streakDays}: Prefrontal Cortex Neuroplasticity Re-wiring`,
        dopamineStatus: 'Receptor upregulation in progress (+22% baseline sensitivity)',
        receptorDensityGain: 'Dopamine D2 and delta-FosB levels returning to baseline homeostasis.',
        dailyPowerRule: 'Do not seek artificial dopamine spikes today. Let simple things feel rewarding again.',
      });
    }

    const prompt = `Explain the brain neurobiology of an individual who has reached Day ${streakDays} clean from ${habitName}.
Base it on neuroplasticity, dopamine receptor density, delta-FosB clearance, and prefrontal gray matter recovery.
Respond in valid JSON with keys:
"stageTitle": string (inspiring clinical stage title),
"dopamineStatus": string (concise status of dopamine receptors and baseline satisfaction),
"receptorDensityGain": string (scientific explanation of what brain changes occurred by day ${streakDays}),
"dailyPowerRule": string (one actionable behavioral rule for today to accelerate recovery).`;

    const result = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.5,
      },
    });

    const parsed = JSON.parse(result.text || '{}');
    return res.json(parsed);
  } catch (err: any) {
    console.error('Neuro Briefing error:', err);
    return res.json({
      stageTitle: `Day ${streakDays}: Dopamine Receptor Regeneration`,
      dopamineStatus: 'Natural reward baseline sensitivity returning to normal levels.',
      receptorDensityGain: 'Frontal lobe executive control is regaining dominance over impulse circuits.',
      dailyPowerRule: 'Embrace boredom as the sound of your brain healing.',
    });
  }
});
app.post('/api/guardian/notify', (req, res) => {
  const { guardianName, guardianPhone, triggerType, habitName, locationCoordinates, note } = req.body;

  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const alertId = 'SOS-' + Math.random().toString(36).substring(2, 9).toUpperCase();

  let messageBody = '';
  if (triggerType === 'geofence') {
    messageBody = `[AEGIS SOS ALERT] Hi ${guardianName || 'Guardian'}, user entered a designated High-Risk Danger Zone (${note || 'Risk Zone'}) at ${timestamp}. Acoustic Siren armed. Coordinates: ${locationCoordinates || 'Live GPS'}. Please call or check in!`;
  } else if (triggerType === 'vpn_tamper') {
    messageBody = `[AEGIS TAMPER ALERT] Hi ${guardianName || 'Guardian'}, an attempt to enable a bypass VPN or tamper with Aegis DNS shield was detected at ${timestamp}. Disarm siren engaged!`;
  } else if (triggerType === 'incognito_breach') {
    messageBody = `[AEGIS BROWSER ALERT] Hi ${guardianName || 'Guardian'}, incognito/private browsing mode was opened during an active recovery block at ${timestamp}. Immediate check-in urged!`;
  } else {
    messageBody = `[AEGIS CRAVING SOS] Hi ${guardianName || 'Guardian'}, user pressed the Emergency Panic Craving trigger for ${habitName || 'Habit'} at ${timestamp}. Please send encouragement or call!`;
  }

  return res.json({
    success: true,
    alertId,
    timestamp,
    recipient: guardianPhone || '+91 98765 43210',
    guardianName: guardianName || 'Designated Guardian',
    message: messageBody,
    status: 'Delivered via Cellular Gateway',
  });
});

// Direct Brand Sponsor Submission Endpoint
app.post('/api/sponsor/submit', (req, res) => {
  const { brandName, contactEmail, headline, description, ctaText, targetCategory, bannerType, monthlyBudgetINR, clickUrl } = req.body;

  if (!brandName || !headline || !clickUrl) {
    return res.status(400).json({ error: 'Missing required ad campaign fields' });
  }

  const newCampaign: SponsorCampaign = {
    id: 'spons-' + Date.now(),
    brandName,
    contactEmail: contactEmail || 'sponsor@brand.com',
    headline,
    description: description || 'Premium recovery product for conscious living.',
    ctaText: ctaText || 'Learn More',
    targetCategory: targetCategory || 'all',
    bannerType: bannerType || 'in_feed',
    monthlyBudgetINR: Number(monthlyBudgetINR) || 5000,
    clickUrl,
    createdAt: new Date().toISOString(),
    status: 'active',
  };

  directSponsors.unshift(newCampaign);

  return res.json({
    success: true,
    campaign: newCampaign,
    message: 'Ad campaign booked successfully! It is now live in the designated placement.',
  });
});

// Get Active Sponsors
app.get('/api/sponsors', (req, res) => {
  res.json({ sponsors: directSponsors });
});

// Mount Vite or static server
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false, // Explicitly disable HMR in AI Studio to prevent WebSocket connection errors in iframe
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Aegis Recovery] Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
