// import React, { useState } from 'react';
// import { Upload, TrendingUp, TrendingDown, BookOpen, AlertTriangle, Activity, Calendar, ExternalLink, BarChart3, PieChart, DollarSign, Users, Target, Zap, Download, RefreshCw, Search } from 'lucide-react';
// import './App.css';

// interface MetricCard {
//   label: string;
//   value: string;
//   change?: number;
//   icon: any;
//   color: string;
// }

// interface AnalysisData {
//   companyName: string;
//   ticker: string;
//   sector: string;
//   marketCap: string;
//   summary: string;
//   bullishnessScore: number;
//   bullishnessReasoning: string[];
//   financialMetrics: {
//     revenueGrowth: number;
//     profitMargin: number;
//     debtToEquity: number;
//     roe: number;
//     eps: string;
//     peRatio: number;
//   };
//   longTermProjections: any[];
//   orderBook: any;
//   keyRisks: string[];
//   futureOutlook: string;
//   competitiveAdvantage: string[];
//   managementQuality: number;
//   pricingStrategy: string;
//   marketOpportunity: string;
// }

// function App() {
//   const [file, setFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState<AnalysisData | null>(null);
//   const [activeTab, setActiveTab] = useState('overview');

//   const handleUpload = async () => {
//     if (!file) return;
//     setLoading(true);
//     const formData = new FormData();
//     formData.append('pdf', file);

//     try {
//       const res = await fetch('http://localhost:5000/analyze', {
//         method: 'POST',
//         body: formData,
//       });
//       const result = await res.json();
//       setData(result);
//     } catch (err) {
//       console.error(err);
//       alert("Error analyzing file. Check console.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getScoreColor = (score: number) => {
//     if (score >= 75) return { bg: '#dbeafe', border: '#0284c7', text: '#0c4a6e' };
//     if (score >= 50) return { bg: '#fef3c7', border: '#d97706', text: '#78350f' };
//     return { bg: '#fee2e2', border: '#ef4444', text: '#7f1d1d' };
//   };

//   const scoreColor = data ? getScoreColor(data.bullishnessScore) : null;

//   return (
//     <div className="app-container">
//       {/* Header */}
//       <header className="header">
//         <div className="header-content">
//           <div className="header-logo">
//             <div className="logo-icon">📈</div>
//             <div>
//               <h1 className="logo-title">StockLens <span className="logo-accent">AI</span></h1>
//               <p className="logo-subtitle">Indian Market Intelligence • Powered by Gemini 2.0</p>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="main-container">
//         {!data ? (
//           <div className="upload-section">
//             <div className="upload-zone">
//               <Upload size={64} className="upload-icon" />
//               <h2 className="upload-title">Upload Earnings Report</h2>
//               <p className="upload-subtitle">NSE/BSE listed companies • Annual/Quarterly reports supported</p>
              
//               <label className="upload-button">
//                 <input 
//                   type="file" 
//                   accept="application/pdf" 
//                   style={{ display: 'none' }} 
//                   onChange={(e) => setFile(e.target.files?.[0] || null)}
//                 />
//                 Choose PDF File
//               </label>

//               {file && (
//                 <div className="file-selected">
//                   ✓ {file.name}
//                 </div>
//               )}

//               {file && (
//                 <button 
//                   onClick={handleUpload} 
//                   disabled={loading}
//                   className={`analyze-button ${loading ? 'loading' : ''}`}
//                 >
//                   {loading ? '⏳ Analyzing...' : '🚀 Generate Report'}
//                 </button>
//               )}
//             </div>
//           </div>
//         ) : (
//           <div className="report-section">
//             {/* Report Header */}
//             <div className="report-header">
//               <div className="report-title-group">
//                 <h2 className="report-company-name">{data.companyName}</h2>
//                 <div className="report-meta">
//                   <span className="report-ticker">{data.ticker}</span>
//                   <span className="report-separator">•</span>
//                   <span className="report-sector">{data.sector}</span>
//                 </div>
//               </div>
//               <button 
//                 onClick={() => setData(null)}
//                 className="new-upload-btn"
//               >
//                 ← New Upload
//               </button>
//             </div>

//             {/* Tabs */}
//             <div className="tabs-container">
//               {['overview', 'metrics', 'risks', 'projections'].map(tab => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`tab-button ${activeTab === tab ? 'active' : ''}`}
//                 >
//                   {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                 </button>
//               ))}
//             </div>

