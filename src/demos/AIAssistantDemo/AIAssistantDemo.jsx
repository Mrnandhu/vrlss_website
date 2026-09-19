import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowUp,
  BarChart3,
  Bell,
  Bot,
  Check,
  ChevronRight,
  Clock3,
  FileText,
  LayoutDashboard,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Paperclip,
  Plus,
  Search,
  Settings,
  Sparkles,
  Target,
  Users,
  Zap,
} from 'lucide-react'
import './AIAssistantDemo.css'

const conversations = [
  {
    id: 1,
    title: 'Weekly business summary',
    time: 'Just now',
  },
  {
    id: 2,
    title: 'Prepare sales follow-up',
    time: 'Today',
  },
  {
    id: 3,
    title: 'Review pending tasks',
    time: 'Yesterday',
  },
]

const initialMessages = [
  {
    id: 1,
    role: 'assistant',
    text: 'Good morning. I’m ready to help organize your business tasks, summarize activity, and prepare next steps.',
    time: '09:41',
  },
  {
    id: 2,
    role: 'user',
    text: 'Give me a quick overview of what needs attention today.',
    time: '09:42',
  },
  {
    id: 3,
    role: 'assistant',
    text: 'There are three areas worth reviewing today: follow-ups, pending tasks, and the weekly sales summary. I can prepare any of these for you.',
    time: '09:42',
  },
]

const quickActions = [
  {
    icon: BarChart3,
    title: 'Summarize performance',
    prompt: 'Summarize this week’s business performance.',
  },
  {
    icon: Target,
    title: 'Prioritize tasks',
    prompt: 'Help me prioritize today’s business tasks.',
  },
  {
    icon: Users,
    title: 'Customer follow-ups',
    prompt: 'Prepare a customer follow-up checklist.',
  },
  {
    icon: FileText,
    title: 'Create a brief',
    prompt: 'Create a concise business briefing.',
  },
]

const taskItems = [
  {
    title: 'Review customer follow-ups',
    meta: '4 items',
    priority: 'High',
  },
  {
    title: 'Approve weekly report',
    meta: 'Due today',
    priority: 'Medium',
  },
  {
    title: 'Prepare team briefing',
    meta: 'Tomorrow',
    priority: 'Low',
  },
]

