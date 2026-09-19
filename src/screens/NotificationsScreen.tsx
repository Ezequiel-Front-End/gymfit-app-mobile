import React, { useState } from 'react';
import { ChevronLeft, Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react';

interface NotificationsScreenProps {
  onBack: () => void;
}

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  iconType: 'calendar' | 'success' | 'alert';
  unreadCount?: number;
  isRead: boolean;
}

interface NotificationGroup {
  date: string;
  items: NotificationItem[];
}

const mockNotifications: NotificationGroup[] = [
  {
    date: 'Hoje',
    items: [
      {
        id: '1',
        title: 'Avaliação com Dr. George',
        description: 'Hoje, 29 de Novembro • 01:00 PM',
        time: '09:41 AM',
        iconType: 'calendar',
        unreadCount: 4,
        isRead: false
      },
      {
        id: '2',
        title: 'Avaliação com Dra. Amelia',
        description: 'Hoje, 29 de Novembro • 02:30 PM',
        time: '08:20 AM',
        iconType: 'calendar',
        isRead: true
      }
    ]
  },
  {
    date: 'Ontem',
    items: [
      {
        id: '3',
        title: 'Avaliação com Dra. Julia',
        description: 'Sua avaliação foi concluída com...',
        time: '05:00 PM',
        iconType: 'success',
        isRead: true
      },
      {
        id: '4',
        title: 'Avaliação com Dra. Julia',
        description: 'Ontem, 28 de Novembro • 01:00 PM',
        time: '11:00 AM',
        iconType: 'calendar',
        isRead: true
      }
    ]
  },
  {
    date: '27 Novembro 2023',
    items: [
      {
        id: '5',
        title: 'Avaliação com Dr. Eugene',
        description: 'Sua avaliação foi cancelada...',
        time: '12:05 PM',
        iconType: 'alert',
        isRead: true
      },
      {
        id: '6',
        title: 'Avaliação com Dr. Eugene',
        description: '27 de Novembro • 02:00 PM',
        time: '09:00 AM',
        iconType: 'calendar',
        isRead: true
      }
    ]
  }
];

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ onBack }) => {
  const [notifications] = useState<NotificationGroup[]>(mockNotifications);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-[20px] h-[20px] text-[var(--color-fit-green)]" />;
      case 'alert':
        return <CalendarIcon className="w-[20px] h-[20px] text-orange-500" />;
      case 'calendar':
      default:
        return <CalendarIcon className="w-[20px] h-[20px] text-[#A1A1AA]" />;
    }
  };

  const getIconBackground = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-[var(--color-fit-green)]/10 border-[var(--color-fit-green)]/20';
      case 'alert':
        return 'bg-orange-500/10 border-orange-500/20';
      case 'calendar':
      default:
        return 'bg-[#222] border-[#333]';
    }
  };

  return (
    <div className="w-full h-full min-h-screen bg-black flex flex-col font-sans select-none z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-12 pb-4 shrink-0 bg-black sticky top-0 z-10 border-b border-[#111]">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full active:bg-[#222] transition-colors -ml-2"
        >
          <ChevronLeft className="w-[26px] h-[26px] text-white" />
        </button>
        
        <h1 className="text-[17px] font-bold text-white tracking-tight">Notificações</h1>
        
        <div className="w-10 h-10 -mr-2" />
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-8 pt-2 bg-[#050505]">
        {notifications.map((group, groupIdx) => (
          <div key={groupIdx} className="mb-6">
            <h2 className="text-[12px] font-bold text-[#888] mb-4 mt-2 uppercase tracking-wide">
              {group.date}
            </h2>
            
            <div className="flex flex-col gap-4">
              {group.items.map((item, itemIdx) => (
                <div key={item.id}>
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-[46px] h-[46px] shrink-0 rounded-full flex items-center justify-center border ${getIconBackground(item.iconType)}`}>
                      {getIcon(item.iconType)}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className={`text-[15px] font-extrabold truncate leading-tight ${item.isRead ? 'text-[#D8E0EA]' : 'text-white'}`}>
                          {item.title}
                        </h3>
                        <span className="text-[11px] font-semibold text-[#888] whitespace-nowrap mt-0.5">
                          {item.time}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between gap-2 mt-1.5">
                        <p className="text-[13px] text-[#A1A1AA] truncate font-medium">
                          {item.description}
                        </p>
                        {item.unreadCount && (
                          <div className="w-5 h-5 rounded-full bg-[var(--color-fit-green)] flex items-center justify-center shrink-0">
                            <span className="text-[10px] font-black text-black leading-none">{item.unreadCount}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Divider - don't show after the last item in a group */}
                  {itemIdx < group.items.length - 1 && (
                    <div className="w-full h-[1px] bg-[#1a1a1a] mt-4 ml-[62px]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
