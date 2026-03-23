
import React, { useState } from 'react';
import { Plus, Map as MapIcon, Grape, NotebookText, Search } from 'lucide-react';
import { TabView, WineNote } from './types';
import NoteCard from './components/NoteCard';
import AddNoteModal from './components/AddNoteModal';
import NoteDetailModal from './components/NoteDetailModal';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabView>('notes');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<WineNote | null>(null);
  
  // Initial dummy data based on the HTML provided
  const [notes, setNotes] = useState<WineNote[]>([
    {
      id: '1',
      name: 'Opus One',
      region: 'Napa Valley',
      variety: 'Cabernet Sauvignon',
      vintage: '2018',
      price: 'USD 350',
      rating: 5,
      appearance: 'Ruby',
      aromas: ['Blackcurrant', 'Oak'],
      sweetness: 'Dry',
      body: 'Full-Bodied',
      acidity: 3,
      tannin: 4,
      finish: 'Long',
      memo: '非常經典的納帕谷風格，單寧強勁但細緻，充滿黑醋栗與香草氣息。建議醒酒 2 小時。',
      date: '2023-01-01'
    }
  ]);

  const handleAddNote = (newNote: WineNote) => {
    setNotes([newNote, ...notes]);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen pb-[90px] pt-[60px]">
      
      {/* 1. Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E8DDD3] h-[60px] flex items-center justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full h-full px-4 group flex items-center justify-center"
        >
          <div className="flex items-center justify-center space-x-2 text-[#722F37] group-active:opacity-70 transition-opacity">
            <div className="bg-[#F5EDE4] p-1.5 rounded-full">
              <Plus size={20} />
            </div>
            <span className="font-bold text-lg font-['Noto_Serif_TC']">新增一則紅酒筆記</span>
          </div>
        </button>
      </header>

      {/* 2. Main Content */}
      <main className="px-4 pt-4 max-w-3xl mx-auto">
        
        {/* Tab: Notes */}
        {activeTab === 'notes' && (
          <div className="animate-fade-in">
            <div className="flex justify-between items-end mb-4 px-1">
              <h1 className="text-2xl font-bold text-[#1A1A1A] font-['Noto_Serif_TC']">我的筆記</h1>
              <span className="text-sm text-[#6B6B6B]">{notes.length} 則筆記</span>
            </div>
            
            <div className="space-y-4">
              {notes.map(note => (
                <NoteCard 
                  key={note.id} 
                  note={note} 
                  onClick={() => setSelectedNote(note)}
                />
              ))}
            </div>
            
            {/* Empty State filler */}
            <div className="h-8"></div>
          </div>
        )}

        {/* Tab: Map (Placeholder) */}
        {activeTab === 'map' && (
          <div className="flex flex-col items-center justify-center text-[#6B6B6B] h-[60vh] animate-fade-in">
             <MapIcon size={80} className="mb-4 opacity-30" strokeWidth={1} />
             <h2 className="text-xl font-semibold text-[#6B6B6B] font-['Noto_Serif_TC']">地圖功能</h2>
             <p className="text-sm mt-2">即將推出，敬請期待</p>
          </div>
        )}

        {/* Tab: Variety (Placeholder) */}
        {activeTab === 'variety' && (
          <div className="flex flex-col items-center justify-center text-[#6B6B6B] h-[60vh] animate-fade-in">
             <Grape size={80} className="mb-4 opacity-30" strokeWidth={1} />
             <h2 className="text-xl font-semibold text-[#6B6B6B] font-['Noto_Serif_TC']">品種分類</h2>
             <p className="text-sm mt-2">即將推出，敬請期待</p>
          </div>
        )}

      </main>

      {/* 3. Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur shadow-[0_-1px_3px_rgba(0,0,0,0.05)] h-[84px] pb-[20px] flex justify-around items-center border-t border-[#E8DDD3]">
        <button 
          onClick={() => setActiveTab('notes')}
          className={`flex flex-col items-center justify-center w-full transition-all duration-200 ${activeTab === 'notes' ? 'text-[#722F37]' : 'text-[#6B6B6B] hover:text-[#1A1A1A]'}`}
        >
          <div className={`mb-1 ${activeTab === 'notes' ? '-translate-y-0.5' : ''}`}>
            <NotebookText size={24} strokeWidth={activeTab === 'notes' ? 2.5 : 2} />
          </div>
          <span className="text-[10px] font-medium">筆記</span>
        </button>

        <button 
          onClick={() => setActiveTab('map')}
          className={`flex flex-col items-center justify-center w-full transition-all duration-200 ${activeTab === 'map' ? 'text-[#722F37]' : 'text-[#6B6B6B] hover:text-[#1A1A1A]'}`}
        >
          <div className={`mb-1 ${activeTab === 'map' ? '-translate-y-0.5' : ''}`}>
            <MapIcon size={24} strokeWidth={activeTab === 'map' ? 2.5 : 2} />
          </div>
          <span className="text-[10px] font-medium">地圖</span>
        </button>

        <button 
          onClick={() => setActiveTab('variety')}
          className={`flex flex-col items-center justify-center w-full transition-all duration-200 ${activeTab === 'variety' ? 'text-[#722F37]' : 'text-[#6B6B6B] hover:text-[#1A1A1A]'}`}
        >
           <div className={`mb-1 ${activeTab === 'variety' ? '-translate-y-0.5' : ''}`}>
            <Grape size={24} strokeWidth={activeTab === 'variety' ? 2.5 : 2} />
          </div>
          <span className="text-[10px] font-medium">品種</span>
        </button>
      </nav>

      {/* 4. Add Note Modal */}
      <AddNoteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAddNote}
      />
      
      {/* 5. Detail Modal */}
      {selectedNote && (
        <NoteDetailModal 
          note={selectedNote} 
          onClose={() => setSelectedNote(null)} 
        />
      )}
      
    </div>
  );
};

export default App;