function AIAssistantDemo() {
  const [activeConversation, setActiveConversation] = useState(1)
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [activeView, setActiveView] = useState('assistant')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [notifications, setNotifications] = useState(2)
  const [tasks, setTasks] = useState(taskItems)

  const currentConversation = useMemo(
    () =>
      conversations.find((conversation) => conversation.id === activeConversation) ||
      conversations[0],
    [activeConversation],
  )

  const addAssistantReply = (prompt) => {
    const trimmed = prompt.trim()

    if (!trimmed) return

    const now = new Date()
    const time = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })

    const userMessage = {
      id: Date.now(),
      role: 'user',
      text: trimmed,
      time,
    }

    const reply = getAssistantReply(trimmed)

    setMessages((current) => [
      ...current,
      userMessage,
      {
        id: Date.now() + 1,
        role: 'assistant',
        text: reply,
        time,
      },
    ])

    setInput('')
  }

  const completeTask = (index) => {
    setTasks((current) => current.filter((_, taskIndex) => taskIndex !== index))
  }

  const createConversation = () => {
    setActiveConversation(1)
    setMessages([
      {
        id: Date.now(),
        role: 'assistant',
        text: 'New workspace ready. What would you like to organize?',
        time: 'Now',
      },
    ])
    setActiveView('assistant')
  }

  const handleNavigation = (view) => {
    setActiveView(view)
    setMobileMenu(false)
  }

  return (
    <div className="ai-demo">
      <aside className={`ai-sidebar ${mobileMenu ? 'ai-sidebar-open' : ''}`}>
        <div className="ai-brand">
          <div className="ai-brand-mark">
            <Sparkles size={18} />
          </div>

          <div>
            <strong>ORBIT</strong>
            <span>AI BUSINESS ASSISTANT</span>
          </div>
        </div>

        <div className="ai-demo-badge">
          <span />
          VRLS DEMO / CONCEPT
        </div>

        <button className="ai-new-chat" onClick={createConversation}>
          <Plus size={16} />
          New conversation
        </button>

        <div className="ai-sidebar-section">
          <span className="ai-sidebar-label">WORKSPACE</span>

          <button
            className={activeView === 'overview' ? 'active' : ''}
            onClick={() => handleNavigation('overview')}
          >
            <LayoutDashboard size={17} />
            Overview
          </button>

          <button
            className={activeView === 'assistant' ? 'active' : ''}
            onClick={() => handleNavigation('assistant')}
          >
            <MessageSquare size={17} />
            Assistant
          </button>

          <button
            className={activeView === 'tasks' ? 'active' : ''}
            onClick={() => handleNavigation('tasks')}
          >
            <Check size={17} />
            Tasks
            <span className="ai-nav-count">{tasks.length}</span>
          </button>

          <button
            className={activeView === 'activity' ? 'active' : ''}
            onClick={() => handleNavigation('activity')}
          >
            <BarChart3 size={17} />
            Activity
          </button>
        </div>

        <div className="ai-sidebar-section ai-conversation-section">
          <div className="ai-sidebar-label-row">
            <span className="ai-sidebar-label">RECENT</span>
            <MoreHorizontal size={15} />
          </div>

          <div className="ai-conversation-list">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                className={
                  activeConversation === conversation.id &&
                  activeView === 'assistant'
                    ? 'conversation-active'
                    : ''
                }
                onClick={() => {
                  setActiveConversation(conversation.id)
                  setActiveView('assistant')
                  setMobileMenu(false)
                }}
              >
                <MessageSquare size={14} />
                <span>
                  <strong>{conversation.title}</strong>
                  <small>{conversation.time}</small>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="ai-sidebar-footer">
          <button onClick={() => handleNavigation('settings')}>
            <Settings size={17} />
            Settings
          </button>

          <div className="ai-profile">
            <div className="ai-profile-avatar">DR</div>
            <div>
              <strong>Demo Admin</strong>
              <small>Business workspace</small>
            </div>
          </div>
        </div>
      </aside>

      {mobileMenu && (
        <button
          className="ai-sidebar-overlay"
          aria-label="Close navigation"
          onClick={() => setMobileMenu(false)}
        />
      )}

      <main className="ai-main">
        <header className="ai-header">
          <button
            className="ai-mobile-menu"
            onClick={() => setMobileMenu(true)}
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>

          <div className="ai-header-title">
            <span>ORBIT / BUSINESS WORKSPACE</span>
            <h1>
              {activeView === 'assistant'
                ? currentConversation.title
                : activeView.charAt(0).toUpperCase() + activeView.slice(1)}
            </h1>
          </div>

          <div className="ai-header-actions">
            <div className="ai-search">
              <Search size={16} />
              <input placeholder="Search workspace" />
              <kbd>⌘ K</kbd>
            </div>

            <button
              className="ai-notification"
              onClick={() => setNotifications(0)}
              aria-label="Notifications"
            >
              <Bell size={18} />
              {notifications > 0 && <span>{notifications}</span>}
            </button>

            <div className="ai-header-avatar">DR</div>
          </div>
        </header>

        <div className="ai-content">
          <div className="ai-concept-banner">
            <div>
              <span className="ai-live-dot" />
              <strong>DEMONSTRATION ENVIRONMENT</strong>
            </div>

            <p>
              Simulated assistant responses and workspace data for portfolio
              demonstration only.
            </p>
          </div>

          {activeView === 'assistant' && (
            <AssistantView
              messages={messages}
              input={input}
              setInput={setInput}
              onSend={addAssistantReply}
              onQuickAction={addAssistantReply}
            />
          )}

          {activeView === 'overview' && (
            <OverviewView
              onOpenAssistant={() => setActiveView('assistant')}
              tasks={tasks}
            />
          )}

          {activeView === 'tasks' && (
            <TasksView tasks={tasks} onComplete={completeTask} />
          )}

          {activeView === 'activity' && <ActivityView />}

          {activeView === 'settings' && <SettingsView />}
        </div>

        <button
          className="ai-back-home"
          onClick={() => {
            window.location.href = '/'
          }}
        >
          <ArrowLeft size={15} />
          Back to Home
        </button>
      </main>
    </div>
  )
}

