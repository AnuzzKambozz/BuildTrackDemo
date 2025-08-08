"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Grid, Clock } from 'lucide-react';
import { CalendarEvent } from '@/app/models/common';


interface CalendarProps {
    initialEvents?: CalendarEvent[];
  }
  
  type ViewType = 'month' | 'week';
  
  const Calendar: React.FC<CalendarProps> = ({ initialEvents = [] }) => {
    const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 30)); // July 30, 2025 (current date)
    const [viewType, setViewType] = useState<ViewType>('month');
    const [events, setEvents] = useState<CalendarEvent[]>([
      { id: '1', title: 'Foundation Insp.', date: '2025-07-31', priority: 'critical', description: 'Foundation inspection for the construction project', time: '09:00 AM' },
      { id: '2', title: 'Found Completion', date: '2025-08-05', priority: 'critical', description: 'Foundation work completion milestone', time: '02:00 PM' },
      { id: '3', title: 'Client Approval', date: '2025-07-28', priority: 'medium', description: 'Client approval meeting for next phase', time: '10:00 AM' },
      { id: '4', title: 'Electrical rough', date: '2025-08-01', priority: 'medium', description: 'Electrical rough-in work', time: '08:00 AM' },
      { id: '5', title: 'Framing Phase', date: '2025-08-15', priority: 'critical', description: 'Start of framing phase', time: '07:00 AM' },
      { id: '6', title: 'Site - Clean up', date: '2025-07-25', priority: 'normal', description: 'Site cleanup and maintenance', time: '03:00 PM' },
      { id: '7', title: 'Team Meeting', date: '2025-07-30', priority: 'normal', description: 'Weekly team sync meeting', time: '11:00 AM' },
      { id: '8', title: 'Material Delivery', date: '2025-08-02', priority: 'medium', description: 'Construction materials delivery', time: '01:00 PM' },
      ...initialEvents
    ]);
    const [selectedProject, setSelectedProject] = useState('All Projects');
    const [selectedTimeframe, setSelectedTimeframe] = useState('This month');
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // const daysOfWeekFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
    const getPriorityColor = (priority: string) => {
      switch (priority) {
        case 'critical': return 'bg-red-100 text-red-700 border-red-200';
        case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
        case 'normal': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
        case 'milestone': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
        default: return 'bg-gray-100 text-gray-700 border-gray-200';
      }
    };
  
    const getDaysInMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };
  
    const getFirstDayOfMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };
  
    const getWeekStart = (date: Date) => {
      const d = new Date(date);
      const day = d.getDay();
      const diff = d.getDate() - day;
      return new Date(d.setDate(diff));
    };
  
    const getWeekDates = (startDate: Date) => {
      const dates = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        dates.push(date);
      }
      return dates;
    };
  
    const navigate = (direction: 'prev' | 'next') => {
      setCurrentDate(prev => {
        const newDate = new Date(prev);
        if (viewType === 'month') {
          if (direction === 'prev') {
            newDate.setMonth(prev.getMonth() - 1);
          } else {
            newDate.setMonth(prev.getMonth() + 1);
          }
        } else {
          if (direction === 'prev') {
            newDate.setDate(prev.getDate() - 7);
          } else {
            newDate.setDate(prev.getDate() + 7);
          }
        }
        return newDate;
      });
    };
  
    const getEventsForDate = (date: Date) => {
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      return events.filter(event => event.date === dateStr);
    };
  
    const openEventModal = (event: CalendarEvent) => {
      setSelectedEvent(event);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedEvent(null);
    };
  
    const isToday = (date: Date) => {
      const today = new Date(); // Use actual current date
      return date.toDateString() === today.toDateString();
    };
  
    const renderMonthView = () => {
      const daysInMonth = getDaysInMonth(currentDate);
      const firstDay = getFirstDayOfMonth(currentDate);
      const days = [];
  
      // Previous month's trailing days
      const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0);
      const prevMonthDays = prevMonth.getDate();
      
      for (let i = firstDay - 1; i >= 0; i--) {
        // const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, prevMonthDays - i);
        days.push(
          <div key={`prev-${prevMonthDays - i}`} className="h-28 p-2 text-gray-400 border-r border-b border-gray-100 bg-gray-50">
            <div className="text-sm font-medium">{prevMonthDays - i}</div>
          </div>
        );
      }
  
      // Current month days
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const dayEvents = getEventsForDate(date);
        const isTodayDate = isToday(date);
        
        days.push(
          <div key={day} className="h-28 p-2 border-r border-b border-gray-100 bg-white hover:bg-gray-50 transition-colors">
            <div className={`text-sm font-medium mb-2 ${isTodayDate ? 'bg-indigo-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs' : 'text-gray-900'}`}>
              {day}
            </div>
            <div className="space-y-1">
              {dayEvents.slice(0, 2).map(event => (
                <div
                  key={event.id}
                  onClick={() => openEventModal(event)}
                  className={`text-xs px-2 py-1 rounded border cursor-pointer hover:shadow-sm transition-all ${getPriorityColor(event.priority)}`}
                  title={event.title}
                >
                  {event.title}
                </div>
              ))}
              {dayEvents.length > 2 && (
                <div className="text-xs text-gray-500 px-2">
                  +{dayEvents.length - 2} more
                </div>
              )}
            </div>
          </div>
        );
      }
  
      // Next month's leading days
      const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
      const remainingCells = totalCells - (firstDay + daysInMonth);
      
      for (let day = 1; day <= remainingCells; day++) {
        days.push(
          <div key={`next-${day}`} className="h-28 p-2 text-gray-400 border-r border-b border-gray-100 bg-gray-50">
            <div className="text-sm font-medium">{day}</div>
          </div>
        );
      }
  
      return (
        <div className="grid grid-cols-7">
          {days}
        </div>
      );
    };

    const renderWeekView = () => {
        const weekStart = getWeekStart(currentDate);
        const weekDates = getWeekDates(weekStart);
    
        return (
          <div className="grid grid-cols-7">
            {weekDates.map((date, index) => {
              const dayEvents = getEventsForDate(date);
              const isTodayDate = isToday(date);
              const isCurrentMonth = date.getMonth() === currentDate.getMonth();
    
              return (
                <div 
                  key={index} 
                  className={`h-96 p-3 border-r border-b border-gray-100 ${isCurrentMonth ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-50 transition-colors`}
                >
                  <div className={`text-center mb-3 ${isTodayDate ? 'bg-indigo-500 text-white rounded-lg py-2' : isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}`}>
                    <div className="text-xs font-medium uppercase tracking-wide">
                      {daysOfWeek[index]}
                    </div>
                    <div className="text-lg font-semibold">
                      {date.getDate()}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {dayEvents.map(event => (
                      <div
                        key={event.id}
                        onClick={() => openEventModal(event)}
                        className={`text-xs px-2 py-2 rounded border cursor-pointer hover:shadow-sm transition-all ${getPriorityColor(event.priority)}`}
                      >
                        <div className="font-medium truncate">{event.title}</div>
                        {event.time && (
                          <div className="text-xs opacity-75 mt-1">{event.time}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        );
      };
    
      const getHeaderTitle = () => {
        if (viewType === 'month') {
          return `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
        } else {
          const weekStart = getWeekStart(currentDate);
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6);
          
          const startMonth = months[weekStart.getMonth()];
          const endMonth = months[weekEnd.getMonth()];
          const startYear = weekStart.getFullYear();
          const endYear = weekEnd.getFullYear();
          
          if (startMonth === endMonth && startYear === endYear) {
            return `${startMonth} ${weekStart.getDate()}-${weekEnd.getDate()}, ${startYear}`;
          } else if (startYear === endYear) {
            return `${startMonth} ${weekStart.getDate()} - ${endMonth} ${weekEnd.getDate()}, ${startYear}`;
          } else {
            return `${startMonth} ${weekStart.getDate()}, ${startYear} - ${endMonth} ${weekEnd.getDate()}, ${endYear}`;
          }
        }
      };
    
      const addEvent = () => {
        const title = prompt('Enter event title:');
        const date = prompt('Enter date (YYYY-MM-DD):');
        const priority = prompt('Enter priority (critical/medium/normal/milestone):') as 'critical' | 'medium' | 'normal' | 'milestone';
        const description = prompt('Enter description (optional):');
        const time = prompt('Enter time (optional):');
        
        if (title && date && priority) {
          const newEvent: CalendarEvent = {
            id: Date.now().toString(),
            title,
            date,
            priority,
            description: description || undefined,
            time: time || undefined
          };
          setEvents(prev => [...prev, newEvent]);
        }
      };
    
      return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('prev')}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h2 className="text-2xl font-semibold text-gray-900">
                {getHeaderTitle()}
              </h2>
              <button
                onClick={() => navigate('next')}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-md p-1">
                <button
                  onClick={() => setViewType('month')}
                  className={`flex items-center space-x-1 px-3 py-1 rounded text-sm font-medium transition-colors ${
                    viewType === 'month' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                  <span>Month</span>
                </button>
                <button
                  onClick={() => setViewType('week')}
                  className={`flex items-center space-x-1 px-3 py-1 rounded text-sm font-medium transition-colors ${
                    viewType === 'week' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>Week</span>
                </button>
              </div>
    
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-700"
              >
                <option>All Projects</option>
                <option>Construction Project</option>
                <option>Renovation Project</option>
              </select>
              
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-700"
              >
                <option>{viewType === 'month' ? 'This month' : 'This week'}</option>
                <option>{viewType === 'month' ? 'Next month' : 'Next week'}</option>
                <option>This quarter</option>
              </select>
            </div>
          </div>
    
          {/* Calendar Grid */}
          <div className="border-b border-gray-100">
            {/* Days of week header */}
            <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-100">
              {daysOfWeek.map(day => (
                <div key={day} className="p-3 text-center text-sm font-medium text-gray-600 border-r border-gray-100 last:border-r-0">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar content */}
            {viewType === 'month' ? renderMonthView() : renderWeekView()}
          </div>
    
          {/* Legend and Add Event */}
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-100 border border-red-200 rounded"></div>
                <span className="text-sm text-gray-600 font-medium">Critical</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-amber-100 border border-amber-200 rounded"></div>
                <span className="text-sm text-gray-600 font-medium">Medium</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-100 border border-emerald-200 rounded"></div>
                <span className="text-sm text-gray-600 font-medium">Normal</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-indigo-100 border border-indigo-200 rounded"></div>
                <span className="text-sm text-gray-600 font-medium">Milestone</span>
              </div>
            </div>
            
            <button
              onClick={addEvent}
              className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              <span>Add Event</span>
            </button>
          </div>
    
          {/* Event Modal */}
          {isModalOpen && selectedEvent && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">Event Details</h3>
                  <button
                    onClick={closeModal}
                    className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Title</label>
                    <p className="mt-1 text-lg font-medium text-gray-900">{selectedEvent.title}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Date</label>
                    <p className="mt-1 text-gray-900">{new Date(selectedEvent.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                  </div>
    
                  {selectedEvent.time && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Time</label>
                      <p className="mt-1 text-gray-900">{selectedEvent.time}</p>
                    </div>
                  )}
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Priority</label>
                    <div className="mt-1">
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(selectedEvent.priority)}`}>
                        {selectedEvent.priority.charAt(0).toUpperCase() + selectedEvent.priority.slice(1)}
                      </span>
                    </div>
                  </div>
    
                  {selectedEvent.description && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Description</label>
                      <p className="mt-1 text-gray-900">{selectedEvent.description}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end space-x-3 p-6 border-t border-gray-100">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      // Edit functionality can be added here
                      closeModal();
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors"
                  >
                    Edit Event
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
  }  

  export default Calendar;