//             {/* Overview Tab */}
//             {activeTab === 'overview' && (
//               <div className="tab-content">
//                 {/* Executive Summary */}
//                 <div className="card summary-card">
//                   <div className="card-header">
//                     <BookOpen size={20} className="card-icon" />
//                     <h3 className="card-title">Executive Summary</h3>
//                   </div>
//                   <p className="summary-text">{data.summary}</p>
//                 </div>

//                 {/* Bullishness Score */}
//                 <div className="bullishness-card" style={{
//                   background: `${scoreColor?.bg}`,
//                   border: `2px solid ${scoreColor?.border}`
//                 }}>
//                   <div className="bullishness-header">
//                     <div className="bullishness-label">
//                       <Activity size={24} style={{ color: scoreColor?.border }} />
//                       <h3 style={{ color: scoreColor?.text, margin: 0, fontWeight: 700, fontSize: 18 }}>Investment Sentiment</h3>
//                     </div>
//                     <span className="bullishness-score" style={{ color: scoreColor?.border }}>
//                       {data.bullishnessScore}%
//                     </span>
//                   </div>
                  
//                   <div className="progress-bar">
//                     <div 
//                       className="progress-fill" 
//                       style={{
//                         width: `${data.bullishnessScore}%`,
//                         background: `linear-gradient(90deg, ${scoreColor?.border} 0%, ${scoreColor?.border}dd 100%)`
//                       }} 
//                     />
//                   </div>

//                   <div className="reasoning-grid">
//                     {data.bullishnessReasoning?.slice(0, 4).map((reason, i) => (
//                       <div key={i} className="reasoning-item" style={{ color: scoreColor?.text }}>
//                         ✓ {reason.replace(/\*\*/g, '')}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Key Metrics Grid */}
//                 <div className="metrics-grid">
//                   <MetricDisplay label="Market Cap" value={data.marketCap} icon={DollarSign} color="#3b82f6" />
//                   <MetricDisplay label="Management Quality" value={`${data.managementQuality}/10`} icon={Users} color="#8b5cf6" />
//                   <MetricDisplay label="PE Ratio" value={data.financialMetrics.peRatio && typeof data.financialMetrics.peRatio === 'number' ? data.financialMetrics.peRatio.toFixed(2) : 'N/A'} icon={Target} color="#10b981" />
//                   <MetricDisplay label="EPS" value={data.financialMetrics.eps} icon={Zap} color="#f59e0b" />
//                 </div>

//                 {/* Competitive Advantage */}
//                 {data.competitiveAdvantage?.length > 0 && (
//                   <div className="card advantage-card">
//                     <h3 className="card-title">💡 Competitive Advantages</h3>
//                     <div className="advantage-list">
//                       {data.competitiveAdvantage?.map((adv, i) => (
//                         <div key={i} className="advantage-item">
//                           {adv}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Metrics Tab */}
//             {activeTab === 'metrics' && (
//               <div className="tab-content metrics-tab">
//                 <FinancialMetric label="Revenue Growth" value={data.financialMetrics.revenueGrowth ? `${data.financialMetrics.revenueGrowth}%` : 'N/A'} color="#10b981" trend="up" />
//                 <FinancialMetric label="Profit Margin" value={data.financialMetrics.profitMargin ? `${data.financialMetrics.profitMargin}%` : 'N/A'} color="#3b82f6" trend="up" />
//                 <FinancialMetric label="ROE" value={data.financialMetrics.roe ? `${data.financialMetrics.roe}%` : 'N/A'} color="#8b5cf6" trend="up" />
//                 <FinancialMetric label="Debt to Equity" value={data.financialMetrics.debtToEquity && typeof data.financialMetrics.debtToEquity === 'number' ? data.financialMetrics.debtToEquity.toFixed(2) : 'N/A'} color={data.financialMetrics.debtToEquity > 1 ? '#ef4444' : '#10b981'} trend="down" />
//               </div>
//             )}

