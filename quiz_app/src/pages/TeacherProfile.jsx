import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';
import { useToast } from '../components/Toast';
import { useNav } from '../context/NavigationContext';
import { formatDate } from '../utils/quizUtils';

export default function TeacherProfile() {
  const { user, updateProfile } = useAuth();
  const { getTeacherQuizzes, attempts } = useQuiz();
  const { success, error: toastError } = useToast();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const myQuizzes = getTeacherQuizzes(user?.id);
  const myQuizIds = new Set(myQuizzes.map((q) => q.id));
  const myAttempts = attempts.filter((a) => myQuizIds.has(a.quizId));
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const handleSave = () => {
    if (!name.trim()) { toastError('Name cannot be empty'); return; }
    const result = updateProfile({ name: name.trim() });
    if (result.success) { success('Profile updated!'); setEditing(false); } else { toastError(result.message); }
  };
  const { changePassword } = useAuth(); // add to destructuring

const handlePasswordChange = (e) => {
  setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
};

const handlePasswordSubmit = async (e) => {
  e.preventDefault();
  setPasswordError('');
  setPasswordSuccess('');
  const { currentPassword, newPassword, confirmPassword } = passwordData;
  if (!currentPassword || !newPassword || !confirmPassword) {
    setPasswordError('All password fields are required');
    return;
  }
  if (newPassword.length < 6) {
    setPasswordError('New password must be at least 6 characters');
    return;
  }
  if (newPassword !== confirmPassword) {
    setPasswordError('Passwords do not match');
    return;
  }
  const result = changePassword(currentPassword, newPassword);
  if (result.success) {
    setPasswordSuccess('Password updated successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    success('Password updated!');
  } else {
    setPasswordError(result.message);
    toastError(result.message);
  }
};

  return (
    <div className="page-container">
      <div className="page-header"><h1>My Profile</h1><p>Manage your account information</p></div>
      <div className="profile-card">
        <div className="profile-header"><div className="profile-avatar">{user?.name?.charAt(0).toUpperCase()}</div><div className="profile-title"><h2>{user?.name}</h2><span className="role-badge teacher">{user?.role}</span></div></div>
        <div className="profile-body">
          {editing ? (
            <div className="profile-edit"><div className="form-group"><label>Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} /></div><div className="profile-actions"><button className="btn btn-secondary" onClick={() => { setName(user?.name); setEditing(false); }}>Cancel</button><button className="btn btn-primary" onClick={handleSave}>Save Changes</button></div></div>
          ) : (
            <div className="profile-info">
              <div className="info-row"><span className="info-label">Full Name</span><span className="info-value">{user?.name}</span></div>
              <div className="info-row"><span className="info-label">Email</span><span className="info-value">{user?.email}</span></div>
              <div className="info-row"><span className="info-label">Role</span><span className="info-value capitalize">{user?.role}</span></div>
              <div className="info-row"><span className="info-label">Member Since</span><span className="info-value">{formatDate(user?.createdAt)}</span></div>
              <div className="divider" />
              <div className="profile-stats-row">
                <div className="profile-stat"><h3>{myQuizzes.length}</h3><p>Total Quizzes</p></div>
                <div className="profile-stat"><h3>{myAttempts.length}</h3><p>Total Attempts</p></div>
                <div className="profile-stat"><h3>{myAttempts.length > 0 ? Math.round(myAttempts.reduce((s, a) => s + a.percentage, 0) / myAttempts.length) : 0}%</h3><p>Avg Student Score</p></div>
              </div>
              <button className="btn btn-primary" onClick={() => setEditing(true)}>Edit Profile</button>
              <div className="divider" />
<div className="password-change-section">
  <h3>Change Password</h3>
  <form onSubmit={handlePasswordSubmit} className="password-form">
    {passwordError && <div className="alert alert-error">{passwordError}</div>}
    {passwordSuccess && <div className="alert alert-success">{passwordSuccess}</div>}
    <div className="form-group">
      <label>Current Password</label>
      <input
        type="password"
        name="currentPassword"
        value={passwordData.currentPassword}
        onChange={handlePasswordChange}
        placeholder="Enter current password"
      />
    </div>
    <div className="form-group">
      <label>New Password</label>
      <input
        type="password"
        name="newPassword"
        value={passwordData.newPassword}
        onChange={handlePasswordChange}
        placeholder="Enter new password (min 6 chars)"
      />
    </div>
    <div className="form-group">
      <label>Confirm New Password</label>
      <input
        type="password"
        name="confirmPassword"
        value={passwordData.confirmPassword}
        onChange={handlePasswordChange}
        placeholder="Confirm new password"
      />
    </div>
    <button type="submit" className="btn btn-primary">Update Password</button>
  </form>
</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
