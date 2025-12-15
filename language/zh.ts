
import { TranslationData } from '../types';

export const zh: TranslationData = {
  appName: "Meth0d",
  slogan: "Mutatus, iterum resurgo melior.",
  nav: {
    current: "行动",
    analysis: "新协议",
    archive: "档案馆"
  },
  themeNames: {
    neutral: "中性（基础）",
    socialist: "社会主义",
    cozy: "温馨台灯",
    brutal: "新野兽派",
    amoled: "纯黑",
    premium: "高级",
    kitty: "粉红小猫",
    pirate: "海盗旗"
  },
  tutorial: {
    welcome: "欢迎，同志。",
    startBtn: "开始训练",
    skipBtn: "跳过",
    nextBtn: "下一步",
    finishBtn: "开始实践",
    slides: {
      intro: {
        title: "我们为什么在这里？",
        content: "这不仅仅是一个记事本。它是一个重构你思维的工具。世界充满矛盾，形式逻辑（'是'或'否'）往往失效。我们需要辩证法。"
      },
      foundation: {
        title: "第一部分：哲学 — 基础",
        analogy: "基础",
        content: "马克思主义建立在两大支柱之上。\n\n1. 辩证唯物主义（辩唯）：我们的认知方法。我们采用了黑格尔的辩证法（通过矛盾发展），但摒弃了唯心主义。物质第一性，意识第二性。\n\n2. 历史唯物主义（历唯）：存在决定意识。历史不是由英雄的思想推动的，而是由争取资源的阶级斗争推动的。"
      },
      walls: {
        title: "第二部分：政治经济学 — 墙壁",
        analogy: "墙壁",
        content: "在这个基础之上是对现实——资本主义的分析。\n\n这里的巅峰是马克思的《资本论》。它是对资产阶级经济学的'扬弃'。马克思证明了利润是未支付的劳动（剩余价值），并且该系统不可避免地滋生危机。"
      },
      roof: {
        title: "第三部分：科学社会主义 — 屋顶",
        analogy: "屋顶与目标",
        content: "这回答了'怎么办？'的问题。\n\n如果说政治经济学是诊断，那么科学社会主义就是治疗方案。阶级斗争，无产阶级专政，以及建立一个没有剥削的社会。没有这个目标，理论就是死的。"
      },
      method: {
        title: "总结：Meth0d",
        analogy: "螺旋",
        content: "在辩证法中，螺旋的每一个新循环不只是重复前一个，而是实现了质的飞跃。\n\n'Mutatus, iterum resurgo melior' —— 改变后，我以更好的姿态重生。\n\n发展不仅是横向的，也是纵向的。你的任务是将数量（问题）转化为新的质量（解决方案）。"
      }
    }
  },
  stages: {
    init: "目标对象",
    modules: "第一阶段：向量",
    synthesis: "第二阶段：矛盾",
    strategy: "第三阶段：战略",
    risks: "第四阶段：自我批评",
    completed: "简报就绪"
  },
  dashboard: {
    title: "指挥所",
    emptyTitle: "行动暂停",
    emptyDesc: "敌人从不睡觉。针对新情况激活分析协议。",
    activeTasks: "当前行动",
    untitled: "对象 #",
    searchPlaceholder: "按论点搜索...",
    filterAll: "全部",
    filterActive: "进行中",
    filterDone: "已完成"
  },
  wizard: {
    titleNew: "协议初始化",
    titleObject: "分析对象",
    placeholderName: "代号（例如 '供应危机'）",
    placeholderObject: "枯燥且实事求是地描述现象、事件或过程。",
    descName: "为行动设置标识符。",
    descObject: "我们到底在解剖什么？事实，只有事实。",
    btnNext: "接受",
    btnBack: "返回",
    btnSave: "保存并退出",
    btnFinish: "生成简报",
    contextLabel: "行动背景",

    tagsLabel: "标签",
    tagsPlaceholder: "以逗号分隔的类别（例如：工作，紧急）",
    
    synthesisTitle: "第二阶段：主要矛盾",
    synthesisDesc: "分析第一阶段的答案。找出推动这一过程的一个主要矛盾（X与Y的斗争）。",
    synthesisPlaceholder: "主要斗争在于...",
    
    strategyTitle: "第三阶段：战略向量",
    strategyDesc: "我们要如何利用这个矛盾？确定打击点。",
    vulnLabel: "系统漏洞：",
    vulnPlaceholder: "敌对系统哪里最薄弱？矛盾在哪里迸发？",
    oppLabel: "我们的机会：",
    oppPlaceholder: "如何将其转化为集体的优势？具体方向。",

    risksTitle: "第四阶段：自我批评（审计）",
    risksDesc: "冷静下来。对计划进行压力测试。",
    risksLabel: "风险与盲点：",
    risksPlaceholder: "什么可能出错？我们错过了什么？'黑天鹅'。",
    
    hintLabel: "方法论者笔记：",
    loading: "正在启动分析模块...",

    templatesTitle: "标准方案"
  },
  view: {
    objectLabel: "分析对象",
    contradictionLabel: "主要矛盾",
    briefingTitle: "战略简报",
    modulesTitle: "模块数据（第一阶段）",
    strategyTitle: "行动计划（第三阶段）",
    risksTitle: "风险审计（第四阶段）",
    btnEdit: "修正",
    btnShare: "加密至中心",
    btnPrint: "打印 / PDF",
    btnExportMD: "下载 .MD",
    btnExportJSON: "下载 .JSON",
    btnArchive: "归档",
    confirmArchive: "完成行动并归档？",
    shareSuccess: "数据已复制。",

    praxisTitle: "实践日志",
    praxisPlaceholder: "记录事件、结果或新观察...",
    btnAddLog: "添加条目",

    connectionsTitle: "系统联系",
    btnAddConnection: "链接到...",
    noConnections: "未找到连接。对象是孤立的（形而上学的）。",
    selectConnection: "选择要链接的对象：",

    tacticsTitle: "战术（清单）",
    tacticsPlaceholder: "新战术任务...",
    btnAddItem: "添加任务"
  },
  archive: {
    title: "档案馆",
    empty: "档案清空。历史正在被书写。",
    btnRestore: "投入工作",
    btnBurn: "销毁",
    confirmDelete: "永久删除？",
    labelArchive: "已完成",
    backupSection: "数据管理",
    btnExport: "下载备份",
    btnImport: "导入备份",
    dragDropLabel: "将备份文件拖放到此处",
    orClick: "或点击选择文件",
    importSuccess: "数据恢复成功。",
    importError: "读取文件失败。"
  },
  questions: {
    q_history: {
      categoryLabel: "模块 1：历史",
      text: "因果关系：我们是如何到达这里的，接下来会发生什么？",
      hint: "追踪物质原因。哪些转折点导致了当前状态？",
      placeholder: "从历史上看，这是由于..."
    },
    q_class_interest: {
      categoryLabel: "模块 2：阶级",
      text: "阶级本质：Cui prodest?（谁受益？）",
      hint: "这服务于谁的利益？谁获利，谁买单？它如何改变力量平衡？",
      placeholder: "这有利于...，而...付出了代价。"
    },
    q_system: {
      categoryLabel: "模块 3：系统",
      text: "系统联系：这如何适应大局？",
      hint: "与经济、政治、文化的联系？杠杆点在哪里？",
      placeholder: "这一现象通过...支持系统"
    },
    q_ideology: {
      categoryLabel: "模块 4：意识形态",
      text: "形式与内容：他们在向我们推销什么？",
      hint: "它在媒体中是如何呈现的（形式）？与现实的矛盾？什么神话掩盖了它？",
      placeholder: "我们被告知...，但实际上..."
    }
  },
  quotes: [
    { text: "哲学家们只是用不同的方式解释世界，而问题在于改变世界。", author: "卡尔·马克思" },
    { text: "至今一切社会的历史都是阶级斗争的历史。", author: "卡尔·马克思" },
    { text: "枪杆子里面出政权。", author: "毛泽东" },
    { text: "一切反动派都是纸老虎。", author: "毛泽东" },
    { text: "革命不是请客吃饭。", author: "毛泽东" },
    { text: "没有调查，就没有发言权。", author: "毛泽东" },
    { text: "星星之火，可以燎原。", author: "毛泽东" },
    { text: "战略上藐视敌人，战术上重视敌人。", author: "毛泽东" },
    { text: "量变引起质变。", author: "弗里德里希·恩格斯" },
    { text: "不是意识决定生活，而是生活决定意识。", author: "卡尔·马克思" }
  ],
  feedback: [
    "本质已揭示。继续。",
    "唯物主义基础已确认。",
    "幻想已抛弃。正在记录。",
    "对唯心主义的有力打击。",
    "联系已建立。"
  ],
  templates: [
    {
      id: "conflict",
      label: "冲突",
      title: "[团队/项目]中的利益冲突",
      thesis: "观察到A组和B组之间的冲突。资源有限。妥协是不可能的。"
    },
    {
      id: "stagnation",
      label: "停滞",
      title: "[项目]的发展停滞",
      thesis: "增长已经停止。旧方法不再产生结果，但新方法尚未实施。"
    },
    {
      id: "personal",
      label: "个人",
      title: "[领域]中的个人僵局",
      thesis: "主观上的僵局感。愿望与能力或资源不匹配。"
    }
  ]
};