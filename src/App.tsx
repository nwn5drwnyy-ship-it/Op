import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  User,
  Wallet,
  History,
  Award,
  ShoppingBag,
  Terminal,
  ChevronRight,
  Search,
  Star,
  Copy,
  Lock,
  PlusCircle,
  Download,
  Sparkles,
  UploadCloud,
  CheckCircle,
  AlertCircle,
  LogOut,
  QrCode,
  CreditCard,
  ArrowUpRight,
  Check,
  ShieldAlert,
  HelpCircle,
  Clock,
  Eye,
  CheckCircle2,
  X,
  Send,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile, ScriptItem, ActivityLog, UpdateLog, TransactionHistory } from './types';
import {
  INITIAL_SCRIPTS,
  INITIAL_ACTIVITY_LOGS,
  INITIAL_UPDATE_LOGS,
  INITIAL_TRANSACTION_HISTORY
} from './data';

export default function App() {
  // Navigation & Authentication state
  const [user, setUser] = useState<UserProfile | null>({
    username: 'SQUAD_LEADER_01',
    rank: 'VIP RANK',
    balance: 500,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7UdUwfaOM6PkXTIDQqcnqvk1-caP7lvwgud1C1RWV0nYS9g7omqd07v5sgweyrGFnN-SvypRLwvu_hiT1vvYm4MqNUOBTvWNFJ1NUQhhwYCh_1-lk-yn9mmoIdoDNAZRfHDr9MFw8g4Bx4CE2ls2Cq4WJOxgOcQGissv_ydPAwluAfyd3deGl37zQ7rYl_bKxM5VoLPZiKfD1-dRDy4AC29kNB1fIKuNkTd0YuaeJG6asck9gx1Q2kcT4Wt-2LhYf9E4krmevTts'
  });

  // Authentication Fields (Login / Register)
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  // Main UI Tabs: 'market' | 'scripts' | 'topup' | 'profile'
  const [activeTab, setActiveTab] = useState<'market' | 'scripts' | 'topup' | 'profile'>('market');

  // Search & Filter state for Marketplace
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ทั้งหมด');

  // Dynamic system and transaction states fueled by state
  const [scripts, setScripts] = useState<ScriptItem[]>(INITIAL_SCRIPTS);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(INITIAL_ACTIVITY_LOGS);
  const [updateLogs, setUpdateLogs] = useState<UpdateLog[]>(INITIAL_UPDATE_LOGS);
  const [transactions, setTransactions] = useState<TransactionHistory[]>(INITIAL_TRANSACTION_HISTORY);
  
  // Inventory (User's owned scripts). Initially user owns "Stealth Shield Pro" (script-4) for full immersion!
  const [inventory, setInventory] = useState<string[]>(['script-4']);
  const [activatedScripts, setActivatedScripts] = useState<string[]>(['script-4']);

  // Top Up interactive state controls
  const [selectedTopupMethod, setSelectedTopupMethod] = useState<'truemoney' | 'promptpay' | 'bank' | null>('bank');
  const [customTopupAmount, setCustomTopupAmount] = useState<string>('500');
  const [giftCardLink, setGiftCardLink] = useState('');
  const [isVerifyingTopup, setIsVerifyingTopup] = useState(false);
  const [slipFile, setSlipFile] = useState<File | null>(null);
  const [slipPreview, setSlipPreview] = useState<string | null>(null);

  // Custom Script Request State
  const [customRequestName, setCustomRequestName] = useState('');
  const [customRequestSpec, setCustomRequestSpec] = useState('');
  const [customRequestBudget, setCustomRequestBudget] = useState('1500');
  const [customRequestContact, setCustomRequestContact] = useState('');

  // Dialog/Modal state alerts
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [errorToast, setErrorToast] = useState<string | null>(null);
  const [confirmPurchaseScript, setConfirmPurchaseScript] = useState<ScriptItem | null>(null);
  
  // Copy to clipboard effect control
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Sidebar Menu State for mobile devices
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Background floating particles state generator
  const [particles, setParticles] = useState<Array<{ id: number; size: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    // Generate floating procedural background particles
    const list = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: Math.random() * 10 + 6
    }));
    setParticles(list);
  }, []);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setSuccessToast(`คัดลอก ${label} แล้ว!`);
    setTimeout(() => setCopiedText(null), 2500);
  };

  // Simulated Login Handler
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const resolvedName = loginUsername.trim() || 'SQUAD_LEADER_01';
    setUser({
      username: resolvedName,
      rank: 'VIP RANK',
      balance: 500,
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7UdUwfaOM6PkXTIDQqcnqvk1-caP7lvwgud1C1RWV0nYS9g7omqd07v5sgweyrGFnN-SvypRLwvu_hiT1vvYm4MqNUOBTvWNFJ1NUQhhwYCh_1-lk-yn9mmoIdoDNAZRfHDr9MFw8g4Bx4CE2ls2Cq4WJOxgOcQGissv_ydPAwluAfyd3deGl37zQ7rYl_bKxM5VoLPZiKfD1-dRDy4AC29kNB1fIKuNkTd0YuaeJG6asck9gx1Q2kcT4Wt-2LhYf9E4krmevTts'
    });
    setSuccessToast(`ยินดีต้อนรับกลับเข้ามาผู้บัญชาการ, ${resolvedName}!`);
    setActiveTab('market');
  };

  // Simulated Register Handler
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const resolvedName = registerUsername.trim() || 'NEW_SOLDIER';
    setUser({
      username: resolvedName,
      rank: 'STANDARD SOLDIER',
      balance: 100, // starting balance for new account recruits!
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADsC7hmRpt404eZ0b-oQnfYy7JZejh1AhyyvU216HDmQsdoJxLlAxtTgqajNnWu3q5a_zv0B8dgwht4fpXTebOysd2UO3zq_A9qtG8hAvOQS-7XbaWXL5xM2u_NsjMnv-jKm1dCOmD_zIF535agqhxEPF9CdaeKXDDyv5Fpa-ZE-GC79ptUzmvOzO2dS0xecqNnL8QGayQxRl4kWuktmU-x6mq3vVom1VKCfAPCEIskhp343g1mDVViBbFlVdkjQKdgM16YFGsODI'
    });
    setSuccessToast(`สมัครสมาชิกสำเร็จ! ยืนยันการต้อนรับกองทัพวิศวกรรุ่นใหม่ ${resolvedName}!`);
    setActiveTab('market');
  };

  // Script Purchasing Controller
  const executeBuyScript = (script: ScriptItem) => {
    if (!user) {
      setErrorToast('กรุณาเข้าสู่ระบบก่อนทำการสั่งซื้อสินค้า');
      setActiveTab('profile');
      setConfirmPurchaseScript(null);
      return;
    }

    if (inventory.includes(script.id)) {
      setErrorToast('คุณเป็นเจ้าของสคริปต์นี้เรียบร้อยแล้ว สามารถดูประวัติการสั่งซื้อได้ที่ส่วนเก็บคลังแสงของคุณ');
      setConfirmPurchaseScript(null);
      return;
    }

    if (user.balance < script.price) {
      setErrorToast(`ยอดเงินไม่เพียงพอ! คุณมียอดคงเหลือ ${user.balance.toFixed(2)} THB ซึ่งสคริปต์มีราคาอยู่ที่ ${script.price} THB `);
      // shortcut transfer to Top Up section
      setConfirmPurchaseScript(null);
      setTimeout(() => {
        setActiveTab('topup');
        setSelectedTopupMethod('bank');
      }, 1500);
      return;
    }

    // Deduct user balance
    const updatedBalance = user.balance - script.price;
    setUser({ ...user, balance: updatedBalance });

    // Track state additions
    setInventory([...inventory, script.id]);
    setActivatedScripts([...activatedScripts, script.id]);

    const newTx: TransactionHistory = {
      id: `tx-new-${Date.now()}`,
      type: 'purchase',
      description: `เช่าสคริปต์ ${script.name} สำเร็จ`,
      amount: -script.price,
      date: new Date().toLocaleString('th-TH', { hour12: false }),
      status: 'success'
    };
    setTransactions([newTx, ...transactions]);

    const newLog: ActivityLog = {
      id: `log-new-${Date.now()}`,
      user: user.username,
      avatarUrl: user.avatarUrl,
      action: `ซื้อสคริปต์ ${script.name} เรียบร้อยแล้ว`,
      timeLabel: 'เมื่อสักครู่นี้',
      statusType: 'primary'
    };
    setActivityLogs([newLog, ...activityLogs]);

    setSuccessToast(`ทำการซื้อสคริปต์ ${script.name} มูลค่า ${script.price} THB เรียบร้อยแล้ว!`);
    setConfirmPurchaseScript(null);
  };

  // TrueMoney wallet top up trigger
  const handleTrueMoneyTopup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!giftCardLink.trim()) {
      setErrorToast('กรุณากรอกลิงก์ซองของขวัญ TrueMoney Wallet');
      return;
    }

    if (!giftCardLink.startsWith('https://gift.truemoney.com/campaign/?v=')) {
      setErrorToast('รูปแบบลิงก์ไม่ถูกต้อง! ต้องขึ้นต้นด้วย https://gift.truemoney.com/campaign/?v=');
      return;
    }

    setIsVerifyingTopup(true);
    setTimeout(() => {
      setIsVerifyingTopup(false);
      // Credit some pseudo-randomized credits or credit 100 THB code
      const creditAmount = Math.floor(Math.random() * 450) + 50; 
      if (user) {
        setUser({ ...user, balance: user.balance + creditAmount });
        const newTx: TransactionHistory = {
          id: `tx-wallet-${Date.now()}`,
          type: 'deposit',
          description: `เติมเงิน TrueMoney Wallet (ลิ้งค์กล่องแจกซอง)`,
          amount: creditAmount,
          date: new Date().toLocaleString('th-TH', { hour12: false }),
          status: 'success'
        };
        setTransactions([newTx, ...transactions]);

        const newLog: ActivityLog = {
          id: `log-topup-${Date.now()}`,
          user: user.username,
          avatarUrl: user.avatarUrl,
          action: `เติมเงินผ่าน TrueMoney Wallet ได้รับรางวัลโบนัสสูงสุด ${creditAmount} THB`,
          timeLabel: 'เมื่อสักครู่นี้',
          statusType: 'tertiary'
        };
        setActivityLogs([newLog, ...activityLogs]);
      }
      setSuccessToast(`ระบบตรวจสอบสำเร็จ! ยอดบัญชีเครดิตถูกเพิ่มเติมเข้าระบบจำนวน ${creditAmount} THB`);
      setGiftCardLink('');
    }, 2000);
  };

  // PromptPay payment confirmation
  const handlePromptPayTopup = () => {
    const amount = parseFloat(customTopupAmount);
    if (isNaN(amount) || amount <= 0) {
      setErrorToast('กรุณาระบุจำนวนเงินที่ถูกต้อง');
      return;
    }

    setIsVerifyingTopup(true);
    setTimeout(() => {
      setIsVerifyingTopup(false);
      if (user) {
        setUser({ ...user, balance: user.balance + amount });
        const newTx: TransactionHistory = {
          id: `tx-pp-${Date.now()}`,
          type: 'deposit',
          description: `เติมเงินผ่าน PromptPay`,
          amount: amount,
          date: new Date().toLocaleString('th-TH'),
          status: 'success'
        };
        setTransactions([newTx, ...transactions]);

        const newLog: ActivityLog = {
          id: `log-topup-${Date.now()}`,
          user: user.username,
          avatarUrl: user.avatarUrl,
          action: `เติมเงินผ่าน PromptPay สำเร็จ ${amount} THB`,
          timeLabel: 'เมื่อสักครู่นี้',
          statusType: 'tertiary'
        };
        setActivityLogs([newLog, ...activityLogs]);
      }
      setSuccessToast(`ระบบประมวลผลการสแกนสำเร็จเพื่อสุขภาพบัญชีที่ดี! ได้รับโอนเงินจำนวน ${amount} THB เครดิตเข้าบัญชีแล้ว`);
    }, 2200);
  };

  // File Input Change details
  const handleSlipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSlipFile(file);
      setSlipPreview(URL.createObjectURL(file));
      setSuccessToast(`เลือกสลิป ${file.name} เรียบร้อย!`);
    }
  };

  // Simulated Bank slip scanner check
  const handleBankSlipTopupSubmit = () => {
    if (!slipFile) {
      setErrorToast('กรุณาอัปโหลดรูปภาพสลิปธนาคารเพื่อทำธุรกรรม');
      return;
    }

    setIsVerifyingTopup(true);
    setTimeout(() => {
      setIsVerifyingTopup(false);
      const randomAmount = Math.floor(Math.random() * 4) * 200 + 400; // random deposit amounts
      if (user) {
        setUser({ ...user, balance: user.balance + randomAmount });
        const newTx: TransactionHistory = {
          id: `tx-bank-${Date.now()}`,
          type: 'deposit',
          description: `ยื่นคำร้องเติมเงินธนาคาร (อัผโหลดสลิปคอร์ด)`,
          amount: randomAmount,
          date: new Date().toLocaleString('th-TH'),
          status: 'success'
        };
        setTransactions([newTx, ...transactions]);

        const newLog: ActivityLog = {
          id: `log-topup-${Date.now()}`,
          user: user.username,
          avatarUrl: user.avatarUrl,
          action: `ระบุยอดอ้างอิงสลิปสำเร็จ เครดิตเข้าอัตโนมัติ ${randomAmount} THB`,
          timeLabel: 'เมื่อสักครู่นี้',
          statusType: 'tertiary'
        };
        setActivityLogs([newLog, ...activityLogs]);
      }
      setSuccessToast(`AI ตรวจสอบรูปลายเซ็นและจำนวนถูกต้องบนสลิป ยอดเงินเติมเข้าระบบสำเร็จ ${randomAmount} THB`);
      setSlipFile(null);
      setSlipPreview(null);
    }, 2400);
  };

  // Custom Script Request controller
  const handleCustomScriptRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customRequestName.trim() || !customRequestSpec.trim() || !customRequestContact.trim()) {
      setErrorToast('กรุณากรอกข้อมูลจำเพาะการสร้างสคริปต์ให้ครบถ้วนเพื่อทำการบันทึก');
      return;
    }

    const price = parseInt(customRequestBudget);
    if (!user || user.balance < price) {
      setErrorToast(`คุณจำเป็นต้องมียอดมัดจำสคริปต์ขั้นต่ำ (${price} THB) อยู่ในกระเป๋าของคุณก่อนส่งงานวิจัยสร้างสคริปต์จำเพาะ`);
      return;
    }

    // Deduct deposit budget
    setUser({ ...user, balance: user.balance - price });
    const newTx: TransactionHistory = {
      id: `tx-custom-${Date.now()}`,
      type: 'purchase',
      description: `หักยอดมัดจำงานสั่งทำพิเศษเพื่อพิจารณาความตึง: ${customRequestName}`,
      amount: -price,
      date: new Date().toLocaleString('th-TH'),
      status: 'pending'
    };
    setTransactions([newTx, ...transactions]);

    setSuccessToast(`ส่งเรื่องคำวิจัยเรียบร้อยแล้ว เพื่อความปลอดภัยและทีมตรวจสอบแอดมินกำลังพิจารณา ยืนยันหักมัดจำและเก็บสะสมยอดเงิน ${price} THB `);
    
    // Reset forms
    setCustomRequestName('');
    setCustomRequestSpec('');
    setCustomRequestContact('');
  };

  const toggleScriptStatus = (scriptId: string) => {
    if (activatedScripts.includes(scriptId)) {
      setActivatedScripts(activatedScripts.filter(id => id !== scriptId));
      setSuccessToast('ปิดใช้งานการทำงานของม็อดเสริมแล้ว');
    } else {
      setActivatedScripts([...activatedScripts, scriptId]);
      setSuccessToast('เปิดระบบเซ็ตติ้งล็อกเป้าสคริปต์แบบเต็มฟีดแล้ว!');
    }
  };

  // Filtering products list
  const filteredScripts = scripts.filter(script => {
    const matchesSearch = script.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          script.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          script.tag.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === 'ทั้งหมด') {
      return matchesSearch;
    }
    return matchesSearch && script.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans selection:bg-primary-container selection:text-on-primary-container relative flex flex-col pb-24 md:pb-8">
      
      {/* Dynamic Background Floating Particles */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              bottom: `-10px`,
              animation: `particle-float ${p.duration}s linear ${p.delay}s infinite`
            }}
          />
        ))}
      </div>

      {/* Cyberpunk Grid/Mesh and Overlay lights */}
      <div className="fixed inset-0 pointer-events-none -z-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-container/5 via-transparent to-transparent opacity-80" />
      <div className="fixed inset-0 pointer-events-none -z-30 bg-gradient-to-t from-background via-background/90 to-background" />

      {/* Modern High-End Top AppBar */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-outline-variant/30 inner-glow-red flex justify-between items-center px-4 md:px-16 h-16 transition-all duration-300">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-primary cursor-pointer active:scale-95 transition-transform"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div 
            onClick={() => setActiveTab('market')} 
            className="flex items-center gap-2 cursor-pointer font-display text-lg md:text-headline-md font-extrabold text-primary tracking-tighter uppercase"
          >
            <Terminal className="hidden md:inline w-6 h-6 text-primary-container" />
            <span>COMMAND CENTER</span>
          </div>
        </div>

        {/* Global Nav Links for wide screens */}
        <div className="hidden md:flex items-center gap-8 font-mono text-xs">
          <button
            onClick={() => { setActiveTab('market'); setSelectedCategory('ทั้งหมด'); }}
            className={`py-2 border-b-2 tracking-widest uppercase transition-colors duration-200 cursor-pointer ${
              activeTab === 'market' ? 'text-primary border-primary font-bold' : 'text-on-surface-variant border-transparent hover:text-primary hover:border-primary/50'
            }`}
          >
            ตลาดคลังแสง
          </button>
          <button
            onClick={() => setActiveTab('scripts')}
            className={`py-2 border-b-2 tracking-widest uppercase transition-colors duration-200 cursor-pointer ${
              activeTab === 'scripts' ? 'text-primary border-primary font-bold' : 'text-on-surface-variant border-transparent hover:text-primary hover:border-primary/50'
            }`}
          >
            คลังเครื่องมือ
          </button>
          <button
            onClick={() => setActiveTab('topup')}
            className={`py-2 border-b-2 tracking-widest uppercase transition-colors duration-200 cursor-pointer ${
              activeTab === 'topup' ? 'text-primary border-primary font-bold' : 'text-on-surface-variant border-transparent hover:text-primary hover:border-primary/50'
            }`}
          >
            เติมเงิน
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-2 border-b-2 tracking-widest uppercase transition-colors duration-200 cursor-pointer ${
              activeTab === 'profile' ? 'text-primary border-primary font-bold' : 'text-on-surface-variant border-transparent hover:text-primary hover:border-primary/50'
            }`}
          >
            โปรไฟล์
          </button>
        </div>

        {/* User state element display */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div 
                onClick={() => setActiveTab('profile')}
                className="flex flex-col items-end cursor-pointer hidden md:flex hover:opacity-80"
              >
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-primary font-bold px-1.5 py-0.5 bg-primary-container/10 border border-primary/20 rounded">
                    {user.rank}
                  </span>
                  <span className="text-xs font-mono text-on-surface p-0.5 font-bold">{user.username}</span>
                </div>
                <span className="text-xl font-bold font-display text-primary flex items-center gap-1">
                  {user.balance.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                  <span className="text-xs text-on-surface-variant font-normal">THB</span>
                </span>
              </div>
              <div 
                onClick={() => setActiveTab('profile')}
                className="w-10 h-10 rounded-full border-2 border-primary/60 hover:border-primary overflow-hidden cursor-pointer active:scale-95 transition-transform shadow-lg shadow-primary-container/10"
              >
                <img referrerPolicy="no-referrer" alt="User Profile" className="w-[100%] h-[100%] object-cover" src={user.avatarUrl} />
              </div>
            </div>
          ) : (
            <button
              onClick={() => { setActiveTab('profile'); setAuthTab('login'); }}
              className="bg-primary-container/23 hover:bg-primary-container/35 text-primary border border-primary/30 font-bold px-4 py-1.5 rounded-lg text-xs active:scale-95 transition-all cursor-pointer flex items-center gap-1"
            >
              <User className="w-4 h-4" />
              <span>เข้าสู่ระบบ</span>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Drawer Menu (Sidebar) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-background/90 z-40 md:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed left-0 top-0 h-full w-[280px] bg-surface-container border-r border-outline-variant/40 z-50 p-6 flex flex-col justify-between md:hidden"
            >
              <div className="space-y-8">
                <div className="flex justify-between items-center pb-4 border-b border-outline-variant/30">
                  <span className="font-display font-black text-primary uppercase tracking-tighter flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-primary-container" />
                    COMMAND MENU
                  </span>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-on-surface-variant hover:text-on-surface"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 flex flex-col font-mono">
                  <button
                    onClick={() => { setActiveTab('market'); setSelectedCategory('ทั้งหมด'); setIsMobileMenuOpen(false); }}
                    className={`p-3 text-left rounded-lg flex items-center gap-3 ${activeTab === 'market' ? 'bg-primary-container/20 text-primary border-l-4 border-primary font-bold' : 'hover:bg-surface-container-high text-on-surface-variant'}`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ตลาดคลังแสง</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab('scripts'); setIsMobileMenuOpen(false); }}
                    className={`p-3 text-left rounded-lg flex items-center gap-3 ${activeTab === 'scripts' ? 'bg-primary-container/20 text-primary border-l-4 border-primary font-bold' : 'hover:bg-surface-container-high text-on-surface-variant'}`}
                  >
                    <Terminal className="w-4 h-4" />
                    <span>คลังเครื่องมือ</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab('topup'); setIsMobileMenuOpen(false); }}
                    className={`p-3 text-left rounded-lg flex items-center gap-3 ${activeTab === 'topup' ? 'bg-primary-container/20 text-primary border-l-4 border-primary font-bold' : 'hover:bg-surface-container-high text-on-surface-variant'}`}
                  >
                    <Wallet className="w-4 h-4" />
                    <span>เติมเงินเข้าระบบ</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab('profile'); setIsMobileMenuOpen(false); }}
                    className={`p-3 text-left rounded-lg flex items-center gap-3 ${activeTab === 'profile' ? 'bg-primary-container/20 text-primary border-l-4 border-primary font-bold' : 'hover:bg-surface-container-high text-on-surface-variant'}`}
                  >
                    <User className="w-4 h-4" />
                    <span>ข้อมูลส่วนตัว</span>
                  </button>
                </div>
              </div>

              {user ? (
                <div className="pt-4 border-t border-outline-variant/30 space-y-3">
                  <div className="flex items-center gap-3">
                    <img referrerPolicy="no-referrer" src={user.avatarUrl} className="w-10 h-10 rounded-full border border-primary/40 object-cover" alt="" />
                    <div>
                      <p className="font-bold text-xs">{user.username}</p>
                      <p className="text-[10px] text-primary">{user.rank}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setUser(null); setIsMobileMenuOpen(false); setSuccessToast('ออกจากระบบเรียบร้อย'); }}
                    className="w-full py-2 bg-on-primary-container/10 hover:bg-on-primary-container/23 text-primary border border-outline-variant/30 rounded-lg text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>ออกจากระบบ</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setActiveTab('profile'); setAuthTab('login'); setIsMobileMenuOpen(false); }}
                  className="w-full py-2 bg-primary-container text-on-primary-container rounded-lg font-bold text-xs flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>เข้าสู่ระบบบริการ</span>
                </button>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Container Area */}
      <main className="pt-24 px-4 md:px-16 max-w-7xl mx-auto w-full flex-grow pb-16">
        
        {/* Dynamic Warning Alerts / Succes / Failure triggers */}
        <AnimatePresence>
          {successToast && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="mb-6 bg-tertiary-container/20 border border-tertiary text-on-surface rounded-xl p-4 flex items-center gap-3 inner-glow-red shadow-lg"
            >
              <CheckCircle className="w-5 h-5 text-tertiary" />
              <div className="flex-1 text-sm font-semibold">{successToast}</div>
              <button onClick={() => setSuccessToast(null)} className="text-on-surface-variant hover:text-on-surface text-xs focus:outline-none">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {errorToast && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="mb-6 bg-red-950/40 border border-primary-container text-on-surface rounded-xl p-4 flex items-center gap-3 inner-glow-red shadow-lg"
            >
              <ShieldAlert className="w-5 h-5 text-primary-container" />
              <div className="flex-1 text-sm font-medium">{errorToast}</div>
              <button onClick={() => setErrorToast(null)} className="text-on-surface-variant hover:text-on-surface text-xs focus:outline-none">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HERO BALANCE HEADER - Matching screen top up visual exactly */}
        <section className="mb-8">
          <div className="glass-panel rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6 border-l-4 border-l-primary-container shadow-xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary-container/5 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="z-10 text-center md:text-left space-y-1">
              <h2 className="font-mono text-xs text-on-surface-variant tracking-widest uppercase">ยอดคงเหลือปัจจุบัน</h2>
              <div className="flex items-baseline justify-center md:justify-start gap-1">
                <span className="font-display text-4xl md:text-6xl font-black text-primary-container">
                  {user ? user.balance.toLocaleString('th-TH', { minimumFractionDigits: 2 }) : '0.00'}
                </span>
                <span className="font-display text-lg md:text-2xl text-primary-container font-extrabold ml-1">THB</span>
              </div>
              <div className="pt-2 flex items-center gap-1.5 justify-center md:justify-start text-tertiary">
                <CheckCircle2 className="w-4 h-4 fill-tertiary/10 text-tertiary" />
                <span className="text-xs font-mono font-medium">สถานะบัญชีปกติ • สแตนด์บายความตึง</span>
              </div>
            </div>

            <div className="z-10 flex flex-wrap gap-3 w-full md:w-auto justify-center">
              <button 
                onClick={() => {
                  if (activeTab === 'topup') {
                    // Toggle history slide or open bank
                    setSelectedTopupMethod('bank');
                  } else {
                    setActiveTab('topup');
                  }
                  setSuccessToast('เปิดหน้าเติมเงิน ระบบประทับตราโบนัสเรียบร้อย!');
                }}
                className="bg-primary-container hover:bg-primary-container/80 text-on-primary-container font-extrabold px-6 py-3.5 rounded-xl active:scale-95 transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,85,64,0.4)] cursor-pointer"
              >
                <History className="w-4 h-4" />
                ประวัติการทำรายการ
              </button>
            </div>
          </div>
        </section>

        {/* TABS - Switching layouts */}
        
        {/* ==================== TAB 1: ตลาดคลังแสง (MARKETPLACE) ==================== */}
        {activeTab === 'market' && (
          <div className="space-y-8">
            
            {/* HERO HERO TITLE */}
            <section className="relative w-full rounded-2xl overflow-hidden min-h-[340px] md:min-h-[420px] flex items-center p-6 md:p-12 mb-8">
              <div className="absolute inset-0 z-0">
                <img 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-50"
                  alt="Cyberpunk Soldier"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSdRuBx9p-XdKqvTaW5Ns1j6ry1NQXJDNnuYLiQ8x8ZLRjIyP2kLEQP-yOFdFMggDNfHtiOvY6tt15GJHM78l4Klfb5_YB-wUYP6iPqEfq4IytBEZC0b8AvYppGZMLCXb3NzaauDriGJhz1GS7LqTZPOIpF1pnQpDpdqYd3V3CjMIhFk45E3RHAQpl0h2qBH_1HZuLq3b_1ty7m8L5LHBdHgBf6d-RcAet41TgypVbs7kTr0gHvJWLo8uR_74VGBYLSBi4uwDAEi4"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>
              
              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center px-2.5 py-1 bg-primary-container/20 border border-primary-container/40 rounded-lg text-xs text-primary font-mono select-none">
                  <span className="w-2 h-2 rounded-full bg-primary-container mr-2 animate-pulse" />
                  <span>SYSTEM ONLINE: v4.2.0 LAUNCHER READY</span>
                </div>
                <h1 className="font-display text-4xl md:text-6xl font-extrabold text-on-surface leading-none">
                  DOMINATE THE <span className="text-primary-container">BATTLEFIELD</span>
                </h1>
                <p className="text-sm md:text-base text-on-surface-variant leading-relaxed max-w-lg">
                  ยกระดับการเล่นแข่งขันแบบกองกำลังเดี่ยวระดับโปรเพลย์ ด้วยสคริปต์ระดับพรีเมียมที่ผ่านการวิจัยและทดสอบความปลอดภัย 100% ปราบปรามศัตรูง่ายดาย
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button 
                    onClick={() => {
                      const el = document.getElementById('arsenal-explore');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-3 bg-primary-container text-on-primary-container text-xs font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1 cursor-pointer font-mono"
                  >
                    สำรวจสคริปต์
                  </button>
                  <button 
                    onClick={() => {
                      setSuccessToast('ขณะนี้แอดมินกำลังไลฟ์สตรีมเซตติ้งระบบบอทพรีเซ็ต บนช่องทาง Discord สังคม COMMAND CENTER!');
                    }}
                    className="px-6 py-3 border-2 border-primary-container/50 hover:bg-primary-container/10 text-primary-container font-mono text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    ดูวิดีโอตัวอย่าง
                  </button>
                </div>
              </div>
              <div className="absolute inset-0 pointer-events-none scanline-effect opacity-12" />
            </section>

            {/* HEADER DESIGN WITH FILTERS AND SEARCH */}
            <section id="arsenal-explore" className="space-y-6 pt-4">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-display text-2xl font-bold border-l-4 border-primary-container pl-3 text-on-surface">คลังแสงสคริปต์ความตึง</h3>
                  <p className="text-xs text-on-surface-variant">อัปเกรดขีดจำกัดการเล่นของคุณด้วยสคริปต์ระดับพรีเมียม ปลอดภัยสูง ปรับพิกเตอร์ความเร็วได้ดั่งใจนึก</p>
                </div>

                {/* Search text input */}
                <div className="relative w-full md:w-80 group">
                  <Search className="w-4 h-4 text-primary-container absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-tertiary transition-colors" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ค้นหาสคริปต์ หรือ แทร็กเกอร์..."
                    className="w-full bg-surface-container-lowest border border-outline-variant/60 focus:border-primary-container focus:ring-1 focus:ring-primary-container focus:outline-none transition-all py-2.5 pl-10 pr-4 rounded-xl text-xs font-medium placeholder:text-on-surface-variant/40"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="text-xs text-on-surface-variant hover:text-on-surface absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      ล้าง
                    </button>
                  )}
                </div>
              </div>

              {/* Filtering category pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['ทั้งหมด', 'Battle Royale', 'Clash Squad', 'Rank Mode'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold select-none cursor-pointer transition-all ${
                      selectedCategory === cat
                        ? 'bg-primary-container text-on-primary-container font-bold shadow-md shadow-primary-container/20'
                        : 'bg-surface-container-high text-on-surface hover:bg-surface-variant border border-outline-variant/30'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </section>

            {/* SCRIPTS GRID DISPLAY WITH MODERN BENTO STYLE */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredScripts.map((script) => {
                const isOwned = inventory.includes(script.id);
                return (
                  <div 
                    key={script.id}
                    className="glass-card rounded-2xl overflow-hidden flex flex-col group h-full relative"
                  >
                    <div className="relative h-48 overflow-hidden bg-surface-container-lowest/80 select-none">
                      <img 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        alt={script.name}
                        src={script.image}
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="bg-tertiary/20 border border-tertiary/40 text-tertiary text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
                          {script.tag}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase text-white ${
                          script.statusColor === 'green' ? 'bg-green-500/20 border border-green-500/40 text-green-400' :
                          script.statusColor === 'yellow' ? 'bg-yellow-500/20 border border-yellow-500/40 text-yellow-500' :
                          'bg-primary-container/20 border border-primary-container/40 text-primary-container'
                        }`}>
                          {script.status}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-display font-black text-lg text-on-surface group-hover:text-primary-container transition-colors leading-snug">
                            {script.name}
                          </h4>
                          <div className="flex items-center text-primary-container gap-0.5 font-mono text-xs shrink-0 select-none">
                            <Star className="w-3.5 h-3.5 fill-primary-container text-primary-container" />
                            <span>{script.rating}</span>
                          </div>
                        </div>
                        <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                          {script.description}
                        </p>
                        <div className="text-[10px] text-on-surface-variant font-mono flex items-center gap-1 select-none pt-1">
                          <Download className="w-3 h-3 text-tertiary" />
                          <span>ดาวน์โหลดแล้วกว่า {script.downloads} ครั้งในเซสชัน</span>
                        </div>
                      </div>

                      <div className="pt-5 border-t border-outline-variant/20 mt-4 flex items-center justify-between gap-2">
                        <div>
                          <span className="block text-[8px] text-on-surface-variant/70 uppercase tracking-widest font-mono">ราคาพรีเมียม</span>
                          <span className="font-display text-lg font-black text-primary-container">
                            {script.price} <span className="text-xs font-normal text-on-surface-variant">THB</span>
                          </span>
                        </div>
                        
                        {isOwned ? (
                          <button
                            onClick={() => {
                              setActiveTab('scripts');
                              setSuccessToast(`เปิดหน้าคลังตรวจสอบสคริปต์ที่พร้อมติดตั้งแล้ว!`);
                            }}
                            className="bg-purple-950/30 border border-purple-500/30 text-purple-300 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1 hover:bg-purple-950/50 transition-colors cursor-pointer"
                          >
                            <CheckCircle2 className="w-4 h-4 text-purple-400" />
                            <span>มีอยู่แล้ว</span>
                          </button>
                        ) : (
                          <button
                            disabled={script.status === 'Updating'}
                            onClick={() => setConfirmPurchaseScript(script)}
                            className={`font-semibold px-5 py-2.5 rounded-xl text-xs transition-all flex items-center gap-1 active:scale-95 ${
                              script.status === 'Updating' 
                                ? 'bg-surface-container-high text-on-surface-variant/40 cursor-not-allowed'
                                : 'bg-primary-container hover:bg-primary-container/85 text-on-primary-container font-extrabold shadow-md hover:shadow-primary-container/20 cursor-pointer'
                            }`}
                          >
                            <span>{script.status === 'Updating' ? 'กำลังปรับปรุง' : 'เช่าซื้อไอเทม'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* bento request custom orders block */}
              <div className="glass-card border-dashed border-2 border-outline-variant/60 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="p-3 bg-primary-container/10 border border-primary-container/30 rounded-full">
                  <PlusCircle className="w-8 h-8 text-primary-container" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-lg text-on-surface uppercase leading-tight">สั่งทำสคริปต์ความต้องการพิเศษ</h4>
                  <p className="text-xs text-on-surface-variant max-w-xs leading-relaxed">
                    ฟีเจอร์ไม่เหมือนใคร? ปากกาวาดจอ ล็อกเฉพาะส่วน บายพาสสตรีมเมอร์ หรือตั๋วทัวร์นาเมนต์ ส่งรายละเอียดให้แอดมินดำเนินการทันที!
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('scripts');
                    setTimeout(() => {
                      const el = document.getElementById('custom-script-request-section');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }, 200);
                  }}
                  className="px-6 py-2.5 border border-primary-container text-primary-container text-xs font-bold rounded-xl hover:bg-primary-container/10 active:scale-95 transition-all select-none cursor-pointer"
                >
                  กรอกฟอร์มขอทำสคริปต์
                </button>
              </div>
            </section>

            {/* PROMOTIONAL VALUE BLOCK AD */}
            <section className="my-8">
              <div className="relative w-full rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-surface-container-high border border-primary-container/20 inner-glow-red overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-container/15 to-transparent pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                  <div className="p-4 bg-primary-container/20 rounded-xl border border-primary-container/30 shrink-0">
                    <Sparkles className="w-8 h-8 text-primary-container animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-extrabold text-on-surface leading-tight">โปรเติมโหดต้อนรับ Recruits! รับเครดิต x2</h3>
                    <p className="text-xs text-on-surface-variant mt-1">ผู้บัญชาการหน้าใหม่ทุกคนเมื่อทำธุรกรรมบิลแรก ตรวจสอบบิลสำเร็จโอนด่วน รับโบนัสเครดิตเพิ่ม x2 โอนด่วนระบบออโต้</p>
                  </div>
                </div>
                <button
                  onClick={() => { setActiveTab('topup'); setSelectedTopupMethod('bank'); }}
                  className="relative z-10 px-8 py-3.5 bg-primary-container hover:opacity-90 text-on-primary-container font-mono text-xs font-extrabold uppercase rounded-xl shadow-xl hover:shadow-primary-container/20 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                >
                  เติมเงินทันที
                </button>
              </div>
            </section>

            {/* LIVE ZEBRA TABLE AND LIVE FEEDS */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
              
              {/* Activity feeds */}
              <div className="lg:col-span-1 glass-card rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 border-b border-outline-variant/30 pb-3">
                  <History className="w-5 h-5 text-primary-container" />
                  <h4 className="font-display font-bold text-sm uppercase">Recent activity</h4>
                </div>
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  {activityLogs.map((log) => (
                    <div key={log.id} className="p-3 bg-surface-container-low rounded-xl border-l-[3px] border-l-primary-container text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-primary-container">{log.user}</span>
                        <span className="text-[10px] text-on-surface-variant font-mono">{log.timeLabel}</span>
                      </div>
                      <p className="text-on-surface">{log.action}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent core code logs zebra map */}
              <div className="lg:col-span-2 glass-card rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-tertiary" />
                    <h4 className="font-display font-bold text-sm uppercase">บันทึกประวัติอัปเดตระบบสคริปต์</h4>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-tertiary px-2 py-0.5 bg-tertiary/10 border border-tertiary/30 rounded">
                    LIVE STATUS: ONLINE
                  </span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-outline-variant/30">
                  <table className="w-full text-left zebra-table font-mono text-xs">
                    <thead className="bg-surface-container-high text-primary-container uppercase text-[10px]">
                      <tr>
                        <th className="p-3">วัน/เวลาอัปเดต</th>
                        <th className="p-3">สคริปต์โมดูล</th>
                        <th className="p-3">รหัสเวอร์ชัน</th>
                        <th className="p-3">สถานะเซิร์ฟ</th>
                      </tr>
                    </thead>
                    <tbody className="text-on-surface-variant">
                      {updateLogs.map((item) => (
                        <tr key={item.id} className="hover:bg-surface-variant/40 transition-colors">
                          <td className="p-3 whitespace-nowrap">{item.time}</td>
                          <td className="p-3 font-semibold text-on-surface">{item.scriptName}</td>
                          <td className="p-3">{item.version}</td>
                          <td className="p-3">
                            <span className={item.status === 'Stable' ? 'text-green-400 font-bold' : 'text-yellow-500 font-bold'}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ==================== TAB 2: สคริปต์ (SCRIPTS & CUSTOMS) ==================== */}
        {activeTab === 'scripts' && (
          <div className="space-y-8">
            <div className="space-y-1">
              <h3 className="font-display text-2xl font-bold border-l-4 border-primary-container pl-3 text-on-surface">
                คลังเทคโนโลยีส่วนตัวสคริปต์ที่ชำระเงินแล้ว
              </h3>
              <p className="text-xs text-on-surface-variant">
                เปิด/ปิด ซอฟต์แวร์จำลองพารามิเตอร์ของคุณ ต้านทานตรวจสอบ 100% บันทึก Config ออฟไลน์เพื่อความสะดวกสบาย
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* OWNED SCRIPTS CONTROL PANEL LIST */}
              <div className="lg:col-span-2 space-y-6">
                {inventory.length === 0 ? (
                  <div className="glass-card rounded-2xl p-8 text-center space-y-4">
                    <ShieldAlert className="w-12 h-12 text-primary-container mx-auto" />
                    <p className="text-sm font-semibold">คุณยังไม่มีสคริปต์ที่กำลังดำเนินงานซื้อขาย</p>
                    <button
                      onClick={() => setActiveTab('market')}
                      className="px-6 py-2.5 bg-primary-container hover:bg-primary-container/80 text-on-primary-container text-xs font-bold rounded-xl cursor-pointer"
                    >
                      ไปตลาดเลือกซื้อ
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {scripts
                      .filter(s => inventory.includes(s.id))
                      .map((script) => {
                        const isActivated = activatedScripts.includes(script.id);
                        return (
                          <div key={script.id} className="p-5 bg-surface-container/60 border border-outline-variant/30 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:border-primary-container/35">
                            <div className="flex gap-4 items-center">
                              <img src={script.image} className="w-14 h-14 rounded-lg object-cover" alt="" />
                              <div>
                                <h4 className="font-display font-extrabold text-base text-on-surface">{script.name}</h4>
                                <div className="flex items-center gap-3 mt-1 text-[11px] text-on-surface-variant">
                                  <span className="font-mono bg-surface-container-high px-2 py-0.5 rounded text-primary">{script.tag}</span>
                                  <span>เวอร์ชันทางการ: v4.2.1 Stable</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 self-end md:self-auto uppercase font-mono text-xs">
                              <span className={`font-semibold ${isActivated ? 'text-green-400' : 'text-on-surface-variant'}`}>
                                {isActivated ? 'กำลังทำงานไอเทม' : 'ปิดระบบชั่วครู่'}
                              </span>
                              <button
                                onClick={() => toggleScriptStatus(script.id)}
                                className={`w-12 h-6 rounded-full p-0.5 transition-colors relative focus:outline-none cursor-pointer ${isActivated ? 'bg-green-500' : 'bg-surface-container-highest'}`}
                              >
                                <span className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${isActivated ? 'translate-x-6' : 'translate-x-0'}`} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}

                {/* Simulated Generator Area */}
                <div className="glass-card rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-3">
                    <Terminal className="w-5 h-5 text-tertiary" />
                    <h4 className="font-display font-medium text-sm">ดาวน์โหลดไฟล์รหัส Config เทพพรีเซ็ตโมดูล</h4>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    สร้างคีย์เวิร์ดโครงร่าง JSON ไปแนบไว้บนที่อยู่โฟลเดอร์เกมส์สำหรับการบายพาสแบบ Direct Injection บนโทรศัพท์หรือแท็บเล็ตของคุณออโต้สลิป
                  </p>
                  
                  <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/40 relative">
                    <pre className="text-[10px] text-tertiary overflow-x-auto leading-relaxed select-all">
{`{
  "command_center": {
    "profile": "${user?.username || 'SQUAD_LEADER_01'}",
    "rank_status": "VIP_STABLE",
    "bypass_anti_cheat": "ENABLED_V5.5",
    "aim_assist_smooth": 2.5,
    "bypass_delay_ms": 12,
    "active_modules": ${JSON.stringify(activatedScripts)}
  }
}`}
                    </pre>
                    <button
                      onClick={() => handleCopy(
                        JSON.stringify({
                          command_center: {
                            profile: user?.username || 'SQUAD_LEADER_01',
                            rank_status: "VIP_STABLE",
                            bypass_anti_cheat: "ENABLED_V5.5",
                            aim_assist_smooth: 2.5,
                            bypass_delay_ms: 12,
                            active_modules: activatedScripts
                          }
                        }, null, 2),
                        'JSON_CONFIG'
                      )}
                      className="absolute top-3 right-3 p-1.5 bg-surface-container-high text-on-surface-variant hover:text-primary rounded-lg text-xs"
                      title="คัดลอกไฟล์รหัส"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* FORM: สั่งทำสคริปต์พิเศษ (Custom request spec) */}
              <div id="custom-script-request-section" className="glass-card rounded-2xl p-6 h-fit space-y-4 border border-outline-variant/60">
                <div className="flex items-center gap-2 border-b border-outline-variant/30 pb-3">
                  <PlusCircle className="w-5 h-5 text-primary-container" />
                  <h4 className="font-display font-extrabold text-sm uppercase">จ้างพัฒนาสคริปต์พิเศษ</h4>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  สร้างฟังก์ชันใหม่เฉพาะคุณ ออกแบบระบบ Bypass เพื่อความแข็งแกร่งสูงสุด โอนและหักส่งรหัสเงินคัดลอกมัดจำดำเนินการทันที
                </p>

                <form onSubmit={handleCustomScriptRequestSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[11px] text-on-surface-variant font-medium">ชื่อหัวข้อสคริปต์หรือประเภทเกมที่ต้องการ</label>
                    <input
                      type="text"
                      required
                      value={customRequestName}
                      onChange={(e) => setCustomRequestName(e.target.value)}
                      placeholder="เช่น Free Fire OP Assist VIP..."
                      className="w-full bg-surface-container-lowest border border-outline-variant/50 focus:border-primary-container focus:ring-1 focus:ring-primary-container focus:outline-none rounded-xl p-3 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-on-surface-variant font-medium">รายละเอียดความต้องการ (เป้าหมาย, ประเภทรหัสผ่าน, อื่นๆ)</label>
                    <textarea
                      required
                      rows={3}
                      value={customRequestSpec}
                      onChange={(e) => setCustomRequestSpec(e.target.value)}
                      placeholder="อธิบายว่าต้องการให้ช่วยเล็งล็อกหัว ยิงรวดเร็ว บายพาสระบบเช็คไฟล์ขยะ สแกนปืน ฯลฯ"
                      className="w-full bg-surface-container-lowest border border-outline-variant/50 focus:border-primary-container focus:ring-1 focus:ring-primary-container focus:outline-none rounded-xl p-3 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-on-surface-variant font-medium">งบประมาณการจ้างพัฒนาสคริปต์ (มัดจำล่วงหน้า)</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['500', '1000', '1500'].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setCustomRequestBudget(val)}
                          className={`py-2 text-xs font-semibold rounded-lg ${customRequestBudget === val ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-lowest border border-outline-variant/40 text-on-surface'}`}
                        >
                          {val} THB
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-on-surface-variant font-medium">ข้อมูลติดต่อกลับของคุณ (ไอดี LINE/Discord/อีเมล)</label>
                    <input
                      type="text"
                      required
                      value={customRequestContact}
                      onChange={(e) => setCustomRequestContact(e.target.value)}
                      placeholder="Discord ID #0000 หรือ LINE ID"
                      className="w-full bg-surface-container-lowest border border-outline-variant/50 focus:border-primary-container focus:ring-1 focus:ring-primary-container focus:outline-none rounded-xl p-3 text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary-container hover:opacity-90 text-on-primary-container font-extrabold py-3 rounded-xl text-xs active:scale-95 transition-transform cursor-pointer"
                  >
                    ส่งเรื่องส่งวิจัยพร้อมมัดจำ {customRequestBudget} THB
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 3: เติมเงิน (TOPUP OPTIONS) ==================== */}
        {activeTab === 'topup' && (
          <div className="space-y-8">
            <div className="space-y-1">
              <h3 className="font-display text-2xl font-bold border-l-4 border-primary-container pl-3 text-on-surface">เติมเงินเข้าระบบผ่านบัญชีธนาคาร</h3>
              <p className="text-xs text-on-surface-variant">โอนเงินและอัปโหลดหลักฐานสลิป ยอดคงเหลือจะปรับโดยอัตโนมัติภายใน 1-3 นาที</p>
            </div>

            <motion.section 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel rounded-2xl overflow-hidden border border-primary-container/20 shadow-xl"
            >
              <div className="bg-surface-container-high p-4 border-b border-outline-variant/30 flex justify-between items-center select-none">
                <h4 className="font-display font-bold text-sm text-primary-container flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-primary" />
                  ขั้นตอนการโอนเงินเข้าบัญชีกสิกรไทย (KBANK)
                </h4>
                <span className="text-[10px] font-mono font-bold text-tertiary bg-tertiary/10 px-2 py-0.5 rounded border border-tertiary/20">
                  AUTOMATIC SYSTEM SECURED
                </span>
              </div>

              <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* LEFT COLUMN: GUIDES AND CONTROLS */}
                <div className="space-y-6">
                  {/* STEP 1 */}
                  <div className="flex gap-4">
                    <div className="flex-none w-7 h-7 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-mono font-bold text-xs select-none">
                      1
                    </div>
                    <div className="space-y-2 w-full">
                      <p className="font-display font-bold text-sm text-on-surface">
                        โอนเงินตามบัญชีผู้รับโอน
                      </p>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        โอนขั้นต่ำ 50 THB เข้าบัญชีกสิกรไทยด้านขวา กรุณาส่งสลิปที่มีมูลค่าตรงกับการทำรายการเพื่อให้บอท AI ของเราทำการตรวจสอบได้อย่างรวดเร็ว
                      </p>
                    </div>
                  </div>

                  {/* STEP 2 */}
                  <div className="flex gap-4">
                    <div className="flex-none w-7 h-7 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-mono font-bold text-xs select-none">
                      2
                    </div>
                    <div className="space-y-2 w-full">
                      <p className="font-display font-bold text-sm text-on-surface">
                        อัปโหลดรูปภาพสลิปการทำธุรกรรมของคุณ
                      </p>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        เมื่อโอนเงินสำเร็จแล้ว ให้บันทึกสลิปและทำการแนบไฟล์อัปโหลดเข้ามาที่กล่องอัปโหลดด้านขวา เพื่อส่งข้อมูลสลิปให้บอท AI ตรวจสอบยอด
                      </p>
                    </div>
                  </div>

                  {/* STEP 3 */}
                  <div className="flex gap-4">
                    <div className="flex-none w-7 h-7 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-mono font-bold text-xs select-none">
                      3
                    </div>
                    <div className="space-y-1">
                      <p className="font-display font-bold text-sm text-on-surface">รอการอนุมัติและปรับยอดเครดิต</p>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        เซิร์ฟเวอร์จะเชื่อมต่อ API ยอดเงินเข้าบัญชี COMMAND CENTER ทันทีเพื่อให้ระบบประมวลผลและปรับยอดของคุณใน 30 วินาทีถึง 3 นาที
                      </p>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: INTERACTIVE VISUAL PAYMENT CANVAS */}
                <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 flex flex-col items-center justify-center min-h-[300px] relative">
                  
                  {/* BANK DETAILS & SLIP DROP AREA */}
                  <div className="w-full space-y-5">
                    
                    {/* BANK DETAIL CONTAINER */}
                    <div className="p-4 bg-surface-container border border-outline-variant/60 rounded-xl space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3 select-none">
                          <div className="w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0">
                            K
                          </div>
                          <div>
                            <p className="text-xs font-bold text-on-surface">กสิกรไทย (KBANK)</p>
                            <p className="font-mono text-xs text-on-surface-variant mt-0.5">147-1-31294-7</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleCopy('1471312947', 'เลขบัญชีธนาคาร')}
                          className="p-1.5 bg-surface-container-high border border-outline-variant/30 text-on-surface-variant hover:text-primary rounded-lg transition-colors cursor-pointer"
                          title="คัดลอกเลขบัญชี"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="pt-2.5 border-t border-outline-variant/30 flex justify-between items-center font-mono text-xs">
                        <span className="text-on-surface-variant text-[11px]">ชื่อบัญชีผู้รับโอน:</span>
                        <span className="font-bold text-primary font-sans">คณบดี เจริญยศ</span>
                      </div>
                    </div>

                    {/* SLIP UPLOAD SIMULATOR SECTION */}
                    <div className="space-y-3">
                      <div className="p-5 border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-primary-container/80 transition-colors bg-surface-container-lowest/50 relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleSlipChange}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        {slipPreview ? (
                          <div className="space-y-2 text-center w-full">
                            <img src={slipPreview} className="w-24 h-24 object-contain mx-auto rounded-lg" alt="Slip" />
                            <p className="text-[10px] text-tertiary truncate max-w-xs px-2">{slipFile?.name}</p>
                          </div>
                        ) : (
                          <>
                            <UploadCloud className="w-8 h-8 text-on-surface-variant" />
                            <div className="text-center">
                              <p className="text-xs font-semibold text-on-surface">คลิกเพื่ออัปโหลดรูปภาพสลิป</p>
                              <p className="text-[10px] text-on-surface-variant mt-0.5">รองรับไฟล์ PNG, JPG สูงสุด 5MB</p>
                            </div>
                          </>
                        )}
                      </div>

                      {slipFile && (
                        <button
                          onClick={handleBankSlipTopupSubmit}
                          disabled={isVerifyingTopup}
                          className="w-full py-2.5 bg-primary-container hover:opacity-90 text-on-primary-container font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform cursor-pointer"
                        >
                          {isVerifyingTopup ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>กำลังตรวจสอบสลิปด้วย AI...</span>
                            </>
                          ) : (
                            <span>ส่งสลิปเพื่อเคลมยอดเงิน</span>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-high p-4 flex justify-end gap-3 border-t border-outline-variant/20 select-none">
                <button 
                  onClick={() => { setSlipFile(null); setSlipPreview(null); }}
                  disabled={!slipFile}
                  className="px-5 py-2 text-on-surface-variant hover:text-on-surface disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-xs select-none transition-colors cursor-pointer"
                >
                  ล้างข้อมูลสลิป
                </button>
              </div>
            </motion.section>

            {/* TRANSACTIONS TABLE */}
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-outline-variant/30 pb-3 select-none">
                <History className="w-5 h-5 text-primary-container" />
                <h4 className="font-display font-extrabold text-sm uppercase">ประวัติการทำรายล่าสุดของคุณ</h4>
              </div>

              <div className="overflow-x-auto rounded-xl border border-outline-variant/40">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-surface-container-high text-primary-container uppercase text-[10px] select-none">
                    <tr>
                      <th className="p-3">เลขธุรกรรม ID</th>
                      <th className="p-3">ประเภทธุรกรรม</th>
                      <th className="p-3">รายละเอียดธุรกรรม</th>
                      <th className="p-3 text-right">จำนวน (THB)</th>
                      <th className="p-3 select-none">สถานะ</th>
                    </tr>
                  </thead>
                  <tbody className="text-on-surface-variant">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="border-b border-outline-variant/20 hover:bg-surface-variant/20 transition-colors">
                        <td className="p-3 text-on-surface truncate max-w-[120px]">{tx.id}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            tx.type === 'deposit' ? 'bg-green-500/10 text-green-400' : 'bg-primary-container/10 text-primary-container'
                          }`}>
                            {tx.type === 'deposit' ? 'ฝากเงิน' : 'ซื้อโมดูล'}
                          </span>
                        </td>
                        <td className="p-3 font-semibold text-on-surface">{tx.description}</td>
                        <td className={`p-3 text-right font-bold ${tx.amount > 0 ? 'text-green-400' : 'text-primary-container'}`}>
                          {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
                        </td>
                        <td className="p-3">
                          <span className={`font-semibold ${tx.status === 'success' ? 'text-green-400' : 'text-yellow-500'}`}>
                            {tx.status === 'success' ? 'สำเร็จ' : 'กำลังตรวจ'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 4: โปรไฟล์และการเข้าสู่ระบบ (AUTH STATE) ==================== */}
        {activeTab === 'profile' && (
          <div className="space-y-8">
            {user ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Profile card panel */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="glass-panel rounded-2xl p-6 border border-primary-container/20 inner-glow-red relative overflow-hidden flex flex-col items-center text-center">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-container via-tertiary to-primary-container" />
                    <div className="w-24 h-24 rounded-full border-4 border-primary-container overflow-hidden shadow-2xl relative select-none">
                      <img referrerPolicy="no-referrer" src={user.avatarUrl} className="w-[100%] h-[100%] object-cover" alt="" />
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-center gap-1.5 select-none text-tertiary">
                        <Award className="w-4 h-4 fill-tertiary/10 text-tertiary" />
                        <span className="font-mono text-xs font-bold uppercase">{user.rank}</span>
                      </div>
                      <h4 className="font-display font-black text-xl text-on-surface leading-tight">{user.username}</h4>
                      <p className="text-xs text-on-surface-variant font-mono">UID #234907129</p>
                    </div>

                    <div className="w-full grid grid-cols-2 gap-2 pt-6 pb-2 border-t border-outline-variant/30 mt-6 font-mono">
                      <div className="text-center p-2.5 bg-surface-container-low rounded-xl border border-outline-variant/30">
                        <span className="block text-[9px] text-on-surface-variant/80 uppercase">ยอดบาลานซ์</span>
                        <span className="text-sm font-bold text-primary-container">{user.balance.toFixed(2)}B</span>
                      </div>
                      <div className="text-center p-2.5 bg-surface-container-low rounded-xl border border-outline-variant/30">
                        <span className="block text-[9px] text-on-surface-variant/80 uppercase">สคริปต์ที่ชำระ</span>
                        <span className="text-sm font-bold text-tertiary">{inventory.length} ไอเทม</span>
                      </div>
                    </div>

                    <button
                      onClick={() => { setUser(null); setSuccessToast('ออกจากระบบสิทธิ์ใช้งานเรียบร้อย!'); }}
                      className="w-full mt-6 py-2.5 bg-on-primary-container/10 hover:bg-on-primary-container/25 text-primary-container border border-outline-variant/40 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-colors cursor-pointer select-none"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>ออกจากระบบผู้ลงทะเบียน</span>
                    </button>
                  </div>

                  {/* Help Support links card */}
                  <div className="glass-panel p-5 rounded-2xl border border-outline-variant/30 space-y-3">
                    <h5 className="font-display font-bold text-sm text-primary flex items-center gap-2 border-b border-outline-variant/10 pb-2 select-none">
                      <HelpCircle className="w-4 h-4" />
                      ช่องทางซัพพอร์ตแอดมิน
                    </h5>
                    <p className="text-[11px] text-on-surface-variant leading-relaxed">
                      หากผู้เล่นมีปัญหาเกี่ยวกับการสั่งซื้อ หรือการดึงเครดิตซอง สามารถสอบถามนักพัฒนาได้ตลอด 24 ชั่วโมง
                    </p>
                    <button
                      onClick={() => setSuccessToast('เชื่อมต่อ Discord Support ล๊อบบี้หลักสำเร็จ!')}
                      className="w-full py-2 bg-surface-container-high border border-outline-variant/30 text-on-surface hover:text-primary transition-all text-xs font-bold rounded-lg cursor-pointer"
                    >
                      CONTACT SYSTEM SUPPORT
                    </button>
                  </div>
                </div>

                {/* HISTORIES AND SECURITY DETAILS */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Owned item inventory dashboard snippet */}
                  <div className="glass-card rounded-2xl p-6 space-y-4">
                    <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-3 select-none">
                      <Terminal className="w-5 h-5 text-primary-container" />
                      <h4 className="font-display font-bold text-sm uppercase">คลังแสงพกพาส่วนบุคคลของคุณ</h4>
                    </div>
                    {inventory.length === 0 ? (
                      <p className="text-xs text-on-surface-variant">คลังแสงว่างเปล่า ไปซื้อสคริปต์ใหม่ทีลาดเลย!</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {scripts
                          .filter(s => inventory.includes(s.id))
                          .map((script) => (
                            <div key={script.id} className="p-3 bg-surface-container-low border border-outline-variant/40 rounded-xl flex items-center justify-between">
                              <span className="font-display font-bold text-xs text-on-surface">{script.name}</span>
                              <span className="text-[10px] font-mono font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded">
                                ACTIVE
                              </span>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* Platform details summary card */}
                  <div className="glass-card rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3 select-none">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-tertiary" />
                        <h4 className="font-display font-bold text-sm uppercase">สิทธิ์และระดับแรงค์ระบบ</h4>
                      </div>
                      <span className="text-[10px] text-tertiary font-bold font-mono">Rank Level VIP</span>
                    </div>

                    <div className="space-y-3 font-mono text-xs text-on-surface-variant">
                      <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                        <span>สิทธิ์เช่าสคริปต์พิเศษ:</span>
                        <span className="text-green-400 font-bold">เปิดสิทธิ์ถาวร</span>
                      </div>
                      <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                        <span>ความเร็วการสะสมยอด:</span>
                        <span className="text-green-400 font-bold">โบนัสต้อนรับ x2</span>
                      </div>
                      <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                        <span>วันหมดอายุบัญชี VIP:</span>
                        <span>ไม่มีวันหมดอายุ • ถาวร</span>
                      </div>
                      <div className="flex justify-between">
                        <span>เข้ารหัส AES-256 ความปลอดภัย:</span>
                        <span className="text-tertiary font-bold">ความเสถียร 100%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              
              /* ==================== LOGGED OUT AUTHINTERFACE ==================== */
              <div className="max-w-md mx-auto space-y-6">
                
                {/* Logo and tactical header sign */}
                <div className="text-center space-y-2 select-none pt-4">
                  <h1 className="font-display text-3xl font-black text-primary-container tracking-tighter uppercase">
                    COMMAND CENTER
                  </h1>
                  <p className="font-mono text-xs text-on-surface-variant tracking-[0.2em] uppercase">
                    Tactical Operations Unit
                  </p>
                </div>

                <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/30">
                  
                  {/* Inner Tab switches */}
                  <div className="flex border-b border-outline-variant/20 select-none font-display">
                    <button
                      onClick={() => setAuthTab('login')}
                      className={`flex-1 py-4 font-bold text-sm transition-all focus:outline-none cursor-pointer ${
                        authTab === 'login' 
                          ? 'text-primary border-b-2 border-primary bg-primary-container/5' 
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      เข้าสู่ระบบสมาชิก
                    </button>
                    <button
                      onClick={() => setAuthTab('register')}
                      className={`flex-1 py-4 font-bold text-sm transition-all focus:outline-none cursor-pointer ${
                        authTab === 'register' 
                          ? 'text-primary border-b-2 border-primary bg-primary-container/5' 
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      สมัครสมาชิกใหม่
                    </button>
                  </div>

                  <div className="p-6 md:p-8">
                    
                    {/* LOGIN FORM DISPLAY */}
                    {authTab === 'login' && (
                      <form onSubmit={handleLoginSubmit} className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-[11px] text-on-surface-variant font-mono uppercase tracking-wider px-1">ชื่อผู้ใช้งาน</label>
                          <div className="relative group">
                            <User className="w-4 h-4 text-outline group-focus-within:text-primary-container absolute left-4.5 top-1/2 -translate-y-1/2 transition-colors" />
                            <input
                              type="text"
                              required
                              value={loginUsername}
                              onChange={(e) => setLoginUsername(e.target.value)}
                              placeholder="Username"
                              className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-xl py-3 pl-12 pr-4 text-xs focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container text-on-surface transition-all placeholder:text-outline/45"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] text-on-surface-variant font-mono uppercase tracking-wider px-1">รหัสผ่าน</label>
                          <div className="relative group">
                            <Lock className="w-4 h-4 text-outline group-focus-within:text-primary-container absolute left-4.5 top-1/2 -translate-y-1/2 transition-colors" />
                            <input
                              type="password"
                              required
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                              placeholder="Password"
                              className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-xl py-3 pl-12 pr-4 text-xs focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container text-on-surface transition-all placeholder:text-outline/45"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1 text-[11px]">
                          <label className="flex items-center gap-1.5 cursor-pointer select-none group text-on-surface-variant">
                            <input type="checkbox" defaultChecked className="rounded border-outline-variant bg-surface text-primary-container focus:ring-primary-container/20 w-3.5 h-3.5" />
                            <span className="group-hover:text-on-surface">จดจำของฉัน</span>
                          </label>
                          <a href="#" onClick={(e) => { e.preventDefault(); setSuccessToast('ติดต่อดิสคอร์ดซัพพอร์ตแอดมิน เพื่อทำเรื่องขอรีรหัสผ่านฟรี!'); }} className="text-primary-container hover:underline hover:text-primary">ลืมรหัสผ่าน?</a>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-primary-container hover:opacity-90 text-on-primary-container font-extrabold font-display py-3 rounded-xl text-xs active:scale-95 transition-all shadow-[0_0_20px_rgba(255,85,64,0.3)] mt-6 flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          ยืนยันการเข้าใช้
                        </button>
                      </form>
                    )}

                    {/* REGISTER FORM DISPLAY */}
                    {authTab === 'register' && (
                      <form onSubmit={handleRegisterSubmit} className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-[11px] text-on-surface-variant font-mono uppercase tracking-wider px-1">ชื่อผู้ใช้งาน</label>
                          <div className="relative group">
                            <User className="w-4 h-4 text-outline group-focus-within:text-primary-container absolute left-4.5 top-1/2 -translate-y-1/2 transition-colors" />
                            <input
                              type="text"
                              required
                              value={registerUsername}
                              onChange={(e) => setRegisterUsername(e.target.value)}
                              placeholder="Username"
                              className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-xl py-3 pl-12 pr-4 text-xs focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container text-on-surface transition-all placeholder:text-outline/45"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] text-on-surface-variant font-mono uppercase tracking-wider px-1">อีเมลติดต่อกลับ</label>
                          <div className="relative group">
                            <MailIcon className="w-4 h-4 text-outline group-focus-within:text-primary-container absolute left-4.5 top-1/2 -translate-y-1/2 transition-colors" />
                            <input
                              type="email"
                              required
                              value={registerEmail}
                              onChange={(e) => setRegisterEmail(e.target.value)}
                              placeholder="example@email.com"
                              className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-xl py-3 pl-12 pr-4 text-xs focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container text-on-surface transition-all placeholder:text-outline/45"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] text-on-surface-variant font-mono uppercase tracking-wider px-1">รหัสผ่านสำหรับเข้าล็อบบี้</label>
                          <div className="relative group">
                            <Lock className="w-4 h-4 text-outline group-focus-within:text-primary-container absolute left-4.5 top-1/2 -translate-y-1/2 transition-colors" />
                            <input
                              type="password"
                              required
                              value={registerPassword}
                              onChange={(e) => setRegisterPassword(e.target.value)}
                              placeholder="Create Password"
                              className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-xl py-3 pl-12 pr-4 text-xs focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container text-on-surface transition-all placeholder:text-outline/45"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-primary-container hover:opacity-90 text-on-primary-container font-extrabold font-display py-3 rounded-xl text-xs active:scale-95 transition-all shadow-[0_0_20px_rgba(255,85,64,0.3)] mt-6 flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <PlusCircle className="w-4 h-4" />
                          สร้างบัญชีใหม่
                        </button>
                      </form>
                    )}

                    {/* Divider element */}
                    <div className="relative py-6 select-none">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-outline-variant/20" />
                      </div>
                      <div className="relative flex justify-center text-[10px]">
                        <span className="bg-[#1f1f1f] px-3 text-on-surface-variant font-mono uppercase">หรือเชื่อมต่อด้วย</span>
                      </div>
                    </div>

                    {/* Social Logins */}
                    <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto select-none">
                      <button
                        onClick={() => {
                          setUser({
                            username: 'DISCORD_USER',
                            rank: 'STANDARD Recruits',
                            balance: 50.00,
                            avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADsC7hmRpt404eZ0b-oQnfYy7JZejh1AhyyvU216HDmQsdoJxLlAxtTgqajNnWu3q5a_zv0B8dgwht4fpXTebOysd2UO3zq_A9qtG8hAvOQS-7XbaWXL5xM2u_NsjMnv-jKm1dCOmD_zIF535agqhxEPF9CdaeKXDDyv5Fpa-ZE-GC79ptUzmvOzO2dS0xecqNnL8QGayQxRl4kWuktmU-x6mq3vVom1VKCfAPCEIskhp343g1mDVViBbFlVdkjQKdgM16YFGsODI'
                          });
                          setSuccessToast('เชื่อมโยงและเข้าสิทธิ์ใช้งานผ่านบัญชี Discord ในระบบ COMMAND CENTER เรียบร้อย!');
                        }}
                        className="flex items-center justify-center gap-2 py-2.5 border border-outline-variant/30 rounded-xl text-xs font-mono font-medium hover:bg-surface-variant transition-colors cursor-pointer"
                      >
                        <svg className="w-4 h-4 text-[#ff5540]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12,2A10,10,0,0,0,2,12a10,10,0,0,0,10,10,10,10,0,0,0,10-10A10,10,0,0,0,12,2Zm3.55,14.28L14.73,15,14.07,14.33,12.74,13l1.33-1.33,1.33-1.33.67-.67.67-.67h.67l-.67.67L15,11.33,14,12.33,13,13.33l1,1,1,1,.67.67.67.67H15.55Z"></path>
                        </svg>
                        <span>Discord</span>
                      </button>
                      <button
                        onClick={() => {
                          setUser({
                            username: 'GOOGLE_VIP_CHIEF',
                            rank: 'VIP RANK',
                            balance: 1000.00,
                            avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkoK6WRtJ4ZX6go_YYvABHT0-KWj0cQt9wOUhY023xptdBmneZdzoJzSQtCR7CqOs8uRLPuAeiHy4GvP4NDhMYma0LSOX7KfC_onXNO75y8OKeBS5Gz-084qpI19mxvvHi3zkKBLn-bZ-9gKCMnwC0SzZXUKRDz-c30uYhCP_SYICCtCbb1qzrY9OS08qX1sRO0DwN1fXZKrztb3MWscngBpwY_yGSazU0ly_VFuWcGzMSou8raF_SGBNi6W4ktSKdYnVMABzN-yY'
                          });
                          setSuccessToast('เชื่อมโยงดึงรหัสผ่านและเข้าสิทธิ์ใช้งาน Google VIP ทันใจ เรียบร้อย!');
                        }}
                        className="flex items-center justify-center gap-2 py-2.5 border border-outline-variant/30 rounded-xl text-xs font-mono font-medium hover:bg-surface-variant transition-colors cursor-pointer"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.92 3.24-1.92 4.28-1.24 1.24-3.16 2.56-6.8 2.56-5.88 0-10.48-4.76-10.48-10.64s4.6-10.64 10.48-10.64c3.16 0 5.48 1.24 7.16 2.84l2.24-2.24C18.44 1.64 15.72 0 12.48 0 6.64 0 1.8 4.76 1.8 10.64s4.84 10.64 10.68 10.64c3.16 0 5.68-1.04 7.64-3.08 2.04-2.04 2.68-4.92 2.68-7.28 0-.68-.04-1.32-.16-2H12.48z"></path>
                        </svg>
                        <span>Google</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Footer and Security notice */}
                <div className="text-center font-mono text-[9px] text-[#ebbbb4]/45 select-none pt-4">
                  © 2026 COMMAND CENTER SYSTEM • SECURED BY SQUAD_LEADER_01
                </div>
              </div>
            )}
          </div>
        )}

        {/* REASSURING HELP CARD SECTIONS - Bottom decoration matching screen help blocks */}
        <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 select-none">
          <div 
            onClick={() => {
              setSuccessToast('ระบบบอทซัพพอร์ตกำลังพิมพ์ตอบแชทกรุณารอตรวจธุรกรรมที่กล่องข้อความบอร์ดหลัก!');
            }}
            className="glass-panel p-5 rounded-2xl flex items-center gap-4 border-l-2 border-l-tertiary shadow cursor-pointer hover:bg-surface-variant/30 transition-colors"
          >
            <div className="p-2 bg-tertiary/10 rounded-xl border border-tertiary/20 text-tertiary">
              <PlusCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-sm text-on-surface">มีปัญหาในการทำธุรกรรมหรือใช้งานสคริปต์?</p>
              <p className="text-xs text-on-surface-variant mt-0.5">ติดต่อฝ่ายสนับสนุนทางเทคนิคของ COMMAND CENTER ได้ตลอด 24 ชม.</p>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl flex items-center gap-4 border-l-2 border-l-primary-container shadow">
            <div className="p-2 bg-primary-container/10 rounded-xl border border-primary-container/20 text-primary-container">
              <Award className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <p className="font-bold text-sm text-on-surface">ระบบความปลอดภัยครอบคลุมสูงสุด</p>
              <p className="text-xs text-on-surface-variant mt-0.5">ข้อมูลทางการเงินและสถิติคีย์ถอดรหัสเชื่อมต่อข้อมูลเกมส์ของคุณเข้ารหัสด้วย AES-256</p>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Action Button / Cart decoration - Mobile tab bottom controller */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-surface-container/90 backdrop-blur-xl border-t border-primary-container/20 shadow-[0_-4px_20px_rgba(255,85,64,0.15)] flex justify-around items-center h-20 px-2 rounded-t-xl select-none font-sans text-[10px]">
        <button
          onClick={() => { setActiveTab('market'); setSelectedCategory('ทั้งหมด'); }}
          className={`flex flex-col items-center justify-center p-2 active:scale-90 transition-all font-semibold ${
            activeTab === 'market' ? 'text-primary' : 'text-on-surface-variant'
          }`}
        >
          <ShoppingBag className={`w-5 h-5 ${activeTab === 'market' && 'text-primary'}`} />
          <span className="mt-1">ตลาด</span>
        </button>

        <button
          onClick={() => setActiveTab('scripts')}
          className={`flex flex-col items-center justify-center p-2 active:scale-90 transition-all font-semibold ${
            activeTab === 'scripts' ? 'text-primary' : 'text-on-surface-variant'
          }`}
        >
          <Terminal className={`w-5 h-5 ${activeTab === 'scripts' && 'text-primary'}`} />
          <span className="mt-1">สคริปต์</span>
        </button>

        {/* Highlight top up circle button */}
        <button
          onClick={() => { setActiveTab('topup'); setSelectedTopupMethod('bank'); }}
          className={`flex flex-col items-center justify-center p-2 active:scale-90 transition-all font-extrabold ${
            activeTab === 'topup' ? 'text-primary bg-primary-container/10 rounded-xl' : 'text-on-surface-variant'
          }`}
        >
          <Wallet className={`w-5 h-5 ${activeTab === 'topup' && 'text-primary'}`} />
          <span className="mt-1">เติมเงิน</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center p-2 active:scale-90 transition-all font-semibold ${
            activeTab === 'profile' ? 'text-primary' : 'text-on-surface-variant'
          }`}
        >
          <User className={`w-5 h-5 ${activeTab === 'profile' && 'text-primary'}`} />
          <span className="mt-1">โปรไฟล์</span>
        </button>
      </nav>

      {/* CONFIRMATION PURCHASE DIALOG MODAL */}
      <AnimatePresence>
        {confirmPurchaseScript && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-surface-container rounded-2xl max-w-sm w-full p-6 border border-outline-variant/50 relative text-center space-y-4 shadow-2xl"
            >
              <button 
                onClick={() => setConfirmPurchaseScript(null)}
                className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 bg-primary-container/10 rounded-full flex items-center justify-center mx-auto border-2 border-primary-container/30">
                <ShoppingBag className="w-8 h-8 text-primary-container" />
              </div>

              <div className="space-y-1">
                <h4 className="font-display font-black text-lg text-on-surface-variant">ยืนยันรายการซื้อเช่าสคริปต์?</h4>
                <p className="text-xs text-on-surface">
                  คุณต้องการเช่า <span className="font-bold text-primary-container">{confirmPurchaseScript.name}</span> เป็นระยะเวลาแบบถาวร (ไม่มีวันหมดอายุ)?
                </p>
              </div>

              <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30 text-xs">
                <div className="flex justify-between border-b border-outline-variant/10 pb-2 mb-2">
                  <span>ราคาสินค้าหลัก:</span>
                  <span className="font-bold text-primary-container">{confirmPurchaseScript.price} THB</span>
                </div>
                <div className="flex justify-between">
                  <span>เครดิตปัจจุบันมียอด:</span>
                  <span className="font-bold text-tertiary">
                    {user ? `${user.balance.toFixed(2)} THB` : '0.00 THB'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setConfirmPurchaseScript(null)}
                  className="py-3 mt-1 text-xs font-bold text-on-surface-variant bg-surface-container-high rounded-xl hover:text-on-surface transition-colors cursor-pointer"
                >
                  ยกเลิกทำรายการ
                </button>
                <button
                  onClick={() => executeBuyScript(confirmPurchaseScript)}
                  className="py-3 mt-1 text-xs font-bold bg-primary-container text-on-primary-container rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                >
                  ยืนยันหักเงินเช่าไอเทม
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Simple internal icon component for email field markup
function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
