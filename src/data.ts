import { ScriptItem, ActivityLog, UpdateLog, TransactionHistory } from './types';

export const INITIAL_SCRIPTS: ScriptItem[] = [
  {
    id: 'script-1',
    name: 'ULTIMATE AIM ASSIST V4',
    description: 'ระบบช่วยเล็งที่แม่นยำที่สุด ปรับแต่งความเร็วได้ และมีการทำงานแบบ Humanized เพื่อป้องกันการตรวจสอบ',
    price: 450,
    category: 'Battle Royale',
    tag: 'Aimbot',
    status: 'Undetected',
    statusColor: 'green',
    rating: 4.9,
    downloads: '12.4k',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-1hy3VFxP9Q473cL_QSo9y8iEuHn8ApgmETkV65Bdsc9el0bGZTF_932wEPjOB9a3syotyfftxdMQrhlGNkddy7RmoD6GkPBCnDrPouVmz1BWGXznrzPDSToVbUwI6JWDWo6VACrkDfJ2C3BcULdxkh5jAck2QWGSpKYgtukLrRg34e1JidOULyJOcXSBLJ_OFECB3gEYKMb9K5OtgcWTe5cBP-WjyoQ9e1mibf2bYELIOQY4r8rB7kcWOY28sZoFr30kDeOa1fQ'
  },
  {
    id: 'script-2',
    name: 'X-RAY VISION PRO',
    description: 'มองเห็นศัตรูทะลุกำแพง แสดงระยะทาง เลือด และชื่อทีม แบบ Real-time ไม่กระตุก บังคับทิศทางได้อย่างใจนึก',
    price: 350,
    category: 'Rank Mode',
    tag: 'ESP / Wallhack',
    status: 'Undetected',
    statusColor: 'green',
    rating: 4.8,
    downloads: '8.9k',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ1p3tUOKWx6da_Cs_tpvJsv2uZs7k5LCd_SX2lmUi0dq0jqJlwFPlFtQjoO3dRVxlHIWWmqCcDj_0hFPANf6ykthKPe-c4A6YPuAfXO-urMxfYCOq-cmF8xzUUbPa_OT0kovahlXaEd0s8_gk7Hd2t_TMfQ9bpzqy7zJmmUlXdQ4SDk7lkYUt4Pjibwtznh_f3OPZJfySeq-gxR0pXkRjZoAJlbtaXqjArjxfXFSrWlSzZ04U4XkKxBZ-ZNAPtIlcNMtYVJ9LUMg'
  },
  {
    id: 'script-3',
    name: 'SPEED FLASH X',
    description: 'เพิ่มความเร็วในการเคลื่อนที่และการรีโหลดกระสุน ปรับระดับความเร็วได้หลายระดับ พร้อมคุณสมบัติวิ่งทะลุสิ่งกีดขวาง',
    price: 290,
    category: 'Battle Royale',
    tag: 'Movement',
    status: 'Updating',
    statusColor: 'yellow',
    rating: 4.5,
    downloads: '5.2k',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQlacU2f5_RRg9AV26Gzp0uTSlcGgiYqMy97AG9GTXwWANRNJEd3bfivvI5FOYeMEozlf54_EbecoWmOWLYUxD3YF4UAS9kggvP-zD5MhjdAlhTRclPYy_UzqDsS2oFjF5Fr0Abl3WhrXXyjVW6by0xq2ExPRBE498NpwEwxXWBrwHb6VKvunjcyI8XOoFrHkXh5ju0gngsxZiAMfF4n0U7ZjaXBXJBBp_7s9fl1LIjWLUphxZWqcTVdJsQ6Q2I7pLNKz9ujP_w6s'
  },
  {
    id: 'script-4',
    name: 'STEALTH SHIELD PRO',
    description: 'ระบบป้องกันการแบนขั้นสูง ล้าง Log อัตโนมัติและเปลี่ยน HWID เพื่อความปลอดภัยสูงสุดจากสตาฟผู้ดูแลระบบ',
    price: 600,
    category: 'Clash Squad',
    tag: 'Security',
    status: 'Active',
    statusColor: 'green',
    rating: 5.0,
    downloads: '11.8k',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmpmf_wFjSyaqB74ZsaIdrJiuB4DTq4WYaUQjjnvCUn4f-1fNVN2uDtuxxTAQkdGrfVAglc1nyeh0cLR0kRwIvHfk7Vv6SakcuUNTqybuYc-VoOzt35-g-dh9I-n4Z1UCKnKkeBvjjKO3jgQPqSjoRT3wlAihb1A56mIyLJyDA0WUN-oB4oMsO9V3pTs4Yw4m657CYAvlESPsMv9oosJUBW15vthlPpA26eevXjHpOFNnzZcTpCI1BMCltqL9SXgnzoIDN5AD83fc'
  },
  {
    id: 'script-5',
    name: 'GHOST SQUAD BUNDLE',
    description: 'รวมทุกฟีเจอร์ Aimbot, ESP, และ Speed ในแพ็กเกจเดียว คุ้มค่าที่สุดสำหรับมืออาชีพที่มองหาความเป็นเลิศสะกดทุกการเล่น',
    price: 1200,
    category: 'Battle Royale',
    tag: 'Full Suite',
    status: 'Best Value',
    statusColor: 'red',
    rating: 4.9,
    downloads: '20.5k',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAikbAGCH7bCww2Q0JV_i2UOFBlaJpIX0LGsLu-9eO2dQqLpx5sfHeYdft0ckzAsOe_X_Z0EwbLyg_cItNLy5QMeanynsWTWSJX7lE6AQO_7X1ERaGXqP_vldQVgu43STFxm9zJ83cvOa81iLBa-pMtoply6tKz1FQ2N6Yha32iSkWFgY7pDdsklG3UVTNm1_LKvCmUjvueXdxdS712HMexcU-RMZ5p40qmMTdQ6ULHgzHumylEQF8BEv6Wwhj5_YN3uJXrwJKbflg'
  },
  {
    id: 'script-6',
    name: 'IGNITE VULCAN PRO',
    description: 'ระบบล็อกหัวคู่ความร้อนสูง บายพาสสมบูรณ์แบบสำหรับทัวร์นาเมนต์และการแข่งขันจัดอันดับความตึงระดับท็อป',
    price: 599,
    category: 'Rank Mode',
    tag: 'Aimbot',
    status: 'Undetected',
    statusColor: 'green',
    rating: 4.9,
    downloads: '15.6k',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9yJRxuv_ss6U6zxrYQniijzlMOkh7kehBTI-sXi_2hya4cdJwzPStWU26ijHf-2cbdKoPkTfP1mDHk7XczPYKpRMi194iWAjkCCz4vraBTCByS_0cddidgta-wtxjkLsZ16e2nSc8vs352n9uxsAs1eAVRkjGIeTL24Xggw5ux1645etSOIuNq-Xs4bpkC98hIbeG2xez2ufu8YecHGeHJxoy4qWtHf7qOVpEeSI_OfZZS5PmvLK6nkWF3e5pHDIQxqZZc74iKDc'
  }
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'log-1',
    user: 'K_DRAGON_TH',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzEEtOnCu0jFe7KwMdW9Hg7RkpZZLyXW2dwD_iQ5s1e0Kf-VC-le93hLIs9ZbdLJSmPsRPDUw-ua-NbsyOJboeT76EkqtnlPSL6WTPDaaaqtA2ytGCtoEFYjkYtSgHcP8lqDWMNeWjMQAg_qHGuWUdggl6AfwoVzZgM18BHZEJtAuja_Vwzx4MMxPuoR7WHGsUvsMcFscoETvD8hrdDr-SsvsaSYfD6vM8Q8KE0_D7PSA9FZ3QNISy3yOM1XsWyGKKyD1CgEo5Eis',
    action: 'ซื้อสคริปต์ Ignite Vulcan Pro (30 วัน)',
    timeLabel: '2 นาทีที่แล้ว',
    statusType: 'primary'
  },
  {
    id: 'log-2',
    user: 'Z_SNIPER_007',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDs-2p96LXU26YQl1NKDd5fcplsrW5HrF-69iT0jby8Fof_XVlgTDA3xOz4bCWX-k0A6XTCTTQcma481CgKsmyeicgzxiKXJqzUiMr5U5QsDbvTXOB98yJOT9KVwRMHMvzwN8a4KATG9ItsUgVh0a7_8fiehIaXkFTYjcXNjaoXTPpRPuIWVK3fqitcLKbiJkHW_KmI11GHz1iTP-gvsuY2PaURIjTY-r7splDLl4zPy52392Pdg2PqwVL2tvJYpMu32gT-NRTveAU',
    action: 'เติมเงินผ่าน PromptPay 1,000 THB',
    timeLabel: '5 นาทีที่แล้ว',
    statusType: 'tertiary'
  },
  {
    id: 'log-3',
    user: 'MAMBA_KING',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkPhcBxTuh-Iz4YC03Ox5azQCYfyPd0816w9SrveNXk2couTRilzhTpQV_uOCbwRxcLJTaaj-pzsJz6SXrJit7PZhZDcifXG_ahTEhQWLKmcM8ndeYD5UqEq8U0wLau_gZ1dTYiU4bZf5k6qnk5LLfkXSycNeeuCX_h9wmIpAnX3CMyV6gOFfhMxU37wNrVNdTlT9flUM12La4Nee1OvfISKiN_afX4GURrSeWcFWS_n7I2duHBBkcyT29Uu-Dl7pMx0Aa_c0_v-Q',
    action: 'ซื้อสคริปต์ Phantom Vision X (7 วัน)',
    timeLabel: '12 นาทีที่แล้ว',
    statusType: 'primary'
  }
];

