import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import type { OrderRequest, RequestStatus, TicketChatMessage } from '../context/StoreContext';
import {
  Ticket,
  Search,
  X,
  MessageSquare,
  Clock,
  User,
  Disc as DiscordIcon,
  Mail,
  Server,
  DollarSign,
  IndianRupee,
  Send,
  CheckCircle2,
  AlertCircle,
  PlayCircle,
  XCircle,
  ChevronRight,
  ShieldCheck,
  ExternalLink,
  ShieldAlert,
  Lock,
  FlaskConical,
  Plus,
  ListTodo
} from 'lucide-react';

interface RequestsPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerToast: (msg: string) => void;
}

export const RequestsPortalModal: React.FC<RequestsPortalModalProps> = ({
  isOpen,
  onClose,
  onTriggerToast,
}) => {
  const {
    orderRequests,
    ticketChats,
    addChatMessage,
    updateRequestStatus,
    addProgressNote,
    deleteOrderRequest,
    isAdmin,
    cmsSections,
    clientOwnerId,
    getUserRequests,
    canAccessTicket,
  } = useStore();

  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchTicketId, setSearchTicketId] = useState<string>('');
  const [selectedRequest, setSelectedRequest] = useState<OrderRequest | null>(null);
  const [chatInput, setChatInput] = useState<string>('');
  const [newNoteInput, setNewNoteInput] = useState<string>('');

  if (!isOpen) return null;

  const discordInvite = cmsSections?.contact?.discordInvite || 'https://discord.gg';

  // Strictly filter requests based on user permissions:
  // Normal Users: ONLY see tickets where ownerId === clientOwnerId
  // Admins: See ALL tickets
  const accessibleRequests = getUserRequests();
  const pendingCount = accessibleRequests.filter((r) => r.status === 'Pending').length;

  const filteredRequests = accessibleRequests.filter((req) => {
    const matchesFilter = activeFilter === 'All' || req.status === activeFilter;
    const matchesSearch =
      !searchTicketId ||
      req.id.toLowerCase().includes(searchTicketId.toLowerCase()) ||
      req.name.toLowerCase().includes(searchTicketId.toLowerCase()) ||
      req.discord.toLowerCase().includes(searchTicketId.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'Pending':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-950/80 text-amber-400 border border-amber-800/40 flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</span>;
      case 'Accepted':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-950/80 text-blue-300 border border-blue-800/40 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Accepted</span>;
      case 'In Progress':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-950/80 text-purple-300 border border-purple-800/40 flex items-center gap-1"><PlayCircle className="w-3 h-3 animate-spin-slow" /> In Progress</span>;
      case 'Testing':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-800/40 flex items-center gap-1"><FlaskConical className="w-3 h-3 text-cyan-400" /> Testing</span>;
      case 'Completed':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800/40 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Completed</span>;
      case 'Rejected':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-950/80 text-red-400 border border-red-800/40 flex items-center gap-1"><XCircle className="w-3 h-3" /> Rejected</span>;
      default:
        return null;
    }
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !selectedRequest) return;

    if (!canAccessTicket(selectedRequest.id)) {
      onTriggerToast('Access Denied: You do not own this ticket.');
      return;
    }

    addChatMessage({
      requestId: selectedRequest.id,
      sender: isAdmin ? 'Admin' : 'Client',
      senderName: isAdmin ? 'Zyt Studio Admin' : selectedRequest.name,
      text: chatInput.trim(),
    });

    setChatInput('');
    onTriggerToast('Message sent to ticket chat.');
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteInput.trim() || !selectedRequest) return;

    addProgressNote(selectedRequest.id, newNoteInput.trim());
    setNewNoteInput('');
    onTriggerToast('Progress note added to ticket.');
  };

  const activeTicketObj = selectedRequest
    ? orderRequests.find((r) => r.id === selectedRequest.id) || selectedRequest
    : null;

  const currentChats = activeTicketObj && canAccessTicket(activeTicketObj.id)
    ? ticketChats.filter((c) => c.requestId === activeTicketObj.id)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-lg">
      <div className="relative w-full max-w-6xl h-[92vh] glass-panel rounded-3xl border border-purple-500/40 overflow-hidden shadow-2xl flex flex-col bg-[#05060e]">
        {/* Top Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#070815] via-[#0d0e22] to-[#120822] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center">
              <Ticket className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white font-mono">
                  {isAdmin ? 'Admin Order Management Center' : 'My Plugin Requests & Tickets'}
                </h3>
                {pendingCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
                    {pendingCount} Pending
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-400 font-mono">
                {isAdmin ? 'All client tickets & full administrative control' : 'Track your submitted orders & chat in real-time'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Column: Request List */}
          <div className="w-full md:w-2/5 border-r border-white/10 flex flex-col bg-[#04050d] shrink-0">
            {/* Search & Filter Controls */}
            <div className="p-4 border-b border-white/10 space-y-3">
              {isAdmin && (
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={searchTicketId}
                    onChange={(e) => setSearchTicketId(e.target.value)}
                    placeholder="Search all tickets (ID, Name, Discord)..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs font-mono"
                  />
                </div>
              )}

              <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
                {['All', 'Pending', 'Accepted', 'In Progress', 'Testing', 'Completed', 'Rejected'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setActiveFilter(st)}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      activeFilter === st
                        ? 'bg-purple-600 text-white font-bold shadow-md'
                        : 'bg-white/5 hover:bg-white/10 text-gray-300'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Request Item Cards List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {filteredRequests.length === 0 ? (
                <div className="text-center py-12 text-xs text-gray-400 space-y-3 p-4">
                  <ShieldAlert className="w-8 h-8 mx-auto text-purple-400/50" />
                  <p className="font-semibold text-white">No Tickets Found</p>
                  <p className="text-[11px] text-gray-500">
                    {isAdmin
                      ? 'No client requests match your filter.'
                      : 'You have not submitted any plugin requests yet or no tickets belong to your account.'}
                  </p>
                </div>
              ) : (
                filteredRequests.map((req) => (
                  <div
                    key={req.id}
                    onClick={() => setSelectedRequest(req)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                      selectedRequest?.id === req.id
                        ? 'bg-purple-950/40 border-purple-500/60 shadow-xl'
                        : 'glass-card border-white/5 hover:border-purple-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-cyan-400 font-mono tracking-wider">
                        #{req.id}
                      </span>
                      {getStatusBadge(req.status)}
                    </div>

                    <div className="text-sm font-bold text-white font-mono">{req.name}</div>
                    <div className="text-xs text-gray-400 truncate mt-0.5">{req.pluginIdea}</div>

                    <div className="flex items-center justify-between pt-3 mt-2 border-t border-white/5 text-[11px] font-mono text-gray-300">
                      <span className="text-emerald-400 font-bold">{req.budgetFormatted}</span>
                      <span className="text-gray-500">{req.createdAt}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Column: Request Details & Built-in Ticket Chat */}
          <div className="hidden md:flex flex-1 flex-col bg-[#060712] overflow-hidden">
            {activeTicketObj ? (
              !canAccessTicket(activeTicketObj.id) ? (
                /* Access Denied Security Screen */
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-400 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-red-950/60 border border-red-800 flex items-center justify-center shadow-2xl">
                    <Lock className="w-8 h-8 text-red-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white font-mono">Access Denied</h4>
                    <p className="text-xs text-gray-300 mt-1 max-w-md leading-relaxed">
                      You do not have permission to view or chat in ticket <strong className="text-cyan-400">#{activeTicketObj.id}</strong>. Tickets are strictly confidential between the client owner and Zyt Studio Developers.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-1 flex-col h-full overflow-hidden">
                  {/* Details Top Box */}
                  <div className="p-6 border-b border-white/10 bg-[#08091a] space-y-4 shrink-0 overflow-y-auto max-h-[45vh]">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <h4 className="text-xl font-extrabold text-white font-mono">
                            Ticket #{activeTicketObj.id}
                          </h4>
                          {getStatusBadge(activeTicketObj.status)}
                        </div>
                        <span className="text-xs text-gray-400 font-mono">Submitted on {activeTicketObj.createdAt}</span>
                      </div>

                      {/* Admin Actions Bar */}
                      {isAdmin && (
                        <div className="flex items-center gap-2">
                          <select
                            value={activeTicketObj.status}
                            onChange={(e) => {
                              updateRequestStatus(activeTicketObj.id, e.target.value as RequestStatus);
                              onTriggerToast(`Status updated to ${e.target.value}`);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-purple-950 text-purple-200 border border-purple-500/50 text-xs font-mono font-bold"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Accepted">Accepted</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Testing">Testing</option>
                            <option value="Completed">Completed</option>
                            <option value="Rejected">Rejected</option>
                          </select>

                          <button
                            onClick={() => {
                              deleteOrderRequest(activeTicketObj.id);
                              setSelectedRequest(null);
                              onTriggerToast(`Deleted ticket #${activeTicketObj.id}`);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800 text-xs font-mono font-bold"
                          >
                            Delete Ticket
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Customer Info Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-0.5">
                        <div className="text-[10px] text-gray-400">Client Name</div>
                        <div className="font-bold text-white truncate">{activeTicketObj.name}</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-0.5">
                        <div className="text-[10px] text-gray-400">Discord Handle</div>
                        <div className="font-bold text-indigo-300 truncate">{activeTicketObj.discord}</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-0.5">
                        <div className="text-[10px] text-gray-400">Budget Range</div>
                        <div className="font-bold text-emerald-400">{activeTicketObj.budgetFormatted}</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-0.5">
                        <div className="text-[10px] text-gray-400">Desired Deadline</div>
                        <div className="font-bold text-amber-300 truncate">{activeTicketObj.deadline}</div>
                      </div>
                    </div>

                    {/* Plugin Idea Description */}
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-200 leading-relaxed font-sans">
                      <strong className="text-purple-300 block mb-1 font-mono">Plugin Specifications:</strong>
                      {activeTicketObj.pluginIdea}
                    </div>

                    {/* Progress Notes Section */}
                    {activeTicketObj.progressNotes && activeTicketObj.progressNotes.length > 0 && (
                      <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-2">
                        <div className="text-xs font-bold text-purple-300 font-mono flex items-center gap-1.5">
                          <ListTodo className="w-3.5 h-3.5 text-purple-400" /> Progress & Release Notes
                        </div>
                        <ul className="space-y-1 text-xs text-gray-300 list-disc list-inside font-sans">
                          {activeTicketObj.progressNotes.map((note, idx) => (
                            <li key={idx}>{note}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Admin Add Progress Note Bar */}
                    {isAdmin && (
                      <form onSubmit={handleAddNote} className="flex gap-2">
                        <input
                          type="text"
                          value={newNoteInput}
                          onChange={(e) => setNewNoteInput(e.target.value)}
                          placeholder="Add progress note (e.g. Beta v1.0 released for testing)..."
                          className="flex-1 px-3.5 py-2 rounded-xl glass-input text-xs font-mono"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-mono font-bold flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" /> Note
                        </button>
                      </form>
                    )}

                    {/* Discord Invite Banner inside Ticket Page */}
                    <div className="p-3.5 rounded-xl bg-gradient-to-r from-indigo-950/80 via-purple-950/80 to-slate-900 border border-indigo-500/40 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5">
                        <DiscordIcon className="w-5 h-5 text-indigo-400 shrink-0" />
                        <div>
                          <div className="font-bold text-white">Need faster communication?</div>
                          <div className="text-[11px] text-indigo-300 font-mono flex items-center gap-1">
                            Discord: <strong className="text-white select-all">{discordInvite}</strong>
                          </div>
                        </div>
                      </div>

                      <a
                        href={discordInvite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-[11px] flex items-center gap-1.5 shrink-0 shadow-md shadow-indigo-600/30"
                      >
                        <DiscordIcon className="w-3.5 h-3.5" /> JOIN DISCORD
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Built-in Ticket Chat Workspace */}
                  <div className="flex-1 flex flex-col overflow-hidden bg-[#04050c]">
                    <div className="px-6 py-2 bg-[#090a18] border-b border-white/10 flex items-center justify-between text-xs text-gray-400 font-mono">
                      <span className="flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-cyan-400" /> Built-In Live Ticket Chat
                      </span>
                      <a
                        href={discordInvite}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-300 hover:underline flex items-center gap-1 text-[11px]"
                      >
                        <DiscordIcon className="w-3 h-3 text-indigo-400" /> Join Discord for instant audio/screen share
                      </a>
                    </div>

                    {/* Chat Messages Log */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                      {currentChats.length === 0 ? (
                        <div className="text-center py-8 text-xs text-gray-500 font-mono">
                          No messages exchanged yet. Send a message below!
                        </div>
                      ) : (
                        currentChats.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex flex-col ${
                              msg.sender === 'Admin' ? 'items-end' : 'items-start'
                            }`}
                          >
                            <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono mb-1 px-1">
                              <span className="font-bold text-white">{msg.senderName}</span>
                              <span>({msg.sender})</span>
                              <span>• {msg.timestamp}</span>
                            </div>

                            <div
                              className={`max-w-lg p-3.5 rounded-2xl text-xs leading-relaxed font-sans shadow-lg ${
                                msg.sender === 'Admin'
                                  ? 'bg-purple-600 text-white rounded-tr-none'
                                  : 'bg-white/10 text-gray-100 rounded-tl-none border border-white/10'
                              }`}
                            >
                              {msg.text}
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Chat Input Form */}
                    <form onSubmit={handleSendChat} className="p-4 border-t border-white/10 bg-[#070818] flex gap-3">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder={`Type message to ticket #${activeTicketObj.id}...`}
                        className="flex-1 px-4 py-3 rounded-xl glass-input text-xs"
                      />
                      <button
                        type="submit"
                        className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/30"
                      >
                        <Send className="w-4 h-4" /> Send
                      </button>
                    </form>
                  </div>
                </div>
              )
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-400 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Ticket className="w-8 h-8 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white font-mono">Select a Request Ticket</h4>
                  <p className="text-xs text-gray-400 mt-1 max-w-sm">
                    Click any request ticket on the left to view full specifications, update status, add progress notes, and chat in real-time.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