//             {/* Risks Tab */}
//             {activeTab === 'risks' && (
//               <div className="tab-content">
//                 <div className="risks-card">
//                   <div className="card-header">
//                     <AlertTriangle size={24} style={{ color: '#ef4444' }} />
//                     <h3 className="card-title" style={{ color: 'white' }}>Top Risks</h3>
//                   </div>
//                   <div className="risks-list">
//                     {data.keyRisks?.slice(0, 8).map((risk, i) => (
//                       <div key={i} className="risk-item">
//                         {risk.replace(/\*\*/g, '')}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="outlook-card">
//                   <div className="card-header">
//                     <Calendar size={24} style={{ color: '#3b82f6' }} />
//                     <h3 className="card-title" style={{ color: 'white' }}>3-5 Year Outlook</h3>
//                   </div>
//                   <p className="outlook-text">{data.futureOutlook}</p>
//                 </div>
//               </div>
//             )}

//             {/* Projections Tab */}
//             {activeTab === 'projections' && (
//               <div className="tab-content">
//                 <div className="card projections-card">
//                   <div className="card-header">
//                     <TrendingUp size={24} style={{ color: '#8b5cf6' }} />
//                     <h3 className="card-title">Long-Term Projections</h3>
//                   </div>
//                   <div className="projections-list">
//                     {data.longTermProjections?.slice(0, 8).map((proj, i) => (
//                       <div key={i} className="projection-row">
//                         <span className="projection-metric">{proj.metric || proj.year}</span>
//                         <span className="projection-value">{proj.value || proj.revenueTarget}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Market Opportunity Section */}
//             <div className="opportunity-card">
//               <h3 className="opportunity-title">🎯 Market Opportunity</h3>
//               <p className="opportunity-text">{data.marketOpportunity}</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// const MetricDisplay = ({ label, value, icon: Icon, color }: any) => (
//   <div className="metric-card">
//     <div className="metric-header">
//       <Icon size={18} style={{ color }} />
//       <span className="metric-label">{label}</span>
//     </div>
//     <div className="metric-value">{value}</div>
//   </div>
// );

// const FinancialMetric = ({ label, value, color, trend }: any) => (
//   <div className="financial-metric-card" style={{
//     borderLeft: `3px solid ${color}`
//   }}>
//     <div className="financial-metric-top">
//       <span className="financial-metric-label">{label}</span>
//       {trend === 'up' ? (
//         <TrendingUp size={20} style={{ color: '#10b981' }} />
//       ) : (
//         <TrendingDown size={20} style={{ color: '#ef4444' }} />
//       )}
//     </div>
//     <div className="financial-metric-value" style={{ color }}>{value}</div>
//     <div className="financial-metric-bar">
//       <div style={{
//         height: '100%',
//         width: '70%',
//         background: color
//       }} />
//     </div>
//   </div>
// );

// export default App;

import React, { useState, useRef } from 'react';
import { Upload, TrendingUp, TrendingDown, BookOpen, AlertTriangle, Activity, Calendar, ExternalLink, BarChart3, PieChart, DollarSign, Users, Target, Zap, Download, RefreshCw, Search, Volume2, Square } from 'lucide-react';
import './App.css';

interface MetricCard {
  label: string;
  value: string;
  change?: number;
  icon: any;
  color: string;
}