export const INITIAL_UPDATE_LOGS: UpdateLog[] = [
  {
    id: 'update-1',
    time: '2026-05-31 18:30',
    scriptName: 'Ultimate Aim Assist',
    version: 'v4.2.1',
    status: 'Stable'
  },
  {
    id: 'update-2',
    time: '2026-05-31 16:15',
    scriptName: 'X-Ray Vision Pro',
    version: 'v3.0.0',
    status: 'Stable'
  },
  {
    id: 'update-3',
    time: '2026-05-30 22:45',
    scriptName: 'Speed Flash X',
    version: 'v2.1.0',
    status: 'Patching'
  },
  {
    id: 'update-4',
    time: '2026-05-30 18:20',
    scriptName: 'Stealth Shield Pro',
    version: 'v5.5.2',
    status: 'Stable'
  }
];

export const INITIAL_TRANSACTION_HISTORY: TransactionHistory[] = [
  {
    id: 'tx-1',
    type: 'deposit',
    description: 'เติมเงินผ่าน TrueMoney Wallet',
    amount: 500,
    date: '31 พ.ค. 2026 14:20',
    status: 'success'
  },
  {
    id: 'tx-2',
    type: 'purchase',
    description: 'เช่าสคริปต์ STEALTH SHIELD PRO (30 วัน)',
    amount: -600,
    date: '30 พ.ค. 2026 18:40',
    status: 'success'
  },
  {
    id: 'tx-3',
    type: 'deposit',
    description: 'เติมเงินผ่าน PromptPay',
    amount: 1000,
    date: '28 พ.ค. 2026 11:15',
    status: 'success'
  },
  {
    id: 'tx-4',
    type: 'purchase',
    description: 'เช่าสคริปต์ ULTIMATE AIM ASSIST V4 (30 วัน)',
    amount: -450,
    date: '28 พ.ค. 2026 11:30',
    status: 'success'
  }
];