function AssistantView({
  messages,
  input,
  setInput,
  onSend,
  onQuickAction,
}) {
  return (
    <div className="ai-workspace">
      <section className="ai-chat-panel">
        <div className="ai-chat-heading">
          <div>
            <span className="ai-eyebrow">
              <span className="ai-pulse" />
              ASSISTANT ONLINE
            </span>
            <h2>How can I help?</h2>
          </div>

          <button className="ai-more-button" aria-label="More options">
            <MoreHorizontal size={18} />
          </button>
        </div>

        <div className="ai-message-area">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`ai-message-row ${message.role}`}
            >
              {message.role === 'assistant' && (
                <div className="ai-message-avatar">
                  <Bot size={16} />
                </div>
              )}

              <div className="ai-message-content">
                <div className="ai-message-meta">
                  <strong>
                    {message.role === 'assistant' ? 'Orbit' : 'You'}
                  </strong>
                  <span>{message.time}</span>
                </div>

                <div className="ai-message-bubble">{message.text}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="ai-composer">
          <button className="ai-attach" aria-label="Attach file">
            <Paperclip size={17} />
          </button>

          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                onSend(input)
              }
            }}
            placeholder="Ask Orbit anything about your workspace..."
            rows="1"
          />

          <button
            className="ai-send"
            onClick={() => onSend(input)}
            aria-label="Send message"
          >
            <ArrowUp size={17} />
          </button>
        </div>

        <div className="ai-composer-note">
          <Sparkles size={12} />
          Concept interface — responses are simulated.
        </div>
      </section>

      <aside className="ai-right-panel">
        <div className="ai-panel-card ai-quick-card">
          <div className="ai-panel-heading">
            <div>
              <span className="ai-eyebrow">QUICK ACTIONS</span>
              <h3>What would you like to do?</h3>
            </div>
            <Zap size={17} />
          </div>

          <div className="ai-quick-grid">
            {quickActions.map((action) => {
              const Icon = action.icon

              return (
                <button
                  key={action.title}
                  onClick={() => onQuickAction(action.prompt)}
                >
                  <span className="ai-quick-icon">
                    <Icon size={17} />
                  </span>
                  <span>
                    <strong>{action.title}</strong>
                    <small>Ask Orbit</small>
                  </span>
                  <ChevronRight size={15} />
                </button>
              )
            })}
          </div>
        </div>

        <div className="ai-panel-card ai-focus-card">
          <div className="ai-panel-heading">
            <div>
              <span className="ai-eyebrow">TODAY</span>
              <h3>Focus areas</h3>
            </div>
            <Clock3 size={17} />
          </div>

          <div className="ai-focus-list">
            <FocusItem
              label="Customer follow-ups"
              value="4"
              progress="76%"
            />
            <FocusItem
              label="Tasks completed"
              value="8 / 11"
              progress="73%"
            />
            <FocusItem
              label="Weekly report"
              value="Ready"
              progress="92%"
            />
          </div>
        </div>
      </aside>
    </div>
  )
}

function FocusItem({ label, value, progress }) {
  return (
    <div className="ai-focus-item">
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className="ai-progress">
        <span style={{ width: progress }} />
      </div>
    </div>
  )
}