interface AnalysisData {
  companyName: string;
  ticker: string;
  sector: string;
  marketCap: string;
  summary: string;
  bullishnessScore: number;
  bullishnessReasoning: string[];
  financialMetrics: {
    revenueGrowth: number;
    profitMargin: number;
    debtToEquity: number;
    roe: number;
    eps: string;
    peRatio: number;
  };
  longTermProjections: any[];
  orderBook: any;
  keyRisks: string[];
  futureOutlook: string;
  competitiveAdvantage: string[];
  managementQuality: number;
  pricingStrategy: string;
  marketOpportunity: string;
}

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AnalysisData | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const res = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error(err);
      alert("Error analyzing file. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return { bg: '#dbeafe', border: '#0284c7', text: '#0c4a6e' };
    if (score >= 50) return { bg: '#fef3c7', border: '#d97706', text: '#78350f' };
    return { bg: '#fee2e2', border: '#ef4444', text: '#7f1d1d' };
  };

  const scoreColor = data ? getScoreColor(data.bullishnessScore) : null;

  const speakText = (text) => {
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    speechSynthesisRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleNewUpload = () => {
    stopSpeaking();
    setFile(null);
    setData(null);
    setActiveTab('overview');
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-logo">
            <div className="logo-icon">📈</div>
            <div>
              <h1 className="logo-title">StockLens <span className="logo-accent">AI</span></h1>
              <p className="logo-subtitle">Indian Market Intelligence • Powered by Gemini 2.0</p>
            </div>
          </div>
        </div>
      </header>

      <div className="main-container">
        {!data ? (
          <div className="upload-section">
            <div className="upload-zone">
              <Upload size={64} className="upload-icon" />
              <h2 className="upload-title">Upload Earnings Report</h2>
              <p className="upload-subtitle">NSE/BSE listed companies • Annual/Quarterly reports supported</p>
              
              <label className="upload-button">
                <input 
                  type="file" 
                  accept="application/pdf" 
                  style={{ display: 'none' }} 
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                Choose PDF File
              </label>

              {file && (
                <div className="file-selected">
                  ✓ {file.name}
                </div>
              )}

              {file && (
                <button 
                  onClick={handleUpload} 
                  disabled={loading}
                  className={`analyze-button ${loading ? 'loading' : ''}`}
                >
                  {loading ? '⏳ Analyzing...' : '🚀 Generate Report'}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="report-section">
            {/* Report Header */}
            <div className="report-header">
              <div className="report-title-group">
                <h2 className="report-company-name">{data.companyName}</h2>
                <div className="report-meta">
                  <span className="report-ticker">{data.ticker}</span>
                  <span className="report-separator">•</span>
                  <span className="report-sector">{data.sector}</span>
                </div>
              </div>
              <button 
                onClick={handleNewUpload}
                className="new-upload-btn"
              >
                ← New Upload
              </button>
            </div>

            {/* Tabs */}
            <div className="tabs-container">
              {['overview', 'metrics', 'risks', 'projections'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="tab-content">
                {/* Executive Summary */}
                <div className="card summary-card">
                  <div className="card-header">
                    <BookOpen size={20} className="card-icon" />
                    <h3 className="card-title">Executive Summary</h3>
                    <button 
                      onClick={() => isSpeaking ? stopSpeaking() : speakText(data.summary)}
                      className="speak-button"
                      title={isSpeaking ? "Stop speaking" : "Read aloud"}
                    >
                      {isSpeaking ? <Square size={18} /> : <Volume2 size={18} />}
                    </button>
                  </div>
                  <p className="summary-text">{data.summary}</p>
                </div>

                {/* Bullishness Score */}
                <div className="bullishness-card" style={{
                  background: `${scoreColor?.bg}`,
                  border: `2px solid ${scoreColor?.border}`
                }}>
                  <div className="bullishness-header">
                    <div className="bullishness-label">
                      <Activity size={24} style={{ color: scoreColor?.border }} />
                      <h3 style={{ color: scoreColor?.text, margin: 0, fontWeight: 700, fontSize: 18 }}>Investment Sentiment</h3>
                    </div>
                    <span className="bullishness-score" style={{ color: scoreColor?.border }}>
                      {data.bullishnessScore}%
                    </span>
                  </div>
                  
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{
                        width: `${data.bullishnessScore}%`,
                        background: `linear-gradient(90deg, ${scoreColor?.border} 0%, ${scoreColor?.border}dd 100%)`
                      }} 
                    />
                  </div>

                  <div className="reasoning-grid">
                    {data.bullishnessReasoning?.slice(0, 4).map((reason, i) => (
                      <div key={i} className="reasoning-item" style={{ color: scoreColor?.text }}>
                        ✓ {reason.replace(/\*\*/g, '')}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="metrics-grid">
                  <MetricDisplay label="Market Cap" value={data.marketCap} icon={DollarSign} color="#3b82f6" />
                  <MetricDisplay label="Management Quality" value={`${data.managementQuality}/10`} icon={Users} color="#8b5cf6" />
                  <MetricDisplay label="PE Ratio" value={data.financialMetrics.peRatio && typeof data.financialMetrics.peRatio === 'number' ? data.financialMetrics.peRatio.toFixed(2) : 'N/A'} icon={Target} color="#10b981" />
                  <MetricDisplay label="EPS" value={data.financialMetrics.eps} icon={Zap} color="#f59e0b" />
                </div>

                {/* Competitive Advantage */}
                {data.competitiveAdvantage?.length > 0 && (
                  <div className="card advantage-card">
                    <h3 className="card-title">💡 Competitive Advantages</h3>
                    <div className="advantage-list">
                      {data.competitiveAdvantage?.map((adv, i) => (
                        <div key={i} className="advantage-item">
                          {adv}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Metrics Tab */}
            {activeTab === 'metrics' && (
              <div className="tab-content metrics-tab">
                <FinancialMetric label="Revenue Growth" value={data.financialMetrics.revenueGrowth ? `${data.financialMetrics.revenueGrowth}%` : 'N/A'} color="#10b981" trend="up" />
                <FinancialMetric label="Profit Margin" value={data.financialMetrics.profitMargin ? `${data.financialMetrics.profitMargin}%` : 'N/A'} color="#3b82f6" trend="up" />
                <FinancialMetric label="ROE" value={data.financialMetrics.roe ? `${data.financialMetrics.roe}%` : 'N/A'} color="#8b5cf6" trend="up" />
                <FinancialMetric label="Debt to Equity" value={data.financialMetrics.debtToEquity && typeof data.financialMetrics.debtToEquity === 'number' ? data.financialMetrics.debtToEquity.toFixed(2) : 'N/A'} color={data.financialMetrics.debtToEquity > 1 ? '#ef4444' : '#10b981'} trend="down" />
              </div>
            )}

            {/* Risks Tab */}
            {activeTab === 'risks' && (
              <div className="tab-content">
                <div className="risks-card">
                  <div className="card-header">
                    <AlertTriangle size={24} style={{ color: '#ef4444' }} />
                    <h3 className="card-title" style={{ color: 'white' }}>Top Risks</h3>
                  </div>
                  <div className="risks-list">
                    {data.keyRisks?.slice(0, 8).map((risk, i) => (
                      <div key={i} className="risk-item">
                        {risk.replace(/\*\*/g, '')}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="outlook-card">
                  <div className="card-header">
                    <Calendar size={24} style={{ color: '#3b82f6' }} />
                    <h3 className="card-title" style={{ color: 'white' }}>3-5 Year Outlook</h3>
                    <button 
                      onClick={() => isSpeaking ? stopSpeaking() : speakText(data.futureOutlook)}
                      className="speak-button"
                      title={isSpeaking ? "Stop speaking" : "Read aloud"}
                    >
                      {isSpeaking ? <Square size={18} /> : <Volume2 size={18} />}
                    </button>
                  </div>
                  <p className="outlook-text">{data.futureOutlook}</p>
                </div>
              </div>
            )}

            {/* Projections Tab */}
            {activeTab === 'projections' && (
              <div className="tab-content">
                <div className="card projections-card">
                  <div className="card-header">
                    <TrendingUp size={24} style={{ color: '#8b5cf6' }} />
                    <h3 className="card-title">Long-Term Projections</h3>
                  </div>
                  <div className="projections-list">
                    {data.longTermProjections?.slice(0, 8).map((proj, i) => (
                      <div key={i} className="projection-row">
                        <span className="projection-metric">{proj.metric || proj.year}</span>
                        <span className="projection-value">{proj.value || proj.revenueTarget}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Market Opportunity Section */}
            <div className="opportunity-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <h3 className="opportunity-title">🎯 Market Opportunity</h3>
                <button 
                  onClick={() => isSpeaking ? stopSpeaking() : speakText(data.marketOpportunity)}
                  className="speak-button"
                  title={isSpeaking ? "Stop speaking" : "Read aloud"}
                >
                  {isSpeaking ? <Square size={18} /> : <Volume2 size={18} />}
                </button>
              </div>
              <p className="opportunity-text">{data.marketOpportunity}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const MetricDisplay = ({ label, value, icon: Icon, color }: any) => (
  <div className="metric-card">
    <div className="metric-header">
      <Icon size={18} style={{ color }} />
      <span className="metric-label">{label}</span>
    </div>
    <div className="metric-value">{value}</div>
  </div>
);

const FinancialMetric = ({ label, value, color, trend }: any) => (
  <div className="financial-metric-card" style={{
    borderLeft: `3px solid ${color}`
  }}>
    <div className="financial-metric-top">
      <span className="financial-metric-label">{label}</span>
      {trend === 'up' ? (
        <TrendingUp size={20} style={{ color: '#10b981' }} />
      ) : (
        <TrendingDown size={20} style={{ color: '#ef4444' }} />
      )}
    </div>
    <div className="financial-metric-value" style={{ color }}>{value}</div>
    <div className="financial-metric-bar">
      <div style={{
        height: '100%',
        width: '70%',
        background: color
      }} />
    </div>
  </div>
);

export default App;