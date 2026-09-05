import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Binary, Cpu, Zap, X, Copy, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface EngineeringCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EngineeringCalculator({ isOpen, onClose }: EngineeringCalculatorProps) {
  const [activeTab, setActiveTab] = useState<'base' | 'ohm' | 'freq'>('base');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  // Base Converter States
  const [decVal, setDecVal] = useState<string>('255');

  // Ohm's Law States (V = I * R)
  const [voltage, setVoltage] = useState<string>('12');
  const [current, setCurrent] = useState<string>('2');
  const [resistance, setResistance] = useState<string>('6');

  // Frequency Converter States (F = 1 / T)
  const [freq, setFreq] = useState<string>('1000'); // Hz

  // Helper Copy Function
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  // Safe Number Parsers for Base Converter
  const parsedDec = parseInt(decVal, 10) || 0;
  const hexVal = parsedDec.toString(16).toUpperCase();
  const binVal = parsedDec.toString(2);
  const octVal = parsedDec.toString(8);

  // Ohm's Law Calculations
  const calcVoltage = (i: number, r: number) => (i * r).toFixed(2);
  const calcCurrent = (v: number, r: number) => (r !== 0 ? (v / r).toFixed(2) : '0');
  const calcResistance = (v: number, i: number) => (i !== 0 ? (v / i).toFixed(2) : '0');

  // Frequency to Period calculation
  const parsedFreq = parseFloat(freq) || 0;
  const periodMs = parsedFreq > 0 ? ((1 / parsedFreq) * 1000).toFixed(3) : '0';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000]"
          />

          {/* Bottom Sheet for Mobile & Side Modal for Desktop */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 inset-x-0 sm:inset-x-auto sm:right-4 sm:bottom-4 sm:w-[420px] max-h-[85vh] sm:max-h-[90vh] bg-card border border-border rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl z-[10001] flex flex-col overflow-hidden"
            dir="rtl"
          >
            {/* Sheet Handle for Mobile Drag */}
            <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mb-3 sm:hidden" />

            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
              <div className="flex items-center space-x-2 space-x-reverse text-primary">
                <Calculator className="h-5 w-5" />
                <h3 className="font-extrabold text-base">الحاسبة والمحول الهندسي</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-xl h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Navigation Tabs */}
            <div className="grid grid-cols-3 gap-1 bg-muted/50 p-1 rounded-xl mb-4 text-xs font-bold">
              <button
                onClick={() => setActiveTab('base')}
                className={`py-2 rounded-lg flex items-center justify-center gap-1 transition-all ${
                  activeTab === 'base' ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground'
                }`}
              >
                <Binary className="h-3.5 w-3.5" /> الأرقام البرمجية
              </button>
              <button
                onClick={() => setActiveTab('ohm')}
                className={`py-2 rounded-lg flex items-center justify-center gap-1 transition-all ${
                  activeTab === 'ohm' ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground'
                }`}
              >
                <Zap className="h-3.5 w-3.5" /> قانون أوم
              </button>
              <button
                onClick={() => setActiveTab('freq')}
                className={`py-2 rounded-lg flex items-center justify-center gap-1 transition-all ${
                  activeTab === 'freq' ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground'
                }`}
              >
                <Cpu className="h-3.5 w-3.5" /> التردد والزمن
              </button>
            </div>

            {/* Tab Content Area */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
              {/* 1. Base Converter */}
              {activeTab === 'base' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-muted-foreground font-bold mb-1">العشري (DEC)</label>
                    <Input
                      type="number"
                      value={decVal}
                      onChange={(e) => setDecVal(e.target.value)}
                      className="font-mono font-bold text-sm dir-ltr text-left"
                    />
                  </div>

                  <div className="space-y-2 pt-2">
                    {/* HEX */}
                    <div className="flex items-center justify-between p-2.5 bg-muted/30 rounded-xl border border-border">
                      <span className="font-bold text-muted-foreground">HEX:</span>
                      <div className="flex items-center gap-2">
                        <code className="font-mono font-bold text-sm text-primary">0x{hexVal}</code>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleCopy(`0x${hexVal}`, 'hex')}
                          className="h-7 w-7"
                        >
                          {copiedIndex === 'hex' ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                        </Button>
                      </div>
                    </div>

                    {/* BIN */}
                    <div className="flex items-center justify-between p-2.5 bg-muted/30 rounded-xl border border-border">
                      <span className="font-bold text-muted-foreground">BIN:</span>
                      <div className="flex items-center gap-2">
                        <code className="font-mono font-bold text-xs text-primary max-w-[180px] truncate">{binVal}</code>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleCopy(binVal, 'bin')}
                          className="h-7 w-7"
                        >
                          {copiedIndex === 'bin' ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                        </Button>
                      </div>
                    </div>

                    {/* OCT */}
                    <div className="flex items-center justify-between p-2.5 bg-muted/30 rounded-xl border border-border">
                      <span className="font-bold text-muted-foreground">OCT:</span>
                      <div className="flex items-center gap-2">
                        <code className="font-mono font-bold text-sm text-primary">{octVal}</code>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleCopy(octVal, 'oct')}
                          className="h-7 w-7"
                        >
                          {copiedIndex === 'oct' ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Ohm's Law */}
              {activeTab === 'ohm' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-muted-foreground font-bold mb-1">الجهد (V)</label>
                      <Input
                        type="number"
                        value={voltage}
                        onChange={(e) => setVoltage(e.target.value)}
                        className="font-mono font-bold text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-muted-foreground font-bold mb-1">التيار (I - A)</label>
                      <Input
                        type="number"
                        value={current}
                        onChange={(e) => setCurrent(e.target.value)}
                        className="font-mono font-bold text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-muted-foreground font-bold mb-1">المقاومة (R - Ω)</label>
                      <Input
                        type="number"
                        value={resistance}
                        onChange={(e) => setResistance(e.target.value)}
                        className="font-mono font-bold text-center"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl space-y-1.5 text-xs">
                    <div className="flex justify-between font-bold">
                      <span>الجهد المحسوب (V = I × R):</span>
                      <span className="font-mono text-primary">{calcVoltage(parseFloat(current) || 0, parseFloat(resistance) || 0)} V</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>التيار المحسوب (I = V / R):</span>
                      <span className="font-mono text-primary">{calcCurrent(parseFloat(voltage) || 0, parseFloat(resistance) || 0)} A</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>المقاومة المحسوبة (R = V / I):</span>
                      <span className="font-mono text-primary">{calcResistance(parseFloat(voltage) || 0, parseFloat(current) || 0)} Ω</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Frequency & Period */}
              {activeTab === 'freq' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-muted-foreground font-bold mb-1">التردد (Frequency in Hz)</label>
                    <Input
                      type="number"
                      value={freq}
                      onChange={(e) => setFreq(e.target.value)}
                      className="font-mono font-bold text-sm dir-ltr text-left"
                    />
                  </div>

                  <div className="p-3 bg-muted/40 border border-border rounded-xl space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-muted-foreground">الزمن الدوري (Period - T):</span>
                      <code className="font-mono font-bold text-sm text-primary">{periodMs} ms</code>
                    </div>
                    <div className="flex justify-between items-center text-[11px] text-muted-foreground">
                      <span>بالثواني (Sec):</span>
                      <code className="font-mono">{(parsedFreq > 0 ? 1 / parsedFreq : 0).toFixed(6)} s</code>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}