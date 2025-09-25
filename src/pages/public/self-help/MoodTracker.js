import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodNote, setMoodNote] = useState('');
  const [activities, setActivities] = useState([]);
  const [moodHistory, setMoodHistory] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const moods = [
    { value: 5, emoji: '😄', label: 'Great', color: 'bg-green-500' },
    { value: 4, emoji: '🙂', label: 'Good', color: 'bg-green-400' },
    { value: 3, emoji: '😐', label: 'Okay', color: 'bg-yellow-400' },
    { value: 2, emoji: '😔', label: 'Low', color: 'bg-orange-400' },
    { value: 1, emoji: '😢', label: 'Very Low', color: 'bg-red-500' }
  ];

  const activityOptions = [
    { id: 'work', label: 'Work', icon: 'fa-briefcase' },
    { id: 'exercise', label: 'Exercise', icon: 'fa-running' },
    { id: 'social', label: 'Socializing', icon: 'fa-users' },
    { id: 'family', label: 'Family Time', icon: 'fa-home' },
    { id: 'relaxation', label: 'Relaxation', icon: 'fa-spa' },
    { id: 'hobbies', label: 'Hobbies', icon: 'fa-palette' },
    { id: 'sleep', label: 'Good Sleep', icon: 'fa-bed' },
    { id: 'nature', label: 'Nature', icon: 'fa-tree' },
    { id: 'reading', label: 'Reading', icon: 'fa-book' },
    { id: 'music', label: 'Music', icon: 'fa-music' }
  ];

  useEffect(() => {
    // Load mood history from localStorage
    const savedHistory = localStorage.getItem('moodHistory');
    if (savedHistory) {
      setMoodHistory(JSON.parse(savedHistory));
    }
  }, []);

  const toggleActivity = (activityId) => {
    setActivities(prev => {
      if (prev.includes(activityId)) {
        return prev.filter(id => id !== activityId);
      }
      return [...prev, activityId];
    });
  };

  const saveMood = () => {
    if (!selectedMood) return;

    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      mood: selectedMood,
      activities: activities,
      note: moodNote
    };

    const updatedHistory = [newEntry, ...moodHistory].slice(0, 30); // Keep last 30 entries
    setMoodHistory(updatedHistory);
    localStorage.setItem('moodHistory', JSON.stringify(updatedHistory));

    // Show success message
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      // Reset form
      setSelectedMood(null);
      setActivities([]);
      setMoodNote('');
    }, 2000);
  };

  const getMoodTrend = () => {
    if (moodHistory.length < 2) return 'neutral';
    const recent = moodHistory.slice(0, 7);
    const average = recent.reduce((sum, entry) => sum + entry.mood, 0) / recent.length;
    const previousAverage = moodHistory.slice(7, 14).reduce((sum, entry) => sum + entry.mood, 0) / Math.min(moodHistory.length - 7, 7);
    
    if (average > previousAverage) return 'improving';
    if (average < previousAverage) return 'declining';
    return 'stable';
  };

  const getInsights = () => {
    if (moodHistory.length < 3) return [];

    const insights = [];
    
    // Most common mood
    const moodCounts = moodHistory.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {});
    const mostCommonMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];
    const moodLabel = moods.find(m => m.value === parseInt(mostCommonMood[0]))?.label;
    insights.push(`Your most common mood lately has been "${moodLabel}"`);

    // Most beneficial activity
    const goodMoodActivities = moodHistory
      .filter(entry => entry.mood >= 4)
      .flatMap(entry => entry.activities);
    
    if (goodMoodActivities.length > 0) {
      const activityCounts = goodMoodActivities.reduce((acc, activity) => {
        acc[activity] = (acc[activity] || 0) + 1;
        return acc;
      }, {});
      const topActivity = Object.entries(activityCounts).sort((a, b) => b[1] - a[1])[0];
      const activityLabel = activityOptions.find(a => a.id === topActivity[0])?.label;
      if (activityLabel) {
        insights.push(`"${activityLabel}" is often associated with your good moods`);
      }
    }

    return insights;
  };

  const trend = getMoodTrend();
  const insights = getInsights();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Daily Mood Tracker</h1>
          <p className="text-gray-600">Track your mood patterns and identify what affects your wellbeing</p>
        </div>

        {/* Current Entry Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">How are you feeling today?</h2>
          
          {/* Mood Selection */}
          <div className="mb-8">
            <div className="flex justify-between items-center flex-wrap gap-4">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`flex-1 min-w-[100px] p-4 rounded-xl border-2 transition-all ${
                    selectedMood === mood.value
                      ? `${mood.color} text-white border-transparent scale-105 shadow-lg`
                      : 'bg-gray-50 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">{mood.emoji}</div>
                    <div className="font-medium">{mood.label}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div className="mb-8">
            <h3 className="font-medium text-gray-900 mb-4">What have you been doing today?</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {activityOptions.map((activity) => (
                <button
                  key={activity.id}
                  onClick={() => toggleActivity(activity.id)}
                  className={`p-3 rounded-lg border transition-all ${
                    activities.includes(activity.id)
                      ? 'bg-serene-blue-50 border-serene-blue-300 text-serene-blue-700'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  <i className={`fas ${activity.icon} mb-1`}></i>
                  <div className="text-xs">{activity.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="mb-8">
            <h3 className="font-medium text-gray-900 mb-2">Any notes about today? (Optional)</h3>
            <textarea
              value={moodNote}
              onChange={(e) => setMoodNote(e.target.value)}
              placeholder="What's on your mind? What affected your mood today?"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-serene-blue-500 focus:border-transparent resize-none"
              rows="3"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={saveMood}
            disabled={!selectedMood}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              selectedMood
                ? 'bg-serene-blue-500 hover:bg-serene-blue-600 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Save Today's Mood
          </button>

          {/* Success Message */}
          {showSuccess && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-center">
              <i className="fas fa-check-circle mr-2"></i>
              Mood saved successfully!
            </div>
          )}
        </div>

        {/* Mood History & Insights */}
        {moodHistory.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Recent History */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Mood History</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {moodHistory.slice(0, 7).map((entry) => {
                  const mood = moods.find(m => m.value === entry.mood);
                  const date = new Date(entry.date);
                  return (
                    <div key={entry.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{mood?.emoji}</span>
                          <div>
                            <div className="font-medium text-gray-900">{mood?.label}</div>
                            <div className="text-sm text-gray-500">
                              {date.toLocaleDateString()} at {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>
                      </div>
                      {entry.activities.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {entry.activities.map(actId => {
                            const activity = activityOptions.find(a => a.id === actId);
                            return activity ? (
                              <span key={actId} className="text-xs bg-white px-2 py-1 rounded">
                                <i className={`fas ${activity.icon} mr-1`}></i>
                                {activity.label}
                              </span>
                            ) : null;
                          })}
                        </div>
                      )}
                      {entry.note && (
                        <p className="text-sm text-gray-600 mt-2 italic">"{entry.note}"</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Insights */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Mood Insights</h2>
              
              {/* Trend Indicator */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">Mood Trend</span>
                  <span className={`font-semibold ${
                    trend === 'improving' ? 'text-green-600' :
                    trend === 'declining' ? 'text-red-600' :
                    'text-gray-600'
                  }`}>
                    {trend === 'improving' && '↑ Improving'}
                    {trend === 'declining' && '↓ Declining'}
                    {trend === 'stable' && '→ Stable'}
                    {trend === 'neutral' && 'Not enough data'}
                  </span>
                </div>
                {moodHistory.length >= 2 && (
                  <div className="flex space-x-1 mt-2">
                    {moodHistory.slice(0, 7).reverse().map((entry, index) => {
                      const mood = moods.find(m => m.value === entry.mood);
                      return (
                        <div
                          key={index}
                          className={`flex-1 h-8 rounded ${mood?.color}`}
                          title={`${mood?.label} - ${new Date(entry.date).toLocaleDateString()}`}
                        />
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Insights List */}
              {insights.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-700">Patterns We've Noticed:</h3>
                  {insights.map((insight, index) => (
                    <div key={index} className="flex items-start">
                      <i className="fas fa-lightbulb text-yellow-500 mt-1 mr-2"></i>
                      <p className="text-gray-600 text-sm">{insight}</p>
                    </div>
                  ))}
                </div>
              )}

              {moodHistory.length < 3 && (
                <p className="text-gray-500 text-sm">
                  Keep tracking your mood daily to see patterns and insights!
                </p>
              )}
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-serene-blue-50 to-growth-green-50 rounded-xl p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Tips for Better Mood Tracking</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <i className="fas fa-clock text-serene-blue-600 mt-1 mr-3"></i>
              <div>
                <h3 className="font-medium text-gray-900">Track at the same time</h3>
                <p className="text-sm text-gray-600">Try to log your mood at the same time each day for consistency</p>
              </div>
            </div>
            <div className="flex items-start">
              <i className="fas fa-edit text-serene-blue-600 mt-1 mr-3"></i>
              <div>
                <h3 className="font-medium text-gray-900">Be honest</h3>
                <p className="text-sm text-gray-600">There's no right or wrong mood - be truthful about how you feel</p>
              </div>
            </div>
            <div className="flex items-start">
              <i className="fas fa-chart-line text-serene-blue-600 mt-1 mr-3"></i>
              <div>
                <h3 className="font-medium text-gray-900">Look for patterns</h3>
                <p className="text-sm text-gray-600">Review your history weekly to identify triggers and helpers</p>
              </div>
            </div>
            <div className="flex items-start">
              <i className="fas fa-share text-serene-blue-600 mt-1 mr-3"></i>
              <div>
                <h3 className="font-medium text-gray-900">Share with your therapist</h3>
                <p className="text-sm text-gray-600">This data can be valuable in your treatment sessions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
