import { supabase } from './supabase.js'

const authSection = document.getElementById('auth-section')
const appSection = document.getElementById('app-section')
const authForm = document.getElementById('auth-form')
const signupBtn = document.getElementById('signup-btn')
const logoutBtn = document.getElementById('logout-btn')
const authMessage = document.getElementById('auth-message')
const userEmail = document.getElementById('user-email')

// 1. Single source of truth for UI visibility
supabase.auth.onAuthStateChange((event, session) => {
  authSection.hidden = Boolean(session)
  appSection.hidden = !session
  userEmail.textContent = session ? session.user.email : ''
})

// 2. Log In
authForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  authMessage.textContent = error ? error.message : ''
})

// 3. Sign Up
signupBtn.addEventListener('click', async () => {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  const { error } = await supabase.auth.signUp({ email, password })
  authMessage.textContent = error ? error.message : 'Account created!'
})

// 4. Log Out
logoutBtn.addEventListener('click', () => supabase.auth.signOut())