function OverviewView({ onOpenAssistant, tasks }) {
  return (
    <div className="ai-page">
      <div className="ai-page-intro">
        <div>
          <span className="ai-eyebrow">WORKSPACE OVERVIEW</span>
          <h2>Your business at a glance.</h2>
          <p>
            A concept workspace for bringing conversations, tasks and business
            context together.
          </p>
        </div>

        <button className="ai-primary-button" onClick={onOpenAssistant}>
          <Bot size={16} />
          Open assistant
        </button>
      </div>

      <div className="ai-metric-grid">
        <MetricCard icon={MessageSquare} label="Conversations" value="12" />
        <MetricCard icon={Check} label="Tasks completed" value="08" />
        <MetricCard icon={Users} label="Follow-ups" value="04" />
        <MetricCard icon={Zap} label="Automations" value="06" />
      </div>

      <div className="ai-overview-grid">
        <div className="ai-panel-card">
          <div className="ai-panel-heading">
            <div>
              <span className="ai-eyebrow">TASKS</span>
              <h3>Today's focus</h3>
            </div>
            <Check size={17} />
          </div>

          <div className="ai-overview-task-list">
            {tasks.map((task) => (
              <div className="ai-overview-task" key={task.title}>
                <span className={`priority-dot ${task.priority.toLowerCase()}`} />
                <div>
                  <strong>{task.title}</strong>
                  <small>{task.meta}</small>
                </div>
                <span>{task.priority}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ai-panel-card ai-insight-card">
          <span className="ai-eyebrow">AI WORKSPACE CONCEPT</span>
          <h3>One place for business context.</h3>
          <p>
            The concept combines an assistant, task management and lightweight
            business insights into one focused workspace.
          </p>

          <div className="ai-insight-line">
            <Sparkles size={16} />
            <span>Conversation → action → follow-up</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ icon: Icon, label, value }) {
  return (
    <div className="ai-metric-card">
      <span>
        <Icon size={17} />
      </span>
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  )
}

function TasksView({ tasks, onComplete }) {
  return (
    <div className="ai-page">
      <div className="ai-page-intro">
        <div>
          <span className="ai-eyebrow">TASK MANAGEMENT</span>
          <h2>Keep work moving.</h2>
          <p>Demo tasks that can be completed directly from the workspace.</p>
        </div>
      </div>

      <div className="ai-task-page-card">
        {tasks.length === 0 ? (
          <div className="ai-empty-state">
            <Check size={28} />
            <h3>All clear.</h3>
            <p>There are no remaining demo tasks.</p>
          </div>
        ) : (
          tasks.map((task, index) => (
            <div className="ai-task-row" key={task.title}>
              <div className="ai-task-check">
                <Clock3 size={16} />
              </div>

              <div className="ai-task-copy">
                <strong>{task.title}</strong>
                <span>{task.meta}</span>
              </div>

              <span className={`ai-priority ${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>

              <button onClick={() => onComplete(index)}>
                <Check size={15} />
                Complete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function ActivityView() {
  const activity = [
    ['Weekly summary prepared', '09:42', 'AI'],
    ['Customer follow-up list reviewed', '09:18', 'TASK'],
    ['Business briefing opened', 'Yesterday', 'DOC'],
    ['Workspace settings updated', 'Yesterday', 'SYSTEM'],
  ]

  return (
    <div className="ai-page">
      <div className="ai-page-intro">
        <div>
          <span className="ai-eyebrow">ACTIVITY</span>
          <h2>Workspace activity.</h2>
          <p>A simple timeline concept for business assistant actions.</p>
        </div>
      </div>

      <div className="ai-activity-card">
        {activity.map(([title, time, type]) => (
          <div className="ai-activity-row" key={`${title}-${time}`}>
            <span className="ai-activity-icon">
              <Sparkles size={15} />
            </span>

            <div>
              <strong>{title}</strong>
              <small>{time}</small>
            </div>

            <span className="ai-activity-type">{type}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SettingsView() {
  return (
    <div className="ai-page">
      <div className="ai-page-intro">
        <div>
          <span className="ai-eyebrow">WORKSPACE SETTINGS</span>
          <h2>Configure your workspace.</h2>
          <p>Settings shown here are interface concepts for the demo.</p>
        </div>
      </div>

      <div className="ai-settings-card">
        <SettingRow
          title="Assistant suggestions"
          description="Show contextual quick actions."
          enabled
        />
        <SettingRow
          title="Activity notifications"
          description="Show workspace activity updates."
          enabled
        />
        <SettingRow
          title="Daily business brief"
          description="Prepare a daily summary concept."
          enabled={false}
        />
      </div>
    </div>
  )
}

function SettingRow({ title, description, enabled }) {
  return (
    <div className="ai-setting-row">
      <div>
        <strong>{title}</strong>
        <span>{description}</span>
      </div>

      <span className={`ai-toggle ${enabled ? 'on' : ''}`}>
        <span />
      </span>
    </div>
  )
}

function getAssistantReply(prompt) {
  const text = prompt.toLowerCase()

  if (text.includes('performance') || text.includes('summary')) {
    return 'Demo summary: activity is steady, 8 tasks are completed, 4 follow-ups remain, and the weekly report is ready for review.'
  }

  if (text.includes('priorit') || text.includes('task')) {
    return 'Suggested order: review the four customer follow-ups first, approve the weekly report second, then prepare the team briefing.'
  }

  if (text.includes('customer') || text.includes('follow')) {
    return 'Demo follow-up checklist: review the latest interaction, confirm the next action, prepare a concise message, and schedule the next touchpoint.'
  }

  if (text.includes('brief') || text.includes('report')) {
    return 'Business brief concept: current activity is stable, the main open items are customer follow-ups and the weekly report, and the team briefing is scheduled next.'
  }

  return 'I can help organize that as a concept workflow. Try asking for a performance summary, task priorities, customer follow-ups, or a business brief.'
}

export default AIAssistantDemo
