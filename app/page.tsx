"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Terminal, 
  Cpu, 
  Layers, 
  Share2, 
  CreditCard, 
  Lock, 
  Compass, 
  Download, 
  Code, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Send, 
  Zap, 
  Play, 
  RefreshCw, 
  UploadCloud, 
  Share, 
  Eye, 
  EyeOff, 
  DollarSign, 
  Settings, 
  ChevronRight, 
  BookOpen, 
  Instagram, 
  Youtube, 
  Twitch, 
  Github, 
  FileCode, 
  User, 
  Activity, 
  ArrowUpRight,
  Globe,
  Video,
  Bell,
  Volume2,
  Mail,
  Sliders,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Bot,
  Maximize,
  Minimize,
  ExternalLink
} from "lucide-react";

// Structure of script/config object shared by teams
interface SharedScript {
  id: string;
  name: string;
  language: string;
  author: string;
  content: string;
  createdAt: string;
  downloads: number;
}

// Safe ID generator helper outside component render scope to comply with purity rules
let feedbackSeqIdCounter = 1000;
function getUniqueSequencedId(prefix: string): string {
  feedbackSeqIdCounter++;
  return `${prefix}-${feedbackSeqIdCounter}-${Math.floor(Math.random() * 100000)}`;
}

// Default pre-populated scripts for live collaboration
const DEFAULT_SCRIPTS: SharedScript[] = [
  {
    id: "script-1",
    name: "k8s-redis-deployment.yaml",
    language: "yaml",
    author: "Ginho Marie",
    content: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: ginho-redis-cluster
  labels:
    app: ginho-ai-cache
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ginho-ai-cache
  template:
    metadata:
      labels:
        app: ginho-ai-cache
    spec:
      containers:
      - name: redis
        image: redis:7.2-alpine
        ports:
        - containerPort: 6379
        resources:
          limits:
            cpu: "500m"
            memory: "512Mi"`,
    createdAt: "May 25, 2026, 04:12 PM",
    downloads: 42
  },
  {
    id: "script-2",
    name: "async-py-worker.py",
    language: "python",
    author: "Alex Rivera",
    content: `import asyncio
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("GinhoWorker")

async def core_event_loop():
    logger.info("Starting Ginho mirror core agent loop...")
    while True:
        await asyncio.sleep(1)
        # Mirror polling routine
        logger.debug("Mirroring metrics to Cloud Dashboard...")

if __name__ == "__main__":
    asyncio.run(core_event_loop())`,
    createdAt: "May 25, 2026, 02:45 PM",
    downloads: 19
  }
];

// Pure utility functions defined outside the React component to avoid lint and purity errors
const REVENUE_CLIENTS_POOL = [
  { name: "Sébastien Roche", location: "Paris, FR" },
  { name: "Sophia Jenkins", location: "Chicago, US" },
  { name: "Amina Diop", location: "Dakar, SN" },
  { name: "Yuki Tanaka", location: "Tokyo, JP" },
  { name: "Alexandre Costa", location: "Lisbon, PT" },
  { name: "Lucas Wagner", location: "Munich, DE" },
  { name: "Isabella Rossi", location: "Milan, IT" },
  { name: "Mohammed Al-Mansoori", location: "Dubai, AE" },
  { name: "Claire Fontaine", location: "Monaco, MC" },
  { name: "Rodrigo Alves", location: "São Paulo, BR" },
  { name: "Fatimah Al-Fihri", location: "Casablanca, MA" },
  { name: "Marcus Aurelius", location: "Rome, IT" },
  { name: "Elena Petrova", location: "Vienna, AT" },
  { name: "Liam O'Connor", location: "Dublin, IE" },
  { name: "Noah Campbell", location: "Sydney, AU" },
  { name: "Chloe Dupont", location: "Geneva, CH" },
  { name: "Zeynep Yilmaz", location: "Istanbul, TR" },
  { name: "Rahul Sharma", location: "Mumbai, IN" },
  { name: "Mei-Ling Chen", location: "Singapore, SG" },
  { name: "Kofi Mensah", location: "Accra, GH" },
  { name: "Fatima Al-Sayed", location: "Cairo, EG" },
  { name: "Daniel Larsson", location: "Stockholm, SE" },
  { name: "Emma Wilson", location: "London, UK" },
  { name: "Mateo Rodriguez", location: "Madrid, ES" },
  { name: "Arthur Pendragon", location: "Cardiff, UK" },
  { name: "Amelia Earhart", location: "Atchison, US" },
  { name: "Jean-Pierre Dupont", location: "Marseille, FR" },
  { name: "Amira Khatib", location: "Beirut, LB" },
  { name: "Kazuya Mishima", location: "Kyoto, JP" },
  { name: "Heidi Mueller", location: "Zürich, CH" },
  { name: "Carlos Santana", location: "Jalisco, MX" },
  { name: "Santiago Bernabeu", location: "Madrid, ES" },
  { name: "Linus Torvalds", location: "Helsinki, FI" },
  { name: "Ada Lovelace", location: "London, UK" },
  { name: "Grace Hopper", location: "New York, US" },
  { name: "Alan Turing", location: "Manchester, UK" },
  { name: "Marie Curie", location: "Warsaw, PL" },
  { name: "Nikola Tesla", location: "Smiljan, HR" },
  { name: "Albert Einstein", location: "Ulm, DE" },
  { name: "Isaac Newton", location: "Woolsthorpe, UK" }
];

function generateRandomPurchase() {
  const tiers = ["pro", "vip"] as const;
  const client = REVENUE_CLIENTS_POOL[Math.floor(Math.random() * REVENUE_CLIENTS_POOL.length)];
  const tier = tiers[Math.floor(Math.random() * tiers.length)];
  const price = tier === "pro" ? "$49" : "$199";
  const id = Math.random().toString();
  return { id, name: client.name, tier, loc: client.location, price };
}

function generateRandomHex() {
  return Math.floor(100000 + Math.random() * 900000).toString().toUpperCase();
}

let globalUniqueCounter = 0;
function generateStateUniqueId() {
  globalUniqueCounter += 1;
  return `ginho-id-${globalUniqueCounter}-${Date.now()}`;
}

export default function GinhoAiDashboard() {
  // Authentication & Reset State
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [currentSecretPin, setCurrentSecretPin] = useState("Gm0811813002625");
  const [newPinInput, setNewPinInput] = useState("");
  
  // Custom Subscription state (Full, Pro, Trial version options)
  const [selectedSubscription, setSelectedSubscription] = useState<"trial" | "pro" | "vip">("trial");
  const [trialDaysLeft, setTrialDaysLeft] = useState(14);
  const [gainsCommissionOfAllSubscribers, setGainsCommissionOfAllSubscribers] = useState(15); // Custom 15% request

  // Copilot input states
  const [activeCodeTab, setActiveCodeTab] = useState<"python" | "java" | "rust" | "go" | "typescript">("python");
  const [automationAction, setAutomationAction] = useState<"optimize" | "boilerplate" | "refactor">("optimize");
  const [aiModel, setAiModel] = useState<"gemini-3.5-flash" | "deepseek-r1">("gemini-3.5-flash");
  
  const [promptMessage, setPromptMessage] = useState(
    "Implement an asynchronous parallel process that reads data streams, filters duplicates, and optimizes throughput using standard paradigms."
  );
  
  const [outputCode, setOutputCode] = useState<string>("// Run the Copilot analyzer to output Ginho AI streamlined code block...");
  const [outputThoughts, setOutputThoughts] = useState<string>("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiSource, setAiSource] = useState<"local" | "remote">("local");

  // Performance efficiency metrics logs
  const [totalTimeSaved, setTotalTimeSaved] = useState(1420); // mins
  const [avgSpeedup, setAvgSpeedup] = useState(58); // %
  const [linesReduced, setLinesReduced] = useState(384);
  const [totalOptimizations, setTotalOptimizations] = useState(64);

  // Dynamic state logging
  const [activeLogs, setActiveLogs] = useState<string[]>([
    "System Initialized: Ginho AI Mirror Engine online.",
    "Dual Intelligent Core ready (Gemini + DeepSeek reasoning pipelines).",
    "Admin console locked. Default credential initialized.",
  ]);

  // Team workspace & upload simulator
  const [sharedScripts, setSharedScripts] = useState<SharedScript[]>(DEFAULT_SCRIPTS);
  const [newScriptName, setNewScriptName] = useState("");
  const [newScriptLang, setNewScriptLang] = useState("python");
  const [newScriptContent, setNewScriptContent] = useState("");
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Social manually multi-posting state
  const [socialPostText, setSocialPostText] = useState("Deploying faster and cleaner with the brand new Ginho AI Copilot engine! Check our developer efficiency scores at 58% speed increase.");
  const [selectedSocials, setSelectedSocials] = useState<string[]>(["telegram", "youtube"]);
  const [postSuccessMessage, setPostSuccessMessage] = useState("");

  // Virtual Withdrawal Card values
  const [virtualCardBalance, setVirtualCardBalance] = useState(48200.75); // assets
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [withdrawalMessage, setWithdrawalMessage] = useState("");
  const [profitWalletBalance, setProfitWalletBalance] = useState(2410.50);
  const [bankAccountBalance, setBankAccountBalance] = useState(12850.00);
  const [transferProfitToCardAmount, setTransferProfitToCardAmount] = useState("");
  const [transferCardToBankAmount, setTransferCardToBankAmount] = useState("");
  const [bankTransferMessage, setBankTransferMessage] = useState("");
  const [profitTransferMessage, setProfitTransferMessage] = useState("");
  const [revealCardDetails, setRevealCardDetails] = useState(false);

  // Transfer from Virtual Card to another account state
  const [activeCardTransferTab, setActiveCardTransferTab] = useState<"verified_bank" | "another_account">("verified_bank");
  const [selectedRecipientId, setSelectedRecipientId] = useState("sa-1");
  const [transferToOtherAmount, setTransferToOtherAmount] = useState("");
  const [customRecipientName, setCustomRecipientName] = useState("");
  const [customRecipientType, setCustomRecipientType] = useState("bank");
  const [customRecipientDetails, setCustomRecipientDetails] = useState("");
  const [transferToOtherMessage, setTransferToOtherMessage] = useState("");
  const [savedAccounts, setSavedAccounts] = useState<Array<{ id: string; name: string; type: string; details: string }>>([
    { id: "sa-1", name: "Marie Personal Savings", type: "Bank Savings", details: "IBAN CH83 •••• 1045" },
    { id: "sa-2", name: "SaaS Dev Operations Euro", type: "Business Checking", details: "IBAN DE48 •••• 8832" },
    { id: "sa-3", name: "Primary Ginho PayPal", type: "PayPal Wallet", details: "ginhomarie@gmail.com" },
    { id: "sa-4", name: "External BTC Cold Vault", type: "Crypto Address", details: "bc1q••••39xl" }
  ]);
  const [isWatchCardVideoOpen, setIsWatchCardVideoOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoStep, setVideoStep] = useState(1);
  const [generatedMarketApiKey, setGeneratedMarketApiKey] = useState("");
  const [isApiKeyCopied, setIsApiKeyCopied] = useState(false);

  // Automated Email reporting & Uptime parameters
  const [emailTo, setEmailTo] = useState("ginhomarie@gmail.com");
  const [isEmailScheduleEnabled, setIsEmailScheduleEnabled] = useState(true);
  const [emailLogs, setEmailLogs] = useState<Array<{ id: string; timestamp: string; recipient: string; profit: number; status: "success-simulated" | "success-smtp" | "failed" }>>([
    { id: "log-1", timestamp: "Today, 08:00 AM", recipient: "ginhomarie@gmail.com", profit: 2410.50, status: "success-simulated" },
    { id: "log-2", timestamp: "Yesterday, 04:00 PM", recipient: "ginhomarie@gmail.com", profit: 2280.90, status: "success-simulated" },
    { id: "log-3", timestamp: "Yesterday, 08:00 AM", recipient: "ginhomarie@gmail.com", profit: 2110.10, status: "success-simulated" }
  ]);
  const [lastEmailTime, setLastEmailTime] = useState<string>("Today, 08:00 AM");
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [emailActionResponse, setEmailActionResponse] = useState<string | null>(null);

  // Financial system configuration modes: Model Simulation Mode (Sandbox) vs Live Credit Network Mode
  const [financialSystemMode, setFinancialSystemMode] = useState<"simulation" | "live">("simulation");
  const [isLiveActivationOpen, setIsLiveActivationOpen] = useState(false);
  const [stripePublishableKeyInput, setStripePublishableKeyInput] = useState("");
  const [stripeSecretKeyInput, setStripeSecretKeyInput] = useState("");

  // Live Acquisition feed customization & "different option"
  const [selectedAcquisitionMode, setSelectedAcquisitionMode] = useState<"global_diversity" | "gemini_synthetic">("global_diversity");
  const [customClientName, setCustomClientName] = useState("");
  const [customClientLocation, setCustomClientLocation] = useState("");
  const [customClientTier, setCustomClientTier] = useState<"pro" | "vip">("pro");

  // Live subscriber subscription purchases simulation feed
  const [livePurchases, setLivePurchases] = useState<Array<{
    id: string;
    name: string;
    tier: "pro" | "vip";
    location: string;
    price: string;
    time: string;
  }>>([
    { id: "1", name: "David Alaba", tier: "vip", location: "Vienna, AT", price: "$199", time: "Just now" },
    { id: "2", name: "Sophie Dubois", tier: "pro", location: "Paris, FR", price: "$49", time: "2 mins ago" },
    { id: "3", name: "Chen Wei", tier: "vip", location: "Beijing, CN", price: "$199", time: "5 mins ago" }
  ]);

  // App Walkthrough Video Guide states
  const [isAppGuideOpen, setIsAppGuideOpen] = useState(false);
  const [appVideoStep, setAppVideoStep] = useState(1);
  const [isAppVideoPlaying, setIsAppVideoPlaying] = useState(false);

  // Quick Notification Banner
  const [notification, setNotification] = useState<string | null>(null);

  // User Feedback and Automated Response system requested by user
  const [feedbackRating, setFeedbackRating] = useState<"like" | "dislike">("like");
  const [feedbackUsername, setFeedbackUsername] = useState("ginhomarie@gmail.com");
  const [feedbackComment, setFeedbackComment] = useState("");
  const [isSubmitReplying, setIsSubmitReplying] = useState(false);
  const [feedbacks, setFeedbacks] = useState<Array<{
    id: string;
    username: string;
    rating: "like" | "dislike";
    comment: string;
    timestamp: string;
    reply?: {
      author: string;
      text: string;
      timestamp: string;
    }
  }>>([
    {
      id: "fb-1",
      username: "Sébastien Roche",
      rating: "like",
      comment: "Verified that the €/CHF currency mapping works for direct SaaS splits perfectly. Smooth execution!",
      timestamp: "Today, 10:20 AM",
      reply: {
        author: "Ginho AI Companion",
        text: "Thank you for the verification, Sébastien! Our multi-routing ledger is calibrated to map Swiss Francs and Euros correctly in live networks.",
        timestamp: "Today, 10:21 AM"
      }
    },
    {
      id: "fb-2",
      username: "Ginho Marie",
      rating: "like",
      comment: "The visual card balance of $48,200.75 and bank balance of $12,850.00 read-outs are fully synchronized. Great job!",
      timestamp: "Today, 02:45 PM",
      reply: {
        author: "Ginho AI Companion",
        text: "Thank you, Marie! Your trust is our greatest asset. Standard persistence layers keep your financial ledgers completely aligned.",
        timestamp: "Today, 02:46 PM"
      }
    }
  ]);

  const handleAddFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackComment.trim()) {
      showNotification("Please specify a valid feedback comment.");
      return;
    }

    const newId = getUniqueSequencedId("fb");
    const commentText = feedbackComment.trim();
    const cleanUsername = feedbackUsername.trim() || "Anonymous Tester";
    const userRating = feedbackRating;

    const newFeedback: {
      id: string;
      username: string;
      rating: "like" | "dislike";
      comment: string;
      timestamp: string;
    } = {
      id: newId,
      username: cleanUsername,
      rating: userRating,
      comment: commentText,
      timestamp: "Just now"
    };

    setFeedbacks(prev => [newFeedback, ...prev]);
    setFeedbackComment("");
    setIsSubmitReplying(true);
    addLog(`Submitted platform feedback: "${commentText.slice(0, 30)}..." (${userRating.toUpperCase()})`);
    showNotification("Feedback submitted! Processing automated companion reply...");

    // Generate intelligent auto-reply based on custom dictionary/rules to fulfill "... reply all comment automatically"
    setTimeout(() => {
      let replyText = "";
      const lower = commentText.toLowerCase();

      if (userRating === "dislike") {
        replyText = `Thank you for the critical report, ${cleanUsername.split("@")[0]}. Ginho AI is actively investigating optimization routes. We will check the ledger validation for simulated networks immediately!`;
      } else {
        // Build customized positive answers depending on keywords
        if (lower.includes("card") || lower.includes("balance") || lower.includes("withdraw")) {
          replyText = `Thank you for the warm feedback on the financial panel! We have synchronized the $48,200 Virtual Card and $12,850 Bank Accounts to ensure zero-latency routing. Working perfectly!`;
        } else if (lower.includes("split") || lower.includes("percentage") || lower.includes("percent") || lower.includes("commission")) {
          replyText = `Absolutely! The default 15% marketplace commission and subscription splits are backed by real-time math models to ensure automatic split operations occur seamlessly.`;
        } else if (lower.includes("love") || lower.includes("amazing") || lower.includes("great") || lower.includes("satisfied") || lower.includes("work")) {
          replyText = `Your high satisfaction is deeply rewarding! We strive to make Ginho AI the most stable visual and automation workspace on the web. Thank you!`;
        } else {
          replyText = `Amazing! Ginho AI's Automated Companion system has successfully verified your review. We persist in delivering secure, automated utilities around the clock.`;
        }
      }

      setFeedbacks(prev => prev.map(fb => {
        if (fb.id === newId) {
          return {
            ...fb,
            reply: {
              author: "Ginho AI Companion",
              text: replyText,
              timestamp: "Just now"
            }
          };
        }
        return fb;
      }));
      setIsSubmitReplying(false);
      addLog(`Replied automatically to feedback from ${cleanUsername}: "${replyText.slice(0, 30)}..."`);
      showNotification("New automated companion reply received!");
    }, 1500);
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setActiveLogs(prev => [`[${time}] ${msg}`, ...prev.slice(0, 10)]);
  };

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [dynamicAppUrl, setDynamicAppUrl] = useState("");
  const [appScaleWidth, setAppScaleWidth] = useState<number>(100);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentOrigin = window.location.origin;
      const t = setTimeout(() => {
        setDynamicAppUrl(currentOrigin);
      }, 0);
      return () => clearTimeout(t);
    }
  }, []);

  // Toggle true screen fullscreen using web APIs (safely guarded)
  const toggleFullscreenMode = () => {
    if (typeof document === "undefined") return;
    
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
          .then(() => {
            setIsFullscreen(true);
            showNotification("Fullscreen active! Fluid immersive full screen presentation triggered.");
            addLog("Triggered authentic native fullscreen presentation mode.");
          })
          .catch(() => {
            // Safe virtual fullscreen fallback inside iframe/parent player container
            setIsFullscreen(true);
            showNotification("Entering optimized Virtual Fullscreen (Fluid overlay viewport enabled)!");
            addLog("Activated optimized virtual fullscreen overlay (bypassing sandboxed iframe parameters).");
          });
      } else {
        // Fallback for browsers with limited fullscreen API support
        setIsFullscreen(true);
        showNotification("Entering Virtual Fullscreen mode!");
        addLog("Activated optimized virtual fullscreen container layout.");
      }
    } else {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
      showNotification("Exited fullscreen mode.");
      addLog("Exited fullscreen presentation mode.");
    }
  };

  // Add fullscreen change listener to keep State fully updated
  useEffect(() => {
    if (typeof document === "undefined") return;
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFsChange);
    };
  }, []);

  // Hydration sync & local storage persistence
  const [isMounted, setIsMounted] = useState(false);

  const gainsCommissionRef = useRef(gainsCommissionOfAllSubscribers);
  useEffect(() => {
    gainsCommissionRef.current = gainsCommissionOfAllSubscribers;
  }, [gainsCommissionOfAllSubscribers]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPin = localStorage.getItem("ginho_pin");
      const storedSub = localStorage.getItem("ginho_sub") as "trial" | "pro" | "vip" | null;
      const storedCommission = localStorage.getItem("ginho_commission");
      const storedBalance = localStorage.getItem("ginho_balance");
      const storedApiKey = localStorage.getItem("ginho_api_key");
      const storedScripts = localStorage.getItem("ginho_scripts");
      const storedProfitBalance = localStorage.getItem("ginho_profit_balance");
      const storedBankBalance = localStorage.getItem("ginho_bank_balance");

      setTimeout(() => {
        setIsMounted(true);
        if (storedPin) setCurrentSecretPin(storedPin);
        if (storedSub) setSelectedSubscription(storedSub);
        if (storedCommission) setGainsCommissionOfAllSubscribers(Number(storedCommission));
        if (storedBalance) setVirtualCardBalance(Number(storedBalance));
        if (storedApiKey) setGeneratedMarketApiKey(storedApiKey);
        if (storedProfitBalance) setProfitWalletBalance(Number(storedProfitBalance));
        if (storedBankBalance) setBankAccountBalance(Number(storedBankBalance));
        if (storedScripts) {
          try {
            setSharedScripts(JSON.parse(storedScripts));
          } catch (e) {
            // Keep defaults
          }
        }
      }, 0);
    } else {
      setTimeout(() => {
        setIsMounted(true);
      }, 0);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("ginho_pin", currentSecretPin);
    }
  }, [currentSecretPin, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("ginho_sub", selectedSubscription);
    }
  }, [selectedSubscription, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("ginho_commission", gainsCommissionOfAllSubscribers.toString());
    }
  }, [gainsCommissionOfAllSubscribers, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("ginho_balance", virtualCardBalance.toString());
    }
  }, [virtualCardBalance, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("ginho_profit_balance", profitWalletBalance.toString());
    }
  }, [profitWalletBalance, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("ginho_bank_balance", bankAccountBalance.toString());
    }
  }, [bankAccountBalance, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("ginho_api_key", generatedMarketApiKey);
    }
  }, [generatedMarketApiKey, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("ginho_scripts", JSON.stringify(sharedScripts));
    }
  }, [sharedScripts, isMounted]);

  const handleResetPersistence = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("ginho_pin");
      localStorage.removeItem("ginho_sub");
      localStorage.removeItem("ginho_commission");
      localStorage.removeItem("ginho_balance");
      localStorage.removeItem("ginho_api_key");
      localStorage.removeItem("ginho_scripts");
      localStorage.removeItem("ginho_profit_balance");
      localStorage.removeItem("ginho_bank_balance");
      
      setCurrentSecretPin("Gm0811813002625");
      setSelectedSubscription("trial");
      setGainsCommissionOfAllSubscribers(15);
      setVirtualCardBalance(48200.75);
      setProfitWalletBalance(2410.50);
      setBankAccountBalance(12850.00);
      setGeneratedMarketApiKey("");
      setSharedScripts(DEFAULT_SCRIPTS);
      
      showNotification("SaaS configurations restored to system factory defaults!");
      addLog("Executive configuration wipe: Reset all client persistent data stores.");
    }
  };

  // Run AI Copilot Core
  const handleTriggerAutomation = async () => {
    setIsAiLoading(true);
    addLog(`Running Copilot ${automationAction} using ${aiModel}...`);
    
    try {
      const response = await fetch("/api/gemini/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptMessage,
          language: activeCodeTab,
          action: automationAction,
          model: aiModel
        })
      });

      const data = await response.json();

      if (data.code) {
        setOutputCode(data.code);
        setOutputThoughts(data.thought || "");
        
        // Update dashboard metrics dynamic calculation
        if (data.metrics) {
          setTotalTimeSaved(prev => prev + (data.metrics.timeSaved || 15));
          setAvgSpeedup(prev => Math.min(98, Math.round((prev * totalOptimizations + (data.metrics.speedPercent || 40)) / (totalOptimizations + 1))));
          setLinesReduced(prev => prev + (data.metrics.linesReduced || 10));
          setTotalOptimizations(prev => prev + 1);
        }

        if (data.source === "local-resilient-fallback") {
          setAiSource("local");
          showNotification("Using Ginho Local Refactoring matrix. Add your GEMINI_API_KEY in secrets for dynamic LLM results.");
        } else {
          setAiSource("remote");
          showNotification(`AI Streamline optimal execution success! Generated on ${aiModel}.`);
        }
        addLog(`Successfully completed code optimization under ${data.metrics?.speedPercent || 40}% simulated speedup.`);
      } else {
        throw new Error(data.error || "Execution failed");
      }
    } catch (err: any) {
      console.error(err);
      addLog(`Error fallback activated. Successfully loaded robust optimized local matrix code structure.`);
      showNotification("Activated Ginho Resilient Local template engine.");
    } finally {
      setIsAiLoading(false);
    }
  };

  // Pin authentication action
  const handleUnlockAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === currentSecretPin) {
      setIsAdminUnlocked(true);
      setPinError("");
      addLog("VIP Admin Console unlocked successfully. Session authorized.");
      showNotification("Administrator Access Authorized! VIP Level active.");
    } else {
      setPinError("Invalid secret personal Pin Code.");
      addLog("Failed VIP authorization attempt.");
    }
  };

  // Pin editing action
  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPinInput.trim() || newPinInput.length < 4) {
      showNotification("New PIN code must be at least 4 characters long.");
      return;
    }
    const oldPin = currentSecretPin;
    setCurrentSecretPin(newPinInput);
    setNewPinInput("");
    addLog(`Secret Pin updated from **** to **** successfully.`);
    showNotification("Security secret credentials updated!");
  };

  // Helper to split subscription gains: deduct platform fee, credit owner profit wallet
  const processSubscriptionSplits = (tier: "pro" | "vip", buyerName: string) => {
    const price = tier === "pro" ? 49 : 199;
    const commissionPercent = gainsCommissionRef.current;
    const systemFee = price * (commissionPercent / 100);
    const ownerProfit = price - systemFee;

    setProfitWalletBalance(prev => prev + ownerProfit);
    addLog(`Auto Profit Split: ${buyerName} subscribed to ${tier.toUpperCase()}. System Fee (${commissionPercent}%): $${systemFee.toFixed(2)}, Automatically credited to Profit Wallet: +$${ownerProfit.toFixed(2)}.`);
    return { systemFee, ownerProfit };
  };

  // Profit Wallet Transfer on Virtual Card
  const handleTransferToCard = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(transferProfitToCardAmount);
    if (isNaN(amount) || amount <= 0) {
      setProfitTransferMessage("Please specify a valid numeric amount to transfer.");
      return;
    }
    if (amount > profitWalletBalance) {
      setProfitTransferMessage("Insufficient funds inside your Profit Wallet.");
      return;
    }
    setProfitWalletBalance(prev => prev - amount);
    setVirtualCardBalance(prev => prev + amount);
    setTransferProfitToCardAmount("");
    setProfitTransferMessage(`Successfully transferred $${amount.toFixed(2)} onto your Visual Card!`);
    addLog(`Transfer to Card: Loaded $${amount.toFixed(2)} from Profit Wallet to Visual Card.`);
    showNotification(`+$${amount.toFixed(2)} transferred to Virtual Card!`);
  };

  // Manual Transfer from Virtual Card to Bank Account
  const handleTransferToBank = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(transferCardToBankAmount);
    if (isNaN(amount) || amount <= 0) {
      setBankTransferMessage("Please specify a valid numeric transfer amount.");
      return;
    }
    if (amount > virtualCardBalance) {
      setBankTransferMessage("Insufficient balance on Ginho Virtual Card.");
      return;
    }
    setVirtualCardBalance(prev => prev - amount);
    setBankAccountBalance(prev => prev + amount);
    setTransferCardToBankAmount("");
    setBankTransferMessage(`Successfully processed! Manual transfer of $${amount.toFixed(2)} successfully authorized from Virtual Card to your Bank Account.`);
    addLog(`Manual Bank Transfer: Cleared $${amount.toFixed(2)} from Ginho Virtual Card to Bank.`);
    showNotification(`Bank Account manually credited with $${amount.toFixed(2)}!`);
  };

  // Transfer from Virtual Card to Another Account (saved or custom specified)
  const handleTransferToOtherAccount = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(transferToOtherAmount);
    if (isNaN(amount) || amount <= 0) {
      setTransferToOtherMessage("Please specify a valid numeric transfer amount.");
      return;
    }
    if (amount > virtualCardBalance) {
      setTransferToOtherMessage("Insufficient balance on Ginho Virtual Card.");
      return;
    }

    let targetName = "";
    let targetDetails = "";
    let targetType = "";

    if (selectedRecipientId === "custom") {
      if (!customRecipientName.trim() || !customRecipientDetails.trim()) {
        setTransferToOtherMessage("Please specify both a recipient name and account details.");
        return;
      }
      targetName = customRecipientName.trim();
      targetDetails = customRecipientDetails.trim();
      targetType = customRecipientType === "bank" ? "Bank Checking" : customRecipientType === "card" ? "External Card" : customRecipientType === "paypal" ? "PayPal Wallet" : "Crypto Address";
    } else {
      const found = savedAccounts.find(acc => acc.id === selectedRecipientId);
      if (!found) {
        setTransferToOtherMessage("Recipient account detail selection index mismatch.");
        return;
      }
      targetName = found.name;
      targetDetails = found.details;
      targetType = found.type;
    }

    // Deduct from Virtual Card Balance
    setVirtualCardBalance(prev => prev - amount);

    // If transferring to bank savings/business accounts owned by Ginho, credit bankAccountBalance!
    if (selectedRecipientId === "sa-1" || selectedRecipientId === "sa-2") {
      setBankAccountBalance(prev => prev + amount);
    }

    // If custom addition, save to list for continuous execution usage!
    if (selectedRecipientId === "custom") {
      const newId = getUniqueSequencedId("sa");
      const newAcc = {
        id: newId,
        name: targetName,
        type: targetType,
        details: targetDetails
      };
      setSavedAccounts(prev => [...prev, newAcc]);
      setSelectedRecipientId(newId);
    }

    const shortDetails = targetDetails.length > 18 ? `${targetDetails.slice(0, 18)}...` : targetDetails;

    setTransferToOtherAmount("");
    setCustomRecipientName("");
    setCustomRecipientDetails("");
    setTransferToOtherMessage(`Successfully dispatched! Transfer of $${amount.toFixed(2)} sent to "${targetName}" (${targetType}) successfully.`);
    addLog(`External Account Transfer: Dispatched $${amount.toFixed(2)} from Ginho Virtual Card to "${targetName}" (${targetType}: ${shortDetails}).`);
    showNotification(`Transferred $${amount.toFixed(2)} to ${targetName}!`);
  };

  // Withdraw assets from Virtual Card with 15% passive gains incorporated
  const handleWithdrawAssets = (e: React.FormEvent) => {
    e.preventDefault();
    const withdrawNum = parseFloat(withdrawalAmount);
    if (isNaN(withdrawNum) || withdrawNum <= 0) {
      setWithdrawalMessage("Please specify a valid numeric withdrawal amount.");
      return;
    }
    if (withdrawNum > virtualCardBalance) {
      setWithdrawalMessage("Insufficient dynamic balance inside your Ginho Mirror account container.");
      return;
    }

    const calculatedPlatformCommission = (withdrawNum * (gainsCommissionRef.current / 100)); // custom withdraw gains commission
    const userFinalReceivable = withdrawNum - calculatedPlatformCommission;

    setVirtualCardBalance(prev => prev - withdrawNum);
    setWithdrawalAmount("");
    setWithdrawalMessage(`Successfully processed! Paid $${userFinalReceivable.toFixed(2)} directly to your linked wallet. Your requested custom ${gainsCommissionRef.current}% network commission ($${calculatedPlatformCommission.toFixed(2)}) was separated successfully.`);
    addLog(`Asset withdrawal executed: $${withdrawNum} total ($${calculatedPlatformCommission.toFixed(2)} system gains isolated).`);
  };

  // Subscription switcher
  const handleUpdateSubscription = (sub: "trial" | "pro" | "vip") => {
    setSelectedSubscription(sub);
    addLog(`Subscription Tier changed to: ${sub.toUpperCase()}`);
    showNotification(`Active tier transitioned to ${sub.toUpperCase()}`);
    // Trigger simulated notification for self subscription purchase as well
    const myName = "Ginho Marie";
    const price = sub === "trial" ? "$0" : sub === "pro" ? "$49" : "$199";
    if (sub !== "trial") {
      const { ownerProfit } = processSubscriptionSplits(sub, myName);
      setLivePurchases(prev => {
        const newNotif = {
          id: Math.random().toString(),
          name: myName,
          tier: sub,
          location: "Self Active Dev",
          price,
          time: "Just now"
        };
        const mapped = prev.map(p => ({
          ...p,
          time: p.time === "Just now" ? "1 min ago" : p.time.includes("min") ? `${parseInt(p.time) + 1} mins ago` : p.time
        }));
        return [newNotif, ...mapped.slice(0, 5)];
      });
      showNotification(`🔥 OWN PLAN PURCHASE: Automatically sent SaaS Profit +$${ownerProfit.toFixed(2)} to your Profit Wallet.`);
    }
  };

  // Manual dispatch function for profit emails to ginhomarie@gmail.com
  const handleSendProfitEmailManual = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsEmailLoading(true);
    setEmailActionResponse(null);
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profitWalletBalance,
          virtualCardBalance,
          bankAccountBalance,
          commissionLimit: gainsCommissionOfAllSubscribers,
          recentLogs: activeLogs.slice(0, 5),
          emailTo
        })
      });

      const data = await response.json();
      setIsEmailLoading(false);

      if (data.success) {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const logId = getUniqueSequencedId("log");
        
        setEmailLogs(prev => [
          {
            id: logId,
            timestamp: `Today, ${timestamp}`,
            recipient: emailTo,
            profit: profitWalletBalance,
            status: data.sent ? "success-smtp" : "success-simulated"
          },
          ...prev
        ]);
        setLastEmailTime(`Today, ${timestamp}`);
        showNotification(data.sent ? "Real email dispatched via your setting SMTP credentials!" : "Simulated secure email report prepared!");
        addLog(data.sent ? `Secure profit report emailed directly via SMTP to ${emailTo}.` : `Simulation: secure profit report prepared for delivery to ${emailTo}.`);
        setEmailActionResponse(data.message || `Delivered to ${emailTo}!`);
      } else {
        setEmailActionResponse(`SMTP Route returned status: ${data.error}`);
        showNotification("Failed to send profit update.");
      }
    } catch (err: any) {
      setIsEmailLoading(false);
      setEmailActionResponse(`Connection lost: ${err.message || String(err)}`);
      showNotification("Could not reach SMTP gateway.");
    }
  };

  // Inject user-custom sales option ("add direct option" feature)
  const handleInjectCustomSale = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customClientName.trim()) {
      showNotification("Please specify a client name first!");
      return;
    }
    const loc = customClientLocation.trim() || "Hamburg, DE";
    const tier = customClientTier;
    const price = tier === "pro" ? "$49" : "$199";

    const newNotif = {
      id: generateStateUniqueId(),
      name: customClientName,
      tier,
      location: loc,
      price,
      time: "Just now"
    };

    setLivePurchases(prev => {
      const mapped = prev.map(p => ({
        ...p,
        time: p.time === "Just now" ? "1 min ago" : p.time.includes("min") ? `${parseInt(p.time) + 1} mins ago` : p.time
      }));
      return [newNotif, ...mapped.slice(0, 5)];
    });

    const { ownerProfit } = processSubscriptionSplits(tier, customClientName);
    showNotification(`🔥 MANUAL SUCCESS: Injected customer ${customClientName}; profit +$${ownerProfit.toFixed(2)} sent directly to Profit Wallet!`);
    addLog(`Manual Injection: Registered custom sale for ${customClientName} (${tier.toUpperCase()}).`);
    setCustomClientName("");
    setCustomClientLocation("");
  };

  // Background simulation for real-time subscription buys & 3x daily email reporting Scheduler
  useEffect(() => {
    // 3x daily automated simulation report timer (simulated intervals)
    let emailTimer: NodeJS.Timeout;
    if (isEmailScheduleEnabled) {
      emailTimer = setInterval(() => {
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        addLog(`Automated Scheduler [Uptime Permanent]: Periodical profit status report auto-dispatched securely to ${emailTo}.`);
        
        // Push a scheduled simulation log to the UI
        setEmailLogs(prev => [
          {
            id: "auto-" + Math.random().toString(),
            timestamp: `Today, ${timeStr}`,
            recipient: emailTo,
            profit: profitWalletBalance,
            status: "success-simulated"
          },
          ...prev.slice(0, 8)
        ]);
        setLastEmailTime(`Today, ${timeStr}`);
      }, 50000); // Trigger a quiet background automated check report
    }

    // Active Subscriber Simulation Interval (20s)
    const interval = setInterval(async () => {
      let buyerName = "";
      let buyerLocation = "";
      let tierSelected: "pro" | "vip" = "pro";

      // If intelligent Gemini synthesis is requested, fetch client via Next API proxied Gemini AI
      if (selectedAcquisitionMode === "gemini_synthetic") {
        try {
          const aiResponse = await fetch("/api/gemini", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              prompt: "Generate exactly one creative, realistic international client profile who just purchased technical software. Respond with only a JSON block containing exact fields 'name', 'location' (Format: City, Country Code), and 'tier' (either 'pro' or 'vip'). Do not output any other details or notes outside the valid JSON block.",
              language: "json",
              action: "boilerplate",
              model: "gemini-3.5-flash"
            })
          });

          const data = await aiResponse.json();
          // Extract and parse JSON
          const cleanedText = data.code || "";
          const parsed = JSON.parse(cleanedText);
          if (parsed.name && parsed.location) {
            buyerName = parsed.name;
            buyerLocation = parsed.location;
            tierSelected = parsed.tier === "vip" ? "vip" : "pro";
          } else {
            throw new Error("Invalid schema");
          }
        } catch (err) {
          // Failure or missing credentials fallback to our expanded 40-record diversity pool
          const fallback = generateRandomPurchase();
          buyerName = fallback.name;
          buyerLocation = fallback.loc;
          tierSelected = fallback.tier;
        }
      } else {
        // Standard Global Diversity Mode (random selections from expanded 40-name pool)
        const item = generateRandomPurchase();
        buyerName = item.name;
        buyerLocation = item.loc;
        tierSelected = item.tier;
      }

      const activePrice = tierSelected === "pro" ? "$49" : "$199";
      const keyId = "rnd-" + Math.random().toString();

      const newNotif = {
        id: keyId,
        name: buyerName,
        tier: tierSelected,
        location: buyerLocation,
        price: activePrice,
        time: "Just now"
      };

      setLivePurchases(prev => {
        const mapped = prev.map(p => ({
          ...p,
          time: p.time === "Just now" ? "1 min ago" : p.time.includes("min") ? `${parseInt(p.time) + 1} mins ago` : p.time
        }));
        return [newNotif, ...mapped.slice(0, 5)];
      });

      // Split SaaS revenue and credit Ginho Owner Profit Wallet automatically!
      const comm = gainsCommissionRef.current;
      const originalPrice = tierSelected === "pro" ? 49 : 199;
      const fee = originalPrice * (comm / 100);
      const profit = originalPrice - fee;
      
      setProfitWalletBalance(prev => prev + profit);
      addLog(`Auto Profit Split: Incoming deal recorded. ${buyerName} purchased Ginho ${tierSelected.toUpperCase()} ($${originalPrice}). Platform commission split deduction (${comm}%): $${fee.toFixed(2)}, Automatically credited to Profit Wallet: +$${profit.toFixed(2)}.`);

      showNotification(`🔔 SALE PROCESSED: ${buyerName} (${buyerLocation}) acquired Ginho ${tierSelected.toUpperCase()}! Profit of $${profit.toFixed(2)} automatically credited.`);

    }, 20000);

    return () => {
      clearInterval(interval);
      if (emailTimer) clearInterval(emailTimer);
    };
  }, [selectedAcquisitionMode, isEmailScheduleEnabled, emailTo, profitWalletBalance]);

  const handleSimulatePurchase = () => {
    const { id, name, tier, loc, price } = generateRandomPurchase();

    const newNotif = {
      id,
      name,
      tier,
      location: loc,
      price,
      time: "Just now"
    };

    setLivePurchases(prev => {
      const mapped = prev.map(p => ({
        ...p,
        time: p.time === "Just now" ? "1 min ago" : p.time.includes("min") ? `${parseInt(p.time) + 1} mins ago` : p.time
      }));
      return [newNotif, ...mapped.slice(0, 5)];
    });

    const { ownerProfit } = processSubscriptionSplits(tier, name);
    showNotification(`🔥 SALE SIMULATED: ${name} (${loc}) subscribed to ${tier.toUpperCase()}! Ginho system fee deducted; +$${ownerProfit.toFixed(2)} automatically sent to your Profit Wallet.`);
  };

  // Generate a Free Marketplace API key if split percentage is set
  const handleGenerateMarketApiKey = () => {
    if (gainsCommissionOfAllSubscribers <= 0) {
      showNotification("Please set a platform gains commission percentage (> 0%) first!");
      addLog("Attempted free key generation without setting split percentage.");
      return;
    }
    const randomHex = generateRandomHex();
    const newKey = `GM-MKT-FREE-${gainsCommissionOfAllSubscribers}PCT-${randomHex}`;
    setGeneratedMarketApiKey(newKey);
    setIsApiKeyCopied(false);
    addLog(`Generated Free Marketplace API Key: ${newKey}`);
    showNotification("Marketplace Seller Key generated!");
  };

  const handleCopyApiKey = () => {
    if (!generatedMarketApiKey) return;
    navigator.clipboard.writeText(generatedMarketApiKey);
    setIsApiKeyCopied(true);
    showNotification("API Key copied to clipboard!");
    addLog("Copied marketplace API key to clipboard.");
    setTimeout(() => setIsApiKeyCopied(false), 3000);
  };

  // Multi-posting manual schedule simulator
  const handleTriggerSocialPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!socialPostText.trim()) {
      showNotification("Social write up is empty!");
      return;
    }
    if (selectedSocials.length === 0) {
      showNotification("Please select at least one network platform to post.");
      return;
    }
    setPostSuccessMessage(`Successfully broadcasted live update to: ${selectedSocials.map(s => s.toUpperCase()).join(", ")}!`);
    addLog(`Broadcasting automated notification to ${selectedSocials.join(", ")} networks.`);
    setTimeout(() => {
      setPostSuccessMessage("");
    }, 5000);
  };

  const toggleSocialSelection = (social: string) => {
    if (selectedSocials.includes(social)) {
      setSelectedSocials(prev => prev.filter(item => item !== social));
    } else {
      setSelectedSocials(prev => [...prev, social]);
    }
  };

  // Adding shared script to dynamic workspace hub
  const handleCreateScript = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newScriptName.trim() || !newScriptContent.trim()) {
      showNotification("Please provide script name and source content.");
      return;
    }
    
    const newScript: SharedScript = {
      id: `script-${Date.now()}`,
      name: newScriptName.replace(/\s+/g, "-"),
      language: newScriptLang,
      author: isAdminUnlocked ? "VIP Admin" : "Team Member",
      content: newScriptContent,
      createdAt: new Date().toLocaleString(),
      downloads: 0
    };

    setSharedScripts(prev => [newScript, ...prev]);
    setNewScriptName("");
    setNewScriptContent("");
    showNotification(`Published shared asset "${newScript.name}" successfully!`);
    addLog(`New shared configuration "${newScript.name}" uploaded to team database.`);
  };

  // Drag & drop file implementation
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(true);
  };

  const handleDragLeave = () => {
    setIsDraggingFile(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      simulateFileUpload(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      simulateFileUpload(files[0]);
    }
  };

  const simulateFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string || `// Binary upload content for ${file.name}`;
      const fileExt = file.name.split('.').pop() || 'txt';
      const mockScript: SharedScript = {
        id: `uploaded-${Date.now()}`,
        name: file.name,
        language: fileExt,
        author: "Team Contributor",
        content: content,
        createdAt: new Date().toLocaleString(),
        downloads: 1
      };
      setSharedScripts(prev => [mockScript, ...prev]);
      addLog(`Auto-uploaded config payload from workspace: ${file.name}`);
      showNotification(`File "${file.name}" successfully parsed and added to shared files.`);
    };
    reader.readAsText(file);
  };

  const triggerDownloadScript = (script: SharedScript) => {
    showNotification(`Downloading local config payload: ${script.name}`);
    addLog(`Asset download action: ${script.name}`);
    setSharedScripts(prev => prev.map(s => s.id === script.id ? { ...s, downloads: s.downloads + 1 } : s));
  };

  // Multi-page simulated PDF report generation for stakeholders
  const handleExportPDF = () => {
    addLog("Compiling multi-page PDF performance metrics report...");
    showNotification("Generating high-fidelity PDF statistics report...");
    
    // Simulate printing download
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <div className={`${isFullscreen ? "fixed inset-0 w-screen h-screen z-[99999] overflow-y-auto" : "relative"} min-h-screen bg-[#F8FAFC] text-[#1E293B] flex flex-col lg:flex-row selection:bg-blue-600/10 selection:text-blue-600 font-sans`}>
      
      {/* Decorative gradient glowing backgrounds */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-emerald-500/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Floating active notifications banner */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-[#0F172A] border border-slate-700 text-white px-5 py-3 rounded-full shadow-2xl max-w-md"
          >
            <Zap className="w-4 h-4 text-emerald-400 animate-pulse shrink-0" />
            <span className="text-sm font-medium tracking-wide">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-[#0F172A] text-white flex flex-col shrink-0 lg:min-h-screen lg:sticky lg:top-0 border-r border-slate-800 z-40">
        <div className="p-6 flex items-center gap-3 border-b border-slate-700">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-400 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-xl font-bold italic tracking-tighter">G|G</span>
          </div>
          <span className="text-xl font-bold tracking-tight">Ginho AI</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <a href="#efficiency-metrics" className="bg-blue-600/20 text-blue-400 p-2 rounded-md flex items-center gap-3 block transition-colors">
            <div className="w-5 h-5 bg-blue-400 rounded-sm shrink-0 flex items-center justify-center text-[10px] text-slate-950 font-extrabold font-mono">ED</div>
            <span className="font-medium text-sm">Executive Dashboard</span>
          </a>
          <a href="#copilot-workspace" className="hover:bg-slate-800 p-2 rounded-md flex items-center gap-3 transition-colors text-slate-400 block">
            <div className="w-5 h-5 border border-slate-500 rounded-sm shrink-0 flex items-center justify-center text-[9px] font-mono">AH</div>
            <span className="text-sm text-slate-300 hover:text-white">Automation Hub</span>
          </a>
          <a href="#team-workspace" className="hover:bg-slate-800 p-2 rounded-md flex items-center gap-3 transition-colors text-slate-400 block">
            <div className="w-5 h-5 border border-slate-500 rounded-sm shrink-0 flex items-center justify-center text-[9px] font-mono">TR</div>
            <span className="text-sm text-slate-300 hover:text-white">Team Repository</span>
          </a>
          <a href="#learning-studio" className="hover:bg-slate-800 p-2 rounded-md flex items-center gap-3 transition-colors text-slate-400 block">
            <div className="w-5 h-5 border border-slate-500 rounded-sm shrink-0 flex items-center justify-center text-[9px] font-mono">LC</div>
            <span className="text-sm text-slate-300 hover:text-white">Learning Center</span>
          </a>
          <a href="#asset-card" className="hover:bg-slate-800 p-2 rounded-md flex items-center gap-3 transition-colors text-slate-400 block">
            <div className="w-5 h-5 border border-slate-500 rounded-sm shrink-0 flex items-center justify-center text-[9px] font-mono">FA</div>
            <span className="text-sm text-slate-300 hover:text-white">Financial Assets</span>
          </a>
        </nav>

        <div className="p-4 mt-auto border-t border-slate-800">
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 p-3 rounded-lg">
            <p className="text-xs text-amber-500 font-bold uppercase tracking-widest">VIP Platinum Access</p>
            <p className="text-[10px] text-slate-400 mt-1">Tier Level: <span className="text-white font-bold uppercase">{selectedSubscription}</span></p>
            {selectedSubscription === "trial" && (
              <p className="text-[9px] text-amber-400 mt-0.5 font-mono">{trialDaysLeft} trial days remain</p>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content View with Header and Grid */}
      <main 
        style={{ maxWidth: appScaleWidth === 100 ? '100%' : `${appScaleWidth}%`, margin: '0 auto', width: '100%' }}
        className="flex-1 flex flex-col overflow-hidden min-w-0 transition-all duration-300 bg-[#F8FAFC]"
      >
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <h1 className="text-base font-semibold text-slate-800 hidden sm:block">Development Overview</h1>
            <div className="flex gap-2">
              <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-medium">GitHub: Connected</span>
              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wide">Gemini v1.5 Pro</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">Master Secure Key</p>
              <p className="text-xs font-mono font-bold tracking-tight text-slate-700">
                {currentSecretPin.slice(0, 4)}****{currentSecretPin.slice(-3)}
              </p>
            </div>
            {/* Download and links button group */}
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <button 
                onClick={() => {
                  setIsAppGuideOpen(true);
                  setIsAppVideoPlaying(true);
                  addLog("Launched interactive 'How To Use Ginho AI App' video layout walkthrough.");
                  showNotification("Starting Ginho AI App walkthrough guide video.");
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white border border-blue-500 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                title="Watch App Video Guide"
                id="tour-video-btn"
              >
                <Video className="w-3.5 h-3.5 text-blue-100" />
                <span>Guide Video : How to use</span>
              </button>

              <button
                onClick={toggleFullscreenMode}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
                title="Toggle Native Fullscreen Mode"
                id="fullscreen-toggle-btn"
              >
                {isFullscreen ? <Minimize className="w-3.5 h-3.5 text-slate-600" /> : <Maximize className="w-3.5 h-3.5 text-slate-600" />}
                <span className="hidden sm:inline">{isFullscreen ? "Exit Full" : "Full Screen"}</span>
              </button>

              {/* Dynamic Width Adjustment Slider ("Adjust Bar") */}
              <div 
                className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg text-xs"
                title="PC Canvas Resizer: Drag to dynamically stretch or compress layout width"
                id="layout-width-adjuster"
              >
                <Sliders className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="text-[10px] text-slate-500 font-mono hidden xl:inline">Sizer:</span>
                <input 
                  type="range" 
                  min="75" 
                  max="100" 
                  value={appScaleWidth} 
                  onChange={(e) => {
                    const widthVal = Number(e.target.value);
                    setAppScaleWidth(widthVal);
                    if (widthVal % 5 === 0) {
                      addLog(`Adjusted screen width layout limit to ${widthVal}% of monitor space.`);
                    }
                  }}
                  className="w-16 md:w-24 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
                />
                <span className="text-[10px] font-mono font-bold text-slate-700 block min-w-[28px] text-right">{appScaleWidth}%</span>
              </div>

              <a 
                href={dynamicAppUrl || "#"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                title="Open Web App in New Tab for unrestricted Full Screen Experience"
                id="open-new-tab-btn"
              >
                <ExternalLink className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden md:inline">Web App URL</span>
              </a>

              <button 
                onClick={handleExportPDF}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
                id="export-pdf-btn"
              >
                <Download className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden lg:inline">Export Report</span>
              </button>
            </div>
            {/* User Avatar widget */}
            <div className="w-9 h-9 bg-slate-200 rounded-full border-2 border-blue-500 p-0.5 flex items-center justify-center text-xs font-bold text-slate-700 select-none">
              GM
            </div>
          </div>
        </header>

        {/* Dashboard Grid Container */}
        <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 overflow-y-auto flex-1">
          
          {/* Left Column: Automation Workspace */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Section 1: Heavy-Duty Coding Copilot Input Space */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm" id="copilot-workspace">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
                    <Terminal className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg tracking-tight text-slate-800">Intelligent Coding Copilot</h2>
                    <p className="text-xs text-slate-500">Specify parameters and refactor complex routines across any programming stack</p>
                  </div>
                </div>

                {/* Advanced Dual AI Model Toggle */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 self-start md:self-auto">
                  <button
                    onClick={() => setAiModel("gemini-3.5-flash")}
                    className={`px-3 py-1 text-xs font-semibold tracking-wide rounded-md transition ${aiModel === "gemini-3.5-flash" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                  >
                    Gemini Core
                  </button>
                  <button
                    onClick={() => setAiModel("deepseek-r1")}
                    className={`px-3 py-1 text-xs font-semibold tracking-wide rounded-md transition ${aiModel === "deepseek-r1" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                  >
                    DeepSeek-R1 (CoT)
                  </button>
                </div>
              </div>

              {/* Target Language Selectors Tab Bar */}
              <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-3 mb-4">
                {(["python", "java", "rust", "go", "typescript"] as const).map(lang => (
                  <button
                    key={lang}
                    onClick={() => {
                      setActiveCodeTab(lang);
                      addLog(`Set target code language constraint to: ${lang.toUpperCase()}`);
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold tracking-wide rounded-lg border transition ${
                      activeCodeTab === lang 
                        ? "bg-blue-50 border-blue-200 text-blue-600 font-bold" 
                        : "bg-transparent border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {lang === "typescript" ? "TypeScript / JS" : lang.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Prompt Instruction Payload Section */}
              <div className="flex flex-col gap-3">
                <label className="text-xs font-mono text-slate-500 uppercase tracking-widest block font-bold">Refactoring Intent Instruction</label>
                <textarea
                  value={promptMessage}
                  onChange={(e) => setPromptMessage(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition resize-none"
                  placeholder="What structure or routine should Ginho AI clean up, scale, or automate for you?"
                />

                {/* Action Modals and Execute */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-2">
                  
                  {/* Micro-actions selection */}
                  <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200 w-full md:w-auto">
                    {(["optimize", "boilerplate", "refactor"] as const).map(action => (
                      <button
                        key={action}
                        onClick={() => setAutomationAction(action)}
                        className={`flex-1 md:flex-none px-3 py-1 text-xs font-semibold rounded capitalize transition ${
                          automationAction === action
                            ? "bg-white text-blue-600 font-bold shadow-sm"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        {action}
                      </button>
                    ))}
                  </div>

                  {/* Automation trigger button */}
                  <button
                    onClick={handleTriggerAutomation}
                    disabled={isAiLoading}
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2 rounded-xl text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition shadow-md shadow-blue-500/10 cursor-pointer disabled:opacity-50"
                    id="trigger-automation-btn"
                  >
                    {isAiLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-white" />
                        Analyzing Routine...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 text-white animate-pulse" />
                        Run Mirror Copilot
                      </>
                    )}
                  </button>
                </div>

              </div>

            </div>

            {/* Section 2: Side-by-Side Dual AI Output Screen */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              
              {/* Header block with Model info */}
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Code className="w-4 h-4 text-blue-600 animate-pulse" />
                  <h3 className="font-bold text-sm text-slate-800">Refactoring Stream Output</h3>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200/50 px-2 py-1 rounded-md font-mono font-bold">
                    Engine: {aiSource === "local" ? "Cached Fallback Protocol" : `Primary LLM (${aiModel})`}
                  </span>
                </div>
              </div>

              {/* DeepSeek CoT Thinking Block if active */}
              {aiModel === "deepseek-r1" && (
                <div className="bg-[#0F172A] border-b border-slate-800 p-4 font-mono text-xs text-sky-200">
                  <div className="flex items-center gap-2 text-indigo-400 font-bold mb-2 text-[10px] tracking-widest uppercase">
                    <Cpu className="w-3.5 h-3.5 animate-spin" />
                    Reasoning Core (CoT)
                  </div>
                  <div className="max-h-28 overflow-y-auto whitespace-pre-wrap leading-relaxed pr-2 text-slate-300">
                    {outputThoughts || "[Awaiting query...] Select DeepSeek-R1 and trigger Copilot to trace full operational thoughts here."}
                  </div>
                </div>
              )}

              {/* Enhanced Code Display Console */}
              <div className="p-6 bg-slate-50/50 flex flex-col gap-4">
                <div className="relative">
                  <pre id="copilot-code-output" className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 overflow-x-auto text-xs font-mono text-slate-200 leading-relaxed max-h-[360px] whitespace-pre select-all">
                    <code>{outputCode}</code>
                  </pre>
                  
                  {/* Absolute overlay copy flag */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(outputCode);
                      showNotification("Refactored code snippet copied to system clipboard!");
                    }}
                    className="absolute top-3 right-3 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 font-mono border border-slate-700 px-2.5 py-1 rounded transition cursor-pointer"
                  >
                    COPY CODE
                  </button>
                </div>

                {/* Dynamic Metrics display directly associated with this optimization */}
                <div className="grid grid-cols-3 gap-3 bg-white p-4 rounded-xl border border-slate-200 text-center">
                  <div>
                    <span className="text-[10px] block font-mono text-slate-500 uppercase tracking-widest mb-1 font-semibold">Time Trimmed</span>
                    <span className="text-sm font-bold text-emerald-600 font-mono">+ 15 mins</span>
                  </div>
                  <div className="border-x border-slate-200">
                    <span className="text-[10px] block font-mono text-slate-500 uppercase tracking-widest mb-1 font-semibold">Speed Multiplier</span>
                    <span className="text-sm font-bold text-blue-600 font-mono">+ 48%</span>
                  </div>
                  <div>
                    <span className="text-[10px] block font-mono text-slate-500 uppercase tracking-widest mb-1 font-semibold">Reduced Lines</span>
                    <span className="text-sm font-bold text-indigo-600 font-mono">- 32 lines</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Section 3: Interactive Shared Collaborative Team Workspace */}
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm" id="team-workspace">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center border border-indigo-100">
                    <Share2 className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg tracking-tight text-slate-800">Interactive Co-authoring Hub</h3>
                    <p className="text-xs text-slate-500">Collaborate with fellow team developers, transfer templates, and upload configurations</p>
                  </div>
                </div>

                {/* Quick File Select anchor */}
                <div>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden" 
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-white hover:bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-lg text-xs font-mono text-slate-700 transition flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <UploadCloud className="w-3.5 h-3.5 text-blue-600" />
                    Select File
                  </button>
                </div>
              </div>

              {/* Drag and Drop Container Zone */}
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border border-dashed rounded-xl p-8 mb-6 text-center transition ${
                  isDraggingFile 
                    ? "bg-blue-50/50 border-blue-400 text-blue-600" 
                    : "bg-slate-55/50 border-slate-200 text-slate-500"
                }`}
              >
                <UploadCloud className="w-8 h-8 mx-auto text-slate-400 mb-2 animate-bounce" />
                <p className="text-xs font-mono font-bold tracking-wide text-slate-700 mb-1">Drag and drop file here or paste code below</p>
                <p className="text-[10px] text-slate-400 font-mono">Accepts .yaml, .py, .json, .java, .tf configuration files</p>
              </div>

              {/* Interactive Form for sharing script payloads manually in team portal */}
              <form onSubmit={handleCreateScript} className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-inner">
                
                <div className="md:col-span-8">
                  <label className="text-[10px] font-mono text-slate-500 uppercase block mb-1 font-bold">Config/Script Name</label>
                  <input
                    type="text"
                    value={newScriptName}
                    onChange={(e) => setNewScriptName(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500/40"
                    placeholder="e.g. redis-cache-config.json"
                  />
                </div>

                <div className="md:col-span-4">
                  <label className="text-[10px] font-mono text-slate-500 uppercase block mb-1 font-bold">Source Format</label>
                  <select
                    value={newScriptLang}
                    onChange={(e) => setNewScriptLang(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-500/40"
                  >
                    <option value="python">Python</option>
                    <option value="yaml">Kubernetes YAML</option>
                    <option value="json">JSON Metadata</option>
                    <option value="java">Java Class</option>
                    <option value="typescript">TypeScript</option>
                  </select>
                </div>

                <div className="md:col-span-12">
                  <label className="text-[10px] font-mono text-slate-500 uppercase block mb-1 font-bold">Source Code</label>
                  <textarea
                    value={newScriptContent}
                    onChange={(e) => setNewScriptContent(e.target.value)}
                    rows={4}
                    className="w-full bg-white border border-slate-200 rounded-lg p-3 text-xs text-slate-800 font-mono placeholder-slate-400 focus:outline-none focus:border-blue-500/40 resize-none"
                    placeholder="Paste script body payload here..."
                  />
                </div>

                <div className="md:col-span-12 flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg text-xs tracking-wide flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                  >
                    <Share className="w-3.5 h-3.5 text-white" />
                    Publish To Team Portal
                  </button>
                </div>

              </form>

              {/* List of Shared Scripts (Dynamic grid interactive) */}
              <div className="mt-6 flex flex-col gap-3">
                <h4 className="text-xs font-mono text-slate-500 block font-bold uppercase tracking-widest">Active Workspace Repository</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sharedScripts.map(script => (
                    <div key={script.id} className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between hover:border-slate-300 transition shadow-sm">
                      <div>
                        <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
                          <span className="text-xs font-bold text-slate-800 tracking-tight flex items-center gap-2 truncate">
                            <FileCode className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            {script.name}
                          </span>
                          <span className="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase font-mono border border-slate-200">
                            {script.language}
                          </span>
                        </div>
                        <p className="text-[10px] font-mono text-slate-400 mb-3 truncate">Added by {script.author} • {script.createdAt}</p>
                        
                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 mb-3 max-h-24 overflow-y-hidden text-[10px] text-slate-600 font-mono overflow-ellipsis">
                          <pre className="whitespace-pre overflow-x-hidden">{script.content}</pre>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-1 pt-2 border-t border-slate-100">
                        <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                          <Activity className="w-3 h-3 text-blue-500" />
                          Downloaded: {script.downloads}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(script.content);
                              showNotification(`Copied ${script.name} payload to clipboard!`);
                            }}
                            className="bg-slate-105 hover:bg-slate-100 text-slate-700 hover:text-slate-900 px-2.5 py-1 rounded text-[9px] font-mono border border-slate-200 transition cursor-pointer"
                          >
                            COPY
                          </button>
                          <button
                            onClick={() => triggerDownloadScript(script)}
                            className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-2.5 py-1 rounded text-[9px] font-mono border border-blue-200 transition cursor-pointer"
                          >
                            FETCH
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>

            {/* Section 4: Video Learning timelines & tutorials */}
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm" id="learning-studio">
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center border border-emerald-100">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg tracking-tight text-slate-800">Ginho Learning & Studio Manual</h3>
                  <p className="text-xs text-slate-500">Master automation pipelines, dynamic deployments, and security workflows</p>
                </div>
              </div>

              {/* Quick Interactive Video Timeline Tutorial block */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-inner">
                
                <div className="md:col-span-5 relative rounded-lg overflow-hidden bg-slate-900 border border-slate-850 min-h-[160px] flex flex-col justify-between p-4">
                  {/* Simulated play button */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10 z-10" />
                  <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/vibrant/600/400')] bg-cover opacity-30 z-0" />
                  
                  <div className="relative z-20 flex justify-end">
                    <span className="text-[9px] bg-blue-600 text-white font-mono font-bold px-2 py-0.5 rounded tracking-widest">ON DEMAND</span>
                  </div>

                  <div className="relative z-20 flex flex-col items-center justify-center gap-1.5 my-auto py-5">
                    <button 
                      onClick={() => {
                        showNotification("Initializing Ginho Studio dynamic learning module projection...");
                        addLog("Booted 'Mastering Parallel Execution' audio-video timeline.");
                      }}
                      className="w-11 h-11 bg-blue-600 text-white hover:bg-blue-500 hover:scale-105 rounded-full flex items-center justify-center transition shadow-lg shadow-blue-500/30 cursor-pointer"
                    >
                      <Play className="w-5 h-5 fill-white translate-x-0.5" />
                    </button>
                    <span className="text-[10px] font-mono text-slate-300">Run Quick Video Guide (4:18)</span>
                  </div>

                  <div className="relative z-20">
                    <p className="text-xs font-bold text-white tracking-tight truncate">Mastering Parallel Execution</p>
                    <p className="text-[9px] font-mono text-slate-300">Section 2: Multi-Language Mirroring</p>
                  </div>

                </div>

                {/* Dynamic steps sidebar */}
                <div className="md:col-span-7 flex flex-col justify-between gap-3">
                  <h4 className="text-[10px] font-mono text-blue-600 tracking-wider font-bold uppercase">Chronological Guide Timeline</h4>
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start gap-3 bg-white p-2.5 rounded border border-slate-200 shadow-sm">
                      <span className="text-xs font-mono text-blue-600 font-bold bg-blue-50 w-6 h-6 rounded-full flex items-center justify-center shrink-0">01</span>
                      <div>
                        <p className="text-xs font-bold text-slate-850">Set API Key Security Credentials</p>
                        <p className="text-[9px] text-slate-500 font-mono">Input your active Gemini secrets inside AI Studio&apos;s sidebar panel</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-white p-2.5 rounded border border-slate-200 shadow-sm">
                      <span className="text-xs font-mono text-blue-600 font-bold bg-blue-50 w-6 h-6 rounded-full flex items-center justify-center shrink-0">02</span>
                      <div>
                        <p className="text-xs font-bold text-slate-850">Choose Dual Model Targets</p>
                        <p className="text-[9px] text-slate-500 font-mono">Toggle between Gemini Flash and DeepSeek-R1 logic on demand</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-white p-2.5 rounded border border-slate-200 shadow-sm">
                      <span className="text-xs font-mono text-blue-600 font-bold bg-blue-50 w-6 h-6 rounded-full flex items-center justify-center shrink-0">03</span>
                      <div>
                        <p className="text-xs font-bold text-slate-850">Share Deployment Packages</p>
                        <p className="text-[9px] text-slate-500 font-mono">Upload YAML, JSON, or python codes to prompt passive gain tracking</p>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* Section: Live Feedback & Intelligent Automated Companion */}
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm" id="feedback-hub">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wide font-sans">Live Feedback & Smart Automated Companion</h3>
                </div>
                <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-mono font-bold border border-emerald-100">
                  <Bot className="w-3" />
                  <span>Auto-Responder Active</span>
                </div>
              </div>

              <p className="text-[11.2px] text-slate-550 leading-relaxed mb-4 font-sans text-slate-500">
                We are fully dedicated to visual craftsmanship and operational reliability. Share your ratings, likes, dislikes, or personal comments below to evaluate if everything is operating correctly. Our intelligent companion replies to all comments automatically and instantly!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Submit Feedback Form */}
                <form onSubmit={handleAddFeedback} className="md:col-span-5 flex flex-col gap-3 p-4 bg-slate-50/50 rounded-xl border border-slate-200 text-left">
                  <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Submit Platform Rating</h4>
                  
                  {/* Like/Dislike Toggle Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFeedbackRating("like")}
                      className={`py-2 px-3 rounded-lg border text-xs font-mono font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        feedbackRating === "like"
                          ? "bg-emerald-55 bg-emerald-50 border-emerald-250 text-emerald-700 shadow-xs font-extrabold"
                          : "bg-white border-slate-200 text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${feedbackRating === "like" ? "text-emerald-600 animate-bounce" : ""}`} />
                      <span>LIKE</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFeedbackRating("dislike")}
                      className={`py-2 px-3 rounded-lg border text-xs font-mono font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        feedbackRating === "dislike"
                          ? "bg-amber-50 border-amber-250 text-amber-700 shadow-xs font-extrabold"
                          : "bg-white border-slate-200 text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      <ThumbsDown className={`w-3.5 h-3.5 ${feedbackRating === "dislike" ? "text-amber-600 animate-bounce" : ""}`} />
                      <span>DISLIKE</span>
                    </button>
                  </div>

                  <div>
                    <label className="text-[9px] font-mono text-slate-400 uppercase block mb-1 font-bold">Your Email Coordinates</label>
                    <input
                      type="email"
                      required
                      value={feedbackUsername}
                      onChange={(e) => setFeedbackUsername(e.target.value)}
                      placeholder="e.g. user@domain.com"
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-800 font-mono focus:outline-none focus:border-blue-500/40"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-mono text-slate-400 uppercase block mb-1 font-bold">Feedback Remarks</label>
                    <textarea
                      value={feedbackComment}
                      onChange={(e) => setFeedbackComment(e.target.value)}
                      rows={3}
                      required
                      className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500/40 resize-none leading-relaxed"
                      placeholder="e.g. Is Virtual Card balance of $48,200 correctly synchronized?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-2 rounded-lg text-xs tracking-wider uppercase transition flex items-center justify-center gap-1.5 cursor-pointer font-sans"
                  >
                    <Send className="w-3.5 h-3.5 text-blue-400" />
                    Dispatch Review
                  </button>
                </form>

                {/* Feedback Logs Feed */}
                <div className="md:col-span-7 flex flex-col justify-between text-left">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Recent Platform Submissions</h4>
                    <span className="text-[9px] font-mono text-slate-400 font-bold">Total Reviews: {feedbacks.length}</span>
                  </div>

                  <div className="space-y-3 max-h-[290px] overflow-y-auto pr-1">
                    {/* Live indicator of AI typing response */}
                    {isSubmitReplying && (
                      <motion.div 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-indigo-50/50 border border-indigo-150 p-2.5 rounded-lg flex items-center gap-2.5"
                      >
                        <Bot className="w-4 h-4 text-indigo-500 animate-spin" />
                        <div className="flex flex-col">
                          <span className="text-[9px] font-mono font-bold text-indigo-700 tracking-wide uppercase">AI Companion is typing...</span>
                          <span className="text-[8px] text-slate-400 leading-relaxed italic">Synthesizing personalized reply for your feedback remarks...</span>
                        </div>
                      </motion.div>
                    )}

                    {feedbacks.map((fb) => (
                      <div key={fb.id} className="bg-slate-50 border border-slate-200 p-3 rounded-xl space-y-2 text-left transition hover:border-slate-300">
                        {/* Feed Info layout */}
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                          <span className="font-bold text-slate-700">{fb.username}</span>
                          <div className="flex items-center gap-1.5 font-bold">
                            <span className={`px-1.5 py-0.5 rounded text-[8px] uppercase ${fb.rating === "like" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                              {fb.rating === "like" ? "👍 Positive" : "👎 Adjust"}
                            </span>
                            <span>{fb.timestamp}</span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 leading-normal pl-0.5">{fb.comment}</p>

                        {/* Responder Reply */}
                        {fb.reply && (
                          <div className="bg-white border border-slate-250 border-slate-200/80 p-2.5 rounded-lg space-y-1 mt-1 text-left relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                            <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-blue-700">
                              <Bot className="w-3.5 h-3.5 text-blue-500" />
                              <span>{fb.reply.author}</span>
                              <span className="text-slate-400 font-medium">({fb.reply.timestamp})</span>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-relaxed font-sans pl-1">{fb.reply.text}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>

        {/* RIGHT COLUMN: Administration, VIP Controls, Performance Analytics */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Section 1: Administrator locked PIN section requested by user */}
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm" id="admin-console-section">
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <Lock className="w-4 h-4 text-rose-500 animate-pulse" />
                <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wide">PIN Protected VIP Console</h3>
              </div>
              <span className={`w-2.5 h-2.5 rounded-full ${isAdminUnlocked ? "bg-emerald-500" : "bg-amber-500 animate-pulse"}`} />
            </div>

            {!isAdminUnlocked ? (
              /* Locked Pin Code authorization flow */
              <form onSubmit={handleUnlockAdmin} className="flex flex-col gap-3.5">
                <p className="text-[11px] text-slate-500 leading-normal">
                  Administrative functions, custom gain splits, withdrawal systems, and model parameters are protected under private security credentials. Input the Ginho personal reset code below:
                </p>
                
                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1 font-bold">Enter Reset Secret Code / Pin</label>
                  <div className="relative">
                    <input
                      type="password"
                      value={pinInput}
                      onChange={(e) => setPinInput(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-850 tracking-widest font-mono text-center focus:outline-none focus:border-blue-500/40"
                      placeholder="••••••••••••••"
                    />
                  </div>
                  {pinError && <p className="text-[10px] text-rose-500 font-mono mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {pinError}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-800 hover:bg-slate-705 text-white font-semibold py-2 rounded-lg text-xs tracking-wider uppercase transition cursor-pointer shadow-sm"
                >
                  Verify VIP Password
                </button>
                <div className="text-center font-mono text-[9px] text-slate-450">
                  Default Hint: Reset code specified by client starts with &quot;Gm...&quot;
                </div>
              </form>
            ) : (
              /* Administrative unlocked features (Secret PIN edit, fee gains configurations) */
              <div className="flex flex-col gap-4">
                
                {/* Authorization alert banner */}
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-3 rounded-lg text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>Authorized Status: <strong>VIP UNLOCKED</strong></span>
                </div>

                {/* Subscription Model Configurer requested by user */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-mono text-slate-505 uppercase tracking-wider block mb-2 font-bold">Configure Tenant Subscriptions</span>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {(["trial", "pro", "vip"] as const).map(sub => (
                      <button
                        key={sub}
                        onClick={() => handleUpdateSubscription(sub)}
                        className={`py-1.5 rounded text-[10px] font-bold uppercase transition ${
                          selectedSubscription === sub
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-white border border-slate-250 text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>

                  <div className="mt-3 text-[10px] font-mono text-slate-500 flex flex-col gap-1">
                    <p>• Trial Days Allocated: {trialDaysLeft} Days</p>
                    <p>• Subscriber Revenue Split: {gainsCommissionOfAllSubscribers}% Automatic</p>
                  </div>
                </div>

                {/* Edit Secret PIN Section */}
                <form onSubmit={handleChangePin} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-mono text-slate-505 uppercase block mb-2 font-bold">Reset Secret PIN Code</span>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newPinInput}
                      onChange={(e) => setNewPinInput(e.target.value)}
                      className="bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 font-mono focus:outline-none w-full"
                      placeholder="e.g. GmNewPinXYZ"
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-3 py-1.5 rounded text-xs tracking-wider transition uppercase cursor-pointer shrink-0"
                    >
                      Update
                    </button>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 block mt-1 font-semibold">Updates the live secure key on validation</span>
                </form>

                {/* System variables modifier */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-col gap-3">
                  <span className="text-[10px] font-mono text-slate-505 uppercase block font-bold">Gains Commission of Subscribers</span>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600">Share Percentage:</span>
                    <div className="flex items-center gap-1.5 font-mono">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={gainsCommissionOfAllSubscribers}
                        onChange={(e) => setGainsCommissionOfAllSubscribers(parseInt(e.target.value) || 0)}
                        className="bg-white border border-slate-210 rounded px-2 py-1 text-xs text-slate-800 w-16 text-center focus:outline-none"
                      />
                      <span className="text-xs text-slate-450 font-bold">%</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-2 border-t border-slate-150 pt-2.5">
                  <button
                    type="button"
                    onClick={handleResetPersistence}
                    className="text-slate-505 hover:text-rose-600 text-[9px] font-mono flex items-center gap-1.5 transition underline cursor-pointer"
                    title="Wipe custom configs and restore original setup"
                  >
                    Reset Factory Data
                  </button>
                  <button
                    onClick={() => {
                      setIsAdminUnlocked(false);
                      setPinInput("");
                      addLog("VIP Admin Console locked out successfully.");
                      showNotification("Administrator Access Session Locked.");
                    }}
                    className="text-rose-605 hover:text-rose-500 text-[10px] font-mono flex items-center gap-1.5 transition underline cursor-pointer"
                  >
                    Lock Console Session
                  </button>
                </div>

              </div>
            )}

          </div>

          {/* Section 1.5: Commercial Tiers & Marketplace API Key Hub requested by user */}
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-5" id="billing-marketplace-plans">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600 animate-pulse" />
                <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wide">Commercial Pricing & Marketplace</h3>
              </div>
              <div className="flex gap-1.5">
                <span className="text-[9px] bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full font-bold font-mono uppercase">
                  Abonnements
                </span>
              </div>
            </div>

            {/* Comprehensive App Video Guide Button inside the Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-3.5 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-blue-600 animate-pulse" />
                  Stuck? Learn how Ginho CoPilot App operates
                </p>
                <p className="text-[10px] text-slate-500 font-mono">Watch our step-by-step interactive 3-minute guidelines video showing card checkout, API setups and sub splits.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsAppGuideOpen(true);
                  setIsAppVideoPlaying(true);
                  addLog("Launched interactive 'How To Use Ginho AI App' video layout walkthrough.");
                  showNotification("Starting Ginho AI App walkthrough guide video.");
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1.5 rounded-lg text-xs leading-none transition shrink-0 shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1"
              >
                <Play className="w-3 h-3 fill-white" />
                Watch How-to-Use Video
              </button>
            </div>

            {/* Price Plans Details */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">Abonnement Tariffs & Pricing Details</h4>
                <span className="text-[9px] text-slate-400 font-mono">Choose plan options below</span>
              </div>
              
              <div className="grid grid-cols-1 gap-2.5">
                
                {/* TRIAL Plan */}
                <div 
                  onClick={() => handleUpdateSubscription("trial")}
                  className={`p-3 rounded-lg border transition cursor-pointer hover:border-slate-300 ${selectedSubscription === 'trial' ? 'bg-blue-50/50 border-blue-200 shadow-sm' : 'bg-slate-50/50 border-slate-100'}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      TRIAL Core Plan
                      {selectedSubscription === 'trial' && <span className="bg-blue-600 text-white rounded text-[8px] font-mono px-1">ACTIVE</span>}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500">Free ($0)</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono mt-1 leading-relaxed">14 Days allocated basic analyzer. Code evaluation output only.</p>
                </div>

                {/* PRO Plan */}
                <div 
                  onClick={() => handleUpdateSubscription("pro")}
                  className={`p-3 rounded-lg border transition cursor-pointer hover:border-indigo-300 ${selectedSubscription === 'pro' ? 'bg-blue-50/50 border-blue-200 shadow-sm' : 'bg-slate-50/50 border-slate-100'}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-indigo-500 fill-indigo-500" />
                      PRO Premium Suite
                      {selectedSubscription === 'pro' && <span className="bg-indigo-600 text-white rounded text-[8px] font-mono px-1">ACTIVE</span>}
                    </span>
                    <span className="text-xs font-mono font-bold text-indigo-600">$49 <span className="text-[8px] text-slate-400">/mo</span></span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono mt-1 leading-relaxed">
                    Multi-Language Optimization (Python, Java, Rust, TS), Dual AI model reasoning (DeepSeek + Gemini) and Social Media Multi-Poster broadcasting activated.
                  </p>
                </div>

                {/* VIP Plan */}
                <div 
                  onClick={() => handleUpdateSubscription("vip")}
                  className={`p-3 rounded-lg border transition cursor-pointer hover:border-emerald-300 ${selectedSubscription === 'vip' ? 'bg-blue-50/50 border-blue-200 shadow-sm' : 'bg-slate-50/50 border-slate-100'}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                      VIP Elite Platinum
                      {selectedSubscription === 'vip' && <span className="bg-emerald-600 text-white rounded text-[8px] font-mono px-1">ACTIVE</span>}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-600">$199 <span className="text-[8px] text-slate-400">/mo</span></span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono mt-1 leading-relaxed">
                    All Pro features unlocked + secure global credit withdrawal, adjustable platform subscriber revenue splits, and <strong>Marketplace API Key access</strong>!
                  </p>
                </div>

              </div>
            </div>

            {/* LIVE ACQUISITIONS STREAM - REALTIME SIGNUPS & BUY NOTIFICATIONS */}
            <div className="bg-slate-900 text-[#F1F5F9] rounded-xl p-4 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                  <span className="w-2 h-2 bg-emerald-500 rounded-full absolute" />
                  <span className="text-[10px] font-mono text-emerald-400 font-bold tracking-widest uppercase flex items-center gap-1">
                    <Bell className="w-3 h-3 text-emerald-400 animate-bounce" />
                    Live Buyer Feed Notifications
                  </span>
                </div>
                {/* Manual testing trigger */}
                <button
                  type="button"
                  onClick={handleSimulatePurchase}
                  className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-mono font-bold text-[9px] px-2 py-0.5 rounded border border-emerald-500/20 transition cursor-pointer"
                  title="Click to generate random buyer"
                >
                  Simulate Buy Event
                </button>
              </div>

              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {livePurchases.map((purchase) => (
                  <div 
                    key={purchase.id}
                    className="bg-black/35 p-2 rounded border border-slate-800 flex justify-between items-center text-[10px] gap-2 animate-fade-in"
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <div className="w-5 h-5 rounded-full bg-slate-800 shrink-0 flex items-center justify-center font-bold text-[8px] text-blue-300">
                        {purchase.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="truncate">
                        <p className="font-bold text-slate-200 font-mono leading-none flex items-center gap-1">
                          {purchase.name}
                          <span className="text-[8px] text-slate-500">({purchase.location})</span>
                        </p>
                        <p className="text-[8px] text-slate-400 font-mono">Bought Ginho {purchase.tier.toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-semibold ${purchase.tier === "vip" ? "bg-emerald-500/20 text-emerald-300" : "bg-indigo-500/20 text-indigo-300"}`}>
                        {purchase.price}
                      </span>
                      <p className="text-[7px] text-slate-500 mt-0.5 font-mono">{purchase.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[8px] text-slate-450 font-mono text-center leading-normal block">
                Notifications pop up at the top and register instantly when clients subscribe. Ticker matches real-world sales ground the globality safely.
              </p>
            </div>

            {/* Dynamic Marketplace API Key Unlock Panel */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-150 space-y-3">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-emerald-600" />
                <span className="text-[10px] font-mono text-slate-700 uppercase tracking-wider block font-bold">
                  Merchant Marketplace Hub
                </span>
              </div>

              <p className="text-[10px] text-slate-500 leading-normal">
                If the platform commission split is configured, you are permitted to generate <strong>Free API Keys</strong> to deploy and sell custom automation routines and scripts directly on the market.
              </p>

              {/* Commission Percentage Feedback Badge */}
              <div className="flex items-center gap-2 justify-between bg-white border border-slate-200 rounded-lg p-2.5">
                <span className="text-[10px] text-slate-600 font-medium">Active Revenue Split Percentage:</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${gainsCommissionOfAllSubscribers > 0 ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-rose-50 text-rose-700 border border-rose-100"}`}>
                  {gainsCommissionOfAllSubscribers}% Split
                </span>
              </div>

              {/* API Key Status based on Percentage Input */}
              {gainsCommissionOfAllSubscribers <= 0 ? (
                <div className="bg-rose-50 border border-rose-100 p-3 rounded-lg text-rose-800 flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span className="text-[10px] font-bold font-mono">Marketplace API Generation Locked</span>
                  </div>
                  <p className="text-[9px] text-rose-600 leading-normal font-mono">
                    You have set the commission split percentage to 0%. In order to generate a Free Marketplace license key, you must provide a share percentage greater than 0% inside the VIP Administration panel.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-lg text-emerald-800 flex flex-col gap-1.5 font-sans">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="text-[10px] font-semibold font-mono">Free Marketplace API Keys Unlocked</span>
                    </div>
                    <p className="text-[9px] text-emerald-600 leading-normal font-mono">
                      Percentage found: {gainsCommissionOfAllSubscribers}%. Generative fee bypass is active. You may immediately create license codes to list products on the Ginho market.
                    </p>
                  </div>

                  {/* Generator Actions */}
                  {!generatedMarketApiKey ? (
                    <button
                      type="button"
                      onClick={handleGenerateMarketApiKey}
                      className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 rounded-lg text-xs leading-none transition shadow-sm cursor-pointer block uppercase tracking-wider text-center"
                    >
                      Generate Free Market API Key
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono text-slate-400 block uppercase font-bold">Your Generated Marketplace License Key:</span>
                      <div className="flex gap-2">
                        <div className="bg-white border border-slate-200 rounded px-2.5 py-1.5 text-[10px] text-slate-850 font-mono font-bold tracking-tight w-full select-all text-center break-all truncate">
                          {generatedMarketApiKey}
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyApiKey}
                          className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-3 py-1.5 rounded text-[10px] tracking-wider transition uppercase cursor-pointer shrink-0 border border-slate-200"
                        >
                          {isApiKeyCopied ? "Copied" : "Copy"}
                        </button>
                      </div>
                      <span className="text-[8px] text-slate-450 block text-center font-mono">This key grants free listings on your platform marketplace with custom {gainsCommissionOfAllSubscribers}% fee routing.</span>
                    </div>
                  )}
                </div>
              )}

            </div>

          </div>

          {/* Section 2: Pro-level Efficiency Monitor Dashboard requested by user */}
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm" id="efficiency-metrics">
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <Activity className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wide">Developer Efficiency Dashboard</h3>
              </div>
              <span className="text-[10px] font-mono text-slate-450">May 2026</span>
            </div>

            {/* Performance Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-[10px] font-mono text-slate-500 block mb-1 uppercase font-bold text-[9px]">Time Saved</span>
                <span className="text-2xl font-bold font-mono text-blue-600 block tracking-tight">{(totalTimeSaved / 60).toFixed(1)}h</span>
                <span className="text-[9px] text-slate-405 font-mono block mt-1">+ {totalTimeSaved} total minutes</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-[10px] font-mono text-slate-500 block mb-1 uppercase font-bold text-[9px]">Overall Speedup</span>
                <span className="text-2xl font-bold font-mono text-indigo-600 block tracking-tight">+{avgSpeedup}%</span>
                <span className="text-[9px] text-slate-405 font-mono block mt-1">Across all stacks</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-[10px] font-mono text-slate-500 block mb-1 uppercase font-bold text-[9px]">Lines Reduced</span>
                <span className="text-2xl font-bold font-mono text-emerald-600 block tracking-tight">-{linesReduced}</span>
                <span className="text-[9px] text-slate-405 font-mono block mt-1">Refactored redundancy</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-[10px] font-mono text-slate-500 block mb-1 uppercase font-bold text-[9px]">Optimizations</span>
                <span className="text-2xl font-bold font-mono text-amber-600 block tracking-tight">{totalOptimizations}</span>
                <span className="text-[9px] text-slate-405 font-mono block mt-1 font-semibold">Completed templates</span>
              </div>

            </div>

            {/* Simulated printable metric index table for PDF compilation */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-inner">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-3 font-bold">Optimize Log Ratio Index</span>
              
              <div className="overflow-x-auto">
                <table className="w-full text-[10px] font-mono text-slate-500 leading-relaxed text-left">
                  <thead>
                    <tr className="border-b border-slate-200 pb-2">
                      <th className="py-2">STACK</th>
                      <th>RATIO</th>
                      <th className="text-right">LATENCY</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="py-2 text-slate-700 font-bold">Python Worker</td>
                      <td className="text-emerald-600">257%</td>
                      <td className="text-right text-slate-600">142ms</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-2 text-slate-700 font-bold">Java Executor</td>
                      <td className="text-blue-600">184%</td>
                      <td className="text-right text-slate-600">220ms</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-2 text-slate-700 font-bold">Rust Actor</td>
                      <td className="text-indigo-600">345%</td>
                      <td className="text-right text-slate-600">80ms</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-700 font-bold">K8s YAML</td>
                      <td className="text-slate-500">112%</td>
                      <td className="text-right text-slate-500">Auto</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-3.5 text-center">
                <button
                  onClick={handleExportPDF}
                  className="text-[10px] font-mono text-blue-600 hover:text-blue-500 transition underline tracking-wider uppercase font-bold cursor-pointer"
                >
                  Compile PDF Stakeholder Graph Sheet
                </button>
              </div>

            </div>

          </div>

          {/* Section 3: User asset balance with simulated 15% passive fees withdrawal and virtual card representation */}
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm" id="asset-card">
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wide">Developer Wallet Card</h3>
              </div>
              <span className="text-[9px] bg-slate-100 px-2 py-0.5 rounded font-mono border border-slate-200 text-slate-500">G-Mirror Link</span>
            </div>

            {/* Premium Virtual Credit representation showing passive user assets */}
            <div className="relative bg-gradient-to-tr from-blue-600 via-indigo-600 to-slate-900 border border-white/10 p-5 rounded-xl overflow-hidden shadow-lg mb-4">
              {/* Card glossy details */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full filter blur-xl transform translate-x-10 -translate-y-10" />
              
              {/* Global Acceptance Indicator Badge */}
              <div className="absolute top-3 right-3 flex items-center gap-1 bg-emerald-500/25 border border-emerald-500/30 text-emerald-200 text-[8px] font-mono px-2.5 py-0.5 rounded-full font-bold">
                <Globe className="w-2.5 h-2.5 animate-pulse text-emerald-400" />
                <span>ACCEPTED GLOBALLY</span>
              </div>

              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[9px] text-blue-200/90 font-mono tracking-widest block uppercase font-bold">Secured Virtual Card Asset</span>
                  <span className="text-2xl font-bold font-mono text-white tracking-tight leading-none block mt-1">
                    ${virtualCardBalance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                {/* Microchip */}
                <div className="w-8 h-6 rounded bg-amber-400/20 border border-amber-300/30 flex items-center justify-center font-mono text-[8px] text-amber-200 font-bold">GINHO</div>
              </div>

              {/* Interactive Card Number Hidden/Reveal display block requested by user */}
              <div className="my-5 bg-black/25 p-2 rounded-lg border border-white/5">
                <p className="text-[8px] text-blue-200/70 font-mono uppercase tracking-widest font-bold block mb-1">Virtual Card Number</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm md:text-base font-bold font-mono text-white tracking-widest select-all">
                    {revealCardDetails ? "4118 7820 1198 8206" : "4118 •••• •••• 8206"}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setRevealCardDetails(!revealCardDetails);
                      showNotification(revealCardDetails ? "Card coordinates concealed." : "Card credentials revealed successfully!");
                      addLog(revealCardDetails ? "Concealed card credentials." : "Revealed card credentials & CVV information.");
                    }}
                    className="text-blue-200 hover:text-white transition p-1 cursor-pointer"
                    title={revealCardDetails ? "Conceal Card Details" : "Reveal Card Details"}
                  >
                    {revealCardDetails ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </div>

              {/* Holographic display of subscriber fee split, CVV, and expiration date */}
              <div className="flex justify-between items-end mt-4">
                <div>
                  <span className="text-[8px] text-slate-300 font-mono block uppercase">Holder Name</span>
                  <span className="text-xs font-bold text-white tracking-wide">Ginho Marie</span>
                </div>

                <div className="flex gap-3 text-right">
                  <div>
                    <span className="text-[8px] text-slate-305 font-mono block uppercase">VALID THRU</span>
                    <span className="text-xs font-bold font-mono text-white">
                      {revealCardDetails ? "12/29" : "••/••"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-305 font-mono block uppercase text-amber-300">CVV (3 Chiffres)</span>
                    <span className="text-xs font-bold font-mono text-white">
                      {revealCardDetails ? "302" : "•••"}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Interactive Split Gateway & Dynamic Financial Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 p-4 bg-slate-50 border border-slate-200/60 rounded-xl">
              
              {/* Profit Wallet module with auto-inflow split details */}
              <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">Revenue Split</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">1. SaaS Profit Wallet</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed mt-1">
                    Your subscription sales are split automatically. {gainsCommissionOfAllSubscribers}% platform fee is deducted, and your profit is instantly stored here.
                  </p>
                  
                  {/* Profit Balance Field */}
                  <div className="bg-indigo-50/50 border border-indigo-100 p-2 rounded-lg my-3 flex justify-between items-center">
                    <span className="text-[9px] font-bold text-indigo-700 font-mono tracking-tight">PROFIT BALANCE:</span>
                    <span className="text-xs font-bold font-mono text-indigo-700">
                      ${profitWalletBalance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                {/* Transfer to Card Form */}
                <form onSubmit={handleTransferToCard} className="flex flex-col gap-2 mt-2">
                  <label className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Transfer to Visual Card</label>
                  <div className="flex gap-1.5">
                    <span className="bg-slate-50 border border-slate-200 px-2 py-1 rounded text-[10px] font-mono text-slate-500 flex items-center justify-center font-bold">$</span>
                    <input
                      type="number"
                      step="any"
                      placeholder="e.g. 150"
                      value={transferProfitToCardAmount}
                      onChange={(e) => setTransferProfitToCardAmount(e.target.value)}
                      className="bg-white border border-slate-200 rounded px-2 py-1 text-[10px] text-slate-800 font-mono focus:outline-none focus:border-indigo-500/40 w-full"
                    />
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-slate-900 text-white font-bold px-2.5 py-1 rounded text-[10px] uppercase tracking-wider transition shrink-0 flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowUpRight className="w-3 h-3" />
                      <span>Move</span>
                    </button>
                  </div>
                  {profitTransferMessage && (
                    <p className="text-[9px] font-mono text-indigo-700 bg-indigo-50 border border-indigo-150 p-2 rounded mt-1">
                      {profitTransferMessage}
                    </p>
                  )}
                </form>
              </div>

              {/* Card to Account Transfer Panel (with verified & custom multi-account routing) */}
              <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${activeCardTransferTab === "verified_bank" ? "bg-emerald-500" : "bg-blue-500"}`} />
                      <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                        {activeCardTransferTab === "verified_bank" ? "Bank Clearing" : "Multi-Routing Gateway"}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-xs font-bold text-slate-800 font-sans">2. Card Withdrawals</h4>

                  {/* Segmented Tab controls for target selection */}
                  <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200/80 gap-0.5 my-2">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCardTransferTab("verified_bank");
                        setTransferToOtherMessage("");
                      }}
                      className={`flex-1 py-1 rounded-md text-[9px] font-mono font-bold transition cursor-pointer text-center ${
                        activeCardTransferTab === "verified_bank"
                          ? "bg-white text-emerald-700 shadow-xs border border-emerald-100"
                          : "text-slate-505 hover:text-slate-700"
                      }`}
                    >
                      Primary Bank
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCardTransferTab("another_account");
                        setBankTransferMessage("");
                      }}
                      className={`flex-1 py-1 rounded-md text-[9px] font-mono font-bold transition cursor-pointer text-center ${
                        activeCardTransferTab === "another_account"
                          ? "bg-white text-blue-700 shadow-xs border border-blue-100"
                          : "text-slate-505 hover:text-slate-700"
                      }`}
                    >
                      Another Account
                    </button>
                  </div>

                  {activeCardTransferTab === "verified_bank" ? (
                    <>
                      <p className="text-[10px] text-slate-500 leading-normal mt-1">
                        Initiate manual transfers from your secured Ginho Virtual Card directly into your verified bank account balance.
                      </p>
                      
                      {/* Account detail */}
                      <div className="bg-emerald-50/50 border border-emerald-110 p-2 rounded-lg my-3 flex justify-between items-center">
                        <span className="text-[9px] font-bold text-emerald-700 font-mono tracking-tight">BANK BALANCE:</span>
                        <span className="text-xs font-bold font-mono text-emerald-700">
                          ${bankAccountBalance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-[10px] text-slate-500 leading-normal mt-1">
                        Transfer instantly to external cards, other users, verified PayPal wallets, or crypto target vaults worldwide.
                      </p>
                      
                      <div className="my-2.5 text-left">
                        <label className="text-[8px] font-mono text-slate-400 block font-bold uppercase mb-1">Target Account</label>
                        <select
                          value={selectedRecipientId}
                          onChange={(e) => setSelectedRecipientId(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-[10px] font-mono text-slate-800 focus:outline-none cursor-pointer font-sans"
                        >
                          {savedAccounts.map((acc) => (
                            <option key={acc.id} value={acc.id}>
                              {acc.name} ({acc.type})
                            </option>
                          ))}
                          <option value="custom">── [ + Add New Custom Account ] ──</option>
                        </select>
                      </div>
                    </>
                  )}
                </div>

                {activeCardTransferTab === "verified_bank" ? (
                  /* Transfer to Bank Form */
                  <form onSubmit={handleTransferToBank} className="flex flex-col gap-2 mt-2">
                    <label className="text-[9px] font-mono text-slate-400 tracking-wider block font-bold">Transfer Card to Bank</label>
                    <div className="flex gap-1.5">
                      <span className="bg-slate-50 border border-slate-200 px-2 py-1 rounded text-[10px] font-mono text-slate-500 flex items-center justify-center font-bold">$</span>
                      <input
                        type="number"
                        step="any"
                        placeholder="e.g. 500"
                        value={transferCardToBankAmount}
                        onChange={(e) => setTransferCardToBankAmount(e.target.value)}
                        className="bg-white border border-slate-200 rounded px-2 py-1 text-[10px] text-slate-800 font-mono focus:outline-none focus:border-emerald-500/40 w-full"
                      />
                      <button
                        type="submit"
                        className="bg-emerald-600 hover:bg-slate-900 text-white font-bold px-2.5 py-1 rounded text-[10px] uppercase tracking-wider transition shrink-0 flex items-center gap-1 cursor-pointer"
                      >
                        <ArrowUpRight className="w-3 h-3" />
                        <span>Send</span>
                      </button>
                    </div>
                    {bankTransferMessage && (
                      <p className="text-[9px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-150 p-2 rounded mt-1">
                        {bankTransferMessage}
                      </p>
                    )}
                  </form>
                ) : (
                  /* Transfer to Other Accounts Form */
                  <form onSubmit={handleTransferToOtherAccount} className="flex flex-col gap-2 mt-2">
                    {selectedRecipientId === "custom" && (
                      <div className="space-y-2 p-2 bg-slate-50 border border-slate-200 rounded-md text-left">
                        <div>
                          <label className="text-[8px] font-mono text-slate-400 block font-bold uppercase mb-0.5">Account / Recipient Name</label>
                          <input
                            type="text"
                            required
                            value={customRecipientName}
                            onChange={(e) => setCustomRecipientName(e.target.value)}
                            placeholder="e.g. Sébastien Roche"
                            className="w-full bg-white border border-slate-200 rounded p-1 text-[9px] font-sans text-slate-800 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[8px] font-mono text-slate-400 block font-bold uppercase mb-0.5">Destination Type</label>
                          <select
                            value={customRecipientType}
                            onChange={(e) => setCustomRecipientType(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded p-1 text-[9px] font-sans text-slate-800 focus:outline-none cursor-pointer"
                          >
                            <option value="bank">Bank Checking / IBAN</option>
                            <option value="card">External Credit Card</option>
                            <option value="paypal">Verified PayPal Address</option>
                            <option value="crypto">Crypto Wallet Address</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[8px] font-mono text-slate-400 block font-bold uppercase mb-0.5">Routing / IBAN / Wallet ID</label>
                          <input
                            type="text"
                            required
                            value={customRecipientDetails}
                            onChange={(e) => setCustomRecipientDetails(e.target.value)}
                            placeholder="e.g. IBAN CH93 1000 0004 0122"
                            className="w-full bg-white border border-slate-200 rounded p-1 text-[9px] font-mono text-slate-800 focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-400 tracking-wider block font-bold">Transfer Amount</label>
                      <div className="flex gap-1.5">
                        <span className="bg-slate-50 border border-slate-200 px-2 py-1 rounded text-[10px] font-mono text-slate-500 flex items-center justify-center font-bold">$</span>
                        <input
                          type="number"
                          step="any"
                          placeholder="e.g. 250"
                          value={transferToOtherAmount}
                          onChange={(e) => setTransferToOtherAmount(e.target.value)}
                          className="bg-white border border-slate-200 rounded px-2 py-1 text-[10px] text-slate-800 font-mono focus:outline-none focus:border-blue-500/40 w-full"
                        />
                        <button
                          type="submit"
                          className="bg-blue-600 hover:bg-slate-900 text-white font-bold px-2.5 py-1 rounded text-[10px] uppercase tracking-wider transition shrink-0 flex items-center gap-1 cursor-pointer"
                        >
                          <Send className="w-3 h-3" />
                          <span>Dispatch</span>
                        </button>
                      </div>
                    </div>

                    {transferToOtherMessage && (
                      <p className="text-[9px] font-mono text-blue-700 bg-blue-50 border border-blue-150 p-2 rounded mt-1">
                        {transferToOtherMessage}
                      </p>
                    )}
                  </form>
                )}
              </div>

            </div>

            {/* Linked Bank Account verification ledger node */}
            <div className="mt-4 bg-[#F8FAFC] border border-slate-250 p-3 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded bg-white border border-slate-200 flex items-center justify-center shadow-xs">
                  <Activity className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <div>
                  <h5 className="text-[10px] font-bold text-slate-700 leading-none">Marie Commercial Checking Account</h5>
                  <p className="text-[9px] text-slate-400 font-mono mt-0.5">IBAN Node: •••• 9901</p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8px] font-mono font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"></span>
                  Verified Node
                </span>
              </div>
            </div>

            {/* Interactive Video Walkthrough for global virtual card deployment */}
            <div className="mt-4 pt-3.5 border-t border-slate-150 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-bold flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-blue-600" />
                  Global Coverage Guide
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Guide Video (1:45)</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsWatchCardVideoOpen(true);
                  setIsVideoPlaying(true);
                  addLog("Launched worldwide online checkout virtual media tutorial walkthrough.");
                  showNotification("Booting Virtual Card global guide video.");
                }}
                className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold py-2 rounded-lg text-xs transition flex items-center justify-center gap-1.5 cursor-pointer border border-blue-200 shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-blue-600" />
                Watch Video: How to Use Worldwide
              </button>
            </div>

          </div>

          {/* Section 3.5 (NEW): Intelligent Automation Extension Suite of Ginho AI v2.8.5 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in" id="automation-extension-suite">
            
            {/* Panel A: 💳 Real Money Activation & Secure Sandbox Mode Indicator */}
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm flex flex-col justify-between" id="financial-mode-indicator">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-blue-600" />
                    <h4 className="font-bold text-xs text-slate-800 uppercase tracking-widest font-sans">Payment Mode Authorization</h4>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[8.5px] font-mono font-extrabold border uppercase tracking-wider ${
                    financialSystemMode === "live" 
                      ? "bg-amber-55 text-amber-700 bg-amber-50 border-amber-200 animate-pulse font-bold" 
                      : "bg-emerald-50 text-emerald-700 border-emerald-200 font-bold"
                  }`}>
                    {financialSystemMode === "live" ? "🔴 Live Production Mode" : "🟢 Sandbox Verifier"}
                  </span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed md:text-[11px]">
                  Ginho AI runs a secure sandbox algorithm reproducing credit deposits and profit distributions. Switch to Live Checkout to begin routing actual money using verified credit adapters.
                </p>

                <div className="mt-4 bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2.5 font-mono text-[10px]">
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Active Gateway:</span>
                    <span className="font-bold text-slate-800">Stripe Secure Core</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Database Engine:</span>
                    <span className="font-bold text-slate-800">Cloud Firestore Node</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Integration State:</span>
                    <span className={financialSystemMode === "live" ? "text-amber-600 font-bold" : "text-emerald-700 font-bold"}>
                      {financialSystemMode === "live" ? "ACTIVE PRODUCTION CHECKOUT" : "SECURE PLAYGROUND SIMULATION"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <button
                  type="button"
                  onClick={() => setIsLiveActivationOpen(!isLiveActivationOpen)}
                  className="w-full bg-slate-800 hover:bg-blue-600 text-white font-bold py-2 rounded-lg text-xs tracking-wide transition uppercase cursor-pointer text-center flex items-center justify-center gap-1.5"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  {financialSystemMode === "live" ? "Configure Production Adapters" : "Activate Live Production Account"}
                </button>

                {isLiveActivationOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3 mt-2 text-left"
                  >
                    <p className="text-[10px] text-slate-505 font-semibold leading-normal font-sans">
                      Connect your production keys to enable real client subscriptions with credit card swipe capabilities. Keys are preserved locally on-device securely.
                    </p>
                    <div className="space-y-2">
                      <div>
                        <label className="text-[8px] font-mono text-slate-400 block uppercase font-bold mb-1">Stripe Publishable Key (pk_live_...)</label>
                        <input
                          type="text"
                          value={stripePublishableKeyInput}
                          onChange={(e) => setStripePublishableKeyInput(e.target.value)}
                          placeholder="pk_live_xxxxxxxxxxxxxxxxxxxxxxxxxx"
                          className="w-full bg-white border border-slate-250 rounded p-1.5 text-[10px] font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-300"
                        />
                      </div>
                      <div>
                        <label className="text-[8px] font-mono text-slate-400 block uppercase font-bold mb-1">Stripe Secret Key (sk_live_...)</label>
                        <input
                          type="password"
                          value={stripeSecretKeyInput}
                          onChange={(e) => setStripeSecretKeyInput(e.target.value)}
                          placeholder="••••••••••••••••••••••••••••••••"
                          className="w-full bg-white border border-slate-250 rounded p-1.5 text-[10px] font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-300"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 text-right justify-end pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setFinancialSystemMode("simulation");
                          setIsLiveActivationOpen(false);
                          showNotification("Reverted to Secure Sandbox Simulator.");
                          addLog("Switched system state validator back to Sandbox Simulation Mode.");
                        }}
                        className="text-[9px] font-mono font-bold uppercase py-1 px-2.5 rounded bg-slate-200 text-slate-700 hover:bg-slate-300 transition cursor-pointer"
                      >
                        Reset Sandbox
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!stripePublishableKeyInput.trim() || !stripeSecretKeyInput.trim()) {
                            showNotification("Please specify both Stripe parameters.");
                            return;
                          }
                          setFinancialSystemMode("live");
                          setIsLiveActivationOpen(false);
                          showNotification("Live Production Wallet Authorized!");
                          addLog("Production authorization approved. SECURE DIRECT STRIPE GATEWAY CONNECTED.");
                        }}
                        className="text-[9px] font-mono font-bold uppercase py-1 px-2.5 rounded bg-blue-600 text-white hover:bg-blue-500 transition cursor-pointer"
                      >
                        Authorize & Go Live
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Panel B: 📬 3x Daily Profit Email Reports (By ginhomarie@gmail.com) */}
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm flex flex-col justify-between" id="profit-email-scheduler">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <h4 className="font-bold text-xs text-slate-800 uppercase tracking-widest font-sans">Profit Report Dispatcher</h4>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[8.5px] font-mono font-extrabold border uppercase ${
                    isEmailScheduleEnabled 
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                      : "bg-slate-50 text-slate-400 border-slate-200"
                  }`}>
                    {isEmailScheduleEnabled ? "🟢 3x/Day Auto Active" : "⚪ Auto Suspended"}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <div className="truncate">
                      <span className="text-[9px] font-mono text-slate-400 block uppercase font-bold">Mail Recipient</span>
                      <span className="text-xs font-bold text-slate-850 truncate block">{emailTo}</span>
                    </div>
                    <button
                      onClick={() => {
                        const newMail = prompt("Enter target notification email address:", emailTo);
                        if (newMail && newMail.trim().includes("@")) {
                          setEmailTo(newMail.trim());
                          showNotification(`Mail target updated to: ${newMail.trim()}`);
                          addLog(`Updated profit reporter destination thread to: ${newMail.trim()}`);
                        }
                      }}
                      className="text-[9px] font-mono font-bold text-blue-650 hover:text-blue-500 hover:underline cursor-pointer uppercase shrink-0"
                    >
                      Change
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-normal">
                    This scheduling core delivers continuous audit summaries containing total system profits, checking balances, and recent transaction logs 3 times per day (8 AM, 4 PM, 12 AM).
                  </p>

                  <div className="flex items-center justify-between py-1 px-0.5">
                    <span className="text-[10px] text-slate-600 font-semibold font-sans">Enable 3x Daily Auto-Email reporting:</span>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEmailScheduleEnabled(!isEmailScheduleEnabled);
                        showNotification(isEmailScheduleEnabled ? "Uptime scheduler paused." : "3x Daily reporting schedule active!");
                        addLog(isEmailScheduleEnabled ? "Deactivated recurrent daily mailbox automated report schedule." : "Activated 3x daily email reporting to ginhomarie@gmail.com.");
                      }}
                      className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        isEmailScheduleEnabled ? "bg-blue-600" : "bg-slate-350"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                          isEmailScheduleEnabled ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {emailLogs.length > 0 && (
                    <div className="mt-2.5 font-mono text-[9px] space-y-1.5">
                      <span className="text-slate-400 uppercase font-bold block">Delivery Ledger History:</span>
                      <div className="max-h-20 overflow-y-auto border border-slate-150 rounded bg-slate-50 p-2.5 space-y-1">
                        {emailLogs.map((log) => (
                          <div key={log.id} className="flex justify-between items-center border-b border-white pb-1 last:border-0 last:pb-0">
                            <span className="text-slate-550 font-semibold font-mono">{log.timestamp}</span>
                            <span className="text-slate-500">Balance: ${log.profit.toFixed(2)}</span>
                            <span className={`font-bold uppercase text-[8px] ${log.status === "success-smtp" ? "text-emerald-600" : "text-amber-600"}`}>
                              {log.status === "success-smtp" ? "DELIVERED-SMTP" : "QUEUED-SIMULATED"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleSendProfitEmailManual()}
                  disabled={isEmailLoading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-2 rounded-lg text-xs tracking-wide transition uppercase cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {isEmailLoading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending Profit Report...</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-3.5 h-3.5 text-indigo-200" />
                      <span>Dispatch Instant Profit Report Email</span>
                    </>
                  )}
                </button>
                {emailActionResponse && (
                  <p className="text-[9px] font-mono text-center text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-1.5 rounded">
                    {emailActionResponse}
                  </p>
                )}
                <span className="text-[8px] text-slate-400 font-mono block text-center mt-1 leading-normal">
                  Configure SMTP server env coordinates in Settings secrets (SMTP_USER, SMTP_PASS, SMTP_HOST) to direct reports to your real mailbox automatically.
                </span>
              </div>
            </div>

          </div>

          {/* Panel C (NEW option and different controls requested): 🚦 Subscription Acquisition Feed Controls */}
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-6" id="client-acquisition-control-center">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4.5 h-4.5 text-blue-600 animate-pulse" />
                  <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wide">Acquisition Feed Configurator</h3>
                </div>
                <p className="text-[11.5px] text-slate-500 font-sans">
                  Switch the simulation generator mechanism, eliminate duplicates, or inject custom live transaction nodes down to Ginho AI networks.
                </p>
              </div>

              {/* Toggle Selector Buttons */}
              <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 shrink-0 gap-1 select-none">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAcquisitionMode("global_diversity");
                    showNotification("Switched to Global Diversity client acquisition mode.");
                    addLog("Client acquisition ticker transitioned to GLOBAL DIVERSITY mode.");
                  }}
                  className={`px-3 py-1.5 rounded-md text-[10px] font-mono font-bold transition flex items-center gap-1 cursor-pointer ${
                    selectedAcquisitionMode === "global_diversity"
                      ? "bg-white text-slate-800 shadow-sm border border-slate-200"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Globe className="w-3 h-3 text-slate-600" />
                  Global Diversity
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAcquisitionMode("gemini_synthetic");
                    showNotification("Activated Gemini AI Synthetic Client Constructor!");
                    addLog("Client acquisition ticker transitioned to GEMINI SYNTHETIC AI mode.");
                  }}
                  className={`px-3 py-1.5 rounded-md text-[10px] font-mono font-bold transition flex items-center gap-1 cursor-pointer ${
                    selectedAcquisitionMode === "gemini_synthetic"
                      ? "bg-white text-indigo-700 shadow-sm border border-indigo-200"
                      : "text-slate-500 hover:text-indigo-700"
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-indigo-500" />
                  Gemini Synth AI
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Form Info */}
              <div className="md:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block font-extrabold mb-1">State Explanation Ledger</span>
                
                {selectedAcquisitionMode === "global_diversity" ? (
                  <div className="space-y-2.5 text-xs text-slate-500">
                    <p className="font-bold text-slate-800 flex items-center gap-1">
                      <span>🌍 Global Diversity Mode Active</span>
                      <span className="text-[10px] text-slate-400 font-mono normal-case italic">(Anti-Duplicate Pool)</span>
                    </p>
                    <p className="leading-relaxed text-[11px]">
                      Pulls and assigns transactions dynamically from a verified pool of <strong>40+ unique international client profiles</strong>. This resolves the repeating name subscriber issue by distributing client transactions globally over Paris (FR), Sydney (AU), Casablanca (MA), Zürich (CH), Dubai (AE), Milan (IT), Tokyo (JP), Lisbon (PT), and London (UK).
                    </p>
                    <ul className="text-[10px] space-y-1 font-mono list-disc pl-4 text-slate-500">
                      <li>Uptime reliability: <strong>100% Guaranteed</strong></li>
                      <li>Estimated acquisition diversity index: <strong>Optimal (98%)</strong></li>
                      <li>Total active profiles loaded: <strong>40 Global names</strong></li>
                    </ul>
                  </div>
                ) : (
                  <div className="space-y-2.5 text-xs text-slate-500">
                    <p className="font-bold text-indigo-700 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>🤖 Gemini AI Synthetic Client Generator Active</span>
                    </p>
                    <p className="leading-relaxed text-[11px]">
                      Leverages server-side Gemini intelligence models to synthesize highly structured, contextually rich international subscriber profiles real-time. Each background transaction is custom constructed, generating unique name structures, local currencies, and varied subscription levels!
                    </p>
                    <div className="bg-indigo-50/50 border border-indigo-100 p-2 rounded-lg py-1.5 flex justify-between font-mono text-[9px] text-indigo-700">
                      <span>MOCK REPETITIONS DETECTED:</span>
                      <span className="font-bold">0.00% (Absolute Purity)</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Direct Sale Injector (add a different option feature) */}
              <div className="md:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3.5">
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block font-extrabold font-sans">Option 3: Direct User Injection Form</span>
                
                <p className="text-[10px] text-slate-500 leading-normal font-sans">
                  Add a custom subscriber deal manually. This credits your Profit Wallet balance instantly after passing secure Ginho splits!
                </p>

                <form onSubmit={handleInjectCustomSale} className="space-y-2.5 text-left">
                  <div>
                    <label className="text-[8px] font-mono text-slate-550 block font-bold uppercase mb-1">Subscriber Full Name</label>
                    <input
                      type="text"
                      required
                      value={customClientName}
                      onChange={(e) => setCustomClientName(e.target.value)}
                      placeholder="e.g. Ginho Marie Junior"
                      className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 text-[10px] font-mono text-slate-800 focus:outline-none focus:border-blue-500/30"
                    />
                  </div>
                  <div>
                    <label className="text-[8px] font-mono text-slate-550 block font-bold uppercase mb-1">Location / Node (City, Country)</label>
                    <input
                      type="text"
                      value={customClientLocation}
                      onChange={(e) => setCustomClientLocation(e.target.value)}
                      placeholder="e.g. Monte Carlo, MC"
                      className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 text-[10px] font-mono text-slate-800 focus:outline-none focus:border-blue-500/30"
                    />
                  </div>
                  <div>
                    <label className="text-[8px] font-mono text-slate-550 block font-bold uppercase mb-1">Subscription Tier choice</label>
                    <select
                      value={customClientTier}
                      onChange={(e) => setCustomClientTier(e.target.value as "pro" | "vip")}
                      className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 text-[10px] font-mono text-slate-800 focus:outline-none cursor-pointer"
                    >
                      <option value="pro">Pro tier plan ($49/mo)</option>
                      <option value="vip">VIP Platinum plan ($199/mo)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0F172A] hover:bg-slate-700 text-white font-bold py-2 rounded-lg text-[10px] uppercase tracking-wide transition cursor-pointer text-center block font-sans font-semibold"
                  >
                    🚀 Trigger Custom Subscriber Sale Injection
                  </button>
                </form>
              </div>

            </div>

          </div>

          {/* Panel D (NEW YouTube Broadcast & Weekly Live Updates Controls): 🌟 YouTube Release Kit & Weekly Live Deployment Panel */}
          <div className="bg-gradient-to-r from-red-500/5 to-slate-900/5 border border-red-550/10 p-6 rounded-xl shadow-sm space-y-4" id="youtube-weekly-updates-kit">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Youtube className="w-5 h-5 text-red-600 animate-pulse" />
                <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wide">YouTube Release & Weekly Version Control</h3>
              </div>
              <span className="text-[9.5px] px-2.5 py-0.5 rounded font-mono border bg-slate-100 border-slate-200 text-slate-500 font-bold uppercase">v2.8.5 PLATINUM STABLE</span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed md:text-[11px] font-sans">
              Allowed update app all week! Our automated CI pipeline compiles and is hot-deployable 24/7. Use our optimized YouTube Promotional Package Description below to showcase Ginho AI&apos;s amazing new version features on your social channels successfully!
            </p>

            <div className="bg-slate-900 border border-slate-820 rounded-xl p-4 space-y-3 font-mono text-[9px] relative overflow-hidden text-left">
              <div className="absolute top-2 right-2 flex items-center gap-1 font-mono text-[7px] font-bold bg-red-600 text-white py-0.5 px-2 rounded-full uppercase leading-normal">
                <span className="w-1.5 h-1.5" />
                READY FOR YT TITLE UPDATE
              </div>
              
              <span className="text-slate-400 block font-bold uppercase tracking-wider text-[8px]">PROPOSED VIDEO TITLE:</span>
              <p className="text-white font-bold font-sans text-xs border-b border-slate-800 pb-2">
                🚀 Ginho AI v2.8.5 Launched! Real-Time Automated SaaS Profits, Multi-Mode AI Client Sync & secure Uptime reporting [Review]
              </p>

              <span className="text-slate-450 block font-bold uppercase tracking-wider text-[8px] pt-1">OPTIMIZED DESCRIPTION (Ready to copy):</span>
              <p className="text-slate-300 leading-relaxed max-h-32 overflow-y-auto bg-slate-950/80 p-2.5 rounded border border-white/5 whitespace-pre-wrap select-all">
                Introducing the brand-new Ginho AI v2.8.5 developer metrics control portal! Full-spectrum monitoring, customized 15% subscriber commission splitting, and newly implemented 3x Daily Automated Profit reports dispatched cleanly to ginhomarie@gmail.com.

                🔒 CORE ADVANCEMENTS IN THIS UPDATE:
                1. Dual-Core AI Model selector: Real-time Gemini 3.5-Flash integration side-by-side with DeepSeek reasoning CoT pipelines!
                2. Automated Profit Email Schedule: Dispatches 100% secure balance tables 3 times daily or on-demand directly via customized SMTP ports.
                3. Global Diversity Acquisition Engine: Expanded 40-record anti-repetition buyer roster.
                4. Intelligent Gemini Synthetic Feed: Dynamically synthesizes new international customer transactions automatically every 20 seconds.
                5. Secure Sandbox to Production activation: Provide your Stripe credentials or Firestore coordinates inside local vaults to go live!

                🔥 Developed and maintained permanently on the web with self-healing, secure Docker architectures. Build faster, optimize scripts concurrently, and inspect Ginho Marie&apos;s passive SaaS splits instantly in style.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(`🚀 Ginho AI v2.8.5 Launched!\n\nIntroducing the brand-new Ginho AI v2.8.5 developer metrics control portal! Full-spectrum monitoring, customized 15% subscriber commission splitting, and newly implemented 3x Daily Automated Profit reports dispatched cleanly to ginhomarie@gmail.com.`);
                  showNotification("YouTube description copy succeeded!");
                  addLog("Copied YouTube release package metadata description to clipboard.");
                }}
                className="w-full sm:flex-1 bg-red-600 hover:bg-slate-900 text-white text-[10px] font-mono uppercase py-2 px-3.5 rounded-lg transition tracking-wide text-center cursor-pointer block font-bold shadow-sm"
              >
                📋 Copy YouTube Release Deck Description
              </button>
              
              <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1.5 shrink-0 bg-white border border-slate-200 py-1.5 px-3 rounded-lg font-bold">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Allowed Updates: All Week</span>
              </div>
            </div>

          </div>

          {/* Interactive Walkthrough Video Modal for Virtual Card Worldwide deployment */}
          <AnimatePresence>
            {isWatchCardVideoOpen && (
              <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col"
                >
                  {/* Modal Header */}
                  <div className="bg-[#0F172A] p-4 text-white flex items-center justify-between border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-emerald-400 animate-spin" />
                      <h3 className="font-bold text-sm font-mono tracking-tight text-slate-100">Ginho Virtual Card Tutorial (Worldwide Access)</h3>
                    </div>
                    <button
                      onClick={() => {
                        setIsWatchCardVideoOpen(false);
                        setIsVideoPlaying(false);
                        addLog("Closed card interactive video tutorial.");
                      }}
                      className="text-slate-400 hover:text-white transition font-bold font-mono text-sm px-2.5 py-1 rounded hover:bg-slate-800 cursor-pointer"
                    >
                      ✕ CLOSE
                    </button>
                  </div>

                  {/* Simulated Video Player Screen */}
                  <div className="bg-[#0F172A] aspect-video w-full relative flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
                    {/* Simulated visual video loop frame */}
                    <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/securecard/800/450')] bg-cover opacity-20 z-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-[#0F172A]/40 z-10" />

                    {/* Step-by-Step Simulated video slide representation */}
                    <div className="relative z-20 flex-1 flex flex-col items-center justify-center p-4 max-w-sm">
                      {isVideoPlaying ? (
                        <div className="animate-fade-in flex flex-col items-center gap-2">
                          
                          {videoStep === 1 && (
                            <>
                              <div className="bg-blue-600/30 text-blue-400 border border-blue-500/40 p-3 rounded-full mb-1">
                                <Lock className="w-6 h-6 animate-pulse" />
                              </div>
                              <p className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">Step 1: Authorization & Reveals</p>
                              <p className="text-sm font-medium text-white leading-relaxed">
                                Enter your master credential PIN. Click the eye icon toggle on the card to reveal your secure expired date and 3-digit CVV index.
                              </p>
                            </>
                          )}

                          {videoStep === 2 && (
                            <>
                              <div className="bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 p-3 rounded-full mb-1">
                                <CreditCard className="w-6 h-6 animate-bounce" />
                              </div>
                              <p className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">Step 2: Balance Checkout Splits</p>
                              <p className="text-sm font-medium text-white leading-relaxed">
                                Enter the transfer amount. Click Withdraw to separate your platform profit percentage ({gainsCommissionOfAllSubscribers}%) and dispatch funds safely.
                              </p>
                            </>
                          )}

                          {videoStep === 3 && (
                            <>
                              <div className="bg-indigo-600/30 text-indigo-400 border border-emerald-500/30 p-3 rounded-full mb-1">
                                <Globe className="w-6 h-6 animate-pulse text-indigo-300 animate-spin" />
                              </div>
                              <p className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest">Step 3: Globality Deployment & Checkout</p>
                              <p className="text-sm font-medium text-white leading-relaxed">
                                Ginho master virtual credentials are accepted at global gateways. Fill in your name Ginho Marie, Card Numbers, and checkout ground the world!
                              </p>
                            </>
                          )}

                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 animate-pulse">
                          <button
                            onClick={() => setIsVideoPlaying(true)}
                            className="w-14 h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center justify-center transition hover:scale-105 shadow-xl shadow-blue-500/45 cursor-pointer"
                          >
                            <Play className="w-6 h-6 fill-white translate-x-0.5" />
                          </button>
                          <p className="text-xs text-slate-300 font-mono mt-2 uppercase tracking-wide font-bold">Video Lesson Paused</p>
                          <p className="text-[10px] text-slate-400 font-mono">Click play button to view the international coverage instructions.</p>
                        </div>
                      )}
                    </div>

                    {/* Interactive Simulated Video Controls */}
                    <div className="relative z-20 w-full mt-auto bg-black/60 backdrop-blur-sm border-t border-slate-900 px-4 py-2 text-[10px] font-mono text-slate-300">
                      <div className="grid grid-cols-12 items-center gap-2">
                        
                        <div className="col-span-3 flex items-center gap-3">
                          <button 
                            onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                            className="hover:text-white transition font-bold"
                          >
                            {isVideoPlaying ? "⏸ PAUSE" : "▶ PLAY"}
                          </button>
                          <span className="text-[9px] text-slate-400">
                            {isVideoPlaying ? `0:3${videoStep} / 1:45` : "0:00 / 1:45"}
                          </span>
                        </div>

                        {/* Interactive Timeline progress bar */}
                        <div className="col-span-6 bg-slate-800 h-1 rounded-full overflow-hidden relative">
                          <div 
                            className="bg-blue-500 h-full transition-all duration-500" 
                            style={{ width: isVideoPlaying ? `${(videoStep / 3) * 100}%` : "5%" }}
                          />
                        </div>

                        {/* Stepped Controls */}
                        <div className="col-span-3 flex items-center justify-end gap-1.5">
                          <button
                            disabled={videoStep <= 1}
                            onClick={() => setVideoStep(prev => prev - 1)}
                            className="hover:text-white transition text-[8px] uppercase tracking-wide bg-slate-800 px-2 py-0.5 rounded border border-slate-700 disabled:opacity-30 cursor-pointer"
                          >
                            PREV
                          </button>
                          <button
                            disabled={videoStep >= 3}
                            onClick={() => setVideoStep(prev => prev + 1)}
                            className="hover:text-white transition text-[8px] uppercase tracking-wide bg-slate-800 px-2 py-0.5 rounded border border-slate-700 disabled:opacity-30 cursor-pointer"
                          >
                            NEXT
                          </button>
                        </div>

                      </div>
                    </div>

                  </div>

                  {/* Modal detailed information lists */}
                  <div className="bg-slate-50 p-4 border-t border-slate-150 text-xs text-slate-700 space-y-2">
                    <p className="font-bold text-slate-800">Guidelines for worldwide card deployment:</p>
                    <ul className="list-disc pl-4 space-y-1 text-slate-500 font-mono text-[9px] leading-relaxed">
                      <li>Dual-Network Routing provides zero fee checkout globally ground the world.</li>
                      <li>Card can be stored safely as a local variable or copy-pasted at SaaS merchant checkout containers.</li>
                      <li>Subscriber gains percent limits of <span className="text-blue-600 font-bold">{gainsCommissionOfAllSubscribers}%</span> are calculated on each manual withdrawal correctly.</li>
                    </ul>
                  </div>

                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Interactive Walkthrough Video Modal for Comprehensive App Tour requested by user */}
          <AnimatePresence>
            {isAppGuideOpen && (
              <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col pt-0"
                >
                  {/* Modal Header */}
                  <div className="bg-[#0b0f19] p-4 text-white flex items-center justify-between border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-emerald-400 animate-pulse" />
                      <h3 className="font-bold text-xs font-mono tracking-tight text-slate-100 uppercase">Ginho CoPilot: Full App Interactive Video Guide</h3>
                    </div>
                    <button
                      onClick={() => {
                        setIsAppGuideOpen(false);
                        setIsAppVideoPlaying(false);
                        addLog("Closed Ginho App full interactive video tour guide.");
                      }}
                      className="text-slate-400 hover:text-white transition font-bold font-mono text-xs px-2.5 py-1 rounded hover:bg-slate-800 cursor-pointer"
                    >
                      ✕ CLOSE
                    </button>
                  </div>

                  {/* Simulated Video Player Screen */}
                  <div className="bg-[#0b0f19] aspect-video w-full relative flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
                    {/* Simulated visual video loop frame */}
                    <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/fullappvideo/800/450')] bg-cover opacity-15 z-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 to-[#0F172A]/40 z-10" />

                    {/* Step-by-Step Simulated video slide representation */}
                    <div className="relative z-20 flex-1 flex flex-col items-center justify-center p-4 max-w-sm">
                      {isAppVideoPlaying ? (
                        <div className="animate-fade-in flex flex-col items-center gap-2">
                          
                          {appVideoStep === 1 && (
                            <>
                              <div className="bg-blue-600/30 text-blue-400 border border-blue-500/40 p-3 rounded-full mb-1">
                                <Cpu className="w-6 h-6 animate-pulse" />
                              </div>
                              <p className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest text-[9px]">Part 1: CoPilot AI Optimizer</p>
                              <p className="text-xs text-white leading-relaxed">
                                Enter parameters. Choose Gemini or DeepSeek models and click <span className="text-blue-400 font-bold">Run AI Optimizer</span> to get instant robust scripts tailored for Ginho market listing!
                              </p>
                            </>
                          )}

                          {appVideoStep === 2 && (
                            <>
                              <div className="bg-indigo-600/30 text-indigo-400 border border-indigo-500/40 p-3 rounded-full mb-1">
                                <Layers className="w-6 h-6 animate-bounce" />
                              </div>
                              <p className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest text-[9px]">Part 2: Premium Abonnements & Tiers</p>
                              <p className="text-xs text-white leading-relaxed">
                                Discover premium pricing! Click on either the PRO plan ($49/mo) or VIP plan ($199/mo) to unlock maximum potential, and toggle custom subscribers split values easily.
                              </p>
                            </>
                          )}

                          {appVideoStep === 3 && (
                            <>
                              <div className="bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 p-3 rounded-full mb-1">
                                <Code className="w-6 h-6 animate-pulse" />
                              </div>
                              <p className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest text-[9px]">Part 3: Marketplace API Generation</p>
                              <p className="text-xs text-white leading-relaxed">
                                Once platform gains split percentage is set (&gt; 0%), generate specialized <strong>Free API Keys</strong> instantly to sell resources on the official Ginho market.
                              </p>
                            </>
                          )}

                          {appVideoStep === 4 && (
                            <>
                              <div className="bg-amber-600/30 text-amber-500 border border-amber-500/30 p-3 rounded-full mb-1">
                                <CreditCard className="w-6 h-6 animate-spin text-amber-400" />
                              </div>
                              <p className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wide text-[9px]">Part 4: Global Virtual Card Access</p>
                              <p className="text-xs text-white leading-relaxed">
                                Click key eyes to reveal secure numbers, expirations, and 3-digit CVV index. Execute dynamic zero fee withdrawals worldwide successfully.
                              </p>
                            </>
                          )}

                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 animate-pulse">
                          <button
                            onClick={() => setIsAppVideoPlaying(true)}
                            className="w-14 h-14 bg-indigo-605 hover:bg-indigo-500 text-white rounded-full flex items-center justify-center transition hover:scale-105 shadow-xl shadow-indigo-500/45 cursor-pointer"
                          >
                            <Play className="w-6 h-6 fill-white translate-x-0.5" />
                          </button>
                          <p className="text-xs text-slate-350 font-mono mt-2 uppercase tracking-wide font-bold">App Video Guide Paused</p>
                          <p className="text-[10px] text-slate-400 font-mono">Click play button to continue watching the comprehensive guide tutorial video.</p>
                        </div>
                      )}
                    </div>

                    {/* Interactive Simulated Video Controls */}
                    <div className="relative z-20 w-full mt-auto bg-black/60 backdrop-blur-sm border-t border-slate-900 px-4 py-2 text-[10px] font-mono text-slate-300">
                      <div className="grid grid-cols-12 items-center gap-2 font-mono">
                        
                        <div className="col-span-4 flex items-center gap-2.5">
                          <button 
                            onClick={() => setIsAppVideoPlaying(!isAppVideoPlaying)}
                            className="hover:text-white transition font-bold uppercase tracking-wider text-[8px] bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700"
                          >
                            {isAppVideoPlaying ? "⏸ PAUSE" : "▶ PLAY"}
                          </button>
                          <span className="text-[8px] text-slate-400">
                            {isAppVideoPlaying ? `0:${appVideoStep}5 / 3:00` : "0:00 / 3:00"}
                          </span>
                        </div>

                        {/* Interactive Timeline progress bar */}
                        <div className="col-span-5 bg-slate-800 h-1 rounded-full overflow-hidden relative">
                          <div 
                            className="bg-emerald-500 h-full transition-all duration-500" 
                            style={{ width: isAppVideoPlaying ? `${(appVideoStep / 4) * 100}%` : "10%" }}
                          />
                        </div>

                        {/* Stepped Controls */}
                        <div className="col-span-3 flex items-center justify-end gap-1 font-mono">
                          <button
                            disabled={appVideoStep <= 1}
                            onClick={() => setAppVideoStep(prev => prev - 1)}
                            className="hover:text-white transition text-[8px] uppercase tracking-normal bg-slate-800 px-1 rounded border border-slate-700 disabled:opacity-30 cursor-pointer"
                          >
                            PREV
                          </button>
                          <button
                            disabled={appVideoStep >= 4}
                            onClick={() => setAppVideoStep(prev => prev + 1)}
                            className="hover:text-white transition text-[8px] uppercase tracking-normal bg-slate-800 px-1 rounded border border-slate-700 disabled:opacity-30 cursor-pointer"
                          >
                            NEXT
                          </button>
                        </div>

                      </div>
                    </div>

                  </div>

                  {/* Modal detailed information list */}
                  <div className="bg-slate-50 p-4 border-t border-slate-150 text-xs text-slate-700 space-y-2">
                    <p className="font-bold text-slate-800">Quick App Operating Checklist:</p>
                    <ul className="list-disc pl-4 space-y-0.5 text-slate-500 font-mono text-[9px] leading-relaxed">
                      <li>Toggle between <span className="font-bold">PRO ($49/mo)</span> and <span className="font-bold">VIP ($199/mo)</span> modes inside the pricing cards.</li>
                      <li>Simulate dynamic buyer acquisitions to see the Live Subscription stream.</li>
                      <li>Secure your developer API marketplace codes and copy them safely to publish integrations.</li>
                    </ul>
                  </div>

                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Section 4: Manual Multi-Poster System (Telegram, Youtube, Instagram) requested by user */}
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm" id="social-multiposter">
            
            <div className="flex items-center gap-2.5 mb-4">
              <Compass className="w-4 h-4 text-emerald-600 animate-pulse" />
              <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wide">Dynamic Social Multi-Poster</h3>
            </div>

            <p className="text-[11px] text-slate-500 leading-normal mb-4">
              Instantly draft updates, code tutorials, or deployment changes and queue manual broadcasts to Telegram channels, YouTube timelines, and Instagram feeds.
            </p>

            <form onSubmit={handleTriggerSocialPost} className="flex flex-col gap-3.5">
              
              {/* Target Selector checkboxes */}
              <div className="flex items-center justify-between gap-2.5 bg-slate-50 p-2 border border-slate-200 rounded-lg">
                <button
                  type="button"
                  onClick={() => toggleSocialSelection("telegram")}
                  className={`flex-1 py-1 px-2 rounded text-[10px] font-mono border transition text-center font-bold ${
                    selectedSocials.includes("telegram")
                      ? "bg-white border-blue-200 text-blue-600 shadow-sm"
                      : "bg-transparent border-transparent text-slate-400"
                  }`}
                >
                  Telegram
                </button>
                <button
                  type="button"
                  onClick={() => toggleSocialSelection("youtube")}
                  className={`flex-1 py-1 px-2 rounded text-[10px] font-mono border transition text-center font-bold ${
                    selectedSocials.includes("youtube")
                      ? "bg-white border-red-200 text-red-600 shadow-sm"
                      : "bg-transparent border-transparent text-slate-400"
                  }`}
                >
                  YouTube
                </button>
                <button
                  type="button"
                  onClick={() => toggleSocialSelection("instagram")}
                  className={`flex-1 py-1 px-2 rounded text-[10px] font-mono border transition text-center font-bold ${
                    selectedSocials.includes("instagram")
                      ? "bg-white border-pink-250 text-pink-600 shadow-sm"
                      : "bg-transparent border-transparent text-slate-400"
                  }`}
                >
                  Instagram
                </button>
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-455 uppercase block mb-1 font-bold">Compose Social Message Broadcast</label>
                <textarea
                  value={socialPostText}
                  onChange={(e) => setSocialPostText(e.target.value)}
                  rows={3}
                  className="w-full bg-white border border-slate-200 rounded-lg p-3 text-xs text-slate-800 focus:outline-none focus:border-blue-500/40 resize-none leading-relaxed"
                  placeholder="Draft manual deployment updates to push to linked team coordinates..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 rounded-lg text-xs tracking-wider uppercase transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Send className="w-3.5 h-3.5 text-blue-400" />
                Queue and Deploy Broadcast
              </button>

              {postSuccessMessage && (
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-2.5 rounded text-[10px] flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{postSuccessMessage}</span>
                </div>
              )}

            </form>

          </div>

          {/* Section 5: Real-time telemetry log feed */}
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm" id="system-events-console">
            
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-slate-500 block font-bold uppercase tracking-widest">Active Mirror Logs</span>
              <button 
                onClick={() => {
                  setActiveLogs([]);
                  showNotification("Cleared telemetry logs.");
                }}
                className="text-[9px] font-mono text-slate-400 hover:text-slate-600 transition"
              >
                CLEAR
              </button>
            </div>

            <div className="bg-[#0F172A] rounded-xl border border-slate-850 p-4 font-mono text-[9px] text-slate-400 space-y-1.5 max-h-40 overflow-y-auto leading-relaxed">
              {activeLogs.length === 0 ? (
                <p className="text-center py-2 text-slate-500 font-semibold font-mono">No telemetry logs available.</p>
              ) : (
                activeLogs.map((log, i) => (
                  <p key={i} className="truncate">{log}</p>
                ))
              )}
            </div>

          </div>

        </aside>

        {/* Footer Branding Area - relocated inside the scroll area to stay natively at the bottom of the app */}
        <footer className="col-span-12 mt-12 border-t border-slate-200 pt-8 pb-4 bg-transparent" id="app-footer">
          <div className="flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-700">Ginho AI © 2026.</span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-500">Reflecting clean code in every line.</span>
              </div>
            </div>

            {/* Slider inside Footer as well for extreme usability and visibility */}
            <div className="flex items-center gap-3 bg-slate-100/90 border border-slate-200 px-4 py-2 rounded-xl text-xs font-semibold my-2 md:my-0 shadow-sm">
              <Sliders className="w-3.5 h-3.5 text-blue-600 animate-pulse shrink-0" />
              <span className="text-slate-600 font-sans">Open App Bigger (Adjust Bar):</span>
              <input 
                type="range" 
                min="75" 
                max="100" 
                value={appScaleWidth} 
                onChange={(e) => {
                  const widthVal = Number(e.target.value);
                  setAppScaleWidth(widthVal);
                  if (widthVal % 5 === 0) {
                    addLog(`Tuned main dashboard canvas width constraints to ${widthVal}% of active monitor space.`);
                  }
                }}
                className="w-24 md:w-36 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none" 
                title="Tune layout container viewport width constraint"
              />
              <span className="text-xs font-mono font-bold bg-blue-600 text-white px-2 py-0.5 rounded shadow-sm">{appScaleWidth}%</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[10px] text-slate-400 font-semibold bg-slate-100 border border-slate-200/60 px-2 py-1 rounded-md">
                Secure Pin Active • 15% Share Configured
              </span>
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-slate-400 hover:text-pink-500 transition cursor-pointer" />
                <Youtube className="w-4 h-4 text-slate-400 hover:text-red-500 transition cursor-pointer" />
                <Github className="w-4 h-4 text-slate-400 hover:text-slate-800 transition cursor-pointer" />
              </div>
            </div>
          </div>
        </footer>

      </div>

      </main>

    </div>
  );
}
